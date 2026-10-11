"""Generate RN's original animated greeting cards (Pillow + imageio-ffmpeg).
Development asset tool only; not a website dependency.
"""
import math
import random
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'work/media-tools'))
import imageio_ffmpeg

W, H, FPS, SECONDS = 960, 600, 24, 10
OUT = ROOT / 'public/media'
OUT.mkdir(parents=True, exist_ok=True)
FONTS = Path('C:/Windows/Fonts')

def font(size, bold=False, serif=False):
    return ImageFont.truetype(str(FONTS / ('georgia.ttf' if serif else 'seguisb.ttf' if bold else 'segoeui.ttf')), size)

def centered(draw, text, y, size, color, bold=False, serif=False):
    face = font(size, bold, serif)
    box = draw.textbbox((0, 0), text, font=face)
    draw.text(((W - (box[2] - box[0])) / 2, y), text, font=face, fill=color)

def gradient(top, bottom):
    im = Image.new('RGB', (W, H))
    d = ImageDraw.Draw(im)
    for y in range(H):
        f = y / H
        d.line((0, y, W, y), fill=tuple(round(a + (b-a)*f) for a,b in zip(top, bottom)))
    return im

def tree(d, x, y, size, color):
    for k in range(3):
        yy = y + k * size * .22
        span = size * (.20 + k * .08)
        d.polygon([(x, yy - size * .35), (x-span, yy+size*.3), (x+span, yy+size*.3)], fill=color)
    d.rectangle((x-size*.035,y+size*.7,x+size*.035,y+size*.85),fill=color)

def santa():
    im = Image.new('RGBA',(260,360))
    d = ImageDraw.Draw(im)
    cream, red, dark = '#fff2dc', '#d23742', '#232c2b'
    d.rounded_rectangle((68,247,109,334),radius=15,fill=red)
    d.rounded_rectangle((153,247,195,334),radius=15,fill=red)
    d.rounded_rectangle((48,319,112,346),radius=12,fill=dark)
    d.rounded_rectangle((151,319,222,346),radius=12,fill=dark)
    d.line([(70,175),(35,128),(24,73)],fill=red,width=30)
    d.line([(185,174),(225,131),(231,70)],fill=red,width=30)
    d.ellipse((7,45,42,83),fill=cream)
    d.ellipse((214,42,251,80),fill=cream)
    d.rounded_rectangle((55,147,207,282),radius=50,fill=red)
    d.rectangle((120,158,140,281),fill=cream)
    d.rounded_rectangle((57,233,206,255),radius=5,fill=dark)
    d.rounded_rectangle((110,229,153,261),radius=5,outline='#eac478',width=6)
    d.rounded_rectangle((61,267,202,287),radius=10,fill=cream)
    d.ellipse((74,53,188,166),fill='#ffd0ad')
    d.ellipse((72,104,190,189),fill=cream)
    d.ellipse((88,96,109,111),fill='#efa49a')
    d.ellipse((151,96,174,112),fill='#efa49a')
    d.arc((99,84,116,100),190,345,fill='#513a33',width=4)
    d.arc((147,84,164,100),190,345,fill='#513a33',width=4)
    d.ellipse((121,104,141,120),fill='#edb094')
    d.ellipse((102,118,132,134),fill='#fffaf2')
    d.ellipse((129,118,159,134),fill='#fffaf2')
    d.arc((122,129,142,146),0,180,fill='#a35349',width=3)
    d.polygon([(78,63),(91,20),(134,5),(190,31),(200,55),(179,67),(161,35),(163,63)],fill=red)
    d.rounded_rectangle((73,53,190,75),radius=9,fill=cream)
    d.ellipse((182,49,216,82),fill=cream)
    return im

random.seed(27)
particles = [(random.uniform(10,W-10),random.uniform(30,H-60),random.uniform(.5,2),random.uniform(0,math.tau)) for _ in range(35)]
SANTA = santa()

