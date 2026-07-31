import type { AvatarStackItem } from '@/components/Avatar';
import { GlobalHeader } from '@/components/GlobalHeader';

export type DeliverableHeaderProps = {
  title?: string;
  statusLabel?: string;
  avatars?: AvatarStackItem[];
};

/** @deprecated Prefer `GlobalHeader` with `variant="draft"`. */
export function DeliverableHeader({
  title = '成果物名',
  statusLabel = '下書き',
  avatars = [],
}: DeliverableHeaderProps) {
  return (
    <GlobalHeader
      variant="draft"
      title={title}
      statusLabel={statusLabel}
      avatars={avatars}
    />
  );
}
