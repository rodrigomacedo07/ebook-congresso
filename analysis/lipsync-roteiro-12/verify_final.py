"""Full end-to-end verification of a rendered file: re-extracts landmarks,
cuts and audio from THAT file and measures the residual lip-sync offset."""
import numpy as np, subprocess, sys, os, wave
import mediapipe as mp
from mediapipe.tasks import python as mpy
from mediapipe.tasks.python import vision
from cca_lib import (RIGID, LIPS, zc, stack, pca, cca_corr, lag_scan, refine, FPS)

FF = "/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"


def probe(path):
    out = subprocess.run([FF, '-hide_banner', '-i', path], capture_output=True, text=True).stderr
    import re
    w, h = re.search(r'(\d{2,5})x(\d{2,5})', out).groups()
    dur = re.search(r'Duration: (\d+):(\d+):([\d.]+)', out).groups()
    d = int(dur[0]) * 3600 + int(dur[1]) * 60 + float(dur[2])
    return int(w), int(h), d


def extract(path, tag):
    W, H, D = probe(path)
    N = int(round(D * FPS))
    print(f'  {tag}: {W}x{H}, {D:.2f}s, ~{N} quadros')

    subprocess.run([FF, '-y', '-hide_banner', '-loglevel', 'error', '-i', path,
                    '-vn', '-ac', '1', '-ar', '16000', f'{tag}_a.wav'], check=True)

    opts = vision.FaceLandmarkerOptions(
        base_options=mpy.BaseOptions(model_asset_path='face_landmarker.task'),
        running_mode=vision.RunningMode.VIDEO, num_faces=1,
        output_face_blendshapes=True,
        min_face_detection_confidence=0.25, min_face_presence_confidence=0.25,
        min_tracking_confidence=0.25)
    lm = vision.FaceLandmarker.create_from_options(opts)

    p = subprocess.Popen([FF, '-hide_banner', '-loglevel', 'error', '-i', path,
                          '-pix_fmt', 'rgb24', '-f', 'rawvideo', '-'],
                         stdout=subprocess.PIPE, bufsize=10 ** 8)
    PTS = np.full((N, 478, 3), np.nan, np.float32)
    BS = None; names = None
    found = np.zeros(N, bool)
    prev_gray = None
    fdiff = np.zeros(N)
    n = 0
    for i in range(N):
        b = p.stdout.read(W * H * 3)
        if len(b) < W * H * 3:
            break
        img = np.ascontiguousarray(np.frombuffer(b, np.uint8).reshape(H, W, 3))
        g = img.mean(axis=2)
        if prev_gray is not None:
            fdiff[i] = np.abs(g - prev_gray).mean()
        prev_gray = g
        r = lm.detect_for_video(mp.Image(image_format=mp.ImageFormat.SRGB, data=img),
                                int(round(i / FPS * 1000)))
        n = i + 1
        if not r.face_landmarks:
            continue
        found[i] = True
        PTS[i] = np.array([[q.x * W, q.y * H, q.z * W] for q in r.face_landmarks[0]], np.float32)
        if r.face_blendshapes:
            c = r.face_blendshapes[0]
            if names is None:
                names = [x.category_name for x in c]; BS = np.full((N, len(names)), np.nan, np.float32)
            BS[i] = [x.score for x in c]
    p.stdout.close(); p.wait()
    print(f'     landmarks em {found[:n].sum()}/{n} quadros ({found[:n].mean()*100:.1f}%)')
    return PTS[:n], BS[:n], found[:n], fdiff[:n], names, n, f'{tag}_a.wav'


def features(PTS, BS, found, fdiff, names, N, wav):
    cuts = sorted(set([0] + [int(c) + 1 for c in np.where(fdiff > 39.13)[0]] + [N]))
    ok = found & ~np.isnan(PTS[:, 0, 0])
    ref = np.nanmedian(PTS[ok][:, RIGID, :2], axis=0)
    ref = ref - ref.mean(axis=0); ref = ref / np.sqrt((ref ** 2).sum(axis=1).mean())
    Vr = np.full((N, len(LIPS) * 2), np.nan)
    for i in range(N):
        if not ok[i]: continue
        A0 = PTS[i][RIGID, :2].astype(float); mu = A0.mean(axis=0); A0 -= mu
        sc = np.sqrt((A0 ** 2).sum(axis=1).mean())
        if sc < 1e-6: continue
        U, S, Vt = np.linalg.svd((A0 / sc).T @ ref)
        Vr[i] = (((PTS[i][LIPS, :2].astype(float) - mu) / sc) @ (U @ Vt)).reshape(-1)
    idx = np.arange(N); vok = ~np.isnan(Vr[:, 0])
    V = np.stack([np.interp(idx, idx[vok], Vr[:, k][vok]) for k in range(Vr.shape[1])], 1)
    MB = [k for k, nm in enumerate(names) if 'mouth' in nm or 'jaw' in nm]
    B = BS[:, MB].astype(float); bok = ~np.isnan(B[:, 0])
    B = np.stack([np.interp(idx, idx[bok], B[:, k][bok]) for k in range(B.shape[1])], 1)
    V = np.hstack([V, B])

    wf = wave.open(wav, 'rb'); sr = wf.getframerate()
    a = np.frombuffer(wf.readframes(wf.getnframes()), np.int16).astype(np.float32) / 32768.
    hop = int(round(sr / FPS)); nfft = 1024; w = np.hanning(nfft)
    Sp = np.zeros((N, nfft // 2 + 1))
    for i in range(N):
        s = int(np.clip(i * hop - nfft // 2, 0, max(len(a) - nfft, 0)))
        seg = a[s:s + nfft]
        if len(seg) < nfft: seg = np.pad(seg, (0, nfft - len(seg)))
        Sp[i] = np.abs(np.fft.rfft(seg * w)) ** 2
    freqs = np.fft.rfftfreq(nfft, 1 / sr)
    m = lambda f: 2595 * np.log10(1 + f / 700); im = lambda x: 700 * (10 ** (x / 2595) - 1)
    fp = im(np.linspace(m(60), m(7600), 34))
    fb = np.zeros((32, len(freqs)))
    for j in range(32):
        lo, ce, hi = fp[j], fp[j + 1], fp[j + 2]
        l = (freqs >= lo) & (freqs <= ce); r = (freqs > ce) & (freqs <= hi)
        fb[j, l] = (freqs[l] - lo) / max(ce - lo, 1e-6)
        fb[j, r] = (hi - freqs[r]) / max(hi - ce, 1e-6)
    A = np.log(Sp @ fb.T + 1e-10)
    mask = found.copy()
    for c in cuts:
        mask[max(0, c - 3):min(N, c + 4)] = False
    return V, A, mask


ORIG = "/root/.claude/uploads/1ace582a-80fa-57d9-ab25-2eaf709085d4/51ba6561-lv_0_20260827084309.mp4"
NEW = sys.argv[1] if len(sys.argv) > 1 else 'roteiro12_PRONTO.mp4'

for tag, path in [('original', ORIG), ('final', NEW)]:
    print(f'--- {tag} ---')
    V, A, mask = features(*extract(path, tag))
    Vs = pca(zc(stack(V, 2)), 24); As = pca(zc(stack(A, 2)), 24)
    c = lag_scan(Vs, As, mask, maxlag=20)
    L, s = refine(c, 20)
    ms = L / FPS * 1000
    verdict = 'DENTRO da zona imperceptivel' if -45 < ms < 125 else 'FORA da zona'
    print(f'     >>> atraso do audio: {L:+.2f} quadros ({ms:+.0f} ms)  [{verdict}]\n')
