import type { HTMLAttributes } from 'react';
import { User } from '@/icons';
import {
  avatarIconClassName,
  avatarImageClassName,
  avatarInnerClassName,
  avatarInitialsClassName,
  avatarRootClassName,
} from './avatarStyles';
import type { AvatarColorIndex, AvatarSize } from './avatarTypes';
import { getAvatarInitials } from './avatarUtils';

export type AvatarProps = {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  colorIndex?: AvatarColorIndex;
  active?: boolean;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export function Avatar({
  size = 'sm',
  src,
  alt = '',
  name,
  initials,
  colorIndex = 1,
  active = false,
  className,
  ...rest
}: AvatarProps) {
  const resolvedInitials =
    initials ?? (name ? getAvatarInitials(name) : undefined);
  const variant = src ? 'image' : resolvedInitials ? 'initial' : 'icon';

  return (
    <span
      className={avatarRootClassName({ active, className })}
      {...rest}
    >
      <span
        className={avatarInnerClassName({ size, colorIndex, variant })}
      >
        {variant === 'image' ? (
          <img
            src={src}
            alt={alt || name || ''}
            className={avatarImageClassName()}
          />
        ) : null}
        {variant === 'initial' ? (
          <span className={avatarInitialsClassName(size)} aria-hidden>
            {resolvedInitials}
          </span>
        ) : null}
        {variant === 'icon' ? (
          <User className={avatarIconClassName(size)} aria-hidden />
        ) : null}
      </span>
    </span>
  );
}
