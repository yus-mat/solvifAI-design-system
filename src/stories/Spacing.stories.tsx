import type { Meta, StoryObj } from '@storybook/react-vite';

const spacingSteps = [
  { token: 'spacing-0', cssVar: '--spacing-0', px: '0px' },
  { token: 'spacing-0-5', cssVar: '--spacing-0-5', px: '2px' },
  { token: 'spacing-1', cssVar: '--spacing-1', px: '4px' },
  { token: 'spacing-1-5', cssVar: '--spacing-1-5', px: '6px' },
  { token: 'spacing-2', cssVar: '--spacing-2', px: '8px' },
  { token: 'spacing-3', cssVar: '--spacing-3', px: '12px' },
  { token: 'spacing-4', cssVar: '--spacing-4', px: '16px' },
  { token: 'spacing-5', cssVar: '--spacing-5', px: '20px' },
  { token: 'spacing-6', cssVar: '--spacing-6', px: '24px' },
  { token: 'spacing-8', cssVar: '--spacing-8', px: '32px' },
  { token: 'spacing-10', cssVar: '--spacing-10', px: '40px' },
  { token: 'spacing-12', cssVar: '--spacing-12', px: '48px' },
];

const radiusSteps = [
  { token: 'radius-sm', className: 'rounded-sm', px: '2px' },
  { token: 'radius-base', className: 'rounded-base', px: '4px' },
  { token: 'radius-md', className: 'rounded-md', px: '6px' },
  { token: 'radius-lg', className: 'rounded-lg', px: '8px' },
  { token: 'radius-xl', className: 'rounded-xl', px: '12px' },
  { token: 'radius-2xl', className: 'rounded-2xl', px: '16px' },
  { token: 'radius-full', className: 'rounded-full', px: '9999px' },
];

const meta = {
  title: 'Foundation/Spacing',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpacingScale: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-3">
      {spacingSteps.map((step) => (
        <div key={step.token} className="flex items-center gap-4">
          <div className="w-28 shrink-0 font-mono caption text-text-neutral-muted">
            {step.token}
          </div>
          <div
            className="h-4 shrink-0 rounded-sm bg-background-action-primary"
            style={{ width: `var(${step.cssVar})` }}
          />
          <span className="caption text-text-neutral-secondary">{step.px}</span>
        </div>
      ))}
    </div>
  ),
};

export const RadiusScale: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {radiusSteps.map((step) => (
        <div key={step.token} className="flex w-28 flex-col items-center gap-2">
          <div
            className={[
              'size-16 border border-border-neutral-primary bg-background-neutral-secondary',
              step.className,
            ].join(' ')}
          />
          <span className="font-mono caption text-text-neutral-muted">{step.token}</span>
          <span className="caption text-text-neutral-secondary">{step.px}</span>
        </div>
      ))}
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {(['shadow-sm', 'shadow-md'] as const).map((shadow) => (
        <div key={shadow} className="flex flex-col items-center gap-3">
          <div
            className={[
              'flex size-24 items-center justify-center rounded-lg bg-surface-raise',
              shadow,
            ].join(' ')}
          />
          <span className="font-mono caption text-text-neutral-muted">{shadow}</span>
        </div>
      ))}
    </div>
  ),
};
