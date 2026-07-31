import type { HTMLAttributes } from 'react';
import { Avatar } from './Avatar';
import {
  avatarStackClassName,
  avatarStackItemClassName,
  avatarStackOverflowClassName,
} from './avatarStyles';
import type { AvatarSize, AvatarStackItem } from './avatarTypes';
import { resolveAvatarColorIndex } from './avatarUtils';

export type AvatarStackProps = {
  avatars: AvatarStackItem[];
  maxVisible?: number;
  size?: AvatarSize;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function AvatarStack({
  avatars,
  maxVisible = 4,
  size = 'sm',
  className,
  ...rest
}: AvatarStackProps) {
  const visibleCount = Math.min(avatars.length, maxVisible);
  const visibleAvatars = avatars.slice(0, visibleCount);
  const overflowCount = avatars.length - visibleCount;

  return (
    <div className={avatarStackClassName(className)} {...rest}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={`${avatar.name ?? avatar.src ?? 'avatar'}-${index}`}
          size={size}
          src={avatar.src}
          alt={avatar.alt}
          name={avatar.name}
          initials={avatar.initials}
          active={avatar.active}
          colorIndex={resolveAvatarColorIndex(avatar.colorIndex, index)}
          className={avatarStackItemClassName({
            overlap: index < visibleAvatars.length - 1 || overflowCount > 0,
          })}
        />
      ))}
      {overflowCount > 0 ? (
        <span className={avatarStackOverflowClassName()} aria-hidden>
          +{overflowCount}
        </span>
      ) : null}
    </div>
  );
}
