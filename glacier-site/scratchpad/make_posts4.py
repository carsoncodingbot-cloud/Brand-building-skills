"""Posts 11-17: education/engagement set. Mixed light+dark cards, custom vector
components per post (filter, myth/fact, peak-hours chart, data plate, gauge,
checklist, yeti patrol). Same brand system, zero repeats."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, hashlib

S=1080; M=84; FOOT_Y=S-118
FT="/tmp/mfonts"
def f(n,s): return ImageFont.truetype(f"{FT}/Montserrat-{n}.ttf", s)
NAVY=(0,43,88,255); DEEPN=(0,26,54,255); RED=(225,31,38,255); GOLD=(245,166,35,255)
ICE=(150,206,245,255); ICE2=(178,216,244,255); TURQ=(72,202,228,255)
HEAD=(12,52,96,255); SLATE=(84,106,128,255)

mark=Image.open("public/logo-mark.png").convert("RGBA"); mark=mark.crop(mark.getbbox())
lockW=Image.open("brand/glacier-logo-white.png").convert("RGBA"); lockW=lockW.crop(lockW.getbbox())
lockN=Image.open("brand/glacier-logo-navy.png").convert("RGBA"); lockN=lockN.crop(lockN.getbbox())
YETI=Image.open("scratchpad/yeti-panel-clean.png") if False else None
def ic(name,size):
    return Image.open(f"scratchpad/ic-{name}.png").convert("RGBA").resize((size,size),Image.LANCZOS)

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

def bg_dark():
    img=Image.new("RGB",(S,S),(0,22,46)); px=img.load()
    c0=(0,20,44); c1=(24,84,150)
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

def bg_light():
    img=Image.new("RGB",(S,S),(255,255,255)); px=img.load()
    st=(214,236,250); sb=(168,210,240)
    for y in range(S):
        t=(y/S)**1.05
        c=tuple(int(st[i]+(sb[i]-st[i])*t) for i in range(3))
        for x in range(S): px[x,y]=c
    img=img.convert("RGBA"); d=ImageDraw.Draw(img,"RGBA")
    for cx,w,h,a in [(180,340,220,80),(600,430,300,95),(960,380,260,85)]:
        d.polygon([(cx-w,S+16),(cx,S+16-h),(cx+w,S+16)],fill=(255,255,255,a))
    return img

def footer(img,light=False):
    d=ImageDraw.Draw(img,"RGBA")
    line_c=(0,43,88,60) if light else (255,255,255,42)
    d.line([(M,FOOT_Y),(S-M,FOOT_Y)],fill=line_c,width=2)
    lock = lockN if light else lockW
    lh=42; lw=int(lock.width*lh/lock.height)
    img.alpha_composite(lock.resize((lw,lh),Image.LANCZOS),(M,FOOT_Y+28))
    d=ImageDraw.Draw(img,"RGBA")
    t="CallGlacier.com"; font=f("Bold",28)
    w,h,bb=T(d,t,font)
    col=(0,43,88,235) if light else (255,255,255,235)
    d.text((S-M-w-bb[0],FOOT_Y+28+(lh-h)/2-bb[1]),t,font=font,fill=col)
    return img

# ============ POST 11 — THE $12 RULE (light) ============
img=bg_light(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"THE CHEAPEST INSURANCE YOUR AC WILL EVER GET",f("Bold",24),120,HEAD,5)
center(d,"THE $12 RULE",f("Black",96),218,HEAD)
# pleated filter illustration
fx0,fy0,fx1,fy1=290,320,790,600
d.rounded_rectangle([fx0,fy0,fx1,fy1],radius=18,fill=(255,255,255,255),outline=(13,66,116,255),width=6)
for i in range(1,12):
    x=fx0+ i*(fx1-fx0)//12
    top= fy0+26 if i%2 else fy0+58
    d.line([(x-((fx1-fx0)//24),fy0+58 if i%2 else fy0+26),(x,top)],fill=(120,160,196,255),width=5)
for i in range(12):
    x0=fx0+22+i*((fx1-fx0-44)//12)
    d.line([(x0,fy1-26),(x0+((fx1-fx0-44)//24),fy1-58)],fill=(120,160,196,255),width=5)
d.line([(fx0+18,fy0+92),(fx1-18,fy0+92)],fill=(13,66,116,120),width=3)
d.line([(fx0+18,fy1-92),(fx1-18,fy1-92)],fill=(13,66,116,120),width=3)
center(d,"AIR FILTER",f("ExtraBold",40),(fy0+fy1)//2,(13,66,116,255))
center(d,"Swap it every 60–90 days.",f("ExtraBold",44),680,HEAD)
center(d,"A clogged filter makes your AC fight for every breath —",f("Bold",27),756,SLATE)
center(d,"and that fight shows up on your electric bill.",f("Bold",27),794,SLATE)
d.rounded_rectangle([S//2-250,846,S//2+250,908],radius=31,fill=RED)
center(d,"WRITE THE DATE ON THE FRAME",f("ExtraBold",25),877,(255,255,255,255))
img=footer(img,light=True); img.convert("RGB").save("scratchpad/post11-filter.png")

# ============ POST 12 — MYTH vs FACT (dark) ============
img=bg_dark(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"THERMOSTAT TRUTH",f("Bold",26),112,ICE2,8)
# MYTH panel
d.rounded_rectangle([M,170,S-M,430],radius=22,fill=(160,22,28,235))
d.rounded_rectangle([M+36,140,M+236,196],radius=28,fill=(255,255,255,255))
center(d,"MYTH",f("Black",34),168,(160,22,28,255),cx=M+136)
center(d,'"Setting it to 60° cools',f("ExtraBold",42),268,(255,255,255,255))
center(d,'the house faster."',f("ExtraBold",42),322,(255,255,255,255))
center(d,"Nope. That's not how it works.",f("Bold",25),382,(255,214,214,255))
# FACT panel
d.rounded_rectangle([M,492,S-M,800],radius=22,fill=(9,60,110,240))
d.rounded_rectangle([M+36,462,M+236,518],radius=28,fill=TURQ)
center(d,"FACT",f("Black",34),490,(0,32,60,255),cx=M+136)
center(d,"Your AC cools at ONE speed.",f("ExtraBold",42),580,(255,255,255,255))
center(d,"72° or 60° — same pace.",f("ExtraBold",42),634,TURQ)
center(d,"Cranking it lower just makes it run longer,",f("Bold",25),700,ICE2)
center(d,"overshoot, and burn money.",f("Bold",25),736,ICE2)
center(d,"Set the temp you want. Let it work.",f("ExtraBold",30),852,(255,255,255,255))
img=footer(img); img.convert("RGB").save("scratchpad/post12-myth.png")

# ============ POST 13 — SAN ANTONIO PEAK HOURS (dark) ============
img=bg_dark(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"SAN ANTONIO ENERGY SECRET",f("Bold",26),110,ICE2,8)
center(d,"4–9 PM",f("Black",130),226,GOLD)
center(d,"the hours that eat your summer bill",f("ExtraBold",34),330,(255,255,255,255))
# hour bars
bx0,bx1,by=150,930,640
hours=[(10,0.28),(12,0.42),(14,0.62),(16,0.95),(18,1.0),(20,0.86),(22,0.44)]
bw=58; gap=(bx1-bx0-7*bw)//6
for i,(h,v) in enumerate(hours):
    x=bx0+i*(bw+gap)
    bh=int(240*v)
    hot = 16<=h<=20
    col = GOLD if hot else (86,140,196,220)
    d.rounded_rectangle([x,by-bh,x+bw,by],radius=10,fill=col)
    lab=f"{h if h<=12 else h-12}{'a' if h<12 else 'p'}"
    center(d,lab,f("Bold",24),by+30,ICE2,cx=x+bw//2)
center(d,"Grid demand + afternoon heat peak together.",f("Bold",27),742,ICE2)
center(d,"THE MOVE: pre-cool to 71–72° by 3 PM,",f("ExtraBold",31),806,(255,255,255,255))
center(d,"then let it coast through the expensive hours.",f("ExtraBold",31),848,TURQ)
img=footer(img); img.convert("RGB").save("scratchpad/post13-peak.png")

# ============ POST 14 — HOW OLD IS YOUR AC? (light) ============
img=bg_light(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"60-SECOND HOMEOWNER TRICK",f("Bold",24),112,HEAD,6)
center(d,"YOUR AC'S BIRTHDAY",f("Black",76),200,HEAD)
center(d,"IS HIDING ON A METAL PLATE",f("Black",44),268,(21,115,168,255))
# data plate illustration
px0,py0,px1,py1=250,330,830,660
d.rounded_rectangle([px0,py0,px1,py1],radius=14,fill=(208,216,224,255),outline=(120,134,148,255),width=5)
for i in range(4):
    yy=py0+56+i*54
    d.line([(px0+34,yy),(px1-34,yy)],fill=(150,162,174,255),width=3)
d.text((px0+34,py0+22),"MODEL  4TTR6036J1000A",font=f("Bold",30),fill=(70,84,98,255))
d.text((px0+34,py0+80),"SERIAL  11254KABCD",font=f("Bold",30),fill=(70,84,98,255))
d.text((px0+34,py0+134),"MFR DATE  06 / 2011",font=f("Black",34),fill=(160,22,28,255))
d.text((px0+34,py0+192),"VOLTS 208/230   R-410A",font=f("Bold",28),fill=(70,84,98,255))
d.ellipse([px0+16,py0+120,px0+430,py0+186],outline=RED,width=7)
center(d,"Check the outdoor unit's side panel.",f("ExtraBold",36),724,HEAD)
center(d,"10–15 years old? Start planning before it starts failing —",f("Bold",26),788,SLATE)
center(d,"a system replaced on YOUR schedule always costs less.",f("Bold",26),824,SLATE)
d.rounded_rectangle([S//2-290,864,S//2+290,922],radius=29,fill=NAVY)
center(d,"DROP YOUR UNIT'S YEAR IN THE COMMENTS",f("ExtraBold",23),893,(255,255,255,255))
img=footer(img,light=True); img.convert("RGB").save("scratchpad/post14-plate.png")

# ============ POST 15 — THE 20° RULE (dark) ============
img=bg_dark(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"SUMMER EXPECTATIONS, SET HONESTLY",f("Bold",25),110,ICE2,7)
center(d,"THE 20° RULE",f("Black",92),206,(255,255,255,255))
# gauge arc
cx,cy,r=S//2,560,240
for adeg in range(180,361,2):
    rad=math.radians(adeg)
    col=TURQ if adeg<300 else RED
    x0=cx+int((r-26)*math.cos(rad)); y0=cy+int((r-26)*math.sin(rad))
    x1=cx+int(r*math.cos(rad)); y1=cy+int(r*math.sin(rad))
    d.line([(x0,y0),(x1,y1)],fill=col,width=7)
center(d,"100°",f("Black",56),330,RED,cx=cx+r-46)
center(d,"78°",f("Black",56),330,TURQ,cx=cx-r+46)
center(d,"OUTSIDE",f("Bold",24),382,ICE2,cx=cx+r-46)
center(d,"INSIDE",f("Bold",24),382,ICE2,cx=cx-r+46)
center(d,"~ 20°",f("Black",100),520,GOLD)
center(d,"cooler than outdoors",f("ExtraBold",30),600,(255,255,255,255))
center(d,"That's what a healthy AC is built to hold.",f("Bold",27),688,ICE2)
center(d,"On a 102° San Antonio day, 78–80° inside isn't broken —",f("Bold",26),744,ICE2)
center(d,"it's winning. Can't hold even that? Now it's our turn.",f("Bold",26),780,(255,255,255,255))
center(d,"Free checkup · (866) 665-2210",f("ExtraBold",30),856,TURQ)
img=footer(img); img.convert("RGB").save("scratchpad/post15-rule20.png")

# ============ POST 16 — 5-MINUTE CHECK (light) ============
img=bg_light(); d=ImageDraw.Draw(img,"RGBA")
tracked_center(d,"SAVE THIS ONE",f("Bold",26),108,HEAD,10)
center(d,"THE 5-MINUTE",f("Black",78),190,HEAD)
center(d,"MONTHLY AC CHECK",f("Black",78),268,(21,115,168,255))
items=["Filter — hold it to a light. See through it?",
       "Vents — all open, nothing blocking airflow",
       "Outdoor unit — 2 ft clear on every side",
       "Drain line — dripping outside on hot days",
       "Sound — humming is fine, grinding is not"]
y=344
card_w=S-2*M
d.rounded_rectangle([M,y-14,S-M,y+len(items)*88+6],radius=22,fill=(255,255,255,240))
for i,t in enumerate(items):
    cy2=y+30+i*88
    d.rounded_rectangle([M+34,cy2-22,M+78,cy2+22],radius=10,outline=(13,66,116,255),width=5)
    d.line([(M+44,cy2+2),(M+54,cy2+13)],fill=(34,160,92,255),width=8)
    d.line([(M+54,cy2+13),(M+72,cy2-14)],fill=(34,160,92,255),width=8)
    d.text((M+104,cy2-17),t,font=f("Bold",29),fill=(24,52,84,255))
center(d,"No tools. No ladder. Five minutes a month.",f("ExtraBold",30),y+len(items)*88+64,HEAD)
img=footer(img,light=True); img.convert("RGB").save("scratchpad/post16-check.png")

# ============ POST 17 — YETI ON PATROL (light, mascot) ============
img=bg_light(); d=ImageDraw.Draw(img,"RGBA")
panel=Image.open("scratchpad/yeti-panel-final.png")
ph=850; pw=int(panel.width*ph/panel.height)
img.alpha_composite(panel.resize((pw,ph),Image.LANCZOS),(S-pw,120))
d=ImageDraw.Draw(img,"RGBA")
d.text((M,140),"SUMMER",font=f("Black",84),fill=HEAD)
d.text((M,226),"PATROL IS",font=f("Black",84),fill=HEAD)
d.text((M,312),"ACTIVE.",font=f("Black",84),fill=(21,115,168,255))
d.rounded_rectangle([M,436,M+424,494],radius=16,fill=NAVY)
center(d,"NEW AC SYSTEMS",f("ExtraBold",27),465,(255,255,255,255),cx=M+212)
d.text((M,522),"Free estimates.",font=f("ExtraBold",34),fill=HEAD)
d.text((M,568),"Exact price in writing.",font=f("ExtraBold",34),fill=HEAD)
d.text((M,614),"Callbacks in minutes.",font=f("ExtraBold",34),fill=HEAD)
d.text((M,690),"He doesn't hibernate",font=f("Bold",27),fill=SLATE)
d.text((M,726),"in the summer. Neither do we.",font=f("Bold",27),fill=SLATE)
d.rounded_rectangle([M,790,M+470,852],radius=31,fill=RED)
center(d,"(866) 665-2210",f("Black",34),821,(255,255,255,255),cx=M+235)
img=footer(img,light=True); img.convert("RGB").save("scratchpad/post17-patrol.png")

print("7 posts rendered")
