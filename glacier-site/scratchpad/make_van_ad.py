from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W,H = 1440,2036
FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)

NAVY=(0,43,88,255); DEEP=(0,26,54,255); HEAD=(12,52,96,255)
RED=(225,31,38,255); GOLD=(245,166,35,255); SLATE=(84,106,128,255)
ICE=(21,115,168,255)

# ---------------- background: icy sky + mountains + snow ground ----------------
img=Image.new("RGB",(W,H),(255,255,255))
px=img.load()
sky_top=(206,232,248); sky_bot=(156,205,238)
GROUND=1500
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

# mountains (soft white layers)
def mtn(cx,base,w,h,col):
    d.polygon([(cx-w,base),(cx,base-h),(cx+w,base)],fill=col)
for cx,w,h,a in [(180,420,430,70),(600,520,560,90),(1050,480,500,80),(1380,420,430,70)]:
    mtn(cx,GROUND+8,w,h,(255,255,255,a))
for cx,w,h,a in [(380,360,300,120),(900,420,340,130),(1300,360,290,120)]:
    mtn(cx,GROUND+8,w,h,(255,255,255,a))

# ---------------- helpers ----------------
def text_vc(x,cy,t,font,fill):
    bb=d.textbbox((0,0),t,font=font); h=bb[3]-bb[1]
    d.text((x,cy-h/2-bb[1]),t,font=font,fill=fill); return bb[2]-bb[0]
def tw(t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0]
def star(cx,cy,r,fill):
    pts=[]
    for i in range(10):
        a=-math.pi/2+i*math.pi/5; rad=r if i%2==0 else r*0.42
        pts.append((cx+rad*math.cos(a),cy+rad*math.sin(a)))
    d.polygon(pts,fill=fill)
def tracked(x,y,t,font,fill,track):
    for c in t:
        d.text((x,y),c,font=font,fill=fill)
        x+=tw(c,font)+track if c!=' ' else font.size*0.5+track
    return x

def load_ic(name,size,tint=None):
    im=Image.open(f"scratchpad/ic-{name}.png").convert("RGBA").resize((size,size),Image.LANCZOS)
    if tint:
        t=Image.new("RGBA",im.size,tint); t.putalpha(im.getchannel("A")); return t
    return im

MARG=96

# ---------------- top-right stamp ----------------
scx,scy,sr = W-MARG-148, 300, 148
stamp=Image.new("RGBA",(sr*2+40,sr*2+40),(0,0,0,0)); sd=ImageDraw.Draw(stamp)
cc=(sr+20,sr+20)
SC=(13,66,116,215)
sd.ellipse([cc[0]-sr,cc[1]-sr,cc[0]+sr,cc[1]+sr],outline=SC,width=6)
sd.ellipse([cc[0]-sr+14,cc[1]-sr+14,cc[0]+sr-14,cc[1]+sr-14],outline=SC,width=3)
# curved top text
def arc_text(base,cc,r,text,font,fill,a0,a1):
    n=len(text)
    for i,ch in enumerate(text):
        ang=a0+(a1-a0)*(i/(n-1) if n>1 else 0.5)
        rad=math.radians(ang)
        tile=Image.new("RGBA",(120,120),(0,0,0,0)); td=ImageDraw.Draw(tile)
        bb=td.textbbox((0,0),ch,font=font)
        td.text(((120-(bb[2]-bb[0]))/2-bb[0],(120-(bb[3]-bb[1]))/2-bb[1]),ch,font=font,fill=fill)
        tile=tile.rotate(-ang,resample=Image.BICUBIC,expand=False)
        x=cc[0]+r*math.sin(rad)-60; y=cc[1]-r*math.cos(rad)-60
        base.alpha_composite(tile,(int(x),int(y)))
arc_text(stamp,cc,sr-42,"COOLING SOLUTIONS",f("Bold",26),SC,-72,72)
# center content
sfl=load_ic("snow-navy",44)
stamp.alpha_composite(sfl,(cc[0]-22,cc[1]-78))
sd2=ImageDraw.Draw(stamp)
b1=sd2.textbbox((0,0),"YOU CAN",font=f("ExtraBold",34)); sd2.text((cc[0]-(b1[2]-b1[0])/2-b1[0],cc[1]-22-b1[1]),"YOU CAN",font=f("ExtraBold",34),fill=SC)
b2=sd2.textbbox((0,0),"COUNT ON",font=f("ExtraBold",34)); sd2.text((cc[0]-(b2[2]-b2[0])/2-b2[0],cc[1]+18-b2[1]),"COUNT ON",font=f("ExtraBold",34),fill=SC)
# 3 stars
def sstar(sd,cx,cy,r,fill):
    pts=[]
    for i in range(10):
        a=-math.pi/2+i*math.pi/5; rad=r if i%2==0 else r*0.42
        pts.append((cx+rad*math.cos(a),cy+rad*math.sin(a)))
    sd.polygon(pts,fill=fill)
