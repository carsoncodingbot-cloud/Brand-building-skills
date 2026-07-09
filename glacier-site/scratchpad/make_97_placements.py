"""97-degree forecast ad, rebuilt natively for Meta's three placement ratios.
1:1 (2160x2160) feed square · 9:16 (2160x3840) Stories/Reels with safe zones ·
1.91:1 (2400x1256) right column/banner. Deterministic engine, real photo only."""
from PIL import Image, ImageDraw, ImageFont, ImageOps
import numpy as np, cv2, os

SC=2
FT="/tmp/mfonts"
NAVY=(0,43,88,255); DEEPN=(0,26,54,255); RED=(225,31,38,255)
HEAD=(12,52,96,255); SLATE=(84,106,128,255); ICE=(21,115,168,255)
DAYS=[("SAT","94°",(247,148,29)),("SUN","96°",(243,110,32)),("MON","96°",(241,90,36)),
      ("TUE","97°",(232,55,36)),("WED","97°",(225,31,38))]

def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", int(s*SC))
def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb
def center(d,t,font,cy,fill,cx):
    w,h,bb=T(d,t,font)
    d.text((cx-w/2-bb[0],cy-h/2-bb[1]),t,font=font,fill=fill)

def enhance(src):
    dst=f"brand/jobs/enhanced/{os.path.basename(src)}"
    if os.path.exists(dst): return dst
    raise SystemExit("enhanced photo missing: "+src)

def bg_dark(img,W,H):
    px=img.load()
    st=(6,28,56); sb=(0,16,36)
    for yy in range(H):
        t=yy/H
        c=tuple(int(st[i]+(sb[i]-st[i])*t) for i in range(3))
        for xx in range(0,W,4):
            for k in range(4):
                if xx+k<W: px[xx+k,yy]=c

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

def grad97(d,img,cx,cy,size):
    big=f("Black",size)
    t="97°"
    wB,hB,bbB=T(d,t,big)
    tile=Image.new("RGBA",(wB+40,hB+40),(0,0,0,0))
    td=ImageDraw.Draw(tile)
    td.text((20-bbB[0],20-bbB[1]),t,font=big,fill=(255,255,255,255))
    gradc=Image.new("RGBA",tile.size,(0,0,0,0))
    gd=ImageDraw.Draw(gradc)
    cols=[(255,196,60),(247,148,29),(241,90,36),(225,31,38)]
    hgt=tile.size[1]
    for yy in range(hgt):
        tt=yy/hgt*(len(cols)-1)
        i=int(min(tt,len(cols)-2)); frac=tt-i
        c=tuple(int(cols[i][k]+(cols[i+1][k]-cols[i][k])*frac) for k in range(3))
        gd.line([(0,yy),(tile.size[0],yy)],fill=c+(255,))
    gradc.putalpha(tile.getchannel("A"))
    img.alpha_composite(gradc,(int(cx-tile.size[0]/2),int(cy-tile.size[1]/2)))

def strip(d,W,cx,cy0,cw1,gap1,chh1,fday,ftemp):
    cw=int(cw1*SC); gap=int(gap1*SC); chh=int(chh1*SC)
    x=cx-(5*cw+4*gap)//2
    for day,temp,col in DAYS:
        d.rounded_rectangle([x,cy0,x+cw,cy0+chh],radius=int(16*SC),fill=(10,40,74,255),outline=(70,110,150,110),width=2*SC)
        wd,_,bbd=T(d,day,f("Bold",fday))
        d.text((x+cw/2-wd/2-bbd[0],cy0+int(chh*0.13)),day,font=f("Bold",fday),fill=(150,196,226,255))
        wt,_,bbt=T(d,temp,f("Black",ftemp))
        d.text((x+cw/2-wt/2-bbt[0],cy0+int(chh*0.40)),temp,font=f("Black",ftemp),fill=col)
        x+=cw+gap

def photo_card(img,x,y,w,h,centering=(0.5,0.38)):
    ph=Image.open(enhance("brand/jobs/raw/b4-16-trane-xr-condenser-front-newbuild.jpg")).convert("RGB")
    ph=ImageOps.fit(ph,(w,h),Image.LANCZOS,centering=centering)
    mask=Image.new("L",(w,h),0)
    ImageDraw.Draw(mask).rounded_rectangle([0,0,w,h],radius=int(20*SC),fill=255)
    img.paste(ph,(x,y),mask)

