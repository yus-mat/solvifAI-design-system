import { useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { ButtonIcon } from '@/components/Button';
import { X } from '@/icons';
import { useModalA11y } from '../useModalA11y';
import type { DrawerSize } from './drawerTypes';
import {
  drawerBodyClassName,
  drawerClassName,
  drawerFooterActionsClassName,
  drawerFooterClassName,
  drawerHeaderActionsClassName,
  drawerHeaderClassName,
  drawerSubtitleClassName,
  drawerTitleClassName,
  drawerTitleGroupClassName,
} from './drawerStyles';

export type DrawerProps = {
  size?: DrawerSize;
  open?: boolean;
  title: ReactNode;
  subtitle?: ReactNode;
  headerActions?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

export function Drawer({
  size = 'sm',
  open = true,
  title,
  subtitle,
  headerActions,
  footer,
  onClose,
  closeLabel = '閉じる',
  children,
  className,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: DrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const labelledBy = ariaLabelledBy ?? titleId;

  useModalA11y({
    open,
    onClose,
    containerRef: panelRef,
  });

  return (
    <aside
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className={drawerClassName({ size, open, className })}
      {...rest}
      aria-hidden={!open}
      aria-labelledby={labelledBy}
    >
      <header className={drawerHeaderClassName}>
        <div className={drawerTitleGroupClassName}>
          <h2 id={titleId} className={drawerTitleClassName}>
            {title}
          </h2>
          {subtitle ? (
            <p className={drawerSubtitleClassName}>{subtitle}</p>
          ) : null}
        </div>
        {headerActions || onClose ? (
          <div className={drawerHeaderActionsClassName}>
            {headerActions}
            {onClose ? (
              <ButtonIcon
                emphasis="ghost"
                intent="default"
                size="md"
                icon={<X aria-hidden />}
                aria-label={closeLabel}
                tooltipShowOnFocus={false}
                onClick={onClose}
              />
            ) : null}
          </div>
        ) : null}
      </header>
      {children ? <div className={drawerBodyClassName}>{children}</div> : null}
      {footer ? (
        <footer className={drawerFooterClassName}>
          <div className={drawerFooterActionsClassName}>{footer}</div>
        </footer>
      ) : null}
    </aside>
  );
}
