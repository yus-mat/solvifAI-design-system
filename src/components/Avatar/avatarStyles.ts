import type { AvatarColorIndex, AvatarSize } from './avatarTypes';

const userBgClassName: Record<AvatarColorIndex, string> = {
  1: 'bg-user-1-bg',
  2: 'bg-user-2-bg',
  3: 'bg-user-3-bg',
  4: 'bg-user-4-bg',
  5: 'bg-user-5-bg',
  6: 'bg-user-6-bg',
};

const userTextClassName: Record<AvatarColorIndex, string> = {
  1: 'text-user-1-text',
  2: 'text-user-2-text',
  3: 'text-user-3-text',
  4: 'text-user-4-text',
  5: 'text-user-5-text',
  6: 'text-user-6-text',
};

const sizeClassName: Record<AvatarSize, string> = {
  sm: 'size-6',
  md: 'size-8',
};

const initialsClassName: Record<AvatarSize, string> = {
  sm: 'caption-bold',
  md: 'caption-bold',
};

const iconClassName: Record<AvatarSize, string> = {
  sm: 'size-5',
  md: 'size-5',
};

export function avatarRootClassName({
  active = false,
  className,
}: {
  active?: boolean;
  className?: string;
} = {}) {
  return [
    'inline-flex shrink-0 rounded-full',
    active ? 'border border-border-action-primary' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function avatarInnerClassName({
  size,
  colorIndex,
  variant,
}: {
  size: AvatarSize;
  colorIndex: AvatarColorIndex;
  variant: 'initial' | 'image' | 'icon';
}) {
  return [
    'flex shrink-0 items-center justify-center overflow-hidden rounded-full',
    'border-[1.5px] border-border-neutral-inverse',
    sizeClassName[size],
    variant === 'initial'
      ? [userBgClassName[colorIndex], userTextClassName[colorIndex]].join(' ')
      : variant === 'icon'
        ? 'bg-background-neutral-secondary text-text-neutral-primary'
        : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function avatarInitialsClassName(size: AvatarSize) {
  return initialsClassName[size];
}

export function avatarImageClassName() {
  return 'size-full object-cover';
}

export function avatarIconClassName(size: AvatarSize) {
  return iconClassName[size];
}

export function avatarStackClassName(className?: string) {
  return ['inline-flex items-center', className].filter(Boolean).join(' ');
}

export function avatarStackItemClassName({
  overlap = false,
}: {
  overlap?: boolean;
} = {}) {
  return overlap ? '-mr-2' : '';
}

export function avatarStackOverflowClassName() {
  return 'shrink-0 pl-3 caption-bold text-foreground';
}
