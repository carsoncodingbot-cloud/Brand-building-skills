"""Old-vs-New Replacement ad in Meta's three placement ratios.
Real before/after split (b5-23), money angle. 1:1 / 9:16 / 1.91:1."""
from PIL import Image, ImageDraw, ImageFont, ImageOps
import numpy as np, os

SC=2
FT="/tmp/mfonts"
NAVY=(0,43,88,255); DEEPN=(0,26,54,255); RED=(225,31,38,255)
HEAD=(12,52,96,255); SLATE=(84,106,128,255); ICE=(21,115,168,255)

def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", int(s*SC))
def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb
def center(d,t,font,cy,fill,cx):
    w,h,bb=T(d,t,font)
    d.text((cx-w/2-bb[0],cy-h/2-bb[1]),t,font=font,fill=fill)

def eyebrow_brand(img,d,W,cy,fill,fs=19,mh1=46):
    mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
    mh=int(mh1*SC); mw=int(mark.width*mh/mark.height)
    font=f("Bold",fs); track=5*SC
    t="GLACIER HEATING & AIR  ·  SAN ANTONIO"
    widths=[T(d,c,font)[0] if c!=' ' else font.size*0.5 for c in t]
    total=sum(widths)+track*(len(t)-1)
    gapm=int(16*SC)
    x0=(W-(mw+gapm+total))/2
    img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(int(x0),int(cy*SC-mh/2)))
    ref=d.textbbox((0,0),"K",font=font); ytop=cy*SC-(ref[3]-ref[1])/2-ref[1]
    x=x0+mw+gapm
    for c,wd in zip(t,widths):
        if c!=' ': d.text((x,ytop),c,font=font,fill=fill)
        x+=wd+track

def bg_light(img,W,H):
    px=img.load()
    for yy in range(H):
        t=yy/H
        c=(int(244-14*t),int(250-10*t),int(254-6*t))
        for xx in range(0,W,4):
            for k in range(4):
                if xx+k<W: px[xx+k,yy]=c

def halves():
    src=Image.open("brand/jobs/raw/b5-23-oldnew-furnace-beforeafter.jpg").convert("RGB")
    half_w=src.width//2
    crop_h=int(src.height*0.86)
    return src.crop((0,0,half_w,crop_h)), src.crop((half_w,0,src.width,crop_h))

def photo_pair(img,d,x0,y0,pw,ph_h,gap1=24,labfs=15):
    old,new=halves()
    for i,(im,lab,col) in enumerate([(old,"THE ONE THAT QUIT",(140,60,60,235)),(new,"THE ONE WE SET",(21,115,168,235))]):
        x=x0+i*(pw+int(gap1*SC))
        fit=ImageOps.fit(im,(pw,ph_h),Image.LANCZOS,centering=(0.5,0.5))
        mask=Image.new("L",(pw,ph_h),0)
        ImageDraw.Draw(mask).rounded_rectangle([0,0,pw,ph_h],radius=int(20*SC),fill=255)
        img.paste(fit,(x,y0),mask)
        d=ImageDraw.Draw(img,"RGBA")
        fb=f("Bold",labfs)
        bw=T(d,lab,fb)[0]
        d.rounded_rectangle([x+int(12*SC),y0+int(12*SC),x+int(12*SC)+bw+int(28*SC),y0+int(12*SC)+int(36*SC)],radius=int(18*SC),fill=col)
        d.text((x+int(26*SC),y0+int(19*SC)),lab,font=fb,fill=(255,255,255,255))
    return d

def badge(img,d,x,y,text,fill=(0,26,54,225),fs=13):
    fb=f("Bold",fs)
    bw=T(d,text,fb)[0]
    d.rounded_rectangle([x,y,x+bw+int(30*SC),y+int(36*SC)],radius=int(18*SC),fill=fill)
    d.text((x+int(15*SC),y+int(8*SC)),text,font=fb,fill=(255,255,255,255))

