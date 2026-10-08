"""Generate local share images without external fonts, assets, or services.

Run with Python + Pillow. Override STUDIO_SANS_FONT / STUDIO_SERIF_FONT when
these system fonts are unavailable. Outputs are committed static assets.
"""
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SANS = os.environ.get('STUDIO_SANS_FONT', '/System/Library/Fonts/Helvetica.ttc')
SERIF = os.environ.get('STUDIO_SERIF_FONT', '/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf')
INK, PAPER, LIME, MUTED = '#111713', '#edf0e6', '#c3d99e', '#abb6a6'


def make_card(filename, brand, headline, accent, caption):
    canvas = Image.new('RGB', (1200, 630), INK)
    draw = ImageDraw.Draw(canvas)
    sans = lambda size: ImageFont.truetype(SANS, size)
    serif = lambda size: ImageFont.truetype(SERIF, size)
    draw.text((70, 50), brand, fill=LIME, font=sans(26))
    draw.line((70, 110, 1130, 110), fill='#334031', width=1)
    draw.text((65, 180), headline, fill=PAPER, font=sans(76))
    draw.text((65, 280), accent, fill=LIME, font=serif(82))
    draw.text((70, 438), caption, fill=MUTED, font=sans(24))
    draw.line((70, 530, 1130, 530), fill='#334031', width=1)
    draw.text((70, 558), 'kukso.com' + ('/gyrolog' if filename.startswith('gyrolog') else ''), fill=MUTED, font=sans(22))
    for angle in (-35, 35, 0):
        orbit = Image.new('RGBA', (300, 300), (0, 0, 0, 0))
        orbit_draw = ImageDraw.Draw(orbit)
        orbit_draw.ellipse((70, 20, 230, 280), outline='#728660', width=2)
        orbit = orbit.rotate(angle, resample=Image.Resampling.BICUBIC)
        canvas.paste(orbit, (850, 160), orbit)
    draw.ellipse((989, 299, 1011, 321), fill=LIME)
    canvas.save(ROOT / 'static' / 'meta' / filename, optimize=True)


if __name__ == '__main__':
    make_card('studio-social.png', 'KUKSO STUDIOS / INDEPENDENT PRODUCT STUDIO', 'Useful ideas.', 'Thoughtfully built.', 'Personal software. Community platforms. Developer tools.')
    make_card('gyrolog-social.png', 'GYROLOG / PERSONAL OPERATING SYSTEM', 'Stay on', 'course.', 'Voice Dump. Pilot. Navigator. In development by Kukso Studios.')
