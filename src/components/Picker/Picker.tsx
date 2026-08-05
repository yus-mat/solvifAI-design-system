import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconWrapper } from '@/components/IconWrapper';
import { Check } from '@/icons';
import { usePickerGroupContext } from './PickerGroupContext';
import {
  pickerClassName,
  pickerContentClassName,
  pickerLeadingClassName,
  pickerSubtitleClassName,
  pickerTitleClassName,
  pickerTrailingClassName,
} from './pickerStyles';

export type PickerProps = {
  value: string;
  title: ReactNode;
  subtitle?: ReactNode;
  leadingSlot?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value'>;

export function Picker({
  value,
  title,
  subtitle,
  leadingSlot,
  className,
  type = 'button',
  disabled,
  onClick,
  ...rest
}: PickerProps) {
  const {
    value: selectedValue,
    onValueChange,
    disabled: groupDisabled,
    name,
  } = usePickerGroupContext();
  const selected = selectedValue === value;
  const isDisabled = disabled ?? groupDisabled;

  return (
    <button
      type={type}
      role="radio"
      name={name}
      value={value}
      aria-checked={selected}
      disabled={isDisabled}
      className={pickerClassName({ selected, className })}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !isDisabled) {
          onValueChange(value);
        }
      }}
      {...rest}
    >
      {leadingSlot ? (
        <span className={pickerLeadingClassName}>{leadingSlot}</span>
      ) : null}
      <span className={pickerContentClassName}>
        <span className={pickerTitleClassName}>{title}</span>
        {subtitle ? (
          <span className={pickerSubtitleClassName}>{subtitle}</span>
        ) : null}
      </span>
      {selected ? (
        <span className={pickerTrailingClassName}>
          <IconWrapper size="xs">
            <Check aria-hidden />
          </IconWrapper>
        </span>
      ) : null}
    </button>
  );
}
