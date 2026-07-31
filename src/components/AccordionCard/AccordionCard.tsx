import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { IconWrapper } from '@/components/IconWrapper';
import { ChevronDown } from '@/icons';
import type { AccordionCardSize } from './accordionCardTypes';
import {
  accordionCardBodyClassName,
  accordionCardBodyGridClassName,
  accordionCardBodyInnerClassName,
  accordionCardChevronClassName,
  accordionCardClassName,
  accordionCardHeaderClassName,
  accordionCardTriggerClassName,
} from './accordionCardStyles';

export type AccordionCardProps = {
  size?: AccordionCardSize;
  header: ReactNode;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  toggleLabel?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function AccordionCard({
  size = 'md',
  header,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  toggleLabel = '展開する',
  className,
  ...rest
}: AccordionCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const canExpand = children != null && !disabled;

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const toggle = () => {
    if (canExpand) setOpen(!open);
  };

  return (
    <div
      className={accordionCardClassName({
        size,
        disabled,
        expandable: canExpand,
        open: canExpand && open,
        className,
      })}
      {...rest}
    >
      {canExpand ? (
        <button
          type="button"
          disabled={disabled}
          aria-expanded={open}
          aria-label={toggleLabel}
          className={accordionCardTriggerClassName({ size, disabled })}
          onClick={toggle}
        >
          <div className={accordionCardHeaderClassName}>{header}</div>
          <IconWrapper
            size="s"
            className={[
              accordionCardChevronClassName,
              open ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
          >
            <ChevronDown aria-hidden />
          </IconWrapper>
        </button>
      ) : (
        <div className={accordionCardHeaderClassName}>{header}</div>
      )}

      {canExpand ? (
        <div className={accordionCardBodyGridClassName({ open })}>
          <div className={accordionCardBodyInnerClassName}>
            <div className={accordionCardBodyClassName({ size })}>{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
