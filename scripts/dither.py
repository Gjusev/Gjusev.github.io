"""1-bit Floyd-Steinberg versions of every project still, in the site's two inks.

Used where a picture resolves from noise to signal (project-row previews, the ring hero).
Run after sync_projects.py:  python scripts/dither.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
INK, PAPER = (38, 37, 30), (229, 227, 221)  # --ink, --surface

for still in sorted((ROOT / "assets" / "projects").glob("*/still-*.webp")) + sorted((ROOT / "assets" / "projects").glob("*/poster.webp")):
    out = still.parent / "dither.png"
    if out.exists() and out.stat().st_mtime > still.stat().st_mtime:
        continue
    im = Image.open(still).convert("L")
    im.thumbnail((400, 400))                      # coarse grain: shown scaled up with pixelated rendering
    bw = im.point(lambda v: min(255, int(v * 1.08))).convert("1")   # Floyd-Steinberg is PIL's default
    pal = Image.new("P", bw.size)
    pal.putpalette([*INK, *PAPER] + [0] * 762)
    pal.paste(bw.convert("L").point(lambda v: 1 if v else 0))
    pal.save(out, optimize=True)
    print(out.relative_to(ROOT))
