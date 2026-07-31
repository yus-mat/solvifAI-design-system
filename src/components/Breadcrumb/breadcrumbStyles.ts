import { focusRingOffsetClassName } from '@/styles/focusRing';

export const breadcrumbListClassName = 'm-0 flex list-none items-center gap-2 p-0';

export const breadcrumbItemClassName = 'inline-flex items-center gap-2';

export const breadcrumbSeparatorClassName =
  'text-text-neutral-secondary';

export function breadcrumbLinkClassName({ className }: { className?: string } = {}) {
  return [
    'body-2-bold text-text-neutral-primary no-underline',
    'decoration-solid decoration-from-font [text-underline-position:from-font]',
    'hover:text-text-neutral-secondary hover:underline',
    'active:text-text-neutral-secondary active:underline',
    focusRingOffsetClassName,
    'rounded-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function breadcrumbCurrentClassName({
  className,
}: { className?: string } = {}) {
  return ['body-2 text-text-neutral-secondary', className]
    .filter(Boolean)
    .join(' ');
}
