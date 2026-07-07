"""Phase 2: surgical 'BY TRANE' subtext repair per version + deterministic bottom bars.
Works on the pre-resized art-{A,B,C}.png (1920 wide)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); DEEP=(0,26,54,255); ICE=(21,115,168,255); SLATE=(90,112,132,255)
W=1920

# per-version: cover rect, color-sample rect, right-align x, center y, font size, fill
FIX = {
 "A": dict(cover=(666,1574,760,1597), sample=(595,1580,655,1596), rx=752, cy=1584, fs=15, fill=(228,231,236)),
 "B": dict(cover=(372,1577,430,1593), sample=(300,1580,360,1592), rx=425, cy=1584, fs=11, fill=(205,208,212)),
 "C": dict(cover=(349,1591,412,1608), sample=(280,1594,340,1606), rx=408, cy=1599, fs=11, fill=(205,208,212)),
}

def fix_subtext(art, p):
    a=np.array(art.convert("RGB"))
    sx0,sy0,sx1,sy1=p["sample"]
    med=np.median(a[sy0:sy1,sx0:sx1].reshape(-1,3),axis=0).astype(int)
    cx0,cy0,cx1,cy1=p["cover"]
    patch=Image.new("RGB",(cx1-cx0,cy1-cy0),tuple(med))
    noise=(np.random.default_rng(3).normal(0,2.5,(patch.height,patch.width,1)).repeat(3,axis=2))
    patch=Image.fromarray(np.clip(np.array(patch)+noise,0,255).astype("uint8"))
    mask=Image.new("L",patch.size,0)
    ImageDraw.Draw(mask).rounded_rectangle([0,0,patch.width,patch.height],radius=6,fill=255)
    mask=mask.filter(ImageFilter.GaussianBlur(2.5))
    art=art.convert("RGBA"); art.paste(patch,(cx0,cy0),mask)
    d=ImageDraw.Draw(art)
    fnt=f("Bold",p["fs"]); TR=max(2,int(p["fs"]*0.30))
    txt="BY TRANE"
    def cw(c):
        bb=d.textbbox((0,0),c,font=fnt); return bb[2]-bb[0]
    total=sum((cw(c)+TR) if c!=' ' else int(p["fs"]*0.6) for c in txt)-TR
    x=p["rx"]-total
    ref=d.textbbox((0,0),"B",font=fnt); ytop=p["cy"]-(ref[3]-ref[1])/2-ref[1]
    for c in txt:
        if c!=' ':
            d.text((x,ytop),c,font=fnt,fill=p["fill"]); x+=cw(c)+TR
        else: x+=int(p["fs"]*0.6)
    return art

def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb

def bars(art, out):
    ah=art.height; H=ah+505
    img=Image.new("RGBA",(W,H),(255,255,255,255)); img.paste(art,(0,0))
    d=ImageDraw.Draw(img,"RGBA"); M=100
    B1T,B1B=ah,ah+220
    d.rectangle([0,B1T,W,B1B],fill=(255,255,255,255))
    mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
    mh=140; mw=int(mark.width*mh/mark.height); bcy=(B1T+B1B)//2
    img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),(M,bcy-mh//2))
    d=ImageDraw.Draw(img,"RGBA")
    gx=M+mw+34; gf=f("ExtraBold",78)
    gw,gh,gbb=T(d,"GLACIER",gf); gy=bcy-64
    d.text((gx-gbb[0],gy-gbb[1]),"GLACIER",font=gf,fill=NAVY)
    sub="HEATING & AIR"; sf=f("Bold",30)
    widths=[T(d,c,sf)[0] if c!=' ' else 11 for c in sub]
    extra=(gw-sum(widths))/(len(sub)-1); xx=gx
    for c,w_ in zip(sub,widths):
        if c!=' ': d.text((xx,gy+96),c,font=sf,fill=ICE)
        xx+=w_+extra
    dvx=gx+gw+56
    d.line([(dvx,B1T+48),(dvx,B1B-48)],fill=(208,224,238,255),width=4)
    d.text((dvx+52,bcy-60),"San Antonio's Coolest HVAC Team",font=f("ExtraBold",48),fill=NAVY)
    d.text((dvx+52,bcy+10),"Trusted comfort. Built to last.",font=f("Bold",36),fill=SLATE)
    B2T,B2B=B1B,B1B+206
    d.rectangle([0,B2T,W,B2B],fill=NAVY)
    r1=(B2T+B2B)//2
    pc=Image.new("RGBA",(96,96),(0,0,0,0)); pd=ImageDraw.Draw(pc)
    pd.ellipse([0,0,96,96],outline=(255,255,255,255),width=5)
    img.alpha_composite(pc,(M,r1-48))
    ph=Image.open("scratchpad/phone.png").convert("RGBA").resize((54,54),Image.LANCZOS)
    img.alpha_composite(ph,(M+21,r1-27))
    d=ImageDraw.Draw(img,"RGBA")
    px0=M+126
    d.text((px0,r1-58),"CALL US TODAY!",font=f("Bold",32),fill=(255,255,255,230))
    d.text((px0,r1-18),"(866) 665-2210",font=f("Black",62),fill=(255,255,255,255))
    num_end=px0+T(d,"(866) 665-2210",f("Black",62))[0]
    items=[("shield","100% SATISFACTION","GUARANTEED"),
           ("wrench","WARRANTY ON","ALL UNITS"),
           ("home","PERFECT FOR","HOME & OFFICE")]
    def ic(n,s): return Image.open(f"scratchpad/ic-{n}.png").convert("RGBA").resize((s,s),Image.LANCZOS)
    ICO=52; IG=16; DIV=40; fs_=24
    while fs_>=16:
        ft=f("Bold",fs_)
        ws=[ICO+IG+max(T(d,l1,ft)[0],T(d,l2,ft)[0]) for _,l1,l2 in items]
        total=sum(ws)+DIV*2*(len(items)-1)
        if W-M-total >= num_end+70: break
        fs_-=1
    ix=W-M-total
    for k,(icn,l1,l2) in enumerate(items):
        img.alpha_composite(ic(icn,ICO),(int(ix),int(r1-ICO/2)))
        d=ImageDraw.Draw(img,"RGBA")
        txx=ix+ICO+IG
        d.text((txx,r1-26),l1,font=ft,fill=(255,255,255,255))
        d.text((txx,r1+4),l2,font=ft,fill=(255,255,255,255))
        ix+=ws[k]
        if k<len(items)-1:
            d.line([(ix+DIV,r1-24),(ix+DIV,r1+24)],fill=(255,255,255,70),width=2)
            ix+=DIV*2
    d.rectangle([0,B2B,W,H],fill=DEEP)
    line="KEEPING YOU COOL, EVERY SEASON."
    fl=f("Bold",30); TRK=9
    lw=sum((T(d,c,fl)[0]+TRK) if c!=' ' else 22 for c in line)-TRK
    scy=(B2B+H)//2; sx=(W-lw)//2
    ref=d.textbbox((0,0),"K",font=fl); ytop=scy-(ref[3]-ref[1])/2-ref[1]
    snl=ic("snowflake",30)
    img.alpha_composite(snl,(int(sx-58),scy-15))
    img.alpha_composite(snl,(int(sx+lw+28),scy-15))
    d=ImageDraw.Draw(img,"RGBA")
    xx=sx
    for c in line:
        if c!=' ':
            d.text((xx,ytop),c,font=fl,fill=(255,255,255,215)); xx+=T(d,c,fl)[0]+TRK
        else: xx+=22
    img.convert("RGB").save(out,optimize=True)
    print("saved",out,img.size)

for v in ["A","B","C"]:
    art=Image.open(f"scratchpad/art-{v}.png")
    art=fix_subtext(art,FIX[v])
    bars(art,f"scratchpad/yeti-final-{v}.png")
    art.crop((FIX[v]["cover"][0]-160,FIX[v]["cover"][1]-110,FIX[v]["cover"][2]+120,FIX[v]["cover"][3]+70)).resize((720,int((FIX[v]["cover"][3]-FIX[v]["cover"][1]+180)*720/(FIX[v]["cover"][2]-FIX[v]["cover"][0]+280))),Image.LANCZOS).save(f"scratchpad/qa2-{v}.png")