for dx in (-34,0,34): sstar(sd2,cc[0]+dx,cc[1]+78,12,SC)
stamp=stamp.rotate(8,resample=Image.BICUBIC,expand=False)
img.alpha_composite(stamp,(scx-sr-20,scy-sr-20))
d=ImageDraw.Draw(img,"RGBA")

# ---------------- headline (auto-fit clear of stamp) ----------------
hx,hy=MARG,180
stamp_left = scx - sr - 26
maxw = stamp_left - MARG - 18
size=120
while size>60:
    if tw("STAY COMFORTABLE.", f("Black",size)) <= maxw: break
    size-=2
fh=f("Black",size)
d.text((hx,hy),"STAY COOL.",font=fh,fill=HEAD)
d.text((hx,hy+int(size*1.16)),"STAY COMFORTABLE.",font=fh,fill=HEAD)

# navy sub-banner
by=hy+int(size*2.62)
bt="PREMIUM HVAC SERVICE FOR EVERY SPACE."
fb=f("Bold",34)
bw=tw(bt,fb)+72
d.polygon([(MARG,by),(MARG+bw,by),(MARG+bw-24,by+72),(MARG,by+72)],fill=NAVY)
text_vc(MARG+36,by+36,bt,fb,(255,255,255,255))

# ---------------- feature badges ----------------
badges=[("snowflake","POWERFUL","COOLING","Fast. Efficient.","Reliable."),
        ("wind","ENERGY","EFFICIENT","Save more on","electricity bills."),
        ("shield","DURABLE &","RELIABLE","Built to last.","Built for you.")]
bx0=MARG; bwid=(W-2*MARG)//3
byy=by+150
for i,(ic,t1,t2,s1,s2) in enumerate(badges):
    x=bx0+i*bwid
    # icon disc
    disc=Image.new("RGBA",(100,100),(0,0,0,0)); dd=ImageDraw.Draw(disc)
    dd.ellipse([0,0,100,100],fill=NAVY)
    img.alpha_composite(disc,(x,byy))
    icn=load_ic(ic,56); img.alpha_composite(icn,(x+22,byy+22))
    d=ImageDraw.Draw(img,"RGBA")
    tx=x+118
    d.text((tx,byy-4),t1,font=f("ExtraBold",30),fill=HEAD)
    d.text((tx,byy+30),t2,font=f("ExtraBold",30),fill=HEAD)
    d.text((tx,byy+70),s1,font=f("Bold",22),fill=SLATE)
    d.text((tx,byy+96),s2,font=f("Bold",22),fill=SLATE)
    if i>0:
        d.line([(x-26,byy+4),(x-26,byy+112)],fill=(13,66,116,90),width=3)

# ---------------- VAN hero ----------------
van=Image.open("public/van.webp").convert("RGBA")
vw=1290; vh=int(van.height*vw/van.width)
van=van.resize((vw,vh),Image.LANCZOS)
vx=(W-vw)//2+16; vy=GROUND-vh+120
# turquoise glow behind
glow=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(glow)
gd.ellipse([vx+60,vy+80,vx+vw-60,vy+vh-20],fill=(72,202,228,70))
glow=glow.filter(ImageFilter.GaussianBlur(90))
img.alpha_composite(glow)
# ground shadow
sh=Image.new("RGBA",(W,H),(0,0,0,0)); shd=ImageDraw.Draw(sh)
shd.ellipse([vx+70,vy+vh-64,vx+vw-40,vy+vh+26],fill=(6,24,48,150))
sh=sh.filter(ImageFilter.GaussianBlur(22))
img.alpha_composite(sh)
img.alpha_composite(van,(vx,vy))
d=ImageDraw.Draw(img,"RGBA")

