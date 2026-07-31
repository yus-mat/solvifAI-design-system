import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

export type UseHorizontalResizeOptions = {
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
  edge?: 'start' | 'end';
};

export function useHorizontalResize({
  defaultWidth,
  minWidth,
  maxWidth,
  edge = 'start',
}: UseHorizontalResizeOptions) {
  const [width, setWidth] = useState(defaultWidth);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(defaultWidth);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      draggingRef.current = true;
      startXRef.current = event.clientX;
      startWidthRef.current = width;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [width],
  );

  useEffect(() => {
    function onPointerMove(event: PointerEvent) {
      if (!draggingRef.current) return;

      const delta = event.clientX - startXRef.current;
      const nextWidth =
        edge === 'start'
          ? startWidthRef.current - delta
          : startWidthRef.current + delta;

      setWidth(Math.min(maxWidth, Math.max(minWidth, nextWidth)));
    }

    function onPointerUp() {
      draggingRef.current = false;
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [edge, maxWidth, minWidth]);

  return { width, onPointerDown };
}
