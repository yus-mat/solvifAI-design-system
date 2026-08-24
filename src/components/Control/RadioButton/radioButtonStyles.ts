import {
  focusOutlineSuppressClassName,
  focusRingOnParentClassName,
} from '@/styles/focusRing';

export const radioButtonRootClassName = [
  'relative inline-flex rounded-full',
  focusRingOnParentClassName,
].join(' ');

export const radioButtonControlClassName = [
  'relative size-5 shrink-0 rounded-full',
  /* No background fill — stroke only. */
  'border border-border-neutral-secondary bg-transparent',
  'transition-[border-color] duration-150',
  /* Inner dot via ::after, centered, hidden by default. */
  'after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
  'after:size-2 after:rounded-full after:bg-background-action-primary',
  'after:opacity-0 after:transition-opacity after:duration-150',
  /* Focus: border turns blue; circle size unchanged. */
  'peer-focus-visible:border-border-action-primary',
  /* Checked: border turns blue + inner dot appears; circle size unchanged. */
  'peer-checked:border-border-action-primary peer-checked:after:opacity-100',
  /* Disabled. */
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-[0.38]',
].join(' ');

export const radioButtonInputClassName = ['peer sr-only', focusOutlineSuppressClassName].join(' ');

export const radioButtonFieldClassName = [
  'group/radio-button inline-flex cursor-pointer items-center gap-3',
  'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-[0.38]',
].join(' ');

export const radioButtonFieldLabelClassName = 'body-2-bold text-text-primary';
