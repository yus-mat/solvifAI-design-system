# SOLA Design System

React component library for the SOLA product, aligned with the [Figma design file](https://www.figma.com/design/wGuiIwIAHBXQoW8LudaBcz/SOLA).

## Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Style Dictionary semantic tokens (`tokens/` → `src/styles/generated/`)
- Storybook 10

## Scripts

```bash
npm run dev              # Vite dev server
npm run storybook        # Component docs + page previews (port 6006)
npm run tokens:build     # Regenerate CSS from tokens
npm run build            # Typecheck + production build
npm run build-storybook  # Static Storybook (components only; no Pages)
```

## Public Storybook

Pushes to `master` deploy a static Storybook to GitHub Pages:

**https://yus-mat.github.io/solvifAI-design-system/**

One-time setup (repo admin): **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Local `npm run storybook` includes **Pages** (product screen previews). Published builds omit them — keep page stories in the repo for your own preview, don’t delete.

Local build with the Pages base path:

```bash
npm run build-storybook:pages
```

## Usage

```tsx
import { Button } from '@/components/Button';
import { InfoBlock } from '@/components/InfoBlock';
import { Tag } from '@/components/Tag';
// or from the package root barrel:
import { Button, InfoBlock, Tag } from '@/index';
```

Components use semantic tokens via `data-theme="light" | "dark"` on `<html>`.

## AI-assisted prototyping (Claude Code)

This repo exposes its components and design tokens to Claude Code through an MCP server (`scripts/mcp-server.mjs`, registered in `.mcp.json`), so anyone can prompt for a UI and get back code built from real SOLA components and tokens instead of invented markup.

### First-time setup

```bash
npm install
npm run manifest:build
```

Then open this folder in Claude Code. The first time, it will ask to trust the `sola-design-system` tool — approve it. That's a one-time step per project folder.

### Staying up to date

The manifest Claude reads (`src/generated/manifest.json`) and the CSS tokens the browser renders (`src/styles/generated/`) are both gitignored and rebuilt locally — they don't come from `git pull`. Whenever this repo has new commits:

```bash
git pull
npm install   # only strictly needed if package.json changed, but harmless to always run
```

Then **restart** `npm run dev` or `npm run storybook` — don't run `npm run manifest:build` on its own. Restarting reruns `tokens:build` (visual CSS) and `manifest:build` (the AI's component/token knowledge) together automatically, since both are wired into the `predev`/`prestorybook` scripts.

A dev server left running from before the pull will **not** pick up the update on its own — it has to be stopped and started again.

## Protecting the source of truth in downstream clones

If you clone this repo again to build product features on top of it (e.g. a `solvifAI-features` folder), that clone is **the same repository** — every component file is just as present and editable there as it is here. Nothing about being "a features clone" is enforced by git on its own.

To make that boundary real rather than just a convention, mark a clone as downstream once:

```bash
npm run setup:downstream-clone
```

This creates a few local, gitignored files (never synced by `git pull`/`git push`, so `solvifAI-design-system` itself is unaffected no matter how many clones run this):

- `.design-system-role` — a marker read by a pre-commit hook
- `CLAUDE.local.md` / `.cursor/rules/no-component-edits.local.mdc` — tells Claude Code / Cursor not to edit design-system-owned paths, and to flag a gap instead of working around it
- an installed `git` pre-commit hook that **hard-blocks** any commit touching `src/components/`, `tokens/`, `src/styles/theme.css`, `src/styles/global.css`, `src/icons/`, `src/stories/`, or `.storybook/` in that clone

If a feature genuinely needs a component change, make it here in `solvifAI-design-system`, push it, then `git pull` it into the downstream clone — don't edit the component from the downstream side.

## Code Connect

`figma.config.json` is ready for Figma Code Connect mappings (`.figma.ts` files alongside components). Publishing mappings requires components to be published to a Figma team library and a Figma Organization or Enterprise plan with Code Connect enabled.

## Docs

- Token architecture: `docs/figma-token-structure.md`
