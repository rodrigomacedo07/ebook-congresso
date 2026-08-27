import numpy as np, wave, subprocess
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt

SRC = "/root/.claude/uploads/1ace582a-80fa-57d9-ab25-2eaf709085d4/51ba6561-lv_0_20260827084309.mp4"
FF = "/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"

# full-rate stereo for channel analysis
subprocess.run([FF, '-y', '-hide_banner', '-loglevel', 'error', '-i', SRC,
                '-vn', '-ac', '2', '-ar', '44100', 'audio44.wav'], check=True)
wf = wave.open('audio44.wav', 'rb'); sr = wf.getframerate()
raw = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
st = raw.reshape(-1, 2)
L, R = st[:, 0], st[:, 1]
print(f'sr={sr} dur={len(L)/sr:.3f}s')
print(f'L/R identical: {np.array_equal(L, R)}  corr={np.corrcoef(L, R)[0,1]:.6f}  '
      f'max|L-R|={np.abs(L-R).max():.5f}')
mono = (L + R) / 2

nfft, hop = 2048, 512
nfr = (len(mono) - nfft) // hop
w = np.hanning(nfft)
S = np.zeros((nfr, nfft // 2 + 1))
for i in range(nfr):
    S[i] = np.abs(np.fft.rfft(mono[i*hop:i*hop+nfft] * w))
freqs = np.fft.rfftfreq(nfft, 1/sr)
tt = np.arange(nfr) * hop / sr
Sdb = 20*np.log10(S + 1e-9)

full = 20*np.log10(np.sqrt((S**2).mean(axis=1)) + 1e-9)
floor = np.percentile(full, 8)
quiet = full < floor + 4
print(f'quiet frames: {quiet.mean()*100:.1f}%')
qs = Sdb[quiet].mean(axis=0); sp = Sdb[~quiet].mean(axis=0)
print('\nband levels (dB): quiet vs speech')
for lo, hi in [(20,80),(80,200),(200,500),(500,1000),(1000,2000),(2000,4000),(4000,8000),(8000,16000),(16000,22050)]:
    sel = (freqs>=lo)&(freqs<hi)
    print(f'  {lo:5d}-{hi:5d} Hz   quiet {qs[sel].mean():7.1f}   speech {sp[sel].mean():7.1f}   '
          f'delta {sp[sel].mean()-qs[sel].mean():6.1f}')

# lowpass cutoff (codec/AI-audio signature)
hi_energy = Sdb.mean(axis=0)
for f0 in [14000, 15000, 16000, 17000, 18000, 19000, 20000]:
    sel = (freqs >= f0) & (freqs < f0 + 1000)
    print(f'  mean level {f0/1000:.0f}-{(f0+1000)/1000:.0f} kHz: {hi_energy[sel].mean():.1f} dB')

# ---- is there a musical bed? tonal stability during quiet stretches ----
qidx = np.where(quiet)[0]
if len(qidx) > 20:
    sub = Sdb[qidx]
    tonal = (sub - sub.mean(axis=1, keepdims=True)).std(axis=0)
    lowf = (freqs > 40) & (freqs < 400)
    print(f'\n  spectral variability in 40-400 Hz during quiet: {tonal[lowf].mean():.2f} dB '
          f'(low + steady tone => musical bed)')

plt.figure(figsize=(22, 7))
plt.imshow(Sdb.T, aspect='auto', origin='lower',
           extent=[0, tt[-1], 0, freqs[-1]], vmin=np.percentile(Sdb, 25), vmax=np.percentile(Sdb, 99.5),
           cmap='magma')
plt.ylim(0, 12000); plt.colorbar(label='dB'); plt.xlabel('s'); plt.ylabel('Hz')
plt.title('spectrogram')
plt.tight_layout(); plt.savefig('spectrogram.png', dpi=80)
print('\nsaved spectrogram.png')
