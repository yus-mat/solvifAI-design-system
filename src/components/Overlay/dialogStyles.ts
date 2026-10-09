import { motionAppearOpacityClassName } from '@/styles/motion';

export const dialogOverlayClassName =
  'pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-6';

export function dialogClassName({
  shown = true,
  className,
}: {
  shown?: boolean;
  className?: string;
} = {}) {
  return [
    'pointer-events-auto flex w-full max-w-[780px] flex-col overflow-clip rounded-2xl bg-surface-raise shadow-md',
    motionAppearOpacityClassName,
    shown ? 'opacity-100' : 'opacity-0',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

/** Figma Dialog header/body/footer all carry an even 16px pad. */
export const dialogHeaderClassName =
  'flex items-center justify-between gap-4 p-4';

export const dialogTitleGroupClassName = 'flex min-w-0 flex-1 flex-col gap-0.5';

export const dialogTitleClassName =
  'm-0 heading-3 text-text-neutral-primary';

export const dialogSubtitleClassName =
  'm-0 caption text-text-neutral-muted';

export const dialogBodyClassName = 'flex flex-col gap-6 px-4 pb-4';

export const dialogFooterClassName = 'p-4';

export const dialogFooterActionsClassName =
  'flex w-full flex-wrap items-center justify-end gap-2';
