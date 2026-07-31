import type { ReactNode } from 'react';
import { Avatar } from '@/components/Avatar';
import { IconWrapper } from '@/components/IconWrapper';
import {
  FileText,
  MessageSquare,
  Settings,
  Sparkles,
  FolderKanban,
  ListTodo,
} from '@/icons';

export type ProductNavItem = {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
};

const defaultNavItems: ProductNavItem[] = [
  { id: 'deliverable-v2', label: '成果物生成v2', icon: <Sparkles aria-hidden />, active: true },
  { id: 'deliverable', label: '成果物生成', icon: <FileText aria-hidden /> },
  { id: 'minutes', label: '議事録作成', icon: <FileText aria-hidden /> },
  { id: 'ai-chat', label: 'AI相談', icon: <MessageSquare aria-hidden /> },
  { id: 'projects', label: 'プロジェクト管理', icon: <FolderKanban aria-hidden /> },
  { id: 'tasks', label: 'タスク管理', icon: <ListTodo aria-hidden /> },
  { id: 'settings', label: '設定', icon: <Settings aria-hidden /> },
];

export type ProductSidebarProps = {
  items?: ProductNavItem[];
  userName?: string;
  companyName?: string;
};

export function ProductSidebar({
  items = defaultNavItems,
  userName = '松友雄星',
  companyName = 'SolvifAI',
}: ProductSidebarProps) {
  return (
    <aside className="flex h-full w-[230px] shrink-0 flex-col overflow-hidden rounded-lg bg-surface-raise shadow-sm">
      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-2 pt-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={[
              'flex h-[50px] w-full items-center gap-1 rounded px-3 text-left transition-colors',
              item.active
                ? 'body-2-bold bg-gradient-to-r from-background-function-info-subtle/20 to-background-action-primary/10 text-text-action-primary'
                : 'body-2 bg-background-neutral-primary text-text-neutral-primary hover:bg-background-interactive-hover',
            ].join(' ')}
          >
            <IconWrapper size="md">{item.icon}</IconWrapper>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-border-neutral-muted px-6 py-8">
        <Avatar size="sm" name={userName} initials={userName.slice(0, 1)} colorIndex={1} />
        <div className="min-w-0">
          <p className="m-0 truncate caption text-text-neutral-secondary">{userName}</p>
          <p className="m-0 truncate caption text-text-neutral-secondary">{companyName}</p>
        </div>
      </div>
    </aside>
  );
}
