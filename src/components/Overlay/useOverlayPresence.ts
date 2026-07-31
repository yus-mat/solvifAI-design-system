import { useEffect, useState, type TransitionEvent } from 'react';

/** Keeps overlay layers mounted through exit fades. */
export function useOverlayPresence(open: boolean) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(open);
  const [interactive, setInteractive] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setInteractive(true);

      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setShown(true));
      });

      return () => cancelAnimationFrame(frame);
    }

    setShown(false);
  }, [open]);

  const onTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== 'opacity') return;
    if (!open) {
      setMounted(false);
      setInteractive(false);
    }
  };

  return { mounted, shown, interactive, onTransitionEnd };
}
