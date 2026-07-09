"""Four organic Facebook posts (1080x1350 @2x) — awareness/trust/perception lane.
No offer banners, no ad-speak. Same brand frame: mark+eyebrow top, contact footer.
O1 heat-week community helper · O2 craft pride · O3 veteran retired · O4 camera roll"""
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
def center(d,t,font,cy,fill,cx=W//2):
    w,h,bb=T(d,t,font)
    d.text((cx-w/2-bb[0],cy-h/2-bb[1]),t,font=font,fill=fill); return w

def eyebrow_brand(img,d,fill):
    mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
    mh=int(46*SC); mw=int(mark.width*mh/mark.height)
    font=f("Bold",19); track=5*SC
    t="GLACIER HEATING & AIR  ·  SAN ANTONIO"
    widths=[T(d,c,font)[0] if c!=' ' else font.size*0.5 for c in t]
    total=sum(widths)+track*(len(t)-1)
    gapm=int(18*SC)
    x0=(W-(mw+gapm+total))/2
    img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(int(x0),int(58*SC-mh/2)))
    ref=d.textbbox((0,0),"K",font=font); ytop=58*SC-(ref[3]-ref[1])/2-ref[1]
    x=x0+mw+gapm
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
    d2.text((px0,r1-int(40*SC)),"QUESTIONS? WE ANSWER · 24/7",font=f("Bold",18),fill=(160,196,226,255))
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

def bg_dark(img):
    px=img.load()
    st=(6,28,56); sb=(0,16,36)
    for yy in range(H):
        t=yy/H
        c=tuple(int(st[i]+(sb[i]-st[i])*t) for i in range(3))
        for xx in range(0,W,4):
            for k in range(4):
                if xx+k<W: px[xx+k,yy]=c

def bg_light(img):
    px=img.load()
    for yy in range(H):
        t=yy/H
        c=(int(244-14*t),int(250-10*t),int(254-6*t))
        for xx in range(0,W,4):
            for k in range(4):
                if xx+k<W: px[xx+k,yy]=c

def check_row(d,x,y,text,sub,dark):
    cs=int(38*SC)
    d.ellipse([x,y,x+cs,y+cs],fill=(46,160,214,255) if dark else ICE)
    d.line([(x+int(cs*0.26),y+int(cs*0.52)),(x+int(cs*0.44),y+int(cs*0.70)),(x+int(cs*0.75),y+int(cs*0.30))],
           fill=(255,255,255,255),width=5*SC,joint="curve")
    tcol=(235,244,252,255) if dark else HEAD
    scol=(160,196,226,255) if dark else SLATE
    d.text((x+cs+int(20*SC),y-int(2*SC)),text,font=f("ExtraBold",22),fill=tcol)
    d.text((x+cs+int(20*SC),y+int(29*SC)),sub,font=f("Bold",17),fill=scol)
    return y+int(80*SC)

