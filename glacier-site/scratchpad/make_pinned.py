"""Pinned hero post — 4:5 portrait, rendered at 2x (2160x2700) for maximum
sharpness after Facebook compression. Van placed by measured alpha bounds with
explicit reserved text zones; overlap is checked, not eyeballed."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import hashlib

SC=2
W,H=1080*SC,1350*SC; M=72*SC
FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s*SC)
NAVY=(0,43,88,255); DEEPN=(0,26,54,255); RED=(225,31,38,255)
HEAD=(12,52,96,255); SLATE=(84,106,128,255); ICE=(21,115,168,255)

# ---------- background: light ice sky, mountains, snow ground ----------
GROUND=1030*SC
img=Image.new("RGB",(W,H),(255,255,255)); px=img.load()
st=(214,236,250); sb=(164,208,240)
for y in range(H):
    if y<GROUND:
        t=(y/GROUND)**1.08
        c=tuple(int(st[i]+(sb[i]-st[i])*t) for i in range(3))
    else:
        t=(y-GROUND)/(H-GROUND)
        c=(int(238-(20*t)),int(247-(14*t)),int(252-(8*t)))
    for x in range(W): px[x,y]=c
img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
for cx,w,h,a in [(int(W*0.12),int(W*0.3),int(H*0.22),85),(int(W*0.46),int(W*0.36),int(H*0.28),95),
                 (int(W*0.8),int(W*0.32),int(H*0.24),85)]:
    d.polygon([(cx-w,GROUND+8),(cx,GROUND+8-h),(cx+w,GROUND+8)],fill=(255,255,255,a))
for cx,w,h,a in [(int(W*0.28),int(W*0.24),int(H*0.19),130),(int(W*0.68),int(W*0.27),int(H*0.21),140)]:
    d.polygon([(cx-w,GROUND+8),(cx,GROUND+8-h),(cx+w,GROUND+8)],fill=(255,255,255,a))

def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb
def center(d,t,font,cy,fill,cx=W//2):
    w,h,bb=T(d,t,font)
    d.text((cx-w/2-bb[0],cy-h/2-bb[1]),t,font=font,fill=fill); return w
def tracked_center(d,t,font,cy,fill,track):
    track*=SC
    widths=[T(d,c,font)[0] if c!=' ' else font.size*0.5 for c in t]
    total=sum(widths)+track*(len(t)-1)
    x=(W-total)/2
    ref=d.textbbox((0,0),"K",font=font); ytop=cy-(ref[3]-ref[1])/2-ref[1]
    for c,w in zip(t,widths):
        if c!=' ': d.text((x,ytop),c,font=font,fill=fill)
        x+=w+track

# ---------- reserved text zone: top block ----------
tracked_center(d,"SAN ANTONIO  ·  HEATING  ·  AIR  ·  PLUMBING",f("Bold",23),66*SC,HEAD,6)
center(d,"SAN ANTONIO,",f("Black",76),150*SC,HEAD)
center(d,"MEET GLACIER.",f("Black",76),232*SC,(21,115,168,255))
center(d,"Exact prices in writing. Callbacks in minutes. Comfort that lasts.",f("Bold",27),306*SC,SLATE)
TEXT_BOTTOM=336*SC

# ---------- van hero: measured placement ----------
van=Image.open("public/van.webp").convert("RGBA")
vw=985*SC; vh=int(van.height*vw/van.width)
v=van.resize((vw,vh),Image.LANCZOS).filter(ImageFilter.UnsharpMask(1.4,42,2))
bbox=v.getbbox()                      # true painted bounds of the cutout
vx=(W-vw)//2+8*SC
vy=GROUND-bbox[3]-int(18*SC)          # wheels float just above the ground line
assert vy+bbox[1] > TEXT_BOTTOM+14*SC, f"van top {vy+bbox[1]} collides text {TEXT_BOTTOM}"
glow=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(glow)
gd.ellipse([vx+int(vw*0.06),vy+int(vh*0.14),vx+vw-int(vw*0.06),vy+vh-int(vh*0.02)],fill=(72,202,228,60))
img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(60*SC)))
sh=Image.new("RGBA",(W,H),(0,0,0,0)); sd=ImageDraw.Draw(sh)
sh_y=vy+bbox[3]
sd.ellipse([vx+int(vw*0.08),sh_y-int(30*SC),vx+vw-int(vw*0.05),sh_y+int(16*SC)],fill=(6,24,48,140))
img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(13*SC)))
img.alpha_composite(v,(vx,vy))
d=ImageDraw.Draw(img,"RGBA")

# ---------- trust chips under the ground line ----------
chips=["FREE ESTIMATES","LICENSED & INSURED","24/7 EMERGENCY"]
fc=f("Bold",19)
cw=[T(d,t,fc)[0]+int(44*SC) for t in chips]
gap=(W-2*M-sum(cw))//2
cx=M; ch=int(46*SC); cy0=GROUND+int(34*SC)
for t,wd in zip(chips,cw):
    d.rounded_rectangle([cx,cy0,cx+wd,cy0+ch],radius=ch//2,fill=(255,255,255,235),outline=(13,66,116,140),width=2*SC)
    w,hh,bb=T(d,t,fc)
    d.text((cx+(wd-w)/2-bb[0],cy0+(ch-hh)/2-bb[1]),t,font=fc,fill=HEAD)
    cx+=wd+gap

# ---------- white brand bar ----------
wby=GROUND+int(96*SC); wbh=int(104*SC)
bar=Image.new("RGBA",(W-2*M,wbh),(0,0,0,0)); bd=ImageDraw.Draw(bar)
bd.rounded_rectangle([0,0,W-2*M,wbh],radius=int(20*SC),fill=(255,255,255,255))
img.alpha_composite(bar,(M,wby)); d=ImageDraw.Draw(img,"RGBA")
mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
mh=int(66*SC); mw=int(mark.width*mh/mark.height)
img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(M+int(26*SC),wby+(wbh-mh)//2))
d=ImageDraw.Draw(img,"RGBA")
gx=M+int(26*SC)+mw+int(16*SC)
gf=f("ExtraBold",38)
d.text((gx,wby+int(18*SC)),"GLACIER",font=gf,fill=NAVY)
gw2=T(d,"GLACIER",gf)[0]
sub="HEATING & AIR"; fsub=f("Bold",14)
widths=[T(d,c,fsub)[0] if c!=' ' else 5*SC for c in sub]
extra=(gw2-sum(widths))/(len(sub)-1); xx=gx
for c,wd in zip(sub,widths):
    if c!=' ': d.text((xx,wby+int(64*SC)),c,font=fsub,fill=ICE)
    xx+=wd+extra
dvx=gx+gw2+int(24*SC)
d.line([(dvx,wby+int(22*SC)),(dvx,wby+wbh-int(22*SC))],fill=(210,226,240,255),width=3*SC)
d.text((dvx+int(22*SC),wby+int(22*SC)),"San Antonio's Coolest HVAC Team",font=f("ExtraBold",23),fill=NAVY)
d.text((dvx+int(22*SC),wby+int(56*SC)),"Trusted comfort. Built to last.",font=f("Bold",18),fill=SLATE)

# ---------- navy CTA strip ----------
cy=wby+wbh+int(22*SC)
d.rectangle([0,cy,W,H],fill=DEEPN)
r1=(cy+H)//2
cs=int(58*SC)
pc=Image.new("RGBA",(cs,cs),(0,0,0,0)); pdd=ImageDraw.Draw(pc)
pdd.ellipse([0,0,cs,cs],outline=(255,255,255,255),width=4*SC)
img.alpha_composite(pc,(M,r1-cs//2))
ph=Image.open("scratchpad/phone.png").convert("RGBA").resize((int(cs*0.56),int(cs*0.56)),Image.LANCZOS)
img.alpha_composite(ph,(M+int(cs*0.22),r1-int(cs*0.28)))
d=ImageDraw.Draw(img,"RGBA")
px0=M+cs+int(20*SC)
d.text((px0,r1-int(38*SC)),"CALL US TODAY!",font=f("Bold",20),fill=(255,255,255,225))
d.text((px0,r1-int(10*SC)),"(866) 665-2210",font=f("Black",40),fill=(255,255,255,255))
site="CallGlacier.com"; fs2=f("ExtraBold",24)
sw=T(d,site,fs2)[0]
d.rounded_rectangle([W-M-sw-int(48*SC),r1-int(24*SC),W-M,r1+int(24*SC)],radius=int(24*SC),fill=RED)
w,hh,bb=T(d,site,fs2)
d.text((W-M-sw-int(24*SC)-bb[0],r1-hh/2-bb[1]),site,font=fs2,fill=(255,255,255,255))

img.convert("RGB").save("scratchpad/pinned-van.png",optimize=True)
print("saved",img.size,"| van top",vy+bbox[1],"text bottom",TEXT_BOTTOM)
