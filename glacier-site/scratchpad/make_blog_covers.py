"""Blog cover images — real job photos, editorial brand frame, 1200x630 (og-ready).
Rendered at 2x then downscaled once for crispness. No AI imagery, no overlays
beyond the measured brand system."""
from PIL import Image, ImageDraw, ImageFont, ImageOps
import numpy as np, cv2, os

SC=2
W,H=1200*SC,630*SC
FT="/tmp/mfonts"
RED=(225,31,38,255); ICE=(21,115,168,255)

def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", int(s*SC))
def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb

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

def cover(photo, kicker, line1, line2, out_name, centering=(0.5,0.45)):
    img=Image.new("RGB",(W,H),(0,20,44)).convert("RGBA")
    ph=Image.open(enhance(photo)).convert("RGB")
    ph=ImageOps.fit(ph,(W,H),Image.LANCZOS,centering=centering)
    img.paste(ph,(0,0))
    # bottom gradient for title legibility
    grad=Image.new("L",(1,H),0)
    for yy in range(H):
        t=max(0,(yy/H-0.38))/0.62
        grad.putpixel((0,yy),int(235*t**1.3))
    grad=grad.resize((W,H))
    ov=Image.new("RGBA",(W,H),(0,20,44,255)); ov.putalpha(grad)
    img.alpha_composite(ov)
    # top scrim for eyebrow
    tops=Image.new("RGBA",(W,int(120*SC)),(0,0,0,0))
    tg=ImageDraw.Draw(tops)
    for yy in range(int(120*SC)):
        tg.line([(0,yy),(W,yy)],fill=(0,18,40,int(185*(1-yy/(120*SC)))))
    img.alpha_composite(tops,(0,0))
    d=ImageDraw.Draw(img,"RGBA")
    d.rectangle([0,0,W,4*SC],fill=RED)
    # brand eyebrow, left-aligned
    M=int(56*SC)
    mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
    mh=int(42*SC); mw=int(mark.width*mh/mark.height)
    img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(M,int(30*SC)))
    d=ImageDraw.Draw(img,"RGBA")
    d.text((M+mw+int(14*SC),int(38*SC)),"GLACIER HEATING & AIR · SAN ANTONIO",font=f("Bold",16),fill=(200,226,246,255))
    # badge top-right
    bt="REAL GLACIER JOB PHOTO"; fb=f("Bold",13)
    bw=T(d,bt,fb)[0]
    d.rounded_rectangle([W-M-bw-int(30*SC),int(30*SC),W-M,int(30*SC)+int(36*SC)],radius=int(18*SC),fill=(0,26,54,215))
    d.text((W-M-bw-int(15*SC),int(38*SC)),bt,font=fb,fill=(255,255,255,255))
    # kicker + title bottom-left
    d.text((M,H-int(158*SC)),kicker,font=f("Bold",17),fill=(120,205,246,255))
    d.text((M,H-int(126*SC)),line1,font=f("Black",40),fill=(255,255,255,255))
    d.text((M,H-int(74*SC)),line2,font=f("Black",40),fill=(120,205,246,255))
    # site chip bottom-right
    site="CallGlacier.com"; fs2=f("ExtraBold",17)
    sw=T(d,site,fs2)[0]
    d.rounded_rectangle([W-M-sw-int(36*SC),H-int(70*SC),W-M,H-int(30*SC)],radius=int(20*SC),fill=RED)
    d.text((W-M-sw-int(18*SC),H-int(61*SC)),site,font=fs2,fill=(255,255,255,255))
    final=img.convert("RGB").resize((1200,630),Image.LANCZOS)
    final.save(out_name,quality=90,optimize=True)
    print("saved",out_name)

os.makedirs("public/blog",exist_ok=True)
cover("brand/jobs/raw/b1-02-runtru-stucco-shrubs.jpg",
      "SAN ANTONIO HOMEOWNER GUIDE",
      "AC RUNNING BUT","NOT COOLING?",
      "public/blog/cover-ac-running-but-not-cooling-san-antonio.jpg",(0.5,0.55))
cover("brand/jobs/raw/b4-17-two-trane-condensers-angle-pond.jpg",
      "THE 2026 MONEY GUIDE",
      "WHAT AC REPLACEMENT","REALLY COSTS HERE.",
      "public/blog/cover-ac-replacement-cost-san-antonio.jpg",(0.5,0.45))
cover("brand/jobs/raw/b1-04-trane-whitebrick.jpg",
      "BEFORE THE NEXT HEAT WAVE",
      "THE TEXAS SUMMER","AC SURVIVAL CHECKLIST.",
      "public/blog/cover-texas-summer-ac-survival-checklist.jpg",(0.5,0.4))

import numpy as _np
from PIL import Image as I
for p in os.listdir("public/blog"):
    a=_np.array(I.open("public/blog/"+p).crop((0,10,700,80)).convert("RGB")).astype(int)
    red=((a[:,:,0]>170)&(a[:,:,1]<95)&(a[:,:,2]<95)).sum()
    print(p,"mark-red px:",red,"OK" if red>80 else "CHECK")
print("DONE")
