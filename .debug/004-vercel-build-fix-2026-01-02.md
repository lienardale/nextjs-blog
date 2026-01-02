# Vercel Build Fix - File System Safety

**Date**: 2026-01-02  
**Status**: Fixed  
**Severity**: High (Deployment Blocker)

## Problem

Vercel deployment was failing during static page generation with the following error:

```
Error: ENOENT: no such file or directory, open '/vercel/path0/experience/ESF-Sciences-Humaines/index.md'
```

### Root Cause

All the data-fetching library functions (`getSorted*Data()`) in the `lib/` directory were blindly attempting to read files from directories without:

1. Verifying that the item is actually a directory (not a file)
2. Checking if the required markdown file exists for the given locale

This caused issues when:
- Hidden files like `.DS_Store` were present in directories
- Temporary files were created during deployment
- Any non-directory items existed in the content folders

## Solution

Added defensive checks to all `getSorted*Data()` functions in:
- `lib/exp.ts`
- `lib/educ.ts`
- `lib/hob.ts`
- `lib/info.ts`
- `lib/soft.ts`
- `lib/posts.ts`

### Changes Applied

Modified each function to use `.filter()` before `.map()` to:

1. **Check if item is a directory**: `fs.statSync(dirPath).isDirectory()`
2. **Check if file exists**: `fs.existsSync(fullPath)`

### Example Implementation

**Before:**
```typescript
export function getSortedExpsData(locale: string) {
  const fileIds = fs.readdirSync(expDirectory);
  const allExpsData = fileIds.map((id) => {
    const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;
    const fullPath = path.join(expDirectory, id, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // ... rest of processing
  });
  // ... sorting logic
}
```

**After:**
```typescript
export function getSortedExpsData(locale: string) {
  const fileIds = fs.readdirSync(expDirectory);
  const allExpsData = fileIds
    .filter((id) => {
      // Filter out non-directories and check if file exists
      const dirPath = path.join(expDirectory, id);
      if (!fs.statSync(dirPath).isDirectory()) {
        return false;
      }
      const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;
      const fullPath = path.join(expDirectory, id, filename);
      return fs.existsSync(fullPath);
    })
    .map((id) => {
      const filename = locale === defaultLocale ? 'index.md' : `index.${locale}.md`;
      const fullPath = path.join(expDirectory, id, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      // ... rest of processing
    });
  // ... sorting logic
}
```

## Testing

Local build tested successfully:
```bash
npm run build
```

Result:
- ✓ All 89 static pages generated successfully
- ✓ All locales (en, fr, de, es) processed correctly
- ✓ No TypeScript errors
- ✓ All routes properly generated

## Impact

- **Build Success**: Deployment will no longer fail on Vercel
- **Robustness**: Application now safely handles unexpected file system entries
- **Compatibility**: Works across different deployment environments
- **No Breaking Changes**: Functionality remains identical for valid content

## Files Modified

### Primary Fixes (v1)
1. `/lib/exp.ts` - Experience data fetching (`getSortedExpsData`)
2. `/lib/educ.ts` - Education data fetching (`getSortedEducsData`)
3. `/lib/hob.ts` - Hobbies data fetching (`getSortedHobbiesData`)
4. `/lib/info.ts` - Info data fetching (`getSortedInfosData`)
5. `/lib/soft.ts` - Skills data fetching (`getSortedSoftsData`)
6. `/lib/posts.ts` - Posts data fetching (`getSortedPostsData`)

### Additional Fixes (v2)
Applied same directory check to all `getAll*Ids` functions for path generation:
1. `/lib/exp.ts` - `getAllExpIds`
2. `/lib/educ.ts` - `getAllEducIds`
3. `/lib/hob.ts` - `getAllHobbieIds`
4. `/lib/info.ts` - `getAllInfoIds`
5. `/lib/soft.ts` - `getAllSoftIds`
6. `/lib/posts.ts` - `getAllPostIds`

This ensures consistent behavior across both data fetching and path generation.

## Next Steps

1. Commit and push changes to GitHub
2. Redeploy on Vercel (should succeed now)
3. Verify all pages load correctly in production

## Important: URL Structure & Troubleshooting

### URL Routing with next-translate

The app uses `next-translate-plugin` which handles routing as follows:

1. **With locale prefix** (explicit):
   - ✅ `/en/experience/Junior-42-Paris`
   - ✅ `/fr/experience/Junior-42-Paris`
   - ✅ `/de/experience/Junior-42-Paris`
   - ✅ `/es/experience/Junior-42-Paris`

2. **Without locale prefix** (auto-detected):
   - ✅ `/experience/Junior-42-Paris` → automatically uses default locale (en)
   - ⚠️ May not work in production if pages aren't generated correctly

### Verification Steps

1. **Check build output**:
   ```bash
   npm run build
   ```
   Look for: `├ ● /experience/[id] (XXX ms)` with `[+13 more paths]`

2. **Verify generated files**:
   ```bash
   find .next/server/pages -name "*Junior*"
   ```
   Should show HTML/JSON files for all 4 locales

3. **Test locally**:
   ```bash
   npm run dev -- --webpack
   ```
   Visit: `http://localhost:3000/experience/Junior-42-Paris`

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 on Vercel | Old deployment cached | Redeploy after pushing latest changes |
| 404 locally | Browser cache | Clear cache or use incognito mode |
| 404 on specific locale | Missing translation file | Ensure `index.[locale].md` exists |
| Build fails | Non-directory items in content folders | Use defensive checks (this fix) |

## Related Documentation

- `.debug/001-upgrade-notes-2026-01-02.md` - Next.js 16 upgrade
- `.debug/002-i18n-fix-2026-01-02.md` - i18n translation fixes

---

**Issue Type**: Build Error  
**Environment**: Vercel Production  
**Fix Type**: Defensive Programming
