import type { HTMLAttributes, ReactNode } from 'react';

export type PageFrameProps = {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  width?: 'sm' | 'md' | 'lg';
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

const widthClassNames = {
  sm: 'max-w-lg',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
} as const;

/**
 * Centered content column for focused flows (wizards, choosers, settings).
 */
export function PageFrame({
  title,
  description,
  actions,
  children,
  width = 'md',
  className,
  ...rest
}: PageFrameProps) {
  return (
    <div
      className={['mx-auto w-full px-6 py-8', widthClassNames[width], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {(title || description || actions) && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            {title ? (
              <h1 className="m-0 heading-3 text-text-neutral-primary">
                {title}
              </h1>
            ) : null}
            {description ? (
              <p className="m-0 body-2 text-text-neutral-secondary">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </div>
      )}
      {children}
    </div>
  );
}
