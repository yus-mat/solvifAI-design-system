export function snackBarClassName({
  className,
}: {
  className?: string;
} = {}) {
  return [
    'inline-flex w-full max-w-md items-start gap-3 rounded-lg',
    'border border-border-neutral-primary bg-background-neutral-inverse',
    'px-4 py-3.5',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const snackBarContentClassName = 'flex min-w-0 flex-1 flex-col gap-1';

export const snackBarTitleClassName =
  'm-0 body-2-bold text-text-neutral-inverse';

export const snackBarSubtitleClassName =
  'm-0 caption text-text-neutral-inverse';

export const snackBarIconClassName = 'text-text-neutral-inverse';

/** Viewport anchor — top right with margin. */
export const snackBarViewportClassName =
  'pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-end px-6';

/** Viewport anchor — bottom center with margin. */
export const snackBarBottomCenterViewportClassName =
  'pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-6';