def footer(img,d,W,H,y0,h1,phfs=38,sitefs=22):
    d.rectangle([0,y0,W,H],fill=DEEPN)
    d.rectangle([0,y0,W,y0+3*SC],fill=RED)
    r1=y0+int(h1*SC)//2
    M=int(70*SC)
    cs=int(56*SC)
    d.ellipse([M,r1-cs//2,M+cs,r1+cs//2],outline=(255,255,255,255),width=4*SC)
    phn=Image.open("scratchpad/phone.png").convert("RGBA").resize((int(cs*0.54),int(cs*0.54)),Image.LANCZOS)
    img.alpha_composite(phn,(M+int(cs*0.23),r1-int(cs*0.27)))
    d2=ImageDraw.Draw(img,"RGBA")
    px0=M+cs+int(18*SC)
    d2.text((px0,r1-int(34*SC)),"CALL OR TEXT · 24/7",font=f("Bold",15),fill=(160,196,226,255))
    d2.text((px0,r1-int(10*SC)),"(866) 665-2210",font=f("Black",phfs),fill=(255,255,255,255))
    site="CallGlacier.com"; fs2=f("ExtraBold",sitefs)
    sw=T(d2,site,fs2)[0]
    d2.rounded_rectangle([W-M-sw-int(44*SC),r1-int(23*SC),W-M,r1+int(23*SC)],radius=int(23*SC),fill=RED)
    w,hh,bb=T(d2,site,fs2)
    d2.text((W-M-sw-int(22*SC)-bb[0],r1-hh/2-bb[1]),site,font=fs2,fill=(255,255,255,255))
    return d2

# ============================ 1:1 — 2160x2160
def sq():
    W,H=1080*SC,1080*SC
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA"); bg_light(img,W,H)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    eyebrow_brand(img,d,W,54,ICE,fs=17,mh1=40)
    center(d,"YOUR SYSTEM RETIRED YEARS AGO.",f("Black",40),int(116*SC),HEAD,W//2)
    center(d,"IT JUST FORGOT TO TELL YOU.",f("Black",27),int(164*SC),RED,W//2)
    M=int(70*SC); gap=int(24*SC)
    pw=(W-2*M-gap)//2
    py=int(202*SC); ph_h=int(438*SC)
    d=photo_pair(img,d,M,py,pw,ph_h)
    badge(img,d,M+int(12*SC),py+ph_h-int(48*SC),"REAL GLACIER REPLACEMENT · SAME HOME")
    d=ImageDraw.Draw(img,"RGBA")
    center(d,"Every month it limps along, the electric bill collects its pension.",f("Bold",20),int(678*SC),SLATE,W//2)
    center(d,"A new system often pays part of its own note in savings.",f("ExtraBold",21),int(716*SC),HEAD,W//2)
    center(d,"We'll show you the math — free, in writing.",f("ExtraBold",21),int(750*SC),ICE,W//2)
    FOOT=int(118*SC); OB=int(80*SC)
    ob_y=H-FOOT-OB
    d.rectangle([0,ob_y,W,ob_y+OB],fill=RED)
    center(d,"FREE EXACT-PRICE ESTIMATES  ·  FINANCING AVAILABLE",f("ExtraBold",22),ob_y+OB//2,(255,255,255,255),W//2)
    d=footer(img,d,W,H,H-FOOT,118,phfs=34,sitefs=20)
    img.convert("RGB").save("brand/placements/glc-oldnew-1x1.png",optimize=True)
    print("1:1 saved",img.size)

# ============================ 9:16 — 2160x3840
def story():
    W,H=1080*SC,1920*SC
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA"); bg_light(img,W,H)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    eyebrow_brand(img,d,W,200,ICE,fs=19,mh1=46)
    center(d,"YOUR SYSTEM RETIRED",f("Black",50),int(272*SC),HEAD,W//2)
    center(d,"YEARS AGO.",f("Black",50),int(334*SC),HEAD,W//2)
    center(d,"IT JUST FORGOT TO TELL YOU.",f("Black",30),int(392*SC),RED,W//2)
    M=int(70*SC); gap=int(24*SC)
    pw=(W-2*M-gap)//2
    py=int(438*SC); ph_h=int(700*SC)
    d=photo_pair(img,d,M,py,pw,ph_h,labfs=16)
    badge(img,d,M+int(12*SC),py+ph_h-int(48*SC),"REAL GLACIER REPLACEMENT · SAME HOME")
    d=ImageDraw.Draw(img,"RGBA")
    center(d,"Every month it limps along,",f("Bold",22),int(1196*SC),SLATE,W//2)
    center(d,"the electric bill collects its pension.",f("Bold",22),int(1228*SC),SLATE,W//2)
    center(d,"A new system often pays part of its own",f("ExtraBold",23),int(1288*SC),HEAD,W//2)
    center(d,"note in savings. We'll show you the math.",f("ExtraBold",23),int(1322*SC),ICE,W//2)
    OB=int(84*SC); ob_y=int(1436*SC)
    d.rectangle([0,ob_y,W,ob_y+OB],fill=RED)
    center(d,"FREE EXACT-PRICE ESTIMATES  ·  FINANCING AVAILABLE",f("ExtraBold",21),ob_y+OB//2,(255,255,255,255),W//2)
    FOOT=int(124*SC)
    d=footer(img,d,W,ob_y+OB+FOOT,ob_y+OB,124,phfs=36,sitefs=21)
    d.rectangle([0,ob_y+OB+FOOT,W,H],fill=(0,16,36,255))
    center(d,"CALLGLACIER.COM",f("Bold",20),int(1780*SC),(60,100,140,255),W//2)
    img.convert("RGB").save("brand/placements/glc-oldnew-9x16.png",optimize=True)
    print("9:16 saved",img.size)

# ============================ 1.91:1 — 2400x1256
def wide():
    W,H=1200*SC,628*SC
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA"); bg_light(img,W,H)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    BAR=int(96*SC); bar_y=H-BAR
    LX=int(60*SC)
    mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
    mh=int(40*SC); mw=int(mark.width*mh/mark.height)
    img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(LX,int(34*SC)))
    d=ImageDraw.Draw(img,"RGBA")
    d.text((LX+mw+int(14*SC),int(40*SC)),"GLACIER HEATING & AIR · SAN ANTONIO",font=f("Bold",15),fill=ICE)
    d.text((LX,int(116*SC)),"YOUR SYSTEM RETIRED",font=f("Black",34),fill=HEAD)
    d.text((LX,int(162*SC)),"YEARS AGO.",font=f("Black",34),fill=HEAD)
    d.text((LX,int(214*SC)),"IT JUST FORGOT TO TELL YOU.",font=f("Black",22),fill=RED)
    d.text((LX,int(268*SC)),"Every month it limps along, the electric",font=f("Bold",18),fill=SLATE)
    d.text((LX,int(296*SC)),"bill collects its pension.",font=f("Bold",18),fill=SLATE)
    d.text((LX,int(344*SC)),"A new system often pays part of its own",font=f("ExtraBold",19),fill=HEAD)
    d.text((LX,int(372*SC)),"note in savings. We'll show you the math.",font=f("ExtraBold",19),fill=ICE)
    tr=f("Bold",15)
    tt="FREE EXACT-PRICE ESTIMATES  ·  FINANCING AVAILABLE"
    wt,_,bbt=T(d,tt,tr)
    d.rounded_rectangle([LX,int(428*SC),LX+wt+int(40*SC),int(470*SC)],radius=int(21*SC),fill=RED)
    d.text((LX+int(20*SC)-bbt[0],int(437*SC)),tt,font=tr,fill=(255,255,255,255))
    # right: photo pair
    RX=int(640*SC); RW=W-RX-int(50*SC); gap=int(18*SC)
    pw=(RW-gap)//2; py=int(40*SC); ph_h=bar_y-py-int(70*SC)
    d=photo_pair(img,d,RX,py,pw,ph_h,gap1=9,labfs=13)
    badge(img,d,RX+int(10*SC),py+ph_h+int(12*SC),"REAL GLACIER REPLACEMENT · SAME HOME",fs=12)
    d=ImageDraw.Draw(img,"RGBA")
    d=footer(img,d,W,H,bar_y,96,phfs=30,sitefs=19)
    img.convert("RGB").save("brand/placements/glc-oldnew-191.png",optimize=True)
    print("1.91:1 saved",img.size)

os.makedirs("brand/placements",exist_ok=True)
sq(); story(); wide()
from PIL import Image as I
import numpy as _np
for p,zone in [("brand/placements/glc-oldnew-1x1.png",(0,40,2160,170)),
               ("brand/placements/glc-oldnew-9x16.png",(0,320,2160,500)),
               ("brand/placements/glc-oldnew-191.png",(0,40,1300,190))]:
    a=_np.array(I.open(p).crop(zone).convert("RGB")).astype(int)
    red=((a[:,:,0]>180)&(a[:,:,1]<90)&(a[:,:,2]<90)).sum()
    print(p,"mark-red px:",red,"OK" if red>150 else "MISSING")
print("ALL DONE")
