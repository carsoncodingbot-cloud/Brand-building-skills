from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, hashlib

S=1080; M=84
FOOT_Y=S-118          # footer band top
FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); RED=(225,31,38,255); GOLD=(245,166,35,255)
ICE=(150,206,245,255); ICE2=(178,216,244,255); TURQ=(72,202,228,255)

mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
lockW=Image.open("brand/glacier-logo-white.png").convert("RGBA"); lockW=lockW.crop(lockW.getbbox())
van=Image.open("public/van.webp").convert("RGBA")
gg=Image.open("scratchpad/googleg.png").convert("RGBA")
phico=Image.open("scratchpad/phone.png").convert("RGBA")
club=Image.open("public/glacier-club-logo.png").convert("RGBA")
def ic(name,size):
    return Image.open(f"scratchpad/ic-{name}.png").convert("RGBA").resize((size,size),Image.LANCZOS)

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
    # bottom scrim: guarantees text contrast over the mountains
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
def star(d,cx,cy,r,fill):
    pts=[]
    for i in range(10):
        a=-math.pi/2+i*math.pi/5; rad=r if i%2==0 else r*0.42
        pts.append((cx+rad*math.cos(a),cy+rad*math.sin(a)))
    d.polygon(pts,fill=fill)

def footer(img):
    d=ImageDraw.Draw(img,"RGBA")
    d.line([(M,FOOT_Y),(S-M,FOOT_Y)],fill=(255,255,255,42),width=2)
    lh=42; lw=int(lockW.width*lh/lockW.height)
    img.alpha_composite(lockW.resize((lw,lh),Image.LANCZOS),(M,FOOT_Y+28))
    d=ImageDraw.Draw(img,"RGBA")
    t="CallGlacier.com"; font=f("Bold",28)
    w,h,bb=T(d,t,font)
    d.text((S-M-w-bb[0],FOOT_Y+28+(lh-h)/2-bb[1]),t,font=font,fill=(255,255,255,235))
    return img

def van_hero(img,vw,cy_bottom,cx=S//2):
    vh=int(van.height*vw/van.width)
    v=van.resize((vw,vh),Image.LANCZOS)
    vx=cx-vw//2; vy=cy_bottom-vh
    glow=Image.new("RGBA",(S,S),(0,0,0,0)); gd=ImageDraw.Draw(glow)
    gd.ellipse([vx+40,vy+50,vx+vw-40,vy+vh-8],fill=(72,202,228,60))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(60)))
    sh=Image.new("RGBA",(S,S),(0,0,0,0)); sd=ImageDraw.Draw(sh)
    sd.ellipse([vx+46,vy+vh-30,vx+vw-24,vy+vh+14],fill=(0,10,26,150))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(14)))
    img.alpha_composite(v,(vx,vy))
    return img

