import { focusRingOffsetClassName } from '@/styles/focusRing';

export function linkClassName({ className }: { className?: string } = {}) {
  return [
    'relative isolate inline body-2-bold text-text-neutral-primary',
    'before:pointer-events-none before:absolute before:-inset-x-1 before:-inset-y-0.5 before:z-0 before:rounded-sm',
    'before:bg-transparent before:transition-colors before:duration-150',
    'hover:before:bg-background-interactive-hover',
    'active:before:bg-background-interactive-pressed',
    focusRingOffsetClassName,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
