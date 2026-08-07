import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { IconWrapper } from '@/components/IconWrapper';
import { DropdownList } from './DropdownList';
import type { ListItemProps } from './ListItem';
import { ChevronDown, ChevronUp, PencilLine } from '@/icons';
import { dropdownTriggerClassName } from './overlayStyles';

function getItemLabel(node: ReactNode): string | undefined {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getItemLabel).filter(Boolean).join('');
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getItemLabel(node.props.children);
  }
  return undefined;
}

export type DropdownProps = {
  label?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  leadingSlot?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value' | 'defaultValue'>;

export function Dropdown({
  label = 'Label',
  value: valueProp,
  defaultValue,
  onValueChange,
  leadingSlot,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  disabled,
  ...rest
}: DropdownProps) {
  const fallbackValue =
    defaultValue ?? (typeof label === 'string' ? label : undefined) ?? '';

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [uncontrolledValue, setUncontrolledValue] = useState(fallbackValue);
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpenControlled = openProp !== undefined;
  const open = isOpenControlled ? openProp : uncontrolledOpen;

  const isValueControlled = valueProp !== undefined;
  const selectedValue = isValueControlled ? valueProp : uncontrolledValue;

  const setOpen = (next: boolean) => {
    if (!isOpenControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const handleSelect = (next: string) => {
    if (!isValueControlled) setUncontrolledValue(next);
    onValueChange?.(next);
    setOpen(false);
  };

  const showLeading = leadingSlot !== null;
  const leading =
    leadingSlot === undefined ? (
      <IconWrapper size="s">
        <PencilLine aria-hidden />
      </IconWrapper>
    ) : (
      leadingSlot
    );

  const items = Children.map(children, (child) => {
    if (!isValidElement<ListItemProps>(child)) return child;

    const itemValue =
      child.props.value ?? getItemLabel(child.props.children) ?? '';

    return cloneElement(child as ReactElement<ListItemProps>, {
      selected: itemValue === selectedValue,
      onClick: (event) => {
        child.props.onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          handleSelect(itemValue);
        }
      },
    });
  });

  const displayLabel = selectedValue || label;

  return (
    <div ref={containerRef} className="relative w-full min-w-0">
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listId : undefined}
        className={dropdownTriggerClassName({ open, className })}
        onClick={() => setOpen(!open)}
        {...rest}
      >
        <span className="flex min-w-0 flex-1 items-center gap-3">
          {showLeading && leading ? (
            <span className="flex shrink-0 items-center">{leading}</span>
          ) : null}
          <span className="truncate">{displayLabel}</span>
        </span>
        <span className="flex shrink-0 items-center self-center">
          {open ? (
            <ChevronUp className="size-[14px]" aria-hidden />
          ) : (
            <ChevronDown className="size-[14px]" aria-hidden />
          )}
        </span>
      </button>

      {open ? (
        <div className="absolute top-full left-0 z-10 mt-0.5 w-max max-w-[280px]">
          <DropdownList id={listId}>{items}</DropdownList>
        </div>
      ) : null}
    </div>
  );
}
