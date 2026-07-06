from PIL import Image, ImageDraw, ImageFont
import math

W, H = 1200, 630
FT = "/tmp/mfonts"
def f(name, sz): return ImageFont.truetype(f"{FT}/Montserrat-{name}.ttf", sz)

# --- vertical navy gradient background (ice-500-ish top -> deep navy bottom)
top = (30, 92, 168)     # icy blue
bot = (0, 20, 45)       # deep navy
img = Image.new("RGB", (W, H), bot)
px = img.load()
for y in range(H):
    t = y / (H - 1)
    # ease toward navy
    e = t ** 0.85
    r = int(top[0] + (bot[0]-top[0]) * e)
    g = int(top[1] + (bot[1]-top[1]) * e)
    b = int(top[2] + (bot[2]-top[2]) * e)
    for x in range(W):
        px[x, y] = (r, g, b)

d = ImageDraw.Draw(img, "RGBA")

# --- faint mountain silhouettes (brand motif)
def mtn(cx, base, w, h, col):
    d.polygon([(cx-w, base), (cx, base-h), (cx+w, base)], fill=col)
for (cx, w, h) in [(250, 320, 300), (620, 380, 380), (1000, 340, 320), (1180, 300, 260)]:
    mtn(cx, H+20, w, h, (255, 255, 255, 16))

# --- soft turquoise glow behind logo
glow = Image.new("RGBA", (W, H), (0,0,0,0))
gd = ImageDraw.Draw(glow)
gd.ellipse([70, 150, 470, 500], fill=(72, 202, 228, 60))
glow = glow.filter(__import__("PIL.ImageFilter", fromlist=["GaussianBlur"]).GaussianBlur(70))
img = Image.alpha_composite(img.convert("RGBA"), glow)
d = ImageDraw.Draw(img, "RGBA")

# --- logo mark (left)
mark = Image.open("public/logo-mark.png").convert("RGBA")
mh = 250
mw = int(mark.width * mh / mark.height)
mark = mark.resize((mw, mh), Image.LANCZOS)
my = (H - mh)//2 - 40
img.alpha_composite(mark, (90, my))

# --- text block (right of mark)
tx = 90 + mw + 55
# GLACIER wordmark
d.text((tx, 175), "GLACIER", font=f("Black", 96), fill=(255,255,255))
d.text((tx+4, 285), "HEATING & AIR", font=f("Bold", 40), fill=(150, 206, 245))

# tagline
d.text((tx+4, 355), "San Antonio's Trusted HVAC Team", font=f("ExtraBold", 34), fill=(255,255,255))

# --- bottom bar: rating + services + phone
by = 470
def star(cx, cy, r, fill):
    pts = []
    for i in range(10):
        ang = -math.pi/2 + i * math.pi/5
        rad = r if i % 2 == 0 else r*0.42
        pts.append((cx + rad*math.cos(ang), cy + rad*math.sin(ang)))
    d.polygon(pts, fill=fill)
d.text((90, by), "4.9", font=f("Black", 54), fill=(255, 199, 44))
sx = 188
for i in range(5):
    star(sx + i*46, by+30, 20, (255, 199, 44))
d.text((90, by+70), "687+ Google Reviews", font=f("Bold", 26), fill=(200, 224, 245))

# services line
d.text((470, by+2), "AC  ·  Heating  ·  Plumbing  ·  24/7 Emergency", font=f("Bold", 27), fill=(210, 230, 248))
# phone in red pill
pill = (470, by+52, 470+340, by+52+66)
d.rounded_rectangle(pill, radius=33, fill=(225, 31, 38))
d.text((470+34, by+66), "(205) 601-3797", font=f("ExtraBold", 34), fill=(255,255,255))

img.convert("RGB").save("public/og.png", "PNG", optimize=True)
print("wrote public/og.png", img.size)
