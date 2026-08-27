# Correção de sincronia labial — Roteiro 12

Diagnóstico e correção do descasamento entre movimento de boca e áudio no vídeo
do roteiro 12 (`lv_0_20260827084309.mp4`, 78,04 s, 480×852, 25 fps, HEVC + AAC).

## Resultado

**O áudio está atrasado 236 ms (≈ 6 quadros a 25 fps) em relação à boca.**

| | valor |
|---|---|
| Atraso medido | **+236 ms** (+5,90 quadros) |
| IC 90% (bootstrap por blocos, n=40) | +189 ms a +280 ms |
| Correção aplicada | **imagem atrasada 200 ms (5 quadros)** |
| Resíduo, medido no arquivo renderizado | **+32 ms** |
| Zona imperceptível (ITU-R BT.1359) | −45 ms a +125 ms |

## Atrasar a imagem, não adiantar o áudio

A correção óbvia — puxar o áudio 240 ms para trás — **estraga o arquivo**. A
fala começa em 0,12 s e já está em nível cheio (−19,7 dB) antes dos 240 ms:
cortar a cabeça do áudio come ~120 ms da primeira palavra.

A correção usada atrasa a imagem em vez disso, clonando o primeiro quadro por
5 quadros (`tpad=start_mode=clone`). O áudio sai intacto — correlação de
0,99998 com o original no primeiro segundo, sem clipping, ataque de fala ainda
em 0,12 s. O cartão de abertura passa a durar 320 ms em vez de 120 ms, o que na
prática melhora: 3 quadros era rápido demais para ler.

Custo: exige recodificar o vídeo (quadros novos impedem `-c:v copy`). Feito em
H.264 CRF 20, 2551 kb/s — acima da fonte (1605 kb/s HEVC).

## Por que 5 quadros e não 6

Ambos foram renderizados e medidos no arquivo final:

| deslocamento | resíduo medido | avaliação |
|---|---|---|
| 6 quadros (240 ms) | −42 ms | colado na borda de −45 ms |
| **5 quadros (200 ms)** | **+32 ms** | centralizado |

A tolerância é assimétrica: o ouvido aceita bem o som chegando depois dos
lábios (até +125 ms) e mal o som chegando antes (−45 ms). Com 6 quadros o
resíduo cai do lado intolerante e na borda; com 5 fica no lado natural e com
folga. Os dois resultados diferem em exatamente 1 quadro, o que confirma a
consistência interna da medição.

## O deslocamento é constante — não há deriva

Testado explicitamente. Em blocos de 13 s os lags medidos variam de +123 ms a
+419 ms, mas a **calibração do próprio estimador nessa janela tem desvio-padrão
de 345 ms** (`regional2.py` injeta offsets conhecidos e mede a dispersão entre
blocos). Toda variação observada está dentro do ruído: nenhum trecho é
estatisticamente distinguível do valor global.

Um modelo linear de deriva não melhora o ajuste sobre um modelo constante
(ganho de 0% na soma dos quadrados). Logo, **um único deslocamento resolve o
vídeo inteiro** — não é preciso cortar e realinhar trecho a trecho.

## Método

Medir isso a olho falha porque o rosto tem barba, óculos e a câmera muda de
enquadramento 17 vezes. A cadeia usada:

1. **`landmarks2.py`** — MediaPipe Face Landmarker (modo VIDEO) extrai 478
   pontos faciais + 52 blendshapes por quadro. Cobertura: 1937/1951 quadros
   (99,3%).
2. **`cca_lib.py`** — normalização rígida de Procrustes: cada quadro é alinhado
   (translação, rotação, escala) a uma face canônica usando pontos rígidos
   (cantos dos olhos, dorso do nariz, orelhas). Isso remove pose e movimento de
   cabeça, deixando só articulação. Extrai 62 pontos de lábio + blendshapes de
   boca/mandíbula → 151 dimensões visuais; áudio vira log-mel de 32 bandas a
   25 fps. Ambos com contexto temporal de ±2 quadros, reduzidos por PCA a 24
   dimensões.
3. **Varredura de lag por CCA regularizada** — para cada deslocamento candidato
   (±20 quadros), a soma das 4 primeiras correlações canônicas entre boca e
   áudio. O pico é o atraso. Quadros de corte e de rastreio perdido são
   mascarados.

Abordagens mais simples foram testadas e descartadas: correlação de envelope RMS
contra atividade de boca por diferença de quadros dava r ≈ 0,1 e picos
inconsistentes (de −790 ms a +538 ms conforme o trecho). A normalização de pose
e a CCA multivariada são o que torna o pico único e nítido (contraste +0,387).

## Validação

`validate.py` injeta atrasos conhecidos de −400 ms a +400 ms e verifica a
recuperação:

- resíduo médio **−18 ms**, desvio-padrão 13 ms, máximo 40 ms
- resposta linear em toda a faixa, sinal correto

Ou seja: o medidor não tem viés relevante e aponta para o lado certo.

`verify_fix.py` refaz a medição no arquivo já renderizado (não só na teoria):
pico em −40 ms, dentro da zona imperceptível.

## O áudio

`audiochar.py` confirma que não há trilha musical por baixo (bandas de fala
caem 24 dB nos silêncios; variabilidade espectral de 11,8 dB nos trechos
quietos descarta um tom estacionário). O áudio é fala limpa, quase mono
(correlação L/R 0,992), com corte de banda em ~16 kHz. Isso importa porque
música de fundo teria contaminado a medição de envelope.

## Legendas

`captions2.py` detecta as trocas de legenda queimada (núcleo branco + contorno
escuro, linhas 570–699). As trocas caem ~120 ms antes dos ataques de fala e
~20 ms dos inícios de movimento de boca — **medição inconclusiva** (MAD de 3 a
3,5 quadros; trocas de legenda ocorrem em fronteira de palavra, não de frase).
Não dá para afirmar por esse dado se as legendas foram geradas a partir do
áudio ou posicionadas à mão.

## Reproduzir

```bash
pip install numpy scipy matplotlib opencv-python-headless mediapipe
curl -L -o face_landmarker.task \
  https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task

ffmpeg -i entrada.mp4 -vn -ac 1 -ar 16000 audio.wav
python3 landmarks2.py     # extrai pontos faciais -> pts.npz
python3 validate.py       # calibra o medidor
python3 regional2.py      # testa deriva ao longo do vídeo
python3 verify_fix.py     # confere o arquivo corrigido
```

Renderização da correção (atrasa a imagem 5 quadros, preserva o áudio):

```bash
ffmpeg -i entrada.mp4 \
  -filter_complex "[0:v]tpad=start_duration=0.20:start_mode=clone,fps=25[v];\
                   [0:a]apad=pad_dur=0.4[a]" \
  -map "[v]" -map "[a]" -t 78.24 \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -profile:v high \
  -c:a aac -b:a 160k -ar 44100 -movflags +faststart saida.mp4
```

`verify_final.py saida.mp4` refaz a medição inteira no arquivo gerado —
re-extrai landmarks, cortes e áudio dele — em vez de assumir que a
renderização fez o que foi pedido.

`landmarks2.py` depende de `framediff.npy` (detecção de cortes por diferença
média entre quadros consecutivos, limiar 39,13) — gerado na etapa de análise de
cortes.
