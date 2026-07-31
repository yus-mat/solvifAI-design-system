import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/Button';
import { ButtonIcon } from '@/components/Button/ButtonIcon';
import { TextArea } from '@/components/Field/TextArea';
import { Backdrop } from '@/components/Overlay/Backdrop';
import { Dialog } from '@/components/Overlay/Dialog';
import { Tag } from '@/components/Tag';
import {
  ChevronLeft,
  ChevronRight,
  CircleMinus,
  Info,
  Lightbulb,
  PencilLine,
  Triangle,
} from '@/icons';
import type {
  ChangeLocation,
  ConfirmationIssue,
  ConfirmationIssueCategory,
  TextSegment,
} from '../mockData';

const categoryIcons: Record<ConfirmationIssueCategory, ReactNode> = {
  不足: <CircleMinus className="text-text-function-error" aria-hidden />,
  矛盾: <Info className="text-text-function-info" aria-hidden />,
  提案: <Lightbulb className="text-text-function-success" aria-hidden />,
  曖昧: <Triangle className="text-text-function-warning" aria-hidden />,
};

function segmentsToPlainText(segments: TextSegment[]) {
  return segments.map((segment) => segment.text).join('');
}

function renderSegments(segments: TextSegment[], kind: 'before' | 'after') {
  return segments.map((segment, index) => {
    if (!segment.highlight) {
      return <span key={index}>{segment.text}</span>;
    }

    const colorClass =
      kind === 'before'
        ? 'text-text-function-error'
        : 'text-text-function-success';

    return (
      <span key={index} className={colorClass}>
        {segment.text}
      </span>
    );
  });
}

function buildEditedAfterTexts(locations: ChangeLocation[]) {
  return Object.fromEntries(
    locations.map((location) => [location.id, segmentsToPlainText(location.after)]),
  );
}

