import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { RadioButton } from './RadioButton';
import { useRadioGroupContext } from './RadioGroupContext';
import type { RadioButtonLabelPosition } from './radioButtonTypes';
import {
  radioButtonFieldClassName,
  radioButtonFieldLabelClassName,
} from './radioButtonStyles';

export type RadioButtonFieldProps = {
  label: ReactNode;
  labelPosition?: RadioButtonLabelPosition;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function RadioButtonField({
  label,
  labelPosition = 'right',
  id,
  className,
  disabled,
  name,
  value,
  checked,
  onChange,
  ...rest
}: RadioButtonFieldProps) {
  const group = useRadioGroupContext();

  // Inside a RadioGroup the field derives its name/checked state from the group
  // unless the caller drives it explicitly.
  const resolvedName = name ?? group?.name;
  const resolvedDisabled = disabled ?? group?.disabled;
  const resolvedChecked =
    checked ?? (group && value !== undefined ? group.value === value : undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    if (event.defaultPrevented) return;
    if (group && value !== undefined) group.onValueChange(String(value));
  };

  const labelNode = (
    <span className={radioButtonFieldLabelClassName}>{label}</span>
  );

  return (
    <label
      htmlFor={id}
      className={[radioButtonFieldClassName, className].filter(Boolean).join(' ')}
    >
      {labelPosition === 'left' ? labelNode : null}
      <RadioButton
        id={id}
        disabled={resolvedDisabled}
        name={resolvedName}
        value={value}
        checked={resolvedChecked}
        onChange={handleChange}
        {...rest}
      />
      {labelPosition === 'right' ? labelNode : null}
    </label>
  );
}
