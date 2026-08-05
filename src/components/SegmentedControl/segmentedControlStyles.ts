import { focusRingOffsetClassName } from '@/styles/focusRing';

export const segmentedControlClassName = [
  'inline-flex gap-1 rounded-lg bg-background-neutral-secondary p-0.5',
].join(' ');

export const segmentedControlItemContentClassName =
  'inline-flex items-center justify-center gap-2';

export const segmentedControlItemLabelRowClassName =
  'inline-flex items-center gap-2';

/** Tone kept for API compat; count labels always use muted secondary styling. */
const trailingSlotToneClassNames = {
  blue: 'text-text-neutral-secondary',
  orange: 'text-text-neutral-secondary',
  default: 'text-text-neutral-secondary',
} as const;

export function segmentedControlItemTrailingSlotClassName({
  tone = 'default',
}: {
  tone?: keyof typeof trailingSlotToneClassNames;
} = {}) {
  return [
    'flex shrink-0 items-center body-2',
    trailingSlotToneClassNames[tone],
  ].join(' ');
}

export function segmentedControlItemClassName({
  selected = false,
  className,
}: {
  selected?: boolean;
  className?: string;
} = {}) {
  return [
    'inline-flex min-w-0 cursor-pointer items-center justify-center rounded-md px-3 py-1.5',
    'text-center whitespace-nowrap transition-colors duration-150',
    'body-2',
    'relative isolate',
    'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit]',
    'before:bg-transparent before:transition-colors before:duration-150',
    !selected && 'hover:before:bg-background-interactive-hover',
    !selected && 'active:before:bg-background-interactive-pressed',
    '[&>*]:relative [&>*]:z-[1]',
    focusRingOffsetClassName,
    selected
      ? 'bg-background-neutral-primary text-text-neutral-primary shadow-sm'
      : 'bg-transparent text-text-neutral-secondary',
    'disabled:cursor-not-allowed disabled:opacity-[0.38] disabled:pointer-events-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
