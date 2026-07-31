import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlItem } from './SegmentedControlItem';

const meta = {
  title: 'Navigation/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    value: { control: false },
    onValueChange: { action: 'valueChange' },
  },
  args: {
    defaultValue: 'dialog',
    children: null,
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControlItem value="dialog" showIcon>
        AIと対話して作成
      </SegmentedControlItem>
      <SegmentedControlItem value="template" showIcon>
        テンプレートから作成
      </SegmentedControlItem>
    </SegmentedControl>
  ),
};

export const WithoutIcons: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <SegmentedControl defaultValue="all">
      <SegmentedControlItem value="all" showIcon={false}>
        すべて
      </SegmentedControlItem>
      <SegmentedControlItem value="active" showIcon={false}>
        進行中
      </SegmentedControlItem>
      <SegmentedControlItem value="done" showIcon={false}>
        完了
      </SegmentedControlItem>
    </SegmentedControl>
  ),
};

export const ThreeItems: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <SegmentedControl defaultValue="all">
      <SegmentedControlItem value="all">すべて</SegmentedControlItem>
      <SegmentedControlItem value="active">進行中</SegmentedControlItem>
      <SegmentedControlItem value="done">完了</SegmentedControlItem>
    </SegmentedControl>
  ),
};

export const Disabled: Story = {
  render: () => (
    <SegmentedControl defaultValue="dialog" disabled>
      <SegmentedControlItem value="dialog">
        AIと対話して作成
      </SegmentedControlItem>
      <SegmentedControlItem value="template">
        テンプレートから作成
      </SegmentedControlItem>
    </SegmentedControl>
  ),
};
