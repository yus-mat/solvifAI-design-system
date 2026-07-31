import { focusRingOffsetClassName } from '@/styles/focusRing';
import type { CardType } from './cardTypes';

const insetStrokeMuted =
  'shadow-[inset_0_0_0_1px_var(--border-neutral-muted)]';

const interactiveOverlayClassName = [
  'relative isolate',
  'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit]',
  'before:bg-transparent before:transition-colors before:duration-150',
  'hover:before:bg-background-interactive-hover',
  'focus-visible:before:bg-background-interactive-focus',
  '[&>*]:relative [&>*]:z-[1]',
].join(' ');

export function cardClassName({
  type = 'static',
  padded = true,
  className,
}: {
  type?: CardType;
  padded?: boolean;
  className?: string;
} = {}) {
  return [
    'w-full rounded-lg bg-surface-raise',
    insetStrokeMuted,
    padded ? 'p-4' : '',
    type === 'interactive'
      ? [interactiveOverlayClassName, focusRingOffsetClassName, 'cursor-pointer text-left'].join(' ')
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
