import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { radioGroupClassName } from './radioButtonStyles';
import { RadioGroupContext } from './RadioGroupContext';

export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  /** Accessible name for the group. */
  label?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue'>;

export function RadioGroup({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  disabled = false,
  label,
  children,
  className,
  ...rest
}: RadioGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const name = useId();
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const handleValueChange = (next: string) => {
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  return (
    <RadioGroupContext.Provider
      value={{ value, onValueChange: handleValueChange, disabled, name }}
    >
      <div
        role="radiogroup"
        aria-label={label}
        className={[radioGroupClassName, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
