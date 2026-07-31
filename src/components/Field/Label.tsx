import type { LabelHTMLAttributes, ReactNode } from 'react';

export type LabelProps = {
  required?: boolean;
  /** Visually hidden but available to screen readers. */
  srOnly?: boolean;
  children: ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;

export function Label({
  required = false,
  srOnly = false,
  children,
  className,
  ...rest
}: LabelProps) {
  const classes = [
    'flex items-center gap-1 body-2-bold text-foreground',
    srOnly ? 'sr-only' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes} {...rest}>
      <span>{children}</span>
      {required ? (
        <span className="text-text-danger-primary" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}
