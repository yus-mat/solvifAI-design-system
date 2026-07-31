export type AvatarSize = 'sm' | 'md';

export type AvatarColorIndex = 1 | 2 | 3 | 4 | 5 | 6;

export type AvatarStackItem = {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  colorIndex?: AvatarColorIndex;
  active?: boolean;
};
