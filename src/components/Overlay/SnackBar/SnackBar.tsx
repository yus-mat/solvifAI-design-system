import type { HTMLAttributes, ReactNode } from 'react';
import { IconWrapper } from '@/components/IconWrapper';
import { Check, CircleAlert } from '@/icons';
import type { SnackBarType } from './snackBarTypes';
import {
  snackBarClassName,
  snackBarContentClassName,
  snackBarIconClassName,
  snackBarSubtitleClassName,
  snackBarTitleClassName,
} from './snackBarStyles';

export type SnackBarProps = {
  type?: SnackBarType;
  title: ReactNode;
  subtitle?: ReactNode;
  leadingIcon?: ReactNode | null;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

const defaultIcons: Record<SnackBarType, ReactNode> = {
  default: <Check aria-hidden />,
  error: <CircleAlert aria-hidden />,
};

export function SnackBar({
  type = 'default',
  title,
  subtitle,
  leadingIcon,
  className,
  ...rest
}: SnackBarProps) {
  const icon =
    leadingIcon === null
      ? null
      : (leadingIcon ?? defaultIcons[type]);

  return (
    <div
      role="status"
      className={snackBarClassName({ className })}
      {...rest}
    >
      {icon ? (
        <IconWrapper size="md" className={snackBarIconClassName}>
          {icon}
        </IconWrapper>
      ) : null}
      <div className={snackBarContentClassName}>
        <p className={snackBarTitleClassName}>{title}</p>
        {subtitle ? (
          <p className={snackBarSubtitleClassName}>{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
