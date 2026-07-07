"""HD repaint of the van wrap phone pill + fine print.
All elements built at 4x supersample, rotated at 4x, downscaled ONCE (crisp AA),
number optically centered on digit cap-height, full-opacity vinyl print."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

SS = 4
van = Image.open("scratchpad/van-orig-backup.webp").convert("RGBA")
a = np.array(van.convert("RGB")).astype(float)
rng = np.random.default_rng(11)

def red_patch(box, feather=4, radius=9):
    x0,y0,x1,y1 = box
    rows, cols = y1-y0, x1-x0
    med = np.median(a[406:428, 1360:1560].reshape(-1,3), axis=0)
    grad = np.linspace(4,-7,rows).reshape(-1,1,1).repeat(cols,1).repeat(3,2)
    noise = rng.normal(0,2.6,(rows,cols,1)).repeat(3,axis=2)
    patch = Image.fromarray(np.clip(med.reshape(1,1,3)+grad+noise,0,255).astype("uint8"))
    m = Image.new("L",(cols,rows),0)
    ImageDraw.Draw(m).rounded_rectangle([0,0,cols,rows],radius=radius,fill=255)
    van.paste(patch,(x0,y0),m.filter(ImageFilter.GaussianBlur(feather)))

red_patch((1320,426,1597,546))
red_patch((1286,542,1558,582))

# ---------------- phone pill, 4x supersampled ----------------
NAVY=(0,34,71,255)
FINAL_W, FINAL_H = 260, 94          # pill footprint before rotation
txt = "(866) 665-2210"
# draw at natural glyph proportions, huge
fB = ImageFont.truetype("/tmp/mfonts/Montserrat-Black.ttf", 64*SS)
nat = Image.new("RGBA", (620*SS, 124*SS), (0,0,0,0))
nd = ImageDraw.Draw(nat)
nd.rounded_rectangle([4*SS, 10*SS, 616*SS, 114*SS], radius=52*SS, fill=NAVY)
bb  = nd.textbbox((0,0), txt, font=fB)                 # full string bbox
bbd = nd.textbbox((0,0), "8666652210", font=fB)        # digits-only cap box
tx = (620*SS - (bb[2]-bb[0]))/2 - bb[0]
# vertical: center the DIGITS' box in the pill (4..114 band), parens hang naturally
pill_cy = (10*SS + 114*SS)/2
ty = pill_cy - (bbd[3]-bbd[1])/2 - bbd[1]
nd.text((tx, ty), txt, font=fB, fill=(247,249,252,255))
# perspective squash at 4x, rotate at 4x, ONE downscale
tile = nat.resize((FINAL_W*SS, FINAL_H*SS), Image.LANCZOS)
tile = tile.rotate(5.5, resample=Image.BICUBIC, expand=True)
tile = tile.resize((tile.width//SS, tile.height//SS), Image.LANCZOS)
van.alpha_composite(tile, (1332, 424))

# ---------------- fine print, 4x supersampled ----------------
fb2 = ImageFont.truetype("/tmp/mfonts/Montserrat-Bold.ttf", 34*SS)
line = "SAN ANTONIO · 24/7 EMERGENCY SERVICE"
t2 = Image.new("RGBA", (1100*SS, 48*SS), (0,0,0,0))
t2d = ImageDraw.Draw(t2)
x = 0
for c in line:
    if c==' ': x += 12*SS; continue
    t2d.text((x, 4*SS), c, font=fb2, fill=(243,246,249,252))
    bbc = t2d.textbbox((0,0), c, font=fb2); x += bbc[2]-bbc[0] + 3*SS
t2 = t2.crop((0,0,x+4*SS,48*SS)).resize((284*SS, 28*SS), Image.LANCZOS)
t2 = t2.rotate(6, resample=Image.BICUBIC, expand=True)
t2 = t2.resize((t2.width//SS, t2.height//SS), Image.LANCZOS)
van.alpha_composite(t2, (1298, 521))

# gentle overall crisping of the edited zone only
zone = van.crop((1270, 400, 1600, 600)).filter(ImageFilter.UnsharpMask(1.6, 55, 2))
van.paste(zone, (1270, 400))

van.save("public/van.webp", "WEBP", quality=95)
print("HD wrap done")
