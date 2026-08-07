# Examples

## Flag: Picker trailing slot

**Request:** Match Figma Picker where Trailing is a SLOT (default check); IconWrapper hidden on default, visible on Hover / Pressed / Selected.

**Inspect:** `Picker` only had `leadingSlot`; trailing was a hardcoded `Check` shown only when `selected`.

**Flag:**

```markdown
**Component build gap**

- **Component:** `Picker`
- **Needed:** `trailingSlot` (Figma Trailing); show on hover/focus and when selected
- **Current API:** hardcoded Check; selected-only; no trailing slot
- **Blocked:** cannot swap trailing per instance

Update `Picker` before composing this screen?
```

**After approval:** Add `trailingSlot?: ReactNode | null`, default Check, `null` hides; visibility via `group-hover` / selected.

## Compose: no flag

**Request:** Picker row with Sparkles in the leading area and custom title/subtitle.

**Inspect:** `leadingSlot`, `title`, `subtitle` already exist.

**Action:** Compose — pass `leadingSlot={<IconWrapper>…</IconWrapper>}`. No flag.

## Flag: ButtonIcon size missing from Figma

**Request:** Figma uses ButtonIcon size that maps to IconWrapper `lg`, but code only exposes `sm` / `md`.

**Flag:** size/API mismatch on `ButtonIcon` — ask to extend sizes (or remap tokens) on the component, not patch one screen.
