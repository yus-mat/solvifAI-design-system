import { useEffect, useRef, useState } from 'react';
import { AccordionCard } from '@/components/AccordionCard';
import { SplitButton } from '@/components/Button';
import { IconWrapper } from '@/components/IconWrapper';
import { SidePanel } from '@/components/Overlay';
import { ListItem } from '@/components/Overlay/ListItem';
import { Database, FileText, LoaderCircle, Upload } from '@/icons';
import {
  diagnosisBrandGradientClassName,
  diagnosisWarningGradientClassName,
} from '@/styles/diagnosisGradients';
import { motionAppearDurationMs } from '@/styles/motion';
import {
  ANALYSIS_INFO_PANEL_BODY,
  ANALYSIS_INFO_PANEL_TITLE,
  KANTEN_ADD_TO_ITEM_LABEL,
  KANTEN_CATEGORIES,
  KANTEN_DRAWER_SUBTITLE,
  KANTEN_DRAWER_TITLE,
  KANTEN_HEARING_SECTION_LABEL,
  KANTEN_LOADING_TEXT,
  KANTEN_LOADING_TITLE,
  KANTEN_RELATED_FILES_LABEL,
  type KantenCategory,
  type KantenHearingPoint,
} from '../mockData';
import { useInputAnalysis } from './InputAnalysisContext';

const PANEL_WIDTH = 460;
const MEDIA_ANIMATION_MS = 2000;
const MEDIA_LOOP_GAP_MS = 5000;
const MEDIA_LOOP_MS = MEDIA_ANIMATION_MS + MEDIA_LOOP_GAP_MS;

type AsideMode = 'kanten' | 'analysis-info';

