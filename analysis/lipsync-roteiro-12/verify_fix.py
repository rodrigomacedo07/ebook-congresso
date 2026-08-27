"""End-to-end check: measure the rendered file the same way as the original."""
import numpy as np
from cca_lib import *

print('--- ORIGINAL ---')
V, A0, mask, N, cuts = build_features(wav='audio.wav')
Vs = pca(zc(stack(V, 2)), 24)
c0 = lag_scan(Vs, pca(zc(stack(A0, 2)), 24), mask, maxlag=20)
L0, s0 = refine(c0, 20)
print(f'  lag = {L0:+.2f} fr ({L0/FPS*1000:+.0f} ms)   score {s0:.3f}')

print('--- ARQUIVO CORRIGIDO (renderizado) ---')
_, A1, _, _, _ = build_features(wav='audio_fix.wav')
c1 = lag_scan(Vs, pca(zc(stack(A1, 2)), 24), mask, maxlag=20)
L1, s1 = refine(c1, 20)
print(f'  lag = {L1:+.2f} fr ({L1/FPS*1000:+.0f} ms)   score {s1:.3f}')
print(f'\n  correcao aplicada: {L0-L1:+.2f} fr ({(L0-L1)/FPS*1000:+.0f} ms)  (alvo -6 fr / -240 ms)')
print(f'  desalinhamento residual: {L1:+.2f} fr ({L1/FPS*1000:+.0f} ms)')
ok = abs(L1 / FPS * 1000) < 45
print('  RESULTADO: dentro da zona imperceptivel (-45..+125 ms)' if ok else
      '  RESULTADO: ainda fora da zona alvo')

lags = np.arange(-20, 21)
print('\n  curva do arquivo corrigido (pico deve estar em 0):')
base = np.nanmedian(c1)
for j, lg in enumerate(lags):
    if abs(lg) <= 10:
        print(f'   {lg:+3d} fr ({lg/FPS*1000:+5.0f} ms)  {c1[j]:.3f} ' + '#' * int(max(0, (c1[j]-base)*260)))
