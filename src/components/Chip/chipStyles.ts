import {
  focusInsetStrokeAction,
  rovingFocusRingInsetClassName,
} from '@/styles/focusRing';

const insetStrokeMuted = 'shadow-[inset_0_0_0_1px_var(--border-neutral-muted)]';
const insetStrokeAction = 'shadow-[inset_0_0_0_1px_var(--border-action-primary)]';

export const chipRemoveButtonClassName =
  'size-4 shrink-0 p-0 text-text-neutral-secondary';

export function chipClassName({
  disabled = false,
  focused = false,
  className,
}: {
  disabled?: boolean;
  focused?: boolean;
  className?: string;
} = {}) {
  return [
    'inline-flex max-w-full items-center gap-1.5 rounded-base p-1',
    'relative isolate bg-background-neutral-primary',
    'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit]',
    'before:bg-transparent before:transition-colors before:duration-150',
    'hover:before:bg-background-interactive-hover',
    'active:before:bg-background-interactive-pressed',
    'transition-[box-shadow] duration-150',
    focused
      ? [insetStrokeAction, rovingFocusRingInsetClassName].join(' ')
      : insetStrokeMuted,
    'hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
    disabled ? 'cursor-not-allowed opacity-[0.38] pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function chipGroupClassName({
  inline = false,
  hasActiveChip = false,
  className,
}: {
  inline?: boolean;
  hasActiveChip?: boolean;
  className?: string;
} = {}) {
  const base = 'flex flex-wrap items-center';

  if (inline) {
    return [base, 'gap-1', className].filter(Boolean).join(' ');
  }

  return [
    base,
    'gap-1.5 rounded-base p-1',
    insetStrokeMuted,
    'transition-[box-shadow] duration-150',
    'focus:outline-none',
    hasActiveChip
      ? ''
      : focusInsetStrokeAction,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
