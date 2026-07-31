import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { pickerGroupClassName } from './pickerStyles';
import { PickerGroupContext } from './PickerGroupContext';

export type PickerGroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function PickerGroup({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  disabled = false,
  children,
  className,
  ...rest
}: PickerGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const name = useId();
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const handleValueChange = (next: string) => {
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  return (
    <PickerGroupContext.Provider
      value={{ value, onValueChange: handleValueChange, disabled, name }}
    >
      <div
        role="radiogroup"
        className={[pickerGroupClassName, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </div>
    </PickerGroupContext.Provider>
  );
}
