# CLAUDE.md

React component library for SOLA. See `README.md` for stack and scripts.

## Versioning — read before merging

Consumers (notably `solvifAI-features`) install this package **straight from git**, not from a
registry. If the `version` in `package.json` doesn't change, `npm install` reports "up to date"
and keeps serving a stale build from `node_modules` — which has already broken a consumer's
Vercel deploy. See issue #17.

So the version must move on every substantive change.

- **Patch digit is bumped automatically** on every push to `master` by
  `.github/workflows/version-bump.yml`. Don't bump the patch by hand — you'll just collide with
  the bot.
- **Breaking changes need a manual minor bump in the same PR** — edit `package.json` via
  `npm version minor --no-git-tag-version` (it keeps `package-lock.json` in sync) so that e.g.
  `0.2.x` → `0.3.0`. Breaking means renaming or removing an exported component, prop, or icon.
- Never edit the version by hand in one file only; `package.json` and `package-lock.json` must
  agree.

### The case this rule exists for

Commit `e555a34` swapped the icon set from Lucide to Phosphor while keeping Lucide-oriented
export names (`Sparkles`, `PanelLeft`, `TableOfContents`, …). Every icon's rendering changed
under unchanged export names, and it shipped under an unchanged version. That should have been
a minor bump.
