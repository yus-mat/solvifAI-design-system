import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { tabClassName, tabLabelClassName, tabLabelRowClassName } from './tabStyles';

export type TabProps = {
  children: ReactNode;
  active?: boolean;
  onSelect?: () => void;
  badge?: ReactNode;
  trailingSlot?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Tab({
  children,
  active = false,
  onSelect,
  badge,
  trailingSlot,
  className,
  type = 'button',
  ...rest
}: TabProps) {
  return (
    <button
      type={type}
      role="tab"
      aria-selected={active}
      className={tabClassName({ active, className })}
      onClick={(event) => {
        rest.onClick?.(event);
        if (!event.defaultPrevented) onSelect?.();
      }}
      {...rest}
    >
      <span className={tabLabelRowClassName}>
        <span className={tabLabelClassName({ active })}>{children}</span>
        {badge}
        {trailingSlot}
      </span>
    </button>
  );
}
