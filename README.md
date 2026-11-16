# Gjusev.github.io

Personal site. Jekyll on GitHub Pages: push to `main` and it is live, no build step to maintain.

- **New post:** add `_posts/YYYY-MM-DD-slug.md` with `title` and `description` front matter.
- **New repo:** shows up by itself under "New on GitHub" (public, non-fork). To file it properly, add it to a group in `_data/projects.yml`.
- **Current focus / numbers:** `_data/projects.yml` → `focus`. Every number needs its `receipt` (dataset, seed, n).
- **Project pages:** `python scripts/sync_projects.py [repo ...]` pulls demo video, still, diagram, intro, results table and install snippet from each repo into `_projects/` and `assets/projects/`. Pick media per repo in `PICKS` at the top of the script.
- **Hero:** three variants (`?hero=window`, `?hero=ring`, `?hero=reel`); the choice is remembered in the browser. Default is set in `_layouts/default.html`.
- **Links:** `_data/projects.yml` → `links`.
- **Local preview:** `sh scripts/build.sh` (needs Docker; uses the same image GitHub Pages builds with), then serve `_site/`.

Type: Fraunces + Albert Sans, self-hosted (`assets/fonts`). No trackers, no third-party requests except the GitHub API call for new repos.
