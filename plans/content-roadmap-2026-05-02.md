# Content roadmap — beef up Posts, Hobbies, Projects

Drafted 2026-05-02 to seed a future session that focuses on **content**
(not visual design). Visual redesign already shipped; what's missing is
real, recent material in the long-tail surfaces. Pick this up with fresh
context — read the items below, gather the inputs, and ship the changes.

## Context to bring into the session

Read these before touching anything:
- [README.md](../README.md) for overall site purpose
- [CLAUDE.md](../CLAUDE.md) — the worktree-level guidance (note the App
  Router + next-intl + Turbopack reality)
- [lib/registry.ts](../lib/registry.ts) — content metadata
- [app/[locale]/experience/page.tsx](../app/[locale]/experience/page.tsx)
  — most recent layout reference
- [app/[locale]/posts/page.tsx](../app/[locale]/posts/page.tsx)
- [app/[locale]/about_me/page.tsx](../app/[locale]/about_me/page.tsx)
  (scrapbook + trips + bikes + novels)
- [app/[locale]/hobbies/biking/page.tsx](../app/[locale]/hobbies/biking/page.tsx)

Inputs you'll need from Alexandre:
- **GitHub username**: `lienardale` — list public repos, pick the
  meaningful ones, write 1–2 of them up properly. Likely candidates from
  what's already referenced: `ft_transcendence`, `webserv`, `mini_rt`,
  `minishell`, `nextjs-blog`. Anything new since 2022 should also surface.
- **GitLab username**: not yet on the site. Ask Alexandre to share his
  GitLab handle (or whatever org/project URLs he wants public). Wiremind
  work is on a private GitLab — only mention what's shareable.
- **Komoot user id** is `1617431265877` — already linked. Trip data is
  hard-coded in `hobbies/biking/page.tsx`; refresh from the live Komoot
  log to pick up any 2025 / 2026 trips.

## What's stale right now

### Posts (`/posts`)
The 5 entries in `lib/registry.ts > posts[]` are the same generic
Next.js / TypeScript / i18n essays the page started with. None of them
came out of Alexandre's actual Wiremind work. The home `selected_lede`
bills the "Selected work" as "things I've shipped" — that's true for the
42 projects but the engineering writing should reflect his real day job.

**Add these as new posts** (each gets a new directory under
`app/[locale]/posts/<slug>/page.tsx` — see the existing posts for the
shape):
- *Decoupling a critical part of a monolith into a microservice* —
  schema split, contract design, dual-write migration, cutover. Cite
  Wiremind / Cayzn at a high level only (NDA-safe). 8–10 min.
- *Reworking a deploy process for a whole team* — going from
  ad-hoc CLIs to a shared GitLab-CI workflow. What broke, what you
  measured, what changed. 5–7 min.
- *Memory tests with memlab* — what they actually catch, what they
  don't, where they belong in CI. 5 min.
- *Working with AI-augmented dev tools (Claude Code, GPT Codex)* — your
  honest take after a year of daily use. The skills bar shows it as 78;
  the post should justify the score. 7–9 min.
- *Recruiting and onboarding interns at a scale-up* — what worked,
  what you'd do differently. 5 min. (Optional — only if Alexandre wants
  this hat publicly visible.)

Update [`locales/{en,fr,de,es}/common.json`](../locales/en/common.json)
`posts.title_*` keys for each new slug, plus topic / read-time keys.
Bump `posts.summary` to reflect the new count.

**Drop or de-feature stale generic posts.** `ssg-ssr` and
`pre-rendering` are 2020 entries about Next.js Pages Router. They look
out of place next to 2026 App Router posts. Either:
- archive them (keep at /posts/<slug> but drop from the listing), or
- delete them entirely and reduce `posts.results` count.
Recommend archive — old links shouldn't 404.

### Selected work (home `selected` block)
The four 42 projects are still linked. Keep them but add 1 or 2 newer
solo / open-source projects from GitHub that Alexandre actually wants on
the front page (e.g. this site itself, anything in `lienardale/*` shipped
since 2023). Update `home.sel_NN_*` keys and the `selected` constant in
[`app/[locale]/page.tsx`](../app/[locale]/page.tsx).

### About / scrapbook stickers
Currently hardcoded in [`app/[locale]/about_me/page.tsx`](../app/[locale]/about_me/page.tsx).
Refresh:
- `Riding log` sticker — refresh trip count + km + days from Komoot.
- `Bikes` stamp — confirm still 2 bikes (Motobecane single-speed +
  Kona Rove). If a third joined, add it.
