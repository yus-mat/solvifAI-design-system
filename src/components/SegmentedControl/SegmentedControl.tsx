import { useState, type HTMLAttributes, type ReactNode } from 'react';
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
  ...rest
}: SegmentedControlProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const handleValueChange = (next: string) => {
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  return (
    <SegmentedControlContext.Provider
      value={{ value, onValueChange: handleValueChange, disabled }}
    >
      <div
        role="tablist"
        className={[segmentedControlClassName, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}
