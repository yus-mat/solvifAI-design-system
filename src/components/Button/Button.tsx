import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconWrapper, buttonIconWrapperSize } from '@/components/IconWrapper';
import { LoaderCircle } from '@/icons';
import { buttonClassName } from './buttonStyles';
import type { ButtonEmphasis, ButtonIntent, ButtonSize } from './buttonTypes';

export type ButtonProps = {
  emphasis?: ButtonEmphasis;
  intent?: ButtonIntent;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export type { ButtonEmphasis, ButtonIntent, ButtonSize } from './buttonTypes';

export function Button({
  emphasis = 'primary',
  intent = 'default',
  size = 'md',
  leadingIcon,
  trailingIcon,
  loading = false,
  children,
  className,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={buttonClassName({
        emphasis,
        intent,
        size,
        loading,
        className,
      })}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <IconWrapper
          size={buttonIconWrapperSize[size]}
          className="animate-spin"
        >
          <LoaderCircle aria-hidden />
        </IconWrapper>
      ) : (
        <>
          {leadingIcon ? (
            <IconWrapper size={buttonIconWrapperSize[size]}>
              {leadingIcon}
            </IconWrapper>
          ) : null}
          <span className="break-words">{children}</span>
          {trailingIcon ? (
            <span className="flex size-3.5 shrink-0 items-center justify-center [&_svg]:size-full">
              {trailingIcon}
            </span>
          ) : null}
        </>
      )}
    </button>
  );
}
