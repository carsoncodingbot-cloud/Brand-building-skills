"""Counter-programming feed ad (1080x1350 @2x) — real job photo vs the market's
stock-photo slop. Hero: b4-17 twin Trane condensers, golden light. Full brand
dress: headline, offer banner, trust chips, navy footer with phone + site."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import numpy as np, cv2, os

SC=2
W,H=1080*SC,1350*SC; M=84*SC
FT="/tmp/mfonts"
NAVY=(0,43,88,255); DEEPN=(0,26,54,255); RED=(225,31,38,255)
HEAD=(12,52,96,255); SLATE=(84,106,128,255); ICE=(21,115,168,255)

def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", int(s*SC))
def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb
def center(d,t,font,cy,fill,cx=W//2):
    w,h,bb=T(d,t,font)
    d.text((cx-w/2-bb[0],cy-h/2-bb[1]),t,font=font,fill=fill); return w

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

img=Image.new("RGB",(W,H),(255,255,255)).convert("RGBA")

# ---------- hero photo: full-bleed top ----------
TOP_H=int(770*SC)
ph=Image.open(enhance("brand/jobs/raw/b4-17-two-trane-condensers-angle-pond.jpg")).convert("RGB")
ph=ImageOps.fit(ph,(W,TOP_H),Image.LANCZOS,centering=(0.5,0.45))
img.paste(ph,(0,0))

# navy gradient up from the bottom of the photo for headline legibility
grad=Image.new("L",(1,TOP_H),0)
for yy in range(TOP_H):
    t=max(0,(yy/TOP_H-0.40))/0.60
    grad.putpixel((0,yy),int(242*t**1.25))
grad=grad.resize((W,TOP_H))
ov=Image.new("RGBA",(W,TOP_H),(0,20,44,255)); ov.putalpha(grad)
img.alpha_composite(ov,(0,0))
# top scrim for eyebrow
tops=Image.new("RGBA",(W,int(150*SC)),(0,0,0,0))
tg=ImageDraw.Draw(tops)
for yy in range(int(150*SC)):
    tg.line([(0,yy),(W,yy)],fill=(0,18,40,int(195*(1-yy/(150*SC)))))
img.alpha_composite(tops,(0,0))
d=ImageDraw.Draw(img,"RGBA")
d.rectangle([0,0,W,4*SC],fill=RED)

# eyebrow
def tracked(t,font,cy,fill,track):
    track*=SC
    widths=[T(d,c,font)[0] if c!=' ' else font.size*0.5 for c in t]
    total=sum(widths)+track*(len(t)-1)
    x=(W-total)/2
    ref=d.textbbox((0,0),"K",font=font); ytop=cy-(ref[3]-ref[1])/2-ref[1]
    for c,wd in zip(t,widths):
        if c!=' ': d.text((x,ytop),c,font=font,fill=fill)
        x+=wd+track
tracked("GLACIER HEATING & AIR  ·  SAN ANTONIO",f("Bold",19),58*SC,(200,226,246,255),5)

# proof badge, top-left under eyebrow
bt="REAL JOB · NOT A STOCK PHOTO"; fb=f("Bold",15)
bw=T(d,bt,fb)[0]
d.rounded_rectangle([M,int(104*SC),M+bw+int(36*SC),int(104*SC)+int(42*SC)],radius=21*SC,fill=(225,31,38,235))
d.text((M+int(18*SC),int(113*SC)),bt,font=fb,fill=(255,255,255,255))

# headline on the gradient
center(d,"THIS IS OUR ACTUAL WORK.",f("Black",56),int(TOP_H-198*SC),(255,255,255,255))
center(d,"AND YOUR PRICE, IN WRITING,",f("Black",56),int(TOP_H-138*SC),(120,205,246,255))
center(d,"BEFORE WE START.",f("Black",56),int(TOP_H-78*SC),(120,205,246,255))

# ---------- white band: trust chips ----------
band_y=TOP_H
d.rectangle([0,band_y,W,H],fill=(255,255,255,255))
chips=["LICENSED & INSURED","24/7 EMERGENCY","FINANCING AVAILABLE"]
fc=f("Bold",18)
cw=[T(d,t,fc)[0]+int(44*SC) for t in chips]
gap=(W-2*M-sum(cw))//2
cx=M; ch=int(52*SC); cy0=band_y+int(34*SC)
for t,wd in zip(chips,cw):
    d.rounded_rectangle([cx,cy0,cx+wd,cy0+ch],radius=ch//2,fill=(240,248,253,255),outline=(13,66,116,110),width=2*SC)
    w,hh,bb=T(d,t,fc)
    d.text((cx+(wd-w)/2-bb[0],cy0+(ch-hh)/2-bb[1]),t,font=fc,fill=HEAD)
    cx+=wd+gap

# supporting line
y=cy0+ch+int(34*SC)
center(d,"Exact-price estimates are free. The number we quote",f("Bold",23),y+int(6*SC),SLATE)
center(d,"is the number you pay — nobody likes surprise math.",f("Bold",23),y+int(40*SC),SLATE)

# ---------- red offer banner ----------
ob_y=y+int(92*SC); ob_h=int(92*SC)
d.rectangle([0,ob_y,W,ob_y+ob_h],fill=RED)
center(d,"NEW AC SYSTEMS  ·  FREE EXACT-PRICE ESTIMATES",f("ExtraBold",27),ob_y+ob_h//2,(255,255,255,255))
# sign-off between banner and footer
mid=(ob_y+ob_h+(H-int(150*SC)))//2
center(d,"No stock photos. No surprise invoices. Just cold air.",f("ExtraBold",25),mid,ICE)

# ---------- navy footer ----------
FOOT_H=int(150*SC)
y0=H-FOOT_H
d.rectangle([0,y0,W,H],fill=DEEPN)
r1=y0+FOOT_H//2
cs=int(64*SC)
d.ellipse([M,r1-cs//2,M+cs,r1+cs//2],outline=(255,255,255,255),width=4*SC)
phn=Image.open("scratchpad/phone.png").convert("RGBA").resize((int(cs*0.54),int(cs*0.54)),Image.LANCZOS)
img.alpha_composite(phn,(M+int(cs*0.23),r1-int(cs*0.27)))
d=ImageDraw.Draw(img,"RGBA")
px0=M+cs+int(20*SC)
d.text((px0,r1-int(40*SC)),"CALL OR TEXT · 24/7",font=f("Bold",18),fill=(160,196,226,255))
d.text((px0,r1-int(12*SC)),"(866) 665-2210",font=f("Black",42),fill=(255,255,255,255))
site="CallGlacier.com"; fs2=f("ExtraBold",24)
sw=T(d,site,fs2)[0]
d.rounded_rectangle([W-M-sw-int(48*SC),r1-int(25*SC),W-M,r1+int(25*SC)],radius=int(25*SC),fill=RED)
w,hh,bb=T(d,site,fs2)
d.text((W-M-sw-int(24*SC)-bb[0],r1-hh/2-bb[1]),site,font=fs2,fill=(255,255,255,255))

img.convert("RGB").save("brand/ad-realwork-1080x1350.png",optimize=True)
print("saved", img.size, "banner", ob_y, "footer", y0)
