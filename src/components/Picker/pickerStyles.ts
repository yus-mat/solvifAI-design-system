import { focusRingOffsetClassName } from '@/styles/focusRing';

const insetStrokeClassName = (selected: boolean) =>
  selected
    ? 'shadow-[inset_0_0_0_1px_var(--border-action-primary)]'
    : 'shadow-[inset_0_0_0_1px_var(--border-neutral-muted)]';

const interactiveOverlayClassName = [
  'relative isolate',
  'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit]',
  'before:bg-transparent before:transition-colors before:duration-150',
  'hover:before:bg-background-interactive-hover',
  'active:before:bg-background-interactive-pressed',
  '[&>*]:relative [&>*]:z-[1]',
].join(' ');

export function pickerClassName({
  selected = false,
  className,
}: {
  selected?: boolean;
  className?: string;
} = {}) {
  return [
    'group/picker flex w-full min-w-0 cursor-pointer items-center gap-3 rounded-lg bg-background-neutral-primary p-4 text-left',
    insetStrokeClassName(selected),
    interactiveOverlayClassName,
    focusRingOffsetClassName,
    'disabled:cursor-not-allowed disabled:opacity-[0.38] disabled:pointer-events-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const pickerContentClassName = 'flex min-w-0 flex-1 flex-col gap-0.5';

export const pickerTitleClassName =
  'body-2 text-text-neutral-primary';

export const pickerSubtitleClassName =
  'caption text-text-neutral-muted';

export const pickerLeadingClassName = 'flex shrink-0 items-center';

export const pickerTrailingClassName =
  'flex shrink-0 items-center text-text-action-primary';

/** Visible when selected; otherwise only on hover/focus-visible (matches Figma). */
export function pickerTrailingVisibilityClassName(selected: boolean) {
  return selected
    ? ''
    : 'hidden group-hover/picker:flex group-focus-visible/picker:flex';
}

export const pickerGroupClassName = 'flex w-full flex-col gap-3';

