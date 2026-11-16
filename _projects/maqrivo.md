---
name: "maqrivo"
description: "Personal nutrition, meal planning, grocery optimization and supermarket intelligence"
language: "TypeScript"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-09-24"
topics: []
video: "/assets/projects/maqrivo/demo.mp4"
image: "/assets/projects/maqrivo/still-planner.webp"
image_size: [1280, 800]
diagram: null
figures: []
---
{% raw %}
## What it is

A self-hosted meal planner that turns nutrition targets, pantry stock and observed supermarket prices into a weekly plan and a shopping basket. **AI proposes recipes. Deterministic code computes nutrition. CP-SAT chooses the plan.**

## How it works

A cheap meal plan is only useful when its prices correspond to something you can buy. I built Maqrivo around price provenance: source, store, quantity, observation date and promotion validity travel with the data.

**Status:** working product under active development. English and French UI. Coverage depends on available price observations; missing data is not replaced with invented prices. Screenshots show seeded demonstration data.

## Results

| Plan | Verify | Buy |
| :--- | :--- | :--- |
| Meals constrained by nutrition, budget and pantry | Recipe macros calculated from ingredient data | A basket grouped by store, with price evidence |
| Python + OR-Tools CP-SAT | Pure TypeScript domain functions | Observations, promotions and retailer adapters |

## Try it

```bash
git clone https://github.com/Gjusev/maqrivo.git
cd maqrivo
pnpm install --frozen-lockfile
cp .env.example .env
# Set SIGNUP_INVITE_CODE and a random BETTER_AUTH_SECRET in .env.
cp .env apps/web/.env.local
uv sync --directory solver
pnpm dev:deps
pnpm db:migrate
pnpm --filter @maqrivo/db seed:global
pnpm db:seed
pnpm dev
```

{% endraw %}
