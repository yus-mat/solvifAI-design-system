import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from './TextArea';

const meta = {
  title: 'Forms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    defaultValue:
      'お客様の声をもとに、レポートの改善点をまとめたドラフトです。',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <TextArea />
      <TextArea defaultValue="お客様の声をもとに、レポートの改善点をまとめたドラフトです。" />
      <TextArea invalid />
      <TextArea disabled />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
