import type { HTMLAttributes } from 'react';
import type { NotificationBadgeType } from './notificationBadgeTypes';
import {
  notificationBadgeClassName,
  notificationBadgeDotClassName,
} from './notificationBadgeStyles';

export type NotificationBadgeProps = {
  type?: NotificationBadgeType;
  /** When omitted, renders a dot indicator. Values over 99 display as `99+`. */
  count?: number;
} & HTMLAttributes<HTMLSpanElement>;

function formatCount(count: number) {
  if (count > 99) return '99+';
  return String(count);
}

export function NotificationBadge({
  type = 'alert',
  count,
  className,
  ...rest
}: NotificationBadgeProps) {
  if (count === undefined) {
    return (
      <span
        className={[notificationBadgeDotClassName, className].filter(Boolean).join(' ')}
        aria-hidden="true"
        {...rest}
      />
    );
  }

  return (
    <span
      className={notificationBadgeClassName({ type, className })}
      {...rest}
    >
      {formatCount(count)}
    </span>
  );
}
