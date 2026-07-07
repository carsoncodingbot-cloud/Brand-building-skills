from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, hashlib

S=1080; M=84; FOOT_Y=S-118
FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); RED=(225,31,38,255); GOLD=(245,166,35,255)
ICE=(150,206,245,255); ICE2=(178,216,244,255); TURQ=(72,202,228,255)
lockW=Image.open("brand/glacier-logo-white.png").convert("RGBA"); lockW=lockW.crop(lockW.getbbox())
phico=Image.open("scratchpad/phone.png").convert("RGBA")
def ic(name,size): return Image.open(f"scratchpad/ic-{name}.png").convert("RGBA").resize((size,size),Image.LANCZOS)

def bg(deep=False):
    img=Image.new("RGB",(S,S),(0,22,46)); px=img.load()
    c0=(0,18,40) if deep else (0,20,44); c1=(14,60,116) if deep else (24,84,150)
    for y in range(S):
        for x in range(S):
            t=min(1.0,max(0.0,(x/S)*0.6+(y/S)*0.4))
            px[x,y]=tuple(int(c0[i]+(c1[i]-c0[i])*t) for i in range(3))
    img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
    for cx,w,h,a in [(160,360,240,20),(560,460,330,22),(940,420,290,20)]:
        d.polygon([(cx-w,S+20),(cx,S+20-h),(cx+w,S+20)],fill=(255,255,255,a))
    ov=Image.new("RGBA",(S,S),(0,0,0,0)); od=ImageDraw.Draw(ov)
    for y in range(700,S):
        a=int(215*((y-700)/(S-700))**1.15)
        od.line([(0,y),(S,y)],fill=(0,18,40,a))
    img=Image.alpha_composite(img,ov); d=ImageDraw.Draw(img,"RGBA")
    for i in range(30):
        hx=int(hashlib.md5(f"x{i}".encode()).hexdigest(),16)%S
        hy=int(hashlib.md5(f"y{i}".encode()).hexdigest(),16)%S
        r=1+(i%2); d.ellipse([hx-r,hy-r,hx+r,hy+r],fill=(255,255,255,26))
    return img

def T(d,t,font):
    bb=d.textbbox((0,0),t,font=font); return bb[2]-bb[0],bb[3]-bb[1],bb
