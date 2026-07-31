import type { HTMLAttributes, ReactNode } from 'react';
import type { IconWrapperSize } from './iconWrapperTypes';
import {
  iconWrapperClassName,
  iconWrapperIconClassName,
} from './iconWrapperStyles';

export type IconWrapperProps = {
  size?: IconWrapperSize;
  iconClassName?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export function IconWrapper({
  size = 'md',
  iconClassName,
  children,
  className,
  ...rest
}: IconWrapperProps) {
  return (
    <span
      className={iconWrapperClassName({ size, className })}
      aria-hidden
      {...rest}
    >
      <span
        className={[iconWrapperIconClassName(size), iconClassName]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </span>
    </span>
  );
}
