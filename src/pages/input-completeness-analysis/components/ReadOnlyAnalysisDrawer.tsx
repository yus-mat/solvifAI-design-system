import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { IconWrapper } from '@/components/IconWrapper';
import { Backdrop } from '@/components/Overlay/Backdrop';
import { Drawer } from '@/components/Overlay/Drawer';
import { ChevronDown, ChevronLeft } from '@/icons';
import {
  READONLY_ANALYSIS_CATEGORIES,
  READONLY_ANALYSIS_DRAWER_TITLE,
  READONLY_ANALYSIS_TITLE,
  type ReadOnlyAnalysisCategory,
} from '../mockData';

export type ReadOnlyAnalysisDrawerProps = {
  open: boolean;
  focusedCategoryId?: string | null;
  onClose: () => void;
};

function CategorySection({
  category,
  defaultOpen,
}: {
  category: ReadOnlyAnalysisCategory;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  const sufficientCount = category.answers.filter(
    (item) => item.status === 'sufficient',
  ).length;
  const missingCount = category.answers.filter(
    (item) => item.status === 'missing',
  ).length;

  return (
    <section className="overflow-hidden rounded-xl border-[0.5px] border-border-neutral-muted bg-surface-raise shadow-sm">
      <button
        type="button"
        className="flex h-16 w-full cursor-pointer items-center gap-2 bg-transparent p-2 text-left"
        aria-expanded={open}
        aria-label={`${category.title}の詳細を表示`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex min-w-0 flex-1 items-center justify-between gap-4 pl-2">
          <span className="truncate body-1-bold text-text-neutral-primary">
            {category.title}
          </span>
          <span className="flex shrink-0 items-center gap-4 overflow-hidden rounded-base caption-bold">
            <span className="flex items-center gap-2 text-text-action-primary">
              <span
                className="size-3 rounded-full bg-user-3-bg"
                aria-hidden
              />
              {sufficientCount}
            </span>
            <span className="flex items-center gap-2 text-text-function-warning">
              <img
                src="/icons/indicator-warning.svg"
                alt=""
                className="size-3"
                aria-hidden
              />
              {missingCount}
            </span>
          </span>
        </span>
        <span className="flex size-12 shrink-0 items-center justify-center">
          <IconWrapper
            size="s"
            className={[
              'text-text-neutral-secondary transition-transform duration-150',
              open ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
          >
            <ChevronDown aria-hidden />
          </IconWrapper>
        </span>
      </button>

      {open ? (
        <div className="border-t border-border-neutral-muted px-4 py-4">
          <div className="flex flex-col gap-4">
            {category.answers.map((item) => (
              <div key={item.id} className="flex flex-col gap-1.5">
                <p className="m-0 body-2-bold text-text-neutral-primary">
                  {item.question}
                </p>
                <p className="m-0 whitespace-pre-wrap body-2 text-text-neutral-secondary">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ScoreLabel({
  type,
  count,
}: {
  type: 'sufficient' | 'missing';
  count: number;
}) {
  const sufficient = type === 'sufficient';

  return (
    <div className="flex flex-col justify-center gap-2 p-1">
      <div
        className={[
          'flex items-center gap-2 body-2-bold',
          sufficient
            ? 'text-text-action-primary'
            : 'text-text-function-warning',
        ].join(' ')}
      >
        {sufficient ? (
          <span
            className="size-3 rounded-full bg-user-3-bg"
            aria-hidden
          />
        ) : (
          <img
            src="/icons/indicator-warning.svg"
            alt=""
            className="size-3"
            aria-hidden
          />
        )}
        {sufficient ? '充足' : '不足'}
      </div>
      <div className="flex items-baseline justify-center gap-1 text-text-neutral-primary">
        <span className="heading-1">{count}</span>
        <span className="caption-bold">件</span>
      </div>
    </div>
  );
}

export function ReadOnlyAnalysisDrawer({
  open,
  focusedCategoryId = null,
  onClose,
}: ReadOnlyAnalysisDrawerProps) {
  return (
    <>
      <Backdrop open={open} onClick={onClose} />
      <Drawer
        size="lg"
        open={open}
        title={READONLY_ANALYSIS_DRAWER_TITLE}
        onClose={onClose}
        className={[
          '[&>header]:py-4',
          '[&>footer]:border-t [&>footer]:border-border-neutral-muted',
          '[&>footer]:px-4 [&>footer]:py-4',
        ].join(' ')}
        footer={
          <>
            <Button
              emphasis="secondary"
              intent="default"
              leadingIcon={<ChevronLeft aria-hidden />}
              onClick={onClose}
            >
              戻る
            </Button>
            <Button onClick={onClose}>ドラフト作成</Button>
          </>
        }
      >
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-2 pt-6">
          <section className="flex flex-col gap-6 pb-6">
            <h3 className="m-0 heading-1 text-text-neutral-primary">
              {READONLY_ANALYSIS_TITLE}
            </h3>

            <div
              className="flex h-4 w-full items-start gap-px overflow-hidden rounded-base"
              aria-label="充足 78件、不足 78件"
            >
              <span className="h-full w-[68.75%] rounded-l-full rounded-r-sm bg-user-3-bg" />
              <span className="h-full flex-1 rounded-l-sm rounded-r-full bg-user-4-bg" />
            </div>

            <div className="flex items-stretch gap-3">
              <ScoreLabel type="sufficient" count={78} />
              <span
                className="w-px self-stretch bg-border-neutral-muted"
                aria-hidden
              />
              <ScoreLabel type="missing" count={78} />
            </div>
          </section>

          {READONLY_ANALYSIS_CATEGORIES.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              defaultOpen={category.id === focusedCategoryId}
            />
          ))}
        </div>
      </Drawer>
    </>
  );
}
