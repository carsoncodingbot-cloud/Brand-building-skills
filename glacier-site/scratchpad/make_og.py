from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W, H = 1200, 630
FT = "/tmp/mfonts"
def f(name, sz): return ImageFont.truetype(f"{FT}/Montserrat-{name}.ttf", sz)

# ---------- background: smooth icy-navy gradient ----------
top = (30, 92, 168); bot = (0, 18, 42)
img = Image.new("RGB", (W, H), bot); px = img.load()
for y in range(H):
    t = (y/(H-1)) ** 0.95
    row = tuple(int(top[i]+(bot[i]-top[i])*t) for i in range(3))
    for x in range(W): px[x, y] = row
img = img.convert("RGBA")

# very faint mountain silhouettes (subtle, one soft layer)
mt = Image.new("RGBA", (W, H), (0,0,0,0)); dm = ImageDraw.Draw(mt)
for (cx, w, h) in [(300,360,240),(720,440,320),(1050,360,260)]:
    dm.polygon([(cx-w, H), (cx, H-h), (cx+w, H)], fill=(255,255,255,10))
img = Image.alpha_composite(img, mt)
d = ImageDraw.Draw(img, "RGBA")

def text_vc(x, cy, text, font, fill):
    bb = d.textbbox((0,0), text, font=font); h = bb[3]-bb[1]
    d.text((x, cy - h/2 - bb[1]), text, font=font, fill=fill)
    return bb[2]-bb[0]
def star(cx, cy, r, fill):
    pts=[]
    for i in range(10):
        a=-math.pi/2+i*math.pi/5; rad=r if i%2==0 else r*0.42
        pts.append((cx+rad*math.cos(a), cy+rad*math.sin(a)))
    d.polygon(pts, fill=fill)

MARGIN = 72

# ---------- VAN hero (right), bottom-anchored with soft shadow ----------
van = Image.open("public/van.webp").convert("RGBA")
vw = 632; vh = int(van.height*vw/van.width)
van = van.resize((vw, vh), Image.LANCZOS)
vx = W - vw - 12; vy = H - vh - 62
# ground shadow from van alpha
sh = Image.new("RGBA", van.size, (0,0,0,0))
sh.paste((2,10,26,255), (0,0), van.getchannel("A"))
sh = sh.resize((vw, int(vh*0.16)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(12))
img.alpha_composite(sh, (vx, vy+vh-int(vh*0.14)))
img.alpha_composite(van, (vx, vy))
d = ImageDraw.Draw(img, "RGBA")

# ---------- LEFT column: brand + rating + CTA ----------
# logo mark + wordmark
mark = Image.open("public/logo-mark.png").convert("RGBA")
mh = 92; mw = int(mark.width*mh/mark.height)
mark = mark.resize((mw, mh), Image.LANCZOS)
img.alpha_composite(mark, (MARGIN, 70))
d = ImageDraw.Draw(img, "RGBA")
wx = MARGIN + mw + 20
d.text((wx, 72), "GLACIER", font=f("Black", 62), fill=(255,255,255))
d.text((wx+3, 138), "HEATING & AIR", font=f("Bold", 26), fill=(150,206,245))

# tagline
d.text((MARGIN, 196), "San Antonio's Trusted", font=f("ExtraBold", 40), fill=(255,255,255))
d.text((MARGIN, 244), "HVAC Team", font=f("ExtraBold", 40), fill=(150,206,245))

# Google review badge (white pill)
gg = Image.open("scratchpad/googleg.png").convert("RGBA")
py0 = 322; pill_h = 116; gsize = 60; pad = 28
num_font = f("Black", 44); rev_font = f("Bold", 23)
nb = d.textbbox((0,0),"4.9",font=num_font); num_w = nb[2]-nb[0]
star_r = 14; star_gap = 31; stars_w = star_gap*4 + star_r
row1_w = num_w + 18 + stars_w
rb = d.textbbox((0,0),"687+ Google Reviews",font=rev_font); rev_w = rb[2]-rb[0]
col_w = max(row1_w, rev_w)
pill_w = pad + gsize + 22 + col_w + pad
d.rounded_rectangle([MARGIN, py0, MARGIN+pill_w, py0+pill_h], radius=22, fill=(255,255,255,255))
g_cy = py0 + pill_h//2
img.alpha_composite(gg.resize((gsize,gsize), Image.LANCZOS), (MARGIN+pad, g_cy-gsize//2))
d = ImageDraw.Draw(img, "RGBA")
colx = MARGIN + pad + gsize + 22
r1 = py0 + 42; r2 = py0 + 82
w49 = text_vc(colx, r1, "4.9", num_font, (0,43,88,255))
sx = colx + w49 + 18 + star_r
for i in range(5): star(sx + i*star_gap, r1, star_r, (245,166,35,255))
text_vc(colx, r2, "687+ Google Reviews", rev_font, (92,112,132,255))

# CTA: red phone pill with a rasterized phone icon + centered number
ph_font = f("ExtraBold", 34); ph_txt = "(205) 601-3797"
pb = d.textbbox((0,0), ph_txt, font=ph_font); ph_w = pb[2]-pb[0]
gap_icon = 16
try:
    phicon = Image.open("scratchpad/phone.png").convert("RGBA")
    isz = 34; phicon = phicon.resize((isz, isz), Image.LANCZOS)
except Exception:
    phicon = None; isz = 0; gap_icon = 0
content_w = (isz + gap_icon if phicon else 0) + ph_w
p2x, p2y = MARGIN, 470; sidepad = 40; p2w = sidepad*2 + content_w; p2h = 62
d.rounded_rectangle([p2x, p2y, p2x+p2w, p2y+p2h], radius=31, fill=(225,31,38,255))
gy = p2y + p2h//2
cx = p2x + sidepad
if phicon:
    img.alpha_composite(phicon, (cx, gy - isz//2)); d = ImageDraw.Draw(img, "RGBA")
    cx += isz + gap_icon
text_vc(cx, gy, ph_txt, ph_font, (255,255,255,255))

d.text((MARGIN, 552), "AC  ·  Heating  ·  Plumbing  ·  24/7 Emergency",
       font=f("Bold", 22), fill=(190,214,238,255))

img.convert("RGB").save("public/og.png", "PNG", optimize=True)
print("saved", img.size)
