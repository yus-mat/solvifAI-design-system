export function answerPanelClassName({ className }: { className?: string } = {}) {
  return [
    'relative flex w-full max-w-[1120px] max-h-[600px] flex-col overflow-hidden',
    'rounded-xl border border-border-neutral-muted bg-surface-raise shadow-md',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const answerPanelHeaderClassName =
  'flex shrink-0 items-start justify-between gap-2 p-4';

export const answerPanelTitleGroupClassName =
  'flex min-w-0 flex-1 flex-col justify-center gap-0.5';

export const answerPanelCaptionClassName =
  'm-0 caption text-text-neutral-secondary';

export const answerPanelTitleClassName =
  'm-0 body-1-bold text-text-neutral-primary';

export const answerPanelSubtitleClassName =
  'm-0 caption text-text-neutral-secondary';

export const answerPanelActionsClassName =
  'flex shrink-0 items-center justify-end';

export const answerPanelStepControlClassName =
  'flex items-center gap-1';

export const answerPanelStepLabelClassName =
  'm-0 caption whitespace-nowrap text-text-neutral-secondary';

export const answerPanelBodyClassName =
  'flex min-h-0 flex-1 flex-col overflow-y-auto p-4';

export const answerPanelFooterClassName = 'shrink-0 px-4 py-3';

export const answerPanelFooterRowClassName =
  'flex w-full flex-wrap items-center gap-2';

export const answerPanelFooterActionsClassName =
  'ml-auto flex flex-wrap items-center justify-end gap-2';
