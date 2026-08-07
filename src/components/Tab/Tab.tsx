import {
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import {
  handleRovingTablistKeyDown,
  queryTablistTabs,
} from '@/components/rovingTablist';
import {
  tabClassName,
  tabGroupClassName,
  tabLabelClassName,
  tabLabelRowClassName,
} from './tabStyles';

export type TabItem = {
  label: ReactNode;
  badge?: ReactNode;
  trailingSlot?: ReactNode;
  disabled?: boolean;
};

export type TabProps = {
  value: number;
  onChange: (index: number) => void;
  items: TabItem[];
  'aria-label'?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export function Tab({
  value,
  onChange,
  items,
  className,
  onKeyDown,
  'aria-label': ariaLabel = 'タブ',
  ...rest
}: TabProps) {
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const list = listRef.current;
    if (!list) return;

    const tabElements = queryTablistTabs(list);
    const count = tabElements.length;
    if (count === 0) return;

    const activeEl = document.activeElement as HTMLElement | null;
    const focusedIndex = tabElements.findIndex((tab) => tab === activeEl);
    const currentIndex = focusedIndex >= 0 ? focusedIndex : value;

    handleRovingTablistKeyDown(event, {
      currentIndex,
      count,
      onMove: (nextIndex) => {
        const item = items[nextIndex];
        if (item?.disabled) return;
        onChange(nextIndex);
        requestAnimationFrame(() => {
          queryTablistTabs(list)[nextIndex]?.focus({ preventScroll: true });
        });
      },
    });
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      className={[tabGroupClassName, className].filter(Boolean).join(' ')}
      {...rest}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => {
        const active = value === index;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            tabIndex={item.disabled ? -1 : 0}
            className={tabClassName({ active })}
            onClick={() => {
              if (!item.disabled) onChange(index);
            }}
          >
            <span className={tabLabelRowClassName}>
              <span className={tabLabelClassName({ active })}>{item.label}</span>
              {item.badge}
              {item.trailingSlot}
            </span>
          </button>
        );
      })}
    </div>
  );
}
