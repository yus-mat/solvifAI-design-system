import type { HTMLAttributes } from 'react';
import type { SkeletonSize } from './skeletonTypes';
import { skeletonClassName } from './skeletonStyles';

export type SkeletonProps = {
  size?: SkeletonSize;
} & HTMLAttributes<HTMLDivElement>;

export function Skeleton({
  size = 'md',
  className,
  ...rest
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={skeletonClassName({ size, className })}
      {...rest}
    />
  );
}
