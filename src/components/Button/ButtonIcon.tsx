import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconWrapper, buttonIconOnlyWrapperSize } from '@/components/IconWrapper';
import { TooltipTrigger } from '@/components/Overlay/Tooltip';
import type { TooltipPosition } from '@/components/Overlay/Tooltip';
import { Send } from '@/icons';
import { buttonIconClassName } from './buttonStyles';
import type { ButtonEmphasis, ButtonIntent, ButtonSize } from './buttonTypes';

export type ButtonIconProps = {
  emphasis?: ButtonEmphasis;
  intent?: ButtonIntent;
  size?: ButtonSize;
  icon?: ReactNode;
  /** Hover/focus tooltip. Defaults to `aria-label` when omitted. Pass `false` to disable. */
  tooltip?: ReactNode | false;
  /**
   * Tooltip placement. Prefer `top-*` / `bottom-*`.
   * Near the right edge of the viewport/panel, use `bottom-right` or `top-right`
   * so the body grows left and is not clipped.
   */
  tooltipPosition?: TooltipPosition;
  'aria-label': string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function ButtonIcon({
  emphasis = 'primary',
  intent = 'default',
  size = 'md',
  icon,
  tooltip,
  tooltipPosition = 'bottom-center',
  className,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
  ...rest
}: ButtonIconProps) {
  const iconNode = icon ?? <Send aria-hidden />;

  const button = (
    <button
      type={type}
      aria-label={ariaLabel}
      className={buttonIconClassName({ emphasis, intent, size, className })}
      disabled={disabled}
      {...rest}
    >
      <IconWrapper
        size={buttonIconOnlyWrapperSize[size]}
      >
        {iconNode}
      </IconWrapper>
    </button>
  );

  const tooltipContent = tooltip === undefined ? ariaLabel : tooltip;
  if (tooltipContent == null || tooltipContent === false) {
    return button;
  }

  return (
    <TooltipTrigger content={tooltipContent} position={tooltipPosition}>
      {button}
    </TooltipTrigger>
  );
}
