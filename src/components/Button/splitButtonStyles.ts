import {
  baseClassName,
  layeredInteractiveClassName,
  textSizeClassName,
} from './buttonStyles';
import type {
  SplitButtonMenuPlacement,
  SplitButtonVariant,
} from './splitButtonTypes';

/** Single size — Figma SplitButton uses the 32px SM button metrics. */
const SPLIT_SIZE = 'sm' as const;

/**
 * Shared segment chrome — square corners; the group clips to rounded-full so the
 * outer stroke and fill share one radius (no nested-radius hairline gap).
 */
const segmentShell =
  'relative z-[1] !rounded-none bg-transparent shadow-none before:shadow-none before:!rounded-none after:!rounded-none disabled:!opacity-100';

const segmentClassName: Record<SplitButtonVariant, string> = {
  primary: [
    layeredInteractiveClassName,
    'text-text-neutral-inverse',
  ].join(' '),
  secondary: [
    layeredInteractiveClassName,
    'text-text-neutral-primary',
  ].join(' '),
};

/** Primary — gradient on outer frame only; inner ButtonRegular + ButtonIcon are transparent. */
const primaryGroupClassName = [
  'relative isolate inline-flex h-8 items-stretch overflow-hidden rounded-full',
  'shadow-[var(--shadow-button)]',
  'bg-background-action-primary text-text-neutral-inverse',
  'bg-gradient-to-t from-background-action-primary to-background-action-primary-gradient-end',
].join(' ');

/** Secondary — hairline on the shell; ButtonShadow on ::before. */
const secondaryGroupClassName = [
  'relative isolate inline-flex h-8 items-stretch overflow-hidden rounded-full',
  'bg-background-neutral-primary',
  'shadow-[inset_0_0_0_0.5px_var(--border-neutral-muted)]',
  'before:pointer-events-none before:absolute before:inset-0 before:z-[3] before:rounded-[inherit]',
  'before:shadow-[var(--shadow-button)]',
].join(' ');

const groupShellClassName: Record<SplitButtonVariant, string> = {
  primary: primaryGroupClassName,
  secondary: secondaryGroupClassName,
};

const dividerColorClassName: Record<SplitButtonVariant, string> = {
  primary: '!bg-white/25',
  secondary: 'bg-border-neutral-muted',
};

/**
 * Menu trigger — stretch to group height; 6px against the divider and 10px at the
 * pill's right cap. Figma models that extra 4px as padding on the group, but the
 * group clips its segments, so carrying it on the segment instead keeps the
 * hover/pressed overlay flush with the rounded end.
 */
const splitMenuSizeClassName = 'self-stretch !py-0 pl-1.5 pr-2.5';

export const splitButtonDividerWrapperClassName =
  'relative z-[1] flex items-center self-stretch py-2';

/** Menu panel — right-aligned, 8px gap (spacing-2) above or below the trigger. */
export function splitButtonMenuPanelClassName(
  placement: SplitButtonMenuPlacement = 'below',
) {
  const positionClass =
    placement === 'above'
      ? 'bottom-full mb-2'
      : 'top-full mt-2';

  return ['absolute right-0 z-50 w-max max-w-[280px]', positionClass].join(' ');
}

export function splitButtonGroupClassName(
  variant: SplitButtonVariant,
  disabled = false,
) {
  return [
    groupShellClassName[variant],
    disabled ? 'cursor-not-allowed opacity-[0.38]' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function splitButtonMainClassName({
  variant,
  className,
}: {
  variant: SplitButtonVariant;
  className?: string;
}) {
  return [
    baseClassName,
    segmentClassName[variant],
    segmentShell,
    textSizeClassName[SPLIT_SIZE],
    // 16px at the pill's left cap vs 12px against the divider — the rounded cap
    // eats into the flat gap, so an even 12/12 reads as right-heavy.
    '!pl-4',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function splitButtonMenuClassName({
  variant,
  className,
}: {
  variant: SplitButtonVariant;
  className?: string;
}) {
  return [
    baseClassName,
    segmentClassName[variant],
    segmentShell,
    splitMenuSizeClassName,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function splitButtonDividerClassName(variant: SplitButtonVariant) {
  return dividerColorClassName[variant];
}
