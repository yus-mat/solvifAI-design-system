import type { HTMLAttributes } from 'react';
import { backdropClassName } from './backdropStyles';
import { useOverlayPresence } from './useOverlayPresence';

export type BackdropProps = {
  open?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function Backdrop({ open = true, className, ...rest }: BackdropProps) {
  const { mounted, shown, interactive, onTransitionEnd } =
    useOverlayPresence(open);

  if (!mounted) return null;

  return (
    <div
      className={backdropClassName({ shown, interactive, className })}
      aria-hidden={!shown}
      onTransitionEnd={onTransitionEnd}
      {...rest}
    />
  );
}
