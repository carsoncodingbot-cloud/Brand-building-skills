from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

FT = "/tmp/mfonts"
def font(sz): return ImageFont.truetype(f"{FT}/Montserrat-Black.ttf", sz)

def vgrad(w, h, stops):
    """vertical gradient image from list of (pos0-1, (r,g,b))"""
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        t = y/(h-1)
        # find segment
        for i in range(len(stops)-1):
            p0,c0 = stops[i]; p1,c1 = stops[i+1]
            if p0 <= t <= p1:
                f = (t-p0)/(p1-p0) if p1>p0 else 0
                r = int(c0[0]+(c1[0]-c0[0])*f); g=int(c0[1]+(c1[1]-c0[1])*f); b=int(c0[2]+(c1[2]-c0[2])*f)
                break
        else:
            r,g,b = stops[-1][1]
        for x in range(w): px[x,y]=(r,g,b)
    return img

def render_word(word, size=240):
    f = font(size)
    # measure with stroke
    tmp = Image.new("RGBA",(10,10)); d=ImageDraw.Draw(tmp)
    stroke = max(6, size//22)
    bbox = d.textbbox((0,0), word, font=f, stroke_width=stroke)
    tw = bbox[2]-bbox[0]; th = bbox[3]-bbox[1]
    depth = max(10, size//10)
    pad = stroke*2 + depth + 30
    W = tw + pad*2; H = th + pad*2 + depth
    canvas = Image.new("RGBA",(W,H),(0,0,0,0))
    ox = pad - bbox[0]; oy = pad - bbox[1]

    # --- 3D extrude (dark navy, deep to shallow) ---
    ext = Image.new("RGBA",(W,H),(0,0,0,0)); de=ImageDraw.Draw(ext)
    for i in range(depth,0,-1):
        t = i/depth
        col = (int(6+10*(1-t)), int(28+20*(1-t)), int(60+30*(1-t)), 255)  # navy shades
        de.text((ox+i*0.55, oy+i), word, font=f, fill=col, stroke_width=stroke, stroke_fill=col)
    canvas.alpha_composite(ext)

    # --- front face gradient fill ---
    mask = Image.new("L",(W,H),0); dm=ImageDraw.Draw(mask)
    dm.text((ox,oy), word, font=f, fill=255, stroke_width=stroke, stroke_fill=255)
    grad = vgrad(W,H,[(0.0,(233,247,253)),(0.32,(150,214,242)),(0.62,(64,164,220)),(1.0,(30,110,180))]).convert("RGBA")
    face = Image.new("RGBA",(W,H),(0,0,0,0))
    face.paste(grad,(0,0),mask)
    canvas.alpha_composite(face)

    # --- navy outline on front face (stroke ring) ---
    outline = Image.new("RGBA",(W,H),(0,0,0,0)); do=ImageDraw.Draw(outline)
    do.text((ox,oy), word, font=f, fill=(0,0,0,0), stroke_width=stroke, stroke_fill=(9,32,66,255))
    # keep only the stroke: subtract inner glyph
    inner = Image.new("L",(W,H),0); di=ImageDraw.Draw(inner)
    di.text((ox,oy), word, font=f, fill=255, stroke_width=0)
    ol = outline.copy(); ol.putalpha(Image.composite(ol.getchannel("A"), Image.new("L",(W,H),0), Image.eval(inner, lambda a:255-a)) if False else ol.getchannel("A"))
    canvas.alpha_composite(outline)
    # re-composite face center (so outline is only a ring)
    canvas.alpha_composite(face)

    # --- top white frosty highlight ---
    hi = Image.new("RGBA",(W,H),(0,0,0,0)); dh=ImageDraw.Draw(hi)
    dh.text((ox, oy-max(2,size//60)), word, font=f, fill=(255,255,255,235), stroke_width=0)
    himask = Image.new("L",(W,H),0)
    for y in range(H):
        v = 255 if y < oy+th*0.42 else 0
    # gradient highlight mask: fade from top of glyph
    hg = vgrad(W,H,[(0.0,(255,255,255)),( (oy+th*0.45)/H,(255,255,255)),((oy+th*0.62)/H,(0,0,0)),(1.0,(0,0,0))]).convert("L")
    hi.putalpha(Image.composite(hi.getchannel("A"), Image.new("L",(W,H),0), Image.eval(hg, lambda a:255-a)))
    canvas.alpha_composite(hi)

    # --- icy bubbles/speckles inside glyph ---
    import hashlib
    spk = Image.new("RGBA",(W,H),(0,0,0,0)); ds=ImageDraw.Draw(spk)
    seeds = [(i*97+31)%W for i in range(60)]
    for i in range(70):
        hx = int(hashlib.md5(f"{word}{i}x".encode()).hexdigest(),16)%W
        hy = int(hashlib.md5(f"{word}{i}y".encode()).hexdigest(),16)%H
        r = 2 + (i%3)
        if mask.getpixel((min(hx,W-1),min(hy,H-1)))>128:
            ds.ellipse([hx-r,hy-r,hx+r,hy+r], fill=(240,250,255,150))
    canvas.alpha_composite(spk)
    # clip everything to glyph+stroke mask+extrude — leave as is (extrude already outside)

    # crop to content
    bb = canvas.getbbox()
    return canvas.crop(bb)

from PIL import Image as ImageMod
ImageMod  # noqa
from PIL import ImageOps
from PIL import Image
from PIL import ImageChops
from PIL import ImageEnhance
from PIL import ImageDraw as _ID
from PIL import Image as _I
globals()['Image.eval'.split('.')[0]]  # noop

# Build stacked lockup: GLACIER over CLUB, justified to same width
w1 = render_word("GLACIER", 240)
w2 = render_word("CLUB", 240)
TARGET = 1500
def scale_to_w(im, tw):
    r = tw/im.width
    return im.resize((tw, max(1,int(im.height*r))), Image.LANCZOS)
w1 = scale_to_w(w1, TARGET)
w2 = scale_to_w(w2, int(TARGET*0.62))  # CLUB narrower, centered
gap = -int(w1.height*0.06)
Wc = TARGET + 120
Hc = w1.height + w2.height + gap + 120
logo = Image.new("RGBA",(Wc,Hc),(0,0,0,0))
logo.alpha_composite(w1, ((Wc-w1.width)//2, 40))
logo.alpha_composite(w2, ((Wc-w2.width)//2, 40 + w1.height + gap))

# soft drop shadow
sh = Image.new("RGBA", logo.size, (0,0,0,0))
sh.paste((3,16,40,255), (0,0), logo.getchannel("A"))
sh = sh.filter(ImageFilter.GaussianBlur(14))
out = Image.new("RGBA", logo.size, (0,0,0,0))
out.alpha_composite(sh, (0,10))
out.alpha_composite(logo)
out = out.crop(out.getbbox())
out.save("public/glacier-club-logo.png")
print("saved", out.size)
