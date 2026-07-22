/**
 * Draft visibility.
 *
 * Draft posts are written and reviewable locally but must never be reachable
 * on the public site. They render during `npm run dev`, and on any deploy that
 * explicitly opts in with `SHOW_DRAFTS=1` (useful for a preview environment).
 * Everywhere else — including `npm run build` and production — they are hidden
 * from listings, related posts and the sitemap, and their routes return 404.
 *
 * To publish a draft: drop `draft: true` from its entry in `lib/registry.ts`
 * and remove the `if (!draftsVisible) notFound()` guard from its page.
 */
export const draftsVisible =
  process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === '1';
