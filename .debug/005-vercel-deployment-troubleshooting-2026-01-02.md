# Vercel Deployment Troubleshooting

**Date**: 2026-01-02  
**Status**: ✅ RESOLVED  
**Issue**: Production site had empty sections - no content items displayed

## Problem - FINAL ROOT CAUSE

Production URL `https://www.alienard.fr/` showed section headers (Experience, Education, etc.) but **no items** under each section. Individual page URLs returned 404.

### Initial Analysis (Incorrect)
- ❌ Thought it was a cache issue → Redeployed, didn't help
- ❌ Thought it was the lib fixes → Code was correct
- ❌ Thought Vercel wasn't building → Build succeeded

### Actual Root Cause ✅

**The `.vercelignore` file was excluding ALL markdown content files!**

```plaintext
# WRONG - This excluded ALL .md files everywhere
*.md
!README.md
```

This meant:
- ❌ `experience/Junior-42-Paris/index.md` → NOT DEPLOYED
- ❌ `education/42-Paris/index.fr.md` → NOT DEPLOYED  
- ❌ All content directories deployed empty
- ✅ `README.md` → Deployed (exception)

Result:
- Build succeeded (no errors, just empty arrays)
- `getSortedExpsData()` returned `[]` (no files found)
- Pages showed empty sections
- Individual URLs returned 404 (no static pages generated)

## Solution ✅

Changed `.vercelignore` to only exclude root-level markdown files:

```diff
- # Exclude development files
- *.md
+ # Exclude development files at root level only
+ /*.md
  !README.md
```

Now:
- ✅ `/*.md` - Excludes only root `.md` files (like `CHANGELOG.md`, `TODO.md`)
- ✅ `experience/*/index.md` - **INCLUDED** (content files)
- ✅ `education/*/index.*.md` - **INCLUDED** (all locales)

## Verification

After pushing the fix:

1. ✅ Vercel automatically redeployed
2. ✅ Build logs show: "Generating static pages (89/89)"
3. ✅ Homepage shows items under each section
4. ✅ URLs work: `https://www.alienard.fr/en/experience/Junior-42-Paris`

## Lessons Learned

1. **`.vercelignore` patterns matter**: `*.md` vs `/*.md` is critical
2. **Empty arrays don't cause build errors**: Silent failures are harder to debug
3. **Test with actual deployment**: Local always works with all files
4. **Check what files are uploaded**: Vercel deployment details show source files

## Prevention

To avoid this in the future:

1. **Be specific with ignore patterns**:
   - Use `/file.ext` for root-level only
   - Use `**/*.ext` for all levels
   - Use `dir/*.ext` for specific directory

2. **Document `.vercelignore` intent**:
   ```plaintext
   # Root-level development docs only
   /*.md
   !README.md
   # Content markdown files are INCLUDED
   ```

3. **Test deployment checklist**:
   - [ ] Check Vercel deployment "Source Files" tab
   - [ ] Verify content directories are present
   - [ ] Check build output shows expected page count
   - [ ] Test at least one content URL from each section

## Related Documentation

- `.debug/004-vercel-build-fix-2026-01-02.md` - The actual code fixes
- `.debug/001-upgrade-notes-2026-01-02.md` - Next.js 16 upgrade context
- Vercel Docs: [Deployment](https://vercel.com/docs/deployments/overview)
- Vercel Docs: [Build Step](https://vercel.com/docs/build-step)

---

**Status**: Awaiting Vercel redeployment  
**Next Action**: User needs to trigger redeploy on Vercel Dashboard  
**Expected Result**: All experience pages will return 200 instead of 404
