"""Trust ad rebuilt HVAC-true: 'the work nobody sees' on the mastic-sealed plenum
photo (b4-19). Replaces the pump-photo crew ad in the paid funnel.
Outputs 4:5 + 1:1 + 9:16 + 1.91:1."""
from PIL import Image, ImageDraw, ImageFont, ImageOps
import numpy as np, os

SC=2
FT="/tmp/mfonts"
NAVY=(0,43,88,255); DEEPN=(0,26,54,255); RED=(225,31,38,255)
HEAD=(12,52,96,255); SLATE=(84,106,128,255); ICE=(21,115,168,255)
PHOTO="brand/jobs/enhanced/b4-19-flexduct-manifold-airhandler.jpg"

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

def hero(img,W,top_h,centering=(0.5,0.45),start=0.42):
    ph=Image.open(PHOTO).convert("RGB")
    ph=ImageOps.fit(ph,(W,top_h),Image.LANCZOS,centering=centering)
    img.paste(ph,(0,0))
    grad=Image.new("L",(1,top_h),0)
    for yy in range(top_h):
        t=max(0,(yy/top_h-start))/(1-start)
        grad.putpixel((0,yy),int(240*t**1.25))
    grad=grad.resize((W,top_h))
    ov=Image.new("RGBA",(W,top_h),(0,20,44,255)); ov.putalpha(grad)
    img.alpha_composite(ov,(0,0))
    tops=Image.new("RGBA",(W,int(150*SC)),(0,0,0,0))
    tg=ImageDraw.Draw(tops)
    for yy in range(int(150*SC)):
        tg.line([(0,yy),(W,yy)],fill=(0,18,40,int(195*(1-yy/(150*SC)))))
    img.alpha_composite(tops,(0,0))

def badge(img,d,x,y,text,fill=(225,31,38,235),fs=14):
    fb=f("Bold",fs)
    bw=T(d,text,fb)[0]
    d.rounded_rectangle([x,y,x+bw+int(32*SC),y+int(38*SC)],radius=int(19*SC),fill=fill)
    d.text((x+int(16*SC),y+int(8*SC)),text,font=fb,fill=(255,255,255,255))

def check_line(d,x,y,text,fs=20,cs1=32):
    cs=int(cs1*SC)
    d.ellipse([x,y,x+cs,y+cs],fill=ICE)
    d.line([(x+int(cs*0.26),y+int(cs*0.52)),(x+int(cs*0.44),y+int(cs*0.70)),(x+int(cs*0.75),y+int(cs*0.30))],
           fill=(255,255,255,255),width=4*SC,joint="curve")
    d.text((x+cs+int(18*SC),y+int(cs*0.5)-int(fs*SC*0.62)),text,font=f("ExtraBold",fs),fill=HEAD)

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

CHECKS=["Every duct joint sealed by hand with mastic",
        "Unsealed ducts can leak up to 30% of your cold air",
        "Your price in writing before work starts"]
BADGE="REAL GLACIER INSTALL · SEALED BY HAND"
BANNER="FREE EXACT-PRICE ESTIMATES  ·  24/7 EMERGENCY"

