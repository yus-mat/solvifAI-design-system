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
npm run storybook        # Component docs (port 6006)
npm run tokens:build     # Regenerate CSS from tokens
npm run build            # Typecheck + production build
npm run build-storybook  # Static Storybook export
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

## Code Connect

`figma.config.json` is ready for Figma Code Connect mappings (`.figma.ts` files alongside components). Publishing mappings requires components to be published to a Figma team library and a Figma Organization or Enterprise plan with Code Connect enabled.

## Docs

- Token architecture: `docs/figma-token-structure.md`
