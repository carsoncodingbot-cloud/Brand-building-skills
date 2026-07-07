from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

# ---- New Facebook Page layout: desktop shows ~2.63:1 full-bleed ----
W,H = 1958,745                       # exact modern cover canvas
# mobile shows a ~16:9 center crop: width = H*1.777 = 1324
MOBW = int(H*640/360)                # 1324
MX0=(W-MOBW)//2; MX1=MX0+MOBW        # 317..1641 = mobile-safe X band
SAFE=(MX0,0,MX1,H)

FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); RED=(225,31,38,255); GOLD=(245,166,35,255)

img=Image.new("RGB",(W,H),(0,22,46)); px=img.load()
c0=(0,20,44); c1=(24,84,150)
for y in range(H):
    for x in range(W):
        t=min(1.0,max(0.0,(x/W)*0.72+(y/H)*0.28))
        px[x,y]=tuple(int(c0[i]+(c1[i]-c0[i])*t) for i in range(3))
img=img.convert("RGBA")
d=ImageDraw.Draw(img,"RGBA")

def mtn(cx,base,w,h,col): d.polygon([(cx-w,base),(cx,base-h),(cx+w,base)],fill=col)
for cx,w,h,a in [(180,430,240,24),(660,540,320,28),(1220,580,360,26),(1760,470,280,24)]:
    mtn(cx,H+26,w,h,(255,255,255,a))
for cx,w,h,a in [(420,390,185,36),(1000,430,210,38),(1560,410,195,36)]:
    mtn(cx,H+26,w,h,(255,255,255,a))

import hashlib
for i in range(56):
    hx=int(hashlib.md5(f"sx{i}".encode()).hexdigest(),16)%W
    hy=int(hashlib.md5(f"sy{i}".encode()).hexdigest(),16)%H
    r=1+(i%2)
    a=42 if (hx<MX0 or hx>MX1) else 16
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

# ---------- right: van (compact, grounded) ----------
van=Image.open("public/van.webp").convert("RGBA")
VW=560; VH=int(van.height*VW/van.width)
van=van.resize((VW,VH),Image.LANCZOS)
vx=MX1-VW-18; vy=H-VH-148
glow=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(glow)
gd.ellipse([vx+40,vy+50,vx+VW-40,vy+VH-8],fill=(72,202,228,60))
glow=glow.filter(ImageFilter.GaussianBlur(60))
img.alpha_composite(glow)
sh=Image.new("RGBA",(W,H),(0,0,0,0)); sd=ImageDraw.Draw(sh)
sd.ellipse([vx+46,vy+VH-34,vx+VW-20,vy+VH+14],fill=(0,10,26,150))
sh=sh.filter(ImageFilter.GaussianBlur(14))
img.alpha_composite(sh)
img.alpha_composite(van,(vx,vy))
d=ImageDraw.Draw(img,"RGBA")

# ---------- left column: measured stack, vertically centered ----------
X0=MX0+64
CONTENT_RIGHT=vx-44   # hard clear of the van

lock=Image.open("brand/glacier-logo-white.png").convert("RGBA")
lock=lock.crop(lock.getbbox())
lh=92; lw=int(lock.width*lh/lock.height)
# stack metrics
tag="San Antonio's Coolest HVAC Team"
ts=34
while ts>24 and X0+tw(tag,f("ExtraBold",ts)) > CONTENT_RIGHT: ts-=1
sv="AC  ·  HEATING  ·  PLUMBING  ·  24/7 EMERGENCY"
svf=f("Bold",19)
# google pill metrics (compact)
gs=46; pad=22; numf=f("Black",34); revf=f("Bold",18)
nw=tw("4.9",numf); sr_=10; sgap=24; stars_w=sgap*4+sr_*2
colw=max(nw+14+stars_w, tw("687+ Google Reviews",revf))
pw=pad+gs+16+colw+pad; pill_h=84
# phone pill metrics
phf=f("ExtraBold",27); pht="(205) 601-3797"
pw2=28+16+tw(pht,phf)+56+2; ph2=54

GAP1,GAP2,GAP3,GAP4 = 26,14,24,20
total = lh+GAP1+int(ts*1.25)+GAP2+26+GAP3+pill_h+GAP4+ph2
y = (H-total)//2
img.alpha_composite(lock.resize((lw,lh),Image.LANCZOS),(X0,y)); d=ImageDraw.Draw(img,"RGBA")
y += lh+GAP1
d.text((X0,y),tag,font=f("ExtraBold",ts),fill=(255,255,255,255))
y += int(ts*1.25)+GAP2
d.text((X0,y),sv,font=svf,fill=(178,216,244,255))
y += 26+GAP3
pill=Image.new("RGBA",(pw,pill_h),(0,0,0,0)); pd=ImageDraw.Draw(pill)
pd.rounded_rectangle([0,0,pw,pill_h],radius=17,fill=(255,255,255,255))
img.alpha_composite(pill,(X0,y))
gg=Image.open("scratchpad/googleg.png").convert("RGBA")
img.alpha_composite(gg.resize((gs,gs),Image.LANCZOS),(X0+pad,y+pill_h//2-gs//2))
d=ImageDraw.Draw(img,"RGBA")
cx=X0+pad+gs+16
r1=y+31; r2=y+61
w49=text_vc(cx,r1,"4.9",numf,NAVY)
sx=cx+w49+14+sr_
for i in range(5): star(sx+i*sgap,r1,sr_,GOLD)
text_vc(cx,r2,"687+ Google Reviews",revf,(96,116,136,255))
y += pill_h+GAP4
d.rounded_rectangle([X0,y,X0+pw2,y+ph2],radius=27,fill=RED)
phicon=Image.open("scratchpad/phone.png").convert("RGBA").resize((28,28),Image.LANCZOS)
img.alpha_composite(phicon,(X0+28,y+ph2//2-14))
d=ImageDraw.Draw(img,"RGBA")
text_vc(X0+28+28+16,y+ph2//2,pht,phf,(255,255,255,255))

img.convert("RGB").save("scratchpad/fb-cover.png",optimize=True)
full=Image.open("scratchpad/fb-cover.png")
full.save("scratchpad/fb-cover-desktop-preview.png")   # desktop = full frame
full.crop((MX0,0,MX1,H)).save("scratchpad/fb-cover-mobile-preview.png")
print("cover",full.size,"mobile band x",MX0,MX1)
