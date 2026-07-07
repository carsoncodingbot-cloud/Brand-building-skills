"""Meta Instant Form background/intro image — 1200x628 (1.91:1 spec).

Design: icy navy gradient + faint peaks, white lockup + two-line tagline +
compact Google-stars pill on the left (vertically centered), van hero
bottom-right with ground shadow. No baked headline — the form supplies its
own text below the image, so the image carries brand + trust only.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W, H = 1200, 628
FT = "/tmp/mfonts"
def f(name, sz): return ImageFont.truetype(f"{FT}/Montserrat-{name}.ttf", sz)

MARGIN = 64
NAVY = (0, 18, 42); TOP = (30, 92, 168)
ICE = (150, 206, 245); GOLD = (245, 166, 35)

# ---------- background gradient ----------
img = Image.new("RGB", (W, H), NAVY); px = img.load()
for y in range(H):
    t = (y / (H - 1)) ** 0.95
    row = tuple(int(TOP[i] + (NAVY[i] - TOP[i]) * t) for i in range(3))
    for x in range(W): px[x, y] = row
img = img.convert("RGBA")

# faint mountain silhouettes
mt = Image.new("RGBA", (W, H), (0, 0, 0, 0)); dm = ImageDraw.Draw(mt)
for (cx, w, h) in [(280, 380, 250), (700, 460, 330), (1040, 380, 270)]:
    dm.polygon([(cx - w, H), (cx, H - h), (cx + w, H)], fill=(255, 255, 255, 10))
img = Image.alpha_composite(img, mt)
d = ImageDraw.Draw(img, "RGBA")

def tw(text, font):
    bb = d.textbbox((0, 0), text, font=font); return bb[2] - bb[0]
def text_vc(x, cy, text, font, fill):
    bb = d.textbbox((0, 0), text, font=font); h = bb[3] - bb[1]
    d.text((x, cy - h / 2 - bb[1]), text, font=font, fill=fill)
    return bb[2] - bb[0]
def star(cx, cy, r, fill):
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rad = r if i % 2 == 0 else r * 0.42
        pts.append((cx + rad * math.cos(a), cy + rad * math.sin(a)))
    d.polygon(pts, fill=fill)

# ---------- van hero (right, bottom-anchored) ----------
van = Image.open("public/van.webp").convert("RGBA")
VW = 600; VH = int(van.height * VW / van.width)
van = van.resize((VW, VH), Image.LANCZOS)
vx = W - VW - 20; vy = H - VH - 54
sh = Image.new("RGBA", van.size, (0, 0, 0, 0))
sh.paste((2, 10, 26, 255), (0, 0), van.getchannel("A"))
sh = sh.resize((VW, int(VH * 0.16)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(12))
img.alpha_composite(sh, (vx, vy + VH - int(VH * 0.14)))
img.alpha_composite(van, (vx, vy))
d = ImageDraw.Draw(img, "RGBA")

LEFT_MAX = vx - MARGIN - 44   # left column must clear the van

# ---------- left column stack (vertically centered) ----------
LOCK_H = 88
lock = Image.open("brand/glacier-logo-white.png").convert("RGBA")
LOCK_W = int(lock.width * LOCK_H / lock.height)
lock = lock.resize((LOCK_W, LOCK_H), Image.LANCZOS)

# tagline: two lines, auto-fit to the safe column
ts = 44
while ts > 24 and tw("SAN ANTONIO'S COOLEST", f("ExtraBold", ts)) > LEFT_MAX:
    ts -= 1
tag_f = f("ExtraBold", ts)
line_h = ts + 6

# compact Google pill: G + 5 stars
PILL_H = 72; PAD = 24; GSZ = 42; GGAP = 16
star_r = 13; star_gap = 30
stars_w = star_gap * 4 + star_r * 2
PILL_W = PAD + GSZ + GGAP + stars_w + PAD

GAP1, GAP2, GAP3 = 34, 10, 30
stack_h = LOCK_H + GAP1 + line_h + GAP2 + line_h + GAP3 + PILL_H
y0 = (H - stack_h) // 2 - 8

img.alpha_composite(lock, (MARGIN, y0))
d = ImageDraw.Draw(img, "RGBA")

ty = y0 + LOCK_H + GAP1
d.text((MARGIN, ty), "SAN ANTONIO'S COOLEST", font=tag_f, fill=(255, 255, 255, 255))
d.text((MARGIN, ty + line_h + GAP2), "HVAC & PLUMBING TEAM", font=tag_f, fill=ICE + (255,))

py = ty + line_h + GAP2 + line_h + GAP3
d.rounded_rectangle([MARGIN, py, MARGIN + PILL_W, py + PILL_H], radius=PILL_H // 2,
                    fill=(255, 255, 255, 255))
g_cy = py + PILL_H // 2
gg = Image.open("scratchpad/googleg.png").convert("RGBA").resize((GSZ, GSZ), Image.LANCZOS)
img.alpha_composite(gg, (MARGIN + PAD, g_cy - GSZ // 2))
d = ImageDraw.Draw(img, "RGBA")
sx = MARGIN + PAD + GSZ + GGAP + star_r
for i in range(5):
    star(sx + i * star_gap, g_cy, star_r, GOLD + (255,))

# ---------- bottom-left services line ----------
svc = "AC  ·  HEATING  ·  PLUMBING  ·  24/7 EMERGENCY"
sf = f("Bold", 20)
while tw(svc, sf) > LEFT_MAX and sf.size > 15:
    sf = f("Bold", sf.size - 1)
d.text((MARGIN, H - 56), svc, font=sf, fill=(190, 214, 238, 235))

img.convert("RGB").save("scratchpad/form-bg.png", "PNG", optimize=True)
print("saved 1200x628 | tag size", ts, "| pill w", PILL_W, "| left max", LEFT_MAX)
