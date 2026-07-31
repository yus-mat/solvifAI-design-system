import type { HTMLAttributes } from 'react';
import { indicatorClassName } from './indicatorStyles';
import type { IndicatorVariant } from './indicatorTypes';

export type IndicatorProps = {
  variant?: IndicatorVariant;
  'aria-label'?: string;
} & HTMLAttributes<HTMLSpanElement>;

export function Indicator({
  variant = 'blue',
  className,
  'aria-label': ariaLabel,
  ...rest
}: IndicatorProps) {
  return (
    <span
      className={indicatorClassName({ variant, className })}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      {...rest}
    >
      {variant === 'orange' ? (
        <img
          src="/icons/indicator-warning.svg"
          alt=""
          className="size-3"
          aria-hidden
        />
      ) : (
        <span className="block size-3 rounded-full bg-user-3-bg" />
      )}
    </span>
  );
}
