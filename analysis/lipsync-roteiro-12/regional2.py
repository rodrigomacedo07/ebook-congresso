"""Regional lag with a low-dimensional estimator, calibrated on injected offsets."""
import numpy as np
from cca_lib import *
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt

V, A, mask, N, cuts = build_features()

# low-dim, heavily regularised: usable on short windows
VD, AD, CTX, REG, KK = 8, 8, 1, 0.15, 3
Vl = pca(zc(stack(V, CTX)), VD)
def audio_feats(Am): return pca(zc(stack(Am, CTX)), AD)
Al = audio_feats(A)

def scan(vi, ai, mk, maxlag=15):
    out = np.full(2*maxlag+1, np.nan); n = len(vi)
    for j, L in enumerate(range(-maxlag, maxlag+1)):
        if L >= 0: p, q, m2 = vi[:n-L], ai[L:], mk[:n-L] & mk[L:]
        else:      p, q, m2 = vi[-L:], ai[:n+L], mk[-L:] & mk[:n+L]
        if m2.sum() < 90: continue
        out[j] = cca_corr(p[m2], q[m2], reg=REG, k=KK)
    return out

def est(s, e, ai, maxlag=15):
    mk = mask[s:e]
    if mk.sum() < 100: return None
    c = scan(Vl[s:e], ai[s:e], mk, maxlag)
    if np.isnan(c).all(): return None
    L, sc = refine(c, maxlag)
    return L, sc - float(np.nanmedian(c))

# ---------- calibration: how accurate is this estimator on a 13 s window? ----------
edges = np.linspace(0, N, 7).astype(int)
print('=== CALIBRACAO do estimador regional (offsets injetados) ===')
errs_by_reg = {i: [] for i in range(len(edges)-1)}
for inj in [-8, -4, 0, 4, 8]:
    Ai = np.roll(A, inj, axis=0)
    if inj > 0: Ai[:inj] = A[0]
    elif inj < 0: Ai[inj:] = A[-1]
    Aif = audio_feats(Ai)
    base = est(0, N, Aif, 20)
    row = []
    for i in range(len(edges)-1):
        r = est(edges[i], edges[i+1], Aif)
        if r is None: row.append(np.nan); continue
        row.append(r[0])
    row = np.array(row)
    # error relative to the global truth shift for this injection
    ref = base[0]
    err = row - ref
    for i, v in enumerate(err):
        if not np.isnan(v): errs_by_reg[i].append(v)
    print(f'  inj {inj:+3d}: global {ref:+6.2f} | regioes ' +
          ' '.join(f'{v:+6.2f}' for v in row))
allerr = np.concatenate([np.array(v) for v in errs_by_reg.values() if len(v)])
print(f'\n  dispersao regional em torno do global: std {allerr.std():.2f} fr '
      f'({allerr.std()/FPS*1000:.0f} ms), max |{np.abs(allerr).max():.2f}| fr')
print(f'  => qualquer variacao regional menor que ~{2*allerr.std():.1f} fr '
      f'({2*allerr.std()/FPS*1000:.0f} ms) e RUIDO, nao sinal')
TOL = 2 * allerr.std()

# ---------- real measurement ----------
print('\n=== MEDICAO REAL ===')
g = est(0, N, Al, 20)
print(f'  GLOBAL: {g[0]:+.2f} fr ({g[0]/FPS*1000:+.0f} ms)  contraste {g[1]:+.3f}')
rows = []
for i in range(len(edges)-1):
    s, e = edges[i], edges[i+1]
    r = est(s, e, Al)
    if r is None: continue
    dev = r[0] - g[0]
    sig = 'DIFERENTE' if abs(dev) > TOL else 'compativel com o global'
    rows.append((s/FPS, e/FPS, r[0], r[1]))
    print(f'  {s/FPS:5.1f}-{e/FPS:5.1f}s  {r[0]:+6.2f} fr ({r[0]/FPS*1000:+4.0f} ms)  '
          f'desvio {dev:+5.2f} fr  contraste {r[1]:+.3f}   {sig}')
rows = np.array(rows)

print('\n=== RESIDUAL apos deslocar o audio -6 fr (-240 ms) ===')
sh = -6
Ash = np.roll(A, sh, axis=0); Ash[sh:] = A[-1]
Asf = audio_feats(Ash)
gr = est(0, N, Asf, 20)
print(f'  GLOBAL: {gr[0]:+.2f} fr ({gr[0]/FPS*1000:+.0f} ms)')
worst = 0
for i in range(len(edges)-1):
    s, e = edges[i], edges[i+1]
    r = est(s, e, Asf)
    if r is None: continue
    worst = max(worst, abs(r[0]))
    print(f'  {s/FPS:5.1f}-{e/FPS:5.1f}s  {r[0]:+6.2f} fr ({r[0]/FPS*1000:+4.0f} ms)  '
          f'contraste {r[1]:+.3f}')
print(f'\n  pior residual {worst:.2f} fr ({worst/FPS*1000:.0f} ms) vs tolerancia de ruido '
      f'{TOL:.2f} fr ({TOL/FPS*1000:.0f} ms)')

fig, ax = plt.subplots(figsize=(13, 5))
ax.axhspan(-45, 125, color='green', alpha=.15, label='zona imperceptivel (ITU-R BT.1359)')
ax.errorbar((rows[:, 0]+rows[:, 1])/2, rows[:, 2]/FPS*1000,
            yerr=TOL/FPS*1000, fmt='o', capsize=5, ms=9, lw=2, label='lag por trecho (±ruido)')
ax.axhline(g[0]/FPS*1000, color='crimson', lw=2, label=f'global {g[0]/FPS*1000:+.0f} ms')
ax.axhline(0, color='k', lw=1)
ax.set_xlabel('tempo (s)'); ax.set_ylabel('atraso do audio (ms)')
ax.set_title('Atraso do audio em relacao a boca')
ax.legend(); plt.tight_layout(); plt.savefig('regional2.png', dpi=100)
print('saved regional2.png')
