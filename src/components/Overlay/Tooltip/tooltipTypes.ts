export type TooltipAlign = 'left' | 'center' | 'right';

export type TooltipVAlign = 'top' | 'center' | 'bottom';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * Primary placements: side of trigger + alignment along that side.
 *
 * For `top`/`bottom` sides, alignment is horizontal: `left | center | right`.
 * For `left`/`right` sides, alignment is vertical: `top | center | bottom`.
 */
export type TooltipAnchoredPosition =
  | `${'top' | 'bottom'}-${TooltipAlign}`
  | `${'left' | 'right'}-${TooltipVAlign}`;

/**
 * Placement relative to the trigger.
 *
 * Preferred:
 * - `top-left` | `top-center` | `top-right`
 * - `bottom-left` | `bottom-center` | `bottom-right`
 * - `right-top` | `right-center` | `right-bottom`
 * - `left-top` | `left-center` | `left-bottom`
 *
 * Shorthand:
 * - `top` / `bottom` → `*-center`
 * - `left` / `center` / `right` → `bottom-*` (legacy)
 */
export type TooltipPosition =
  | TooltipAnchoredPosition
  | 'top'
  | 'bottom'
  | TooltipAlign;

export type TooltipPlacement =
  | { side: 'top' | 'bottom'; align: TooltipAlign }
  | { side: 'left' | 'right'; align: TooltipVAlign };

export const TOOLTIP_ANCHORED_POSITIONS: TooltipAnchoredPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'right-top',
  'right-center',
  'right-bottom',
  'left-top',
  'left-center',
  'left-bottom',
];

export function resolveTooltipPlacement(
  position: TooltipPosition = 'bottom-center',
): TooltipPlacement {
  if (position === 'top' || position === 'bottom') {
    return { side: position, align: 'center' };
  }

  // Legacy shorthands → bottom-*
  if (position === 'left' || position === 'center' || position === 'right') {
    return { side: 'bottom', align: position };
  }

  const [side, align] = position.split('-') as [TooltipSide, TooltipAlign & TooltipVAlign];

  if (side === 'left' || side === 'right') {
    const vAlign = (align as TooltipVAlign | undefined) ?? 'center';
    return { side, align: vAlign };
  }

  return { side, align: align ?? 'center' };
}
