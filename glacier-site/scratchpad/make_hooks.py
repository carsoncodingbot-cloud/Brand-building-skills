"""Three hook-led feed ads (1080x1350 @2x), each a distinct psychological angle:
V1 URGENCY  — the 103-degree afternoon, giant heat-gradient numeral
V2 TRUST    — real tech at work, hands-over-logo positioning
V3 MONEY    — old-vs-new split from the real before/after job photo
All: full brand dress, real photos only, honest claims, phone + site footer."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import numpy as np, cv2, os

SC=2
W,H=1080*SC,1350*SC; M=84*SC
FT="/tmp/mfonts"
NAVY=(0,43,88,255); DEEPN=(0,26,54,255); RED=(225,31,38,255)
HEAD=(12,52,96,255); SLATE=(84,106,128,255); ICE=(21,115,168,255)
FOOT_H=int(150*SC)

def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", int(s*SC))
def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb
def center(d,img,t,font,cy,fill,cx=W//2):
    w,h,bb=T(d,t,font)
    d.text((cx-w/2-bb[0],cy-h/2-bb[1]),t,font=font,fill=fill); return w
def tracked(d,t,font,cy,fill,track):
    track*=SC
    widths=[T(d,c,font)[0] if c!=' ' else font.size*0.5 for c in t]
    total=sum(widths)+track*(len(t)-1)
    x=(W-total)/2
    ref=d.textbbox((0,0),"K",font=font); ytop=cy-(ref[3]-ref[1])/2-ref[1]
    for c,wd in zip(t,widths):
        if c!=' ': d.text((x,ytop),c,font=font,fill=fill)
        x+=wd+track

def enhance(src):
    dst=f"brand/jobs/enhanced/{os.path.basename(src)}"
    if os.path.exists(dst): return dst
    bgr=cv2.imread(src)
    lab=cv2.cvtColor(bgr,cv2.COLOR_BGR2LAB).astype(np.float32)
    L,A,B=cv2.split(lab)
    lo,hi=np.percentile(L,0.5),np.percentile(L,99.6)
    L=np.clip((L-lo)*(255.0/(hi-lo)),0,255)
    cl=cv2.createCLAHE(clipLimit=1.5,tileGridSize=(8,8)).apply(L.astype(np.uint8)).astype(np.float32)
    L=0.72*L+0.28*cl
    A=A-(A.mean()-128.0)*0.5; B=B-(B.mean()-128.0)*0.5
    out=cv2.cvtColor(cv2.merge([np.clip(L,0,255),np.clip(A,0,255),np.clip(B,0,255)]).astype(np.uint8),cv2.COLOR_LAB2BGR)
    hsv=cv2.cvtColor(out,cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[:,:,1]=np.clip(hsv[:,:,1]*1.06,0,255)
    out=cv2.cvtColor(hsv.astype(np.uint8),cv2.COLOR_HSV2BGR)
    blur=cv2.GaussianBlur(out,(0,0),2.0)
    out=cv2.addWeighted(out,1.5,blur,-0.5,0)
    cv2.imwrite(dst,out,[cv2.IMWRITE_JPEG_QUALITY,96])
    return dst

def footer(img,d):
    y0=H-FOOT_H
    d.rectangle([0,y0,W,H],fill=DEEPN)
    d.rectangle([0,y0,W,y0+3*SC],fill=RED)
    r1=y0+FOOT_H//2
    cs=int(64*SC)
    d.ellipse([M,r1-cs//2,M+cs,r1+cs//2],outline=(255,255,255,255),width=4*SC)
    phn=Image.open("scratchpad/phone.png").convert("RGBA").resize((int(cs*0.54),int(cs*0.54)),Image.LANCZOS)
    img.alpha_composite(phn,(M+int(cs*0.23),r1-int(cs*0.27)))
    d2=ImageDraw.Draw(img,"RGBA")
    px0=M+cs+int(20*SC)
    d2.text((px0,r1-int(40*SC)),"CALL OR TEXT · 24/7",font=f("Bold",18),fill=(160,196,226,255))
    d2.text((px0,r1-int(12*SC)),"(866) 665-2210",font=f("Black",42),fill=(255,255,255,255))
    site="CallGlacier.com"; fs2=f("ExtraBold",24)
    sw=T(d2,site,fs2)[0]
    d2.rounded_rectangle([W-M-sw-int(48*SC),r1-int(25*SC),W-M,r1+int(25*SC)],radius=int(25*SC),fill=RED)
    w,hh,bb=T(d2,site,fs2)
    d2.text((W-M-sw-int(24*SC)-bb[0],r1-hh/2-bb[1]),site,font=fs2,fill=(255,255,255,255))
    return d2

def badge(img,d,x,y,text,fill=(0,26,54,225)):
    fb=f("Bold",15)
    bw=T(d,text,fb)[0]
    d.rounded_rectangle([x,y,x+bw+int(36*SC),y+int(42*SC)],radius=21*SC,fill=fill)
    d.text((x+int(18*SC),y+int(9*SC)),text,font=fb,fill=(255,255,255,255))

# ================================================== V1 — URGENCY: 103°
def v1():
    img=Image.new("RGB",(W,H),(3,22,46)).convert("RGBA")
    px=img.load()
    st=(6,28,56); sb=(0,16,36)
    for yy in range(H):
        t=yy/H
        c=tuple(int(st[i]+(sb[i]-st[i])*t) for i in range(3))
        for xx in range(0,W,4):
            for k in range(4):
                if xx+k<W: px[xx+k,yy]=c
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    tracked(d,"GLACIER HEATING & AIR  ·  SAN ANTONIO",f("Bold",19),58*SC,(160,206,236,255),5)
    center(d,img,"IT'S GOING TO BE",f("Black",40),132*SC,(255,255,255,255))
    # giant gradient 103°
    big=f("Black",250)
    t="103°"
    wB,hB,bbB=T(d,t,big)
    tile=Image.new("RGBA",(wB+40,hB+40),(0,0,0,0))
    td=ImageDraw.Draw(tile)
    td.text((20-bbB[0],20-bbB[1]),t,font=big,fill=(255,255,255,255))
    # heat gradient: gold -> orange -> red top to bottom
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
    cy=int(300*SC)
    img.alpha_composite(gradc,((W-tile.size[0])//2,cy-tile.size[1]//2))
    d=ImageDraw.Draw(img,"RGBA")
    center(d,img,"AGAIN TOMORROW.",f("Black",40),int(452*SC),(255,255,255,255))
    center(d,img,"Your AC doesn't care. Until it does — at 4 PM,",f("Bold",22),int(516*SC),(196,220,240,255))
    center(d,img,"on a Friday, with company coming.",f("Bold",22),int(548*SC),(196,220,240,255))
    # real photo card
    py=int(596*SC); ph_h=int(384*SC)
    ph=Image.open(enhance("brand/jobs/raw/b4-16-trane-xr-condenser-front-newbuild.jpg")).convert("RGB")
    ph=ImageOps.fit(ph,(W-2*M,ph_h),Image.LANCZOS,centering=(0.5,0.35))
    mask=Image.new("L",(W-2*M,ph_h),0)
    ImageDraw.Draw(mask).rounded_rectangle([0,0,W-2*M,ph_h],radius=24*SC,fill=255)
    img.paste(ph,(M,py),mask)
    d=ImageDraw.Draw(img,"RGBA")
    badge(img,d,M+int(16*SC),py+int(16*SC),"REAL GLACIER INSTALL · SAN ANTONIO")
    ob_h=int(88*SC); ob_y=H-FOOT_H-ob_h
    kick_y=(py+ph_h+ob_y)//2
    center(d,img,"Cold air, by tonight if we can swing it.",f("ExtraBold",26),kick_y,(120,205,246,255))
    d.rectangle([0,ob_y,W,ob_y+ob_h],fill=RED)
    center(d,img,"24/7 NO-COOL CALLS  ·  FREE EXACT-PRICE ESTIMATES",f("ExtraBold",25),ob_y+ob_h//2,(255,255,255,255))
    d=footer(img,d)
    img.convert("RGB").save("brand/ad-hook-v1-heat.png",optimize=True)
    print("v1 saved, banner",ob_y//SC,"foot",(H-FOOT_H)//SC)

# ================================================== V2 — TRUST: the hands
def v2():
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA")
    TOP=int(820*SC)
    ph=Image.open(enhance("brand/jobs/raw/b2-09-tech-pump-repair.jpg")).convert("RGB")
    ph=ImageOps.fit(ph,(W,TOP),Image.LANCZOS,centering=(0.5,0.35))
    img.paste(ph,(0,0))
    grad=Image.new("L",(1,TOP),0)
    for yy in range(TOP):
        t=max(0,(yy/TOP-0.42))/0.58
        grad.putpixel((0,yy),int(240*t**1.25))
    grad=grad.resize((W,TOP))
    ov=Image.new("RGBA",(W,TOP),(0,20,44,255)); ov.putalpha(grad)
    img.alpha_composite(ov,(0,0))
    tops=Image.new("RGBA",(W,int(150*SC)),(0,0,0,0))
    tg=ImageDraw.Draw(tops)
    for yy in range(int(150*SC)):
        tg.line([(0,yy),(W,yy)],fill=(0,18,40,int(195*(1-yy/(150*SC)))))
    img.alpha_composite(tops,(0,0))
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    tracked(d,"GLACIER HEATING & AIR  ·  SAN ANTONIO",f("Bold",19),58*SC,(200,226,246,255),5)
    badge(img,d,M,int(104*SC),"OUR CREW · ON A REAL JOB",fill=(225,31,38,235))
    d=ImageDraw.Draw(img,"RGBA")
    center(d,img,"YOU'RE NOT HIRING A LOGO.",f("Black",54),int(TOP-186*SC),(255,255,255,255))
    center(d,img,"YOU'RE HIRING WHOEVER",f("Black",54),int(TOP-126*SC),(120,205,246,255))
    center(d,img,"KNEELS NEXT TO YOUR SYSTEM.",f("Black",54),int(TOP-66*SC),(120,205,246,255))
    d.rectangle([0,TOP,W,H],fill=(255,255,255,255))
    y=TOP+int(40*SC)
    for t,sub in [("Licensed, insured, background-checked","The person at your door is vetted before they're hired"),
                  ("They explain it before they fix it","Straight answers, options, and the price in writing first"),
                  ("They clean up like they were never there","Except your air is cold again")]:
        cs=int(38*SC)
        d.ellipse([M,y,M+cs,y+cs],fill=ICE)
        d.line([(M+int(cs*0.26),y+int(cs*0.52)),(M+int(cs*0.44),y+int(cs*0.70)),(M+int(cs*0.75),y+int(cs*0.30))],
               fill=(255,255,255,255),width=5*SC,joint="curve")
        d.text((M+cs+int(20*SC),y-int(2*SC)),t,font=f("ExtraBold",23),fill=HEAD)
        d.text((M+cs+int(20*SC),y+int(30*SC)),sub,font=f("Bold",18),fill=SLATE)
        y+=int(84*SC)
    ob_y=y+int(14*SC); ob_h=int(88*SC)
    d.rectangle([0,ob_y,W,ob_y+ob_h],fill=RED)
    center(d,img,"FREE EXACT-PRICE ESTIMATES  ·  24/7 EMERGENCY",f("ExtraBold",25),ob_y+ob_h//2,(255,255,255,255))
    d=footer(img,d)
    img.convert("RGB").save("brand/ad-hook-v2-hands.png",optimize=True)
    print("v2 saved, banner",ob_y//SC,"foot",(H-FOOT_H)//SC)

# ================================================== V3 — MONEY: old vs new
def v3():
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA")
    px=img.load()
    for yy in range(H):
        t=yy/H
        c=(int(244-14*t),int(250-10*t),int(254-6*t))
        for xx in range(0,W,4):
            for k in range(4):
                if xx+k<W: px[xx+k,yy]=c
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    tracked(d,"GLACIER HEATING & AIR  ·  SAN ANTONIO",f("Bold",19),58*SC,ICE,5)
    center(d,img,"YOUR SYSTEM RETIRED",f("Black",54),132*SC,HEAD)
    center(d,img,"YEARS AGO.",f("Black",54),190*SC,HEAD)
    center(d,img,"IT JUST FORGOT TO TELL YOU.",f("Black",34),246*SC,RED)
    center(d,img,"Every month it limps along, the electric bill collects its pension.",f("Bold",21),298*SC,SLATE)
    # split old/new from the real before-after collage (crop out its baked-in labels)
    src=Image.open("brand/jobs/raw/b5-23-oldnew-furnace-beforeafter.jpg").convert("RGB")
    half_w=src.width//2
    crop_h=int(src.height*0.86)              # trim the old white Old/New text
    old=src.crop((0,0,half_w,crop_h))
    new=src.crop((half_w,0,src.width,crop_h))
    py=int(340*SC); ph_h=int(560*SC); pw=(W-2*M-int(24*SC))//2
    for i,(im,lab,col) in enumerate([(old,"THE ONE THAT QUIT",(140,60,60,235)),(new,"THE ONE WE SET",(21,115,168,235))]):
        x=M+i*(pw+int(24*SC))
        fit=ImageOps.fit(im,(pw,ph_h),Image.LANCZOS,centering=(0.5,0.5))
        mask=Image.new("L",(pw,ph_h),0)
        ImageDraw.Draw(mask).rounded_rectangle([0,0,pw,ph_h],radius=22*SC,fill=255)
        img.paste(fit,(x,py),mask)
        d=ImageDraw.Draw(img,"RGBA")
        fb=f("Bold",16)
        bw=T(d,lab,fb)[0]
        d.rounded_rectangle([x+int(14*SC),py+int(14*SC),x+int(14*SC)+bw+int(32*SC),py+int(14*SC)+int(40*SC)],radius=20*SC,fill=col)
        d.text((x+int(30*SC),py+int(22*SC)),lab,font=fb,fill=(255,255,255,255))
    badge(img,d,M+int(14*SC),py+ph_h-int(56*SC),"REAL GLACIER REPLACEMENT · SAME HOME")
    d=ImageDraw.Draw(img,"RGBA")
    ob_h=int(88*SC); ob_y=H-FOOT_H-ob_h
    mid=(py+ph_h+ob_y)//2
    center(d,img,"A new high-efficiency system often pays part of",f("Bold",22),mid-int(16*SC),SLATE)
    center(d,img,"its own note in energy savings. We'll show you the math.",f("Bold",22),mid+int(16*SC),SLATE)
    d.rectangle([0,ob_y,W,ob_y+ob_h],fill=RED)
    center(d,img,"FREE EXACT-PRICE ESTIMATES  ·  FINANCING AVAILABLE",f("ExtraBold",25),ob_y+ob_h//2,(255,255,255,255))
    d=footer(img,d)
    img.convert("RGB").save("brand/ad-hook-v3-oldnew.png",optimize=True)
    print("v3 saved, banner",ob_y//SC,"foot",(H-FOOT_H)//SC)

v1(); v2(); v3()
print("ALL DONE")
