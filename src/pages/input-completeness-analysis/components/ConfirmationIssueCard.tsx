import { useEffect, useState, type ReactNode } from 'react';
import { AccordionCard } from '@/components/AccordionCard';
import { Button } from '@/components/Button';
import { ButtonIcon } from '@/components/Button/ButtonIcon';
import { SplitButton } from '@/components/Button/SplitButton';
import { Checkbox } from '@/components/Control/Checkbox';
import { FormField } from '@/components/Field';
import { TextArea } from '@/components/Field/TextArea';
import { ListItem } from '@/components/Overlay/ListItem';
import { Tag } from '@/components/Tag';
import {
  CheckCheck,
  CircleMinus,
  Info,
  Lightbulb,
  LoaderCircle,
  MessageCircleMore,
  PencilLine,
  RefreshCw,
  Sparkles,
  Triangle,
} from '@/icons';
import type { ConfirmationIssue, ConfirmationIssueCategory } from '../mockData';

const categoryIcons: Record<ConfirmationIssueCategory, ReactNode> = {
  不足: <CircleMinus className="text-text-function-error" aria-hidden />,
  矛盾: <Info className="text-text-function-info" aria-hidden />,
  提案: <Lightbulb className="text-text-function-success" aria-hidden />,
  曖昧: <Triangle className="text-text-function-warning" aria-hidden />,
};

function AnswerContentWithShimmer({
  isGenerating,
  children,
}: {
  isGenerating: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-base"
      role={isGenerating ? 'status' : undefined}
      aria-live={isGenerating ? 'polite' : undefined}
      aria-busy={isGenerating || undefined}
      aria-label={isGenerating ? '回答を生成中' : undefined}
    >
      {children}
      {isGenerating ? <div className="answer-generate-shimmer" aria-hidden /> : null}
    </div>
  );
}

