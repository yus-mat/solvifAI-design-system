import {
  focusOutlineSuppressClassName,
  focusRingOnDirectButtonClassName,
} from '@/styles/focusRing';
import {
  motionAppearDurationClassName,
  motionAppearEaseClassName,
  motionAppearTransformClassName,
  motionReduceClassName,
} from '@/styles/motion';
import type { AccordionCardSize } from './accordionCardTypes';

const accordionCardShadowSm = 'shadow-[var(--shadow-sm)]';

const accordionCardShadowMd = 'shadow-[var(--shadow-md)]';

const accordionCardShadowMdOnHover =
  'group-hover/accordion:shadow-[var(--shadow-md)]';

const sizeClassNames: Record<AccordionCardSize, string> = {
  sm: 'p-2',
  md: 'p-4',
};

const bodyPaddingClassNames: Record<AccordionCardSize, string> = {
  sm: 'px-2 pb-2',
  md: 'px-4 pb-4',
};

const bodyGapClassNames: Record<AccordionCardSize, string> = {
  sm: 'pt-3',
  md: 'pt-4',
};

export function accordionCardClassName({
  size = 'md',
  disabled = false,
  expandable = false,
  open = false,
  className,
}: {
  size?: AccordionCardSize;
  disabled?: boolean;
  expandable?: boolean;
  open?: boolean;
  className?: string;
} = {}) {
  return [
    'group/accordion w-full rounded-xl border-[0.5px] border-border-neutral-muted bg-surface-raise',
    'transition-shadow duration-150',
    expandable && !disabled && focusRingOnDirectButtonClassName,
    disabled
      ? accordionCardShadowSm
      : open
        ? accordionCardShadowMd
        : [accordionCardShadowSm, accordionCardShadowMdOnHover].join(' '),
    !expandable && sizeClassNames[size],
    disabled && 'opacity-[0.38]',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function accordionCardTriggerClassName({
  size = 'md',
  disabled = false,
  className,
}: {
  size?: AccordionCardSize;
  disabled?: boolean;
  className?: string;
} = {}) {
  return [
    'flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent text-left',
    sizeClassNames[size],
    !disabled && focusOutlineSuppressClassName,
    disabled && 'cursor-not-allowed',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const accordionCardHeaderClassName = 'min-w-0 flex-1';

export const accordionCardChevronClassName = [
  'flex shrink-0 text-text-neutral-secondary',
  motionAppearTransformClassName,
].join(' ');

export const accordionCardBodyGridClassName = ({
  open,
}: {
  open: boolean;
}) =>
  [
    'grid transition-[grid-template-rows]',
    motionAppearDurationClassName,
    motionAppearEaseClassName,
    motionReduceClassName,
    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
  ].join(' ');

export const accordionCardBodyInnerClassName = 'overflow-hidden rounded-b-xl';

export function accordionCardBodyClassName({
  size = 'md',
}: {
  size?: AccordionCardSize;
} = {}) {
  return ['w-full', bodyGapClassNames[size], bodyPaddingClassNames[size]].join(' ');
}