function HearingPoint({ point, index }: { point: KantenHearingPoint; index: number }) {
  return (
    <div className="flex flex-col gap-1">
      <ol
        className="m-0 list-decimal py-2 pl-[21px] body-2-bold text-text-neutral-primary"
        start={index + 1}
      >
        <li>{point.question}</li>
      </ol>
      <div className="flex gap-2 rounded-lg bg-background-neutral-secondary p-3">
        <IconWrapper size="xs" className="shrink-0 text-text-neutral-secondary">
          <FileText aria-hidden />
        </IconWrapper>
        <div className="flex min-w-0 flex-1 flex-col gap-2 caption text-text-neutral-secondary">
          <p className="m-0">{KANTEN_RELATED_FILES_LABEL}</p>
          <ul className="m-0 list-disc pl-[18px]">
            {point.relatedFiles.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AddToItemMenu() {
  return (
    <>
      <ListItem leadingSlot={<Database aria-hidden />}>
        AI用データ連携資料を選択
      </ListItem>
      <ListItem leadingSlot={<FileText aria-hidden />}>
        議事録から選択
      </ListItem>
    </>
  );
}

function KantenCategoryCard({
  category,
  defaultOpen,
  onAddLocalFile,
}: {
  category: KantenCategory;
  defaultOpen?: boolean;
  onAddLocalFile: () => void;
}) {
  const hearingPoints = category.hearingPoints ?? [];

  return (
    <AccordionCard
      defaultOpen={defaultOpen}
      header={
        <span className="pl-2 body-2-bold text-text-neutral-primary">
          {category.title}
        </span>
      }
      toggleLabel={`${category.title}を展開`}
    >
      {hearingPoints.length > 0 ? (
        <div className="flex flex-col gap-1 px-2 pb-2 pt-0.5">
          <p className="m-0 caption-bold text-text-neutral-secondary">
            {KANTEN_HEARING_SECTION_LABEL}
          </p>
          <div className="flex flex-col gap-5">
            {hearingPoints.map((point, index) => (
              <HearingPoint key={point.id} point={point} index={index} />
            ))}
            <SplitButton
              variant="secondary"
              leadingIcon={<Upload aria-hidden />}
              onClick={onAddLocalFile}
              menu={<AddToItemMenu />}
              menuPlacement="above"
              menuLabel="追加オプション"
              className="w-fit"
            >
              {KANTEN_ADD_TO_ITEM_LABEL}
            </SplitButton>
          </div>
        </div>
      ) : (
        <p className="m-0 px-2 py-1 caption text-text-neutral-secondary">
          観点を準備中です。
        </p>
      )}
    </AccordionCard>
  );
}

function KantenPanelBody() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { kantenLoading, uploadFile } = useInputAnalysis();

  if (kantenLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <IconWrapper size="lg" className="animate-spin text-text-action-primary">
          <LoaderCircle aria-hidden />
        </IconWrapper>
        <p className="m-0 body-2 text-text-neutral-secondary">
          {KANTEN_LOADING_TEXT}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {KANTEN_CATEGORIES.map((category, index) => (
        <KantenCategoryCard
          key={category.id}
          category={category}
          defaultOpen={index === 0}
          onAddLocalFile={() => fileInputRef.current?.click()}
        />
      ))}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(event) => {
          const files = event.target.files;
          if (files?.length) {
            Array.from(files).forEach((file) => uploadFile(file));
          }
          event.target.value = '';
        }}
      />
    </div>
  );
}

function AnalysisInfoMedia({ playKey }: { playKey: number }) {
  return (
    <div
      key={playKey}
      className="flex h-[118px] items-center justify-center overflow-hidden rounded bg-background-function-info-subtle"
    >
      <div className="relative flex w-[98px] flex-col gap-1 overflow-hidden rounded-base bg-surface-raise px-1.5 py-2 shadow-md">
        <div className="flex h-3 w-full overflow-hidden rounded-[3px]">
          <div
            className={[
              'min-w-0 flex-1 rounded-l-[0.273px]',
              diagnosisBrandGradientClassName,
              'analysis-info-media-filled',
            ].join(' ')}
          />
          <div
            className={[
              'min-w-0 flex-1 rounded-r-[0.273px]',
              diagnosisWarningGradientClassName,
              'analysis-info-media-scarce',
            ].join(' ')}
          />
        </div>
        <div className="flex w-full flex-col gap-[5px] py-1">
          <div className="analysis-info-media-line h-[9.5px] w-full rounded-[1px] bg-background-neutral-muted" />
          <div className="analysis-info-media-line analysis-info-media-line-2 h-[9.5px] w-full rounded-[1px] bg-background-neutral-muted" />
          <div className="analysis-info-media-line analysis-info-media-line-3 h-[9.5px] w-full rounded-[1px] bg-background-neutral-muted" />
          <div className="analysis-info-media-line analysis-info-media-line-4 h-[9.5px] w-full rounded-[1px] bg-background-neutral-muted" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="analysis-info-media-shimmer absolute top-[-30%] left-[-40%] h-[160%] w-[70%] rotate-[20deg] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.6)_35%,rgba(255,255,255,0.8)_50%,rgba(255,255,255,0.6)_65%,transparent_100%)] blur-[2px]" />
        </div>
      </div>
    </div>
  );
}

function AnalysisInfoPanelBody({ playKey }: { playKey: number }) {
  return (
    <div className="flex flex-col gap-4">
      <AnalysisInfoMedia playKey={playKey} />
      <div className="flex flex-col gap-2 px-3 pb-3 pt-2 body-2 text-text-neutral-secondary">
        {ANALYSIS_INFO_PANEL_BODY.map((paragraph) => (
          <p key={paragraph} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * Single floating SidePanel rail for both 観点 and analysis-info.
 * Opening either expands once; switching modes swaps content without re-animating width.
 */
export function InputAsidePanel() {
  const {
    kantenOpen,
    kantenLoading,
    analysisInfoOpen,
    closeKanten,
    closeAnalysisInfo,
  } = useInputAnalysis();

  const mode: AsideMode | null = kantenOpen
    ? 'kanten'
    : analysisInfoOpen
      ? 'analysis-info'
      : null;
  const isOpen = mode != null;

  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const previousModeRef = useRef<AsideMode | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const raf = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setExpanded(true));
      });
      return () => window.cancelAnimationFrame(raf);
    }

    setExpanded(false);
    const timer = window.setTimeout(() => {
      setMounted(false);
    }, motionAppearDurationMs);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (mode === 'analysis-info' && previousModeRef.current !== 'analysis-info') {
      setPlayKey((key) => key + 1);
    }
    previousModeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (mode !== 'analysis-info' || !expanded) return;

    const timer = window.setInterval(() => {
      setPlayKey((key) => key + 1);
    }, MEDIA_LOOP_MS);

    return () => window.clearInterval(timer);
  }, [mode, expanded]);

  if (!mounted) return null;

  const title =
    mode === 'kanten'
      ? kantenLoading
        ? KANTEN_LOADING_TITLE
        : KANTEN_DRAWER_TITLE
      : ANALYSIS_INFO_PANEL_TITLE;
  const subtitle =
    mode === 'kanten' && !kantenLoading ? KANTEN_DRAWER_SUBTITLE : undefined;

  const handleClose = () => {
    if (kantenOpen) closeKanten();
    if (analysisInfoOpen) closeAnalysisInfo();
  };

  return (
    <div
      className="h-full shrink-0 overflow-hidden transition-[width] duration-[var(--motion-appear-duration)] ease-in-out motion-reduce:transition-none"
      style={{ width: expanded ? PANEL_WIDTH : 0 }}
    >
      <div className="h-full shrink-0" style={{ width: PANEL_WIDTH }}>
        <SidePanel
          variant="floating"
          showFooter={false}
          width={PANEL_WIDTH}
          title={title}
          subtitle={subtitle}
          onClose={handleClose}
          className="h-full"
        >
          {mode === 'kanten' ? (
            <KantenPanelBody />
          ) : (
            <AnalysisInfoPanelBody playKey={playKey} />
          )}
        </SidePanel>
      </div>
    </div>
  );
}
