import type { TooltipAlign, TooltipPlacement, TooltipSide, TooltipVAlign } from './tooltipTypes';

// ── Top/bottom layouts ────────────────────────────────────────────────────────

const pointerRowAlignClassNames: Record<TooltipAlign, string> = {
  left: 'justify-start pl-4',
  center: 'justify-center',
  right: 'justify-end pr-4',
};

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

// ── Left/right layouts ────────────────────────────────────────────────────────

const pointerColAlignClassNames: Record<TooltipVAlign, string> = {
  top: 'justify-start pt-4',
  center: 'justify-center',
  bottom: 'justify-end pb-4',
};

export function tooltipPointerColClassName({
  align = 'center',
}: {
  align?: TooltipVAlign;
} = {}) {
  return [
    'relative z-[1] flex w-[7px] shrink-0 flex-col leading-none',
    pointerColAlignClassNames[align],
  ].join(' ');
}

// ── Body ─────────────────────────────────────────────────────────────────────

export function tooltipBodyClassName({
  side = 'bottom',
}: {
  side?: TooltipSide;
} = {}) {
  const tuck =
    side === 'top'
      ? '-mb-0.5'
      : side === 'bottom'
        ? '-mt-0.5'
        : side === 'right'
          ? '-ml-0.5'
          : '-mr-0.5'; // left

  return [
    'relative z-0 w-full rounded-md bg-background-neutral-inverse px-3 py-2',
    'caption text-text-neutral-inverse',
    tuck,
  ].join(' ');
}

// ── Container ─────────────────────────────────────────────────────────────────

export function tooltipContainerClassName({
  side = 'bottom',
}: {
  side?: TooltipSide;
} = {}) {
  const isHorizontal = side === 'left' || side === 'right';
  return isHorizontal
    ? 'inline-flex w-max max-w-xs flex-row items-stretch'
    : 'inline-flex w-max max-w-xs flex-col';
}

/** @deprecated Use tooltipContainerClassName instead. */
export const tooltipClassName = 'inline-flex w-max max-w-xs flex-col';

// ── Trigger panel positioning ─────────────────────────────────────────────────

/**
 * Offset from trigger to the near edge of the floating panel.
 */
const tooltipTriggerSideClassNames: Record<TooltipSide, string> = {
  top: 'bottom-full mb-1',
  bottom: 'top-full mt-1',
  right: 'left-full ml-1',
  left: 'right-full mr-1',
};

/**
 * Horizontal alignment of the panel relative to the trigger (top/bottom sides).
 * Keeps the caret tip centred on the trigger; body grows away from the near edge.
 * Offset = pl-4/pr-4 (16px) + half of the 14px caret = 23px.
 */
const tooltipTriggerHAlignClassNames: Record<TooltipAlign, string> = {
  left: 'left-1/2 right-auto -translate-x-[23px]',
  center: 'left-1/2 right-auto -translate-x-1/2',
  right: 'right-1/2 left-auto translate-x-[23px]',
};

/**
 * Vertical alignment of the panel relative to the trigger (left/right sides).
 * Offset = pt-4/pb-4 (16px) + half of the 14px caret = 23px.
 */
const tooltipTriggerVAlignClassNames: Record<TooltipVAlign, string> = {
  top: 'top-1/2 bottom-auto -translate-y-[23px]',
  center: 'top-1/2 bottom-auto -translate-y-1/2',
  bottom: 'bottom-1/2 top-auto translate-y-[23px]',
};

export function tooltipTriggerPanelClassName(placement: TooltipPlacement) {
  const { side } = placement;
  const isHorizontal = side === 'left' || side === 'right';

  const alignClass = isHorizontal
    ? tooltipTriggerVAlignClassNames[(placement as { side: 'left' | 'right'; align: 'top' | 'center' | 'bottom' }).align]
    : tooltipTriggerHAlignClassNames[(placement as { side: 'top' | 'bottom'; align: TooltipAlign }).align];

  return [
    'pointer-events-none absolute z-50 w-max max-w-xs',
    tooltipTriggerSideClassNames[side],
    alignClass,
  ].join(' ');
}
