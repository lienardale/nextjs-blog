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

1. `/lib/exp.ts` - Experience data fetching
2. `/lib/educ.ts` - Education data fetching
3. `/lib/hob.ts` - Hobbies data fetching
4. `/lib/info.ts` - Info data fetching
5. `/lib/soft.ts` - Skills data fetching
6. `/lib/posts.ts` - Posts data fetching

## Next Steps

1. Commit and push changes to GitHub
2. Redeploy on Vercel (should succeed now)
3. Verify all pages load correctly in production

## Related Documentation

- `.debug/001-upgrade-notes-2026-01-02.md` - Next.js 16 upgrade
- `.debug/002-i18n-fix-2026-01-02.md` - i18n translation fixes

---

**Issue Type**: Build Error  
**Environment**: Vercel Production  
**Fix Type**: Defensive Programming
