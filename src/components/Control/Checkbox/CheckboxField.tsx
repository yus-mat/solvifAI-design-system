import type { InputHTMLAttributes, ReactNode } from 'react';
import { Checkbox } from './Checkbox';
import type { CheckboxLabelPosition } from './checkboxTypes';
import {
  checkboxFieldClassName,
  checkboxFieldLabelClassName,
} from './checkboxStyles';

export type CheckboxFieldProps = {
  label: ReactNode;
  labelPosition?: CheckboxLabelPosition;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function CheckboxField({
  label,
  labelPosition = 'right',
  id,
  className,
  disabled,
  ...rest
}: CheckboxFieldProps) {
  const labelNode = (
    <span className={checkboxFieldLabelClassName}>{label}</span>
  );

  return (
    <label
      htmlFor={id}
      className={[checkboxFieldClassName, className].filter(Boolean).join(' ')}
    >
      {labelPosition === 'left' ? labelNode : null}
      <Checkbox id={id} disabled={disabled} {...rest} />
      {labelPosition === 'right' ? labelNode : null}
    </label>
  );
}
