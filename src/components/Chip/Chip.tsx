import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  forwardRef,
} from 'react';
import { ButtonIcon } from '@/components/Button';
import { IconWrapper } from '@/components/IconWrapper';
import { X } from '@/icons';
import { useChipGroupContext } from './ChipGroupContext';
import {
  chipClassName,
  chipRemoveButtonClassName,
} from './chipStyles';

export type ChipProps = {
  children: ReactNode;
  leadingSlot?: ReactNode | null;
  removable?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

function defaultRemoveLabel(children: ReactNode) {
  return typeof children === 'string' ? `${children}を削除` : '削除';
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  {
    children,
    leadingSlot,
    removable,
    onRemove,
    removeLabel,
    disabled = false,
    className,
    onClick,
    ...rest
  },
  ref,
) {
  const chipGroup = useChipGroupContext();
  const registerChip = chipGroup?.registerChip;
  const unregisterChip = chipGroup?.unregisterChip;
  const chipId = useId();
  const onRemoveRef = useRef(onRemove);
  onRemoveRef.current = onRemove;

  const stableOnRemove = useCallback(() => {
    onRemoveRef.current?.();
  }, []);

  const showRemove = (removable ?? Boolean(onRemove)) && Boolean(onRemove);
  const isManagedByGroup = chipGroup !== null;
  // registryVersion keeps chip indices current after register/unregister.
  const chipIndex =
    chipGroup === null ? -1 : chipGroup.getChipIndex(chipId);
  const isCompositeFocused =
    chipGroup?.mode === 'composite' &&
    chipGroup.focusedChipIndex >= 0 &&
    chipGroup.focusedChipIndex === chipIndex;

  useLayoutEffect(() => {
    if (!registerChip || !unregisterChip) return;

    registerChip(chipId, { onRemove: stableOnRemove, disabled });
    return () => unregisterChip(chipId);
  }, [registerChip, unregisterChip, chipId, stableOnRemove, disabled]);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !chipGroup || chipGroup.mode !== 'composite') {
      return;
    }
    chipGroup.focusChip(chipId);
  }

  return (
    <div
      ref={ref}
      id={chipGroup?.mode === 'composite' ? chipId : undefined}
      role="listitem"
      className={chipClassName({
        disabled,
        focused: isCompositeFocused,
        className,
      })}
      aria-selected={isCompositeFocused || undefined}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      {...rest}
    >
      {leadingSlot ? (
        <IconWrapper size="s">{leadingSlot}</IconWrapper>
      ) : null}
      <span className="min-w-0 truncate body-2-bold text-foreground">
        {children}
      </span>
      {showRemove ? (
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size="sm"
          icon={<X aria-hidden />}
          aria-label={removeLabel ?? defaultRemoveLabel(children)}
          disabled={disabled}
          tabIndex={isManagedByGroup ? -1 : undefined}
          className={chipRemoveButtonClassName}
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.();
          }}
        />
      ) : null}
    </div>
  );
});

Chip.displayName = 'Chip';
