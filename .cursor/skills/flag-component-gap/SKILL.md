---
name: flag-component-gap
description: >-
  Detects when a UI/Figma request cannot be built with an existing design-system
  component's current API (props, slots, variants, sizes, states). Flags the gap
  and asks the user to update the component build before composing workarounds.
  Use when implementing UI from Figma or specs, composing screens with SOLA/DS
  components, or when a design needs a slot/prop/variant the component does not
  expose yet (e.g. Picker trailingSlot).
---

# Flag component build gaps

When building UI with existing design-system components, **prefer updating the component** over local hacks. If the request needs API the component does not have, **stop, flag, and ask** before inventing page-level workarounds.

## When this applies

- Implementing Figma (or any UI spec) with library components
- Composing pages/stories that reuse Control / Chat / Form / etc. components
- Mapping Figma INSTANCE slots, variant props, or component properties to code

## Workflow

1. **Identify** the matching DS component(s) for each designed piece.
2. **Inspect** the component's real API: props, slots (`leadingSlot`, `trailingSlot`, `children`, `footer`, …), variants, sizes, and documented states.
3. **Compare** to the design/request:
   - Figma SLOT / INSTANCE swap → needs a React slot prop?
   - Variant or property not in code → needs a new variant/prop?
   - Hover/selected/disabled affordance missing → needs style/API support?
4. **Decide**:

| Situation | Action |
|-----------|--------|
| Design fits existing API | Compose with the component as-is |
| Gap is a missing **component** capability (slot, prop, variant, size, state) | **Flag** — do not hack around it |
| Gap is page-only layout/copy/wiring | Compose normally; no flag |

5. If flagged: **pause composition** (or keep only non-blocked parts) and ask the user whether to update the component build first.

## What counts as a gap (flag these)

- Figma exposes a **slot** (e.g. Trailing) but code hardcodes the content
- Design shows hover/selected/pressed behavior the component cannot express
- Needed size, density, or variant does not exist on the component
- Required content region is not a prop/`children`/named slot in code
- Only way to match design would be: override internals, duplicate the component locally, fork styles, or wrap with brittle DOM/CSS that fights the component

## What is not a gap (do not flag)

- Using documented props/slots correctly
- Page layout, spacing between components, copy, icons passed into existing slots
- Wiring `onClick` / controlled state with existing callbacks
- Storybook demos of current API

## Flag message template

Use this shape (adapt names):

```markdown
**Component build gap**

- **Component:** `Picker`
- **Needed:** swappable trailing affordance (Figma `Trailing` slot); visible on hover + selected
- **Current API:** hardcoded `Check` icon; only shown when `selected`; no `trailingSlot`
- **Blocked:** cannot match design by composing alone

Update `Picker` (add `trailingSlot`, hover visibility) before finishing this UI?
```

Ask a clear yes/no (or “update component first”). Do **not** silently add local workarounds unless the user explicitly says to proceed without a component change.

## After the user agrees to update

1. Extend the component API in the DS (props/slots/styles/stories).
2. Keep the API aligned with Figma (slot names, default content, visibility rules).
3. Resume the original UI composition using the new API.

## Anti-patterns

- Hardcoding icons/content the design treats as an instance swap
- Copy-pasting a near-duplicate of the component in a page folder
- Deep CSS selectors / `!important` to fake missing variants
- Quietly widening a one-off page prop that belongs on the shared component

## Examples

See [examples.md](examples.md) for Picker trailingSlot and similar cases.
