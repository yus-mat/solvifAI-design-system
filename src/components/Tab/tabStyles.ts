import { focusRingInsetClassName } from '@/styles/focusRing';

const tabInteractiveOverlayClassName = [
  'relative isolate',
  'before:pointer-events-none before:absolute before:inset-0 before:z-0',
  'before:bg-transparent before:transition-colors before:duration-150',
  'hover:before:bg-background-interactive-hover',
  'active:before:bg-background-interactive-pressed',
  '[&>*]:relative [&>*]:z-[1]',
].join(' ');

const tabStateClassNames = {
  active:
    'border-b-2 border-border-function-info bg-background-interactive-default -mb-px',
  inactive:
    'border-b-2 border-transparent bg-background-interactive-default',
} as const;

export function tabClassName({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
} = {}) {
  return [
    'flex min-w-0 flex-1 cursor-pointer items-center justify-center',
    'px-3 py-4 transition-colors',
    tabInteractiveOverlayClassName,
    active ? tabStateClassNames.active : tabStateClassNames.inactive,
    focusRingInsetClassName,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const tabLabelRowClassName = 'inline-flex items-center gap-2';

export function tabLabelClassName({ active = false }: { active?: boolean } = {}) {
  return [
    'body-1',
    active ? 'text-text-neutral-primary' : 'text-text-neutral-secondary',
  ].join(' ');
}

export const tabGroupClassName =
  'flex w-full min-w-0 border-b border-border-neutral-muted';
