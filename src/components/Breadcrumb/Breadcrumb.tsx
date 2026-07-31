import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { BreadcrumbItemProps } from './BreadcrumbItem';
import { breadcrumbListClassName } from './breadcrumbStyles';

export type BreadcrumbProps = {
  children: ReactNode;
  'aria-label'?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export function Breadcrumb({
  children,
  className,
  'aria-label': ariaLabel = 'パンくずリスト',
  ...rest
}: BreadcrumbProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <nav aria-label={ariaLabel} className={className} {...rest}>
      <ol className={breadcrumbListClassName}>
        {items.map((child, index) => {
          if (!isValidElement<BreadcrumbItemProps>(child)) return child;

          const isLast = index === items.length - 1;
          const current = child.props.current ?? isLast;

          return cloneElement(child as ReactElement<BreadcrumbItemProps>, {
            key: child.key ?? index,
            current,
            showSeparator: index > 0,
            // Drop href on the current page so it renders as a non-link.
            ...(current ? { href: undefined } : null),
          });
        })}
      </ol>
    </nav>
  );
}