function DiffColumn({
  label,
  status,
  borderClass,
  locations,
  kind,
}: {
  label: string;
  status: 'error' | 'success';
  borderClass: string;
  locations: ChangeLocation[];
  kind: 'before' | 'after';
}) {
  return (
    <div
      className={[
        'flex min-h-0 min-w-0 flex-1 flex-col border-l-2',
        borderClass,
      ].join(' ')}
    >
      <div className="shrink-0 p-4 pb-0">
        <Tag status={status} type="filled" size="md">
          {label}
        </Tag>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pt-8">
        <div className="flex flex-col gap-6">
          {locations.map((location) => (
            <div key={location.id} className="flex flex-col gap-1">
              <p className="m-0 body-2 text-text-neutral-secondary">
                {location.heading}
              </p>
              <p className="m-0 body-2 text-text-neutral-primary">
                {renderSegments(
                  kind === 'before' ? location.before : location.after,
                  kind,
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AfterDiffColumn({
  locations,
  isEditing,
  editedTexts,
  invalidLocationIds,
  onEditedTextChange,
  onToggleEdit,
}: {
  locations: ChangeLocation[];
  isEditing: boolean;
  editedTexts: Record<string, string>;
  invalidLocationIds: Set<string>;
  onEditedTextChange: (locationId: string, value: string) => void;
  onToggleEdit: () => void;
}) {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col border-l-2 border-border-function-success">
      <div className="shrink-0 p-4 pb-0">
        <Tag status="success" type="filled" size="md">
          変更後
        </Tag>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-14 pt-8">
        <div className="flex flex-col gap-6">
          {locations.map((location) => {
            const hasError = invalidLocationIds.has(location.id);
            const originalText = segmentsToPlainText(location.after);
            const editedText = editedTexts[location.id] ?? originalText;
            const wasEdited = editedText !== originalText;

            return (
              <div key={location.id} className="flex flex-col gap-1">
                <p className="m-0 body-2 text-text-neutral-secondary">
                  {location.heading}
                </p>
                {isEditing ? (
                  <TextArea
                    value={editedText}
                    onChange={(event) =>
                      onEditedTextChange(location.id, event.target.value)
                    }
                    rows={4}
                    resize="vertical"
                    invalid={hasError}
                    aria-label={`${location.heading}の変更後テキスト`}
                  />
                ) : wasEdited ? (
                  <p className="m-0 whitespace-pre-wrap body-2 text-text-function-success">
                    {editedText}
                  </p>
                ) : (
                  <p className="m-0 body-2 text-text-neutral-primary">
                    {renderSegments(location.after, 'after')}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end p-4">
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size="md"
          icon={<PencilLine aria-hidden />}
          aria-label={isEditing ? '変更後の編集を終了' : '変更後を編集'}
          aria-pressed={isEditing}
          onClick={onToggleEdit}
          className="pointer-events-auto shrink-0"
        />
      </div>
    </div>
  );
}

export type ApplyConfirmationDialogMode = 'apply' | 'review';

export type ApplyConfirmationDialogProps = {
  open: boolean;
  issue: ConfirmationIssue;
  answer: string;
  /** Apply flow confirms changes; review is read-only for 反映済み cards. */
  mode?: ApplyConfirmationDialogMode;
  /** 1-based index among confirmation cards being applied. */
  cardIndex?: number;
  /** Total confirmation cards being applied in this session. */
  cardTotal?: number;
  onClose: () => void;
  onConfirm?: () => void;
  /** Called with the next 1-based card index when prev/next is pressed. */
  onCardIndexChange?: (nextIndex: number) => void;
};

export function ApplyConfirmationDialog({
  open,
  issue,
  answer,
  mode = 'apply',
  cardIndex = 1,
  cardTotal = 1,
  onClose,
  onConfirm,
  onCardIndexChange,
}: ApplyConfirmationDialogProps) {
  const isReview = mode === 'review';
  const [isEditingAfter, setIsEditingAfter] = useState(false);
  const [editedAfterTexts, setEditedAfterTexts] = useState<Record<string, string>>(
    () => buildEditedAfterTexts(issue.changePreview),
  );
  const [invalidLocationIds, setInvalidLocationIds] = useState<Set<string>>(
    () => new Set(),
  );

  const confirmLabel = cardTotal === 1 ? '反映' : '全て反映';

  useEffect(() => {
    if (!open) {
      setIsEditingAfter(false);
      setInvalidLocationIds(new Set());
      return;
    }
    setEditedAfterTexts(buildEditedAfterTexts(issue.changePreview));
    setIsEditingAfter(false);
    setInvalidLocationIds(new Set());
  }, [open, issue.id, issue.changePreview]);

  const handleEditedTextChange = (locationId: string, value: string) => {
    setEditedAfterTexts((prev) => ({ ...prev, [locationId]: value }));
    setInvalidLocationIds((prev) => {
      if (!prev.has(locationId)) return prev;
      const next = new Set(prev);
      next.delete(locationId);
      return next;
    });
  };

  const handleConfirm = () => {
    if (isReview || !onConfirm) return;

    const emptyIds = issue.changePreview
      .filter((location) => !(editedAfterTexts[location.id] ?? '').trim())
      .map((location) => location.id);

    if (emptyIds.length > 0) {
      setIsEditingAfter(true);
      setInvalidLocationIds(new Set(emptyIds));
      return;
    }

    setInvalidLocationIds(new Set());
    onConfirm();
  };

  return (
    <>
      <Backdrop open={open} onClick={onClose} />
      <Dialog
        open={open}
        onClose={onClose}
        title={isReview ? '反映箇所の確認' : '確認事項の反映箇所'}
        className="flex max-h-[90vh] !max-w-[1016px] flex-col overflow-hidden"
        footer={
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ButtonIcon
                emphasis="ghost"
                intent="default"
                size="md"
                icon={<ChevronLeft aria-hidden />}
                aria-label="前の確認事項"
                tooltipPosition="top-center"
                disabled={cardIndex <= 1 || !onCardIndexChange}
                onClick={() => onCardIndexChange?.(cardIndex - 1)}
              />
              <span className="body-2 text-text-neutral-primary">
                {cardIndex}件目（全{cardTotal}件）
              </span>
              <ButtonIcon
                emphasis="ghost"
                intent="default"
                size="md"
                icon={<ChevronRight aria-hidden />}
                aria-label="次の確認事項"
                tooltipPosition="top-center"
                disabled={cardIndex >= cardTotal || !onCardIndexChange}
                onClick={() => onCardIndexChange?.(cardIndex + 1)}
              />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {isReview ? (
                <Button onClick={onClose}>閉じる</Button>
              ) : (
                <>
                  <Button emphasis="ghost" intent="default" onClick={onClose}>
                    戻る
                  </Button>
                  <Button onClick={handleConfirm}>{confirmLabel}</Button>
                </>
              )}
            </div>
          </div>
        }
      >
        <div className="flex min-h-0 flex-col gap-4">
          <div className="flex shrink-0 items-start gap-3">
            <Tag
              status="default"
              type="filled"
              size="sm"
              showLeadingIcon
              leadingIcon={categoryIcons[issue.category]}
            >
              {issue.category}
            </Tag>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="m-0 caption-bold text-text-neutral-secondary">
                {issue.title}
              </p>
              <p className="m-0 line-clamp-3 caption text-text-neutral-primary">
                {answer}
              </p>
            </div>
          </div>

          <div className="flex h-[420px] shrink-0 gap-2 overflow-hidden rounded-base bg-background-neutral-secondary">
            <DiffColumn
              label="変更前"
              status="error"
              borderClass="border-border-function-error"
              locations={issue.changePreview}
              kind="before"
            />
            {isReview ? (
              <DiffColumn
                label="変更後"
                status="success"
                borderClass="border-border-function-success"
                locations={issue.changePreview}
                kind="after"
              />
            ) : (
              <AfterDiffColumn
                locations={issue.changePreview}
                isEditing={isEditingAfter}
                editedTexts={editedAfterTexts}
                invalidLocationIds={invalidLocationIds}
                onEditedTextChange={handleEditedTextChange}
                onToggleEdit={() => setIsEditingAfter((prev) => !prev)}
              />
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
