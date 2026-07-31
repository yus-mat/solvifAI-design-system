import type { NotificationBadgeType } from './notificationBadgeTypes';

const typeClassNames: Record<NotificationBadgeType, string> = {
  alert: 'bg-background-danger-primary text-text-neutral-inverse',
  neutral:
    'bg-background-neutral-secondary text-text-neutral-primary shadow-[inset_0_0_0_1px_var(--border-neutral-muted)]',
};

export function notificationBadgeClassName({
  type = 'alert',
  className,
}: {
  type?: NotificationBadgeType;
  className?: string;
} = {}) {
  return [
    'inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5',
    'caption-bold whitespace-nowrap',
    typeClassNames[type],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const notificationBadgeDotClassName = [
  'inline-block size-2 rounded-full bg-background-danger-primary',
].join(' ');
