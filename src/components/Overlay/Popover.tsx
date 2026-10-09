import type { HTMLAttributes, ReactNode } from 'react';
import { ButtonIcon } from '@/components/Button';
import { X } from '@/icons';
import { popoverClassName, popoverCloseButtonClassName, popoverContentClassName, popoverInnerClassName } from './overlayStyles';
import type { PopoverType } from './overlayTypes';
import { useOverlayPresence } from './useOverlayPresence';

export type PopoverProps = {
  open?: boolean;
  /** Figma `Type` — `muted` swaps the panel onto the muted surface. */
  type?: PopoverType;
  closable?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Popover({
  open = true,
  type = 'default',
  closable = false,
  onClose,
  closeLabel = '閉じる',
  children,
  className,
  ...rest
}: PopoverProps) {
  const { mounted, shown, onTransitionEnd } = useOverlayPresence(open);

  if (!mounted) return null;

  return (
    <div
      className={popoverClassName({ type, shown, className })}
      onTransitionEnd={onTransitionEnd}
      {...rest}
    >
      <div className={popoverInnerClassName}>
        {closable ? (
          <ButtonIcon
            emphasis="ghost"
            intent="default"
            size="sm"
            icon={<X aria-hidden />}
            className={popoverCloseButtonClassName}
            aria-label={closeLabel}
            tooltipShowOnFocus={false}
            onClick={onClose}
          />
        ) : null}
        <div className={popoverContentClassName({ closable })}>{children}</div>
      </div>
    </div>
  );
}
