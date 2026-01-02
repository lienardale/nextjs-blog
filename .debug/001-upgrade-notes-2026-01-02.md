# Next.js 16 Upgrade Notes

## Upgrade Summary
Successfully upgraded from Next.js 14.2.24 to Next.js 16.1.1 (January 2, 2026)

## Version Changes

### Core Dependencies
- **Next.js**: `^14.2.24` → `^16.1.1`
- **React**: `18.2.0` → `^19.2.3`
- **React DOM**: `18.2.0` → `^19.2.3`

### Development Dependencies
- **@types/react**: `^18.2.55` → `^19.0.0`
- **@types/react-dom**: Added `^19.0.0`

## Code Changes Made

### 1. TypeScript Configuration (`tsconfig.json`)
Updated to support Next.js 16 and React 19:
- Changed `target` from `"es5"` to `"ES2017"` (better performance)
- Changed `moduleResolution` from `"node"` to `"bundler"` (required for Next.js 16)
- Added Next.js TypeScript plugin configuration
- Added `.next/types/**/*.ts` to includes for better type support

### 2. Next.js Configuration (`next.config.js`)
- Added `turbopack: {}` configuration to explicitly enable Turbopack (default in Next.js 16)
- Kept existing webpack configuration for backwards compatibility
- This resolves the build warning about webpack config

### 3. Package.json Scripts (CRITICAL FIX)
**Important**: Added `--webpack` flag to dev and build scripts to fix i18n translations:
```json
"dev": "next dev --webpack",
"build": "next build --webpack"
```
**Reason**: The `next-translate-plugin` package currently only works with webpack, not Turbopack. This ensures translations load correctly until `next-translate` adds full Turbopack support.

### 4. Document Component (`pages/_document.tsx`)
- Added `lang="en"` attribute to `<Html>` component (best practice for accessibility and SEO)

### 5. Date Component (`components/date.tsx`)
- Changed return type from `JSX.Element` to `React.JSX.Element` (required for React 19)
- This is a breaking change in React 19's type system

## Breaking Changes in Next.js 16

### Turbopack is Now Default
- Next.js 16 uses Turbopack by default instead of webpack
- Faster builds and hot module replacement
- Better compatibility with modern JavaScript features

### React 19 Compatibility
- React 19 introduces new type system changes
- `JSX.Element` namespace moved to `React.JSX.Element`
- Better type inference and error messages

### TypeScript Configuration
- `moduleResolution: "bundler"` is now required
- Better alignment with modern bundlers

## Testing Performed

1. ✅ **Build Test**: `npm run build` completed successfully
2. ✅ **Development Server**: `npm run dev` starts without errors
3. ✅ **Type Checking**: TypeScript compilation successful
4. ✅ **Static Generation**: All pages generate correctly:
   - Home page (/)
   - Dynamic routes (/about_me/[id], /education/[id], /experience/[id], etc.)
   - API routes working
   - Multi-language support intact (en, fr, de, es)

## Known Warnings

### Multiple Lockfiles Warning
```
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
```

**Resolution Options:**
1. Add `outputFileTracingRoot` to `next.config.js`:
   ```js
   outputFileTracingRoot: '/Users/alienard/Code/nextjs-blog'
   ```
2. Or remove the extra lockfile at `/Users/alienard/Code/pnpm-lock.yaml` if not needed

This warning doesn't affect functionality but can be silenced with the above configuration.

### I18n Translation Issue (RESOLVED)

**Issue**: After upgrading to Next.js 16, translations were not working. Keys like `categ0`, `metaTitle`, etc. were appearing as literal strings instead of their translated values (e.g., "Expérience", "alienard 🥖").

**Root Cause**: Next.js 16 uses Turbopack by default, but `next-translate-plugin` (v2.6.2) only supports webpack configuration.

**Solution**: Force webpack mode by adding `--webpack` flag to npm scripts:
```json
"dev": "next dev --webpack",
"build": "next build --webpack"
```

**Future**: When `next-translate` adds full Turbopack support, the `--webpack` flag can be removed to take advantage of Turbopack's faster build times.

## Recommendations

### 1. Update Browserslist Data
Run this command to update browser compatibility data:
```bash
npx update-browserslist-db@latest
```

### 2. Address Security Vulnerabilities
Review and fix the reported vulnerabilities:
```bash
npm audit
npm audit fix
```

### 3. Consider Strict Mode
Enable TypeScript strict mode in `tsconfig.json` for better type safety:
```json
"strict": true
```

### 4. Test All Features
- Test all dynamic routes
- Verify all translations work correctly
- Test form submissions (if any)
- Verify image optimization
- Test API endpoints

## Additional Notes

### Performance Improvements
- Turbopack provides faster development builds
- React 19 includes performance optimizations
- Server Components support improved (though this project uses Pages Router)

### Future Considerations
- Consider migrating to App Router for better performance (Next.js 13+ feature)
- Evaluate using React Server Components
- Consider implementing Partial Prerendering (Next.js 14+ feature)

## Rollback Instructions

If you need to rollback to the previous version:

1. Restore package.json versions:
   ```bash
   npm install next@14.2.24 react@18.2.0 react-dom@18.2.0
   npm install -D @types/react@18.2.55
   ```

2. Revert TypeScript configuration changes in `tsconfig.json`

3. Revert Next.js configuration changes in `next.config.js`

4. Revert component changes (`components/date.tsx`, `pages/_document.tsx`)

## Support Resources

- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [Next.js Turbopack Documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack)
- [Next.js Migration Guide](https://nextjs.org/docs/pages/building-your-application/upgrading)

---

**Upgrade completed successfully on:** January 2, 2026
**Upgraded by:** GitHub Copilot
**Status:** ✅ All tests passing