export type ConfirmationIssueCardProps = {
  issue: ConfirmationIssue;
  answer: string;
  onAnswerChange: (value: string) => void;
  onApply: () => void;
  onGenerateAnswer?: () => void;
  onRegenerateAnswer?: () => void;
  onOpenAiChat?: () => void;
  onStartEdit?: () => void;
  onSaveEdit?: (value: string) => void;
  onCancelEdit?: () => void;
  onReviewLocations?: () => void;
  hasError?: boolean;
  isScanning?: boolean;
  isGenerating?: boolean;
  isEditing?: boolean;
  isAiAnswer?: boolean;
  isResolved?: boolean;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ConfirmationIssueCard({
  issue,
  answer,
  onAnswerChange,
  onApply,
  onGenerateAnswer,
  onRegenerateAnswer,
  onOpenAiChat,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onReviewLocations,
  hasError = false,
  isScanning = false,
  isGenerating = false,
  isEditing = false,
  isAiAnswer = false,
  isResolved = false,
  selected = false,
  onSelectedChange,
  open,
  onOpenChange,
}: ConfirmationIssueCardProps) {
  const [editDraft, setEditDraft] = useState(answer);
  const [hovered, setHovered] = useState(false);
  const isBusy = isScanning || isGenerating;
  const showRenderedText = isAiAnswer && !isEditing && !isResolved;
  const showManualInput = !isResolved && !showRenderedText;
  const canSelect = !isResolved && Boolean(onSelectedChange);
  const showSelectControl = canSelect && (hovered || selected);

  useEffect(() => {
    if (isEditing) {
      setEditDraft(answer);
    }
  }, [isEditing, answer]);

  const generateMenu = onOpenAiChat ? (
    <ListItem
      leadingSlot={<MessageCircleMore aria-hidden />}
      onClick={onOpenAiChat}
    >
      AIチャットに相談
    </ListItem>
  ) : null;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {showSelectControl ? (
        <div
          className="absolute -right-1 -top-1 z-20"
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <label
            className={[
              'relative isolate flex w-24 cursor-pointer items-center justify-center gap-3',
              'rounded-md bg-background-action-secondary px-3 py-2',
              'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]',
              'before:bg-transparent before:transition-colors before:duration-150',
              selected
                ? 'before:bg-background-interactive-pressed'
                : 'hover:before:bg-background-interactive-hover',
              '[&>*]:relative [&>*]:z-[1]',
            ].join(' ')}
          >
            <Checkbox
              checked={selected}
              aria-label={`${issue.title}を選択`}
              onChange={(event) => onSelectedChange?.(event.target.checked)}
            />
            <span className="caption-bold text-text-neutral-primary">
              選択
            </span>
          </label>
        </div>
      ) : null}

      <AccordionCard
        size="md"
        open={open}
        onOpenChange={isBusy ? undefined : onOpenChange}
        toggleLabel={`${issue.title}の詳細を表示`}
        className={[
          'shadow-sm',
          hasError ? 'border-border-function-error' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        header={
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap gap-1">
              <Tag
                status="default"
                type="filled"
                size="sm"
                showLeadingIcon
                leadingIcon={categoryIcons[issue.category]}
              >
                {issue.category}
              </Tag>
              {isResolved ? (
                <Tag
                  status="success"
                  type="filled"
                  size="sm"
                  showLeadingIcon
                  leadingIcon={<CheckCheck aria-hidden />}
                >
                  反映済み
                </Tag>
              ) : null}
            </div>
            <p className="m-0 text-left body-2 text-text-neutral-primary">
              {issue.title}
            </p>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="m-0 body-2 text-text-neutral-secondary">
            {issue.question}
          </p>

          {showRenderedText ? (
            <AnswerContentWithShimmer isGenerating={isGenerating}>
              <p className="m-0 whitespace-pre-wrap caption text-text-neutral-primary">
                {answer}
              </p>
            </AnswerContentWithShimmer>
          ) : null}

          {showManualInput ? (
            <AnswerContentWithShimmer isGenerating={isGenerating}>
              <FormField
                hideLabel
                label="回答"
                error={hasError ? '回答内容を見直してください' : undefined}
              >
                <TextArea
                  value={isEditing ? editDraft : answer}
                  onChange={(event) => {
                    if (isEditing) {
                      setEditDraft(event.target.value);
                      return;
                    }
                    onAnswerChange(event.target.value);
                  }}
                  rows={3}
                  resize="none"
                  placeholder="回答を入力..."
                  invalid={hasError}
                  disabled={isScanning || isGenerating}
                  aria-label={`${issue.title}への回答`}
                />
              </FormField>
            </AnswerContentWithShimmer>
          ) : null}

          <div className="relative z-10 flex items-center justify-between gap-2 overflow-visible">
            {isResolved ? (
              <div className="flex flex-1 items-center justify-end gap-2">
                <Button
                  emphasis="secondary"
                  intent="default"
                  size="sm"
                  onClick={onReviewLocations}
                >
                  反映箇所の確認
                </Button>
              </div>
            ) : isEditing ? (
              <>
                <div className="flex items-center gap-2">
                  <Button
                    emphasis="ghost"
                    intent="default"
                    size="sm"
                    onClick={onCancelEdit}
                  >
                    キャンセル
                  </Button>
                  <Button
                    emphasis="secondary"
                    intent="default"
                    size="sm"
                    onClick={() => onSaveEdit?.(editDraft)}
                    disabled={!editDraft.trim()}
                  >
                    保存
                  </Button>
                </div>
                <Button size="sm" disabled>
                  反映
                </Button>
              </>
            ) : (
              <>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  {isAiAnswer ? (
                    <>
                      <Tag
                        status="brand"
                        type="filled"
                        size="sm"
                        showLeadingIcon
                        leadingIcon={<CheckCheck aria-hidden />}
                      >
                        AI回答
                      </Tag>
                      <ButtonIcon
                        emphasis="ghost"
                        intent="default"
                        size="sm"
                        icon={<RefreshCw aria-hidden />}
                        aria-label="回答を再生成"
                        onClick={onRegenerateAnswer}
                        disabled={isBusy}
                      />
                    </>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-2 overflow-visible">
                  {isAiAnswer ? (
                    <SplitButton
                      variant="secondary"
                      leadingIcon={<PencilLine aria-hidden />}
                      onClick={onStartEdit}
                      disabled={isBusy}
                      menu={generateMenu}
                      menuPlacement="above"
                      menuLabel="回答オプション"
                    >
                      編集
                    </SplitButton>
                  ) : (
                    <SplitButton
                      variant="secondary"
                      leadingIcon={<Sparkles aria-hidden />}
                      onClick={onGenerateAnswer}
                      disabled={isBusy}
                      menu={generateMenu}
                      menuPlacement="above"
                      menuLabel="回答オプション"
                    >
                      回答を生成
                    </SplitButton>
                  )}
                  <Button
                    size="sm"
                    onClick={onApply}
                    disabled={!answer.trim() || isBusy}
                    leadingIcon={
                      isScanning ? (
                        <LoaderCircle className="animate-spin" aria-hidden />
                      ) : undefined
                    }
                  >
                    {isScanning ? '反映箇所を確認中' : '反映'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </AccordionCard>
    </div>
  );
}
