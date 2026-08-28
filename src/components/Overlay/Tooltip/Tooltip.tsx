import type { HTMLAttributes, ReactNode } from 'react';
import {
  resolveTooltipPlacement,
  type TooltipPosition,
} from './tooltipTypes';
import {
  tooltipBodyClassName,
  tooltipContainerClassName,
  tooltipPointerColClassName,
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
  const placement = resolveTooltipPlacement(position);
  const { side } = placement;
  const isHorizontal = side === 'left' || side === 'right';

  const body = (
    <div className={tooltipBodyClassName({ side })}>{content}</div>
  );

  if (isHorizontal) {
    const align = (placement as { side: 'left' | 'right'; align: 'top' | 'center' | 'bottom' }).align;
    // Arrow direction points toward the trigger (opposite of where the panel is)
    const direction = side === 'right' ? 'left' : 'right';
    const pointer = (
      <div className={tooltipPointerColClassName({ align })}>
        <TooltipPointer direction={direction} />
      </div>
    );

    return (
      <div
        role="tooltip"
        className={[tooltipContainerClassName({ side }), className].filter(Boolean).join(' ')}
        {...rest}
      >
        {/* right side: arrow first (left of body), left side: body first (arrow on right) */}
        {side === 'right' ? (
          <>
            {pointer}
            {body}
          </>
        ) : (
          <>
            {body}
            {pointer}
          </>
        )}
      </div>
    );
  }

  const align = (placement as { side: 'top' | 'bottom'; align: 'left' | 'center' | 'right' }).align;
  // Arrow direction points toward the trigger
  const direction = side === 'top' ? 'down' : 'up';
  const pointer = (
    <div className={tooltipPointerRowClassName({ align })}>
      <TooltipPointer direction={direction} />
    </div>
  );

  return (
    <div
      role="tooltip"
      className={[tooltipContainerClassName({ side }), className].filter(Boolean).join(' ')}
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
