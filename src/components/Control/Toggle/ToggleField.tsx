import { useId, type ReactNode } from 'react';
import { Toggle, type ToggleProps } from './Toggle';
import type { ToggleLabelPosition } from './toggleTypes';
import {
  toggleFieldClassName,
  toggleFieldLabelClassName,
} from './toggleStyles';

export type ToggleFieldProps = {
  label: ReactNode;
  labelPosition?: ToggleLabelPosition;
} & Omit<ToggleProps, 'aria-label' | 'aria-labelledby'>;

export function ToggleField({
  label,
  labelPosition = 'right',
  className,
  disabled,
  ...rest
}: ToggleFieldProps) {
  const labelId = useId();
  const labelNode = (
    <span id={labelId} className={toggleFieldLabelClassName}>
      {label}
    </span>
  );

  return (
    <label
      className={[toggleFieldClassName, className].filter(Boolean).join(' ')}
    >
      {labelPosition === 'left' ? labelNode : null}
      <Toggle disabled={disabled} aria-labelledby={labelId} {...rest} />
      {labelPosition === 'right' ? labelNode : null}
    </label>
  );
}
