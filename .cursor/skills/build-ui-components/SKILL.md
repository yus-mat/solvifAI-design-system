---
name: build-ui-components
description: >-
  Builds design-system React UI components correctly: API design, composition,
  slots, state, accessibility, and tokens — not Figma visual mimicry alone. Use
  when creating or updating SOLA/DS components, translating Figma components into
  library code, adding props/slots/variants, or when the user asks to build a
  component the right way (Picker, Button, Dialog, Chat shells, etc.).
---

# Build UI components (design system)

Figma is a **spec for structure, variants, and slots** — not a license to ship a styled div tree. Build components the way mature systems do (Radix / React Aria / Spectrum / components.build): correct element, composable API, accessible behavior, tokenized styles.

Cross-check gaps with [flag-component-gap](../flag-component-gap/SKILL.md): if Figma needs API you don't have, extend the component — don't fake it in a page.

## Non-goals

- Pixel-perfect screenshots without API/a11y
- One-off page markup that should be a shared component
- Boolean prop explosion (`isFoo` × `showBar` × `hideBaz`) instead of slots/composition
- Hardcoded chrome where Figma exposes a SLOT / instance swap

## Build checklist (follow in order)

Copy and track:

```
Component build:
- [ ] 1. Map anatomy (root, parts, slots, variants, states)
- [ ] 2. Choose composition model (single + slots vs group/context vs compound)
- [ ] 3. Design TypeScript API (unions, defaults, native attr passthrough)
- [ ] 4. Implement behavior + a11y (roles, keyboard, focus, names)
- [ ] 5. Style with tokens + *Styles.ts (interactive states included)
- [ ] 6. Stories: Playground + variants + slot examples
- [ ] 7. Export barrel; no page-only forks
```

### 1. Map anatomy (from Figma + product use)

Before code, list:

| Concern | Capture |
|---------|---------|
| Root element | `button`, `div`, `nav`, … |
| Parts | header / body / footer / item / trigger |
| Slots | leading, trailing, icon, children, footer |
| Variants | emphasis, intent, size (typed unions) |
| States | hover, pressed, selected, disabled, loading, open |
| Selection | single / multi; who owns value? |

Figma **component properties** → props. Figma **SLOTs** → `ReactNode` slot props (or compound children). Figma **variants** → string unions — not booleans per variant.

### 2. Composition model

Prefer the smallest model that fits:

| Pattern | When | SOLA examples |
|---------|------|----------------|
| **Single component + slots** | One control; swappable chrome | `Button` (`leadingIcon`), `Picker` (`leadingSlot` / `trailingSlot`) |
| **Group + context** | Exclusive selection / shared disabled | `PickerGroup`, `ChipGroup`, `TabGroup`, `SegmentedControl` |
| **Compound / named regions** | Structured chrome (shells, overlays) | `AnswerPanel` (`children`, `footer`), Dialog/Drawer regions |

Rules:

- **Composition over configuration** — inject content via slots/`children`; don't add a prop per icon or label layout.
- **Defaults + `null` to hide** — e.g. default trailing check; `trailingSlot={null}` removes it.
- **Group owns state** — items read context; support **controlled** (`value` + `onValueChange`) and **uncontrolled** (`defaultValue`).
- Don't invent `asChild` unless the codebase already uses it; prefer native element + `...rest` and slots.

### 3. TypeScript API

- Extend the right HTML attributes; `Omit` conflicting keys (`children`, `value`, …); spread `...rest`.
- Variants: `type X = 'a' | 'b'` in `*Types.ts` — not `isPrimary` / `isSecondary`.
- Sensible defaults for the common case (`emphasis = 'primary'`, `size = 'md'`).
- Naming (consistent across SOLA):
  - slots: `leadingSlot`, `trailingSlot`, `children`, `footer`
  - icons: `leadingIcon`, `trailingIcon` when the slot is icon-only by design
  - events: `onValueChange`, `onOpenChange` (React-style)
  - selection: `value` / `defaultValue` / `disabled`
- Keep the public surface small. New prop needs a real product/Figma reason.

### 4. Behavior and accessibility

Ship behavior with the visual:

- Correct **semantic element** first; ARIA only when HTML isn't enough.
- Match the WAI-ARIA pattern (radio group, tabs, dialog, listbox, disclosure).
- **Keyboard**: activate, move focus, Escape to close where expected.
- **Focus**: use `@/styles/focusRing` helpers — don't invent ad-hoc outlines.
- Icon-only controls: required accessible name (`aria-label` / visible text).
- Decorative icons: `aria-hidden`.
- Disabled: no pointer events; preserve disabled semantics on the control.
- Don't rely on color alone for selected/error state.

### 5. Styling

- Colocate `*Styles.ts` — Tailwind class helpers + semantic tokens (`bg-background-*`, `text-text-*`, `body-2`, CSS vars).
- No raw hex / one-off palette; theme via `data-theme`.
- Encode **interactive** states (hover / pressed / selected / disabled) in the component styles — not only the default frame from Figma.
- Prefer shared patterns already in the repo (e.g. inset stroke + `before:` interactive overlay on Pickers).

### 6. File layout (SOLA)

```
src/components/<Name>/
  <Name>.tsx
  <name>Styles.ts      # or *Styles.ts matching neighbors
  <name>Types.ts       # optional unions
  <Name>Group.tsx      # if selection group
  <Name>GroupContext.tsx
  <Name>.stories.tsx
  index.ts
```

Families (`Chat/`, `Overlay/`) nest related pieces; re-export from the family barrel.

### 7. Stories

- Title: `Category/Name` (`Control/Picker`, `Action/Button`).
- `tags: ['autodocs']`; typed `Meta` / `StoryObj`.
- Always: **Playground** + key variants + at least one **custom slot** story when slots exist.
- Slot args: `control: false`.

## Figma → component (correct translation)

| Figma | Code |
|-------|------|
| SLOT / instance swap | Slot prop (`ReactNode`), not hardcoded node |
| Variant axis | Union prop |
| Boolean property | `boolean` prop only if truly on/off |
| Component set states (Hover, …) | CSS/`data-*`/state styles on one component |
| Nested components (IconWrapper) | Reuse DS primitives; don't redraw |
| Absolute / flat export | Rebuild with auto-layout → flex/gap tokens |

**Wrong:** export looks like Figma in Storybook but consumers can't swap trailing content, select via keyboard, or theme tokens.

**Right:** API matches Figma properties; visuals use tokens; a11y works without extra consumer work.

## Definition of done

- [ ] API matches anatomy (slots/variants/states) — not only default appearance
- [ ] Controlled + uncontrolled where there is value/open state
- [ ] Keyboard + focus + names verified
- [ ] Tokens only; light/dark not broken
- [ ] Stories cover slots and variants
- [ ] Exported from package barrel if public

## Related

- Deeper patterns: [references.md](references.md)
- Gap workflow: [flag-component-gap](../flag-component-gap/SKILL.md)
