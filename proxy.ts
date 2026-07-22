import createMiddleware from 'next-intl/middleware';
import {NextResponse, type NextRequest} from 'next/server';
import {draftsVisible} from './lib/drafts';
import {routing} from './lib/i18n/routing';
import {draftPostIds} from './lib/registry';

const intlMiddleware = createMiddleware(routing);

const localePrefix = new RegExp(`^/(?:${routing.locales.join('|')})(?=/|$)`);

/**
 * Draft posts must not be reachable publicly. Calling `notFound()` inside the
 * page is not enough — by the time the component throws, the streamed response
 * has already gone out with a 200, so the body says "Page not found" while the
 * status (and anything crawling it) says OK. Blocking here instead means the
 * request never reaches the route.
 *
 * Rewriting to a slug that cannot exist lets Next render its own styled 404
 * with the correct status, rather than returning a bare empty response.
 */
function isBlockedDraft(pathname: string) {
  if (draftsVisible) return false;
  const path = pathname.replace(localePrefix, '');
  return draftPostIds.some((id) => path === `/posts/${id}`);
}

export default function proxy(request: NextRequest) {
  if (isBlockedDraft(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/posts/__draft';
    return NextResponse.rewrite(url);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
