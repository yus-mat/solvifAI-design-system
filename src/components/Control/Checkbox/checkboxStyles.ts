import {
  focusOutlineSuppressClassName,
  focusRingOnParentClassName,
} from '@/styles/focusRing';

export const checkboxRootClassName = [
  'relative inline-flex rounded-base',
  focusRingOnParentClassName,
].join(' ');

export const checkboxControlClassName = [
  'relative inline-flex size-5 shrink-0 items-center justify-center rounded-base',
  'border border-border-neutral-secondary bg-transparent transition-colors duration-150',
  'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]',
  'before:bg-transparent before:transition-colors before:duration-150',
  /* Named group so ancestor `group` (e.g. card hover) does not grey the fill. */
  'group-hover/checkbox:before:bg-background-interactive-hover',
  'peer-focus-visible:before:bg-background-interactive-focus',
  'peer-focus-visible:border-border-action-primary',
  'peer-checked:border-border-action-primary peer-checked:bg-background-action-primary',
  'peer-checked:before:hidden peer-checked:[&>svg.check]:opacity-100',
  'peer-indeterminate:border-border-action-primary peer-indeterminate:bg-background-action-primary',
  'peer-indeterminate:before:hidden peer-indeterminate:[&>svg.minus]:opacity-100',
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-[0.38]',
].join(' ');

export const checkboxInputClassName = ['peer sr-only', focusOutlineSuppressClassName].join(' ');

export const checkboxCheckIconClassName =
  'check pointer-events-none absolute size-4 text-text-neutral-inverse opacity-0 transition-opacity duration-150';

export const checkboxMinusIconClassName =
  'minus pointer-events-none absolute size-4 text-text-neutral-inverse opacity-0 transition-opacity duration-150';

export const checkboxFieldClassName = [
  'group/checkbox inline-flex cursor-pointer items-center gap-3',
  'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-[0.38]',
].join(' ');

export const checkboxFieldLabelClassName =
  'body-2-bold text-text-primary';
