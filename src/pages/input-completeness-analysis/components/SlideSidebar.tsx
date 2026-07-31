import { IconWrapper } from '@/components/IconWrapper';
import { LayoutGrid, PanelLeft } from '@/icons';
import type { SlideItem } from '../mockData';

export type SlideSidebarProps = {
  slides: SlideItem[];
  selectedSlide?: number;
  onSelectSlide?: (slideNumber: number) => void;
  /** Slide numbers currently receiving apply changes (shimmer). */
  applyingSlideNumbers?: number[];
};

function SlideThumbnail({
  slide,
  selected,
  isShimmering,
  onSelect,
}: {
  slide: SlideItem;
  selected: boolean;
  isShimmering: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-busy={isShimmering || undefined}
      className={[
        'relative flex w-full flex-col overflow-hidden rounded-md border p-[5px] text-left transition-shadow',
        selected
          ? 'border-border-action-primary bg-background-neutral-primary shadow-[0_0_0_2px_rgba(50,126,225,0.2)]'
          : 'border-border-neutral-muted bg-background-neutral-primary',
      ].join(' ')}
    >
      <div className="relative flex h-[60px] items-center justify-center overflow-hidden rounded bg-gradient-to-r from-background-action-primary to-background-action-primary-gradient-end px-2">
        <span className="text-center text-[7px] font-bold leading-tight text-text-neutral-inverse">
          {slide.title}
        </span>
        {isShimmering ? <div className="slide-apply-shimmer" aria-hidden /> : null}
      </div>
      <span
        className={[
          'px-1 py-[3px] text-[9px] leading-[1.5]',
          selected
            ? 'font-medium text-text-action-primary'
            : 'text-text-neutral-secondary',
        ].join(' ')}
      >
        {slide.number}
      </span>
    </button>
  );
}

export function SlideSidebar({
  slides,
  selectedSlide = 1,
  onSelectSlide,
  applyingSlideNumbers = [],
}: SlideSidebarProps) {
  const shimmerSet = new Set(applyingSlideNumbers);

  return (
    <aside className="flex h-full w-[168px] shrink-0 flex-col gap-2 overflow-y-auto border-r border-border-neutral-muted bg-surface-muted py-3 pl-2 pr-[9px]">
      <div className="flex items-start justify-between">
        <IconWrapper size="s">
          <LayoutGrid aria-hidden />
        </IconWrapper>
        <IconWrapper size="s">
          <PanelLeft aria-hidden />
        </IconWrapper>
      </div>

      <p className="m-0 px-1 text-[10px] font-bold leading-[1.5] text-text-neutral-secondary">
        スライド一覧
      </p>

      <div className="flex flex-col gap-1.5">
        {slides.map((slide) => (
          <SlideThumbnail
            key={slide.number}
            slide={slide}
            selected={slide.number === selectedSlide}
            isShimmering={shimmerSet.has(slide.number)}
            onSelect={() => onSelectSlide?.(slide.number)}
          />
        ))}
      </div>
    </aside>
  );
}
