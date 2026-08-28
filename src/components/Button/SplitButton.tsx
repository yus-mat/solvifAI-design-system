import {
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { Divider } from '@/components/Divider';
import { IconWrapper, buttonIconWrapperSize } from '@/components/IconWrapper';
import { DropdownList } from '@/components/Overlay/DropdownList';
import { ChevronDown } from '@/icons';
import {
  splitButtonDividerClassName,
  splitButtonDividerWrapperClassName,
  splitButtonGroupClassName,
  splitButtonMainClassName,
  splitButtonMenuClassName,
  splitButtonMenuPanelClassName,
} from './splitButtonStyles';
import type {
  SplitButtonMenuPlacement,
  SplitButtonVariant,
} from './splitButtonTypes';

export type SplitButtonProps = {
  variant?: SplitButtonVariant;
  leadingIcon?: ReactNode;
  children: ReactNode;
  menu?: ReactNode;
  menuLabel?: string;
  menuPlacement?: SplitButtonMenuPlacement;
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function SplitButton({
  variant = 'primary',
  leadingIcon,
  children,
  menu,
  menuLabel = 'その他のオプション',
  menuPlacement = 'below',
  menuOpen: menuOpenProp,
  defaultMenuOpen = false,
  onMenuOpenChange,
  className,
  disabled,
  onClick,
  ...rest
}: SplitButtonProps) {
  const [uncontrolledMenuOpen, setUncontrolledMenuOpen] = useState(defaultMenuOpen);
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const isMenuControlled = menuOpenProp !== undefined;
  const menuOpen = isMenuControlled ? menuOpenProp : uncontrolledMenuOpen;

  const setMenuOpen = (next: boolean) => {
    if (!isMenuControlled) setUncontrolledMenuOpen(next);
    onMenuOpenChange?.(next);
  };

  return (
    <div
      ref={containerRef}
      className={['relative inline-flex', className].filter(Boolean).join(' ')}
    >
      <div className={splitButtonGroupClassName(variant, disabled)}>
        <button
          type="button"
          disabled={disabled}
          className={splitButtonMainClassName({ variant })}
          onClick={onClick}
          {...rest}
        >
          {leadingIcon ? (
            <IconWrapper size={buttonIconWrapperSize.sm}>
              {leadingIcon}
            </IconWrapper>
          ) : null}
          <span className="break-words">{children}</span>
        </button>

        <div className={splitButtonDividerWrapperClassName} aria-hidden>
          <Divider
            orientation="vertical"
            className={splitButtonDividerClassName(variant)}
          />
        </div>

        <button
          type="button"
          disabled={disabled}
          aria-label={menuLabel}
          aria-expanded={menu ? menuOpen : undefined}
          aria-haspopup={menu ? 'menu' : undefined}
          aria-controls={menu && menuOpen ? listId : undefined}
          className={splitButtonMenuClassName({ variant })}
          onClick={() => {
            if (menu) setMenuOpen(!menuOpen);
          }}
        >
          {/* Figma shrank the chevron to a 16px wrapper box (12px glyph); `xs`
              keeps that footprint with the usual Phosphor optical bump. */}
          <IconWrapper size="xs">
            <ChevronDown aria-hidden />
          </IconWrapper>
        </button>
      </div>

      {menu && menuOpen ? (
        <div
          className={splitButtonMenuPanelClassName(menuPlacement)}
          onClick={() => setMenuOpen(false)}
        >
          <DropdownList id={listId}>{menu}</DropdownList>
        </div>
      ) : null}
    </div>
  );
}
