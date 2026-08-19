import type { InfoBlockType } from './infoBlockTypes';

const containerClassNames: Record<InfoBlockType, string> = {
  default: 'bg-background-neutral-secondary',
  error: 'bg-background-function-error-subtle',
  success: 'bg-background-function-success-subtle',
  info: 'bg-background-function-info-subtle',
  brand: 'bg-background-action-secondary',
  accent: 'bg-background-function-accent-subtle',
  warning: 'bg-background-function-warning-subtle',
};

const iconClassNames: Record<InfoBlockType, string> = {
  default: 'text-text-neutral-primary',
  error: 'text-text-function-error',
  success: 'text-text-function-success',
  info: 'text-text-function-info',
  brand: 'text-text-action-primary',
  accent: 'text-text-function-emphasis',
  warning: 'text-text-function-warning',
};

export function infoBlockClassName({
  type = 'default',
  className,
}: {
  type?: InfoBlockType;
  className?: string;
} = {}) {
  return [
    'relative flex w-full flex-col overflow-hidden rounded-lg py-4 pl-4 pr-8',
    containerClassNames[type],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const infoBlockContentRowClassName = 'flex items-start gap-3';

export function infoBlockIconInnerClassName(type: InfoBlockType = 'default') {
  return iconClassNames[type];
}

export const infoBlockBodyClassName = 'flex min-w-0 flex-1 flex-col gap-3';

export const infoBlockHeaderRowClassName =
  'flex w-full items-start gap-4';

export const infoBlockTitlesClassName = 'flex min-w-0 flex-1 flex-col gap-2';

export const infoBlockTitleClassName =
  'm-0 body-1-bold text-text-neutral-primary';

export const infoBlockSubtitleClassName =
  'm-0 body-2 text-text-neutral-primary';

export const infoBlockActionsClassName = 'flex flex-col items-start gap-2';

export const infoBlockTrailingClassName = 'shrink-0';

export const infoBlockCloseClassName = 'absolute right-0.5 top-0.5';
