---
name: "voxentity-eu"
summary: "Open DE/FR benchmark of exact spoken-entity capture (names, phones, emails, dates, addresses, codes) on synthetic speech with a simulated telephone channel. Provisional: automated QA only."
description: "Open DE/FR benchmark of exact spoken-entity capture (names, phones, emails, dates, addresses, codes) on synthetic speech with a simulated telephone channel."
language: "Python"
stars: 1
homepage: null
license: "Apache-2.0"
pushed: "2026-10-15"
topics: []
video: "/assets/projects/voxentity-eu/demo.mp4"
still: "/assets/projects/voxentity-eu/still-voxentity-eu-demo-poster.webp"
still_size: [1600, 900]
image: "/assets/projects/voxentity-eu/og.jpg"
diagram: "/assets/projects/voxentity-eu/diagram-cell_accuracy.webp"
diagram_size: [650, 538]
figures: []
---
{% raw %}
## What it is

A caller says `+33 6 05 36 23 71`. On a simulated phone line, Whisper wrote down
`+33 6 75 36 23 71`. The transcript reads fine and the phone number is still wrong.

VoxEntity-EU scores that: whether a speech system captures a dictated name, phone
number, email, date, postal address or reference code **exactly**, in German and
French, on clean audio and through a simulated telephone channel. One wrong
character fails the slot.

## Results

| system | exact slot accuracy | 95% CI |
| --- | --- | --- |
| correct written text → extractor (ceiling) | 90.8% | [87.5, 94.2] |
| Voxtral Mini 3B → extractor | 37.1% | [30.0, 43.8] |
| Whisper large-v3-turbo → extractor | 34.2% | [28.3, 40.4] |

## Try it

```bash
uv venv --python 3.11
uv pip install -r uv-core.lock -e ".[dev]"
uv run pytest -q                                   # offline test suite
uv run python scripts/run_tracks.py                # extractor tracks from frozen transcripts
uv run python scripts/score_all.py                 # scoring
uv run python scripts/release_gates.py             # run integrity + byte-identical report regeneration
```

{% endraw %}
