"""Build one page per project from its own GitHub repo.

For every repo in PICKS: download the chosen media (compressed), read the README and lift
its intro, how-it-works, first results table and install snippet into _projects/<name>.md.
Re-run whenever a repo changes:  python scripts/sync_projects.py [name ...]
Needs: gh (authenticated), ffmpeg, Pillow.
"""
import json, os, re, subprocess, sys, tempfile, urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_MD = ROOT / "_projects"
OUT_MEDIA = ROOT / "assets" / "projects"
USER = "Gjusev"

# video: demo clip · img: still / poster · diagram: how it works · more: extra figures
PICKS = {
  "forecast-arena": dict(video="assets/video/forecast-arena.mp4", img="assets/brand/banner.png", diagram="assets/charts/accuracy_day_ahead_price_h1.png"),
  "voice-evals": dict(video="docs/assets/voice-evals-demo.mp4", img="docs/assets/social/github-social-preview.jpg", diagram="docs/assets/evaluation-flow.svg"),
  "laya-triage": dict(img="docs/assets/social-preview.png"),
  "treeseek": dict(video="assets/treeseek.mp4", diagram="assets/treeseek-descent.png", more=["assets/treeseek-results.png"]),
  "zerocall": dict(video="assets/zerocall.mp4", diagram="assets/zerocall-flow.png", more=["assets/zerocall-results.png"]),
  "trust-but-verify": dict(video="assets/trust-but-verify.mp4", diagram="assets/tbv-arms.png", more=["assets/tbv-results.png"]),
  "gate-calibrated": dict(video="assets/video/gate-calibrated.mp4", img="assets/video/poster.jpg", diagram="results/curve.png"),
  "MK-SH-V": dict(video="assets/mkshv-film.mp4", img="assets/hf-cover.png", more=["demo/examples/cord-receipt-1.png"]),
  "nitelos": dict(img="videos/nitelos-launch/stills/nitelos-social-card.png", diagram="videos/nitelos-launch/stills/nitelos-workflow-poster.jpg"),
  "voxentity-eu": dict(video="docs/media/voxentity-eu-demo.mp4", img="docs/media/voxentity-eu-demo-poster.jpg", diagram="docs/launch/assets/cell_accuracy.png"),
  "folio": dict(video="public/landing/promo/compile.mp4", img="docs/brand/social-preview.png"),
  "note-lm": dict(video="docs/screenshots/note-lm-launch.mp4", img="docs/design/brand/previews/social-preview-1280x640.png"),
  "laya-compactor": dict(video="docs/launch/brag.mp4", img="docs/social-preview.png", diagram="docs/eval-summary.svg"),
  "laya-phishield": dict(img="docs/assets/social-preview.png", diagram="docs/assets/how-it-works-phish.png"),
  "laya-router": dict(img="assets/social-preview-art.png", diagram="assets/how-it-works.svg"),
  "clef-router": dict(img="assets/social-preview-art.png", diagram="docs/how-it-works.svg"),
  "clef-evals": dict(img="assets/social-preview-v2.png", diagram="docs/pipeline.svg"),
  "clef-compactor": dict(video="docs/brag.mp4", img="assets/social-preview-v2.png"),
  "laya-evals": dict(video="docs/brag.mp4", img="docs/assets/social-preview.jpg", diagram="docs/pipeline.svg"),
  "hard-mode": dict(img="assets/social-preview.jpg", more=["assets/report-gallery.png"]),
  "skill-issue": dict(img="assets/social-preview.jpg"),
  "i-didnt-write-this": dict(img="assets/social-preview.jpg"),
  "vision-input-check": dict(img="docs/assets/social-preview.jpg"),
  "locale-invoice-check": dict(img="docs/assets/social-preview.jpg"),
  "redaction-ci": dict(img="docs/banner.png"),
  "heizpro-ki": dict(video="docs/brag.mp4", img="dashboard-preview.png", more=["simulator-preview.png"]),
  "nexary-platform": dict(video="docs/screenshots/brag.mp4", img="marketing/public/images/feature_chat_mockup_light.png"),
  "somatriq": dict(video="docs/brand/screenshots/brag.mp4", img="docs/brand/screenshots/dashboard-desktop.png"),
  "studio-command-center": dict(video="docs/screenshots/brag.mp4", img="docs/screenshots/dashboard.png", more=["docs/screenshots/machines.png"]),
  "maqrivo": dict(video="docs/screenshots/brag.mp4", img="docs/screenshots/planner.png"),
  "decision-gate": dict(video="assets/video/decision-gate.mp4", poster_at=7),
  "routed-memory": dict(video="assets/video/routed-memory.mp4", poster_at=7),
  "agency-bench": dict(video="assets/video/agency-bench.mp4", poster_at=7),
  "compact-bench": dict(video="assets/video/compact-bench.mp4", poster_at=7),
  "wikitrace-repro": dict(video="assets/video/wikitrace-repro.mp4", poster_at=7),
  "somem-repro": dict(video="assets/video/somem-repro.mp4", poster_at=7),
  "xrechnung-bench": dict(video="assets/video/xrechnung-bench.mp4", poster_at=7),
  "reliagate": dict(video="assets/video/reliagate.mp4", poster_at=7),
  "falschinfo-radar": dict(video="docs/screenshots/brag.mp4", img="docs/screenshots/radar-dashboard.png"),
}


