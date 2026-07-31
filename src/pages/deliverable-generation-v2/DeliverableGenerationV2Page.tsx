import { ProductShell } from '@/pages/_layouts';
import { BasicInfoSection } from './components/BasicInfoSection';
import { DraftOutlineSection } from './components/DraftOutlineSection';
import { FormatSection } from './components/FormatSection';
import { FormFooterActions } from './components/FormFooterActions';
import { GenerationModeSection } from './components/GenerationModeSection';
import { InputAnalysisProvider } from './components/InputAnalysisContext';
import { InputAsidePanel } from './components/InputAsidePanel';
import { InputSection } from './components/InputSection';

export function DeliverableGenerationV2Page() {
  return (
    <InputAnalysisProvider>
      <ProductShell aside={<InputAsidePanel />}>
        <div className="flex flex-col gap-8 pb-6 pt-10">
          <h1 className="m-0 heading-2 text-text-neutral-primary">
            作成を始めましょう。
          </h1>

          <div className="flex flex-col gap-8">
            <BasicInfoSection />
            <FormatSection />
            <DraftOutlineSection />
            <InputSection />
            <GenerationModeSection />
          </div>

          <FormFooterActions />
        </div>
      </ProductShell>
    </InputAnalysisProvider>
  );
}
