# Vercel Deployment Troubleshooting

**Date**: 2026-01-02  
**Status**: In Progress  
**Issue**: Production site returns 404 for experience pages despite successful local build

## Problem

Production URL `https://www.alienard.fr/en/experience/Junior-42-Paris` returns 404, but:
- ✅ Local build succeeds (89 pages generated)
- ✅ Local dev server works correctly
- ✅ All HTML/JSON files generated in `.next/server/pages/`
- ✅ All fixes committed and pushed to `origin/main`

## Root Cause Analysis

The issue is that **Vercel hasn't redeployed** with the latest fixes, or there's a **build cache issue** on Vercel.

### Evidence
- Commit `fb6e1db` ("fix: 404 issues exploring directories") contains all fixes
- All 6 lib files updated with directory checks in both `getSorted*Data()` and `getAll*Ids()`
- Homepage `https://www.alienard.fr/en` works correctly
- Only dynamic routes (experience pages) return 404

## Solutions

### Option 1: Trigger Manual Redeploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `nextjs-blog` project
3. Go to **Deployments** tab
4. Click on the latest deployment
5. Click **"Redeploy"** button
6. Select **"Redeploy with existing cache cleared"** (important!)

### Option 2: Force Redeploy via Git

```bash
# Create an empty commit to trigger rebuild
git commit --allow-empty -m "chore: force Vercel redeploy"
git push origin main
```

### Option 3: Check Vercel Build Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check the **Build Logs** tab
4. Look for:
   - Any build errors
   - "Generating static pages" output
   - Whether 89 pages were generated
   - Any ENOENT errors

### Option 4: Verify Vercel Build Settings

Check in Vercel Dashboard → Project Settings → General:

**Build & Development Settings:**
- Framework Preset: `Next.js`
- Build Command: `npm run build` or `next build --webpack`
- Output Directory: `.next` (default)
- Install Command: `npm install`

**Important:** Ensure the build command includes `--webpack` flag:
```json
// package.json
"scripts": {
  "build": "next build --webpack"
}
```

## Verification Steps

After redeployment, verify:

1. **Check build completed**:
   - Vercel deployment status shows "Ready"
   - Build logs show "89 pages" generated

2. **Test URLs**:
   - `https://www.alienard.fr/en/experience/Junior-42-Paris` ✅
   - `https://www.alienard.fr/en/experience/ESF-Sciences-Humaines` ✅
   - `https://www.alienard.fr/en/experience/Flammarion` ✅
   - `https://www.alienard.fr/en/experience/Editions-Denoel` ✅

3. **Check all locales**:
   - `/en/experience/Junior-42-Paris` ✅
   - `/fr/experience/Junior-42-Paris` ✅
   - `/de/experience/Junior-42-Paris` ✅
   - `/es/experience/Junior-42-Paris` ✅

## Common Vercel Deployment Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Stale cache | Previous failed build cached | Redeploy with cache cleared |
| Build command wrong | Missing `--webpack` flag | Update `package.json` build script |
| Silent build failure | Build errors not visible in UI | Check detailed build logs |
| Edge cache | CDN serving old version | Wait 5-10 minutes or purge cache |
| Environment mismatch | Different Node version | Set Node version in Vercel settings |

## Node Version Configuration

Add to `package.json` to ensure consistent Node version:

```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

Or create `.nvmrc` file:
```
18
```

## Monitoring Deployment

To monitor the deployment in real-time:

1. Watch Vercel Dashboard deployment status
2. Check build logs as they stream
3. Look for: "Generating static pages using X workers (89/89)"
4. Verify: "✓ Generating static pages" completes successfully

## If Issue Persists

If pages still return 404 after redeployment:

1. **Check Vercel Function Logs**:
   - Go to Deployments → Functions tab
   - Look for runtime errors

2. **Verify File Upload**:
   - In deployment details, check "Source Files"
   - Ensure all `lib/*.ts` files are included

3. **Test with Deployment URL**:
   - Use the specific deployment URL (e.g., `nextjs-blog-xxx.vercel.app`)
   - Instead of custom domain
   - This bypasses CDN caching

4. **Contact Vercel Support**:
   - If none of the above works
   - There may be a platform-specific issue

## Prevention

To avoid this in the future:

1. **Enable auto-deployment** on Vercel for main branch
2. **Monitor deployment notifications** (email/Slack)
3. **Test deployment URLs** before verifying custom domain
4. **Check build logs** for warnings even on "successful" deploys

## Related Documentation

- `.debug/004-vercel-build-fix-2026-01-02.md` - The actual code fixes
- `.debug/001-upgrade-notes-2026-01-02.md` - Next.js 16 upgrade context
- Vercel Docs: [Deployment](https://vercel.com/docs/deployments/overview)
- Vercel Docs: [Build Step](https://vercel.com/docs/build-step)

---

**Status**: Awaiting Vercel redeployment  
**Next Action**: User needs to trigger redeploy on Vercel Dashboard  
**Expected Result**: All experience pages will return 200 instead of 404
