import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { IconWrapper } from '@/components/IconWrapper';
import { CalendarDays } from '@/icons';
import {
  dateInputClassName,
  dateInputWrapperClassName,
} from './inputStyles';

export type DateInputProps = {
  invalid?: boolean;
  wrapperClassName?: string;
  /** Leading calendar icon. Default: built-in icon. Pass `null` to hide. */
  icon?: ReactNode | null;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>;

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput(
    {
      invalid = false,
      wrapperClassName,
      className,
      disabled,
      icon,
      'aria-invalid': ariaInvalid,
      ...rest
    },
    ref,
  ) {
    const isInvalid =
      invalid || ariaInvalid === true || ariaInvalid === 'true';

    const showIcon = icon !== null;
    const iconNode =
      icon === undefined ? (
        <IconWrapper size="md" className="shrink-0 text-text-neutral-muted">
          <CalendarDays aria-hidden />
        </IconWrapper>
      ) : (
        icon
      );

    return (
      <div
        className={dateInputWrapperClassName({
          invalid: isInvalid,
          disabled,
          className: wrapperClassName,
        })}
      >
        {showIcon ? iconNode : null}
        <input
          ref={ref}
          type="date"
          className={[dateInputClassName, className].filter(Boolean).join(' ')}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          {...rest}
        />
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';
