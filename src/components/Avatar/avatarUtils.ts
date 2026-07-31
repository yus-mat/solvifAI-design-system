import type { AvatarColorIndex } from './avatarTypes';

/** First character of the family name (姓) — first segment in "姓 名" order. */
export function getAvatarInitials(name: string) {
  const familyName = name.trim().split(/\s+/).filter(Boolean)[0] ?? '';
  return familyName.slice(0, 1);
}

export function resolveAvatarColorIndex(
  colorIndex: AvatarColorIndex | undefined,
  stackIndex: number,
): AvatarColorIndex {
  if (colorIndex !== undefined) return colorIndex;
  return ((stackIndex % 6) + 1) as AvatarColorIndex;
}
