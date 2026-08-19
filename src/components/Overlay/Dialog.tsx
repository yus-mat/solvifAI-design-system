import {
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { ButtonIcon } from '@/components/Button';
import { X } from '@/icons';
import { Backdrop } from './Backdrop';
import {
  dialogBodyClassName,
  dialogClassName,
  dialogFooterActionsClassName,
  dialogFooterClassName,
  dialogHeaderClassName,
  dialogOverlayClassName,
  dialogSubtitleClassName,
  dialogTitleClassName,
  dialogTitleGroupClassName,
} from './dialogStyles';
import { useModalA11y } from './useModalA11y';
import { useOverlayPresence } from './useOverlayPresence';

export type DialogProps = {
  open?: boolean;
  title: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  children?: ReactNode;
  /** Dismiss when the scrim is clicked. Off for flows that must be answered. */
  closeOnBackdropClick?: boolean;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export function Dialog({
  open = true,
  title,
  subtitle,
  footer,
  onClose,
  closeLabel = '閉じる',
  children,
  closeOnBackdropClick = true,
  className,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: DialogProps) {
  const { mounted, shown, onTransitionEnd } = useOverlayPresence(open);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const labelledBy = ariaLabelledBy ?? titleId;

  useModalA11y({
    open: open && mounted,
    onClose,
    containerRef: panelRef,
  });

  if (!mounted) return null;

  return (
    <>
      {/* The scrim ships with the dialog — callers never have to pair them. */}
      <Backdrop
        open={open}
        onClick={closeOnBackdropClick ? onClose : undefined}
      />
      <div className={dialogOverlayClassName}>
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={dialogClassName({ shown, className })}
          onTransitionEnd={onTransitionEnd}
          {...rest}
          aria-hidden={!shown}
          aria-labelledby={labelledBy}
          aria-describedby={ariaDescribedBy}
        >
          <header className={dialogHeaderClassName}>
            <div className={dialogTitleGroupClassName}>
              <h2 id={titleId} className={dialogTitleClassName}>
                {title}
              </h2>
              {subtitle ? (
                <p className={dialogSubtitleClassName}>{subtitle}</p>
              ) : null}
            </div>
            {onClose ? (
              <ButtonIcon
                emphasis="ghost"
                intent="default"
                size="md"
                icon={<X aria-hidden />}
                aria-label={closeLabel}
                tooltipPosition="bottom-right"
                tooltipShowOnFocus={false}
                onClick={onClose}
              />
            ) : null}
          </header>
          {children ? <div className={dialogBodyClassName}>{children}</div> : null}
          {footer ? (
            <footer className={dialogFooterClassName}>
              <div className={dialogFooterActionsClassName}>{footer}</div>
            </footer>
          ) : null}
        </div>
      </div>
    </>
  );
}
