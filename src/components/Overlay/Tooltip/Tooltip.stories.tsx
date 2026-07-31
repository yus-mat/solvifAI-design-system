import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/Button';
import { ButtonIcon } from '@/components/Button/ButtonIcon';
import { PanelRightClose } from '@/icons';
import { Tooltip } from './Tooltip';
import { TooltipTrigger } from './TooltipTrigger';
import {
  TOOLTIP_ANCHORED_POSITIONS,
  type TooltipAnchoredPosition,
  type TooltipPosition,
} from './tooltipTypes';

const positions: TooltipPosition[] = [
  ...TOOLTIP_ANCHORED_POSITIONS,
  'top',
  'bottom',
  'left',
  'center',
  'right',
];

const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: positions,
    },
  },
  args: {
    content: 'AIがドラフトを常に確認し、ドラフトの品質を常時担保します。',
    position: 'bottom-center',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex min-h-[240px] items-center justify-center p-8">
      <TooltipTrigger content={args.content} position={args.position}>
        <Button emphasis="secondary" intent="default">
          ホバーまたはフォーカス
        </Button>
      </TooltipTrigger>
    </div>
  ),
};

export const AnchoredPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-10 p-8 md:grid-cols-3">
      {TOOLTIP_ANCHORED_POSITIONS.map((position) => (
        <div key={position} className="flex flex-col items-start gap-2">
          <p className="font-mono caption text-text-neutral-muted">{position}</p>
          <Tooltip
            position={position}
            content="AIがドラフトを常に確認し、ドラフトの品質を常時担保します。"
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const EdgeTriggers: Story = {
  render: () => {
    const corners: {
      position: TooltipAnchoredPosition;
      className: string;
      label: string;
    }[] = [
      {
        position: 'bottom-left',
        className: 'left-4 top-4',
        label: '左上 → bottom-left',
      },
      {
        position: 'bottom-right',
        className: 'right-4 top-4',
        label: '右上 → bottom-right',
      },
      {
        position: 'top-left',
        className: 'bottom-4 left-4',
        label: '左下 → top-left',
      },
      {
        position: 'top-right',
        className: 'bottom-4 right-4',
        label: '右下 → top-right',
      },
    ];

    return (
      <div className="relative h-[360px] w-full border border-border-neutral-muted bg-surface-default">
        {corners.map(({ position, className, label }) => (
          <div key={position} className={['absolute', className].join(' ')}>
            <p className="mb-1 font-mono text-[10px] text-text-neutral-muted">
              {label}
            </p>
            <ButtonIcon
              emphasis="ghost"
              intent="default"
              size="sm"
              icon={<PanelRightClose aria-hidden />}
              aria-label="パネルを閉じる"
              tooltipPosition={position}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const WithTrigger: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8 p-16">
      {TOOLTIP_ANCHORED_POSITIONS.map((position) => (
        <TooltipTrigger
          key={position}
          position={position}
          content="AIがドラフトを常に確認し、ドラフトの品質を常時担保します。"
        >
          <Button emphasis="secondary" intent="default" size="sm">
            {position}
          </Button>
        </TooltipTrigger>
      ))}
    </div>
  ),
};