def badge(img,d,x,y,text,fs=14):
    fb=f("Bold",fs)
    bw=T(d,text,fb)[0]
    d.rounded_rectangle([x,y,x+bw+int(32*SC),y+int(38*SC)],radius=int(19*SC),fill=(0,26,54,225))
    d.text((x+int(16*SC),y+int(8*SC)),text,font=fb,fill=(255,255,255,255))

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
    img=Image.new("RGB",(W,H),(3,22,46)).convert("RGBA"); bg_dark(img,W,H)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    eyebrow_brand(img,d,W,54,(160,206,236,255),fs=17,mh1=40)
    center(d,"THE FORECAST CLIMBS ALL WEEK,",f("Black",34),118*SC,(255,255,255,255),W//2)
    center(d,"THEN PARKS AT",f("Black",34),162*SC,(255,255,255,255),W//2)
    grad97(d,img,W//2,282*SC,175)
    strip(d,W,W//2,int(408*SC),150,22,86,15,27)
    center(d,"Every degree is an extra hour your AC runs flat-out —",f("Bold",20),int(540*SC),(196,220,240,255),W//2)
    center(d,"and tired systems pick weeks like this to quit.",f("Bold",20),int(570*SC),(196,220,240,255),W//2)
    FOOT=int(118*SC); OB=int(80*SC)
    ob_y=H-FOOT-OB
    py=int(608*SC); ph_h=ob_y-py-int(64*SC)
    photo_card(img,int(70*SC),py,W-2*int(70*SC),ph_h)
    d=ImageDraw.Draw(img,"RGBA")
    badge(img,d,int(86*SC),py+int(14*SC),"REAL GLACIER INSTALL · SAN ANTONIO")
    center(d,"Cold air, by tonight if we can swing it.",f("ExtraBold",22),(py+ph_h+ob_y)//2,(120,205,246,255),W//2)
    d.rectangle([0,ob_y,W,ob_y+OB],fill=RED)
    center(d,"24/7 NO-COOL CALLS  ·  FREE EXACT-PRICE ESTIMATES",f("ExtraBold",22),ob_y+OB//2,(255,255,255,255),W//2)
    d=footer(img,d,W,H,H-FOOT,118,phfs=34,sitefs=20)
    img.convert("RGB").save("brand/placements/glc-97-1x1.png",optimize=True)
    print("1:1 saved",img.size)

# ============================ 9:16 — 2160x3840 (safe: content y 270..1560 @1x 1920)
def story():
    W,H=1080*SC,1920*SC
    img=Image.new("RGB",(W,H),(3,22,46)).convert("RGBA"); bg_dark(img,W,H)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    eyebrow_brand(img,d,W,200,(160,206,236,255),fs=19,mh1=46)
    center(d,"THE FORECAST CLIMBS",f("Black",44),268*SC,(255,255,255,255),W//2)
    center(d,"ALL WEEK, THEN PARKS AT",f("Black",44),324*SC,(255,255,255,255),W//2)
    grad97(d,img,W//2,500*SC,230)
    strip(d,W,W//2,int(664*SC),160,26,96,16,30)
    center(d,"Every degree is an extra hour your AC runs",f("Bold",22),int(816*SC),(196,220,240,255),W//2)
    center(d,"flat-out — and tired systems pick weeks",f("Bold",22),int(848*SC),(196,220,240,255),W//2)
    center(d,"like this to quit.",f("Bold",22),int(880*SC),(196,220,240,255),W//2)
    py=int(930*SC); ph_h=int(330*SC)
    photo_card(img,int(70*SC),py,W-2*int(70*SC),ph_h)
    d=ImageDraw.Draw(img,"RGBA")
    badge(img,d,int(86*SC),py+int(14*SC),"REAL GLACIER INSTALL · SAN ANTONIO")
    center(d,"Cold air, by tonight if we can swing it.",f("ExtraBold",24),int(1306*SC),(120,205,246,255),W//2)
    OB=int(84*SC); ob_y=int(1352*SC)
    d.rectangle([0,ob_y,W,ob_y+OB],fill=RED)
    center(d,"24/7 NO-COOL CALLS  ·  FREE EXACT-PRICE ESTIMATES",f("ExtraBold",22),ob_y+OB//2,(255,255,255,255),W//2)
    FOOT=int(124*SC)
    d=footer(img,d,W,ob_y+OB+FOOT,ob_y+OB,124,phfs=36,sitefs=21)
    # below footer: quiet brand zone (under Stories bottom UI) — solid deep navy
    d.rectangle([0,ob_y+OB+FOOT,W,H],fill=(0,16,36,255))
    center(d,"CALLGLACIER.COM",f("Bold",20),int(1780*SC),(60,100,140,255),W//2)
    img.convert("RGB").save("brand/placements/glc-97-9x16.png",optimize=True)
    print("9:16 saved",img.size)

# ============================ 1.91:1 — 2400x1256
def wide():
    W,H=1200*SC,628*SC
    img=Image.new("RGB",(W,H),(3,22,46)).convert("RGBA"); bg_dark(img,W,H)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    BAR=int(96*SC); bar_y=H-BAR
    LX=int(60*SC); LCX=int(330*SC)   # left column center
    # left column
    mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
    mh=int(40*SC); mw=int(mark.width*mh/mark.height)
    img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(LX,int(34*SC)))
    d=ImageDraw.Draw(img,"RGBA")
    d.text((LX+mw+int(14*SC),int(40*SC)),"GLACIER HEATING & AIR · SAN ANTONIO",font=f("Bold",15),fill=(160,206,236,255))
    d.text((LX,int(104*SC)),"THE FORECAST CLIMBS ALL",font=f("Black",30),fill=(255,255,255,255))
    d.text((LX,int(144*SC)),"WEEK, THEN PARKS AT",font=f("Black",30),fill=(255,255,255,255))
    grad97(d,img,LCX,int(300*SC),150)
    center(d,"Tired systems pick weeks",f("Bold",19),int(408*SC),(196,220,240,255),LCX)
    center(d,"like this to quit.",f("Bold",19),int(436*SC),(196,220,240,255),LCX)
    center(d,"Cold air, by tonight if we can swing it.",f("ExtraBold",18),int(482*SC),(120,205,246,255),LCX)
    # right column
    RX=int(640*SC); RW=W-RX-int(60*SC)
    photo_card(img,RX,int(40*SC),RW,int(250*SC),centering=(0.5,0.42))
    d=ImageDraw.Draw(img,"RGBA")
    badge(img,d,RX+int(14*SC),int(54*SC),"REAL GLACIER INSTALL",fs=13)
    strip(d,W,RX+RW//2,int(316*SC),96,10,86,13,24)
    center(d,"Every degree is an extra hour your AC runs flat-out.",f("Bold",17),int(452*SC),(196,220,240,255),RX+RW//2)
    tr=f("Bold",16)
    tt="24/7 NO-COOL CALLS  ·  FREE EXACT-PRICE ESTIMATES"
    wt,_,bbt=T(d,tt,tr)
    d.rounded_rectangle([RX+RW//2-wt/2-int(20*SC),int(478*SC),RX+RW//2+wt/2+int(20*SC),int(520*SC)],radius=int(21*SC),fill=RED)
    d.text((RX+RW//2-wt/2-bbt[0],int(487*SC)),tt,font=tr,fill=(255,255,255,255))
    # bottom bar
    d=footer(img,d,W,H,bar_y,96,phfs=30,sitefs=19)
    img.convert("RGB").save("brand/placements/glc-97-191.png",optimize=True)
    print("1.91:1 saved",img.size)

os.makedirs("brand/placements",exist_ok=True)
sq(); story(); wide()
# pixel QA: logo mark red present near top of each
from PIL import Image as I
import numpy as _np
for p,zone in [("brand/placements/glc-97-1x1.png",(0,40,2160,170)),
               ("brand/placements/glc-97-9x16.png",(0,320,2160,500)),
               ("brand/placements/glc-97-191.png",(0,40,1400,170))]:
    a=_np.array(I.open(p).crop(zone).convert("RGB")).astype(int)
    red=((a[:,:,0]>180)&(a[:,:,1]<90)&(a[:,:,2]<90)).sum()
    print(p,"mark-red px:",red,"OK" if red>150 else "MISSING")
print("ALL DONE")
