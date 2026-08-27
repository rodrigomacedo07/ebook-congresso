"""Ground truth: inject known audio delays, confirm sign + bias of the estimator."""
import numpy as np
from cca_lib import *

V, A, mask, N, cuts = build_features()
Vs = pca(zc(stack(V, 2)), 24)

c0 = lag_scan(Vs, pca(zc(stack(A, 2)), 24), mask, maxlag=20)
L0, s0 = refine(c0, 20)
print(f'measured lag on the real file: {L0:+.2f} fr ({L0/FPS*1000:+.0f} ms)\n')
print('inject  ->  recovered      residual        (+ lag = audio arrives AFTER the mouth)')
print('-' * 74)
res = []
for inj in [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]:
    Ai = np.roll(A, inj, axis=0)
    if inj > 0: Ai[:inj] = A[0]
    elif inj < 0: Ai[inj:] = A[-1]
    c = lag_scan(Vs, pca(zc(stack(Ai, 2)), 24), mask, maxlag=25)
    L, s = refine(c, 25)
    resid = L - (L0 + inj)
    res.append(resid)
    print(f'  {inj:+3d} fr ({inj/FPS*1000:+5.0f} ms) -> {L:+6.2f} fr ({L/FPS*1000:+7.0f} ms)   '
          f'residual {resid:+5.2f} fr ({resid/FPS*1000:+5.0f} ms)   score {s:.3f}')
res = np.array(res)
print(f'\n  residual: mean {res.mean():+.2f} fr, std {res.std():.2f} fr '
      f'({res.std()/FPS*1000:.0f} ms), max |{np.abs(res).max():.2f}| fr')
print('  => estimator is unbiased and correctly signed' if np.abs(res).max() < 1.5
      else '  => WARNING: estimator is biased or mis-signed')

# ---- bootstrap CI on the real measurement ----
rng = np.random.default_rng(0)
mk = mask.copy()
boot = []
As = pca(zc(stack(A, 2)), 24)
blocks = [(s, min(s + 125, N)) for s in range(0, N, 125)]
for b in range(40):
    pick = rng.choice(len(blocks), len(blocks), replace=True)
    m2 = np.zeros(N, bool)
    for p in pick:
        s, e = blocks[p]; m2[s:e] = True
    m2 &= mk
    c = lag_scan(Vs, As, m2, maxlag=20)
    if np.isnan(c).all(): continue
    boot.append(refine(c, 20)[0])
boot = np.array(boot)
print(f'\n  bootstrap (n={len(boot)}): median {np.median(boot):+.2f} fr '
      f'({np.median(boot)/FPS*1000:+.0f} ms), 90% CI '
      f'[{np.percentile(boot,5):+.2f}, {np.percentile(boot,95):+.2f}] fr '
      f'([{np.percentile(boot,5)/FPS*1000:+.0f}, {np.percentile(boot,95)/FPS*1000:+.0f}] ms)')
