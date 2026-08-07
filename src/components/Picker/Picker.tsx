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
  pickerTrailingVisibilityClassName,
} from './pickerStyles';

export type PickerProps = {
  value: string;
  title: ReactNode;
  subtitle?: ReactNode;
  leadingSlot?: ReactNode;
  /**
   * Trailing affordance (Figma Trailing slot). Defaults to a check icon.
   * Pass `null` to hide the trailing slot entirely.
   */
  trailingSlot?: ReactNode | null;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value'>;

const defaultTrailingSlot = (
  <IconWrapper size="s">
    <Check aria-hidden />
  </IconWrapper>
);

export function Picker({
  value,
  title,
  subtitle,
  leadingSlot,
  trailingSlot,
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
  const trailing =
    trailingSlot === undefined ? defaultTrailingSlot : trailingSlot;

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
      {trailing != null ? (
        <span
          className={[
            pickerTrailingClassName,
            pickerTrailingVisibilityClassName(selected),
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {trailing}
        </span>
      ) : null}
    </button>
  );
}
