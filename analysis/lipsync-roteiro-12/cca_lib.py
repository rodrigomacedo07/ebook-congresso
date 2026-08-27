"""Shared lip/audio feature extraction + CCA lag scan."""
import numpy as np, wave

FPS = 25.0
CUT_THR = 39.13

RIGID = [33, 133, 362, 263, 168, 6, 197, 195, 5, 4, 1, 234, 454, 10, 152]
LIPS = sorted(set([
    61,146,91,181,84,17,314,405,321,375,291,
    185,40,39,37,0,267,269,270,409,
    78,95,88,178,87,14,317,402,318,324,308,
    191,80,81,82,13,312,311,310,415,
    76,77,90,180,85,16,315,404,320,307,306,
    62,96,89,179,86,15,316,403,319,325,292]))


def zc(X):
    X = X - X.mean(axis=0, keepdims=True)
    s = X.std(axis=0, keepdims=True); s[s < 1e-9] = 1
    return X / s


def stack(X, ctx):
    out = [X]
    for k in range(1, ctx + 1):
        out.append(np.roll(X, k, axis=0)); out.append(np.roll(X, -k, axis=0))
    return np.hstack(out)


def pca(X, k):
    Xc = X - X.mean(axis=0, keepdims=True)
    U, S, Vt = np.linalg.svd(Xc, full_matrices=False)
    return Xc @ Vt[:k].T


def cca_corr(X, Y, reg=1e-2, k=4):
    X, Y = zc(X), zc(Y)
    n = len(X)
    Cxx = X.T @ X / n + reg * np.eye(X.shape[1])
    Cyy = Y.T @ Y / n + reg * np.eye(Y.shape[1])
    Cxy = X.T @ Y / n
    ix = np.linalg.inv(np.linalg.cholesky(Cxx))
    iy = np.linalg.inv(np.linalg.cholesky(Cyy))
    s = np.linalg.svd(ix @ Cxy @ iy.T, compute_uv=False)
    return float(np.sum(np.clip(s[:k], 0, 1)))


def lag_scan(vi, ai, mk, maxlag=20, k=4, minn=120):
    out = np.full(2 * maxlag + 1, np.nan)
    n = len(vi)
    for j, L in enumerate(range(-maxlag, maxlag + 1)):
        if L >= 0: p, q, m2 = vi[:n - L], ai[L:], mk[:n - L] & mk[L:]
        else:      p, q, m2 = vi[-L:], ai[:n + L], mk[-L:] & mk[:n + L]
        if m2.sum() < minn: continue
        out[j] = cca_corr(p[m2], q[m2], k=k)
    return out


def refine(c, maxlag=20):
    lags = np.arange(-maxlag, maxlag + 1)
    kk = int(np.nanargmax(c))
    if 0 < kk < len(c) - 1:
        y0, y1, y2 = c[kk - 1], c[kk], c[kk + 1]
        dl = float(np.clip(0.5 * (y0 - y2) / (y0 - 2 * y1 + y2 + 1e-12), -1, 1))
    else:
        dl = 0.0
    return lags[kk] + dl, float(c[kk])


def build_features(npz='pts.npz', wav='audio.wav', fdiff='framediff.npy'):
    d = np.load(npz, allow_pickle=True)
    PTS, BS, found = d['pts'], d['bs'], d['found']
    bs_names = list(d['bs_names'])
    N = len(found)
    fd = np.load(fdiff)
    cuts = sorted(set([0] + [int(c) + 1 for c in np.where(fd > CUT_THR)[0]] + [N]))

    ok = found & ~np.isnan(PTS[:, 0, 0])
    ref = np.nanmedian(PTS[ok][:, RIGID, :2], axis=0)
    ref = ref - ref.mean(axis=0)
    ref = ref / np.sqrt((ref ** 2).sum(axis=1).mean())

    Vraw = np.full((N, len(LIPS) * 2), np.nan, np.float64)
    for i in range(N):
        if not ok[i]: continue
        A0 = PTS[i][RIGID, :2].astype(np.float64)
        mu = A0.mean(axis=0); A0 = A0 - mu
        sc = np.sqrt((A0 ** 2).sum(axis=1).mean())
        if sc < 1e-6: continue
        U, S, Vt = np.linalg.svd((A0 / sc).T @ ref)
        R = U @ Vt
        Vraw[i] = (((PTS[i][LIPS, :2].astype(np.float64) - mu) / sc) @ R).reshape(-1)

    idx = np.arange(N)
    vok = ~np.isnan(Vraw[:, 0])
    V = np.stack([np.interp(idx, idx[vok], Vraw[:, k][vok]) for k in range(Vraw.shape[1])], axis=1)
    MB = [k for k, n in enumerate(bs_names) if ('mouth' in n or 'jaw' in n)]
    B = BS[:, MB].astype(np.float64)
    bok = ~np.isnan(B[:, 0])
    B = np.stack([np.interp(idx, idx[bok], B[:, k][bok]) for k in range(B.shape[1])], axis=1)
    V = np.hstack([V, B])

    wf = wave.open(wav, 'rb'); sr = wf.getframerate()
    a = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
    hop = int(round(sr / FPS)); nfft = 1024; w = np.hanning(nfft)
    Sp = np.zeros((N, nfft // 2 + 1))
    for i in range(N):
        s = int(np.clip(i * hop - nfft // 2, 0, len(a) - nfft))
        Sp[i] = np.abs(np.fft.rfft(a[s:s + nfft] * w)) ** 2
    freqs = np.fft.rfftfreq(nfft, 1 / sr)
    m = lambda f: 2595 * np.log10(1 + f / 700)
    im = lambda x: 700 * (10 ** (x / 2595) - 1)
    NMEL = 32
    fp = im(np.linspace(m(60), m(7600), NMEL + 2))
    fb = np.zeros((NMEL, len(freqs)))
    for j in range(NMEL):
        lo, ce, hi = fp[j], fp[j + 1], fp[j + 2]
        l = (freqs >= lo) & (freqs <= ce); r = (freqs > ce) & (freqs <= hi)
        fb[j, l] = (freqs[l] - lo) / max(ce - lo, 1e-6)
        fb[j, r] = (hi - freqs[r]) / max(hi - ce, 1e-6)
    A = np.log(Sp @ fb.T + 1e-10)

    mask = found.copy()
    for c in cuts:
        mask[max(0, c - 3):min(N, c + 4)] = False
    return V, A, mask, N, cuts
