import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconWrapper } from '@/components/IconWrapper';
import { AlignEndVertical } from '@/icons';
import {
  segmentedControlItemClassName,
  segmentedControlItemContentClassName,
  segmentedControlItemLabelRowClassName,
  segmentedControlItemTrailingSlotClassName,
} from './segmentedControlStyles';
import { useSegmentedControlContext } from './SegmentedControlContext';

export type SegmentedControlItemTrailingSlotTone = 'blue' | 'orange' | 'default';

export type SegmentedControlItemProps = {
  value: string;
  children: ReactNode;
  showIcon?: boolean;
  icon?: ReactNode;
  trailingSlot?: ReactNode;
  trailingSlotTone?: SegmentedControlItemTrailingSlotTone;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function SegmentedControlItem({
  value,
  children,
  showIcon = true,
  icon,
  trailingSlot,
  trailingSlotTone = 'default',
  className,
  disabled,
  type = 'button',
  ...rest
}: SegmentedControlItemProps) {
  const { value: selectedValue, onValueChange, disabled: groupDisabled } =
    useSegmentedControlContext();
  const selected = selectedValue === value;
  const isDisabled = disabled ?? groupDisabled;

  return (
    <button
      type={type}
      role="tab"
      aria-selected={selected}
      disabled={isDisabled}
      className={segmentedControlItemClassName({ selected, className })}
      onClick={(event) => {
        rest.onClick?.(event);
        if (!event.defaultPrevented && !isDisabled) {
          onValueChange(value);
        }
      }}
      {...rest}
    >
      <span className={segmentedControlItemContentClassName}>
        <span className={segmentedControlItemLabelRowClassName}>
          {showIcon ? (
            <IconWrapper size="md">
              {icon ?? <AlignEndVertical aria-hidden />}
            </IconWrapper>
          ) : null}
          <span>{children}</span>
        </span>
        {trailingSlot ? (
          <span
            className={segmentedControlItemTrailingSlotClassName({
              tone: trailingSlotTone,
            })}
          >
            {trailingSlot}
          </span>
        ) : null}
      </span>
    </button>
  );
}
