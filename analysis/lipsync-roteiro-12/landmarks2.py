import numpy as np, subprocess, mediapipe as mp
from mediapipe.tasks import python as mpy
from mediapipe.tasks.python import vision

SRC = "/root/.claude/uploads/1ace582a-80fa-57d9-ab25-2eaf709085d4/51ba6561-lv_0_20260827084309.mp4"
FF = "/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
W, H, FPS, N = 480, 852, 25.0, 1951

opts = vision.FaceLandmarkerOptions(
    base_options=mpy.BaseOptions(model_asset_path='face_landmarker.task'),
    running_mode=vision.RunningMode.VIDEO, num_faces=1,
    output_face_blendshapes=True, output_facial_transformation_matrixes=True,
    min_face_detection_confidence=0.25, min_face_presence_confidence=0.25,
    min_tracking_confidence=0.25)
lm = vision.FaceLandmarker.create_from_options(opts)

p = subprocess.Popen([FF, '-hide_banner', '-loglevel', 'error', '-i', SRC,
                      '-pix_fmt', 'rgb24', '-f', 'rawvideo', '-'],
                     stdout=subprocess.PIPE, bufsize=10 ** 8)

PTS = np.full((N, 478, 3), np.nan, np.float32)
BS = None; bs_names = None
found = np.zeros(N, bool)
for i in range(N):
    b = p.stdout.read(W * H * 3)
    if len(b) < W * H * 3:
        break
    img = np.ascontiguousarray(np.frombuffer(b, np.uint8).reshape(H, W, 3))
    res = lm.detect_for_video(mp.Image(image_format=mp.ImageFormat.SRGB, data=img),
                              int(round(i / FPS * 1000)))
    if not res.face_landmarks:
        continue
    found[i] = True
    L = res.face_landmarks[0]
    PTS[i] = np.array([[q.x * W, q.y * H, q.z * W] for q in L], np.float32)
    if res.face_blendshapes:
        cats = res.face_blendshapes[0]
        if bs_names is None:
            bs_names = [c.category_name for c in cats]
            BS = np.full((N, len(bs_names)), np.nan, np.float32)
        BS[i] = [c.score for c in cats]
p.stdout.close(); p.wait()
print('found', found.sum(), '/', N)
np.savez_compressed('pts.npz', pts=PTS, bs=BS, bs_names=np.array(bs_names), found=found)
print('blendshapes:', len(bs_names))
print([n for n in bs_names if 'mouth' in n or 'jaw' in n])
