import type { TagSize, TagStatus, TagType } from './tagTypes';

type TagStyleKey = `${TagStatus}-${TagType}`;

const sizeClassNames: Record<TagSize, string> = {
  sm: 'h-5 gap-1 px-1.5 caption-bold',
  md: 'h-6 gap-1 px-1.5 body-2-bold',
};

/** Figma inside stroke — inset shadow does not affect layout (unlike border). */
const insetStrokeNeutral =
  'shadow-[inset_0_0_0_1px_var(--border-neutral-primary)]';
const insetStrokeSuccess =
  'shadow-[inset_0_0_0_1px_var(--border-function-success)]';
const insetStrokeError =
  'shadow-[inset_0_0_0_1px_var(--border-function-error)]';
const insetStrokeWarning =
  'shadow-[inset_0_0_0_1px_var(--border-function-warning)]';
const insetStrokeInfo =
  'shadow-[inset_0_0_0_1px_var(--border-function-info)]';
const insetStrokeEmphasis =
  'shadow-[inset_0_0_0_1px_var(--border-function-emphasis)]';
const insetStrokeAction =
  'shadow-[inset_0_0_0_1px_var(--border-action-primary)]';

const statusTypeClassNames: Record<TagStyleKey, string> = {
  'default-filled':
    'bg-background-neutral-secondary text-text-neutral-primary',
  'default-outline': [
    insetStrokeNeutral,
    'bg-transparent text-text-neutral-primary',
  ].join(' '),
  'default-inverse':
    'bg-background-neutral-inverse text-text-neutral-inverse',
  'brand-filled':
    'bg-background-action-secondary text-text-action-primary',
  'brand-outline': [
    insetStrokeAction,
    'bg-transparent text-text-action-primary',
  ].join(' '),
  'brand-inverse':
    'bg-background-action-primary text-text-neutral-inverse',
  'success-filled':
    'bg-background-function-success-subtle text-text-function-success',
  'success-outline': [
    insetStrokeSuccess,
    'bg-transparent text-text-function-success',
  ].join(' '),
  'success-inverse':
    'bg-background-function-success-strong text-text-neutral-inverse',
  'error-filled':
    'bg-background-function-error-subtle text-text-function-error',
  'error-outline': [
    insetStrokeError,
    'bg-transparent text-text-function-error',
  ].join(' '),
  'error-inverse':
    'bg-background-function-error-strong text-text-neutral-inverse',
  'warning-filled':
    'bg-background-function-warning-subtle text-text-function-warning',
  'warning-outline': [
    insetStrokeWarning,
    'bg-transparent text-text-function-warning',
  ].join(' '),
  'warning-inverse':
    'bg-background-function-warning-strong text-text-neutral-inverse',
  'info-filled':
    'bg-background-function-info-subtle text-text-function-info',
  'info-outline': [
    insetStrokeInfo,
    'bg-transparent text-text-function-info',
  ].join(' '),
  'info-inverse':
    'bg-background-function-info-strong text-text-neutral-inverse',
  'accent-filled':
    'bg-background-function-accent-subtle text-text-function-emphasis',
  'accent-outline': [
    insetStrokeEmphasis,
    'bg-transparent text-text-function-emphasis',
  ].join(' '),
  'accent-inverse':
    'bg-background-function-accent-strong text-text-neutral-inverse',
};

export function tagClassName({
  status = 'default',
  type = 'filled',
  size = 'sm',
  className,
}: {
  status?: TagStatus;
  type?: TagType;
  size?: TagSize;
  className?: string;
} = {}) {
  const styleKey = `${status}-${type}` as TagStyleKey;

  return [
    'inline-flex max-w-full items-center rounded-base',
    sizeClassNames[size],
    'whitespace-nowrap',
    statusTypeClassNames[styleKey],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
