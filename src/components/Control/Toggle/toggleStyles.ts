import { focusRingOffsetClassName } from '@/styles/focusRing';

export function toggleTrackClassName({
  checked = false,
  className,
}: {
  checked?: boolean;
  className?: string;
} = {}) {
  return [
    'relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full p-[3px]',
    'transition-colors duration-150',
    checked ? 'bg-background-action-primary' : 'bg-background-neutral-muted',
    focusRingOffsetClassName,
    'disabled:cursor-not-allowed disabled:opacity-[0.38]',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
