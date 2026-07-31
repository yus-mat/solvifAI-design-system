import type { FadeType } from './fadeTypes';

const gradientClassNames: Record<FadeType, string> = {
  primary:
    'bg-gradient-to-t from-surface-default from-30% to-transparent',
  secondary:
    'bg-gradient-to-t from-background-neutral-muted from-30% to-transparent',
};

export function fadeClassName({
  type = 'primary',
  className,
}: {
  type?: FadeType;
  className?: string;
} = {}) {
  return [
    'pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center px-0 py-3',
    gradientClassNames[type],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const fadeButtonWrapperClassName = 'pointer-events-auto';
