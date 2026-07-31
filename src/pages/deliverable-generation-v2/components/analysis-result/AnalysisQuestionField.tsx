import { useEffect, useState, type ReactNode } from 'react';
import { Button, ButtonIcon, SplitButton } from '@/components/Button';
import { FormField, TextArea } from '@/components/Field';
import { ListItem } from '@/components/Overlay/ListItem';
import { Tag } from '@/components/Tag';
import {
  CheckCheck,
  MessageCircleMore,
  PencilLine,
  RefreshCw,
  Sparkles,
} from '@/icons';
import type { AnalysisQuestion } from '../../mockData';
import { useInputAnalysis } from '../InputAnalysisContext';

export type AnalysisQuestionFieldProps = {
  question: AnalysisQuestion;
  onSaved?: () => void;
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

export function AnalysisQuestionField({
  question,
  onSaved,
}: AnalysisQuestionFieldProps) {
  const {
    answerDrafts,
    savedAnswers,
    isEditingAnswer,
    isGeneratingAnswer,
    isAiAnswer,
    setAnswerDraft,
    startEditingAnswer,
    cancelEditingAnswer,
    saveAnswer,
    generateAnswer,
    regenerateAnswer,
    openAiPanel,
  } = useInputAnalysis();

  const value = answerDrafts[question.id] ?? '';
  const savedValue = savedAnswers[question.id] ?? '';
  const hasSavedAnswer = savedValue.trim().length > 0;
  const isDirty = value !== savedValue;
  const isEditing = isEditingAnswer(question.id);
  const isGenerating = isGeneratingAnswer(question.id);
  const aiAnswer = isAiAnswer(question.id);
  const showRenderedText = hasSavedAnswer && !isEditing && !isDirty;
  const showEditor = !showRenderedText;
  const canSave = isDirty && value.trim().length > 0 && !isGenerating;
  const isBusy = isGenerating;

  const [editDraft, setEditDraft] = useState(value);

  useEffect(() => {
    if (isEditing) setEditDraft(value);
  }, [isEditing, value]);

  const aiChatMenu = (
    <ListItem
      leadingSlot={<MessageCircleMore aria-hidden />}
      onClick={() => openAiPanel(question.id)}
    >
      AIチャットに相談
    </ListItem>
  );

  return (
    <div className="flex flex-col gap-3">
      {showRenderedText ? (
        <div className="flex flex-col gap-2">
          <p className="m-0 body-2-bold text-text-neutral-primary">
            {question.label}
          </p>
          <AnswerContentWithShimmer isGenerating={isGenerating}>
            <p className="m-0 whitespace-pre-wrap caption text-text-neutral-primary">
              {savedValue}
            </p>
          </AnswerContentWithShimmer>
        </div>
      ) : null}

      {showEditor ? (
        <FormField label={question.label} htmlFor={question.id}>
          <AnswerContentWithShimmer isGenerating={isGenerating}>
            <TextArea
              id={question.id}
              value={isEditing ? editDraft : value}
              onChange={(event) => {
                if (isEditing) {
                  setEditDraft(event.target.value);
                  return;
                }
                setAnswerDraft(question.id, event.target.value);
              }}
              rows={3}
              resize="none"
              disabled={isBusy}
            />
          </AnswerContentWithShimmer>
        </FormField>
      ) : null}

      <div
        className={[
          'relative z-10 flex items-center justify-between gap-2 overflow-visible',
          showRenderedText ? 'mt-1' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {isEditing ? (
          <div className="flex w-full items-center justify-end gap-2">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                emphasis="ghost"
                intent="default"
                onClick={() => cancelEditingAnswer(question.id)}
                disabled={isBusy}
              >
                キャンセル
              </Button>
              <Button
                size="sm"
                emphasis="secondary"
                intent="default"
                onClick={() => {
                  saveAnswer(question.id, editDraft);
                  onSaved?.();
                }}
                disabled={isBusy || !editDraft.trim()}
              >
                保存
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {aiAnswer && showRenderedText ? (
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
                    tooltipPosition="bottom-center"
                    onClick={() => regenerateAnswer(question.id)}
                    disabled={isBusy}
                  />
                </>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-2 overflow-visible">
              {showRenderedText ? (
                <SplitButton
                  variant="secondary"
                  leadingIcon={<PencilLine aria-hidden />}
                  onClick={() => startEditingAnswer(question.id)}
                  disabled={isBusy}
                  menu={aiChatMenu}
                  menuPlacement="above"
                  menuLabel="回答オプション"
                >
                  編集
                </SplitButton>
              ) : (
                <>
                  <SplitButton
                    variant="secondary"
                    leadingIcon={<Sparkles aria-hidden />}
                    onClick={() => generateAnswer(question.id)}
                    disabled={isBusy}
                    menu={aiChatMenu}
                    menuPlacement="above"
                    menuLabel="回答オプション"
                  >
                    回答を生成
                  </SplitButton>
                  <Button
                    size="sm"
                    disabled={!canSave}
                    onClick={() => {
                      saveAnswer(question.id);
                      onSaved?.();
                    }}
                  >
                    保存
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
