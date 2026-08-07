import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '@/components/Breadcrumb';
import { Button } from '@/components/Button';
import { GlobalHeader } from '@/components/GlobalHeader';
import { IconWrapper } from '@/components/IconWrapper';
import { LoaderCircle } from '@/icons';
import {
  ANALYSIS_RESULT_CATEGORIES,
  ANALYSIS_RESULT_LOADING_TEXT,
} from './mockData';
import { InputAnalysisProvider } from './components/InputAnalysisContext';
import { AiSidePanel } from './components/analysis-result/AiSidePanel';
import { AnalysisCategoryAccordion } from './components/analysis-result/AnalysisCategoryAccordion';
import { DiagnosisSummary } from './components/analysis-result/DiagnosisSummary';
import { FlowChartSidePanel } from './components/analysis-result/FlowChartSidePanel';

const RESULT_LOADING_DURATION_MS = 1200;

function AnalysisPageContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, RESULT_LOADING_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const isLoading = loading;

  return (
    <div className="flex h-screen min-h-0 flex-col overflow-hidden bg-surface-base">
      <GlobalHeader variant="funnel" />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[900px] flex-col gap-12 px-8 pb-0 pt-6">
            <Breadcrumb>
              <BreadcrumbItem
                href="/deliverables/generate"
                onClick={(event) => {
                  event.preventDefault();
                  navigate('/deliverables/generate');
                }}
              >
                成果物生成
              </BreadcrumbItem>
              <BreadcrumbItem
                href="/deliverables/generate"
                onClick={(event) => {
                  event.preventDefault();
                  navigate('/deliverables/generate');
                }}
              >
                インプット入力
              </BreadcrumbItem>
              <BreadcrumbItem>インプット充足度</BreadcrumbItem>
            </Breadcrumb>

            {isLoading ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
                <IconWrapper
                  size="s"
                  className="animate-spin text-text-action-primary"
                >
                  <LoaderCircle aria-hidden />
                </IconWrapper>
                <p className="m-0 body-2 text-text-neutral-secondary">
                  {ANALYSIS_RESULT_LOADING_TEXT}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <DiagnosisSummary />
                <div className="flex flex-col gap-6 pb-6">
                  <div className="flex flex-col gap-2">
                    {ANALYSIS_RESULT_CATEGORIES.map((category) => (
                      <AnalysisCategoryAccordion
                        key={category.id}
                        category={category}
                        defaultOpen={false}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      emphasis="secondary"
                      intent="default"
                      onClick={() => navigate('/deliverables/generate')}
                    >
                      戻る
                    </Button>
                    <Button
                      className="w-[200px]"
                      onClick={() => navigate('/deliverables/draft')}
                    >
                      ドラフト生成する
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {!isLoading ? (
          <>
            <AiSidePanel />
            <FlowChartSidePanel />
          </>
        ) : null}
      </div>
    </div>
  );
}

export function InputSufficiencyAnalysisPage() {
  return (
    <InputAnalysisProvider>
      <AnalysisPageContent />
    </InputAnalysisProvider>
  );
}
