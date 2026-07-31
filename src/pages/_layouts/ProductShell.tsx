import type { HTMLAttributes, ReactNode } from 'react';
import { GlobalHeader } from '@/components/GlobalHeader';
import { ProductSidebar } from './ProductSidebar';

export type ProductShellProps = {
  children: ReactNode;
  /** Optional right rail (e.g. SidePanel) that sits beside main and can push content. */
  aside?: ReactNode;
  projectName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 * Funnel flow chrome: GlobalHeader (funnel), left nav, scrollable centered main column.
 */
export function ProductShell({
  children,
  aside,
  projectName: _projectName,
  className,
  ...rest
}: ProductShellProps) {
  return (
    <div
      className={['flex h-screen min-h-0 flex-col overflow-hidden bg-surface-base', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <GlobalHeader variant="funnel" />

      <div className="flex min-h-0 flex-1 gap-4 p-4">
        <ProductSidebar />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[800px] flex-col">{children}</div>
        </main>
        {aside}
      </div>
    </div>
  );
}
