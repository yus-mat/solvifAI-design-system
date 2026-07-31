/**
 * Soft-tipped caret. High-res viewBox + light same-color stroke helps
 * retina anti-aliasing on the diagonal edges.
 */
const POINTER_PATH =
  'M0 14L11.15 1.6C12.3.2 14.7.2 15.85 1.6L27 14H0Z';

export function TooltipPointer({ inverted = false }: { inverted?: boolean }) {
  return (
    <svg
      width="14"
      height="7"
      viewBox="0 0 27 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[
        'relative z-[1] block h-[7px] w-3.5 shrink-0',
        inverted ? 'rotate-180' : null,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      <path
        d={POINTER_PATH}
        fill="var(--background-neutral-inverse)"
        stroke="var(--background-neutral-inverse)"
        strokeWidth="0.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
