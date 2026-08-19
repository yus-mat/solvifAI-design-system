import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { ButtonIcon } from '@/components/Button';
import { useHorizontalResize } from '@/hooks/useHorizontalResize';
import { X } from '@/icons';
import {
  motionAppearDurationClassName,
  motionAppearDurationMs,
  motionAppearEaseClassName,
  motionReduceClassName,
} from '@/styles/motion';
import type { SidePanelResizeEdge, SidePanelVariant } from './sidePanelTypes';
import {
  sidePanelBodyClassName,
  sidePanelClassName,
  sidePanelFooterActionsClassName,
  sidePanelFooterClassName,
  sidePanelHeaderActionsClassName,
  sidePanelHeaderClassName,
  sidePanelResizeHandleClassName,
  sidePanelResizeHandlePositionClassName,
  sidePanelSubtitleClassName,
  sidePanelTitleClassName,
  sidePanelTitleGroupClassName,
} from './sidePanelStyles';

export type SidePanelProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  headerAction?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  showFooter?: boolean;
  footer?: ReactNode;
  children?: ReactNode;
  variant?: SidePanelVariant;
  resizable?: boolean;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  resizeEdge?: SidePanelResizeEdge;
  /** Smoothly grows the panel from zero width when it first mounts. */
  animateWidthOnMount?: boolean;
  /** Controls the width-collapse exit animation when enabled. */
  open?: boolean;
  /** Called after the width-collapse exit animation completes. */
  onWidthExitComplete?: () => void;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

const DEFAULT_WIDTH = 460;
const MIN_WIDTH = 360;
const MAX_WIDTH = 680;

export function SidePanel({
  title,
  subtitle,
  headerAction,
  onClose,
  closeLabel = '閉じる',
  showFooter = true,
  footer,
  children,
  variant = 'floating',
  resizable = false,
  defaultWidth = DEFAULT_WIDTH,
  minWidth = MIN_WIDTH,
  maxWidth = MAX_WIDTH,
  width: widthProp,
  resizeEdge = 'start',
  animateWidthOnMount = false,
  open = true,
  onWidthExitComplete,
  className,
  style,
  ...rest
}: SidePanelProps) {
  const { width: resizedWidth, onPointerDown } = useHorizontalResize({
    defaultWidth,
    minWidth,
    maxWidth,
    edge: resizeEdge,
  });

  const targetWidth = widthProp ?? (resizable ? resizedWidth : defaultWidth);
  const [entering, setEntering] = useState(animateWidthOnMount);
  const [closing, setClosing] = useState(false);
  const [displayWidth, setDisplayWidth] = useState(
    animateWidthOnMount ? 0 : targetWidth,
  );
  const previousOpenRef = useRef(open);
  const exitCompleteRef = useRef(onWidthExitComplete);

  useEffect(() => {
    exitCompleteRef.current = onWidthExitComplete;
  }, [onWidthExitComplete]);

  useEffect(() => {
    if (!animateWidthOnMount) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setDisplayWidth(targetWidth);
      });
    });
    const timer = window.setTimeout(
      () => setEntering(false),
      motionAppearDurationMs + 50,
    );

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(timer);
    };
    // This effect intentionally runs only for the initial mount transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateWidthOnMount]);

  useEffect(() => {
    const wasOpen = previousOpenRef.current;
    previousOpenRef.current = open;
    if (!animateWidthOnMount || wasOpen === open) return;

    if (!open) {
      setEntering(false);
      setClosing(true);
      setDisplayWidth(0);
      const timer = window.setTimeout(() => {
        setClosing(false);
        exitCompleteRef.current?.();
      }, motionAppearDurationMs + 50);
      return () => window.clearTimeout(timer);
    }

    setClosing(false);
    setEntering(true);
    setDisplayWidth(0);
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setDisplayWidth(targetWidth);
      });
    });
    const timer = window.setTimeout(
      () => setEntering(false),
      motionAppearDurationMs + 50,
    );
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(timer);
    };
  }, [animateWidthOnMount, open, targetWidth]);

  const transitioningWidth = entering || closing;

  useEffect(() => {
    if ((!animateWidthOnMount || !transitioningWidth) && open) {
      setDisplayWidth(targetWidth);
    }
  }, [animateWidthOnMount, open, targetWidth, transitioningWidth]);

  return (
    <aside
      className={sidePanelClassName({
        className: [
          transitioningWidth ? 'transition-[width]' : '',
          transitioningWidth ? motionAppearDurationClassName : '',
          transitioningWidth ? motionAppearEaseClassName : '',
          transitioningWidth ? motionReduceClassName : '',
          className,
        ]
          .filter(Boolean)
          .join(' '),
        variant,
      })}
      style={{ ...style, width: displayWidth }}
      {...rest}
    >
      {resizable ? (
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="パネル幅を調整"
          className={[
            sidePanelResizeHandleClassName,
            sidePanelResizeHandlePositionClassName(resizeEdge),
          ].join(' ')}
          onPointerDown={onPointerDown}
        />
      ) : null}

      <header className={sidePanelHeaderClassName}>
        <div className={sidePanelTitleGroupClassName}>
          <h2 className={sidePanelTitleClassName}>{title}</h2>
          {subtitle ? (
            <p className={sidePanelSubtitleClassName}>{subtitle}</p>
          ) : null}
        </div>
        {headerAction || onClose ? (
          <div className={sidePanelHeaderActionsClassName}>
            {headerAction}
            {onClose ? (
              <ButtonIcon
                emphasis="ghost"
                intent="default"
                size="md"
                icon={<X aria-hidden />}
                aria-label={closeLabel}
                tooltipShowOnFocus={false}
                onClick={onClose}
              />
            ) : null}
          </div>
        ) : null}
      </header>

      {children ? <div className={sidePanelBodyClassName}>{children}</div> : null}

      {showFooter && footer ? (
        <footer className={sidePanelFooterClassName}>
          <div className={sidePanelFooterActionsClassName}>{footer}</div>
        </footer>
      ) : null}
    </aside>
  );
}
