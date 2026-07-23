# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Start dev server (Turbopack)
npm run build          # Production build
npm run start          # Serve the production build
npm run lint           # ESLint (flat config) over app/ and lib/
npm run test           # Jest + ts-jest
npm run test:coverage  # Jest with coverage
```

**Runtime**: Node 24 (see `.nvmrc` / `engines`). ESLint 10 will not run on Node < 20.19,
and `@testing-library/jest-dom` 7 needs Node ≥ 22 — run `nvm use` before installing.

## Architecture

**App Router** — Next.js 16 + React 19 + TypeScript, everything under `app/[locale]/`.
Rendered with **Turbopack** (`next dev --turbopack`); there is no webpack flag and no
`next-translate`. (Any older doc mentioning Pages Router, `next-translate`, `i18n.json`,
or a `--webpack` requirement is stale — the App Router migration landed in `474b44c`.)

### Content model — `lib/registry.ts`

Content is **not** Markdown files. It is a single typed registry: `lib/registry.ts` exports
a `registry: Record<string, ContentItem[]>` keyed by category (`experience`, `education`,
`posts`, `projects`, …). Each `ContentItem` carries per-locale `title`/`description` objects
(`{en, fr, de, es}`), a `date`, and category-specific fields. Helpers:

- `getSortedItems(category, locale)` — localized, published items for listings
- `draftPostIds` — slugs flagged `draft: true`, consumed by the proxy (below)

Long-form article bodies (the `/posts/<slug>` pages) are authored as TSX in
`app/[locale]/posts/<slug>/page.tsx`, one `<CodeBlock>`/section per locale.

### Internationalization — `next-intl` v4

Config lives in `lib/i18n/`:
- `routing.ts` — `defineRouting({locales: ['en','fr','de','es'], defaultLocale: 'en', localePrefix: 'as-needed'})`
- `request.ts` — `getRequestConfig` loading `locales/[locale]/common.json`; wired via
  `createNextIntlPlugin('./lib/i18n/request.ts')` in `next.config.ts`
- `navigation.ts` — locale-aware `Link`, `redirect`, `usePathname`, `useRouter`

In **server components**: `const t = await getTranslations({locale})`.
In **client components**: `const t = useTranslations()` from `next-intl`.
When adding any user-facing string, add the key to **all four** `locales/*/common.json`.

### Draft gating — `proxy.ts`

`proxy.ts` (repo root; Next 16's renamed middleware) composes next-intl's middleware with
draft blocking: requests to a `draft: true` post are rewritten so Next returns a real 404
with the correct status. Drafts are visible in `npm run dev` and when `SHOW_DRAFTS=1`, and
hidden everywhere else (see `lib/drafts.ts`).

### Styling — Paper & Ink design system

Global CSS is `styles/globals.css` (Tailwind v4, CSS-first — there is no
`tailwind.config`; the 22 KB `tailwindcss-config.js` at the root is dead). Colour is a
locked token palette in `:root` (`--bg`, `--ink`, `--ink-soft`, `--ink-muted`, `--rule`,
`--accent`, `--paper`, …), with a `@media (prefers-color-scheme: dark)` block that flips
those ten tokens for dark mode.

An `@theme inline` block exposes the tokens as Tailwind utilities. **Prefer these over
stock Tailwind colours** so components track the palette and dark mode automatically:
`text-ink` / `text-ink-soft` / `text-ink-muted`, `bg-paper` / `bg-bg-alt`, `border-rule` /
`divide-rule`, `bg-accent` / `text-accent` / `text-accent-fg` / `bg-accent-soft`. Do **not**
reintroduce `bg-gray-*` / `text-blue-*` for chrome, and do not add `dark:` variants for
these — the tokens already flip. Genuinely categorical data colours (the SkillBar/RadarChart
series, success-green, error-red) are the one exception and stay as explicit palette hues.

### Key TypeScript constraints

- Use `React.JSX.Element`, not `JSX.Element` (React 19 type change).
- `tsconfig.json` uses `moduleResolution: "bundler"`.
- Stay on TypeScript **5.x**, not 7.x — the Go-port compiler breaks `next build`'s
  type-check and `@typescript-eslint`. `renovate.json` enforces the `<7` cap; see
  `.debug/006-dependency-upgrade-2026-07-22.md`.

## Debug Documentation

Significant sessions are tracked in `.debug/NNN-description-YYYY-MM-DD.md`. When adding one:
1. Use the next sequence number.
2. Add a row to the File Index table in `.debug/README.md`.

(`.debug/*` is gitignored but the files are force-added — `git add -f` a new note.)
