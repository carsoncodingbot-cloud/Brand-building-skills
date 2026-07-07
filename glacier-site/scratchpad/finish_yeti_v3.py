"""Finish the three uploaded yeti ad candidates (A/B/C):
1. strip screenshot borders  2. trim empty white bottom  3. upscale to W=1920 + sharpen
4. replace the AI's garbled RunTru mark with the clean vector mark (auto-located via
   red-pixel detection, covered with sampled panel color first)
5. rebuild the deterministic bottom bars (white brand bar, navy CTA, sign-off strip)
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import numpy as np

FT = "/tmp/mfonts"
def f(n, s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); DEEP=(0,26,54,255); ICE=(21,115,168,255); SLATE=(90,112,132,255)
W = 1920

RT = Image.open("scratchpad/runtru-mark.png").convert("RGBA")
rt_a = np.array(RT)
red = (rt_a[:,:,0]>120)&(rt_a[:,:,0].astype(int)-rt_a[:,:,1]>60)&(rt_a[:,:,0].astype(int)-rt_a[:,:,2]>60)&(rt_a[:,:,3]>100)
ys,xs = np.where(red)
RT_RED = (xs.min(), ys.min(), xs.max(), ys.max())   # red bbox inside the mark

def crop_borders(im):
    """Remove near-black screenshot borders on any side."""
    a = np.array(im.convert("RGB")).astype(int)
    bright = a.sum(axis=2) > 90
    rows = np.where(bright.mean(axis=1) > 0.04)[0]
    cols = np.where(bright.mean(axis=0) > 0.04)[0]
    return im.crop((cols[0], rows[0], cols[-1]+1, rows[-1]+1))

def trim_white_bottom(im):
    """Cut the empty near-white strip the model reserved at the bottom."""
    a = np.array(im.convert("RGB")).astype(int)
    nonwhite = (np.abs(a-255).sum(axis=2) > 45).mean(axis=1)
    y = im.height - 1
    while y > im.height*0.6 and nonwhite[y] < 0.02: y -= 1
    return im.crop((0, 0, im.width, y+6))

def fix_runtru(art):
    """Find the garbled AI RunTru mark via red pixels; cover + reprint clean."""
    a = np.array(art.convert("RGB")).astype(int)
    h, w = a.shape[:2]
    m = (a[:,:,0]>110)&(a[:,:,0]-a[:,:,1]>55)&(a[:,:,0]-a[:,:,2]>55)
    m[:, int(w*0.55):] = False; m[:int(h*0.30), :] = False; m[int(h*0.80):, :] = False
    ys, xs = np.where(m)
    if len(xs) < 40:
        print("  runtru: red mark not found, skipping"); return art
    x0,y0,x1,y1 = xs.min(), ys.min(), xs.max(), ys.max()
    # map: scale mark so its red bbox matches the detected red bbox
    s = (x1-x0) / (RT_RED[2]-RT_RED[0])
    mw, mh = int(RT.width*s), int(RT.height*s)
    mark = RT.resize((mw, mh), Image.LANCZOS)
    px = int(x0 - RT_RED[0]*s); py = int(y0 - RT_RED[1]*s)
    # cover patch: full mark area + margin, filled with median border color, feathered
    mx0,my0,mx1,my1 = px-16, py-14, px+mw+16, py+mh+14
    ring = []
    for (rx0,ry0,rx1,ry1) in [(mx0-10,my0-10,mx1+10,my0),(mx0-10,my1,mx1+10,my1+10),
                              (mx0-10,my0,mx0,my1),(mx1,my0,mx1+10,my1)]:
        seg = a[max(ry0,0):max(ry1,0), max(rx0,0):max(rx1,0)]
        if seg.size: ring.append(seg.reshape(-1,3))
    med = np.median(np.vstack(ring), axis=0).astype(int) if ring else np.array([60,64,68])
    patch = Image.new("RGBA", (mx1-mx0, my1-my0), tuple(med)+(255,))
    noise = (np.random.default_rng(7).normal(0, 3.5, (patch.height, patch.width, 1))
             .repeat(3, axis=2))
    patch = Image.fromarray(np.clip(np.array(patch)[:,:,:3]+noise, 0, 255).astype("uint8")).convert("RGBA")
    mask = Image.new("L", patch.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0,0,patch.width,patch.height], radius=12, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(6))
    art = art.convert("RGBA")
    art.paste(patch, (mx0, my0), mask)
    mk = mark.filter(ImageFilter.GaussianBlur(0.5))
    al = mk.getchannel("A").point(lambda v: int(v*0.95)); mk.putalpha(al)
    art.alpha_composite(mk, (px, py))
    print(f"  runtru: replaced at ({px},{py}) scale {s:.2f}")
    return art

def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb

def build(src, out):
    print(out)
    art = crop_borders(Image.open(src))
    art = trim_white_bottom(art)
    art = fix_runtru(art)
    ah = int(art.height * W / art.width)
    art = art.resize((W, ah), Image.LANCZOS).filter(ImageFilter.UnsharpMask(2.0, 65, 2))
    art = ImageEnhance.Contrast(art).enhance(1.02)

    H = ah + 505
    img = Image.new("RGBA", (W, H), (255,255,255,255))
    img.paste(art, (0, 0))
    d = ImageDraw.Draw(img, "RGBA")
    M = 100

    # white brand bar
    B1T, B1B = ah, ah+220
    d.rectangle([0,B1T,W,B1B], fill=(255,255,255,255))
    mark = Image.open("public/logo-mark.png").convert("RGBA"); mark = mark.crop(mark.getbbox())
    mh=140; mw=int(mark.width*mh/mark.height)
    bcy=(B1T+B1B)//2
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

    # navy CTA bar
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
    d.text((px0,r1-18),"(205) 601-3797",font=f("Black",62),fill=(255,255,255,255))
    num_end=px0+T(d,"(205) 601-3797",f("Black",62))[0]
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

    # sign-off strip
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
    img.convert("RGB").save(out, optimize=True)
    print("  saved", img.size)

build("scratchpad/extract-3.png", "scratchpad/yeti-final-A.png")
build("scratchpad/extract-4.png", "scratchpad/yeti-final-B.png")
build("scratchpad/extract-5.png", "scratchpad/yeti-final-C.png")
