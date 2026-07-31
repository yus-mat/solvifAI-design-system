import type { HTMLAttributes, ReactNode } from 'react';
import { AvatarStack, type AvatarStackItem } from '@/components/Avatar';
import { ButtonIcon } from '@/components/Button/ButtonIcon';
import { SplitButton } from '@/components/Button/SplitButton';
import { Divider } from '@/components/Divider';
import { Tag } from '@/components/Tag';
import { ChevronLeft, EllipsisVertical } from '@/icons';

export type GlobalHeaderVariant = 'funnel' | 'draft';

export type GlobalHeaderProps = {
  /** Funnel: logo only. Draft: deliverable chrome (back, title, actions). */
  variant?: GlobalHeaderVariant;
  title?: string;
  statusLabel?: string;
  avatars?: AvatarStackItem[];
  /** Draft only — hide primary SplitButton (member-style). Default true for owner. */
  showPrimaryAction?: boolean;
  primaryActionLabel?: string;
  onBack?: () => void;
  onPrimaryAction?: () => void;
  trailingSlot?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'title'>;

export function GlobalHeader({
  variant = 'funnel',
  title = '成果物名',
  statusLabel = '下書き',
  avatars = [],
  showPrimaryAction = true,
  primaryActionLabel = '承認依頼',
  onBack,
  onPrimaryAction,
  trailingSlot,
  className,
  ...rest
}: GlobalHeaderProps) {
  if (variant === 'funnel') {
    return (
      <header
        className={[
          'flex shrink-0 items-center justify-between border-b border-border-neutral-muted bg-surface-default px-8 py-1',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        <div className="flex h-[52px] items-center gap-3 px-3">
          <img
            src="/brand/solvifai-logo.png"
            alt="SolvifAI"
            className="h-[27px] w-auto object-contain"
          />
        </div>
        {trailingSlot}
      </header>
    );
  }

  return (
    <header
      className={[
        'flex h-14 shrink-0 items-center justify-between border-b border-border-neutral-muted bg-surface-default py-1',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="flex items-center gap-3 px-3">
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size="sm"
          icon={<ChevronLeft aria-hidden />}
          aria-label="戻る"
          tooltipPosition="bottom-left"
          onClick={onBack}
        />
        <h1 className="m-0 body-1-bold text-text-neutral-primary">{title}</h1>
        <Tag type="filled" status="default">
          {statusLabel}
        </Tag>
      </div>

      <div className="flex items-center gap-4 pr-2">
        <AvatarStack avatars={avatars} size="sm" maxVisible={3} />
        <Divider orientation="vertical" className="h-8" />
        <div className="flex items-center gap-2">
          {showPrimaryAction ? (
            <SplitButton variant="primary" onClick={onPrimaryAction}>
              {primaryActionLabel}
            </SplitButton>
          ) : null}
          {trailingSlot ?? (
            <ButtonIcon
              emphasis="ghost"
              intent="default"
              size="sm"
              icon={<EllipsisVertical aria-hidden />}
              aria-label="その他の操作"
              tooltipPosition="bottom-right"
            />
          )}
        </div>
      </div>
    </header>
  );
}
