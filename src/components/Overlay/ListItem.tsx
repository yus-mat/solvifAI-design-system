import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { IconWrapper } from '@/components/IconWrapper';
import { ChevronDown } from '@/icons';
import { listItemClassName } from './overlayStyles';

export type ListItemIntent = 'default' | 'destructive';

export type ListItemProps = {
  intent?: ListItemIntent;
  leadingSlot?: ReactNode;
  selected?: boolean;
  value?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    children: ReactNode;
  };

export const ListItem = forwardRef<HTMLButtonElement, ListItemProps>(
  function ListItem(
    {
      intent = 'default',
      leadingSlot,
      selected = false,
      children,
      className,
      type = 'button',
      role = 'option',
      'aria-selected': ariaSelected,
      ...rest
    },
    ref,
  ) {
    const showLeading = leadingSlot !== null;
    const icon =
      leadingSlot === undefined ? (
        <ChevronDown aria-hidden />
      ) : (
        leadingSlot
      );

    return (
      <button
        ref={ref}
        type={type}
        role={role}
        aria-selected={ariaSelected ?? (selected || undefined)}
        className={listItemClassName({
          intent,
          selected,
          className,
        })}
        {...rest}
      >
        {showLeading && icon ? (
          <IconWrapper size="s">{icon}</IconWrapper>
        ) : null}
        <span className="min-w-0 flex-1 truncate">{children}</span>
      </button>
    );
  },
);

ListItem.displayName = 'ListItem';