def center(d,t,font,cy,fill,cx=S//2):
    w,h,bb=T(d,t,font)
    d.text((cx-w/2-bb[0],cy-h/2-bb[1]),t,font=font,fill=fill); return w
def tracked_center(d,t,font,cy,fill,track=8):
    widths=[T(d,c,font)[0] if c!=' ' else font.size*0.5 for c in t]
    total=sum(widths)+track*(len(t)-1)
    x=(S-total)/2
    ref=d.textbbox((0,0),"K",font=font); ytop=cy-(ref[3]-ref[1])/2-ref[1]
    for c,w in zip(t,widths):
        if c!=' ': d.text((x,ytop),c,font=font,fill=fill)
        x+=w+track
def footer(img):
    d=ImageDraw.Draw(img,"RGBA")
    d.line([(M,FOOT_Y),(S-M,FOOT_Y)],fill=(255,255,255,42),width=2)
    lh=42; lw=int(lockW.width*lh/lockW.height)
    img.alpha_composite(lockW.resize((lw,lh),Image.LANCZOS),(M,FOOT_Y+28))
    d=ImageDraw.Draw(img,"RGBA")
    t="CallGlacier.com"; font=f("Bold",28)
    w,h,bb=T(d,t,font)
    d.text((S-M-w-bb[0],FOOT_Y+28+(42-h)/2-bb[1]),t,font=font,fill=(255,255,255,235))
    return img
def phone_pill(img,d,cy,size=40):
    pht="(866) 665-2210"; phf=f("ExtraBold",size)
    pw,phh,pbb=T(d,pht,phf)
    isz=size; pad=int(size*1.1); gap=18
    totw=pad+isz+gap+pw+pad; toth=int(size*2.1)
    px0=(S-totw)//2; py0=cy-toth//2
    d.rounded_rectangle([px0,py0,px0+totw,py0+toth],radius=toth//2,fill=RED)
    img.alpha_composite(phico.resize((isz,isz),Image.LANCZOS),(int(px0+pad),int(py0+toth//2-isz//2)))
    d=ImageDraw.Draw(img,"RGBA")
    d.text((px0+pad+isz+gap-pbb[0],py0+toth/2-phh/2-pbb[1]),pht,font=phf,fill=(255,255,255,255))
    return d

# ============ POST 9 — 5 SOUNDS ============
img=bg(deep=True); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"LISTEN TO YOUR AC",f("Bold",26),140,TURQ,8)
center(d,"5 SOUNDS YOUR AC MAKES",f("Black",56),218,(255,255,255,255))
center(d,"BEFORE IT QUITS.",f("Black",56),288,ICE)
rows=[("01","RATTLE","loose or failing parts"),
      ("02","BUZZ","electrical trouble"),
      ("03","HISS","refrigerant leak"),
      ("04","CLICK-CLICK","a relay wearing out"),
      ("05","SQUEAL","belt or motor stress")]
numf=f("Black",34); wf=f("ExtraBold",38); cf=f("Bold",24)
# measure widths to center the whole block
roww=max(T(d,"01",numf)[0]+26+T(d,w, wf)[0]+24+T(d,c,cf)[0] for _,w,c in rows)
bx=(S-roww)//2
y=372
for n,wrd,cause in rows:
    nw,nh,nbb=T(d,n,numf)
    d.text((bx-nbb[0],y-nbb[1]),n,font=numf,fill=TURQ)
    ww,wh,wbb=T(d,wrd,wf)
    d.text((bx+T(d,"01",numf)[0]+26-wbb[0],y-4-wbb[1]),wrd,font=wf,fill=(255,255,255,255))
    cw,ch,cbb=T(d,cause,cf)
    d.text((bx+T(d,"01",numf)[0]+26+ww+24-cbb[0],y+6-cbb[1]),"— "+cause,font=cf,fill=ICE2)
    y+=84
center(d,"Hear one? Call before it becomes a $2,000 weekend.",f("Bold",27),y+18,(255,255,255,225))
d=phone_pill(img,d,y+108,36)
img=footer(img); img.convert("RGB").save("scratchpad/post9-sounds.png")

# ============ POST 10 — FREE SECOND OPINION ============
img=bg(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"BEFORE YOU WRITE THAT CHECK",f("Bold",26),150,ICE2,7)
center(d,"ALREADY GOT",f("Black",84),248,(255,255,255,255))
center(d,"A BIG QUOTE?",f("Black",84),352,(255,255,255,255))
# highlight bar
bt="GET A FREE SECOND OPINION."
bf=f("ExtraBold",40); bw_,bh_,bbb=T(d,bt,bf)
stx=(S-(bw_+84))//2; sty=436
d.rounded_rectangle([stx,sty,stx+bw_+84,sty+86],radius=18,fill=(31,143,214,255))
d.text((stx+42-bbb[0],sty+43-bh_/2-bbb[1]),bt,font=bf,fill=(255,255,255,255))
checks=["Honest eyes on the diagnosis","No pressure. No obligation.","It could save you thousands."]
cf2=f("Bold",32)
maxw=max(T(d,c,cf2)[0] for c in checks)
bx=(S-(52+18+maxw))//2; y=596
for c in checks:
    disc=Image.new("RGBA",(52,52),(0,0,0,0)); dd=ImageDraw.Draw(disc)
    dd.ellipse([0,0,52,52],fill=(31,143,214,255))
    img.alpha_composite(disc,(int(bx),y)); img.alpha_composite(ic("check",28),(int(bx)+12,y+12))
    d=ImageDraw.Draw(img,"RGBA")
    cw,ch,cbb=T(d,c,cf2)
    d.text((bx+52+18-cbb[0],y+26-ch/2-cbb[1]),c,font=cf2,fill=(255,255,255,255))
    y+=76
d=phone_pill(img,d,y+62,40)
img=footer(img); img.convert("RGB").save("scratchpad/post10-secondopinion.png")
print("2 posts rendered")
