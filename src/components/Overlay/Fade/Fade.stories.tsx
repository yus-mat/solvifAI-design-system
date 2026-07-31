import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fade } from './Fade';
import type { FadeProps } from './Fade';
import type { FadeType } from './fadeTypes';

const types: FadeType[] = ['primary', 'secondary'];

const meta = {
  title: 'Overlay/Fade',
  component: Fade,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: types },
    onButtonClick: { action: 'expand' },
  },
  args: {
    type: 'primary',
    showButton: true,
    buttonLabel: '全て表示',
  },
} satisfies Meta<typeof Fade>;

export default meta;
type Story = StoryObj<typeof meta>;

function FadeDemo(props: FadeProps) {
  return (
    <div className="relative h-40 w-full max-w-md overflow-hidden rounded-lg border border-border-neutral-muted bg-surface-default p-4">
      <p className="m-0 body-2 text-text-neutral-primary">
        長いテキストの末尾をフェードで隠し、展開ボタンを表示するパターンです。コンテンツが溢れたときに使用します。
      </p>
      <Fade {...props} />
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <FadeDemo {...args} />,
};

export const Primary: Story = {
  args: { type: 'primary' },
  render: (args) => <FadeDemo {...args} />,
};

export const Secondary: Story = {
  args: { type: 'secondary' },
  render: (args) => (
    <div className="relative h-40 w-full max-w-md overflow-hidden rounded-lg border border-border-neutral-muted bg-background-function-info-base p-4">
      <p className="m-0 body-2 text-text-neutral-primary">
        セカンダリフェードは function/info/base 背景上で使用します。
      </p>
      <Fade {...args} />
    </div>
  ),
};

export const WithoutButton: Story = {
  args: { showButton: false },
  render: (args) => <FadeDemo {...args} />,
};