# ================================================== O1 — heat week helper
def o1():
    img=Image.new("RGB",(W,H),(3,22,46)).convert("RGBA"); bg_dark(img)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    eyebrow_brand(img,d,(160,206,236,255))
    center(d,"A ROUGH WEEK TO BE",f("Black",50),136*SC,(255,255,255,255))
    center(d,"AN AIR CONDITIONER.",f("Black",50),192*SC,(120,205,246,255))
    days=[("SAT","94°",(247,148,29)),("SUN","96°",(243,110,32)),("MON","96°",(241,90,36)),
          ("TUE","97°",(232,55,36)),("WED","97°",(225,31,38))]
    cw=int(160*SC); gap=int(28*SC)
    x=(W-(5*cw+4*gap))//2; cy0=int(248*SC); chh=int(96*SC)
    for day,temp,col in days:
        d.rounded_rectangle([x,cy0,x+cw,cy0+chh],radius=20*SC,fill=(10,40,74,255),outline=(70,110,150,110),width=2*SC)
        wd,_,bbd=T(d,day,f("Bold",16))
        d.text((x+cw/2-wd/2-bbd[0],cy0+int(14*SC)),day,font=f("Bold",16),fill=(150,196,226,255))
        wt,_,bbt=T(d,temp,f("Black",30))
        d.text((x+cw/2-wt/2-bbt[0],cy0+int(42*SC)),temp,font=f("Black",30),fill=col)
        x+=cw+gap
    center(d,"Yours is about to run flat-out for days. Help it out:",f("Bold",22),int(392*SC),(196,220,240,255))
    y=int(432*SC)
    y=check_row(d,M,y,"Set it at 78° and leave it alone","Big swings up and down cost more than holding steady",True)
    y=check_row(d,M,y,"Close blinds on west windows after lunch","Afternoon sun is half the battle in Texas",True)
    y=check_row(d,M,y,"Rinse the outdoor coil tonight","Power off at the disconnect, garden hose, gentle",True)
    py=int(y+14*SC); ph_h=int(300*SC)
    ph=Image.open(enhance("brand/jobs/raw/b1-04-trane-whitebrick.jpg")).convert("RGB")
    ph=ImageOps.fit(ph,(W-2*M,ph_h),Image.LANCZOS,centering=(0.5,0.4))
    mask=Image.new("L",(W-2*M,ph_h),0)
    ImageDraw.Draw(mask).rounded_rectangle([0,0,W-2*M,ph_h],radius=24*SC,fill=255)
    img.paste(ph,(M,py),mask)
    d=ImageDraw.Draw(img,"RGBA")
    badge(img,d,M+int(16*SC),py+int(16*SC),"REAL GLACIER INSTALL · SAN ANTONIO")
    kick=(py+ph_h+(H-FOOT_H))//2
    center(d,"From your neighbors at Glacier. Stay cool out there.",f("ExtraBold",24),kick,(120,205,246,255))
    d=footer(img,d)
    img.convert("RGB").save("brand/social/org-01-heatweek.png",optimize=True)
    print("o1 ok, photo end",(py+ph_h)//SC)

# ================================================== O2 — craft pride
def o2():
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA")
    TOP=int(880*SC)
    ph=Image.open(enhance("brand/jobs/raw/b2-09-tech-pump-repair.jpg")).convert("RGB")
    ph=ImageOps.fit(ph,(W,TOP),Image.LANCZOS,centering=(0.5,0.35))
    img.paste(ph,(0,0))
    grad=Image.new("L",(1,TOP),0)
    for yy in range(TOP):
        t=max(0,(yy/TOP-0.45))/0.55
        grad.putpixel((0,yy),int(238*t**1.25))
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
    eyebrow_brand(img,d,(200,226,246,255))
    badge(img,d,M,int(104*SC),"OUR CREW · MID-REPAIR",fill=(225,31,38,235))
    d=ImageDraw.Draw(img,"RGBA")
    center(d,"CRAFT ISN'T LOUD.",f("Black",58),int(TOP-170*SC),(255,255,255,255))
    center(d,"IT KNEELS IN THE DIRT",f("Black",44),int(TOP-112*SC),(120,205,246,255))
    center(d,"AND GETS THE SEAL RIGHT.",f("Black",44),int(TOP-62*SC),(120,205,246,255))
    d.rectangle([0,TOP,W,H],fill=(255,255,255,255))
    mid=(TOP+(H-FOOT_H))//2
    center(d,"No shortcuts when nobody's watching.",f("ExtraBold",26),mid-int(20*SC),HEAD)
    center(d,"That's the whole standard.",f("ExtraBold",26),mid+int(18*SC),ICE)
    d=footer(img,d)
    img.convert("RGB").save("brand/social/org-02-craft.png",optimize=True)
    print("o2 ok")

# ================================================== O3 — the veteran
def o3():
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA"); bg_light(img)
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    eyebrow_brand(img,d,ICE)
    center(d,"DECADES ON DUTY.",f("Black",54),136*SC,HEAD)
    center(d,"RETIRED WITH HONORS.",f("Black",40),192*SC,RED)
    center(d,"It kept this home comfortable since before the internet.",f("Bold",21),240*SC,SLATE)
    src=Image.open("brand/jobs/raw/b5-23-oldnew-furnace-beforeafter.jpg").convert("RGB")
    half_w=src.width//2
    crop_h=int(src.height*0.86)
    old=src.crop((0,0,half_w,crop_h))
    new=src.crop((half_w,0,src.width,crop_h))
    py=int(284*SC); ph_h=int(600*SC); pw=(W-2*M-int(24*SC))//2
    for i,(im,lab,col) in enumerate([(old,"THE VETERAN",(140,60,60,235)),(new,"THE NEW SHIFT",(21,115,168,235))]):
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
    mid=(py+ph_h+(H-FOOT_H))//2
    center(d,"Swapped in a day. Quietly, cleanly, with respect.",f("ExtraBold",25),mid-int(19*SC),HEAD)
    center(d,"Every system has a story. We write the next chapter.",f("ExtraBold",25),mid+int(19*SC),ICE)
    d=footer(img,d)
    img.convert("RGB").save("brand/social/org-03-veteran.png",optimize=True)
    print("o3 ok")

# ================================================== O4 — camera roll
def o4():
    img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA")
    TOP=int(880*SC)
    ph=Image.open(enhance("brand/jobs/raw/b4-17-two-trane-condensers-angle-pond.jpg")).convert("RGB")
    ph=ImageOps.fit(ph,(W,TOP),Image.LANCZOS,centering=(0.5,0.45))
    img.paste(ph,(0,0))
    grad=Image.new("L",(1,TOP),0)
    for yy in range(TOP):
        t=max(0,(yy/TOP-0.45))/0.55
        grad.putpixel((0,yy),int(238*t**1.25))
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
    eyebrow_brand(img,d,(200,226,246,255))
    badge(img,d,M,int(104*SC),"STRAIGHT OFF A CREW PHONE",fill=(225,31,38,235))
    d=ImageDraw.Draw(img,"RGBA")
    center(d,"NO STAGING.",f("Black",58),int(TOP-186*SC),(255,255,255,255))
    center(d,"NO STOCK PHOTOS.",f("Black",58),int(TOP-122*SC),(255,255,255,255))
    center(d,"JUST TUESDAY.",f("Black",58),int(TOP-58*SC),(120,205,246,255))
    d.rectangle([0,TOP,W,H],fill=(255,255,255,255))
    mid=(TOP+(H-FOOT_H))//2
    center(d,"What we set today cools this street for the next 15 years.",f("ExtraBold",25),mid-int(20*SC),HEAD)
    center(d,"That's the job. We love the job.",f("ExtraBold",25),mid+int(18*SC),ICE)
    d=footer(img,d)
    img.convert("RGB").save("brand/social/org-04-cameraroll.png",optimize=True)
    print("o4 ok")

o1(); o2(); o3(); o4()
# pixel QA: mark present on all four
from PIL import Image as I
import numpy as _np
for p in ["brand/social/org-01-heatweek.png","brand/social/org-02-craft.png",
          "brand/social/org-03-veteran.png","brand/social/org-04-cameraroll.png"]:
    a=_np.array(I.open(p).crop((0,40,2160,190)).convert("RGB")).astype(int)
    red=((a[:,:,0]>180)&(a[:,:,1]<90)&(a[:,:,2]<90)).sum()
    print(p,"mark-red px:",red,"OK" if red>200 else "MISSING")
print("ALL DONE")
