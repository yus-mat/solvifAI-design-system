export type TooltipAlign = 'left' | 'center' | 'right';

export type TooltipSide = 'top' | 'bottom';

/** Primary placements: side of trigger + horizontal arrow/body align. */
export type TooltipAnchoredPosition = `${TooltipSide}-${TooltipAlign}`;

/**
 * Placement relative to the trigger.
 *
 * Preferred:
 * - `top-left` | `top-center` | `top-right`
 * - `bottom-left` | `bottom-center` | `bottom-right`
 *
 * Shorthand:
 * - `top` / `bottom` → `*-center`
 * - `left` / `center` / `right` → `bottom-*` (legacy)
 */
export type TooltipPosition =
  | TooltipAnchoredPosition
  | TooltipSide
  | TooltipAlign;

export type TooltipPlacement = {
  side: TooltipSide;
  align: TooltipAlign;
};

export const TOOLTIP_ANCHORED_POSITIONS: TooltipAnchoredPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export function resolveTooltipPlacement(
  position: TooltipPosition = 'bottom-center',
): TooltipPlacement {
  if (position === 'top' || position === 'bottom') {
    return { side: position, align: 'center' };
  }

  if (position === 'left' || position === 'center' || position === 'right') {
    return { side: 'bottom', align: position };
  }

  const [side, align] = position.split('-') as [TooltipSide, TooltipAlign];
  return { side, align };
}
