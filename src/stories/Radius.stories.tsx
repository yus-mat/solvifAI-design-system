import type { Meta, StoryObj } from '@storybook/react-vite';

const radiusSteps = [
  { token: 'radius-none', className: 'rounded-none', px: '0px' },
  { token: 'radius-sm', className: 'rounded-sm', px: '2px' },
  { token: 'radius-base', className: 'rounded-base', px: '4px' },
  { token: 'radius-md', className: 'rounded-md', px: '6px' },
  { token: 'radius-lg', className: 'rounded-lg', px: '8px' },
  { token: 'radius-xl', className: 'rounded-xl', px: '12px' },
  { token: 'radius-2xl', className: 'rounded-2xl', px: '16px' },
  { token: 'radius-3xl', className: 'rounded-3xl', px: '24px' },
  { token: 'radius-full', className: 'rounded-full', px: '9999px' },
];

const meta = {
  title: 'Foundation/Radius',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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
