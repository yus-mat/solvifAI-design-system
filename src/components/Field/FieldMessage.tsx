import type { HTMLAttributes, ReactNode } from 'react';

export type FieldMessageIntent = 'default' | 'error';

export type FieldMessageProps = {
  intent?: FieldMessageIntent;
  /** When false, renders nothing (Figma BottomText Type=None). */
  visible?: boolean;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLParagraphElement>, 'children'>;

export function FieldMessage({
  intent = 'default',
  visible = true,
  children,
  className,
  ...rest
}: FieldMessageProps) {
  if (!visible) return null;

  const classes = [
    'caption',
    intent === 'error' ? 'text-text-function-error' : 'text-muted',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}
