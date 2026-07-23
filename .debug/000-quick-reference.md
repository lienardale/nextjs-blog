# Quick Reference — Next.js 16 Blog

**Last Updated**: 2026-07-23

## 🚀 Quick Start

```bash
nvm use            # Node 24 (required — see below)
npm install
npm run dev        # Turbopack dev server
npm run build      # production build
npm run start      # serve production build
npm run lint       # ESLint 10 flat config
npm run test       # Jest + ts-jest
```

## ⚠️ Must-Know

1. **App Router + next-intl + Turbopack.** Everything is under `app/[locale]/`. The dev
   script is `next dev --turbopack`. There is no Pages Router, no `next-translate`, and no
   `--webpack` flag. Any older note claiming otherwise predates the `474b44c` migration.
2. **Node 24.** ESLint 10 crashes on Node < 20.19 (`util.styleText is not a function`) and
   `@testing-library/jest-dom` 7 needs Node ≥ 22. `nvm use` reads `.nvmrc` (= 24).
3. **TypeScript 5.x, never 7.x.** The Go-port compiler ships no compiler API and breaks
   `next build` + `@typescript-eslint`. `renovate.json` caps it at `<7`.
4. **React 19 types** — `React.JSX.Element`, not `JSX.Element`.
5. **Four locales** — en, fr, de, es. Add every user-facing string to all four
   `locales/*/common.json`.
6. **Style with palette tokens**, not stock Tailwind greys/blues — see Styling below.

## 📁 File Organization

```
nextjs-blog/
├── app/[locale]/           # App Router — pages + components/
│   ├── components/         # ~40 React components (CodeBlock, TripCard, …)
│   ├── posts/<slug>/       # article bodies authored as TSX, per locale
│   ├── layout.tsx, page.tsx
│   ├── sitemap.ts, robots.ts
├── lib/
│   ├── registry.ts         # THE content model (typed, per-locale) — not markdown
│   ├── drafts.ts           # draftsVisible flag
│   ├── draft-post-meta.ts  # draft listing strings (kept out of locale bundles)
│   └── i18n/               # routing.ts, request.ts, navigation.ts (next-intl v4)
├── locales/{en,fr,de,es}/common.json
├── styles/globals.css      # Paper & Ink tokens + dark mode + shiki mapping
├── proxy.ts                # next-intl middleware + draft 404 gating
├── next.config.ts          # createNextIntlPlugin('./lib/i18n/request.ts')
└── .debug/                 # these docs (gitignored; force-added)
```

## 🌍 Translations

```tsx
// Server component
import {getTranslations} from 'next-intl/server';
const t = await getTranslations({locale});

// Client component
import {useTranslations} from 'next-intl';
const t = useTranslations();

<h1>{t('some.key')}</h1>   // add `some.key` to all four common.json files
```

## 🧭 Content

Content lives in `lib/registry.ts` — a typed `registry: Record<category, ContentItem[]>`
with per-locale `title`/`description` objects. Use `getSortedItems(category, locale)` for
listings. Draft posts (`draft: true`) are collected into `draftPostIds` and 404'd by
`proxy.ts` unless `draftsVisible` (dev, or `SHOW_DRAFTS=1`).

## 🎨 Styling — Paper & Ink

`styles/globals.css` (Tailwind v4, CSS-first — no `tailwind.config`; root
`tailwindcss-config.js` is dead). Ten colour tokens in `:root` flip in a
`@media (prefers-color-scheme: dark)` block. An `@theme inline` block exposes them as
utilities — **use these, not stock Tailwind colours**:

| Use | Token utility |
|-----|---------------|
| Body / strong text | `text-ink` |
| Secondary text | `text-ink-soft` |
| Muted / meta | `text-ink-muted` |
| Card surface | `bg-paper` |
| Subtle fill / track | `bg-bg-alt` |
| Hairlines | `border-rule` / `divide-rule` |
| Brand / links / CTAs | `text-accent` / `bg-accent` / `text-accent-fg` |
| Soft accent chip | `bg-accent-soft` |

No `dark:` variants for these (they flip already). Code blocks: `CodeBlock.tsx` uses shiki
with `defaultColor: false`; `globals.css` maps `--shiki-light` / `--shiki-dark`. Categorical
data colours (SkillBar/RadarChart series, success-green, error-red) intentionally stay as
explicit palette hues.

## 📊 Project Status (2026-07-23)

| Package | Version |
|---------|---------|
| Next.js | 16.2.x |
| React | 19.2.x |
| next-intl | 4.13.x |
| TypeScript | 5.9.x (capped `<7`) |
| ESLint | 10.x (flat config) |
| Tailwind | 4.3.x |
| Node | 24 (Active LTS) |

## 🎯 Adding a Debug File

Pattern `NNN-description-YYYY-MM-DD.md`. Create it, add a row to `.debug/README.md`, then
`git add -f` it (`.debug/*` is gitignored but the notes are tracked).