def gh(path):
    r = subprocess.run(["gh", "api", path], capture_output=True, text=True, encoding="utf8")
    return json.loads(r.stdout) if r.returncode == 0 else None


def fetch(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": "portfolio-sync"})
    with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
        f.write(r.read())


def media(name, branch, path, kind):
    """Download one file and store a web-sized copy. Returns the site path or None."""
    if not path:
        return None
    out_dir = OUT_MEDIA / name
    out_dir.mkdir(parents=True, exist_ok=True)
    src = f"https://raw.githubusercontent.com/{USER}/{name}/{branch}/{path}"
    stem = Path(path).stem.lower().replace(" ", "-")
    ext = ".svg" if path.endswith(".svg") else ".mp4" if path.endswith(".mp4") else ".webp"
    final = out_dir / (f"{kind}.mp4" if ext == ".mp4" else f"{kind}-{stem}{ext}")
    if final.exists() and not os.environ.get("FORCE"):
        return "/" + final.relative_to(ROOT).as_posix()
    with tempfile.TemporaryDirectory() as tmp:
        raw = Path(tmp) / Path(path).name
        try:
            fetch(src, raw)
        except Exception as e:
            print(f"  ! {name}: {path} ({e})")
            return None
        if path.endswith(".svg"):
            dest = out_dir / f"{kind}-{stem}.svg"
            dest.write_bytes(raw.read_bytes())
        elif path.endswith(".mp4"):
            dest = out_dir / f"{kind}.mp4"
            # ponytail: first 16 s, 960 px, no audio; enough for a looping demo
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-t", "16", "-an", "-vf", "scale='min(960,iw)':-2",
                            "-c:v", "libx264", "-crf", "31", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(dest)], check=True)
            poster = out_dir / "poster.webp"
            if not poster.exists():
                subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(PICKS.get(name, {}).get("poster_at", 3)), "-i", str(dest), "-frames:v", "1", str(out_dir / "poster.png")], check=True)
                Image.open(out_dir / "poster.png").convert("RGB").save(poster, quality=80)
                (out_dir / "poster.png").unlink()
        else:
            dest = out_dir / f"{kind}-{stem}.webp"
            im = Image.open(raw)
            im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
            im.thumbnail((1600, 1600))
            im.save(dest, quality=82)
    return "/" + dest.relative_to(ROOT).as_posix()