# ============================ 4:5 — 2160x2700 (main feed asset)
def feed():
    W,H=1080*SC,1350*SC
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA")
    TOP=int(790*SC)
    hero(img,W,TOP)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    eyebrow_brand(img,d,W,58,(200,226,246,255))
    badge(img,d,int(84*SC),int(104*SC),BADGE)
    d=ImageDraw.Draw(img,"RGBA")
    center(d,"THE WORK NOBODY SEES",f("Black",54),int(TOP-186*SC),(255,255,255,255),W//2)
    center(d,"IS WHY YOUR AIR",f("Black",54),int(TOP-126*SC),(120,205,246,255),W//2)
    center(d,"STAYS COLD.",f("Black",54),int(TOP-66*SC),(120,205,246,255),W//2)
    d.rectangle([0,TOP,W,H],fill=(255,255,255,255))
    y=TOP+int(38*SC)
    for t in CHECKS:
        check_line(d,int(90*SC),y,t,fs=21)
        y+=int(64*SC)
    FOOT=int(150*SC); OB=int(88*SC)
    ob_y=H-FOOT-OB
    kick=(y+ob_y)//2
    center(d,"Done right in the dark, so it works in the heat.",f("ExtraBold",24),kick,ICE,W//2)
    d.rectangle([0,ob_y,W,ob_y+OB],fill=RED)
    center(d,BANNER,f("ExtraBold",25),ob_y+OB//2,(255,255,255,255),W//2)
    d=footer(img,d,W,H,H-FOOT,150,phfs=42,sitefs=24)
    img.convert("RGB").save("brand/ad-hook-v2b-hiddenwork.png",optimize=True)
    print("4:5 saved",img.size)

# ============================ 1:1 — 2160x2160
def sq():
    W,H=1080*SC,1080*SC
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA")
    TOP=int(636*SC)
    hero(img,W,TOP)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    eyebrow_brand(img,d,W,54,(200,226,246,255),fs=17,mh1=40)
    badge(img,d,int(70*SC),int(96*SC),BADGE)
    d=ImageDraw.Draw(img,"RGBA")
    center(d,"THE WORK NOBODY SEES",f("Black",44),int(TOP-160*SC),(255,255,255,255),W//2)
    center(d,"IS WHY YOUR AIR",f("Black",44),int(TOP-108*SC),(120,205,246,255),W//2)
    center(d,"STAYS COLD.",f("Black",44),int(TOP-56*SC),(120,205,246,255),W//2)
    d.rectangle([0,TOP,W,H],fill=(255,255,255,255))
    FOOT=int(118*SC); OB=int(80*SC)
    ob_y=H-FOOT-OB
    y=TOP+int(30*SC)
    for t in CHECKS:
        check_line(d,int(90*SC),y,t)
        y+=int(58*SC)
    d.rectangle([0,ob_y,W,ob_y+OB],fill=RED)
    center(d,BANNER,f("ExtraBold",22),ob_y+OB//2,(255,255,255,255),W//2)
    d=footer(img,d,W,H,H-FOOT,118,phfs=34,sitefs=20)
    img.convert("RGB").save("brand/placements/glc-hidden-1x1.png",optimize=True)
    print("1:1 saved",img.size)

# ============================ 9:16 — 2160x3840
def story():
    W,H=1080*SC,1920*SC
    img=Image.new("RGB",(W,H),(0,16,36)).convert("RGBA")
    TOP=int(1150*SC)
    hero(img,W,TOP,centering=(0.5,0.4),start=0.5)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    eyebrow_brand(img,d,W,200,(200,226,246,255),fs=19,mh1=46)
    badge(img,d,int(70*SC),int(250*SC),BADGE)
    d=ImageDraw.Draw(img,"RGBA")
    center(d,"THE WORK",f("Black",56),int(TOP-206*SC),(255,255,255,255),W//2)
    center(d,"NOBODY SEES IS WHY",f("Black",56),int(TOP-138*SC),(120,205,246,255),W//2)
    center(d,"YOUR AIR STAYS COLD.",f("Black",56),int(TOP-70*SC),(120,205,246,255),W//2)
    d.rectangle([0,TOP,W,int(1436*SC)],fill=(255,255,255,255))
    y=TOP+int(40*SC)
    for t in CHECKS:
        check_line(d,int(100*SC),y,t,fs=21,cs1=34)
        y+=int(62*SC)
    center(d,"Done right in the dark, so it works in the heat.",f("ExtraBold",22),int(TOP+236*SC),ICE,W//2)
    OB=int(84*SC); ob_y=int(1436*SC)
    d.rectangle([0,ob_y,W,ob_y+OB],fill=RED)
    center(d,BANNER,f("ExtraBold",22),ob_y+OB//2,(255,255,255,255),W//2)
    FOOT=int(124*SC)
    d=footer(img,d,W,ob_y+OB+FOOT,ob_y+OB,124,phfs=36,sitefs=21)
    d.rectangle([0,ob_y+OB+FOOT,W,H],fill=(0,16,36,255))
    center(d,"CALLGLACIER.COM",f("Bold",20),int(1780*SC),(60,100,140,255),W//2)
    img.convert("RGB").save("brand/placements/glc-hidden-9x16.png",optimize=True)
    print("9:16 saved",img.size)

# ============================ 1.91:1 — 2400x1256
def wide():
    W,H=1200*SC,628*SC
    img=Image.new("RGB",(W,H),(3,22,46)).convert("RGBA")
    px=img.load()
    st=(6,28,56); sb=(0,16,36)
    for yy in range(H):
        t=yy/H
        c=tuple(int(st[i]+(sb[i]-st[i])*t) for i in range(3))
        for xx in range(0,W,4):
            for k in range(4):
                if xx+k<W: px[xx+k,yy]=c
    BAR=int(96*SC); bar_y=H-BAR
    PW=int(560*SC)
    ph=Image.open(PHOTO).convert("RGB")
    ph=ImageOps.fit(ph,(PW,bar_y),Image.LANCZOS,centering=(0.45,0.5))
    img.paste(ph,(0,0))
    edge=Image.new("L",(PW,1),0)
    for xx in range(PW):
        t=max(0,(xx/PW-0.72))/0.28
        edge.putpixel((xx,0),int(255*t**1.2))
    edge=edge.resize((PW,bar_y))
    ov=Image.new("RGBA",(PW,bar_y),(4,25,50,255)); ov.putalpha(edge)
    img.alpha_composite(ov,(0,0))
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    badge(img,d,int(24*SC),int(24*SC),BADGE,fs=13)
    d=ImageDraw.Draw(img,"RGBA")
    RX=int(620*SC)
    mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
    mh=int(40*SC); mw=int(mark.width*mh/mark.height)
    img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(RX,int(34*SC)))
    d=ImageDraw.Draw(img,"RGBA")
    d.text((RX+mw+int(14*SC),int(40*SC)),"GLACIER HEATING & AIR · SAN ANTONIO",font=f("Bold",15),fill=(160,206,236,255))
    d.text((RX,int(112*SC)),"THE WORK NOBODY SEES",font=f("Black",31),fill=(255,255,255,255))
    d.text((RX,int(154*SC)),"IS WHY YOUR AIR",font=f("Black",31),fill=(120,205,246,255))
    d.text((RX,int(196*SC)),"STAYS COLD.",font=f("Black",31),fill=(120,205,246,255))
    y=int(262*SC)
    for t in CHECKS:
        cs=int(28*SC)
        d.ellipse([RX,y,RX+cs,y+cs],fill=(46,160,214,255))
        d.line([(RX+int(cs*0.26),y+int(cs*0.52)),(RX+int(cs*0.44),y+int(cs*0.70)),(RX+int(cs*0.75),y+int(cs*0.30))],
               fill=(255,255,255,255),width=3*SC,joint="curve")
        d.text((RX+cs+int(14*SC),y-int(2*SC)),t,font=f("ExtraBold",17),fill=(235,244,252,255))
        y+=int(48*SC)
    tr=f("Bold",15)
    wt,_,bbt=T(d,BANNER,tr)
    d.rounded_rectangle([RX,int(428*SC),RX+wt+int(40*SC),int(470*SC)],radius=int(21*SC),fill=RED)
    d.text((RX+int(20*SC)-bbt[0],int(437*SC)),BANNER,font=tr,fill=(255,255,255,255))
    d=footer(img,d,W,H,bar_y,96,phfs=30,sitefs=19)
    img.convert("RGB").save("brand/placements/glc-hidden-191.png",optimize=True)
    print("1.91:1 saved",img.size)

os.makedirs("brand/placements",exist_ok=True)
feed(); sq(); story(); wide()
from PIL import Image as I
import numpy as _np
for p,zone in [("brand/ad-hook-v2b-hiddenwork.png",(0,40,2160,170)),
               ("brand/placements/glc-hidden-1x1.png",(0,40,2160,170)),
               ("brand/placements/glc-hidden-9x16.png",(0,320,2160,500)),
               ("brand/placements/glc-hidden-191.png",(1100,40,2400,190))]:
    a=_np.array(I.open(p).crop(zone).convert("RGB")).astype(int)
    red=((a[:,:,0]>180)&(a[:,:,1]<90)&(a[:,:,2]<90)).sum()
    print(p,"mark-red px:",red,"OK" if red>150 else "MISSING")
print("ALL DONE")
