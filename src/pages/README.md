# Pages layer

Composed product screens built from the design system. Storybook previews live here; the Vite app routes to the same components.

## Structure

```
pages/
  _layouts/          App shell + page frame (shared chrome)
  <feature>/         One folder per screen or flow
    FeaturePage.tsx
    FeaturePage.stories.tsx
    index.ts
```

## Import rules

**Do**

- Import UI from `@/components/*` and layout from `@/pages/_layouts`
- Use semantic tokens via Tailwind (`bg-surface-base`, `text-text-neutral-primary`, etc.)
- Colocate `PageName.stories.tsx` with `title: 'Pages/...'`
- Promote anything reused on 2+ pages into `src/components/`

**Don't**

- Add page stories under `src/components/`
- Hardcode colors or duplicate primitive palette values
- Put product copy or routing logic inside design system components

## Storybook

- Page stories use `parameters.layout: 'fullscreen'`
- Default canvas padding comes from `.storybook/preview.tsx` (`p-8`)
- Full-bleed layouts: `parameters.storyPadding: false`

## Vite app

Routes in `src/App.tsx` import from `@/pages/*` — same components as Storybook, no duplication.
