import { motionAppearOpacityClassName } from '@/styles/motion';

export function backdropClassName({
  shown = true,
  interactive = true,
  className,
}: {
  shown?: boolean;
  interactive?: boolean;
  className?: string;
} = {}) {
  return [
    'fixed inset-0 z-40 bg-background-overlay-subtle',
    motionAppearOpacityClassName,
    shown ? 'opacity-100' : 'opacity-0',
    interactive ? '' : 'pointer-events-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
