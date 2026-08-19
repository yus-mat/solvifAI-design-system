import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { motionAppearOpacityClassName } from '@/styles/motion';
import {
  resolveTooltipPlacement,
  type TooltipPosition,
} from './tooltipTypes';
import { tooltipTriggerPanelClassName } from './tooltipStyles';
import { Tooltip } from './Tooltip';
import { useOverlayPresence } from '../useOverlayPresence';

/** Delay before showing so quick hover/focus transitions aren't disruptive. */
export const TOOLTIP_SHOW_DELAY_MS = 500;

export type TooltipTriggerProps = {
  content: ReactNode;
  children: ReactElement;
  position?: TooltipPosition;
  /** Hover/focus show delay in ms. Defaults to {@link TOOLTIP_SHOW_DELAY_MS}. */
  showDelayMs?: number;
  /**
   * When false, the tooltip shows on hover only (not on focus).
   * Use for controls that receive programmatic focus, such as overlay close buttons.
   */
  showOnFocus?: boolean;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'content'>;

export function TooltipTrigger({
  content,
  children,
  position = 'bottom-center',
  showDelayMs = TOOLTIP_SHOW_DELAY_MS,
  showOnFocus = true,
  className,
  ...rest
}: TooltipTriggerProps) {
  const tooltipId = useId();
  const [active, setActive] = useState(false);
  const showTimeoutRef = useRef<number | null>(null);
  const { mounted, shown, onTransitionEnd } = useOverlayPresence(active);
  const { side, align } = resolveTooltipPlacement(position);

  const clearShowTimeout = () => {
    if (showTimeoutRef.current != null) {
      window.clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  };

  const show = () => {
    clearShowTimeout();
    if (showDelayMs <= 0) {
      setActive(true);
      return;
    }
    showTimeoutRef.current = window.setTimeout(() => {
      setActive(true);
      showTimeoutRef.current = null;
    }, showDelayMs);
  };

  const hide = () => {
    clearShowTimeout();
    setActive(false);
  };

  useEffect(() => () => clearShowTimeout(), []);

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      hide();
    }
  };

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        'aria-describedby': active ? tooltipId : undefined,
      } as Record<string, unknown>)
    : children;

  return (
    <span
      className={['relative inline-flex', className].filter(Boolean).join(' ')}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={showOnFocus ? show : undefined}
      onBlur={showOnFocus ? handleBlur : undefined}
      {...rest}
    >
      {trigger}
      {mounted ? (
        <span
          id={tooltipId}
          className={[
            tooltipTriggerPanelClassName({ side, align }),
            motionAppearOpacityClassName,
            shown ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onTransitionEnd={onTransitionEnd}
        >
          <Tooltip content={content} position={position} />
        </span>
      ) : null}
    </span>
  );
}
