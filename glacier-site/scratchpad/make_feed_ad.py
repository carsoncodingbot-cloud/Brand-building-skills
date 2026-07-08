"""Meta feed ad 1080x1350 (4:5) — the poster design compressed to feed ratio.
Same DNA as ad-van-stay-cool.png: stamp, headline, offer banner, icon feature
badges with subtext, van hero, white brand bar, navy CTA with trust items and
the sign-off strip. All measured with fit loops."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W,H = 1080,1350
FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); DEEP=(0,26,54,255); HEAD=(12,52,96,255)
ICE=(21,115,168,255); SLATE=(84,106,128,255)
MARG=72

img=Image.new("RGB",(W,H),(255,255,255))
px=img.load()
sky_top=(206,232,248); sky_bot=(156,205,238)
GROUND=1040
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
for cx,w,h,a in [(140,330,320,70),(470,410,420,90),(820,370,370,80),(1050,320,310,70)]:
    mtn(cx,GROUND+6,w,h,(255,255,255,a))
for cx,w,h,a in [(300,280,230,120),(700,320,260,130),(1000,270,220,120)]:
    mtn(cx,GROUND+6,w,h,(255,255,255,a))

def tw(t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0]
def text_vc(x,cy,t,font,fill):
    bb=d.textbbox((0,0),t,font=font); h=bb[3]-bb[1]
    d.text((x,cy-h/2-bb[1]),t,font=font,fill=fill); return bb[2]-bb[0]
def load_ic(name,size):
    return Image.open(f"scratchpad/ic-{name}.png").convert("RGBA").resize((size,size),Image.LANCZOS)

# ---------------- top-right stamp ----------------
sr=88; scx,scy=W-MARG-sr,152
stamp=Image.new("RGBA",(sr*2+30,sr*2+30),(0,0,0,0)); sd=ImageDraw.Draw(stamp)
cc=(sr+15,sr+15); SC=(13,66,116,215)
sd.ellipse([cc[0]-sr,cc[1]-sr,cc[0]+sr,cc[1]+sr],outline=SC,width=5)
sd.ellipse([cc[0]-sr+10,cc[1]-sr+10,cc[0]+sr-10,cc[1]+sr-10],outline=SC,width=2)
def arc_text(base,cc,r,text,font,fill,a0,a1):
    n=len(text)
    for i,ch in enumerate(text):
        ang=a0+(a1-a0)*(i/(n-1) if n>1 else 0.5)
        rad=math.radians(ang)
        tile=Image.new("RGBA",(90,90),(0,0,0,0)); td=ImageDraw.Draw(tile)
        bb=td.textbbox((0,0),ch,font=font)
        td.text(((90-(bb[2]-bb[0]))/2-bb[0],(90-(bb[3]-bb[1]))/2-bb[1]),ch,font=font,fill=fill)
        tile=tile.rotate(-ang,resample=Image.BICUBIC,expand=False)
        base.alpha_composite(tile,(int(cc[0]+r*math.sin(rad)-45),int(cc[1]-r*math.cos(rad)-45)))
arc_text(stamp,cc,sr-25,"COOLING SOLUTIONS",f("Bold",15),SC,-72,72)
sfl=load_ic("snow-navy",26)
stamp.alpha_composite(sfl,(cc[0]-13,cc[1]-48))
sd2=ImageDraw.Draw(stamp)
for i,txt_ in enumerate(["YOU CAN","COUNT ON"]):
    b=sd2.textbbox((0,0),txt_,font=f("ExtraBold",20))
    sd2.text((cc[0]-(b[2]-b[0])/2-b[0],cc[1]-14+i*24-b[1]),txt_,font=f("ExtraBold",20),fill=SC)
def sstar(sd,cx,cy,r,fill):
    pts=[]
    for i in range(10):
        a=-math.pi/2+i*math.pi/5; rad=r if i%2==0 else r*0.42
        pts.append((cx+rad*math.cos(a),cy+rad*math.sin(a)))
    sd.polygon(pts,fill=fill)
for dx in (-22,0,22): sstar(sd2,cc[0]+dx,cc[1]+46,7,SC)
stamp=stamp.rotate(8,resample=Image.BICUBIC,expand=False)
img.alpha_composite(stamp,(scx-sr-15,scy-sr-15))
d=ImageDraw.Draw(img,"RGBA")

# ---------------- headline (fit clear of stamp) ----------------
hy=96
stamp_left=scx-sr-20
maxw=stamp_left-MARG-14
size=84
while size>46 and tw("STAY COMFORTABLE.",f("Black",size))>maxw: size-=2
fh=f("Black",size)
d.text((MARG,hy),"STAY COOL.",font=fh,fill=HEAD)
d.text((MARG,hy+int(size*1.14)),"STAY COMFORTABLE.",font=fh,fill=HEAD)

# ---------------- offer banner ----------------
by=hy+int(size*2.5)
bt="NEW AC SYSTEMS  ·  FREE EXACT-PRICE ESTIMATES"
fb=f("Bold",32)
while tw(bt,fb)+72>W-2*MARG and fb.size>22: fb=f("Bold",fb.size-1)
bw=tw(bt,fb)+72
d.polygon([(MARG,by),(MARG+bw,by),(MARG+bw-22,by+64),(MARG,by+64)],fill=NAVY)
text_vc(MARG+34,by+32,bt,fb,(255,255,255,255))

# ---------------- feature badges (poster style: disc + title + subtext) ----------------
badges=[("snowflake","POWERFUL","COOLING","Fast. Efficient.","Reliable."),
        ("wind","ENERGY","EFFICIENT","Save more on","electricity bills."),
        ("shield","DURABLE &","RELIABLE","Built to last.","Built for you.")]
bx0=MARG; bwid=(W-2*MARG)//3
byy=by+112
for i,(ic,t1,t2,s1,s2) in enumerate(badges):
    x=bx0+i*bwid
    disc=Image.new("RGBA",(80,80),(0,0,0,0)); dd=ImageDraw.Draw(disc)
    dd.ellipse([0,0,80,80],fill=NAVY)
    img.alpha_composite(disc,(x,byy))
    icn=load_ic(ic,46); img.alpha_composite(icn,(x+17,byy+17))
    d=ImageDraw.Draw(img,"RGBA")
    tx=x+94
    d.text((tx,byy-4),t1,font=f("ExtraBold",23),fill=HEAD)
    d.text((tx,byy+22),t2,font=f("ExtraBold",23),fill=HEAD)
    d.text((tx,byy+54),s1,font=f("Bold",17),fill=SLATE)
    d.text((tx,byy+75),s2,font=f("Bold",17),fill=SLATE)
    if i>0:
        d.line([(x-18,byy+4),(x-18,byy+88)],fill=(13,66,116,90),width=2)

# ---------------- van hero (updated 2x master) ----------------
van=Image.open("public/van.webp").convert("RGBA")
vw=880; vh=int(van.height*vw/van.width)
van=van.resize((vw,vh),Image.LANCZOS)
vx=(W-vw)//2+10; vy=GROUND-vh+62
glow=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(glow)
gd.ellipse([vx+46,vy+62,vx+vw-46,vy+vh-14],fill=(72,202,228,70))
glow=glow.filter(ImageFilter.GaussianBlur(65))
img.alpha_composite(glow)
sh=Image.new("RGBA",(W,H),(0,0,0,0)); shd=ImageDraw.Draw(sh)
shd.ellipse([vx+56,vy+vh-46,vx+vw-30,vy+vh+18],fill=(6,24,48,150))
sh=sh.filter(ImageFilter.GaussianBlur(16))
img.alpha_composite(sh)
img.alpha_composite(van,(vx,vy))
d=ImageDraw.Draw(img,"RGBA")

# ---------------- white brand bar (poster style, floating) ----------------
wbx,wby=MARG,GROUND+18; wbw=W-2*MARG; wbh=112
bar=Image.new("RGBA",(wbw,wbh),(0,0,0,0)); bd=ImageDraw.Draw(bar)
bd.rounded_rectangle([0,0,wbw,wbh],radius=20,fill=(255,255,255,255))
img.alpha_composite(bar,(wbx,wby))
d=ImageDraw.Draw(img,"RGBA")
mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
mh=72; mw=int(mark.width*mh/mark.height)
img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(wbx+28,wby+(wbh-mh)//2))
d=ImageDraw.Draw(img,"RGBA")
gx=wbx+28+mw+18
d.text((gx,wby+22),"GLACIER",font=f("ExtraBold",42),fill=NAVY)
gw2=tw("GLACIER",f("ExtraBold",42))
sub="HEATING & AIR"; fsub=f("Bold",16)
widths=[tw(c,fsub) if c!=' ' else 6 for c in sub]
extra=(gw2-sum(widths))/(len(sub)-1); xx=gx
for c,wd in zip(sub,widths):
    if c!=' ': d.text((xx,wby+72),c,font=fsub,fill=ICE)
    xx+=wd+extra
dvx=gx+gw2+30
d.line([(dvx,wby+24),(dvx,wby+wbh-24)],fill=(210,226,240,255),width=3)
d.text((dvx+28,wby+26),"San Antonio's Coolest HVAC Team",font=f("ExtraBold",24),fill=NAVY)
d.text((dvx+28,wby+62),"Trusted comfort. Built to last.",font=f("Bold",19),fill=SLATE)

# ---------------- navy CTA bar + sign-off (poster style) ----------------
cy0=wby+wbh+22
d.rectangle([0,cy0,W,H],fill=DEEP)
row1_cy=cy0+52
pc=Image.new("RGBA",(64,64),(0,0,0,0)); pd=ImageDraw.Draw(pc)
pd.ellipse([0,0,64,64],outline=(255,255,255,255),width=4)
img.alpha_composite(pc,(MARG,row1_cy-32))
ph=Image.open("scratchpad/phone.png").convert("RGBA").resize((36,36),Image.LANCZOS)
img.alpha_composite(ph,(MARG+14,row1_cy-18))
d=ImageDraw.Draw(img,"RGBA")
px0=MARG+84
d.text((px0,row1_cy-40),"CALL US TODAY!",font=f("Bold",20),fill=(255,255,255,225))
d.text((px0,row1_cy-12),"(866) 665-2210",font=f("Black",40),fill=(255,255,255,255))
num_end=px0+tw("(866) 665-2210",f("Black",40))

items=[("shield","100% SATISFACTION","GUARANTEED"),
       ("wrench","WARRANTY ON","ALL UNITS"),
       ("home","PERFECT FOR","HOME & OFFICE")]
ICO=32; IG=10; DIV=20
fs=15
use=items
while True:
    ft=f("Bold",fs)
    ws=[ICO+IG+max(tw(l1,ft),tw(l2,ft)) for _,l1,l2 in use]
    total=sum(ws)+DIV*2*(len(use)-1)
    if W-MARG-total >= num_end+44 or fs<=12: break
    fs-=1
if W-MARG-total < num_end+44:
    use=items[:2]
    ft=f("Bold",14)
    ws=[ICO+IG+max(tw(l1,ft),tw(l2,ft)) for _,l1,l2 in use]
    total=sum(ws)+DIV*2*(len(use)-1)
ix=W-MARG-total
for k,(icn,l1,l2) in enumerate(use):
    img.alpha_composite(load_ic(icn,ICO),(int(ix),int(row1_cy-ICO/2)))
    d=ImageDraw.Draw(img,"RGBA")
    txx=ix+ICO+IG
    d.text((txx,row1_cy-18),l1,font=ft,fill=(255,255,255,255))
    d.text((txx,row1_cy+2),l2,font=ft,fill=(255,255,255,255))
    ix+=ws[k]
    if k<len(use)-1:
        d.line([(ix+DIV,row1_cy-16),(ix+DIV,row1_cy+16)],fill=(255,255,255,70),width=2)
        ix+=DIV*2

d.line([(MARG,cy0+104),(W-MARG,cy0+104)],fill=(255,255,255,36),width=2)
line="KEEPING YOU COOL, EVERY SEASON."
fl=f("Bold",18); TRK=6
lw=sum((tw(c,fl)+TRK) if c!=' ' else 14 for c in line)-TRK
row2_cy=(cy0+104+H)//2
sx=(W-lw)//2
snl=load_ic("snowflake",20)
img.alpha_composite(snl,(int(sx-40),int(row2_cy-10)))
img.alpha_composite(snl,(int(sx+lw+20),int(row2_cy-10)))
d=ImageDraw.Draw(img,"RGBA")
ref=d.textbbox((0,0),"K",font=fl)
ytop=row2_cy-(ref[3]-ref[1])/2-ref[1]
xx=sx
for c in line:
    if c!=' ':
        d.text((xx,ytop),c,font=fl,fill=(255,255,255,205)); xx+=tw(c,fl)+TRK
    else: xx+=14

img.convert("RGB").save("scratchpad/feed-ad-45.png",optimize=True)
print("saved",img.size,"| headline",size,"| trust fs",fs,"items",len(use))
