import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import type { CardType } from './cardTypes';
import { cardClassName } from './cardStyles';

export type CardProps = {
  type?: CardType;
  padded?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Card({
  type = 'static',
  padded = true,
  children,
  className,
  ...rest
}: CardProps) {
  const classes = cardClassName({ type, padded, className });

  if (type === 'interactive') {
    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button type="button" className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
