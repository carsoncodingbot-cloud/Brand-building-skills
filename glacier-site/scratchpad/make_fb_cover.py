from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

# ---- Facebook cover math (2x master) ----
W,H = 1640,924            # upload size (2x of 820x462)
DESK = (0,150,1640,774)   # desktop shows center 1640x624
MOB  = (180,102,1460,822) # mobile shows center 1280x720
SAFE = (180,150,1460,774) # intersection: visible EVERYWHERE

FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); DEEP=(0,22,46,255); RED=(225,31,38,255)
GOLD=(245,166,35,255); ICE=(150,206,245,255); TURQ=(72,202,228,255)

# ---------- background: diagonal deep-navy -> ice, full bleed ----------
img=Image.new("RGB",(W,H),(0,22,46)); px=img.load()
c0=(0,20,44); c1=(24,84,150)
for y in range(H):
    for x in range(W):
        t=min(1.0,max(0.0,(x/W)*0.72+(y/H)*0.28))
        px[x,y]=tuple(int(c0[i]+(c1[i]-c0[i])*t) for i in range(3))
img=img.convert("RGBA")
d=ImageDraw.Draw(img,"RGBA")

# mountains along the bottom, full bleed
def mtn(cx,base,w,h,col): d.polygon([(cx-w,base),(cx,base-h),(cx+w,base)],fill=col)
for cx,w,h,a in [(140,420,300,26),(560,520,400,32),(1020,560,460,30),(1480,460,340,26)]:
    mtn(cx,H+30,w,h,(255,255,255,a))
for cx,w,h,a in [(340,380,230,40),(860,420,260,42),(1340,400,240,40)]:
    mtn(cx,H+30,w,h,(255,255,255,a))

# sparse snowflake specks (edges, outside safe zone so they never crowd content)
import hashlib
for i in range(46):
    hx=int(hashlib.md5(f"sx{i}".encode()).hexdigest(),16)%W
    hy=int(hashlib.md5(f"sy{i}".encode()).hexdigest(),16)%H
    r=1+(i%2)
    a=46 if (hx<SAFE[0] or hx>SAFE[2] or hy<SAFE[1] or hy>SAFE[3]) else 20
    d.ellipse([hx-r,hy-r,hx+r,hy+r],fill=(255,255,255,a))

def tw(t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0]
def text_vc(x,cy,t,font,fill):
    bb=d.textbbox((0,0),t,font=font); h=bb[3]-bb[1]
    d.text((x,cy-h/2-bb[1]),t,font=font,fill=fill); return bb[2]-bb[0]
def star(cx,cy,r,fill):
    pts=[]
    for i in range(10):
        a=-math.pi/2+i*math.pi/5; rad=r if i%2==0 else r*0.42
        pts.append((cx+rad*math.cos(a),cy+rad*math.sin(a)))
    d.polygon(pts,fill=fill)

X0=240   # left column inside safe zone

# ---------- left: white logo lockup ----------
lock=Image.open("brand/glacier-logo-white.png").convert("RGBA")
lock=lock.crop(lock.getbbox())
lh=132; lw=int(lock.width*lh/lock.height)
img.alpha_composite(lock.resize((lw,lh),Image.LANCZOS),(X0,196))
d=ImageDraw.Draw(img,"RGBA")

# tagline + services line (auto-fit clear of van zone)
VAN_W=560
VAN_LEFT=SAFE[2]-VAN_W-6
tag="San Antonio's Coolest HVAC Team"
ts=40
while ts>28 and tw(tag,f("ExtraBold",ts)) > VAN_LEFT-X0-36: ts-=1
d.text((X0,368),tag,font=f("ExtraBold",ts),fill=(255,255,255,255))
sv="AC  ·  HEATING  ·  PLUMBING  ·  24/7 EMERGENCY"
d.text((X0,368+int(ts*1.5)),sv,font=f("Bold",23),fill=(178,216,244,255))

# ---------- Google review pill ----------
gg=Image.open("scratchpad/googleg.png").convert("RGBA")
py0=492; pill_h=104; gs=58; pad=26
numf=f("Black",42); revf=f("Bold",22)
nw=tw("4.9",numf); sr_=13; sgap=30; stars_w=sgap*4+sr_*2
row1=nw+16+stars_w
rw=tw("687+ Google Reviews",revf)
colw=max(row1,rw)
pw=pad+gs+20+colw+pad
pill=Image.new("RGBA",(pw,pill_h),(0,0,0,0)); pd=ImageDraw.Draw(pill)
pd.rounded_rectangle([0,0,pw,pill_h],radius=20,fill=(255,255,255,255))
img.alpha_composite(pill,(X0,py0))
img.alpha_composite(gg.resize((gs,gs),Image.LANCZOS),(X0+pad,py0+pill_h//2-gs//2))
d=ImageDraw.Draw(img,"RGBA")
cx=X0+pad+gs+20
r1=py0+38; r2=py0+76
w49=text_vc(cx,r1,"4.9",numf,NAVY)
sx=cx+w49+16+sr_
for i in range(5): star(sx+i*sgap,r1,sr_,GOLD)
text_vc(cx,r2,"687+ Google Reviews",revf,(96,116,136,255))

# ---------- red phone CTA pill ----------
phf=f("ExtraBold",34); pht="(205) 601-3797"
phicon=Image.open("scratchpad/phone.png").convert("RGBA").resize((34,34),Image.LANCZOS)
pw2=34+16+tw(pht,phf)+72; ph2=64
p2y=py0+pill_h+26
d.rounded_rectangle([X0,p2y,X0+pw2,p2y+ph2],radius=32,fill=RED)
img.alpha_composite(phicon,(X0+34,p2y+ph2//2-17))
d=ImageDraw.Draw(img,"RGBA")
text_vc(X0+34+34+16,p2y+ph2//2,pht,phf,(255,255,255,255))

# ---------- right: van hero ----------
van=Image.open("public/van.webp").convert("RGBA")
vw=VAN_W; vh=int(van.height*vw/van.width)
van=van.resize((vw,vh),Image.LANCZOS)
vx=VAN_LEFT; vy=752-vh
glow=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(glow)
gd.ellipse([vx+40,vy+60,vx+vw-40,vy+vh-10],fill=(72,202,228,64))
glow=glow.filter(ImageFilter.GaussianBlur(70))
img.alpha_composite(glow)
sh=Image.new("RGBA",(W,H),(0,0,0,0)); sd=ImageDraw.Draw(sh)
sd.ellipse([vx+50,vy+vh-40,vx+vw-24,vy+vh+16],fill=(0,10,26,150))
sh=sh.filter(ImageFilter.GaussianBlur(16))
img.alpha_composite(sh)
img.alpha_composite(van,(vx,vy))
d=ImageDraw.Draw(img,"RGBA")

img.convert("RGB").save("scratchpad/fb-cover.png",optimize=True)

# ---------- device previews ----------
full=Image.open("scratchpad/fb-cover.png")
full.crop(DESK).save("scratchpad/fb-cover-desktop-preview.png")
full.crop(MOB).save("scratchpad/fb-cover-mobile-preview.png")
print("cover",full.size,"desktop",DESK,"mobile",MOB)
