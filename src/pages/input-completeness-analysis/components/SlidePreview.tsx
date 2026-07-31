import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ButtonIcon } from '@/components/Button/ButtonIcon';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from '@/icons';
import {
  getSlideAnnotations,
  getSlideContent,
  SLIDES,
  type SlideTextAnnotation,
} from '../mockData';
import { renderAnnotatedCardBody } from './SlideTextHighlight';

/** Natural width the slide is authored at; smaller frames scale it down. */
const SLIDE_BASE_WIDTH = 680;
const ZOOM_MIN = 0.6;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.1;
const WHEEL_ZOOM_STEP = 0.05;

export type SlidePreviewProps = {
  currentSlide?: number;
  totalSlides?: number;
  /** Shows a shimmer overlay while apply changes are being written into the draft. */
  isApplying?: boolean;
  onSlideChange?: (slideNumber: number) => void;
  onSendSlideAiChat?: (
    annotation: SlideTextAnnotation,
    message: string,
  ) => void;
  onOpenAnalysisSource?: (annotation: SlideTextAnnotation) => void;
};

export function SlidePreview({
  currentSlide = 1,
  totalSlides = SLIDES.length,
  isApplying = false,
  onSlideChange,
  onSendSlideAiChat,
  onOpenAnalysisSource,
}: SlidePreviewProps) {
  const content = getSlideContent(currentSlide);
  const annotations = useMemo(
    () => getSlideAnnotations(currentSlide),
    [currentSlide],
  );
  const annotationByLabel = useMemo(() => {
    const map = new Map<string, SlideTextAnnotation>();
    for (const item of annotations) {
      map.set(item.cardLabel, item);
    }
    return map;
  }, [annotations]);
  const frameRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);
  const [userZoom, setUserZoom] = useState(1);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const update = () => {
      const available = frame.clientWidth;
      setFitScale(Math.min(1, available / SLIDE_BASE_WIDTH));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY < 0 ? WHEEL_ZOOM_STEP : -WHEEL_ZOOM_STEP;
      setUserZoom((prev) =>
        Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(prev + delta).toFixed(2))),
      );
    };

    frame.addEventListener('wheel', onWheel, { passive: false });
    return () => frame.removeEventListener('wheel', onWheel);
  }, []);

  const scale = fitScale * userZoom;
  const canZoomOut = userZoom > ZOOM_MIN + 0.001;
  const canZoomIn = userZoom < ZOOM_MAX - 0.001;

  return (
    <main className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-4 bg-surface-muted">
      <div
        ref={frameRef}
        className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden"
      >
        <div
          className="origin-center shrink-0"
          style={{
            width: SLIDE_BASE_WIDTH,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-background-action-primary to-background-action-primary-gradient-end shadow-[0_8px_40px_rgba(0,0,0,0.18)]"
            aria-busy={isApplying || undefined}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 size-[200px] rounded-full bg-white/[0.04]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-[60px] -left-[30px] size-[240px] rounded-full bg-white/[0.03]"
              aria-hidden
            />

            <div className="relative flex min-h-[446px] flex-col justify-between px-14 pb-12 pt-[116px]">
              <div className="flex flex-col gap-7">
                <div className="flex items-center gap-3">
                  <div
                    className="h-[45px] w-1 shrink-0 rounded bg-text-function-info"
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1">
                    <p className="m-0 text-[10px] uppercase tracking-widest text-white/60">
                      {content.section}
                    </p>
                    <h2 className="m-0 text-[22px] font-bold leading-tight text-text-neutral-inverse">
                      {content.title}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                  {content.cards.map((card) => {
                    const annotation = annotationByLabel.get(card.label);
                    return (
                      <div
                        key={card.label}
                        className="flex flex-col gap-1.5 rounded-lg bg-white/[0.08] p-4"
                      >
                        <p className="m-0 text-[9px] font-bold uppercase text-text-function-info">
                          {card.label}
                        </p>
                        <p className="m-0 text-[11px] leading-[1.6] text-white/85">
                          {onSendSlideAiChat && onOpenAnalysisSource
                            ? renderAnnotatedCardBody({
                                body: card.body,
                                annotation,
                                disabled: isApplying,
                                onSendAiChat: onSendSlideAiChat,
                                onOpenAnalysisSource,
                              })
                            : card.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="absolute bottom-4 right-14 m-0 text-[10px] text-white/40">
                {currentSlide} / {totalSlides}
              </p>
            </div>

            {isApplying ? (
              <div className="slide-apply-shimmer" aria-hidden />
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4 pb-4">
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size="sm"
          icon={<ChevronLeft aria-hidden />}
          aria-label="前のスライド"
          tooltipPosition="top-center"
          disabled={isApplying || currentSlide <= 1}
          onClick={() => onSlideChange?.(currentSlide - 1)}
        />
        <span className="caption text-text-neutral-secondary">
          スライド {currentSlide} / {totalSlides}
        </span>
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size="sm"
          icon={<ChevronRight aria-hidden />}
          aria-label="次のスライド"
          tooltipPosition="top-center"
          disabled={isApplying || currentSlide >= totalSlides}
          onClick={() => onSlideChange?.(currentSlide + 1)}
        />
        <div className="ml-2 flex items-center gap-1 border-l border-border-neutral-muted pl-4">
          <ButtonIcon
            emphasis="ghost"
            intent="default"
            size="sm"
            icon={<ZoomOut aria-hidden />}
            aria-label="縮小"
            disabled={isApplying || !canZoomOut}
            onClick={() =>
              setUserZoom((prev) => Math.max(ZOOM_MIN, +(prev - ZOOM_STEP).toFixed(2)))
            }
          />
          <span className="min-w-10 text-center caption text-text-neutral-secondary">
            {Math.round(userZoom * 100)}%
          </span>
          <ButtonIcon
            emphasis="ghost"
            intent="default"
            size="sm"
            icon={<ZoomIn aria-hidden />}
            aria-label="拡大"
            disabled={isApplying || !canZoomIn}
            onClick={() =>
              setUserZoom((prev) => Math.min(ZOOM_MAX, +(prev + ZOOM_STEP).toFixed(2)))
            }
          />
        </div>
      </div>

    </main>
  );
}
