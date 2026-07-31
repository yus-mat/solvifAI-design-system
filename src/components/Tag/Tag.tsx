import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { IconWrapper, tagIconWrapperSize } from '@/components/IconWrapper';
import { tagClassName } from './tagStyles';
import type { TagSize, TagStatus, TagType } from './tagTypes';

export type TagProps = {
  children: ReactNode;
  status?: TagStatus;
  type?: TagType;
  size?: TagSize;
  leadingIcon?: ReactNode | null;
  showLeadingIcon?: boolean;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

/** Tags are decorative — always rendered as a non-interactive span. */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    children,
    status = 'default',
    type = 'filled',
    size = 'sm',
    leadingIcon,
    showLeadingIcon = false,
    className,
    ...rest
  },
  ref,
) {
  const classes = tagClassName({ status, type, size, className });

  return (
    <span ref={ref as Ref<HTMLSpanElement>} className={classes} {...rest}>
      {showLeadingIcon && leadingIcon ? (
        <IconWrapper size={tagIconWrapperSize[size]}>{leadingIcon}</IconWrapper>
      ) : null}
      <span className="truncate">{children}</span>
    </span>
  );
});

Tag.displayName = 'Tag';
