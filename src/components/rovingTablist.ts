import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

/** WAI-ARIA tablist / segmented control arrow navigation (wraps). */
export function getNextRovingIndex(
  key: string,
  currentIndex: number,
  count: number,
): number | null {
  if (count <= 0) return null;

  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (currentIndex + 1) % count;
    case 'ArrowLeft':
    case 'ArrowUp':
      return (currentIndex - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
}

export function handleRovingTablistKeyDown(
  event: ReactKeyboardEvent | KeyboardEvent,
  options: {
    currentIndex: number;
    count: number;
    onMove: (nextIndex: number) => void;
  },
): boolean {
  const next = getNextRovingIndex(
    event.key,
    options.currentIndex,
    options.count,
  );
  if (next === null) return false;
  event.preventDefault();
  options.onMove(next);
  return true;
}

export function queryTablistTabs(
  list: HTMLElement,
): HTMLElement[] {
  return Array.from(
    list.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])'),
  );
}
