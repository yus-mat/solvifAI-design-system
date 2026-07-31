import type { HTMLAttributes, ReactNode } from 'react';

export type AppShellProps = {
  sidebar?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 * Shared app chrome for page previews — sidebar + header + main.
 * Compose with design system primitives as product shell patterns emerge.
 */
export function AppShell({
  sidebar,
  header,
  children,
  className,
  ...rest
}: AppShellProps) {
  return (
    <div
      className={['flex min-h-screen bg-surface-base', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {sidebar ? (
        <aside className="hidden w-56 shrink-0 border-r border-border-neutral-muted bg-surface-raise md:block">
          {sidebar}
        </aside>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        {header ? (
          <header className="shrink-0 border-b border-border-neutral-muted bg-surface-raise px-6 py-3">
            {header}
          </header>
        ) : null}
        <main className="min-h-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
