"""Ready-to-run Meta feed ad — 1080x1350 (4:5), the exact ratio Meta renders
in feed with zero cropping. Feed doctrine: fewer words than the poster, offer
in the banner, van as hero, one clean CTA bar. All measured, all vector+photo."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W,H = 1080,1350
FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); DEEP=(0,26,54,255); HEAD=(12,52,96,255)
ICE=(21,115,168,255); SLATE=(84,106,128,255)
MARG=64

img=Image.new("RGB",(W,H),(255,255,255))
px=img.load()
sky_top=(206,232,248); sky_bot=(156,205,238)
GROUND=1020
for y in range(H):
    if y<GROUND:
        t=(y/GROUND)**1.1
        c=tuple(int(sky_top[i]+(sky_bot[i]-sky_top[i])*t) for i in range(3))
    else:
        t=(y-GROUND)/(H-GROUND)
        a=(236,246,252); b=(214,232,244)
        c=tuple(int(a[i]+(b[i]-a[i])*t) for i in range(3))
    for x in range(W): px[x,y]=c
img=img.convert("RGBA")
d=ImageDraw.Draw(img,"RGBA")

def mtn(cx,base,w,h,col): d.polygon([(cx-w,base),(cx,base-h),(cx+w,base)],fill=col)
for cx,w,h,a in [(140,340,330,70),(470,420,430,90),(820,380,380,80),(1050,330,320,70)]:
    mtn(cx,GROUND+6,w,h,(255,255,255,a))
for cx,w,h,a in [(300,290,240,120),(700,330,270,130),(1000,280,230,120)]:
    mtn(cx,GROUND+6,w,h,(255,255,255,a))

def tw(t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0]
def text_vc(x,cy,t,font,fill):
    bb=d.textbbox((0,0),t,font=font); h=bb[3]-bb[1]
    d.text((x,cy-h/2-bb[1]),t,font=font,fill=fill); return bb[2]-bb[0]

# headline
size=68
while tw("STAY COMFORTABLE.",f("Black",size)) > W-2*MARG and size>40: size-=2
fh=f("Black",size)
d.text((MARG,70),"STAY COOL.",font=fh,fill=HEAD)
d.text((MARG,70+int(size*1.14)),"STAY COMFORTABLE.",font=fh,fill=HEAD)

# offer banner
by=70+int(size*2.52)
bt="NEW AC SYSTEMS  ·  FREE EXACT-PRICE ESTIMATES"
fb=f("Bold",30)
while tw(bt,fb)+72>W-2*MARG and fb.size>22: fb=f("Bold",fb.size-1)
bw=tw(bt,fb)+72
d.polygon([(MARG,by),(MARG+bw,by),(MARG+bw-22,by+62),(MARG,by+62)],fill=NAVY)
text_vc(MARG+34,by+31,bt,fb,(255,255,255,255))

# three outline chips (one line each, no subtext — feed ads breathe)
chips=["POWERFUL COOLING","ENERGY EFFICIENT","DURABLE & RELIABLE"]
cy0=by+100; fc=f("Bold",21)
cw=[tw(t,fc)+52 for t in chips]
gap=(W-2*MARG-sum(cw))//2
cx=MARG
for t,wd in zip(chips,cw):
    d.rounded_rectangle([cx,cy0,cx+wd,cy0+52],radius=26,outline=(13,66,116,200),width=3)
    text_vc(cx+26,cy0+26,t,fc,HEAD)
    cx+=wd+gap

# van hero
van=Image.open("public/van.webp").convert("RGBA")
vw=940; vh=int(van.height*vw/van.width)
van=van.resize((vw,vh),Image.LANCZOS)
vx=(W-vw)//2+8; vy=GROUND-vh+96
glow=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(glow)
gd.ellipse([vx+50,vy+70,vx+vw-50,vy+vh-16],fill=(72,202,228,70))
glow=glow.filter(ImageFilter.GaussianBlur(70))
img.alpha_composite(glow)
sh=Image.new("RGBA",(W,H),(0,0,0,0)); shd=ImageDraw.Draw(sh)
shd.ellipse([vx+60,vy+vh-52,vx+vw-34,vy+vh+20],fill=(6,24,48,150))
sh=sh.filter(ImageFilter.GaussianBlur(18))
img.alpha_composite(sh)
img.alpha_composite(van,(vx,vy))
d=ImageDraw.Draw(img,"RGBA")

# floating white brand bar
wbx,wby=MARG,GROUND+22; wbw=W-2*MARG; wbh=118
bar=Image.new("RGBA",(wbw,wbh),(0,0,0,0)); bd=ImageDraw.Draw(bar)
bd.rounded_rectangle([0,0,wbw,wbh],radius=22,fill=(255,255,255,255))
img.alpha_composite(bar,(wbx,wby))
d=ImageDraw.Draw(img,"RGBA")
mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
mh=76; mw=int(mark.width*mh/mark.height)
img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(wbx+30,wby+(wbh-mh)//2))
d=ImageDraw.Draw(img,"RGBA")
gx=wbx+30+mw+20
d.text((gx,wby+24),"GLACIER",font=f("ExtraBold",44),fill=NAVY)
gw2=tw("GLACIER",f("ExtraBold",44))
sub="HEATING & AIR"; fsub=f("Bold",17)
widths=[tw(c,fsub) if c!=' ' else 6 for c in sub]
extra=(gw2-sum(widths))/(len(sub)-1); xx=gx
for c,wd in zip(sub,widths):
    if c!=' ': d.text((xx,wby+76),c,font=fsub,fill=ICE)
    xx+=wd+extra
dvx=gx+gw2+32
d.line([(dvx,wby+26),(dvx,wby+wbh-26)],fill=(210,226,240,255),width=3)
d.text((dvx+30,wby+30),"San Antonio's Coolest HVAC Team",font=f("ExtraBold",25),fill=NAVY)
d.text((dvx+30,wby+66),"Trusted comfort. Built to last.",font=f("Bold",20),fill=SLATE)

# navy CTA block
cy=wby+wbh+26
d.rectangle([0,cy,W,H],fill=DEEP)
r1=cy+(H-cy)//2 - 14
pc=Image.new("RGBA",(70,70),(0,0,0,0)); pd=ImageDraw.Draw(pc)
pd.ellipse([0,0,70,70],outline=(255,255,255,255),width=4)
img.alpha_composite(pc,(MARG,r1-35))
ph=Image.open("scratchpad/phone.png").convert("RGBA").resize((40,40),Image.LANCZOS)
img.alpha_composite(ph,(MARG+15,r1-20))
d=ImageDraw.Draw(img,"RGBA")
px0=MARG+92
d.text((px0,r1-42),"CALL US TODAY!",font=f("Bold",23),fill=(255,255,255,225))
d.text((px0,r1-12),"(866) 665-2210",font=f("Black",46),fill=(255,255,255,255))
site="CallGlacier.com"; fs2=f("ExtraBold",27)
sw=tw(site,fs2)
d.rounded_rectangle([W-MARG-sw-56,r1-26,W-MARG,r1+26],radius=26,fill=(225,31,38,255))
text_vc(W-MARG-sw-28,r1,site,fs2,(255,255,255,255))
img.convert("RGB").save("scratchpad/feed-ad-45.png",optimize=True)
print("saved",img.size)
