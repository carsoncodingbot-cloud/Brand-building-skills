#!/usr/bin/env python3
"""Canonical photo enhancement — the ONLY allowed processing for job photos.

Measured color science, nothing added or removed:
  LAB levels stretch (p0.5-p99.6) -> CLAHE (clip 1.5) blended 28%
  -> half-strength gray-world white balance -> saturation x1.06
  -> gentle unsharp (1.5 / -0.5, sigma 2.0)

Usage:
  python3 enhance_photos.py <raw_dir> <out_dir> [--web-max 1100 --quality 96]

Requires: opencv-python (cv2), numpy. For web variants pass --web-max to also
resize (quality 82 recommended for web: use --quality 82 --web-max 1100).
"""
import argparse, os, sys

try:
    import cv2
    import numpy as np
except ImportError:
    sys.exit("Requires opencv-python and numpy: pip install opencv-python numpy")


def enhance(src: str, dst: str, web_max: int | None, quality: int) -> None:
    bgr = cv2.imread(src)
    if bgr is None:
        print(f"  skip (unreadable): {src}")
        return
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB).astype(np.float32)
    L, A, B = cv2.split(lab)
    lo, hi = np.percentile(L, 0.5), np.percentile(L, 99.6)
    if hi - lo < 1:
        hi = lo + 1
    L = np.clip((L - lo) * (255.0 / (hi - lo)), 0, 255)
    cl = cv2.createCLAHE(clipLimit=1.5, tileGridSize=(8, 8)).apply(
        L.astype(np.uint8)).astype(np.float32)
    L = 0.72 * L + 0.28 * cl
    A = A - (A.mean() - 128.0) * 0.5
    B = B - (B.mean() - 128.0) * 0.5
    out = cv2.cvtColor(cv2.merge([
        np.clip(L, 0, 255), np.clip(A, 0, 255), np.clip(B, 0, 255)
    ]).astype(np.uint8), cv2.COLOR_LAB2BGR)
    hsv = cv2.cvtColor(out, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.06, 0, 255)
    out = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    blur = cv2.GaussianBlur(out, (0, 0), 2.0)
    out = cv2.addWeighted(out, 1.5, blur, -0.5, 0)
    if web_max:
        h, w = out.shape[:2]
        if w > web_max:
            out = cv2.resize(out, (web_max, int(h * web_max / w)),
                             interpolation=cv2.INTER_AREA)
    cv2.imwrite(dst, out, [cv2.IMWRITE_JPEG_QUALITY, quality])
    print(f"  ok: {os.path.basename(dst)}")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("raw_dir")
    ap.add_argument("out_dir")
    ap.add_argument("--web-max", type=int, default=None,
                    help="max width px (adds resize for web use)")
    ap.add_argument("--quality", type=int, default=96)
    args = ap.parse_args()
    os.makedirs(args.out_dir, exist_ok=True)
    exts = (".jpg", ".jpeg", ".png", ".webp")
    files = [f for f in sorted(os.listdir(args.raw_dir))
             if f.lower().endswith(exts)]
    if not files:
        sys.exit(f"No images in {args.raw_dir}")
    print(f"Enhancing {len(files)} photos -> {args.out_dir}")
    for f in files:
        base = os.path.splitext(f)[0] + ".jpg"
        enhance(os.path.join(args.raw_dir, f),
                os.path.join(args.out_dir, base), args.web_max, args.quality)


if __name__ == "__main__":
    main()
