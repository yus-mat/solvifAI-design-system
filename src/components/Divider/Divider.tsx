import type { HTMLAttributes } from 'react';
import type { DividerOrientation } from './dividerStyles';
import { dividerClassName } from './dividerStyles';

export type DividerProps = {
  orientation?: DividerOrientation;
} & HTMLAttributes<HTMLHRElement>;

export function Divider({
  orientation = 'horizontal',
  className,
  ...rest
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={dividerClassName({ orientation, className })}
      {...rest}
    />
  );
}
