---
name: "studio-command-center"
summary: "Multi-tenant fitness-studio operations: inventory, machine maintenance, staff tasks with photo proof and audit trail, Next.js 15, Better Auth, PostgreSQL"
description: "Multi-tenant fitness-studio operations: inventory, machine maintenance, staff tasks with photo proof and audit trail, Next.js 15, Better Auth, PostgreSQL"
language: "TypeScript"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-09-24"
topics: []
video: "/assets/projects/studio-command-center/demo.mp4"
still: "/assets/projects/studio-command-center/still-dashboard.webp"
still_size: [1280, 800]
image: "/assets/projects/studio-command-center/og.jpg"
diagram: null
diagram_size: null
figures: [{"src": "/assets/projects/studio-command-center/figure-machines.webp", "size": [1280, 800]}]
---
{% raw %}
## What it is

A studio operations application for inventory, equipment maintenance, staff tasks, members, classes and financial summaries. Next.js server actions connect a German-language interface to PostgreSQL and Better Auth.

## How it works

Stock shortages, broken equipment and unfinished tasks are easy to lose across chats and spreadsheets. I built a shared operational view with roles, studio-scoped records and a history of changes.

**Status:** portfolio prototype with seeded demonstration data. Studio scoping is implemented in application queries; it is not a claim of independently verified tenant isolation. Audit writes are best-effort. [Implementation boundaries →](https://github.com/Gjusev/studio-command-center/blob/HEAD/docs/architecture.md#current-boundaries)

## Results

| Stock | Equipment | Staff |
| :--- | :--- | :--- |
| Consumables, thresholds and stock movements | Machine registry, incidents and maintenance | Assignments, completion evidence and points |
| See what needs replenishing | See what needs attention | See who is responsible |

## Try it

```bash
git clone https://github.com/Gjusev/studio-command-center.git
cd studio-command-center
bun install --frozen-lockfile
cp .env.example .env
# Set DATABASE_URL to your local database and generate BETTER_AUTH_SECRET.
bun run db:migrate
bun run db:demo
bun run dev
```

{% endraw %}
