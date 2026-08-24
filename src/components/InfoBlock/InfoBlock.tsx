import type { HTMLAttributes, ReactNode } from 'react';
import { Button, ButtonIcon } from '@/components/Button';
import { ToggleField } from '@/components/Control';
import { IconWrapper } from '@/components/IconWrapper';
import {
  CheckCheck,
  CircleAlert,
  Info,
  Send,
  Sparkles,
  TriangleAlert,
  X,
} from '@/icons';
import type { InfoBlockType } from './infoBlockTypes';
import {
  infoBlockActionsClassName,
  infoBlockBodyClassName,
  infoBlockClassName,
  infoBlockCloseClassName,
  infoBlockContentRowClassName,
  infoBlockHeaderRowClassName,
  infoBlockIconInnerClassName,
  infoBlockSubtitleClassName,
  infoBlockTitleClassName,
  infoBlockTitlesClassName,
  infoBlockTrailingClassName,
} from './infoBlockStyles';

export type InfoBlockProps = {
  type?: InfoBlockType;
  title: ReactNode;
  subtitle?: ReactNode;
  leadingIcon?: ReactNode | null;
  /** Renders a Toggle below the title/subtitle block when true (Figma `showToggle`). */
  showToggle?: boolean;
  toggleChecked?: boolean;
  defaultToggleChecked?: boolean;
  onToggleChange?: (checked: boolean) => void;
  toggleLabel?: string;
  trailing?: ReactNode;
  /** Renders a default SM Button in the actions slot when true (Figma `showCTA`). */
  showCta?: boolean;
  ctaLabel?: string;
  ctaLeadingIcon?: ReactNode;
  onCtaClick?: () => void;
  /** Custom actions content; overrides the default CTA button when provided. */
  actions?: ReactNode;
  /** Shows the close icon from the latest Figma component. */
  closable?: boolean;
  closeLabel?: string;
  onClose?: () => void;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

const defaultIcons: Record<InfoBlockType, ReactNode> = {
  default: <Info aria-hidden />,
  error: <CircleAlert aria-hidden />,
  success: <CheckCheck aria-hidden />,
  info: <Info aria-hidden />,
  brand: <Sparkles aria-hidden />,
  accent: <Sparkles aria-hidden />,
  warning: <TriangleAlert aria-hidden />,
};

export function InfoBlock({
  type = 'default',
  title,
  subtitle,
  leadingIcon,
  showToggle = false,
  toggleChecked,
  defaultToggleChecked = false,
  onToggleChange,
  toggleLabel = '有効化',
  trailing,
  showCta = false,
  ctaLabel = 'Button',
  ctaLeadingIcon = <Send aria-hidden />,
  onCtaClick,
  actions,
  closable = false,
  closeLabel = '閉じる',
  onClose,
  children,
  className,
  ...rest
}: InfoBlockProps) {
  const icon =
    leadingIcon === null
      ? null
      : (leadingIcon ?? defaultIcons[type]);

  const trailingSlot = trailing ?? null;

  const actionsSlot =
    actions ??
    (showCta ? (
      <Button size="sm" leadingIcon={ctaLeadingIcon} onClick={onCtaClick}>
        {ctaLabel}
      </Button>
    ) : null);

  return (
    <div className={infoBlockClassName({ type, className })} {...rest}>
      <div className={infoBlockContentRowClassName}>
        {icon ? (
          <IconWrapper size="lg" iconClassName={infoBlockIconInnerClassName(type)}>
            {icon}
          </IconWrapper>
        ) : null}
        <div className={infoBlockBodyClassName}>
          <div className={infoBlockHeaderRowClassName}>
            <div className={infoBlockTitlesClassName}>
              <p className={infoBlockTitleClassName}>{title}</p>
              {subtitle ? (
                <p className={infoBlockSubtitleClassName}>{subtitle}</p>
              ) : null}
            </div>
            {trailingSlot ? (
              <div className={infoBlockTrailingClassName}>{trailingSlot}</div>
            ) : null}
          </div>
          {showToggle ? (
            <ToggleField
              label={toggleLabel}
              checked={toggleChecked}
              defaultChecked={defaultToggleChecked}
              onCheckedChange={onToggleChange}
            />
          ) : null}
          {children}
          {actionsSlot ? (
            <div className={infoBlockActionsClassName}>{actionsSlot}</div>
          ) : null}
        </div>
      </div>
      {closable ? (
        <div className={infoBlockCloseClassName}>
          <ButtonIcon
            emphasis="ghost"
            intent="default"
            size="sm"
            icon={<X aria-hidden />}
            aria-label={closeLabel}
            tooltip={false}
            onClick={onClose}
          />
        </div>
      ) : null}
    </div>
  );
}
