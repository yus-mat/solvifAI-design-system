import {
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import {
  handleRovingTablistKeyDown,
  queryTablistTabs,
} from '@/components/rovingTablist';
import { segmentedControlClassName } from './segmentedControlStyles';
import { SegmentedControlContext } from './SegmentedControlContext';

export type SegmentedControlProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function SegmentedControl({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  disabled = false,
  children,
  className,
  onKeyDown,
  ...rest
}: SegmentedControlProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;
  const listRef = useRef<HTMLDivElement>(null);

  const handleValueChange = (next: string) => {
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;

    const list = listRef.current;
    if (!list) return;

    const tabElements = queryTablistTabs(list);
    const count = tabElements.length;
    if (count === 0) return;

    const values = tabElements.map(
      (tab) => tab.getAttribute('data-value') ?? '',
    );
    const activeEl = document.activeElement as HTMLElement | null;
    const focusedIndex = tabElements.findIndex((tab) => tab === activeEl);
    const selectedIndex = values.indexOf(value);
    const currentIndex =
      focusedIndex >= 0
        ? focusedIndex
        : selectedIndex >= 0
          ? selectedIndex
          : 0;

    handleRovingTablistKeyDown(event, {
      currentIndex,
      count,
      onMove: (nextIndex) => {
        const nextValue = values[nextIndex];
        if (!nextValue) return;
        handleValueChange(nextValue);
        requestAnimationFrame(() => {
          const nextTabs = queryTablistTabs(list);
          nextTabs[nextIndex]?.focus({ preventScroll: true });
        });
      },
    });
  }

  return (
    <SegmentedControlContext.Provider
      value={{ value, onValueChange: handleValueChange, disabled }}
    >
      <div
        ref={listRef}
        role="tablist"
        className={[segmentedControlClassName, className]
          .filter(Boolean)
          .join(' ')}
        {...rest}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}
