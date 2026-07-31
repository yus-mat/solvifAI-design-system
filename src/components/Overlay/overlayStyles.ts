import { focusRingInsetClassName } from '@/styles/focusRing';
import { motionAppearOpacityClassName } from '@/styles/motion';

export function popoverClassName({
  shown = true,
  className,
}: {
  shown?: boolean;
  className?: string;
} = {}) {
  return [
    'w-full max-w-[540px] overflow-clip rounded-xl border border-border-neutral-muted bg-surface-raise shadow-md',
    motionAppearOpacityClassName,
    shown ? 'opacity-100' : 'opacity-0',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

/** Figma Popover close — 26×26 ButtonIcon, absolute top-right (5px / 4px inset). */
export const popoverCloseButtonClassName = [
  'absolute top-[5px] right-[4px] left-auto z-10 shrink-0 !p-1',
].join(' ');

export const popoverInnerClassName = 'relative';

/** Reserve space for the close control (26px + 4px inset). */
export function popoverContentClassName({
  closable = false,
  className,
}: {
  closable?: boolean;
  className?: string;
} = {}) {
  return ['min-w-0', closable ? 'pr-10' : '', className].filter(Boolean).join(' ');
}

export const dropdownListClassName = [
  'flex w-max min-w-[120px] max-w-[280px] flex-col overflow-clip',
  'rounded-xl border border-border-neutral-muted bg-surface-raise py-1 body-2 shadow-md',
].join(' ');

export function listItemClassName({
  intent = 'default',
  selected = false,
  className,
}: {
  intent?: 'default' | 'destructive';
  selected?: boolean;
  className?: string;
} = {}) {
  return [
    'relative isolate overflow-hidden',
    'flex h-10 w-full min-w-0 cursor-pointer items-center gap-3 p-2 text-left body-2',
    'transition-colors',
    'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:transition-colors before:duration-150',
    selected
      ? 'before:bg-background-interactive-selected'
      : 'before:bg-transparent hover:before:bg-background-interactive-hover active:before:bg-background-interactive-pressed',
    intent === 'destructive' ? 'text-text-function-error' : 'text-text-neutral-primary',
    '[&>*]:relative [&>*]:z-[1]',
    focusRingInsetClassName,
    'disabled:cursor-not-allowed disabled:opacity-[0.38]',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function listItemInteractiveClassName({
  hasBorder = false,
  selected = false,
  className,
}: {
  hasBorder?: boolean;
  selected?: boolean;
  className?: string;
} = {}) {
  return [
    'flex h-10 w-full min-w-0 cursor-pointer items-center gap-3 px-3 py-2 text-left body-2',
    'relative isolate overflow-hidden bg-background-neutral-primary transition-colors',
    'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:transition-colors before:duration-150',
    'hover:before:bg-background-interactive-hover',
    'active:before:bg-background-interactive-pressed',
    focusRingInsetClassName,
    hasBorder ? 'border-b border-border-neutral-muted' : '',
    selected ? 'before:bg-background-interactive-selected' : 'before:bg-transparent',
    '[&>*]:relative [&>*]:z-[1]',
    'disabled:cursor-not-allowed disabled:opacity-[0.38]',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function dropdownTriggerClassName({
  open = false,
  className,
}: {
  open?: boolean;
  className?: string;
} = {}) {
  return [
    'relative isolate overflow-hidden',
    'flex h-10 w-full min-w-0 cursor-pointer items-center justify-between gap-1 rounded-lg border p-2',
    'bg-background-neutral-primary body-2 text-text-neutral-primary transition-colors',
    'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit] before:transition-colors before:duration-150',
    open
      ? 'border-border-action-primary before:bg-background-interactive-focus'
      : [
          'border-border-neutral-muted',
          'hover:before:bg-background-interactive-hover',
          'active:before:bg-background-interactive-pressed',
        ].join(' '),
    '[&>*]:relative [&>*]:z-[1]',
    focusRingInsetClassName,
    'disabled:cursor-not-allowed disabled:opacity-[0.38]',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
