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
A post's reading time is `readingMinutes` on its registry entry — the single source for
both the posts list and the post page (`getReadingMinutes`).

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

### Layout — one 672px column

`app/[locale]/layout.tsx` mounts the chrome once: `TopBar` (menu with Home first, then
clock / locale buttons / `ThemeToggle`), `<main>`, `SiteFooter`, plus `ScrollProgressBar`,
`ScrollToTop` and `PageTransition` (a `.25s` fade on route change). Header, main and footer
share `.site-column` (`max-width: 672px; padding: 0 20px`). Pages do **not** render their
own footer or wide wrappers.

Pages are built from a few primitives in `styles/globals.css` — `.page-h1` (the only
display-size type, 32px), `.lede`, `.section-label`, `.row` (top rule + grid; pass
`grid-cols-[…]`), `.pill`, `.link-muted`, `.prose-detail` / `.prose-post` — and small
components: `PageHeader`, `SectionLabel`, `Breadcrumbs`, `SubTabs`, `FilterBar`.
`/skills/*` and `/about_me/*` each render `SkillsHeader` / `AboutHeader` (title + sub-tabs)
themselves; the nested layouts are passthroughs.

### Styling — tokens and the light/dark switch

Global CSS is `styles/globals.css` (Tailwind v4, CSS-first — there is no
`tailwind.config`; the 22 KB `tailwindcss-config.js` at the root is dead). Colour is a
token palette in `:root` (`--bg`, `--bg-alt`, `--ink`, `--ink-soft`, `--ink-muted`, `--rule`,
`--accent`, `--accent-fg`, `--paper`): palette `a` (Paper & Ink, light) by default and
palette `b` (Void & Sky, dark) under `:root[data-palette="b"]`.

`data-palette` is **not** in the layout's JSX. `ThemeScript` inlines a blocking script
(`lib/theme.ts`) that sets it before first paint from `localStorage['al-theme']`, falling
back to `prefers-color-scheme`; `ThemeToggle` flips it and re-applies it on mount, because
a locale switch remounts the root layout and React resets `<html>`'s attributes. Shiki and
Tailwind's `dark:` variant are keyed on the same attribute.

An `@theme inline` block exposes the tokens as Tailwind utilities. **Prefer these over
stock Tailwind colours** so components track the palette automatically:
`text-ink` / `text-ink-soft` / `text-ink-muted`, `bg-bg` / `bg-bg-alt`, `border-rule`,
`bg-accent` / `text-accent` / `text-accent-fg`. Do **not** reintroduce `bg-gray-*` /
`text-blue-*`, and do not add `dark:` variants — the tokens already flip. The only fixed
hues are `text-danger` (`#ef4444`), English on the languages map (`#22c55e`) and the white
CV iframe. Radii are stock `rounded-sm/md/lg` (4/6/8px) and `rounded-full`; no shadows.
Use arbitrary sizes (`text-[13px]`) for the design's type scale so line-height is inherited.

Locale strings are plain text rendered with `t()`; `__tests__/lib/locales.test.ts` fails on
any HTML in them (only `home.builtWith` may carry its `<link>` rich tag) and on key drift
between the four files.

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
