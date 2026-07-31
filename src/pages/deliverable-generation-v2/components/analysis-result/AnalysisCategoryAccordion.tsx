import { useMemo, useState } from 'react';
import { AccordionCard } from '@/components/AccordionCard';
import { Indicator } from '@/components/Indicator';
import {
  SegmentedControl,
  SegmentedControlItem,
} from '@/components/SegmentedControl';
import {
  BUSINESS_FLOW_CATEGORY_ID,
  getCategoryAnswerCounts,
  isAnalysisQuestionAnswered,
  type AnalysisResultCategory,
} from '../../mockData';
import { useInputAnalysis } from '../InputAnalysisContext';
import { AnalysisQuestionField } from './AnalysisQuestionField';
import { BusinessFlowCategory } from './BusinessFlowCategory';

type StatusFilter = 'insufficient' | 'sufficient';

function StatusIndicators({
  sufficientCount,
  insufficientCount,
}: {
  sufficientCount: number;
  insufficientCount: number;
}) {
  return (
    <div className="flex items-center gap-4 caption-bold">
      <span className="flex items-center gap-2 text-text-action-primary">
        <Indicator variant="blue" aria-hidden />
        {sufficientCount}
      </span>
      <span className="flex items-center gap-2 text-text-function-warning">
        <Indicator variant="orange" aria-hidden />
        {insufficientCount}
      </span>
    </div>
  );
}

export type AnalysisCategoryAccordionProps = {
  category: AnalysisResultCategory;
  defaultOpen?: boolean;
};

export function AnalysisCategoryAccordion({
  category,
  defaultOpen = false,
}: AnalysisCategoryAccordionProps) {
  const { savedAnswers } = useInputAnalysis();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('insufficient');

  const { sufficientCount, insufficientCount } = useMemo(
    () => getCategoryAnswerCounts(category, savedAnswers),
    [category, savedAnswers],
  );

  const filteredSections = useMemo(() => {
    return category.sections
      .map((section) => ({
        ...section,
        questions: section.questions.filter((question) => {
          const answered = isAnalysisQuestionAnswered(
            question.id,
            savedAnswers,
          );
          return statusFilter === 'sufficient' ? answered : !answered;
        }),
      }))
      .filter((section) => section.questions.length > 0);
  }, [category.sections, savedAnswers, statusFilter]);

  const isBusinessFlow = category.id === BUSINESS_FLOW_CATEGORY_ID;
  const hasQuestions = category.sections.some(
    (section) => section.questions.length > 0,
  );

  return (
    <AccordionCard
      defaultOpen={defaultOpen}
      toggleLabel={`${category.title}を展開`}
      className={[
        '[&>button]:h-16 [&>button]:p-2',
        '[&>button>span:last-child]:!size-12',
        '[&>button>span:last-child]:!p-3',
        '[&>button>span:last-child>span]:!size-4',
      ].join(' ')}
      header={
        <div className="flex w-full items-center justify-between gap-3 px-2">
          <span className="body-1-bold text-text-neutral-primary">
            {category.title}
          </span>
          <StatusIndicators
            sufficientCount={sufficientCount}
            insufficientCount={insufficientCount}
          />
        </div>
      }
    >
      {isBusinessFlow ? (
        <BusinessFlowCategory />
      ) : hasQuestions ? (
        <div className="flex flex-col gap-6">
          <SegmentedControl
            className="w-fit"
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
          >
            <SegmentedControlItem
              value="insufficient"
              showIcon={false}
              trailingSlot={insufficientCount}
              className="min-w-16 flex-1 justify-center"
            >
              不足
            </SegmentedControlItem>
            <SegmentedControlItem
              value="sufficient"
              showIcon={false}
              trailingSlot={sufficientCount}
              className="min-w-16 flex-1 justify-center"
            >
              充足
            </SegmentedControlItem>
          </SegmentedControl>

          {filteredSections.length > 0 ? (
            <div className="flex flex-col gap-6">
              {filteredSections.map((section) => (
                <div key={section.id} className="flex flex-col gap-4">
                  <p className="m-0 caption-bold text-text-neutral-secondary">
                    {section.title}
                  </p>
                  <div className="flex flex-col gap-6">
                    {section.questions.map((question) => (
                      <AnalysisQuestionField
                        key={question.id}
                        question={question}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="m-0 caption text-text-neutral-secondary">
              該当する項目はありません。
            </p>
          )}
        </div>
      ) : (
        <p className="m-0 caption text-text-neutral-secondary">
          このカテゴリの質問は準備中です。
        </p>
      )}
    </AccordionCard>
  );
}
