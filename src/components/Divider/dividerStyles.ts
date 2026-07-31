export type DividerOrientation = 'horizontal' | 'vertical';

export function dividerClassName({
  orientation = 'horizontal',
  className,
}: {
  orientation?: DividerOrientation;
  className?: string;
} = {}) {
  return [
    'shrink-0 border-0 bg-border-neutral-muted',
    orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px self-stretch',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