def christmas_frame(t):
    im = gradient((15,47,36),(36,84,59)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((25,25,W-26,H-26),radius=24,outline='#87936b',width=1)
    d.ellipse((500,170,1020,690),fill='#2f634b')
    for x,y,size in [(565,365,135),(880,365,175),(920,460,120),(490,495,100)]:
        tree(d,x,y,size,'#194b38')
    d.polygon([(0,556),(130,544),(320,564),(510,527),(690,560),(960,535),(960,600),(0,600)],fill='#c9d7bb')
    for i,(x,y,r,p) in enumerate(particles):
        yy = (y + t*17) % (H-70) + 35
        xx = x + math.sin(t*.55+p)*8
        d.ellipse((xx-r,yy-r,xx+r,yy+r),fill='#e5dfbc')
    wire=[(x,48+25*math.sin(math.pi*x/W)) for x in range(35,W-35,4)]
    d.line(wire,fill='#768366',width=2)
    for i in range(19):
        x=50+i*48;y=48+25*math.sin(math.pi*x/W)
        color=['#f5d48f','#d7867a','#b9d9b1'][i%3]
        d.line((x,y,x,y+13),fill='#768366',width=2)
        d.ellipse((x-4,y+10,x+4,y+22),fill=color)
    d.text((65,133),'RN CONCRETAGEM',font=font(17,True),fill='#e8cb90')
    d.text((60,190),'Feliz',font=font(67,serif=True),fill='#fff2d7')
    d.text((59,259),'Natal',font=font(100,serif=True),fill='#edce89')
    d.line((65,401,127,401),fill='#edce89',width=2)
    d.text((65,427),'Da nossa família',font=font(23),fill='#e8e8d5')
    d.text((65,462),'para a sua.',font=font(23),fill='#e8e8d5')
    figure=SANTA.rotate(math.sin(t*math.tau/10)*3,resample=Image.Resampling.BICUBIC,expand=False)
    im.paste(figure,(590,160),figure)
    d=ImageDraw.Draw(im)
    d.line((616,60,616,223),fill='#c2af77',width=2)
    d.line((822,60,822,223),fill='#c2af77',width=2)
    for x,y,color in [(552,517,'#ca343f'),(810,534,'#e4be7a')]:
        d.rounded_rectangle((x,y,x+52,y+45),radius=4,fill=color)
        d.rectangle((x+22,y,x+29,y+45),fill='#fff0cc')
        d.rectangle((x,y+16,x+52,y+23),fill='#fff0cc')
    return im

def newyear_frame(t):
    im=gradient((245,240,226),(227,222,204)); d=ImageDraw.Draw(im)
    d.rounded_rectangle((25,25,W-26,H-26),radius=110,outline='#bcab81',width=1)
    for i in range(6):
        y=480+i*16
        pts=[(x,y+math.sin(x/W*math.tau+.3*i)*15) for x in range(0,W,4)]
        d.line(pts,fill='#c9bd9d',width=1)
    d.ellipse((390,63,570,243),fill='#e5d6ad')
    d.ellipse((415,88,545,218),outline='#c7af79',width=1)
    centered(d,'RN CONCRETAGEM',74,15,'#626f62',True)
    centered(d,'Feliz',133,44,'#596756',serif=True)
    centered(d,'2027',197,161,'#847345',serif=True)
    centered(d,'Novos caminhos. Boas conquistas.',417,24,'#5d6b5c')
    centered(d,'UM ANO PARA CONSTRUIR BONS MOMENTOS.',535,13,'#7a755e',True)
    for x,y,r,p in particles[:24]:
        yy=y+math.sin(t*math.tau/10+p)*8
        d.ellipse((x-r,yy-r,x+r,yy+r),fill='#c2a869')
    return im

for theme,render in [('natal',christmas_frame),('reveillon',newyear_frame)]:
    render(0).save(OUT/f'{theme}-poster.jpg',quality=92)
    writer=imageio_ffmpeg.write_frames(str(OUT/f'{theme}-greeting.mp4'),(W,H),fps=FPS,codec='libx264',pix_fmt_in='rgb24',pix_fmt_out='yuv420p',output_params=['-crf','25','-movflags','+faststart'],macro_block_size=8)
    writer.send(None)
    for frame in range(FPS*SECONDS):
        writer.send(render(frame/FPS).tobytes())
    writer.close()
    print(f'Created {theme}: original animated greeting, {SECONDS}s, silent MP4.')
