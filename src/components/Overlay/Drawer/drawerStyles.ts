import type { DrawerSize } from './drawerTypes';
import {
  motionAppearDurationClassName,
  motionAppearEaseClassName,
  motionReduceClassName,
} from '@/styles/motion';

const sizeClassNames: Record<DrawerSize, string> = {
  sm: 'w-full max-w-[380px] rounded-l-lg',
  md: 'w-full max-w-[680px] rounded-l-lg',
  // Keep an explicit max-width so md ↔ lg can interpolate smoothly.
  lg: 'w-full max-w-[100vw] rounded-none',
};

export function drawerClassName({
  size = 'sm',
  open = true,
  className,
}: {
  size?: DrawerSize;
  open?: boolean;
  className?: string;
} = {}) {
  return [
    'fixed top-0 right-0 z-50',
    'flex h-screen min-h-0 flex-col overflow-clip bg-surface-raise shadow-md',
    'transition-[transform,max-width,border-radius]',
    motionAppearDurationClassName,
    motionAppearEaseClassName,
    motionReduceClassName,
    open ? 'translate-x-0' : 'pointer-events-none translate-x-full',
    sizeClassNames[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const drawerHeaderClassName = [
  'flex shrink-0 items-center justify-between gap-4',
  'border-b border-border-neutral-muted px-4 py-3',
].join(' ');

export const drawerTitleGroupClassName = 'flex min-w-0 flex-1 flex-col gap-0.5';

export const drawerTitleClassName =
  'm-0 heading-3 text-text-neutral-primary';

export const drawerSubtitleClassName =
  'm-0 caption text-text-neutral-muted';

export const drawerHeaderActionsClassName =
  'flex shrink-0 items-center gap-2';

export const drawerBodyClassName =
  'flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-4 pb-6';

export const drawerFooterClassName = 'shrink-0 px-6 py-4';

export const drawerFooterActionsClassName =
  'flex flex-wrap items-center justify-end gap-2';
