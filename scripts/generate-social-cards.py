"""Generate the Studio and Gyrolog social cards from local assets.

Requires Python + Pillow. The Gyrolog card also uses Swift/AppKit to rasterize
the approved SVG mark and bundled Instrument Sans. Override STUDIO_SANS_FONT /
STUDIO_SERIF_FONT when the Studio card's system fonts are unavailable.
"""
import os
import subprocess
import tempfile
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


def make_gyrolog_card():
    """Render the accepted Open Dial G SVG into a reproducible Gyrolog card."""
    font_dir = ROOT / 'static' / 'fonts' / 'instrument-sans'
    regular = ImageFont.truetype(str(font_dir / 'InstrumentSans_400Regular.ttf'), 70)
    semibold = ImageFont.truetype(str(font_dir / 'InstrumentSans_600SemiBold.ttf'), 27)
    accent = ImageFont.truetype(str(font_dir / 'InstrumentSans_600SemiBold.ttf'), 62)
    caption = ImageFont.truetype(str(font_dir / 'InstrumentSans_400Regular.ttf'), 25)

    with tempfile.TemporaryDirectory(prefix='gyrolog-social-') as temporary:
        temporary_path = Path(temporary)
        mark_path = temporary_path / 'gyrolog-mark.png'
        module_cache = temporary_path / 'swift-module-cache'
        module_cache.mkdir()
        environment = os.environ.copy()
        environment['CLANG_MODULE_CACHE_PATH'] = str(module_cache)
        environment['SWIFT_MODULECACHE_PATH'] = str(module_cache)
        subprocess.run(
            [
                'swift',
                str(ROOT / 'scripts' / 'rasterize-svg.swift'),
                str(ROOT / 'static' / 'brand' / 'gyrolog-mark.svg'),
                str(mark_path),
                '360',
            ],
            check=True,
            env=environment,
        )
        mark = Image.open(mark_path).convert('RGBA')

    canvas = Image.new('RGB', (1200, 630), '#19191a')
    draw = ImageDraw.Draw(canvas)
    draw.text((76, 78), 'GYROLOG', fill='#d3f413', font=semibold)
    draw.text((72, 205), 'Log your life.', fill='#f5f3ed', font=regular)
    draw.text((72, 305), 'Find your balance.', fill='#d3f413', font=accent)
    draw.text((76, 475), 'gyrolog.app', fill='#b8b5ac', font=caption)

    mark = mark.resize((280, 280), Image.Resampling.LANCZOS)
    canvas.paste(mark, (850, 174), mark)
    canvas.save(ROOT / 'static' / 'meta' / 'gyrolog-social.png', optimize=True)


if __name__ == '__main__':
    make_card('studio-social.png', 'KUKSO STUDIOS / INDEPENDENT PRODUCT STUDIO', 'Useful ideas.', 'Thoughtfully built.', 'Personal software. Community platforms. Developer tools.')
    make_gyrolog_card()
