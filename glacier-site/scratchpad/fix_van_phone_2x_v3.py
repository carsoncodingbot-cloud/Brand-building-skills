"""v3: patch-free pill (new pill fully eclipses the old one) + guarded inpaint
for the fine-print strip only. Everything measured from the pixels."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np, cv2

SS = 4
van = Image.open("scratchpad/van-2x.png").convert("RGBA")
a = np.array(van.convert("RGB")).astype(int)

# ---------- measure the old pill ----------
w0, w1, h0, h1 = 2620, 3200, 830, 1100
win = a[h0:h1, w0:w1]
navy = (win[:,:,2] > win[:,:,0]+25) & (win[:,:,0] < 60)
ys, xs = np.where(navy)
ox0, ox1, oy0, oy1 = w0+xs.min(), w0+xs.max(), h0+ys.min(), h0+ys.max()
ocx, ocy = (ox0+ox1)//2, (oy0+oy1)//2
print(f"old pill x {ox0}..{ox1} y {oy0}..{oy1} center ({ocx},{ocy}) size {ox1-ox0}x{oy1-oy0}")

# ---------- measure old fine print ----------
fw = a[1020:1170, 2560:3200]
white = fw.sum(axis=2) > 560
fys, fxs = np.where(white)
fx0, fx1, fy0, fy1 = 2560+fxs.min(), 2560+fxs.max(), 1020+fys.min(), 1020+fys.max()
fcx, fcy = (fx0+fx1)//2, (fy0+fy1)//2
print(f"old fine print x {fx0}..{fx1} y {fy0}..{fy1} center ({fcx},{fcy})")

# ---------- guarded inpaint of the fine print strip ----------
bgr = cv2.cvtColor(np.array(van.convert("RGB")), cv2.COLOR_RGB2BGR)
red_med = np.median(a[820:850, 2700:3120].reshape(-1,3), axis=0)[::-1]  # BGR
guard = bgr.copy()
gy0 = fy1 + 10
guard[gy0:gy0+120, fx0-40:fx1+40] = red_med          # block fender darkness below
guard[fy0-40:fy1+40, fx1+20:fx1+140] = red_med       # block trim to the right
mask = np.zeros(bgr.shape[:2], np.uint8)
cv2.rectangle(mask, (fx0-14, fy0-14), (fx1+14, fy1+14), 255, -1)
out = cv2.inpaint(guard, mask, 5, cv2.INPAINT_TELEA)
# keep inpainted pixels only inside the mask; guards revert to original
res = np.where(mask[:,:,None] == 255, out, bgr)
van = Image.fromarray(cv2.cvtColor(res.astype("uint8"), cv2.COLOR_BGR2RGB)).convert("RGBA")

# ---------- new pill: same center/tilt as old, +margin so it fully covers ----------
NAVY = (10, 30, 66, 255)
PILL_W = (ox1-ox0) + 18            # eclipse with margin
PILL_H = (oy1-oy0) + 14
txt = "(866) 665-2210"
fB = ImageFont.truetype("/tmp/mfonts/Montserrat-Black.ttf", 64*2*SS)
natW, natH = 620*2*SS, 124*2*SS
nat = Image.new("RGBA", (natW, natH), (0,0,0,0))
nd = ImageDraw.Draw(nat)
nd.rounded_rectangle([8*SS, 20*SS, natW-8*SS, natH-20*SS], radius=104*SS, fill=NAVY)
bb  = nd.textbbox((0,0), txt, font=fB)
bbd = nd.textbbox((0,0), "8666652210", font=fB)
tx = (natW-(bb[2]-bb[0]))/2 - bb[0]
ty = natH/2 - (bbd[3]-bbd[1])/2 - bbd[1]
nd.text((tx, ty), txt, font=fB, fill=(247,249,252,255))
na = np.array(nat)
pill_cols = np.where((na[:,:,3]>128).any(axis=0))[0]
ink = (na[:,:,0]>200)&(na[:,:,3]>128)
ink_cols = np.where(ink.any(axis=0))[0]
shift = ((pill_cols[-1]-ink_cols[-1]) - (ink_cols[0]-pill_cols[0]))//2
if abs(shift) > 2:
    nat = Image.new("RGBA",(natW,natH),(0,0,0,0))
    nd = ImageDraw.Draw(nat)
    nd.rounded_rectangle([8*SS,20*SS,natW-8*SS,natH-20*SS],radius=104*SS,fill=NAVY)
    nd.text((tx+shift,ty),txt,font=fB,fill=(247,249,252,255))
print("pill ink shift", shift)
tile = nat.resize((PILL_W*SS, PILL_H*SS), Image.LANCZOS)
tile = tile.rotate(5.5, resample=Image.BICUBIC, expand=True)
tile = tile.resize((tile.width//SS, tile.height//SS), Image.LANCZOS)
van.alpha_composite(tile, (ocx-tile.width//2, ocy-tile.height//2))

# ---------- new fine print at the old center ----------
fb2 = ImageFont.truetype("/tmp/mfonts/Montserrat-Bold.ttf", 34*2*SS)
line = "SAN ANTONIO · 24/7 EMERGENCY SERVICE"
t2 = Image.new("RGBA", (1150*2*SS, 48*2*SS), (0,0,0,0))
t2d = ImageDraw.Draw(t2)
x = 0
for c in line:
    if c==' ': x += 12*2*SS; continue
    t2d.text((x, 4*2*SS), c, font=fb2, fill=(243,246,249,250))
    bbc = t2d.textbbox((0,0), c, font=fb2); x += bbc[2]-bbc[0]+3*2*SS
t2 = t2.crop((0,0,x+8,48*2*SS)).resize(((fx1-fx0)*SS, 56*SS), Image.LANCZOS)
t2 = t2.rotate(6, resample=Image.BICUBIC, expand=True)
t2 = t2.resize((t2.width//SS, t2.height//SS), Image.LANCZOS)
van.alpha_composite(t2, (fcx-t2.width//2, fcy-t2.height//2))

van.convert("RGB").save("public/van.webp", "WEBP", quality=95, method=6)
print("v3 done", van.size)
