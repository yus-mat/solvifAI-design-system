import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => {
    if (element.getAttribute('aria-hidden') === 'true') return false;

    let parent = element.parentElement;
    while (parent && parent !== container) {
      if (parent.getAttribute('aria-hidden') === 'true') return false;
      parent = parent.parentElement;
    }

    return element.getClientRects().length > 0;
  });
}

/**
 * Escape to close, Tab focus trap, initial focus, and restore on close.
 * Additive behavior for Dialog / Drawer — does not change visual API.
 */
export function useModalA11y({
  open,
  onClose,
  containerRef,
}: {
  open: boolean;
  onClose?: () => void;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current =
      (document.activeElement as HTMLElement | null) ?? null;

    const container = containerRef.current;
    if (container) {
      const focusables = getFocusableElements(container);
      const target = focusables[0] ?? container;
      if (target === container && !container.hasAttribute('tabindex')) {
        container.tabIndex = -1;
      }
      target.focus({ preventScroll: true });
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        const close = onCloseRef.current;
        if (!close) return;
        event.preventDefault();
        event.stopPropagation();
        close();
        return;
      }

      if (event.key !== 'Tab') return;
      const root = containerRef.current;
      if (!root) return;

      const nodes = getFocusableElements(root);
      if (nodes.length === 0) {
        event.preventDefault();
        root.focus({ preventScroll: true });
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !root.contains(active)) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        }
      } else if (active === last || !root.contains(active)) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    }

    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      const previous = previouslyFocusedRef.current;
      if (previous && typeof previous.focus === 'function') {
        previous.focus({ preventScroll: true });
      }
    };
  }, [open, containerRef]);
}
