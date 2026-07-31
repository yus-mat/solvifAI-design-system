import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { listItemInteractiveClassName } from './overlayStyles';

export type ListItemInteractiveProps = {
  leadingSlot?: ReactNode | null;
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
      {leadingSlot ? (
        <span className="flex shrink-0 items-center">{leadingSlot}</span>
      ) : null}
      <span className="min-w-0 flex-1 truncate body-2 text-foreground">
        {children}
      </span>
      {trailingSlot ? (
        <span className="flex shrink-0 items-center">{trailingSlot}</span>
      ) : null}
    </button>
  );
});

ListItemInteractive.displayName = 'ListItemInteractive';
