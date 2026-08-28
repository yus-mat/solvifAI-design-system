const VERTICAL_PATH = 'M0 14L11.15 1.6C12.3.2 14.7.2 15.85 1.6L27 14H0Z';

// 90° CW rotation of the vertical path: (x,y) → (14-y, x) in a 14×27 viewBox
const RIGHT_PATH = 'M0 0L12.4 11.15C13.8 12.3 13.8 14.7 12.4 15.85L0 27V0Z';
const LEFT_PATH = 'M14 0L1.6 11.15C.2 12.3 .2 14.7 1.6 15.85L14 27V0Z';

export type TooltipPointerDirection = 'up' | 'down' | 'left' | 'right';

export function TooltipPointer({
  direction = 'up',
}: {
  direction?: TooltipPointerDirection;
}) {
  const isHorizontal = direction === 'left' || direction === 'right';

  if (isHorizontal) {
    return (
      <svg
        width="7"
        height="14"
        viewBox="0 0 14 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-[1] block h-3.5 w-[7px] shrink-0"
        aria-hidden
      >
        <path
          d={direction === 'right' ? RIGHT_PATH : LEFT_PATH}
          fill="var(--background-neutral-inverse)"
          stroke="var(--background-neutral-inverse)"
          strokeWidth="0.75"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="14"
      height="7"
      viewBox="0 0 27 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[
        'relative z-[1] block h-[7px] w-3.5 shrink-0',
        direction === 'down' ? 'rotate-180' : null,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      <path
        d={VERTICAL_PATH}
        fill="var(--background-neutral-inverse)"
        stroke="var(--background-neutral-inverse)"
        strokeWidth="0.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
