---
name: "folio"
title: "folio"
summary: "Self-hosted scientific LaTeX editor"
description: "Self-hosted scientific LaTeX editor. An open-source project by Youssef, AI product engineer in Siegen."
language: "TypeScript"
stars: 3
homepage: "https://folio.mokka-agentur.de"
license: "Apache-2.0"
pushed: "2026-11-09"
topics: []
video: "/assets/projects/folio/demo.mp4"
still: "/assets/projects/folio/still-readme-promo.webp"
still_size: [720, 406]
image: "/assets/projects/folio/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

**The LaTeX editor you can audit.** Write scientific papers with AI on your
own server: an assistant that knows your whole paper, a drafting agent that
cites only what exists, a reviewer that quotes your own lines, and every
change as a diff you apply.

**Write scientific papers with AI you can audit, on your own server.** Folio is
the open alternative to OpenAI's Prism: an assistant that knows your whole
paper, a drafting agent that brings real literature as evidence, a reviewer
that quotes your own text, compile errors fixed as patches, whiteboard photos
turned into LaTeX, with co-authors in the same project. LaTeX is the format;
the product is the writing loop, from the first literature search to the arXiv
package.

## Results

|                           Editor + compiled PDF                           |                                  Literature explorer                                   |
| :-----------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
|  |  |
|                            **Project library**                            |                                   **AI review mode**                                   |
|          |        |

## Try it

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

docker compose -f docker-compose.release.yml up -d
# → http://127.0.0.1:3000   (migrations run on start-up)
```

{% endraw %}
