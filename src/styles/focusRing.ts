/**
 * Shared 1.5px focus rings for interactive controls.
 *
 * - focusRingOffsetClassName — default for standalone controls (button, link, toggle, …)
 * - focusRingInsetClassName — same element has overflow-hidden (list rows, tabs, triggers)
 * - focusRingOnParentClassName — visible chrome wraps any focused descendant (checkbox)
 * - focusRingOnDirectButtonClassName — ring only when a direct-child button is focused
 *   (accordion header; ignores nested fields like TextArea)
 * - focusOutlineSuppressClassName — child delegates focus ring to a parent wrapper
 */

export const focusRingClassName =
  'focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-border-action';

export const focusRingOffsetClassName =
  'focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-border-action focus-visible:ring-offset-1';

export const focusRingInsetClassName =
  'focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-inset focus-visible:ring-border-action';

/** Ring on a wrapper when a descendant holds keyboard focus (e.g. checkbox). */
export const focusRingOnParentClassName =
  'has-[:focus-visible]:outline-none has-[:focus-visible]:ring-[1.5px] has-[:focus-visible]:ring-border-action has-[:focus-visible]:ring-offset-1';

/**
 * Ring on a wrapper only when its direct-child button is focused.
 * Use for accordion cards so nested TextAreas / inputs do not light the card ring.
 */
export const focusRingOnDirectButtonClassName =
  'has-[>button:focus-visible]:outline-none has-[>button:focus-visible]:ring-[1.5px] has-[>button:focus-visible]:ring-border-action has-[>button:focus-visible]:ring-offset-1';

/** Suppress native outline on a child that delegates its ring to a parent. */
export const focusOutlineSuppressClassName =
  'focus:outline-none focus-visible:outline-none';

export const focusInsetStrokeAction =
  'shadow-[inset_0_0_0_1.5px_var(--border-action-primary)]';

/** Roving-focus ring (e.g. Chip) — always visible, not focus-visible gated. */
export const rovingFocusRingOffsetClassName =
  'ring-[1.5px] ring-border-action ring-offset-1';

export const rovingFocusRingInsetClassName =
  'ring-[1.5px] ring-inset ring-border-action';
