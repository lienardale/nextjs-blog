# GitHub Copilot Instructions

## Project Context

This is a Next.js 16 multilingual blog application with the following tech stack:
- **Framework**: Next.js 16.1.1 (using webpack mode for i18n compatibility)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS
- **i18n**: next-translate 2.6.2
- **Languages**: English, French, German, Spanish

## Important Context Files

Always reference these files when providing assistance:

### Primary Documentation
1. **`.debug/README.md`** - Index of all debug documentation
2. **`.debug/001-upgrade-notes-2026-01-02.md`** - Complete Next.js 16 upgrade documentation
3. **`.debug/002-i18n-fix-2026-01-02.md`** - i18n translation fix details
4. **`agent.md`** - Development best practices and coding standards

### Project Configuration
- **`next.config.js`** - Next.js configuration with webpack mode
- **`tsconfig.json`** - TypeScript configuration for Next.js 16
- **`package.json`** - Dependencies and scripts
- **`i18n.json`** - Translation configuration

## Key Project Constraints

### Critical Requirements
1. **MUST use webpack mode** - Add `--webpack` flag to all Next.js commands
   - Reason: next-translate-plugin doesn't support Turbopack yet
   - Commands: `next dev --webpack`, `next build --webpack`

2. **React 19 Type Changes** - Use `React.JSX.Element` instead of `JSX.Element`
   - This is required for all component return types

3. **TypeScript moduleResolution** - Must be set to `"bundler"`
   - Required for Next.js 16 compatibility

### Translation System
- Uses `next-translate` with `useTranslation` hook
- Translation files located in `locales/[lang]/common.json`
- Supported locales: en, fr, de, es
- Always ensure translations work across all languages

### Code Style
- Follow guidelines in `agent.md`
- Use functional components with TypeScript interfaces
- Prefer kebab-case for file names
- Use PascalCase for component names
- Use camelCase for variables and functions

## Common Tasks

### Adding New Features
1. Check `.debug/` directory for relevant context
2. Follow patterns in existing components
3. Ensure i18n support for all user-facing strings
4. Update `.debug/README.md` if documenting the change

### Debugging Issues
1. First check `.debug/` directory for similar issues
2. Reference `agent.md` for best practices
3. Verify webpack mode is being used
4. Check translation files if text issues occur

### Making Configuration Changes
1. Review `.debug/001-upgrade-notes-2026-01-02.md` for current setup
2. Test changes with `npm run dev` (webpack mode)
3. Document significant changes in `.debug/` directory
4. Update `.debug/README.md` index

## When Creating New Debug Files

Follow this process:
1. Create file as `.debug/NNN-description-YYYY-MM-DD.md`
2. Use the next available sequence number
3. Include date in ISO format (YYYY-MM-DD)
4. Update `.debug/README.md` with new entry
5. Add entry to the File Index table

## References

### Internal Documentation
- All files in `.debug/` directory
- `agent.md` for coding standards
- `README.md` for project overview

### External Documentation
- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [next-translate Docs](https://github.com/aralroca/next-translate)

## Priority Order for Context

When answering questions, prioritize information in this order:
1. Files in `.debug/` directory (especially latest numbered file)
2. `agent.md` coding standards
3. Current project configuration files
4. External documentation

---

**Last Updated**: 2026-01-02
**Maintainer**: Development Team
