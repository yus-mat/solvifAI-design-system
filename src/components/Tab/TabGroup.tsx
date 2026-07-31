import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { tabGroupClassName } from './tabStyles';
import type { TabProps } from './Tab';

export type TabGroupProps = {
  value: number;
  onChange: (index: number) => void;
  children: ReactNode;
  'aria-label'?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export function TabGroup({
  value,
  onChange,
  children,
  className,
  'aria-label': ariaLabel = 'タブ',
  ...rest
}: TabGroupProps) {
  let index = 0;

  const tabs = Children.map(children, (child) => {
    if (!isValidElement<TabProps>(child)) return child;

    const tabIndex = index;
    index += 1;

    return cloneElement(child as ReactElement<TabProps>, {
      active: value === tabIndex,
      onSelect: () => onChange(tabIndex),
    });
  });

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={[tabGroupClassName, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {tabs}
    </div>
  );
}

export type { TabProps };
