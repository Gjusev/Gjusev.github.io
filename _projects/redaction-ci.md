---
name: "redaction-ci"
title: "redaction-ci"
summary: "GitHub Action that fails CI when a committed PDF still contains the text it pretends to have redacted. gitleaks, but for PDFs."
description: "GitHub Action that fails CI when a committed PDF still contains the text it pretends to have redacted. gitleaks, but for PDFs."
language: "Python"
stars: 0
homepage: null
license: "MIT"
pushed: "2026-11-12"
topics: ["ci", "code-quality", "github-actions", "pdf", "redaction", "security"]
video: null
still: "/assets/projects/redaction-ci/still-banner.webp"
still_size: [1280, 640]
image: "/assets/projects/redaction-ci/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

**gitleaks, but for PDFs.** A GitHub Action that fails the build the moment a
committed PDF still contains the text it pretends to have redacted.

Drawing a black rectangle over a paragraph does not remove the paragraph. The text stays in the PDF content stream, one copy-paste away for anyone
who opens the file. Redaction-CI catches that before it reaches your
repository, plus every other classic way a "redacted" PDF leaks: unapplied
redaction annotations, invisible or camouflaged text layers, text dragged
off the page, screenshots pasted over live text, filled form fields,
embedded attachments, and earlier revisions left behind by incremental
saves. Built for repositories that hold contracts, invoices, legal
filings and incident reports as PDFs.

## How it works

- **Paint order matters.** A box only "hides" text if it is drawn *after*
  the text in the content stream (`seqno` comparison). Dark panels with
  light text on top (a common, legitimate design) are not flagged, and a
  covered run that is visibly redrawn on top of the panel is suppressed
  as a benign generator quirk. Only a copy painted *on top of* the box
  counts as "visible"; a decoy drawn *under* it does not.
- **The box must be redaction-like.** Filled path, fill opacity ≥
  `min-fill-opacity` (default 0.5), perceived luminance ≤ `max-fill-luma`
  (default 0.85). White-outs are not flagged by default; raise
  `max-fill-luma` to 1.0 to include them.
- **Overlap threshold.** A box must cover at least `min-overlap`
  (default 0.5) of a text run's bounding box to count as hiding it.
- **Fail-closed.** Encrypted PDFs, unparseable files, an explicitly empty
  or negation-only `paths` input, an explicit glob that matches nothing,
  and excludes that remove every matched file all fail the step (exit 2):
  an unverifiable or empty scan is not a clean scan. Repos with no PDFs
  at all pass.

The detector uses the same primitives an attacker would (text extraction,
drawing geometry, revision recovery), so what it flags is what standard
text extractors can recover.

## Results

| File | Page | Type | Severity | Recoverable text |
| --- | --- | --- | --- | --- |
| `contracts/merger-agreement.pdf` | 1 | covered-text | confirmed | Internal key: DO-NOT-SHARE-9911 |
| `contracts/nda-draft.pdf` | 1 | unapplied-redaction | confirmed | Internal key: DO-NOT-SHARE-9911 |
| `press-release.pdf` | 1 | invisible-text | warning | Hidden copy: TOPSECRET-4455 |

## Try it

```sh
python3.12 -m venv .venv && .venv/bin/pip install -r requirements.txt pytest ruff
.venv/bin/python -m pytest tests/ -q          # unit + fixture tests
.venv/bin/python tests/make_fixtures.py       # regenerate fixtures/*.pdf
.venv/bin/ruff check .                        # lint
```

{% endraw %}
