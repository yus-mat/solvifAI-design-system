import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { IconWrapper } from '@/components/IconWrapper';
import { ChevronRight } from '@/icons';
import {
  breadcrumbCurrentClassName,
  breadcrumbItemClassName,
  breadcrumbLinkClassName,
  breadcrumbSeparatorClassName,
} from './breadcrumbStyles';

export type BreadcrumbItemProps = {
  children: ReactNode;
  /** Destination for previous pages. Omit (or leave unset by `Breadcrumb`) on the current page. */
  href?: string;
  /** Marks the current page. `Breadcrumb` sets this on the last item by default. */
  current?: boolean;
  /** Show a chevron before this item. Set by `Breadcrumb`. */
  showSeparator?: boolean;
  className?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement> & HTMLAttributes<HTMLSpanElement>,
  'children' | 'href' | 'className'
>;

export function BreadcrumbItem({
  children,
  current = false,
  showSeparator = false,
  href,
  className,
  ...rest
}: BreadcrumbItemProps) {
  const isCurrent = current || href == null || href === '';

  return (
    <li className={breadcrumbItemClassName}>
      {showSeparator ? (
        <IconWrapper size="md" className={breadcrumbSeparatorClassName}>
          <ChevronRight aria-hidden />
        </IconWrapper>
      ) : null}
      {isCurrent ? (
        <span
          className={breadcrumbCurrentClassName({ className })}
          aria-current="page"
          {...rest}
        >
          {children}
        </span>
      ) : (
        <a
          href={href}
          className={breadcrumbLinkClassName({ className })}
          {...rest}
        >
          {children}
        </a>
      )}
    </li>
  );
}
