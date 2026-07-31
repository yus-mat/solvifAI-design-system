import type { HTMLAttributes, ReactNode } from 'react';
import { ButtonIcon } from '@/components/Button';
import { X } from '@/icons';
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
  ...rest
}: DrawerProps) {
  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={drawerClassName({ size, open, className })}
      {...rest}
    >
      <header className={drawerHeaderClassName}>
        <div className={drawerTitleGroupClassName}>
          <h2 className={drawerTitleClassName}>{title}</h2>
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
                size="sm"
                icon={<X aria-hidden />}
                className="!p-1"
                aria-label={closeLabel}
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
