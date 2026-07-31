export const diagnosisBrandGradientClassName =
  'bg-user-3-bg';

export const diagnosisWarningGradientClassName =
  'bg-user-4-bg';

export function diagnosisBarSegmentClassName({
  position,
  hasBothSegments,
}: {
  position: 'start' | 'end';
  hasBothSegments: boolean;
}) {
  return [
    'h-full min-w-0 self-stretch',
    diagnosisBarSegmentRadiusClassName({ position, hasBothSegments }),
  ].join(' ');
}

function diagnosisBarSegmentRadiusClassName({
  position,
  hasBothSegments,
}: {
  position: 'start' | 'end';
  hasBothSegments: boolean;
}) {
  if (!hasBothSegments) return 'rounded-full';

  return position === 'start'
    ? 'rounded-l-full rounded-r-sm'
    : 'rounded-l-sm rounded-r-full';
}
