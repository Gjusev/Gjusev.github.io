# Gjusev.github.io

Personal portfolio. Jekyll on GitHub Pages, no build step to maintain.

- **New post:** add `_posts/YYYY-MM-DD-slug.md` (front matter: `title`, `description`), push.
- **New repo:** appears automatically under "Latest on GitHub" (public, non-fork). To feature it, add it to `_data/work.yml`.
- **Preview locally (optional):** `docker run --rm -p 4000:4000 -v "$PWD":/srv/jekyll jekyll/jekyll jekyll serve`
