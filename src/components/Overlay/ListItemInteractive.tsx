import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { IconWrapper } from '@/components/IconWrapper';
import { listItemInteractiveClassName } from './overlayStyles';

export type ListItemInteractiveProps = {
  /** Icon content — wrapped in `IconWrapper` size `s` to pair with the body-2 label. */
  leadingSlot?: ReactNode | null;
  /** Free-form content (text, tags) — rendered as-is, not icon-sized. */
  trailingSlot?: ReactNode | null;
  hasBorder?: boolean;
  selected?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    children: ReactNode;
  };

export const ListItemInteractive = forwardRef<
  HTMLButtonElement,
  ListItemInteractiveProps
>(function ListItemInteractive(
  {
    leadingSlot,
    trailingSlot,
    hasBorder = false,
    selected = false,
    children,
    className,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={listItemInteractiveClassName({
        hasBorder,
        selected,
        className,
      })}
      {...rest}
    >
      {leadingSlot ? <IconWrapper size="s">{leadingSlot}</IconWrapper> : null}
      <span className="min-w-0 flex-1 truncate body-2 text-text-primary">
        {children}
      </span>
      {trailingSlot ? (
        <span className="flex shrink-0 items-center">{trailingSlot}</span>
      ) : null}
    </button>
  );
});

ListItemInteractive.displayName = 'ListItemInteractive';