- `Languages` fact — confirm "FR native · EN fluent". Ask Alexandre if
  DE / ES should be listed at lower level (he obviously reads them — the
  site is translated — but speaking is different).
- `cycling enjoyer` sticker — could also become a stamp pulling from
  the Komoot log (e.g. "X km in 2025").

### Trips (`/hobbies/biking`)
Trip data array in `app/[locale]/hobbies/biking/page.tsx` stops in 2024.
Pull any new 2025 / 2026 tours from Komoot user 1617431265877 and add
them. Don't manually transcribe — use the Komoot tour ID and let
`KomootEmbed` render it. Update the trips meta on About too:
`trips_label_trips`, `_km`, `_days` reflect the latest counts.

### Graphic novels (`/hobbies/graphic-novels` + About `novels-shelf`)
Hardcoded list of 6 spines. Confirm the list is still current — ask
Alexandre. Particularly:
- Is *Asterios Polyp* still on his shelf, or has something else taken
  its place?
- The "I chronicle them *(sometimes)*" lede in `about.novels_lede`
  hints at chronicle posts. If those exist, link to them; if not, drop
  that beat from the lede.

### Podcasts (`/hobbies/podcasts`)
Three podcasts hardcoded: Studio 404 (ended), Floodcast, Un podcast à soi.
Ask Alexandre if his rotation has changed. If so, update both the
`/podcasts` page and the home `now_listening_v` key.

### Now-playing (home strip)
Just updated `now_reading_v` and `now_learning_v` (May 2026). These will
go stale fast. Two options:
1. Set up a recurring agent (`/schedule`) to ping Alexandre monthly:
   "still reading X? still learning Y?" and offer to update the keys.
2. Pull from a small JSON file under `content/now.json` so updates are
   one-line and don't need a code change. Future maintainer's call.

## Skills — known gaps

The hard skills list in
[`app/[locale]/skills/page.tsx`](../app/[locale]/skills/page.tsx) was
just refreshed (May 2026):
- TypeScript 92, Python 88, Angular 86, Postgres 80, Elasticsearch 70,
  AI-augmented dev 78, Docker 68.

Things still **not** represented that probably should be, depending on
how Alexandre wants to position himself:
- **Redis / RabbitMQ** — daily Wiremind tools, currently invisible.
- **Keycloak / OAuth / OIDC** — also daily, also invisible.
- **Flask** — listed in the Wiremind detail body but not on the radar.
  Could fold into the Python score, or split out.
- **GitLab CI** — DevOps tier. Could replace or sit alongside Docker.
- **Observability stack** (Kibana, Grafana, PagerDuty) — collectively
  worth one entry called "Observability" or "Monitoring".

The radar is sized for 7 axes; pushing past 8 starts to look crowded.
Recommend: keep 7. Ask Alexandre to pick which 7 best represent him
*today* (not what he's done historically) — and write a short
`hard_lede` paragraph explaining why those seven and not others.

Soft skills look stable, no changes needed.

## How to run the session

1. Pull fresh context — read this file, the registry, the EN locale
   (English first), and the existing `/posts` and `/hobbies/biking`
   pages.
2. Ask Alexandre for: GitLab handle (or list of public projects worth
   featuring), updated podcast / book list, current bike count,
   confirmation on the language fluency claim.
3. Pull live Komoot trip data (2025–2026) and refresh
   `hobbies/biking/page.tsx` + the About `Riding log` sticker.
4. Draft 1–2 posts from the bullet list above. Use the existing post
   detail shape (`PostDetail` wrapper). Add to `lib/registry.ts > posts`
   with appropriate `tags` for the topic-filter pill.
5. Update `posts.summary` and `posts.results` counts to match.
6. Update FR / DE / ES locales for any new post titles. Use the same
   register the existing entries use.
7. Run `npm test`, `npm run lint`, `npm run build`. All four locales
   should render the new posts.
8. Open a focused PR — *content refresh, not visual change*. Reviewer
   should be able to approve in 5 min.

## Out of scope (don't drift into these)

- Visual redesign or new components — already done.
- Translating decorative display copy in FR/DE/ES — that's a separate
  language-quality pass.
- Adding a CMS or pulling content from an API — keep it as TSX +
  Markdown for now. The site is a portfolio, not a publishing platform.
- Building a tagging UI or filter for the posts page beyond what
  already exists — premature until there are >10 posts.
