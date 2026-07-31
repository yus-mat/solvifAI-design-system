import { CircleCheck } from '@/icons';
import type {
  BusinessFlowChartData,
  BusinessFlowChartStep,
} from '../../mockData';
import { BUSINESS_FLOW_CHART } from '../../mockData';

function FlowConnector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden>
      {label ? (
        <span className="mb-1 text-[10px] text-text-neutral-secondary">
          {label}
        </span>
      ) : null}
      <div className="h-6 w-px bg-border-neutral-secondary" />
      <div className="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-border-neutral-secondary" />
    </div>
  );
}

function FlowStepCard({ step }: { step: BusinessFlowChartStep }) {
  return (
    <div className="flex w-full max-w-[288px] items-center gap-3 rounded-lg border border-border-neutral-muted bg-background-neutral-primary px-4 py-3 shadow-sm">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background-action-primary caption-bold text-text-neutral-inverse">
        {step.number}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="m-0 body-2-bold text-text-neutral-primary">
          {step.title}
        </p>
        <p className="m-0 caption text-text-neutral-secondary">
          {step.description}
        </p>
      </div>
    </div>
  );
}

function DecisionDiamond({ label }: { label: string }) {
  return (
    <div className="relative flex size-28 items-center justify-center">
      <div
        className="absolute inset-2 rotate-45 rounded-md border border-border-action-primary bg-background-action-secondary"
        aria-hidden
      />
      <p className="relative z-10 m-0 px-2 text-center caption-bold text-text-action-primary">
        {label}
      </p>
    </div>
  );
}

export type BusinessFlowChartProps = {
  data?: BusinessFlowChartData;
};

export function BusinessFlowChart({
  data = BUSINESS_FLOW_CHART,
}: BusinessFlowChartProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-2 py-4">
      <div className="mb-6 flex flex-col items-center gap-1 text-center">
        <h3 className="m-0 heading-3 text-text-neutral-primary">
          {data.title}
        </h3>
        <p className="m-0 caption text-text-neutral-secondary">{data.subtitle}</p>
        <div className="mt-2 h-0.5 w-48 bg-border-action-primary" aria-hidden />
      </div>

      {data.stepsBeforeDecision.map((step) => (
        <div key={step.id} className="flex w-full flex-col items-center">
          <FlowStepCard step={step} />
          <FlowConnector />
        </div>
      ))}

      <div className="mb-2 grid w-full max-w-[520px] grid-cols-[1fr_auto_1fr] items-start gap-2">
        <div />
        <div className="flex flex-col items-center">
          <DecisionDiamond label={data.decision.label} />
          <FlowConnector label={data.decision.yesLabel} />
        </div>
        <div className="flex flex-col items-start gap-1 pt-8">
          <div className="flex items-center gap-2" aria-hidden>
            <div className="h-px w-6 bg-border-neutral-secondary" />
            <div className="h-0 w-0 border-y-[5px] border-l-[6px] border-y-transparent border-l-border-neutral-secondary" />
          </div>
          <span className="text-[10px] text-text-neutral-secondary">
            {data.decision.noLabel}
          </span>
          <FlowStepCard step={data.decision.noStep} />
        </div>
      </div>

      {data.stepsAfterDecision.map((step) => (
        <div key={step.id} className="flex w-full flex-col items-center">
          <FlowStepCard step={step} />
          <FlowConnector />
        </div>
      ))}

      <div className="mt-2 flex flex-col items-center gap-2">
        <CircleCheck className="size-8 text-text-success" aria-hidden />
        <p className="m-0 caption-bold text-text-neutral-primary">
          {data.endLabel}
        </p>
      </div>
    </div>
  );
}