# ---------------- white brand bar ----------------
wbx,wby=MARG,1652; wbw=W-2*MARG; wbh=160
bar=Image.new("RGBA",(wbw,wbh),(0,0,0,0)); bd=ImageDraw.Draw(bar)
bd.rounded_rectangle([0,0,wbw,wbh],radius=26,fill=(255,255,255,255))
img.alpha_composite(bar,(wbx,wby))
# soft shadow under bar
d=ImageDraw.Draw(img,"RGBA")
mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
mh=104; mw=int(mark.width*mh/mark.height); mk=mark.resize((mw,mh),Image.LANCZOS)
img.alpha_composite(mk,(wbx+40,wby+(wbh-mh)//2))
d=ImageDraw.Draw(img,"RGBA")
gx=wbx+40+mw+26
d.text((gx,wby+34),"GLACIER",font=f("ExtraBold",58),fill=NAVY)
gw2=tw("GLACIER",f("ExtraBold",58))
# justified sub under GLACIER
sub="HEATING & AIR"; fsub=f("Bold",22)
widths=[tw(c,fsub) if c!=' ' else 8 for c in sub]
extra=(gw2-sum(widths))/(len(sub)-1)
xx=gx
for c,wd in zip(sub,widths):
    if c!=' ': d.text((xx,wby+104),c,font=fsub,fill=ICE)
    xx+=wd+extra
# divider + tagline
dvx=gx+gw2+44
d.line([(dvx,wby+34),(dvx,wby+wbh-34)],fill=(210,226,240,255),width=3)
d.text((dvx+40,wby+42),"San Antonio's Coolest HVAC Team",font=f("ExtraBold",32),fill=NAVY)
d.text((dvx+40,wby+88),"Trusted comfort. Built to last.",font=f("Bold",26),fill=SLATE)

# ---------------- navy CTA bar (measured, collision-free) ----------------
cy0=1844
d.rectangle([0,cy0,W,H],fill=DEEP)

# left: phone block, vertically centered on row1
row1_cy = cy0 + 62
pc=Image.new("RGBA",(76,76),(0,0,0,0)); pd=ImageDraw.Draw(pc)
pd.ellipse([0,0,76,76],outline=(255,255,255,255),width=4)
img.alpha_composite(pc,(MARG,row1_cy-38))
phicon=Image.open("scratchpad/phone.png").convert("RGBA").resize((44,44),Image.LANCZOS)
img.alpha_composite(phicon,(MARG+16,row1_cy-22))
d=ImageDraw.Draw(img,"RGBA")
px0=MARG+100
d.text((px0,row1_cy-46),"CALL US TODAY!",font=f("Bold",25),fill=(255,255,255,225))
d.text((px0,row1_cy-14),"(205) 601-3797",font=f("Black",50),fill=(255,255,255,255))

# right: trust items, measured widths, right-aligned to margin
items=[("shield","100% SATISFACTION","GUARANTEED"),
       ("wrench","WARRANTY ON","ALL UNITS"),
       ("home","PERFECT FOR","HOME & OFFICE")]
ICO=38; IG=12; DIV=30
num_end = px0 + tw("(205) 601-3797", f("Black",50))
fs=18
while fs>=14:
    ft=f("Bold",fs)
    widths=[ICO+IG+max(tw(l1,ft),tw(l2,ft)) for _,l1,l2 in items]
    total=sum(widths)+DIV*2*(len(items)-1)
    if W-MARG-total >= num_end+56: break
    fs-=1
ix=W-MARG-total
for k,(ic,l1,l2) in enumerate(items):
    icn=load_ic(ic,ICO); img.alpha_composite(icn,(int(ix),int(row1_cy-ICO/2)))
    d=ImageDraw.Draw(img,"RGBA")
    txx=ix+ICO+IG
    d.text((txx,row1_cy-22),l1,font=ft,fill=(255,255,255,255))
    d.text((txx,row1_cy+2),l2,font=ft,fill=(255,255,255,255))
    ix+=widths[k]
    if k<len(items)-1:
        d.line([(ix+DIV,row1_cy-20),(ix+DIV,row1_cy+20)],fill=(255,255,255,70),width=2)
        ix+=DIV*2

# divider rule between rows
d.line([(MARG,cy0+124),(W-MARG,cy0+124)],fill=(255,255,255,36),width=2)

# row 2: centered tracked sign-off with clear air
line="KEEPING YOU COOL, EVERY SEASON."
fl=f("Bold",21); TRK=7
lw=sum((tw(c,fl)+TRK) if c!=' ' else 17 for c in line)-TRK
row2_cy=cy0+158
sx=(W-lw)//2
snl=load_ic("snowflake",24)
img.alpha_composite(snl,(int(sx-46),int(row2_cy-12)))
img.alpha_composite(snl,(int(sx+lw+22),int(row2_cy-12)))
d=ImageDraw.Draw(img,"RGBA")
ref=d.textbbox((0,0),"K",font=fl)
ytop=row2_cy-(ref[3]-ref[1])/2-ref[1]
xx=sx
for c in line:
    if c!=' ':
        d.text((xx,ytop),c,font=fl,fill=(255,255,255,205))
        xx+=tw(c,fl)+TRK
    else:
        xx+=17

img.convert("RGB").save("scratchpad/van-ad.png",optimize=True)
print("saved",img.size)
