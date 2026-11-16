#!/bin/sh
# Local build with the exact GitHub Pages builder image.
cd "$(dirname "$0")/.." && MSYS_NO_PATHCONV=1 docker run --rm -v "$(pwd -W)":/src -e INPUT_SOURCE=. -e INPUT_DESTINATION=./_site -e INPUT_VERBOSE=false -e INPUT_FUTURE=false -e INPUT_BUILD_REVISION=local -e GITHUB_WORKSPACE=/src -e GITHUB_REPOSITORY=Gjusev/Gjusev.github.io -e PAGES_REPO_NWO=Gjusev/Gjusev.github.io -e JEKYLL_ENV=production -e INPUT_TOKEN="$(gh auth token)" ghcr.io/actions/jekyll-build-pages:v1.0.13 2>&1 | grep -i "error\|done in"
