import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Toggle } from '@/components/Control';
import { Tag } from '@/components/Tag';
import {
  ANALYSIS_TOGGLE_LABEL,
  ANALYSIS_TOGGLE_TAG,
} from '../mockData';
import { useInputAnalysis } from './InputAnalysisContext';

export type FormFooterActionsProps = {
  onGenerate?: () => void;
};

export function FormFooterActions({ onGenerate }: FormFooterActionsProps) {
  const navigate = useNavigate();
  const {
    analyzing,
    analysisEnabled,
    setAnalysisEnabled,
    generateLabel,
    openAnalysisInfo,
  } = useInputAnalysis();

  const handleGenerate = () => {
    if (generateLabel === '分析してドラフト生成する') {
      navigate('/deliverables/analysis');
      return;
    }
    if (onGenerate) {
      onGenerate();
      return;
    }
    navigate('/deliverables/draft');
  };

  return (
    <div className="flex items-center justify-end gap-6 pb-6 pt-2">
      <div className="group flex items-center gap-3">
        <Toggle
          checked={analysisEnabled}
          onCheckedChange={setAnalysisEnabled}
          aria-label={ANALYSIS_TOGGLE_LABEL}
        />
        <button
          type="button"
          onClick={openAnalysisInfo}
          className="flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left"
        >
          <span className="body-2-bold text-text-neutral-primary transition-colors group-hover:text-[#7c7e84]">
            {ANALYSIS_TOGGLE_LABEL}
          </span>
          <Tag status="brand" type="filled" size="sm">
            {ANALYSIS_TOGGLE_TAG}
          </Tag>
        </button>
      </div>
      <Button
        loading={analyzing}
        onClick={handleGenerate}
        className="min-w-[200px]"
      >
        {generateLabel}
      </Button>
    </div>
  );
}
