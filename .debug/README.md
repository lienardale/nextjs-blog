# .debug Directory

This directory contains development documentation, debug notes, and upgrade logs that are useful for development and troubleshooting but should not be deployed to production.

## Purpose

- **Version Control**: All debug files are versioned in Git for team collaboration
- **Production Exclusion**: Files here are excluded from production builds via `.vercelignore` or `.gitignore` patterns
- **Context for AI**: These files serve as context for GitHub Copilot and other AI assistants
- **Historical Record**: Chronologically ordered to track changes and decisions over time

## Naming Convention

Files are named using the pattern: `NNN-description-YYYY-MM-DD.md`

- `NNN`: Three-digit sequence number (001, 002, 003, etc.)
- `description`: Kebab-case description of the content
- `YYYY-MM-DD`: Date of creation

## File Index

| # | Date | File | Description |
|---|------|------|-------------|
| 000 | 2026-01-02 | [000-quick-reference.md](./000-quick-reference.md) | ⭐ Quick reference card - START HERE |
| 001 | 2026-01-02 | [001-upgrade-notes-2026-01-02.md](./001-upgrade-notes-2026-01-02.md) | Next.js 14 → 16 upgrade complete documentation |
| 002 | 2026-01-02 | [002-i18n-fix-2026-01-02.md](./002-i18n-fix-2026-01-02.md) | i18n translation fix for Turbopack compatibility |
| 003 | 2026-01-02 | [003-debug-directory-setup-2026-01-02.md](./003-debug-directory-setup-2026-01-02.md) | Debug directory setup and organization |

## Quick Links

### ⭐ Start Here
- **Quick Reference**: [000-quick-reference.md](./000-quick-reference.md) - Everything you need to know in one page

### Latest Changes
- **Latest**: [003-debug-directory-setup-2026-01-02.md](./003-debug-directory-setup-2026-01-02.md) - Debug directory setup

### By Category
- **Upgrades**: 001
- **Bug Fixes**: 002
- **Configuration**: 001, 002, 003
- **Organization**: 003

## Guidelines for Adding New Files

1. **Determine the next sequence number** by checking the existing files
2. **Use descriptive names** that clearly indicate the content
3. **Include the date** in YYYY-MM-DD format
4. **Update this README** with the new entry in the File Index table
5. **Keep files concise** - focus on decisions, rationale, and key information

## Example Entry Template

When adding a new file, use this template:

```markdown
# [Feature/Fix/Update Name]

## Date
YYYY-MM-DD

## Context
Brief description of why this change was needed

## Problem
What issue were we trying to solve?

## Solution
What approach was taken and why?

## Implementation
Key code changes, configuration updates, etc.

## Testing
How was this verified?

## Future Considerations
Any follow-up work or migration paths

## References
- Links to relevant documentation
- Related GitHub issues/PRs
```

## Maintenance

- Review this directory quarterly to archive old files if needed
- Keep the File Index table updated
- Ensure all files follow the naming convention

---

**Note**: This directory is committed to Git but excluded from production deployments.
