"""Placement six-pack: van + yeti heroes, each at 1:1 (1080), 9:16 (1080x1920),
1.91:1 (1200x628). Native layout per ratio (no crops), Stories safe zones
respected, all fit-loops measured."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); DEEP=(0,26,54,255); HEAD=(12,52,96,255)
ICE=(21,115,168,255); SLATE=(84,106,128,255); RED=(225,31,38,255)

VAN=Image.open("public/van.webp").convert("RGBA")

# ---- yeti panel prep: tight crop + sliver patches + left feather ----
art=Image.open("scratchpad/art-A.png")
P=art.crop((1020,598,1920,2274)).convert("RGBA")   # 900x1676
pa=np.array(P.convert("RGB")).astype(float)
rng=np.random.default_rng(9)
# per-row sky estimate: median of pixels that pass a pale-sky color test
R,G,B=pa[:,:700,0],pa[:,:700,1],pa[:,:700,2]
is_sky=(R>150)&(B>195)&(B>=R)&(G>170)
skycol=np.zeros((P.height,3))
last=np.array([200.,228.,246.])
for yy in range(P.height):
    sel=pa[yy,:700][is_sky[yy]]
    if len(sel)>40: last=np.median(sel,axis=0)
    skycol[yy]=last
for box in [(0,0,345,58),(80,40,340,370),(0,58,108,760)]:  # banner + badge + column ghosts
    x0,y0,x1,y1=box
    rows=y1-y0; cols=x1-x0
    fill=skycol[y0:y1].reshape(rows,1,3).repeat(cols,axis=1)
    fill=np.clip(fill+rng.normal(0,2.2,(rows,cols,3)),0,255)
    patch=Image.fromarray(fill.astype("uint8"))
    m=Image.new("L",patch.size,255); m=m.filter(ImageFilter.GaussianBlur(5))
    P.paste(patch,(x0,y0),m)
FEATH=70
mask=Image.new("L",P.size,255)
md=ImageDraw.Draw(mask)
for x in range(FEATH):
    md.line([(x,0),(x,P.height)],fill=int(255*x/FEATH))
P.putalpha(mask)
YETI=P

def tw(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0]
def text_vc(d,x,cy,t,font,fill):
    bb=d.textbbox((0,0),t,font=font); h=bb[3]-bb[1]
    d.text((x,cy-h/2-bb[1]),t,font=font,fill=fill); return bb[2]-bb[0]
def ic(n,s): return Image.open(f"scratchpad/ic-{n}.png").convert("RGBA").resize((s,s),Image.LANCZOS)

def bg(W,H,ground):
    img=Image.new("RGB",(W,H),(255,255,255)); px=img.load()
    st=(206,232,248); sb=(156,205,238)
    for y in range(H):
        if y<ground:
            t=(y/ground)**1.1
            c=tuple(int(st[i]+(sb[i]-st[i])*t) for i in range(3))
        else:
            t=(y-ground)/max(1,H-ground)
            c=tuple(int(236+(214-236)*t) for _ in range(1)) and (int(236+(214-236)*t),int(246+(232-246)*t),int(252+(244-252)*t))
        for x in range(W): px[x,y]=c
    img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
    for cx,w,h,a in [(int(W*0.13),int(W*0.30),int(H*0.24),70),(int(W*0.45),int(W*0.38),int(H*0.31),90),
                     (int(W*0.78),int(W*0.34),int(H*0.27),80)]:
        d.polygon([(cx-w,ground+6),(cx,ground+6-h),(cx+w,ground+6)],fill=(255,255,255,a))
    for cx,w,h,a in [(int(W*0.28),int(W*0.26),int(H*0.22),120),(int(W*0.66),int(W*0.29),int(H*0.24),130)]:
        d.polygon([(cx-w,ground+6),(cx,ground+6-h),(cx+w,ground+6)],fill=(255,255,255,a))
    return img

def van_hero(img,vw,cy_ground,dx=0,lift=0):
    vh=int(VAN.height*vw/VAN.width)
    v=VAN.resize((vw,vh),Image.LANCZOS)
    W=img.width
    vx=(W-vw)//2+dx; vy=cy_ground-vh+lift
    glow=Image.new("RGBA",img.size,(0,0,0,0)); gd=ImageDraw.Draw(glow)
    gd.ellipse([vx+int(vw*0.05),vy+int(vh*0.12),vx+vw-int(vw*0.05),vy+vh-10],fill=(72,202,228,70))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(55)))
    sh=Image.new("RGBA",img.size,(0,0,0,0)); shd=ImageDraw.Draw(sh)
    shd.ellipse([vx+int(vw*0.07),vy+vh-int(vh*0.08),vx+vw-int(vw*0.04),vy+vh+int(vh*0.03)],fill=(6,24,48,150))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(14)))
    img.alpha_composite(v,(vx,vy))
    return vx,vy,vw,vh

def headline(img,d,x,y,size,maxw):
    while size>30 and tw(d,"STAY COMFORTABLE.",f("Black",size))>maxw: size-=2
    fh=f("Black",size)
    d.text((x,y),"STAY COOL.",font=fh,fill=HEAD)
    d.text((x,y+int(size*1.14)),"STAY COMFORTABLE.",font=fh,fill=HEAD)
    return y+int(size*2.35), size

def banner(img,d,x,y,text,size,maxw,pad=30,h=None):
    fb=f("Bold",size)
    while tw(d,text,fb)+2*pad>maxw and fb.size>16: fb=f("Bold",fb.size-1)
    bw=tw(d,text,fb)+2*pad
    bh=h or int(fb.size*2.0)
    d.polygon([(x,y),(x+bw,y),(x+bw-int(bh*0.28),y+bh),(x,y+bh)],fill=NAVY)
    text_vc(d,x+pad,y+bh//2,text,fb,(255,255,255,255))
    return y+bh

def chips_row(img,d,x,y,W_avail,size,texts):
    fc=f("Bold",size)
    cw=[tw(d,t,fc)+int(size*2.2) for t in texts]
    gap=max(12,(W_avail-sum(cw))//max(1,len(texts)-1))
    cx=x
    ch=int(size*2.4)
    for t,wd in zip(texts,cw):
        d.rounded_rectangle([cx,y,cx+wd,y+ch],radius=ch//2,outline=(13,66,116,200),width=2)
        text_vc(d,cx+int(size*1.1),y+ch//2,t,fc,HEAD)
        cx+=wd+gap
    return y+ch

def chips_stack(img,d,x,y,size,texts,gap=16):
    fc=f("Bold",size)
    ch=int(size*2.3)
    for t in texts:
        wd=tw(d,t,fc)+int(size*2.2)
        d.rounded_rectangle([x,y,x+wd,y+ch],radius=ch//2,outline=(13,66,116,200),width=2)
        text_vc(d,x+int(size*1.1),y+ch//2,t,fc,HEAD)
        y+=ch+gap
    return y

def brand_chip(img,d,x,y,w,h):
    s=h/112
    bar=Image.new("RGBA",(w,h),(0,0,0,0)); bd=ImageDraw.Draw(bar)
    bd.rounded_rectangle([0,0,w,h],radius=int(20*s),fill=(255,255,255,255))
    img.alpha_composite(bar,(x,y)); d2=ImageDraw.Draw(img,"RGBA")
    mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
    mh=int(70*s); mw=int(mark.width*mh/mark.height)
    img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(x+int(26*s),y+(h-mh)//2))
    d2=ImageDraw.Draw(img,"RGBA")
    gx=x+int(26*s)+mw+int(18*s)
    gf=f("ExtraBold",int(40*s))
    d2.text((gx,y+int(20*s)),"GLACIER",font=gf,fill=NAVY)
    gw2=tw(d2,"GLACIER",gf)
    sub="HEATING & AIR"; fsub=f("Bold",int(15*s))
    widths=[tw(d2,c,fsub) if c!=' ' else int(6*s) for c in sub]
    extra=(gw2-sum(widths))/(len(sub)-1); xx=gx
    for c,wd in zip(sub,widths):
        if c!=' ': d2.text((xx,y+int(68*s)),c,font=fsub,fill=ICE)
        xx+=wd+extra
    dvx=gx+gw2+int(26*s)
    if dvx+int(300*s) < x+w:
        d2.line([(dvx,y+int(22*s)),(dvx,y+h-int(22*s))],fill=(210,226,240,255),width=3)
        d2.text((dvx+int(24*s),y+int(24*s)),"San Antonio's Coolest HVAC Team",font=f("ExtraBold",int(22*s)),fill=NAVY)
        d2.text((dvx+int(24*s),y+int(58*s)),"Trusted comfort. Built to last.",font=f("Bold",int(18*s)),fill=SLATE)
    return d2

def cta_bar(img,d,y0,H,W,num_size,site_pill=True,signoff=False,marg=64):
    d.rectangle([0,y0,W,H],fill=DEEP)
    row_h = 104 if signoff else (H-y0)
    r1=y0+row_h//2
    cs=int(num_size*1.5)
    pc=Image.new("RGBA",(cs,cs),(0,0,0,0)); pdd=ImageDraw.Draw(pc)
    pdd.ellipse([0,0,cs,cs],outline=(255,255,255,255),width=max(3,num_size//12))
    img.alpha_composite(pc,(marg,r1-cs//2))
    phi=Image.open("scratchpad/phone.png").convert("RGBA").resize((int(cs*0.56),int(cs*0.56)),Image.LANCZOS)
    img.alpha_composite(phi,(marg+int(cs*0.22),r1-int(cs*0.28)))
    d2=ImageDraw.Draw(img,"RGBA")
    px0=marg+cs+int(num_size*0.55)
    d2.text((px0,r1-int(num_size*1.02)),"CALL US TODAY!",font=f("Bold",int(num_size*0.5)),fill=(255,255,255,225))
    d2.text((px0,r1-int(num_size*0.3)),"(866) 665-2210",font=f("Black",num_size),fill=(255,255,255,255))
    if site_pill:
        site="CallGlacier.com"; fs2=f("ExtraBold",int(num_size*0.58))
        sw=tw(d2,site,fs2)
        d2.rounded_rectangle([W-marg-sw-int(num_size*1.2),r1-int(num_size*0.62),W-marg,r1+int(num_size*0.62)],
                             radius=int(num_size*0.62),fill=RED)
        text_vc(d2,W-marg-sw-int(num_size*0.6),r1,site,fs2,(255,255,255,255))
    if signoff:
        dy=y0+row_h+6
        d2.line([(marg,dy),(W-marg,dy)],fill=(255,255,255,36),width=2)
        line="KEEPING YOU COOL, EVERY SEASON."
        fl=f("Bold",17); TRK=5
        lw=sum((tw(d2,c,fl)+TRK) if c!=' ' else 12 for c in line)-TRK
        scy=dy+34; sx=(W-lw)//2
        sn=ic("snowflake",18)
        img.alpha_composite(sn,(int(sx-34),int(scy-9)))
        img.alpha_composite(sn,(int(sx+lw+16),int(scy-9)))
        d2=ImageDraw.Draw(img,"RGBA")
        ref=d2.textbbox((0,0),"K",font=fl); ytop=scy-(ref[3]-ref[1])/2-ref[1]
        xx=sx
        for c in line:
            if c!=' ':
                d2.text((xx,ytop),c,font=fl,fill=(255,255,255,205)); xx+=tw(d2,c,fl)+TRK
            else: xx+=12
    return d2

def yeti_place(img,panel_h,right=True,bottom=None):
    w=int(YETI.width*panel_h/YETI.height)
    y=YETI.resize((w,panel_h),Image.LANCZOS)
    W=img.width
    py=(bottom-panel_h) if bottom else 0
    img.alpha_composite(y,(W-w,py))
    return w

CHIPS=["POWERFUL COOLING","ENERGY EFFICIENT","DURABLE & RELIABLE"]
BANNER="NEW AC SYSTEMS  ·  FREE EXACT-PRICE ESTIMATES"

# ============ VAN 1:1 ============
W,H=1080,1080
img=bg(W,H,880); d=ImageDraw.Draw(img,"RGBA")
ny,hs=headline(img,d,60,50,56,W-120)
by=banner(img,d,60,ny+8,BANNER,26,W-120)
chips_row(img,d,60,by+22,W-120,17,CHIPS)
van_hero(img,830,880,dx=6,lift=58)
brand_chip(img,d,60,872,W-120,96)
cta_bar(img,d,992,H,W,36,marg=60)
img.convert("RGB").save("scratchpad/glc-van-1x1.png",optimize=True)

# ============ VAN 9:16 ============
W,H=1080,1920
img=bg(W,H,1360); d=ImageDraw.Draw(img,"RGBA")
ny,hs=headline(img,d,64,270,66,W-128)
by=banner(img,d,64,ny+14,BANNER,30,W-128)
chips_row(img,d,64,by+28,W-128,19,CHIPS)
van_hero(img,980,1360,dx=6,lift=80)
brand_chip(img,d,64,1356,W-128,112)
cta_bar(img,d,1500,H,W,46,signoff=True,marg=64)
img.convert("RGB").save("scratchpad/glc-van-9x16.png",optimize=True)

# ============ VAN 1.91:1 ============
W,H=1200,628
img=bg(W,H,520); d=ImageDraw.Draw(img,"RGBA")
ny,hs=headline(img,d,56,44,42,540)
by=banner(img,d,56,ny+10,BANNER,21,560,pad=22)
d.text((56,by+18),"Licensed & insured  ·  $0-down financing available",font=f("Bold",19),fill=(60,88,116,255))
van_hero(img,620,520,dx=282,lift=30)
cta_bar(img,d,522,H,W,34,marg=56)
img.convert("RGB").save("scratchpad/glc-van-191.png",optimize=True)

# ============ YETI 1:1 ============
W,H=1080,1080
img=bg(W,H,900); d=ImageDraw.Draw(img,"RGBA")
pw=yeti_place(img,996,bottom=996)
d=ImageDraw.Draw(img,"RGBA")
colw=W-pw-60-30
d.text((60,58),"NEW AC SYSTEMS",font=f("ExtraBold",22),fill=ICE)
ny,hs=headline(img,d,60,94,46,colw)
by=banner(img,d,60,ny+10,"FREE EXACT-PRICE ESTIMATES",22,colw,pad=22)
chips_stack(img,d,60,by+26,17,CHIPS)
brand_chip(img,d,60,860,min(colw+40,560),96)
cta_bar(img,d,996,H,W,34,marg=60)
img.convert("RGB").save("scratchpad/glc-yeti-1x1.png",optimize=True)

# ============ YETI 9:16 ============
W,H=1080,1920
img=bg(W,H,1420); d=ImageDraw.Draw(img,"RGBA")
ny,hs=headline(img,d,64,272,62,W-128)
by=banner(img,d,64,ny+14,BANNER,28,W-128)
pw=yeti_place(img,940,bottom=1490)
d=ImageDraw.Draw(img,"RGBA")
cy=by+40
cy=chips_stack(img,d,64,cy,19,CHIPS,gap=18)
d.text((64,cy+16),"Free estimate at your home.",font=f("Bold",23),fill=(50,78,108,255))
d.text((64,cy+50),"Exact price in writing.",font=f("Bold",23),fill=(50,78,108,255))
d.text((64,cy+84),"We call back in minutes.",font=f("Bold",23),fill=(50,78,108,255))
brand_chip(img,d,64,1500,W-128,108)
cta_bar(img,d,1642,H,W,44,signoff=True,marg=64)
img.convert("RGB").save("scratchpad/glc-yeti-9x16.png",optimize=True)

# ============ YETI 1.91:1 ============
W,H=1200,628
img=bg(W,H,520); d=ImageDraw.Draw(img,"RGBA")
pw=yeti_place(img,628,bottom=628)
d=ImageDraw.Draw(img,"RGBA")
colw=W-pw-56-24
d.text((56,50),"NEW AC SYSTEMS",font=f("ExtraBold",22),fill=ICE)
ny,hs=headline(img,d,56,88,40,colw)
by=banner(img,d,56,ny+10,"FREE EXACT-PRICE ESTIMATES",21,colw,pad=22)
d.text((56,by+16),"Licensed & insured  ·  $0-down financing",font=f("Bold",18),fill=(60,88,116,255))
cta_bar(img,d,522,H,W-pw+40,32,site_pill=False,marg=56)
img.convert("RGB").save("scratchpad/glc-yeti-191.png",optimize=True)

print("6 placements rendered")
