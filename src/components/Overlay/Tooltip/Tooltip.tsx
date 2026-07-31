import type { HTMLAttributes, ReactNode } from 'react';
import {
  resolveTooltipPlacement,
  type TooltipPosition,
} from './tooltipTypes';
import {
  tooltipBodyClassName,
  tooltipClassName,
  tooltipPointerRowClassName,
} from './tooltipStyles';
import { TooltipPointer } from './TooltipPointer';

export type TooltipProps = {
  content: ReactNode;
  position?: TooltipPosition;
} & Omit<HTMLAttributes<HTMLDivElement>, 'content'>;

export function Tooltip({
  content,
  position = 'bottom-center',
  className,
  ...rest
}: TooltipProps) {
  const { side, align } = resolveTooltipPlacement(position);
  const pointer = (
    <div className={tooltipPointerRowClassName({ align })}>
      <TooltipPointer inverted={side === 'top'} />
    </div>
  );
  const body = (
    <div className={tooltipBodyClassName({ side })}>{content}</div>
  );

  return (
    <div
      role="tooltip"
      className={[tooltipClassName, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {side === 'top' ? (
        <>
          {body}
          {pointer}
        </>
      ) : (
        <>
          {pointer}
          {body}
        </>
      )}
    </div>
  );
}
