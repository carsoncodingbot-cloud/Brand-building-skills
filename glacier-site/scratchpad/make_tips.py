"""Seven fully-branded education posts — Glacier Pro Tips series.
Every canvas: real job photo + full brand system (eyebrow, headline hierarchy,
tip content, footer with phone + site). 2160x2700 (4:5 @2x). No AI imagery —
photos get measured color work only."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import numpy as np, cv2, os

SC = 2
W, H = 1080*SC, 1350*SC
M = 84*SC
FT = "/tmp/mfonts"
NAVY=(0,43,88,255); DEEPN=(0,26,54,255); RED=(225,31,38,255)
HEAD=(12,52,96,255); SLATE=(84,106,128,255); ICE=(21,115,168,255)
PALE=(236,246,252,255)
OUT="brand/social"; os.makedirs(OUT, exist_ok=True)
os.makedirs("brand/jobs/enhanced", exist_ok=True)

def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", int(s*SC))

def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb

def center(d,t,font,cy,fill,cx=W//2):
    w,h,bb=T(d,t,font)
    d.text((cx-w/2-bb[0],cy-h/2-bb[1]),t,font=font,fill=fill); return w

def tracked(d,t,font,cy,fill,track,cx=W//2):
    track*=SC
    widths=[T(d,c,font)[0] if c!=' ' else font.size*0.5 for c in t]
    total=sum(widths)+track*(len(t)-1)
    x=cx-total/2
    ref=d.textbbox((0,0),"K",font=font); ytop=cy-(ref[3]-ref[1])/2-ref[1]
    for c,wd in zip(t,widths):
        if c!=' ': d.text((x,ytop),c,font=font,fill=fill)
        x+=wd+track

def wrap(d, text, font, maxw):
    words=text.split(); lines=[]; cur=""
    for wd in words:
        t=(cur+" "+wd).strip()
        if T(d,t,font)[0]<=maxw: cur=t
        else: lines.append(cur); cur=wd
    if cur: lines.append(cur)
    return lines

def para(d, text, font, x, y, maxw, fill, lh):
    for ln in wrap(d,text,font,maxw):
        d.text((x,y),ln,font=font,fill=fill); y+=lh*SC
    return y

def enhance(src):
    """Measured color work only: levels, white balance, gentle pop, sharpen."""
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

def photo_card(img, src, box, radius=26, border=True, centering=(0.5,0.5)):
    """Fit enhanced photo into box (x,y,w,h) with rounded corners."""
    x,y,w,h=box
    ph=Image.open(enhance(src)).convert("RGB")
    ph=ImageOps.fit(ph,(w,h),Image.LANCZOS,centering=centering)
    mask=Image.new("L",(w,h),0)
    ImageDraw.Draw(mask).rounded_rectangle([0,0,w,h],radius=radius*SC,fill=255)
    img.paste(ph,(x,y),mask)
    if border:
        d=ImageDraw.Draw(img,"RGBA")
        d.rounded_rectangle([x,y,x+w,y+h],radius=radius*SC,outline=(13,66,116,60),width=2*SC)

def bg_light(img):
    px=img.load()
    for yy in range(H):
        t=yy/H
        c=(int(244-14*t),int(250-10*t),int(254-6*t))
        for xx in range(0,W,4):
            px[xx,yy]=c; px[min(xx+1,W-1),yy]=c; px[min(xx+2,W-1),yy]=c; px[min(xx+3,W-1),yy]=c

def bg_dark(img):
    px=img.load()
    st=(4,30,62); sb=(0,20,44)
    for yy in range(H):
        t=yy/H
        c=tuple(int(st[i]+(sb[i]-st[i])*t) for i in range(3))
        for xx in range(0,W,4):
            px[xx,yy]=c; px[min(xx+1,W-1),yy]=c; px[min(xx+2,W-1),yy]=c; px[min(xx+3,W-1),yy]=c

FOOT_H=118*SC
def footer_navy(img):
    d=ImageDraw.Draw(img,"RGBA")
    y0=H-FOOT_H
    d.rectangle([0,y0,W,H],fill=DEEPN)
    d.rectangle([0,y0,W,y0+3*SC],fill=RED)
    r1=y0+FOOT_H//2
    cs=int(56*SC)
    d.ellipse([M,r1-cs//2,M+cs,r1+cs//2],outline=(255,255,255,255),width=4*SC)
    ph=Image.open("scratchpad/phone.png").convert("RGBA").resize((int(cs*0.54),int(cs*0.54)),Image.LANCZOS)
    img.alpha_composite(ph,(M+int(cs*0.23),r1-int(cs*0.27)))
    d=ImageDraw.Draw(img,"RGBA")
    px0=M+cs+int(18*SC)
    d.text((px0,r1-int(36*SC)),"CALL OR TEXT",font=f("Bold",17),fill=(160,196,226,255))
    d.text((px0,r1-int(10*SC)),"(866) 665-2210",font=f("Black",36),fill=(255,255,255,255))
    site="CallGlacier.com"; fs2=f("ExtraBold",22)
    sw=T(d,site,fs2)[0]
    d.rounded_rectangle([W-M-sw-int(44*SC),r1-int(23*SC),W-M,r1+int(23*SC)],radius=int(23*SC),fill=RED)
    w,hh,bb=T(d,site,fs2)
    d.text((W-M-sw-int(22*SC)-bb[0],r1-hh/2-bb[1]),site,font=fs2,fill=(255,255,255,255))

def footer_white(img):
    d=ImageDraw.Draw(img,"RGBA")
    y0=H-FOOT_H
    d.rectangle([0,y0,W,H],fill=(255,255,255,255))
    d.rectangle([0,y0,W,y0+3*SC],fill=RED)
    r1=y0+FOOT_H//2
    mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
    mh=int(60*SC); mw=int(mark.width*mh/mark.height)
    img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(M,r1-mh//2))
    d=ImageDraw.Draw(img,"RGBA")
    gx=M+mw+int(14*SC)
    gf=f("ExtraBold",30)
    d.text((gx,r1-int(31*SC)),"GLACIER",font=gf,fill=NAVY)
    gw2=T(d,"GLACIER",gf)[0]
    sub="HEATING & AIR"; fsub=f("Bold",11.5)
    widths=[T(d,c,fsub)[0] if c!=' ' else 4*SC for c in sub]
    extra=(gw2-sum(widths))/(len(sub)-1); xx=gx
    for c,wd in zip(sub,widths):
        if c!=' ': d.text((xx,r1+int(7*SC)),c,font=fsub,fill=ICE)
        xx+=wd+extra
    site="CallGlacier.com"; fs2=f("ExtraBold",22)
    sw=T(d,site,fs2)[0]
    d.rounded_rectangle([W-M-sw-int(44*SC),r1-int(23*SC),W-M,r1+int(23*SC)],radius=int(23*SC),fill=RED)
    w,hh,bb=T(d,site,fs2)
    d.text((W-M-sw-int(22*SC)-bb[0],r1-hh/2-bb[1]),site,font=fs2,fill=(255,255,255,255))
    pf=f("Black",27)
    pw=T(d,"(866) 665-2210",pf)[0]
    d.text((W-M-sw-int(44*SC)-int(28*SC)-pw,r1-int(30*SC)),"(866) 665-2210",font=pf,fill=NAVY)
    d.text((W-M-sw-int(44*SC)-int(28*SC)-pw,r1+int(9*SC)),"SAN ANTONIO · 24/7",font=f("Bold",13),fill=SLATE)

def eyebrow(d, num, dark=False):
    col=(160,206,236,255) if dark else ICE
    d.rectangle([0,0,W,4*SC],fill=RED)
    tracked(d,"GLACIER PRO TIPS  ·  SAN ANTONIO",f("Bold",19),58*SC,col,5)

def check_row(img,d,x,y,text,maxw,dark=False):
    cs=int(34*SC)
    d.ellipse([x,y,x+cs,y+cs],fill=ICE if not dark else (46,160,214,255))
    d.line([(x+int(cs*0.26),y+int(cs*0.52)),(x+int(cs*0.43),y+int(cs*0.70)),(x+int(cs*0.75),y+int(cs*0.30))],
           fill=(255,255,255,255),width=4*SC,joint="curve")
    fb=f("Bold",22)
    col=(230,242,252,255) if dark else (30,60,92,255)
    lines=wrap(d,text,fb,maxw)
    ty=y+cs//2-(len(lines)*30*SC)//2 + 2*SC
    for ln in lines:
        d.text((x+cs+int(20*SC),ty),ln,font=fb,fill=col); ty+=30*SC
    return max(y+cs, ty)

# ============================================================ P1 vinegar
def p1():
    img=Image.new("RGB",(W,H),(255,255,255)); bg_light(img)
    img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
    eyebrow(d,1)
    center(d,"THE $5 TRICK THAT",f("Black",56),126*SC,HEAD)
    center(d,"PREVENTS THE #1",f("Black",56),186*SC,HEAD)
    center(d,"SUMMER BREAKDOWN",f("Black",56),246*SC,ICE)
    y=para(d,"Your AC pulls gallons of water out of the air every single day — and all of it leaves through one skinny drain line. When that line clogs, the whole system shuts down on the hottest day of the year.",
           f("Bold",21),M,292*SC,W-2*M,SLATE,31)
    py=int(y+16*SC)
    ph_h=int(545*SC)
    photo_card(img,"brand/jobs/raw/b2-06-trane-airhandler-attic.jpg",(M,py,W-2*M,ph_h),centering=(0.30,0.62))
    d=ImageDraw.Draw(img,"RGBA")
    bt="REAL GLACIER INSTALL"; fb=f("Bold",15)
    bw=T(d,bt,fb)[0]
    d.rounded_rectangle([M+18*SC,py+18*SC,M+18*SC+bw+36*SC,py+18*SC+40*SC],radius=20*SC,fill=(0,26,54,215))
    d.text((M+36*SC,py+27*SC),bt,font=fb,fill=(255,255,255,255))
    yy=py+ph_h+int(30*SC)
    for t in ["Pour 1 cup of white vinegar down the drain line",
              "Every 3 months — it takes two minutes",
              "Kills the algae before it can clog the line"]:
        yy=check_row(img,d,M,yy,t,W-2*M-70*SC)+int(22*SC)
    center(d,"Two minutes in March beats a breakdown in August.",f("ExtraBold",24),H-FOOT_H-int(52*SC),ICE)
    footer_navy(img)
    img.convert("RGB").save(f"{OUT}/tip-01-drain-line.png",optimize=True)
    print("p1 ok, checklist end",yy,"foot",H-FOOT_H)

# ============================================================ P2 coil shower
def p2():
    img=Image.new("RGB",(W,H),(255,255,255))
    img=img.convert("RGBA")
    ph=Image.open(enhance("brand/jobs/raw/b4-16-trane-xr-condenser-front-newbuild.jpg")).convert("RGB")
    top_h=int(760*SC)
    ph=ImageOps.fit(ph,(W,top_h),Image.LANCZOS,centering=(0.5,0.42))
    img.paste(ph,(0,0))
    grad=Image.new("L",(1,top_h),0)
    for yy in range(top_h):
        t=max(0,(yy/top_h-0.45))/0.55
        grad.putpixel((0,yy),int(235*t**1.3))
    grad=grad.resize((W,top_h))
    navyov=Image.new("RGBA",(W,top_h),(0,22,46,255)); navyov.putalpha(grad)
    img.alpha_composite(navyov,(0,0))
    topsh=Image.new("RGBA",(W,int(170*SC)),(0,0,0,0))
    tg=ImageDraw.Draw(topsh)
    for yy in range(int(170*SC)):
        tg.line([(0,yy),(W,yy)],fill=(0,18,40,int(205*(1-yy/(170*SC)))))
    img.alpha_composite(topsh,(0,0))
    d=ImageDraw.Draw(img,"RGBA")
    eyebrow(d,2,dark=True)
    center(d,"GIVE YOUR A/C",f("Black",62),int(top_h-206*SC),(255,255,255,255))
    center(d,"A SHOWER.",f("Black",62),int(top_h-140*SC),(120,205,246,255))
    center(d,"Once a month in summer. Here's the pro way:",f("Bold",22),int(top_h-76*SC),(214,232,246,255))
    d.rectangle([0,top_h,W,H],fill=(255,255,255,255))
    steps=[("1","Kill the power at the outdoor disconnect box"),
           ("2","Garden hose, gentle spray — top to bottom"),
           ("3","Never a pressure washer. The fins bend easy.")]
    yy=top_h+int(52*SC)
    for n,t in steps:
        cs=int(62*SC)
        d.ellipse([M,yy,M+cs,yy+cs],fill=NAVY)
        w,hh,bb=T(d,n,f("Black",30))
        d.text((M+cs/2-w/2-bb[0],yy+cs/2-hh/2-bb[1]),n,font=f("Black",30),fill=(255,255,255,255))
        fb=f("Bold",24)
        lines=wrap(d,t,fb,W-2*M-cs-24*SC)
        ty=yy+cs//2-(len(lines)*32*SC)//2+2*SC
        for ln in lines:
            d.text((M+cs+22*SC,ty),ln,font=fb,fill=(30,60,92,255)); ty+=32*SC
        yy+=cs+int(38*SC)
    d.line([(M,yy+2*SC),(W-M,yy+2*SC)],fill=(214,230,242,255),width=2*SC)
    center(d,"A clean coil cools easier. A dirty one works",f("ExtraBold",24),yy+int(42*SC),ICE)
    center(d,"overtime — and sends you the bill.",f("ExtraBold",24),yy+int(76*SC),ICE)
    footer_navy(img)
    img.convert("RGB").save(f"{OUT}/tip-02-coil-shower.png",optimize=True)
    print("p2 ok, steps end",yy,"foot",H-FOOT_H)

# ============================================================ P3 clearance
def p3():
    img=Image.new("RGB",(W,H),(255,255,255)); bg_light(img)
    img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
    eyebrow(d,3)
    center(d,"YOUR A/C NEEDS",f("Black",58),128*SC,HEAD)
    center(d,"PERSONAL SPACE",f("Black",58),190*SC,ICE)
    py=int(238*SC)
    ph_h=int(585*SC)
    photo_card(img,"brand/jobs/raw/b1-02-runtru-stucco-shrubs.jpg",(M,py,W-2*M,ph_h))
    d=ImageDraw.Draw(img,"RGBA")
    bx0,by0=W-M-int(220*SC),py+int(28*SC)
    d.rounded_rectangle([bx0,by0,W-M-int(28*SC),by0+int(96*SC)],radius=18*SC,fill=(225,31,38,235))
    w,hh,bb=T(d,"2 FT",f("Black",44))
    cxb=(bx0+W-M-int(28*SC))//2
    d.text((cxb-w/2-bb[0],by0+int(10*SC)),"2 FT",font=f("Black",44),fill=(255,255,255,255))
    w,hh,bb=T(d,"CLEAR ALL AROUND",f("Bold",13))
    d.text((cxb-w/2-bb[0],by0+int(64*SC)),"CLEAR ALL AROUND",font=f("Bold",13),fill=(255,224,224,255))
    y=para(d,"Bushes, fences, tall grass and leaf piles choke the airflow your system breathes through. Two feet of clear space on every side keeps it running cool — and cheap.",
           f("Bold",21),M,py+ph_h+int(28*SC),W-2*M,SLATE,31)
    yy=int(y+18*SC)
    for t in ["Trim plants back two feet, every side",
              "Blow leaves and clippings away after mowing",
              "Never stack anything on top of the unit"]:
        yy=check_row(img,d,M,yy,t,W-2*M-70*SC)+int(22*SC)
    center(d,"Give it two feet. It gives you a cooler summer.",f("ExtraBold",24),H-FOOT_H-int(52*SC),ICE)
    footer_navy(img)
    img.convert("RGB").save(f"{OUT}/tip-03-clearance.png",optimize=True)
    print("p3 ok, end",yy,"foot",H-FOOT_H)

# ============================================================ P4 AUTO vs ON
def p4():
    img=Image.new("RGB",(W,H),(0,26,54)); bg_dark(img)
    img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
    eyebrow(d,4,dark=True)
    center(d,"THE SWITCH MOST",f("Black",56),128*SC,(255,255,255,255))
    center(d,"PEOPLE GET WRONG",f("Black",56),188*SC,(120,205,246,255))
    center(d,'Your thermostat fan setting. "ON" sounds helpful. It isn\'t.',f("Bold",21),240*SC,(196,220,240,255))
    cy0=int(286*SC); ch=int(330*SC); cw=(W-2*M-int(28*SC))//2
    # ON card
    d.rounded_rectangle([M,cy0,M+cw,cy0+ch],radius=24*SC,fill=(16,44,78,255),outline=(70,110,150,120),width=2*SC)
    xc=M+cw//2
    w,hh,bb=T(d,"FAN: ON",f("Black",34))
    d.text((xc-w/2-bb[0],cy0+int(30*SC)),"FAN: ON",font=f("Black",34),fill=(255,140,140,255))
    cs=int(52*SC)
    d.ellipse([xc-cs//2,cy0+int(86*SC),xc+cs//2,cy0+int(86*SC)+cs],outline=(255,120,120,255),width=5*SC)
    o=int(cs*0.28)
    d.line([(xc-cs//2+o,cy0+int(86*SC)+o),(xc+cs//2-o,cy0+int(86*SC)+cs-o)],fill=(255,120,120,255),width=5*SC)
    d.line([(xc+cs//2-o,cy0+int(86*SC)+o),(xc-cs//2+o,cy0+int(86*SC)+cs-o)],fill=(255,120,120,255),width=5*SC)
    ty=cy0+int(158*SC)
    for t in ["Blower runs 24/7","Pulls humidity back inside","Wears parts, pads the bill"]:
        fb=f("Bold",19)
        for ln in wrap(d,t,fb,cw-40*SC):
            w2,_,bb2=T(d,ln,fb)
            d.text((xc-w2/2-bb2[0],ty),ln,font=fb,fill=(216,230,244,255)); ty+=27*SC
        ty+=9*SC
    # AUTO card
    x2=M+cw+int(28*SC)
    d.rounded_rectangle([x2,cy0,x2+cw,cy0+ch],radius=24*SC,fill=(240,250,255,255))
    xc2=x2+cw//2
    w,hh,bb=T(d,"FAN: AUTO",f("Black",34))
    d.text((xc2-w/2-bb[0],cy0+int(30*SC)),"FAN: AUTO",font=f("Black",34),fill=NAVY)
    d.ellipse([xc2-cs//2,cy0+int(86*SC),xc2+cs//2,cy0+int(86*SC)+cs],fill=(21,140,90,255))
    d.line([(xc2-int(cs*0.24),cy0+int(86*SC)+int(cs*0.52)),(xc2-int(cs*0.06),cy0+int(86*SC)+int(cs*0.72)),
            (xc2+int(cs*0.26),cy0+int(86*SC)+int(cs*0.30))],fill=(255,255,255,255),width=6*SC,joint="curve")
    ty=cy0+int(158*SC)
    for t in ["Runs only while cooling","Drier, more comfortable air","Lower bill, longer life"]:
        fb=f("Bold",19)
        for ln in wrap(d,t,fb,cw-40*SC):
            w2,_,bb2=T(d,ln,fb)
            d.text((xc2-w2/2-bb2[0],ty),ln,font=fb,fill=(40,70,100,255)); ty+=27*SC
        ty+=9*SC
    yb=cy0+ch+int(30*SC)
    center(d,"Small switch. Real money.",f("ExtraBold",26),yb+int(16*SC),(120,205,246,255))
    ph_y=yb+int(52*SC)
    ph_h=(H-FOOT_H)-ph_y-int(26*SC)
    photo_card(img,"brand/jobs/raw/b5-25-mitsubishi-minisplit-indoor.jpg",(M,ph_y,W-2*M,ph_h),border=False)
    d=ImageDraw.Draw(img,"RGBA")
    bt="COMFORT, HANDLED"; fb=f("Bold",14)
    bw=T(d,bt,fb)[0]
    d.rounded_rectangle([M+16*SC,ph_y+16*SC,M+16*SC+bw+32*SC,ph_y+16*SC+36*SC],radius=18*SC,fill=(0,26,54,215))
    d.text((M+32*SC,ph_y+24*SC),bt,font=fb,fill=(255,255,255,255))
    footer_white(img)
    img.convert("RGB").save(f"{OUT}/tip-04-fan-auto.png",optimize=True)
    print("p4 ok, photo",ph_y,ph_h)

# ============================================================ P5 vents
def p5():
    img=Image.new("RGB",(W,H),(255,255,255)); bg_light(img)
    img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
    eyebrow(d,5)
    center(d,"CLOSING VENTS",f("Black",58),128*SC,HEAD)
    center(d,"DOESN'T SAVE MONEY",f("Black",58),190*SC,RED)
    py=int(240*SC); ph_h=int(600*SC)
    photo_card(img,"brand/jobs/raw/b3-14-attic-flexduct-newframing.jpg",(M,py,W-2*M,ph_h))
    d=ImageDraw.Draw(img,"RGBA")
    bt="GLACIER DUCTWORK, DONE RIGHT"; fb=f("Bold",14)
    bw=T(d,bt,fb)[0]
    d.rounded_rectangle([M+16*SC,py+16*SC,M+16*SC+bw+32*SC,py+16*SC+36*SC],radius=18*SC,fill=(0,26,54,215))
    d.text((M+32*SC,py+24*SC),bt,font=fb,fill=(255,255,255,255))
    cy0=py+ph_h+int(26*SC); ch=int(148*SC); cw=(W-2*M-int(24*SC))//2
    d.rounded_rectangle([M,cy0,M+cw,cy0+ch],radius=22*SC,fill=(255,236,236,255))
    d.text((M+24*SC,cy0+20*SC),"THE MYTH",font=f("Black",22),fill=RED)
    para(d,'"Shut the vents in rooms you don\'t use — save on cooling."',f("Bold",19),M+24*SC,cy0+58*SC,cw-48*SC,(120,52,52,255),27)
    x2=M+cw+int(24*SC)
    d.rounded_rectangle([x2,cy0,x2+cw,cy0+ch],radius=22*SC,fill=(230,244,252,255))
    d.text((x2+24*SC,cy0+20*SC),"THE TRUTH",font=f("Black",22),fill=ICE)
    para(d,"Pressure builds, the blower strains, and ducts spring leaks you pay for all year.",f("Bold",19),x2+24*SC,cy0+58*SC,cw-48*SC,(30,72,102,255),27)
    center(d,"Your system was sized for every room.",f("ExtraBold",25),cy0+ch+int(52*SC),HEAD)
    center(d,"Let it breathe.",f("ExtraBold",25),cy0+ch+int(88*SC),ICE)
    footer_navy(img)
    img.convert("RGB").save(f"{OUT}/tip-05-vents.png",optimize=True)
    print("p5 ok, cards end",cy0+ch,"foot",H-FOOT_H)

# ============================================================ P6 sealed ducts
def p6():
    img=Image.new("RGB",(W,H),(0,26,54)); bg_dark(img)
    img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
    eyebrow(d,6,dark=True)
    center(d,"UP TO",f("Bold",26),120*SC,(160,206,236,255))
    center(d,"30%",f("Black",130),204*SC,(120,205,246,255))
    center(d,"OF YOUR COLD AIR CAN LEAK",f("Black",34),296*SC,(255,255,255,255))
    center(d,"INTO THE ATTIC THROUGH UNSEALED DUCTS",f("Black",26),340*SC,(255,255,255,255))
    py=int(392*SC); ph_h=int(545*SC)
    photo_card(img,"brand/jobs/raw/b4-19-flexduct-manifold-airhandler.jpg",(M,py,W-2*M,ph_h),border=False)
    d=ImageDraw.Draw(img,"RGBA")
    bt="SEALED BY HAND — A GLACIER STANDARD"; fb=f("Bold",14)
    bw=T(d,bt,fb)[0]
    d.rounded_rectangle([M+16*SC,py+ph_h-52*SC,M+16*SC+bw+32*SC,py+ph_h-16*SC],radius=18*SC,fill=(0,26,54,225))
    d.text((M+32*SC,py+ph_h-44*SC),bt,font=fb,fill=(255,255,255,255))
    y=para(d,"See that gray paste on every joint? That's mastic. We seal every connection by hand so the air you pay to cool actually reaches your rooms — not your attic.",
           f("Bold",21),M,py+ph_h+int(26*SC),W-2*M,(214,232,246,255),31)
    center(d,"Cold air belongs in your rooms. Period.",f("ExtraBold",25),int(y+30*SC),(120,205,246,255))
    tracked(d,"STRAIGHT ANSWERS  ·  FREE ESTIMATES  ·  SAN ANTONIO",f("Bold",16),H-FOOT_H-int(44*SC),(150,196,226,255),4)
    footer_white(img)
    img.convert("RGB").save(f"{OUT}/tip-06-sealed-ducts.png",optimize=True)
    print("p6 ok, text end",y,"foot",H-FOOT_H)

# ============================================================ P7 filter myth
def p7():
    img=Image.new("RGB",(W,H),(255,255,255)); bg_light(img)
    img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
    eyebrow(d,7)
    center(d,"THE 90-DAY",f("Black",58),128*SC,HEAD)
    center(d,"FILTER MYTH",f("Black",58),190*SC,ICE)
    # measured, symmetric comparison: [THE BOX SAYS / 90] -> [TEXAS REALITY / 30-45]
    fN=f("Black",68); fL=f("Bold",15)
    n1,n2="90","30-45"
    l1,l2="THE BOX SAYS","TEXAS REALITY"
    w1=T(d,n1,fN)[0]; w2=T(d,n2,fN)[0]
    lw1=T(d,l1,fL)[0]; lw2=T(d,l2,fL)[0]
    c1=max(w1,lw1); c2=max(w2,lw2)          # column widths
    AR=int(66*SC); GAP=int(46*SC)           # arrow width, gaps
    total=c1+GAP+AR+GAP+c2
    x0=(W-total)//2
    cx1=x0+c1//2; cx2=x0+c1+GAP+AR+GAP+c2//2
    lab_y=int(238*SC); num_y=int(300*SC)
    for cx,lab,col in ((cx1,l1,SLATE),(cx2,l2,ICE)):
        wl,hl,bbl=T(d,lab,fL)
        d.text((cx-wl/2-bbl[0],lab_y-hl/2-bbl[1]),lab,font=fL,fill=col)
    # 90 (struck through its measured ink bounds)
    wn,hn,bbn=T(d,n1,fN)
    tx=cx1-wn/2-bbn[0]; ty=num_y-hn/2-bbn[1]
    d.text((tx,ty),n1,font=fN,fill=(178,196,212,255))
    ix0,iy0,ix1,iy1=tx+bbn[0],ty+bbn[1],tx+bbn[2],ty+bbn[3]
    pad=int(12*SC)
    d.line([(ix0-pad,iy1+int(4*SC)),(ix1+pad,iy0-int(4*SC))],fill=RED,width=9*SC)
    # arrow, vertically centered on the numbers
    acx=x0+c1+GAP+AR//2
    d.line([(acx-AR//2,num_y),(acx+AR//2-int(14*SC),num_y)],fill=(130,156,180,255),width=7*SC)
    d.polygon([(acx+AR//2,num_y),(acx+AR//2-int(22*SC),num_y-int(13*SC)),(acx+AR//2-int(22*SC),num_y+int(13*SC))],fill=(130,156,180,255))
    # 30-45
    wn2,hn2,bbn2=T(d,n2,fN)
    d.text((cx2-wn2/2-bbn2[0],num_y-hn2/2-bbn2[1]),n2,font=fN,fill=HEAD)
    center(d,"days between 1-inch filter changes in a Texas summer",f("Bold",18),int(358*SC),SLATE)
    py=int(400*SC); ph_h=int(505*SC)
    photo_card(img,"brand/jobs/raw/b6-26-trane-airhandler-side-full.jpg",(M,py,W-2*M,ph_h))
    d=ImageDraw.Draw(img,"RGBA")
    bt="REAL GLACIER INSTALL"; fb=f("Bold",14)
    bw=T(d,bt,fb)[0]
    d.rounded_rectangle([M+16*SC,py+16*SC,M+16*SC+bw+32*SC,py+16*SC+36*SC],radius=18*SC,fill=(0,26,54,215))
    d.text((M+32*SC,py+24*SC),bt,font=fb,fill=(255,255,255,255))
    yy=py+ph_h+int(28*SC)
    for t in ["Pets, dust and long run-times load filters fast",
              "Hold it to a light — can't see through? Swap it",
              "It's the cheapest fix and the priciest thing to ignore"]:
        yy=check_row(img,d,M,yy,t,W-2*M-70*SC)+int(20*SC)
    center(d,"Set a reminder for the 1st of the month. Done.",f("ExtraBold",24),H-FOOT_H-int(52*SC),ICE)
    footer_navy(img)
    img.convert("RGB").save(f"{OUT}/tip-07-filter-myth.png",optimize=True)
    print("p7 ok, end",yy,"foot",H-FOOT_H)

p1(); p2(); p3(); p4(); p5(); p6(); p7()
print("ALL DONE")