def og_card(name, still):
    """A 1200x630 JPG for link previews (LinkedIn does not show WebP)."""
    if not still or still.endswith(".svg"):
        return "/assets/og.png"
    dest = OUT_MEDIA / name / "og.jpg"
    im = Image.open(ROOT / still.lstrip("/")).convert("RGB")
    W, H, PAD = 1200, 630, 48
    k = min((W - 2 * PAD) / im.width, (H - 2 * PAD) / im.height)
    im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    card = Image.new("RGB", (W, H), (243, 243, 246))
    card.paste(im, ((W - im.width) // 2, (H - im.height) // 2))
    card.save(dest, quality=84)
    return "/" + dest.relative_to(ROOT).as_posix()


def size_of(site_path):
    if not site_path or site_path.endswith((".svg", ".mp4")):
        return None
    w, h = Image.open(ROOT / site_path.lstrip("/")).size
    return [w, h]


BADGE = re.compile(r"^\s*(<|!\[|\[!\[|\[\]|---|\*\*\*|<!--)")


def blocks(md):
    """Split markdown into (heading, paragraphs) sections, keeping fenced code intact."""
    sections, head, buf, para, fence = [], "", [], [], False
    for line in md.splitlines():
        if line.strip().startswith("```"):
            fence = not fence
            para.append(line)
            continue
        if not fence and re.match(r"^#{1,6} ", line):
            if para: buf.append("\n".join(para)); para = []
            sections.append((head, buf)); head, buf = line.lstrip("#").strip(), []
            continue
        if not fence and not line.strip():
            if para: buf.append("\n".join(para)); para = []
            continue
        para.append(line)
    if para: buf.append("\n".join(para))
    sections.append((head, buf))
    return sections


def clean(p):
    p = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", p)               # images
    p = re.sub(r"<[^>]+>", "", p)                             # inline html
    p = re.sub(r"\]\((?!https?://|#)([^)]+)\)", lambda m: f"](https://github.com/{USER}/{CUR}/blob/HEAD/{m.group(1)})", p)
    p = re.sub(r"\[\]\([^)]*\)", "", p)                       # links left empty by a removed image
    return dedash(p).strip()


def dedash(t):
    """No em/en dashes in visible copy: a dash after a bold lead becomes a colon, otherwise a comma."""
    if not t:
        return t
    t = re.sub(r"(\*\*[^*]+\*\*)\s*(?:—|–|--)\s*", r"\1: ", t)
    t = re.sub(r"(\d)\s*[–—]\s*(\d)", r"\1 to \2", t)
    t = re.sub(r"\s*(?:—|–| -- )\s*", ", ", t)
    return t


SEEN = set()


def unseen(p):
    """Drop sentences the page has already said once."""
    if p.lstrip().startswith(("-", "*", "1.", "|", "```")):
        return p
    out = []
    for sen in re.split(r"(?<=[.!?])\s+", p):
        key = re.sub(r"\W+", " ", sen).strip().lower()
        if len(key) > 25 and key in SEEN:
            continue
        SEEN.add(key); out.append(sen)
    return " ".join(out)


def prose(p):
    if re.fullmatch(r"\s*https?://\S+\s*", p):  # bare attachment links render as nothing
        return False
    return p and not BADGE.match(p) and not p.startswith(("|", "```", ">", "    ")) and len(re.sub(r"\W", "", p)) > 40


def extract(md):
    secs = blocks(md)
    intro, how, table, code = [], [], None, None
    for i, (h, ps) in enumerate(secs):
        for p in ps:
            if table is None and p.startswith("|") and p.count("\n") >= 2:
                table = "\n".join(clean(l) for l in p.splitlines()[:14])
            if code is None and p.startswith("```") and re.search(r"pip install|npm i|npx |uvx? |docker |git clone|pipx", p):
                code = p if p.rstrip().endswith("```") else p + "\n```"
        if i <= 1 and not intro:
            intro = [clean(p) for p in ps if prose(p)][:2]
        if not how and re.search(r"how it works|how|architecture|method|what it does|why", h, re.I):
            how = [clean(p) for p in ps if prose(p) or re.match(r"^\s*([-*]|\d+\.) ", p)][:3]
    if not intro:
        for h, ps in secs:
            intro = [clean(p) for p in ps if prose(p)][:2]
            if intro: break
    SEEN.clear()
    intro = [x for x in (unseen(p) for p in intro) if x.strip()]
    how = [x for x in (unseen(p) for p in how) if x.strip()]
    return intro, how, table, code


def seo(text, fallback=""):
    """A meta description of 50 to 160 characters."""
    t = re.sub(r"\s+", " ", text or fallback or "").strip()
    if len(t) > 158:
        cut = t[:158]
        end = max(cut.rfind(". "), cut.rfind("! "), cut.rfind("? "))
        t = cut[:end + 1] if end > 60 else cut[:cut.rfind(" ")].rstrip(",;:") + "."
    if len(t) < 50:
        t = f"{t.rstrip('.')}. One of my open-source projects on AI evaluation and tooling."
    return t


def yq(s):
    return json.dumps(s, ensure_ascii=False)


def main(names):
    global CUR, OWN
    import yaml
    data = yaml.safe_load((ROOT / "_data" / "projects.yml").read_text(encoding="utf8"))
    OWN = {it["name"]: it["desc"] for g in data["groups"] for it in g["items"]}
    OUT_MD.mkdir(exist_ok=True)
    for name in names:
        CUR = name
        meta = gh(f"repos/{USER}/{name}")
        if not meta:
            print(f"skip {name}: not found"); continue
        br = meta["default_branch"]
        pick = PICKS.get(name, {})
        print(f"- {name}")
        v = media(name, br, pick.get("video"), "demo")
        img = media(name, br, pick.get("img"), "still") or (f"/assets/projects/{name}/poster.webp" if v else None)
        dia = media(name, br, pick.get("diagram"), "diagram")
        more = [m for m in (media(name, br, p, "figure") for p in pick.get("more", [])) if m]
        readme = gh(f"repos/{USER}/{name}/readme")
        md = ""
        if readme:
            import base64
            md = base64.b64decode(readme["content"]).decode("utf8", "replace").lstrip("﻿")
        intro, how, table, code = extract(md)
        summary = dedash(meta.get("description") or "") or OWN.get(name, "")
        fm = {
            "name": name, "title": name, "summary": summary, "description": seo(summary, OWN.get(name)), "language": meta.get("language"),
            "stars": meta.get("stargazers_count", 0), "homepage": meta.get("homepage") or None,
            "license": (meta.get("license") or {}).get("spdx_id"), "pushed": meta["pushed_at"][:10],
            "topics": meta.get("topics", [])[:6], "video": v, "still": img, "still_size": size_of(img), "image": og_card(name, img),
            "diagram": dia, "diagram_size": size_of(dia), "figures": [{"src": m, "size": size_of(m)} for m in more],
        }
        lines = ["---"] + [f"{k}: {yq(val)}" for k, val in fm.items()] + ["---", "{% raw %}"]
        if intro: lines += ["## What it is", ""] + [p + "\n" for p in intro]
        if how: lines += ["## How it works", ""] + [p + "\n" for p in how]
        if table: lines += ["## Results", "", table, ""]
        if code: lines += ["## Try it", "", code, ""]
        lines += ["{% endraw %}", ""]
        (OUT_MD / f"{name}.md").write_text("\n".join(lines), encoding="utf8")


if __name__ == "__main__":
    main(sys.argv[1:] or list(PICKS))
