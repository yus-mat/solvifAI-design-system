import {
  diagnosisBrandGradientClassName,
  diagnosisWarningGradientClassName,
} from '@/styles/diagnosisGradients';
import type { IndicatorVariant } from './indicatorTypes';

const variantFillClassNames: Record<IndicatorVariant, string> = {
  blue: diagnosisBrandGradientClassName,
  orange: diagnosisWarningGradientClassName,
};

/** Figma Indicator: 12×12 hit box for both variants. */
export function indicatorClassName({
  className,
}: {
  variant?: IndicatorVariant;
  className?: string;
} = {}) {
  return ['relative inline-flex size-3 shrink-0 items-center justify-center', className]
    .filter(Boolean)
    .join(' ');
}

/**
 * Figma shapes inside the 12×12 box:
 * - Blue: 8×8 circle
 * - Orange: ~9×8.5 triangle (pointer)
 */
export function indicatorDotClassName({
  variant = 'blue',
}: {
  variant?: IndicatorVariant;
} = {}) {
  if (variant === 'orange') {
    return [
      'block h-[8.5px] w-[9px] shrink-0',
      '[clip-path:polygon(50%_0%,0%_100%,100%_100%)]',
      variantFillClassNames.orange,
    ].join(' ');
  }

  return [
    'block size-2 shrink-0 rounded-full',
    variantFillClassNames.blue,
  ].join(' ');
}