# ============ POST 1 — LAUNCH ============
img=bg(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"NOW SERVING GREATER SAN ANTONIO",f("Bold",26),200,ICE2,7)
mh=300; mw=int(mark.width*mh/mark.height)
img.alpha_composite(mark.resize((mw,mh),Image.LANCZOS),((S-mw)//2,268))
d=ImageDraw.Draw(img,"RGBA")
center(d,"GLACIER",f("Black",92),652,(255,255,255,255))
gw,_,_=T(d,"GLACIER",f("Black",92))
sub="HEATING & AIR"; fs=f("Bold",34)
widths=[T(d,c,fs)[0] if c!=' ' else 12 for c in sub]
extra=(gw-sum(widths))/(len(sub)-1); xx=(S-gw)/2
for c,w in zip(sub,widths):
    if c!=' ': d.text((xx,712),c,font=fs,fill=ICE)
    xx+=w+extra
d.line([(S//2-36,790),(S//2+36,790)],fill=TURQ,width=5)
center(d,"San Antonio's Coolest HVAC Team",f("ExtraBold",38),842,(255,255,255,255))
img=footer(img); img.convert("RGB").save("scratchpad/post1-launch.png")

# ============ POST 2 — THE FLEET ============
img=bg(); d=ImageDraw.Draw(img,"RGBA")
d.text((M,150),"KEEP AN EYE OUT,",font=f("Black",72),fill=(255,255,255,255))
d.text((M,238),"SAN ANTONIO.",font=f("Black",72),fill=ICE)
d.text((M,344),"The Glacier fleet is rolling out across the city.",font=f("Bold",30),fill=(255,255,255,215))
img=van_hero(img,780,905)
img=footer(img); img.convert("RGB").save("scratchpad/post2-fleet.png")

# ============ POST 3 — REVIEWS ============
img=bg(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"THE REVIEWS ARE IN",f("Bold",26),176,ICE2,7)
center(d,"SAN ANTONIO",f("Black",76),262,(255,255,255,255))
center(d,"IS TALKING.",f("Black",76),356,ICE)
# white review card
cw,ch=640,250; cx0=(S-cw)//2; cy0=440
card=Image.new("RGBA",(cw,ch),(0,0,0,0)); cd=ImageDraw.Draw(card)
cd.rounded_rectangle([0,0,cw,ch],radius=28,fill=(255,255,255,255))
img.alpha_composite(card,(cx0,cy0))
gsize=96
img.alpha_composite(gg.resize((gsize,gsize),Image.LANCZOS),(cx0+54,cy0+ch//2-gsize//2))
d=ImageDraw.Draw(img,"RGBA")
tx=cx0+54+gsize+40
d.text((tx,cy0+52),"4.9",font=f("Black",84),fill=NAVY)
w49,_,_=T(d,"4.9",f("Black",84))
sx=tx+w49+30+22
for i in range(5): star(d,sx+i*50,cy0+96,22,GOLD)
d.text((tx,cy0+160),"687+ Google Reviews",font=f("Bold",30),fill=(96,116,136,255))
center(d,"Fast. Honest. Cold air when you need it.",f("ExtraBold",34),772,(255,255,255,255))
center(d,"Thank you, San Antonio — we don't take it lightly.",f("Bold",26),826,ICE2)
img=footer(img); img.convert("RGB").save("scratchpad/post3-reviews.png")

# ============ POST 4 — GLACIER CLUB ============
img=bg(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"SAVE MONEY. STAY COMFORTABLE.",f("Bold",26),168,ICE2,7)
cw2=620; ch2=int(club.height*cw2/club.width)
img.alpha_composite(club.resize((cw2,ch2),Image.LANCZOS),((S-cw2)//2,214))
d=ImageDraw.Draw(img,"RGBA")
bens=["2 Precision Tune-Ups a Year","Front-of-Line Priority Service","15% Off All Repairs"]
by=214+ch2+56
bf=f("Bold",34)
maxw=max(T(d,b,bf)[0] for b in bens)
bx=(S-(56+18+maxw))//2
for i,b in enumerate(bens):
    yy=by+i*76
    disc=Image.new("RGBA",(56,56),(0,0,0,0)); dd=ImageDraw.Draw(disc)
    dd.ellipse([0,0,56,56],fill=(31,143,214,255))
    img.alpha_composite(disc,(bx,yy)); img.alpha_composite(ic("check",30),(bx+13,yy+13))
    d=ImageDraw.Draw(img,"RGBA")
    _,bh,bb=T(d,b,bf)
    d.text((bx+56+18,yy+28-bh/2-bb[1]),b,font=bf,fill=(255,255,255,255))
img=footer(img); img.convert("RGB").save("scratchpad/post4-club.png")

# ============ POST 5 — 24/7 EMERGENCY ============
img=bg(deep=True); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"24/7 EMERGENCY SERVICE",f("Bold",28),190,TURQ,9)
center(d,"NO COOL?",f("Black",108),318,(255,255,255,255))
center(d,"NO HEAT?",f("Black",108),448,ICE)
center(d,"We answer day or night — nights, weekends,",f("Bold",30),566,(255,255,255,215))
center(d,"and holidays included.",f("Bold",30),610,(255,255,255,215))
# giant phone pill
pht="(205) 601-3797"; phf=f("ExtraBold",54)
pw,phh,pbb=T(d,pht,phf)
isz=52; pad=52; gap=22
totw=pad+isz+gap+pw+pad; toth=108
px0=(S-totw)//2; py0=688
d.rounded_rectangle([px0,py0,px0+totw,py0+toth],radius=54,fill=RED)
img.alpha_composite(phico.resize((isz,isz),Image.LANCZOS),(int(px0+pad),int(py0+toth//2-isz//2)))
d=ImageDraw.Draw(img,"RGBA")
d.text((px0+pad+isz+gap-pbb[0],py0+toth/2-phh/2-pbb[1]),pht,font=phf,fill=(255,255,255,255))
center(d,"Save this number. You'll be glad you did.",f("Bold",26),852,ICE2)
img=footer(img); img.convert("RGB").save("scratchpad/post5-emergency.png")

print("5 posts rendered")
