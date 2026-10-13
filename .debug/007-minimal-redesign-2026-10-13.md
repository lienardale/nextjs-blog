# Minimal redesign — single column, light/dark switch

**Date**: 2026-10-13
**Branch**: `main` (uncommitted at the time of writing)
**Spec**: `design_handoff_minimal_portfolio/README.md` (untracked design handoff)

## Summary

Replaced the editorial "Paper & Ink" layouts with a quiet single 672px column and added a
user-controlled light/dark switch. Every route, registry entry and feature stayed; only
presentation changed and the decorative effects went. `styles/globals.css` shrank from
2,084 to ~430 lines. Three bugs noted in the handoff were fixed along the way.

## Things that are not obvious from the diff

- **`data-palette` is owned by a script, not by React.** `ThemeScript` inlines
  `THEME_SCRIPT` (`lib/theme.ts`) in `<head>`; it runs before first paint. The attribute
  is deliberately absent from the layout's JSX. Switching locale remounts the
  `[locale]` root layout and React resets `<html>`'s attributes to its props, which drops
  the attribute — so `ThemeToggle` re-applies it in a layout effect on mount. Without
  that, a visitor who picked the non-OS theme loses it on every language change.
- **`ThemeScript` renders the `<script>` only for the server/hydration pass**
  (`useSyncExternalStore` with different server/client snapshots). Rendering it again on
  a client-side remount does nothing except make React warn.
- **`html` is 16px again** (it was 17px). Tailwind's scale is rem-based, so at 17px
  `max-w-2xl` was 714px and every radius/spacing utility was 6% off.
- **Unlayered vs layered CSS.** Primitives live in `@layer components` so utilities on
  the same element win; `.prose-detail` / `.prose-post` are unlayered on purpose so they
  override the utility classes still embedded in the long-form bodies
  (`mt-4`, `list-disc pl-6`, `text-accent`) without touching 17 content files.
- **`.site-column` is `content-box`**: the text column is 672px and the 20px gutters sit
  outside it, matching the prototype.
- **Locale strings are plain text.** next-intl renders the key path (dev) or the literal
  tags (prod) if `t()` meets `<em>`. `__tests__/lib/locales.test.ts` now guards key parity
  across the four files and rejects markup outside an allowlist.
- **`PageTransition`** was mounted nowhere before and its one-frame opacity toggle never
  produced a visible fade. It now only arms a CSS animation (`.route-fade`) after the
  first navigation, so the first load does not fade and streamed content does.
- **Jest picked up a stale checkout** under `.claude/worktrees/` (26 extra suites and
  duplicate-mock warnings). `jest.config.js` now ignores `/.claude/`.

## Fixes bundled in

| Issue | Fix |
|---|---|
| Posts list showed 7 / 8 min, post pages 5 / 4 | `readingMinutes` on the registry entry is the single source (5 and 4) |
| Contact form posted to `formspree.io/f/placeholder` | Mailto only: submit opens a prefilled email; the confirmation says the mail app was opened, not that the message was sent |
| DE/ES `/education/42-Paris` read "At the age of 42" | "Bei 42" / "En 42" (also DE "Gleichaltrigen" → "Mitstudierenden") |
| Location | Marseille in the header clock and the "Based in" fact; Experience cities "Paris · Marseille" |
| About totals said "10 trips · 2,723 km · 32 days" over a list of 13 | Summed from the trip list at render time (13 · 3,000 km · 34 days), formatted per locale |
| `sitemap.ts` omitted `/experience/Wiremind` and `/contact` | Added; `__tests__/lib/sitemap.test.ts` checks it against the registry and that drafts stay out |

## Removed

Components (with their tests): `CursorFollower`, `Scrapbook`, `FlipCard`, `TiltCard`,
`ProjectCardTilt`, and the previously unmounted `CategoryNav`, `Date`, `DurationBars`,
`ExpandableCard`, `LanguageSwitcher`, `Timeline`, `TripCard`, `KomootEmbed`, `RouteMap`,
`TripSummary`, `TypingText`. 82 unreferenced locale keys per file (243 → 161).

Dependencies left without an importer by those removals: `@headlessui/react`, `leaflet`,
`react-leaflet`, `@types/leaflet`, `date-fns`, `classnames` — uninstalled, along with the
leaflet jest mocks/mappers and the `ResizeObserver` polyfill that only headlessui needed.

## Left for later

- `TagPill.tsx` has no importer any more.
- `public/images/profile.jpg` is 1.7 MB and `public/covers/bea-wolf.jpg` 8 MB (both now go
  through `next/image`).
- `npm audit` reports 10 advisories again (it was 0 after the July upgrade); not looked at here.
