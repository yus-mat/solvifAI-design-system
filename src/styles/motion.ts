/**
 * Tentative motion standard for component appearance (enter / exit).
 *
 * Use for overlays, drawers, dialogs, popovers, and similar mount transitions.
 * Do not use for hover / press color fades — those stay on `duration-150` defaults.
 */
export const motionAppearEaseClassName = 'ease-[var(--motion-appear-easing)]';

export const motionAppearDurationClassName =
  'duration-[var(--motion-appear-duration)]';

export const motionReduceClassName = 'motion-reduce:transition-none';

export const motionAppearTransformClassName = [
  'transition-transform',
  motionAppearDurationClassName,
  motionAppearEaseClassName,
  motionReduceClassName,
].join(' ');

export const motionAppearOpacityClassName = [
  'transition-opacity',
  motionAppearDurationClassName,
  motionAppearEaseClassName,
  motionReduceClassName,
].join(' ');

/** Raw value — matches `--motion-appear-easing` in global.css */
export const motionAppearEasing = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

/** Raw value — matches `--motion-appear-duration` in global.css */
export const motionAppearDurationMs = 300;
