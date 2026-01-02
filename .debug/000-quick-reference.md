# Quick Reference - Next.js 16 Project

**Last Updated**: 2026-01-02

## 🚀 Quick Start

```bash
# Development (MUST use --webpack)
npm run dev

# Build
npm run build

# Production
npm start
```

## ⚠️ Critical Information

### Must-Know Issues
1. **Always use webpack mode** - Turbopack breaks i18n translations
2. **React 19 types** - Use `React.JSX.Element` not `JSX.Element`
3. **Four languages** - en, fr, de, es (test all when adding translations)

## 📁 File Organization

```
nextjs-blog/
├── .debug/              # Debug docs (Git: ✅ Production: ❌)
│   ├── 001-upgrade-notes-2026-01-02.md
│   ├── 002-i18n-fix-2026-01-02.md
│   └── README.md
├── .github/
│   └── copilot-instructions.md
├── pages/               # Next.js pages (Pages Router)
├── components/          # React components
├── locales/            # Translation files
│   ├── en/common.json
│   ├── fr/common.json
│   ├── de/common.json
│   └── es/common.json
├── lib/                # Utility functions
└── styles/             # CSS styles
```

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server with webpack

# Building
npm run build            # Production build with webpack

# Dependencies
npm install              # Install dependencies
npm audit fix            # Fix security issues

# Utilities
npx update-browserslist-db@latest  # Update browser data
```

## 🐛 Known Issues & Solutions

| Issue | Solution | Reference |
|-------|----------|-----------|
| Translations not working | Use `npm run dev` (has --webpack flag) | 002-i18n-fix |
| JSX.Element type error | Use `React.JSX.Element` | 001-upgrade-notes |
| Hydration mismatch | Check date/time formatting | agent.md |

## 📝 Translation Usage

```tsx
import useTranslation from 'next-translate/useTranslation'

function MyComponent() {
  const { t } = useTranslation('common')
  
  return <h1>{t('title')}</h1>
}
```

## 🔑 Key Configuration

### package.json scripts
```json
"dev": "next dev --webpack",      // ⚠️ --webpack is critical
"build": "next build --webpack"   // ⚠️ --webpack is critical
```

### tsconfig.json
```json
"moduleResolution": "bundler",    // Required for Next.js 16
"target": "ES2017"                // Better performance
```

### next.config.js
```js
turbopack: {},                    // Explicit config
webpack: (config) => { ... }      // Keep for compatibility
```

## 📚 Documentation Priority

1. `.debug/` directory (latest file first)
2. `agent.md` (coding standards)
3. Configuration files
4. External docs

## 🎯 Adding New Debug Files

```bash
# Pattern: NNN-description-YYYY-MM-DD.md
# Example: 003-new-feature-2026-01-15.md

# Steps:
1. Create file in .debug/
2. Update .debug/README.md
3. Add to File Index table
4. Commit to Git
```

## 🔍 Troubleshooting Checklist

- [ ] Are you using `npm run dev` (not `next dev` directly)?
- [ ] Is webpack mode active? (check terminal output)
- [ ] Are translations in all 4 languages? (en, fr, de, es)
- [ ] Did you check `.debug/` for similar issues?
- [ ] Is TypeScript configured correctly? (moduleResolution: bundler)

## 📞 Get Help

1. Check `.debug/README.md` for relevant documentation
2. Review `agent.md` for coding patterns
3. Check latest `.debug/NNN-*.md` file for recent changes
4. Verify configuration in upgrade notes

## 🎨 Code Style Quick Reference

```tsx
// ✅ Good
interface UserProps {
  name: string
}

export function UserProfile({ name }: UserProps): React.JSX.Element {
  return <div>{name}</div>
}

// ❌ Bad (old React 18 pattern)
export function UserProfile({ name }: UserProps): JSX.Element {
  return <div>{name}</div>
}
```

## 🌍 Supported Locales

- `en` - English (default)
- `fr` - French (Français)
- `de` - German (Deutsch)
- `es` - Spanish (Español)

## 📊 Project Status

| Component | Version | Status |
|-----------|---------|--------|
| Next.js | 16.1.1 | ✅ Latest |
| React | 19.2.3 | ✅ Latest |
| TypeScript | 5.3.3 | ✅ Current |
| next-translate | 2.6.2 | ⚠️ Webpack only |

---

**Quick Tip**: When in doubt, check `.debug/README.md` first!
