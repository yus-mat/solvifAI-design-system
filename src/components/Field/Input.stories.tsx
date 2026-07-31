import type { Meta, StoryObj } from '@storybook/react-vite';
import { INPUT_MAX_LENGTH } from './constants';
import { Input } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
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
    maxLength: INPUT_MAX_LENGTH,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    defaultValue: '例）カスタマーレポートv2',
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
      <Input placeholder="例）カスタマーレポートv2" />
      <Input defaultValue="例）カスタマーレポートv2" />
      <Input invalid />
      <Input disabled />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
