import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateInput } from './DateInput';

const meta = {
  title: 'Forms/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-xs">
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
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    defaultValue: '2026-06-05',
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
    <div className="flex w-full max-w-xs flex-col gap-6">
      <DateInput />
      <DateInput defaultValue="2026-06-05" />
      <DateInput invalid />
      <DateInput disabled />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
