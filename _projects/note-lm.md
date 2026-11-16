---
name: "note-lm"
title: "note-lm"
summary: "Self-hosted research notebook: ingest PDFs, videos, YouTube and pages; transcribe in the background; chat with citations across all sources"
description: "Self-hosted research notebook: ingest PDFs, videos, YouTube and pages; transcribe in the background; chat with citations across all sources"
language: "TypeScript"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-10-01"
topics: []
video: "/assets/projects/note-lm/demo.mp4"
still: "/assets/projects/note-lm/poster.webp"
still_size: [960, 540]
image: "/assets/projects/note-lm/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

Everything runs in one installed Windows program. Your data remains on your
disk; remote AI is opt-in and requires an explicit provider connection.

## How it works

1. **Versioned evidence.** Every import is an immutable source *version*.
   Claims anchor to that version with a page (or audio time range) and the
   quoted text. Re-importing a changed document appends version 2, nothing
   is overwritten, and a deterministic scan flags claims whose quote moved
   or vanished as review proposals. The app flags changed inputs; it never
   decides your conclusion is false, and every accept/reject keeps its
   history.
2. **Everything inside one program.** A Tauri shell spawns the engine and
   talks NDJSON over stdio; background workers persist through pause,
   resume, cancel, and recover after a crash, resuming downloads from the
   partial bytes on disk. The release gates prove this by killing the
   engine mid-work and restarting it.
3. **Local-first AI, cloud strictly optional.** With zero configuration,
   chat, embeddings and transcription resolve to local llama.cpp /
   whisper.cpp. Remote providers need an explicit connection plus a key
   stored in the OS keyring, never in a file, never in logs. An offline
   mode blocks remote calls at call time; local calls are never blocked.
4. **Portable research packages.** Export a notebook as a hash-verified
   package, with or without the original files, and restore it anywhere.
   Claims, versions, review proposals and calculations ride along.
5. **Reproducible calculations.** Ask for a sum over a CSV and the engine
   parses the sheet with strict validation and computes it
   deterministically. An LLM never does arithmetic here, and a file that
   isn't a clean sheet gets a typed error, not a guess.

## Results

| 1. Bring the source in | 2. Save the evidence | 3. Review what changed |
| --- | --- | --- |
| Import PDFs, pages, CSV tables, audio, or video. | Select a passage and save a claim pinned to its source version. | Re-importing creates review proposals; the original claim remains traceable. |
| Local storage, local search, local models by default. | Open every citation back in the reader. | Compare claims and sources in the evidence matrix. |

{% endraw %}
