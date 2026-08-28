import type { IconWrapperSize } from './iconWrapperTypes';

/**
 * Figma IconWrapper — wrapper box + inner icon dimensions per size variant.
 * Wrapper boxes stay on the Figma footprint; padding is tighter so the glyph
 * can use a larger optical size (helps Phosphor’s padded 256 viewBox).
 */
const sizeClassNames: Record<
  IconWrapperSize,
  { wrapper: string; icon: string }
> = {
  xs: {
    wrapper: 'size-4 p-px',
    icon: 'size-3.5',
  },
  s: {
    wrapper: 'size-5 p-0.5',
    icon: 'size-4',
  },
  md: {
    wrapper: 'size-6 p-0.5',
    icon: 'size-5',
  },
  lg: {
    wrapper: 'size-7 p-0.5',
    icon: 'size-6',
  },
};

export function iconWrapperClassName({
  size = 'md',
  className,
}: {
  size?: IconWrapperSize;
  className?: string;
} = {}) {
  return [
    'inline-flex shrink-0 items-center justify-center',
    sizeClassNames[size].wrapper,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function iconWrapperIconClassName(size: IconWrapperSize = 'md') {
  return [
    'flex items-center justify-center [&_svg]:size-full',
    sizeClassNames[size].icon,
  ].join(' ');
}

/** Map Button `size` to IconWrapper size for leading/trailing icons. */
export const buttonIconWrapperSize: Record<'md' | 'sm', IconWrapperSize> = {
  md: 'md',
  sm: 's',
};

/** Map ButtonIcon `size` to IconWrapper size. */
export const buttonIconOnlyWrapperSize: Record<'md' | 'sm', IconWrapperSize> = {
  md: 'md',
  sm: 's',
};

/** Map Tag `size` to IconWrapper size. */
export const tagIconWrapperSize: Record<'sm' | 'md', IconWrapperSize> = {
  sm: 'xs',
  md: 's',
};
