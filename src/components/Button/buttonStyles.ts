import { focusRingOffsetClassName } from '@/styles/focusRing';
import type { ButtonEmphasis, ButtonIntent, ButtonSize } from './buttonTypes';

const interactiveOverlayClassName = [
  'relative isolate',
  'before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-[inherit]',
  'before:bg-transparent before:transition-colors before:duration-150',
  'hover:before:bg-background-interactive-hover',
  'active:before:bg-background-interactive-pressed',
  '[&>*]:relative [&>*]:z-[2]',
].join(' ');

const layeredInteractiveClassName = [
  interactiveOverlayClassName,
  'before:shadow-[var(--shadow-button)]',
].join(' ');

/** Primary brand — gradient default; hover/pressed reveal solid fill + overlay. */
const primaryBrandClassName = [
  layeredInteractiveClassName,
  'bg-background-action-primary text-text-neutral-inverse',
  'bg-gradient-to-t from-background-action-primary to-background-action-primary-gradient-end',
  'hover:bg-none active:bg-none',
].join(' ');

/** Primary danger — gradient danger/primary → function/error/strong. */
const primaryDangerClassName = [
  layeredInteractiveClassName,
  'bg-background-danger-primary text-text-neutral-inverse',
  'bg-gradient-to-t from-background-danger-primary to-background-function-error-strong',
  'hover:bg-none active:bg-none',
].join(' ');

const secondaryVariantClassName: Record<
  ButtonIntent,
  { bg: string; text: string }
> = {
  default: {
    bg: 'bg-background-neutral-primary',
    text: 'text-text-neutral-primary',
  },
  danger: {
    bg: 'bg-background-neutral-primary',
    text: 'text-text-danger-primary',
  },
};

/**
 * Figma inside stroke via inset shadow — does not add layout height (unlike
 * `border`, which was making secondary ~39px vs primary 37px) and keeps the
 * fill flush with the stroke at rounded corners.
 */
const secondaryInsetStrokeClassName =
  'shadow-[inset_0_0_0_0.5px_var(--border-neutral-muted)]';

const secondaryFilledClassName = (intent: ButtonIntent) => {
  const variant = secondaryVariantClassName[intent];
  return [
    // Depth on ::before (`--shadow-button`); hairline stroke on the element — separate layers.
    layeredInteractiveClassName,
    variant.bg,
    variant.text,
    secondaryInsetStrokeClassName,
  ].join(' ');
};

const ghostClassName = (textClass: string) =>
  [
    interactiveOverlayClassName,
    'bg-transparent',
    textClass,
  ].join(' ');

const baseClassName = [
  'inline-flex cursor-pointer items-center justify-center rounded-lg whitespace-nowrap',
  'transition-[background-color,box-shadow,color,opacity] duration-150',
  focusRingOffsetClassName,
  'disabled:cursor-not-allowed disabled:opacity-[0.38] disabled:pointer-events-none',
].join(' ');

const variantClassName: Record<ButtonEmphasis, Record<ButtonIntent, string>> = {
  primary: {
    default: primaryBrandClassName,
    danger: primaryDangerClassName,
  },
  secondary: {
    default: secondaryFilledClassName('default'),
    danger: secondaryFilledClassName('danger'),
  },
  ghost: {
    default: ghostClassName('text-text-neutral-primary'),
    danger: ghostClassName('text-text-danger-primary'),
  },
};

/** Figma ButtonRegular: MD 48px, SM 32px, with a 4px content gap. */
const textSizeClassName: Record<ButtonSize, string> = {
  md: 'h-12 gap-1 px-4 body-1-bold',
  sm: 'h-8 gap-1 px-3 body-2-bold',
};

const iconOnlySizeClassName: Record<ButtonSize, string> = {
  md: 'size-11 p-0',
  sm: 'size-8 p-0',
};

const loadingMinWidthClassName: Record<ButtonSize, string> = {
  md: 'min-w-[116px]',
  sm: 'min-w-[91px]',
};

export function buttonClassName({
  emphasis,
  intent,
  size,
  loading = false,
  className,
}: {
  emphasis: ButtonEmphasis;
  intent: ButtonIntent;
  size: ButtonSize;
  loading?: boolean;
  className?: string;
}) {
  return [
    baseClassName,
    variantClassName[emphasis][intent],
    textSizeClassName[size],
    loading ? [loadingMinWidthClassName[size], 'gap-0'].join(' ') : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function buttonIconClassName({
  emphasis,
  intent,
  size,
  className,
}: {
  emphasis: ButtonEmphasis;
  intent: ButtonIntent;
  size: ButtonSize;
  className?: string;
}) {
  return [
    baseClassName,
    variantClassName[emphasis][intent],
    iconOnlySizeClassName[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export {
  loadingMinWidthClassName,
  baseClassName,
  layeredInteractiveClassName,
  textSizeClassName,
  iconOnlySizeClassName,
};
