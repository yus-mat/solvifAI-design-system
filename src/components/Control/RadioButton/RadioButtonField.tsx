import type { InputHTMLAttributes, ReactNode } from 'react';
import { RadioButton } from './RadioButton';
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
  ...rest
}: RadioButtonFieldProps) {
  const labelNode = (
    <span className={radioButtonFieldLabelClassName}>{label}</span>
  );

  return (
    <label
      htmlFor={id}
      className={[radioButtonFieldClassName, className].filter(Boolean).join(' ')}
    >
      {labelPosition === 'left' ? labelNode : null}
      <RadioButton id={id} disabled={disabled} {...rest} />
      {labelPosition === 'right' ? labelNode : null}
    </label>
  );
}
