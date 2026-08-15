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

This repo is a real, installable package — `npm install github:yus-mat/solvifAI-design-system` in any consumer project, then:

```tsx
import { Button, InfoBlock, Tag } from '@sola/design-system';
```

Once, in the consumer's own CSS entry point:

```css
@import 'tailwindcss';
@import '@sola/design-system/theme.css';  /* raw tokens, for your own theme-derived utility classes */
@import '@sola/design-system/style.css';  /* precompiled component styles */
```

Components use semantic tokens via `data-theme="light" | "dark"` on `<html>`.

`npm install github:...` runs this repo's own `prepare` script (`npm run build:lib`) to produce `dist/` fresh — nothing built is committed to git. Building the package requires the full local toolchain (Vite, TypeScript, Tailwind, Style Dictionary), so consumer installs are heavier than a registry package would be; that's expected for now.

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

## Product apps consuming this package

Product repos (e.g. `solvifAI-features`) install this as a real npm dependency rather than cloning it — see [Usage](#usage). That's a deliberate fix: this repo and `solvifAI-features` used to both be full git clones of the same source, which meant component code was just as editable from the product side as it was here, and caused real incidents (accidental component edits, merge conflicts on shared files). Installing as a package removes that entirely — there's no component source physically present in a consumer to edit by accident.

If a product app needs a component change (missing prop, slot, variant, size, or state), make the change here, push it, then `npm update @sola/design-system` (or bump the dependency) in the consumer — don't fork or patch the compiled package.

The AI-assisted prototyping setup above (MCP server + manifest) travels with the package too — `dist/mcp-server.mjs` and `dist/manifest.json` ship inside it, so a consumer's own `.mcp.json` points at `node_modules/@sola/design-system/dist/mcp-server.mjs` and gets the same prompting workflow without needing this repo cloned locally.

## Code Connect

`figma.config.json` is ready for Figma Code Connect mappings (`.figma.ts` files alongside components). Publishing mappings requires components to be published to a Figma team library and a Figma Organization or Enterprise plan with Code Connect enabled.

## Docs

- Token architecture: `docs/figma-token-structure.md`
