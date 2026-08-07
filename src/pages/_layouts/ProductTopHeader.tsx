import { AvatarStack } from '@/components/Avatar';
import { ButtonIcon } from '@/components/Button/ButtonIcon';
import { NotificationBadge } from '@/components/NotificationBadge';
import { IconWrapper } from '@/components/IconWrapper';
import { Bell, ChevronsUpDown, Folder } from '@/icons';

export type ProductTopHeaderProps = {
  projectName?: string;
  notificationCount?: number;
};

export function ProductTopHeader({
  projectName = '財務部Cサイト',
  notificationCount = 3,
}: ProductTopHeaderProps) {
  return (
    <header className="flex h-[67px] shrink-0 items-center justify-between border-b border-border-neutral-muted bg-surface-raise px-0">
      <div className="flex items-center">
        <div className="flex h-[67px] w-[230px] shrink-0 items-center justify-center">
          <img
            src="/brand/solvifai-logo.png"
            alt="SolvifAI"
            className="h-[27px] w-auto object-contain"
          />
        </div>

        <button
          type="button"
          className="flex w-[198px] items-center gap-2 rounded border border-border-neutral-muted px-3 py-1 text-left"
        >
          <IconWrapper size="xs">
            <Folder aria-hidden />
          </IconWrapper>
          <span className="min-w-0 flex-1 truncate caption-bold text-text-neutral-primary">
            {projectName}
          </span>
          <IconWrapper size="xs">
            <ChevronsUpDown aria-hidden />
          </IconWrapper>
        </button>
      </div>

      <div className="flex items-center gap-1 pr-4">
        <AvatarStack
          size="sm"
          maxVisible={4}
          avatars={[
            { initials: 'A', colorIndex: 1 },
            { initials: 'B', colorIndex: 2 },
            { initials: 'C', colorIndex: 3 },
            { initials: 'D', colorIndex: 4 },
            { initials: 'E', colorIndex: 5 },
          ]}
        />

        <div className="relative ml-2">
          <ButtonIcon
            emphasis="ghost"
            intent="default"
            size="md"
            icon={<Bell aria-hidden />}
            aria-label="通知"
          />
          {notificationCount > 0 ? (
            <NotificationBadge
              count={notificationCount}
              className="absolute -right-0.5 -top-0.5"
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}
