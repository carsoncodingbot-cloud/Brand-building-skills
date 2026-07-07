"""Repaint the phone pill on the van wrap: (205) 601-3797 -> (866) 665-2210.
The rear panel recedes in perspective, so the pill tile is rendered at natural
proportions, squashed horizontally to match, and rotated to the wrap's tilt."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

van = Image.open("public/van.webp").convert("RGBA")
a = np.array(van.convert("RGB")).astype(int)

# 1) cover the existing pill with panel red (median of surrounding panel)
samples = [a[430:545, 1292:1322], a[406:428, 1360:1560]]
med = np.median(np.vstack([s.reshape(-1, 3) for s in samples]), axis=0).astype(int)
cx0, cy0, cx1, cy1 = 1318, 426, 1600, 548
patch = Image.new("RGB", (cx1-cx0, cy1-cy0), tuple(med))
noise = np.random.default_rng(11).normal(0, 3, (patch.height, patch.width, 1)).repeat(3, axis=2)
# subtle vertical lighting falloff like the panel
grad = np.linspace(6, -6, patch.height).reshape(-1, 1, 1).repeat(patch.width, 1).repeat(3, 2)
patch = Image.fromarray(np.clip(np.array(patch)+noise+grad, 0, 255).astype("uint8"))
mask = Image.new("L", patch.size, 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, patch.width, patch.height], radius=10, fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(5))
van.paste(patch, (cx0, cy0), mask)

# 2) fresh pill + number at natural proportions
NAVY = (0, 34, 71, 255)
fnt = ImageFont.truetype("/tmp/mfonts/Montserrat-Black.ttf", 64)
txt = "(866) 665-2210"
tile = Image.new("RGBA", (620, 130), (0, 0, 0, 0))
td = ImageDraw.Draw(tile)
td.rounded_rectangle([4, 12, 616, 118], radius=53, fill=NAVY)
bb = td.textbbox((0, 0), txt, font=fnt)
td.text(((620-(bb[2]-bb[0]))/2-bb[0], (130-(bb[3]-bb[1]))/2-bb[1]), txt, font=fnt, fill=(245, 247, 250, 255))

# 3) squash to the wrap's perspective width, tilt to match, blend on
tile = tile.resize((272, 104), Image.LANCZOS)
tile = tile.rotate(5.5, resample=Image.BICUBIC, expand=True)
tile = tile.filter(ImageFilter.GaussianBlur(0.5))
al = tile.getchannel("A").point(lambda v: int(v*0.97)); tile.putalpha(al)
van.alpha_composite(tile, (1322, 424))

van.save("public/van.webp", "WEBP", quality=92)
print("van wrap repainted", van.size)
