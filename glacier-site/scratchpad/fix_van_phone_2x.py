"""Repaint the wrap phone zone on the 2x super-resolved van.
All coords are 1x measurements x2. Elements supersampled 4x on top of the 2x
canvas (=8x vs original). Text centering inside the pill is MEASURED from the
rendered ink and auto-corrected, not eyeballed. Pill and fine print share a
common vertical axis so the block reads designed, not pasted."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

SS = 4
van = Image.open("scratchpad/van-2x.png").convert("RGBA")
a = np.array(van.convert("RGB")).astype(float)
rng = np.random.default_rng(11)

def red_patch(box, feather=8, radius=18):
    x0,y0,x1,y1 = box
    rows, cols = y1-y0, x1-x0
    med = np.median(a[812:856, 2720:3120].reshape(-1,3), axis=0)
    grad = np.linspace(4,-7,rows).reshape(-1,1,1).repeat(cols,1).repeat(3,2)
    noise = rng.normal(0,2.2,(rows,cols,1)).repeat(3,axis=2)
    patch = Image.fromarray(np.clip(med.reshape(1,1,3)+grad+noise,0,255).astype("uint8"))
    m = Image.new("L",(cols,rows),0)
    ImageDraw.Draw(m).rounded_rectangle([0,0,cols,rows],radius=radius,fill=255)
    van.paste(patch,(x0,y0),m.filter(ImageFilter.GaussianBlur(feather)))

red_patch((2638,850,3196,1094))   # pill zone
red_patch((2570,1082,3118,1168))  # fine print zone

CX = 2884            # shared vertical axis for pill + fine print
NAVY = (0,34,71,255)

# ---------- pill: built at SS, centering measured & corrected ----------
PILL_W, PILL_H = 520, 188          # 2x footprint pre-rotation
txt = "(866) 665-2210"
fB = ImageFont.truetype("/tmp/mfonts/Montserrat-Black.ttf", 64*2*SS)
natW, natH = 620*2*SS, 124*2*SS
nat = Image.new("RGBA",(natW,natH),(0,0,0,0))
nd = ImageDraw.Draw(nat)
nd.rounded_rectangle([8*SS,20*SS,natW-8*SS,natH-20*SS], radius=104*SS, fill=NAVY)
bb  = nd.textbbox((0,0),txt,font=fB)
bbd = nd.textbbox((0,0),"8666652210",font=fB)
tx = (natW-(bb[2]-bb[0]))/2 - bb[0]
ty = natH/2 - (bbd[3]-bbd[1])/2 - bbd[1]
nd.text((tx,ty),txt,font=fB,fill=(247,249,252,255))

# measure ink vs pill extents and auto-center horizontally
na = np.array(nat)
pill_cols = np.where((na[:,:,3]>128).any(axis=0))[0]
ink = (na[:,:,0]>200)&(na[:,:,3]>128)
ink_cols = np.where(ink.any(axis=0))[0]
gapL = ink_cols[0]-pill_cols[0]; gapR = pill_cols[-1]-ink_cols[-1]
shift = (gapR-gapL)//2
if abs(shift) > 2:
    nat = Image.new("RGBA",(natW,natH),(0,0,0,0))
    nd = ImageDraw.Draw(nat)
    nd.rounded_rectangle([8*SS,20*SS,natW-8*SS,natH-20*SS], radius=104*SS, fill=NAVY)
    nd.text((tx+shift,ty),txt,font=fB,fill=(247,249,252,255))
print("pill gaps L/R:", gapL, gapR, "-> shift", shift)

tile = nat.resize((PILL_W*SS,PILL_H*SS),Image.LANCZOS)
tile = tile.rotate(5.5,resample=Image.BICUBIC,expand=True)
tile = tile.resize((tile.width//SS,tile.height//SS),Image.LANCZOS)
van.alpha_composite(tile,(CX-tile.width//2, 962-tile.height//2))

# ---------- fine print, same axis ----------
fb2 = ImageFont.truetype("/tmp/mfonts/Montserrat-Bold.ttf", 34*2*SS)
line = "SAN ANTONIO · 24/7 EMERGENCY SERVICE"
t2 = Image.new("RGBA",(1150*2*SS,48*2*SS),(0,0,0,0))
t2d = ImageDraw.Draw(t2)
x = 0
for c in line:
    if c==' ': x += 12*2*SS; continue
    t2d.text((x,4*2*SS),c,font=fb2,fill=(243,246,249,252))
    bbc = t2d.textbbox((0,0),c,font=fb2); x += bbc[2]-bbc[0]+3*2*SS
t2 = t2.crop((0,0,x+8,48*2*SS)).resize((568*SS,56*SS),Image.LANCZOS)
t2 = t2.rotate(6,resample=Image.BICUBIC,expand=True)
t2 = t2.resize((t2.width//SS,t2.height//SS),Image.LANCZOS)
van.alpha_composite(t2,(CX-t2.width//2, 1106-t2.height//2))

van.convert("RGB").save("public/van.webp","WEBP",quality=95,method=6)
print("2x wrap done", van.size)
