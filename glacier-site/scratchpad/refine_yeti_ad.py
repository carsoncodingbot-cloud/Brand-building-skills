from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import math

src=Image.open("scratchpad/yeti-ad-src.webp").convert("RGB")
W,H=src.size            # 1920 x 2571
CUT=2066                # art above, rebuilt bands below
FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); DEEP=(0,26,54,255); RED=(225,31,38,255)
ICE=(21,115,168,255); SLATE=(90,112,132,255)

# ---------- 1) refine the artwork ----------
art=src.crop((0,0,W,CUT))
art=art.filter(ImageFilter.UnsharpMask(radius=2.2,percent=80,threshold=2))
art=ImageEnhance.Contrast(art).enhance(1.03)
art=ImageEnhance.Color(art).enhance(1.05)

img=Image.new("RGBA",(W,H),(255,255,255,255))
img.paste(art,(0,0))
d=ImageDraw.Draw(img,"RGBA")

def T(t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb
def text_vc(x,cy,t,font,fill):
    w,h,bb=T(t,font)
    d.text((x,cy-h/2-bb[1]),t,font=font,fill=fill); return w

M=100
# ---------- 2) white brand bar: 2066 -> 2286 ----------
BAR1_T,BAR1_B=CUT,2286
d.rectangle([0,BAR1_T,W,BAR1_B],fill=(255,255,255,255))
mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
mh=140; mw=int(mark.width*mh/mark.height)
bcy=(BAR1_T+BAR1_B)//2
img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(M,bcy-mh//2))
d=ImageDraw.Draw(img,"RGBA")
gx=M+mw+34
gf=f("ExtraBold",78)
gw,gh,gbb=T("GLACIER",gf)
gy=bcy-64
d.text((gx-gbb[0],gy-gbb[1]),"GLACIER",font=gf,fill=NAVY)
sub="HEATING & AIR"; sf=f("Bold",30)
widths=[T(c,sf)[0] if c!=' ' else 11 for c in sub]
extra=(gw-sum(widths))/(len(sub)-1); xx=gx
for c,w_ in zip(sub,widths):
    if c!=' ': d.text((xx,gy+96),c,font=sf,fill=ICE)
    xx+=w_+extra
dvx=gx+gw+56
d.line([(dvx,BAR1_T+48),(dvx,BAR1_B-48)],fill=(208,224,238,255),width=4)
d.text((dvx+52,bcy-56),"San Antonio's Coolest HVAC Team",font=f("ExtraBold",44),fill=NAVY)
d.text((dvx+52,bcy+8),"Trusted comfort. Built to last.",font=f("Bold",34),fill=SLATE)

# ---------- 3) navy CTA bar: 2286 -> 2492 ----------
BAR2_T,BAR2_B=2286,2492
d.rectangle([0,BAR2_T,W,BAR2_B],fill=NAVY)
r1cy=(BAR2_T+BAR2_B)//2
pc=Image.new("RGBA",(96,96),(0,0,0,0)); pd=ImageDraw.Draw(pc)
pd.ellipse([0,0,96,96],outline=(255,255,255,255),width=5)
img.alpha_composite(pc,(M,r1cy-48))
ph=Image.open("scratchpad/phone.png").convert("RGBA").resize((54,54),Image.LANCZOS)
img.alpha_composite(ph,(M+21,r1cy-27))
d=ImageDraw.Draw(img,"RGBA")
px0=M+126
d.text((px0,r1cy-58),"CALL US TODAY!",font=f("Bold",32),fill=(255,255,255,230))
d.text((px0,r1cy-18),"(205) 601-3797",font=f("Black",62),fill=(255,255,255,255))
num_end=px0+T("(205) 601-3797",f("Black",62))[0]

items=[("shield","100% SATISFACTION","GUARANTEED"),
       ("wrench","WARRANTY ON","ALL UNITS"),
       ("home","PERFECT FOR","HOME & OFFICE")]
def ic(name,size): return Image.open(f"scratchpad/ic-{name}.png").convert("RGBA").resize((size,size),Image.LANCZOS)
ICO=48; IG=16; DIV=40
fs_=22
while fs_>=16:
    ft=f("Bold",fs_)
    widths=[ICO+IG+max(T(l1,ft)[0],T(l2,ft)[0]) for _,l1,l2 in items]
    total=sum(widths)+DIV*2*(len(items)-1)
    if W-M-total >= num_end+70: break
    fs_-=1
ix=W-M-total
for k,(icn,l1,l2) in enumerate(items):
    img.alpha_composite(ic(icn,ICO),(int(ix),int(r1cy-ICO/2)))
    d=ImageDraw.Draw(img,"RGBA")
    txx=ix+ICO+IG
    d.text((txx,r1cy-26),l1,font=ft,fill=(255,255,255,255))
    d.text((txx,r1cy+4),l2,font=ft,fill=(255,255,255,255))
    ix+=widths[k]
    if k<len(items)-1:
        d.line([(ix+DIV,r1cy-24),(ix+DIV,r1cy+24)],fill=(255,255,255,70),width=2)
        ix+=DIV*2

# ---------- 4) sign-off strip: 2492 -> H ----------
d.rectangle([0,BAR2_B,W,H],fill=DEEP)
line="KEEPING YOU COOL, EVERY SEASON."
fl=f("Bold",28); TRK=9
lw=sum((T(c,fl)[0]+TRK) if c!=' ' else 22 for c in line)-TRK
scy=(BAR2_B+H)//2
sx=(W-lw)//2
ref=d.textbbox((0,0),"K",font=fl); ytop=scy-(ref[3]-ref[1])/2-ref[1]
snl=ic("snowflake",30)
img.alpha_composite(snl,(int(sx-58),scy-15))
img.alpha_composite(snl,(int(sx+lw+28),scy-15))
d=ImageDraw.Draw(img,"RGBA")
xx=sx
for c in line:
    if c!=' ':
        d.text((xx,ytop),c,font=fl,fill=(255,255,255,215)); xx+=T(c,fl)[0]+TRK
    else: xx+=22

img.convert("RGB").save("scratchpad/yeti-ad-refined.png",optimize=True)
print("saved",img.size)
