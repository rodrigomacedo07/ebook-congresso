import numpy as np
from cca_lib import *
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt

V, A0, mask, N, cuts = build_features(wav='audio.wav')
_, A1, _, _, _ = build_features(wav='audio_fix.wav')
Vs = pca(zc(stack(V, 2)), 24)
c0 = lag_scan(Vs, pca(zc(stack(A0, 2)), 24), mask, maxlag=20)
c1 = lag_scan(Vs, pca(zc(stack(A1, 2)), 24), mask, maxlag=20)
lags = np.arange(-20, 21) / FPS * 1000
L0 = refine(c0, 20)[0] / FPS * 1000
L1 = refine(c1, 20)[0] / FPS * 1000
regs = np.load('regs.npy') if __import__('os').path.exists('regs.npy') else None

fig, ax = plt.subplots(1, 2, figsize=(15, 5.5))
ax[0].axvspan(-45, 125, color='#2e9e4f', alpha=.15, label='zona imperceptível\n(ITU-R BT.1359)')
ax[0].plot(lags, c0, 'o-', color='#c0392b', lw=2, ms=4, label=f'original  (pico {L0:+.0f} ms)')
ax[0].plot(lags, c1, 'o-', color='#2471a3', lw=2, ms=4, label=f'corrigido (pico {L1:+.0f} ms)')
ax[0].axvline(0, color='k', lw=1)
ax[0].axvline(L0, color='#c0392b', ls=':', lw=1.5)
ax[0].axvline(L1, color='#2471a3', ls=':', lw=1.5)
ax[0].set_xlabel('atraso do áudio em relação à boca (ms)')
ax[0].set_ylabel('força do alinhamento (CCA)')
ax[0].set_title('Varredura de alinhamento boca × áudio')
ax[0].legend(loc='upper left', fontsize=9)
ax[0].grid(alpha=.25)

# calibration/uncertainty picture
inj = np.array([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]) / FPS * 1000
rec = np.array([-202, -123, -39, 71, 151, 236, 303, 382, 463, 540, 617])
ax[1].plot(inj, rec, 'o-', color='#7d3c98', lw=2, label='medido')
ax[1].plot(inj, inj + 236, '--', color='gray', lw=1.5, label='ideal (236 ms + injetado)')
ax[1].set_xlabel('atraso injetado no áudio (ms)')
ax[1].set_ylabel('atraso recuperado (ms)')
ax[1].set_title('Validação do medidor\n(resíduo médio 18 ms, máx 40 ms)')
ax[1].legend(fontsize=9); ax[1].grid(alpha=.25)
plt.tight_layout(); plt.savefig('resultado.png', dpi=110)
print('saved resultado.png')
