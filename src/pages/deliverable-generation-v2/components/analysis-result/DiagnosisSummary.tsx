import { Divider } from '@/components/Divider';
import {
  diagnosisBarSegmentClassName,
  diagnosisBrandGradientClassName,
  diagnosisWarningGradientClassName,
} from '@/styles/diagnosisGradients';
import { LegendLabel } from './LegendLabel';

const SUFFICIENT_COUNT = 78;
const INSUFFICIENT_COUNT = 78;
const SUFFICIENT_PERCENT = 68.75;

export function DiagnosisSummary() {
  return (
    <section className="flex flex-col gap-6 pb-6">
      <h3 className="m-0 heading-1 text-text-neutral-primary">
        インプット充足度
      </h3>

      <div className="flex flex-col gap-6">
        <div className="flex h-4 w-full items-stretch gap-px overflow-hidden rounded-base">
          <div
            className={[
              diagnosisBarSegmentClassName({
                position: 'start',
                hasBothSegments: true,
              }),
              diagnosisBrandGradientClassName,
            ].join(' ')}
            style={{ width: `${SUFFICIENT_PERCENT}%` }}
          />
          <div
            className={[
              diagnosisBarSegmentClassName({
                position: 'end',
                hasBothSegments: true,
              }),
              diagnosisWarningGradientClassName,
            ].join(' ')}
            style={{ flex: 1 }}
          />
        </div>

        <div className="flex items-stretch gap-3">
          <div className="flex flex-col justify-center gap-2 p-1">
            <LegendLabel type="success">充足</LegendLabel>
            <span className="flex items-baseline gap-1 text-text-neutral-primary">
              <span className="heading-1">{SUFFICIENT_COUNT}</span>
              <span className="caption-bold">件</span>
            </span>
          </div>
          <Divider orientation="vertical" className="self-stretch" />
          <div className="flex flex-col justify-center gap-2 p-1">
            <LegendLabel type="warning">不足</LegendLabel>
            <span className="flex items-baseline gap-1 text-text-neutral-primary">
              <span className="heading-1">{INSUFFICIENT_COUNT}</span>
              <span className="caption-bold">件</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
