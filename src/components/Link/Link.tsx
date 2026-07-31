import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { linkClassName } from './linkStyles';

export type LinkProps = {
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Link({ children, className, ...rest }: LinkProps) {
  return (
    <a className={linkClassName({ className })} {...rest}>
      <span className="relative z-[1]">{children}</span>
    </a>
  );
}
