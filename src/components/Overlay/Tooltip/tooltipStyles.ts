import type { TooltipAlign, TooltipSide } from './tooltipTypes';

const pointerRowAlignClassNames: Record<TooltipAlign, string> = {
  left: 'justify-start pl-4',
  center: 'justify-center',
  right: 'justify-end pr-4',
};

export const tooltipClassName = 'inline-flex w-max max-w-xs flex-col';

export function tooltipPointerRowClassName({
  align = 'center',
}: {
  align?: TooltipAlign;
} = {}) {
  return [
    'relative z-[1] flex h-[7px] w-full shrink-0 leading-none',
    pointerRowAlignClassNames[align],
  ].join(' ');
}

export function tooltipBodyClassName({
  side = 'bottom',
}: {
  side?: TooltipSide;
} = {}) {
  return [
    'relative z-0 w-full rounded-md bg-background-neutral-inverse px-3 py-2',
    'caption text-text-neutral-inverse',
    // Tuck under the caret so trigger→body gap stays in the 8–12px range.
    side === 'top' ? '-mb-0.5' : '-mt-0.5',
  ].join(' ');
}

/**
 * Anchor the floating panel to the trigger.
 * - left: panel's left edge = trigger left (body grows right)
 * - center: panel centered on trigger
 * - right: panel's right edge = trigger right (body grows left — use near viewport right edge)
 */
const tooltipTriggerAlignClassNames: Record<TooltipAlign, string> = {
  left: 'left-0 right-auto translate-x-0',
  center: 'left-1/2 right-auto -translate-x-1/2',
  right: 'right-0 left-auto translate-x-0',
};

/**
 * Offset from trigger to caret tip.
 * 4px tip gap + 6px caret − 2px body tuck ≈ 8px to the bubble (target 8–12px).
 */
const tooltipTriggerSideClassNames: Record<TooltipSide, string> = {
  top: 'bottom-full mb-1',
  bottom: 'top-full mt-1',
};

export function tooltipTriggerPanelClassName({
  side = 'bottom',
  align = 'center',
}: {
  side?: TooltipSide;
  align?: TooltipAlign;
} = {}) {
  return [
    'pointer-events-none absolute z-50 w-max max-w-xs',
    tooltipTriggerSideClassNames[side],
    tooltipTriggerAlignClassNames[align],
  ].join(' ');
}
