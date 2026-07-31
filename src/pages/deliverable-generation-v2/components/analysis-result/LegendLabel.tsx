import type { HTMLAttributes, ReactNode } from 'react';
import { Indicator } from '@/components/Indicator';
import type { IndicatorVariant } from '@/components/Indicator';

export type LegendLabelType = 'success' | 'warning';

export type LegendLabelProps = {
  type?: LegendLabelType;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const typeToVariant: Record<LegendLabelType, IndicatorVariant> = {
  success: 'blue',
  warning: 'orange',
};

const typeToTextClassName: Record<LegendLabelType, string> = {
  success: 'text-text-action-primary',
  warning: 'text-text-function-warning',
};

export function LegendLabel({
  type = 'success',
  children,
  className,
  ...rest
}: LegendLabelProps) {
  return (
    <div
      className={['flex items-center gap-2', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <Indicator variant={typeToVariant[type]} />
      <span className={['body-2-bold', typeToTextClassName[type]].join(' ')}>
        {children}
      </span>
    </div>
  );
}
