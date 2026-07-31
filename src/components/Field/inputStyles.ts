const fieldOverlayClassName = [
  'relative isolate overflow-hidden',
  'before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit]',
  'before:bg-transparent before:transition-colors before:duration-150',
  'hover:before:bg-background-interactive-hover',
  'has-[input:focus-visible]:before:bg-background-interactive-focus',
  'has-[textarea:focus-visible]:before:bg-background-interactive-focus',
].join(' ');

/** Shared chrome classes for Input (matches Figma InputText wrapper). */
export function inputWrapperClassName({
  invalid = false,
  disabled = false,
  className,
}: {
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
} = {}) {
  if (disabled) {
    return [
      'h-10 w-full min-w-0 rounded-lg border border-border-neutral-muted',
      fieldOverlayClassName,
      'bg-background-neutral-primary opacity-[0.38]',
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  return [
    'h-10 w-full min-w-0 rounded-lg border transition-colors',
    fieldOverlayClassName,
    'bg-background-neutral-primary',
    invalid
      ? 'border-border-function-error'
      : [
          'border-border-neutral-muted',
          'has-[input:focus-visible]:border-border-action-primary',
        ].join(' '),
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const inputClassName = [
  'relative z-[1] block h-full w-full min-w-0 bg-transparent px-3',
  'body-2 text-foreground outline-none',
  'placeholder:text-muted',
  'disabled:cursor-not-allowed',
].join(' ');

/** TextArea wrapper — bordered chrome per Figma TextArea. */
export function textAreaWrapperClassName({
  invalid = false,
  disabled = false,
  className,
}: {
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
} = {}) {
  if (disabled) {
    return [
      'w-full min-w-0 rounded-lg border border-border-neutral-muted',
      fieldOverlayClassName,
      'bg-background-neutral-primary opacity-[0.38]',
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  return [
    'w-full min-w-0 rounded-lg border transition-colors',
    fieldOverlayClassName,
    'bg-background-neutral-primary',
    invalid
      ? 'border-border-function-error'
      : [
          'border-border-neutral-muted',
          'has-[textarea:focus-visible]:border-border-action-primary',
        ].join(' '),
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const textAreaClassName = [
  'relative z-[1] block w-full min-w-0 min-h-20 bg-transparent p-3',
  'body-2 text-foreground outline-none',
  'placeholder:text-muted',
  'disabled:cursor-not-allowed',
].join(' ');

/** Chrome for DateInput — bordered row with leading calendar icon (Figma InputSelectDates). */
export function dateInputWrapperClassName({
  invalid = false,
  disabled = false,
  className,
}: {
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
} = {}) {
  if (disabled) {
    return [
      'relative flex h-10 w-full min-w-0 items-center gap-2 rounded-lg border border-border-neutral-muted',
      fieldOverlayClassName,
      'bg-background-neutral-primary px-3 opacity-[0.38]',
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  return [
    'relative flex h-10 w-full min-w-0 items-center gap-2 rounded-lg border px-3 transition-colors',
    fieldOverlayClassName,
    'bg-background-neutral-primary',
    invalid
      ? 'border-border-function-error'
      : [
          'border-border-neutral-muted',
          'has-[input:focus-visible]:border-border-action-primary',
        ].join(' '),
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const dateInputClassName = [
  'relative z-[1] min-w-0 flex-1 bg-transparent',
  'body-2 text-foreground outline-none',
  'disabled:cursor-not-allowed',
  '[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0',
  '[&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full',
  '[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0',
].join(' ');

/** Chrome for ComboboxInput — Figma InputSelectSearchable (40px empty, grows with chips). */
export function comboboxWrapperClassName({
  invalid = false,
  disabled = false,
  hasValues = false,
  className,
}: {
  invalid?: boolean;
  disabled?: boolean;
  hasValues?: boolean;
  className?: string;
} = {}) {
  const layout = hasValues
    ? 'flex min-h-10 flex-wrap items-center gap-1 px-3 py-2.5'
    : 'flex h-10 items-center gap-1 px-3';

  if (disabled) {
    return [
      'w-full min-w-0 rounded-lg border border-border-neutral-muted',
      fieldOverlayClassName,
      'bg-background-neutral-primary opacity-[0.38]',
      layout,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  return [
    'w-full min-w-0 rounded-lg border transition-colors',
    fieldOverlayClassName,
    'bg-background-neutral-primary',
    layout,
    invalid
      ? 'border-border-function-error'
      : [
          'border-border-neutral-muted',
          'has-[input:focus-visible]:border-border-action-primary',
        ].join(' '),
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const comboboxInputClassName = [
  'relative z-[1] min-w-0 flex-1 basis-[4ch] bg-transparent py-0',
  'body-2 text-foreground outline-none',
  'placeholder:text-muted',
  'disabled:cursor-not-allowed',
].join(' ');
