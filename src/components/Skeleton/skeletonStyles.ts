import type { SkeletonSize } from './skeletonTypes';

const sizeClassNames: Record<SkeletonSize, string> = {
  xs: 'h-3',
  sm: 'h-5',
  md: 'h-6',
  lg: 'h-8',
};

export function skeletonClassName({
  size = 'md',
  className,
}: {
  size?: SkeletonSize;
  className?: string;
} = {}) {
  return [
    'w-full max-w-72 animate-pulse rounded-base bg-surface-muted',
    sizeClassNames[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
