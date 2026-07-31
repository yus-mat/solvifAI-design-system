import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import {
  DeliverableGenerationV2Page,
  InputSufficiencyAnalysisPage,
} from '@/pages/deliverable-generation-v2';
import { InputCompletenessAnalysisPage } from '@/pages/input-completeness-analysis';

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-base p-8">
      <h1 className="m-0 heading-3 text-text-neutral-primary">SOLA</h1>
      <p className="m-0 body-2 text-text-neutral-secondary">
        Design system preview app — open a page flow below.
      </p>
      <div className="flex flex-col items-center gap-2">
        <Link
          to="/deliverables/generate"
          className="body-2-bold text-text-action-primary underline-offset-2 hover:underline"
        >
          成果物生成v2 →
        </Link>
        <Link
          to="/deliverables/analysis"
          className="body-2-bold text-text-action-primary underline-offset-2 hover:underline"
        >
          インプット充足度分析 →
        </Link>
        <Link
          to="/deliverables/draft"
          className="body-2-bold text-text-action-primary underline-offset-2 hover:underline"
        >
          ドラフト画面（下書き編集） →
        </Link>
      </div>
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deliverables/generate" element={<DeliverableGenerationV2Page />} />
        <Route
          path="/deliverables/analysis"
          element={<InputSufficiencyAnalysisPage />}
        />
        <Route path="/deliverables/draft" element={<InputCompletenessAnalysisPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
