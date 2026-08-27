"""Caption timing via an outlined-text detector (white core + dark stroke)."""
import numpy as np, subprocess, cv2, wave

SRC = "/root/.claude/uploads/1ace582a-80fa-57d9-ab25-2eaf709085d4/51ba6561-lv_0_20260827084309.mp4"
FF = "/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
W, H, FPS, N = 480, 852, 25.0, 1951
Y0, Y1 = 520, 800

p = subprocess.Popen([FF, '-hide_banner', '-loglevel', 'error', '-i', SRC,
                      '-vf', 'format=gray', '-f', 'rawvideo', '-'],
                     stdout=subprocess.PIPE, bufsize=10 ** 8)
txt = np.zeros((N, Y1 - Y0, W), bool)
for i in range(N):
    b = p.stdout.read(W * H)
    if len(b) < W * H: N = i; break
    f = np.frombuffer(b, np.uint8).reshape(H, W)[Y0:Y1]
    core = f > 232
    dark = cv2.dilate((f < 95).astype(np.uint8), np.ones((7, 7), np.uint8)).astype(bool)
    txt[i] = core & dark                     # white glyph adjacent to its dark outline
p.stdout.close(); p.wait()
txt = txt[:N]

rowvar = txt.mean(axis=0).mean(axis=1)
rows = np.where(rowvar > rowvar.max() * 0.15)[0]
print(f'text rows: {Y0+rows.min()}..{Y0+rows.max()} (of {Y0}..{Y1})')
sub = txt[:, rows.min():rows.max() + 1]
pix = sub.reshape(N, -1).sum(axis=1).astype(float)
print(f'text pixels: mean {pix.mean():.0f}, present in {np.mean(pix>25)*100:.0f}% of frames')

chg = np.zeros(N)
for i in range(1, N):
    u = np.logical_or(sub[i], sub[i-1]).sum()
    chg[i] = np.logical_xor(sub[i], sub[i-1]).sum() / max(u, 1)   # IoU-style change

on = pix > 25
ev = []
for i in range(2, N - 2):
    if on[i] and chg[i] > 0.55 and chg[i] >= chg[i-2:i+3].max():
        if not ev or i - ev[-1] > 4:
            ev.append(i)
    elif on[i] and not on[i-1]:                                   # text appears
        if not ev or i - ev[-1] > 4:
            ev.append(i)
ev = np.array(ev)
print(f'caption switch events: {len(ev)}  (~{len(ev)/(N/FPS)*60:.0f}/min)')

# --- references ---
wf = wave.open('audio.wav', 'rb'); sr = wf.getframerate()
a = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32)/32768.
hop = int(round(sr/FPS)); win = hop*2
env = np.array([np.sqrt((a[max(0,i*hop-win//2):max(0,i*hop-win//2)+win]**2).mean()+1e-12) for i in range(N)])
db = 20*np.log10(env+1e-9); lo, hi = np.percentile(db,10), np.percentile(db,95)
act = db > lo + .3*(hi-lo)
a_on = np.array([i for i in range(4, N) if act[i] and not act[i-4:i].any()])

d = np.load('pts.npz', allow_pickle=True)
bs = list(d['bs_names']); jaw = d['bs'][:N, bs.index('jawOpen')].astype(float)
ok = ~np.isnan(jaw); jaw = np.interp(np.arange(N), np.arange(N)[ok], jaw[ok])
jl, jh = np.percentile(jaw,20), np.percentile(jaw,90)
jact = jaw > jl + .3*(jh-jl)
v_on = np.array([i for i in range(4, N) if jact[i] and not jact[i-4:i].any()])
print(f'audio onsets {len(a_on)}, mouth onsets {len(v_on)}')

def match(ev, ref, tol=10):
    out = []
    for e in ev:
        k = int(np.argmin(np.abs(ref-e)))
        if abs(ref[k]-e) <= tol: out.append(e-ref[k])
    return np.array(out)

print('\n(caption switch minus reference; negative = caption fires BEFORE the reference)')
for nm, ref in [('audio onset', a_on), ('mouth onset', v_on)]:
    dd = match(ev, ref)
    if len(dd) >= 5:
        print(f'  vs {nm:12s} n={len(dd):3d}  median {np.median(dd):+.1f} fr '
              f'({np.median(dd)/FPS*1000:+.0f} ms)  MAD {np.median(np.abs(dd-np.median(dd))):.1f} fr')

# lag-scan the caption-change train against audio and mouth activity
def xcorr_train(events, sig, maxlag=15):
    tr = np.zeros(N); tr[events] = 1
    tr = np.convolve(tr, np.ones(3), 'same')
    out = []
    for L in range(-maxlag, maxlag+1):
        s = np.roll(sig, L)
        out.append(np.corrcoef(tr, s)[0, 1])
    return np.array(out), np.arange(-maxlag, maxlag+1)

d_env = np.abs(np.gradient(np.convolve(env, np.ones(3)/3, 'same')))
d_jaw = np.abs(np.gradient(np.convolve(jaw, np.ones(3)/3, 'same')))
for nm, sig in [('audio onset strength', d_env), ('mouth motion strength', d_jaw)]:
    c, lg = xcorr_train(ev, sig)
    k = int(np.argmax(c))
    print(f'  caption-train vs {nm:22s}: peak at {lg[k]:+3d} fr '
          f'({lg[k]/FPS*1000:+5.0f} ms) r={c[k]:.3f}')
np.save('cap_ev2.npy', ev)
