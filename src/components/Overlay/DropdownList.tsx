import type { HTMLAttributes, ReactNode } from 'react';
import { dropdownListClassName } from './overlayStyles';

export type DropdownListProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function DropdownList({
  children,
  className,
  role = 'listbox',
  ...rest
}: DropdownListProps) {
  return (
    <div
      className={[dropdownListClassName, className].filter(Boolean).join(' ')}
      role={role}
      {...rest}
    >
      {children}
    </div>
  );
}
