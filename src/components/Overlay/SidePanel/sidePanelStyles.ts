import type { SidePanelVariant } from './sidePanelTypes';

export function sidePanelClassName({
  className,
  variant = 'floating',
}: { className?: string; variant?: SidePanelVariant } = {}) {
  return [
    'relative flex h-full min-h-0 flex-col overflow-hidden',
    'border-border-neutral-muted bg-surface-default shadow-md',
    variant === 'full-bleed' ? 'border-l' : 'rounded-2xl border',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const sidePanelResizeHandleClassName =
  'absolute top-0 z-10 h-full w-2 cursor-col-resize touch-none';

export function sidePanelResizeHandlePositionClassName(edge: 'start' | 'end') {
  return edge === 'start' ? '-left-1' : '-right-1';
}

export const sidePanelHeaderClassName = [
  'sticky top-0 z-[1] shrink-0 border-b border-border-neutral-muted',
  'flex items-center justify-between gap-2 px-4 pb-[17px] pt-4',
].join(' ');

export const sidePanelTitleGroupClassName =
  'flex min-w-0 flex-1 flex-col gap-0.5';

export const sidePanelTitleClassName =
  'm-0 body-1-bold text-text-neutral-primary';

export const sidePanelSubtitleClassName =
  'm-0 caption text-text-neutral-secondary';

export const sidePanelHeaderActionsClassName =
  'flex shrink-0 items-center gap-2';

export const sidePanelBodyClassName =
  'flex min-h-0 flex-1 flex-col overflow-y-auto p-4';

export const sidePanelFooterClassName = 'shrink-0 p-4';

export const sidePanelFooterActionsClassName = 'w-full';
