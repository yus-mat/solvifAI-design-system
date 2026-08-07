# Reference: mature DS patterns → SOLA

Informed by [components.build](https://www.components.build/), Radix/React Aria-style composition, and common design-system API guidance. Apply in SOLA idioms (slots + groups, not necessarily `Root`/`asChild`).

## Principles (short)

1. **Composition over configuration** — structure and slots beat prop mega-objects.
2. **Small public API** — easy to add a prop later; hard to remove. Don't preempt every Figma edge case with booleans.
3. **Accessibility by default** — correct roles/keyboard/focus without consumer boilerplate.
4. **Sensible defaults** — common case works with minimal props.
5. **Predictable naming** — same words across the library (`size`, `disabled`, `onValueChange`).
6. **Separate structure, behavior, and skin** — tokens/styles don't own selection logic; context/handlers don't hardcode hex.

## Anti-patterns

| Anti-pattern | Prefer |
|--------------|--------|
| `showIcon`, `iconName`, `iconPosition` enums | `leadingIcon` / `leadingSlot` |
| `isPrimary` + `isDanger` + `isLarge` | `emphasis` / `intent` / `size` unions |
| Styled `<div onClick>` | `<button>` / correct role |
| Page-local copy of Picker | Extend `Picker` (flag gap) |
| Only Default frame styled | Hover / pressed / selected / disabled / focus |
| `any` children with no contract | Documented slots + types |
| Focus outline via random ring | `@/styles/focusRing` |

## Controlled vs uncontrolled

Support both when the component owns a value or open state:

```tsx
// Uncontrolled
<PickerGroup defaultValue="a">…</PickerGroup>

// Controlled
<PickerGroup value={value} onValueChange={setValue}>…</PickerGroup>
```

Group provides context; items call `onValueChange` and set `aria-checked` / `aria-selected` from context.

## Slot discipline

- **Default content** for the design's default instance (e.g. Check).
- **`undefined`** → use default.
- **Custom node** → replace default.
- **`null`** → hide region (when Figma allows empty).
- Wrap icons in `IconWrapper` at the size Figma specifies; decorative SVG → `aria-hidden`.

## When to split components

Split when:

- Two variants need different roots or a11y patterns
- Prop list grows past ~8–10 domain props (excluding HTML attrs)
- Consumers need to reorder regions (compound) rather than fill slots

Don't split only to match Figma layer names one-to-one.

## Quality bar vs "looks like Figma"

| Looks like Figma | Built correctly |
|------------------|-----------------|
| Matching padding/radius/type | Same + tokenized |
| Default state screenshot | All interactive states |
| Hardcoded check icon | `trailingSlot` |
| Mouse-only select | Radiogroup + keyboard |
| One Story | Playground + slots + disabled |

## External reading (optional)

- https://www.components.build/ — composition, a11y, types
- WAI-ARIA APG patterns for the control type you're building
- Existing SOLA neighbors in `src/components/` — match local conventions first
