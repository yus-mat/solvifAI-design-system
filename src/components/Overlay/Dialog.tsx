import type { HTMLAttributes, ReactNode } from 'react';
import { ButtonIcon } from '@/components/Button';
import { X } from '@/icons';
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
import { useOverlayPresence } from './useOverlayPresence';

export type DialogProps = {
  open?: boolean;
  title: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  children?: ReactNode;
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
  className,
  ...rest
}: DialogProps) {
  const { mounted, shown, onTransitionEnd } = useOverlayPresence(open);

  if (!mounted) return null;

  return (
    <div className={dialogOverlayClassName}>
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!shown}
        className={dialogClassName({ shown, className })}
        onTransitionEnd={onTransitionEnd}
        {...rest}
      >
        <header className={dialogHeaderClassName}>
          <div className={dialogTitleGroupClassName}>
            <h2 className={dialogTitleClassName}>{title}</h2>
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
  );
}
