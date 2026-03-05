# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (--webpack flag included automatically)
npm run build    # Production build (--webpack flag included automatically)
npm run lint     # Lint the project
```

**Critical**: Must use webpack mode — `next-translate-plugin` does not support Turbopack. The `--webpack` flag is already baked into the npm scripts; never switch to Turbopack.

## Architecture

**Pages Router** (not App Router). Next.js 16 + React 19 + TypeScript.

### Content System

All content is stored as Markdown files organized by content type and locale:

```
posts/[slug]/index.md          # English (default)
posts/[slug]/index.fr.md       # French
posts/[slug]/index.de.md       # German
posts/[slug]/index.es.md       # Spanish
```

Same pattern applies to: `experience/`, `education/`, `hobbies/`, `about_me/`, `skills/`.

Each Markdown file uses gray-matter frontmatter with at minimum `date` and `title` fields.

### Data Layer (`lib/`)

Each content type has a corresponding lib file (`posts.ts`, `exp.ts`, `educ.ts`, `hob.ts`, `info.ts`, `soft.ts`) with the same three functions:
- `getSorted*Data(locale)` — lists all items with metadata, used in `getStaticProps`
- `getAll*Ids(locales)` — generates static paths for `getStaticPaths`
- `get*Data(id, locale)` — loads and renders a single item's Markdown to HTML

The `defaultLocale` is imported from `i18n.js`. For the default locale (`en`), the file is `index.md`; for others it's `index.[locale].md`.

### Internationalization

`next-translate` is used (not `next-i18next`). Configuration in `i18n.json`:
- Supported locales: `en`, `fr`, `de`, `es` — `en` is the default
- All locales use a single namespace: `common`
- Translation files: `locales/[lang]/common.json`

In components, use `useTranslation('common')` from `next-translate/useTranslation`. When adding any user-facing string, add the translation key to all 4 locale files.

### Key TypeScript Constraint

Use `React.JSX.Element` (not `JSX.Element`) — this is required due to React 19 type changes.

`tsconfig.json` must use `moduleResolution: "bundler"`.

## Debug Documentation

Significant debugging sessions are tracked in `.debug/NNN-description-YYYY-MM-DD.md` files. When adding a new debug file:
1. Use the next available sequence number
2. Update `.debug/README.md` with a new entry in the File Index table
