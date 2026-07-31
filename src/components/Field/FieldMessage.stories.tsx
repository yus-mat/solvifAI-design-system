import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldMessage } from './FieldMessage';

const meta = {
  title: 'Forms/FieldMessage',
  component: FieldMessage,
  tags: ['autodocs'],
  args: {
    children: 'ラベルを入力',
  },
} satisfies Meta<typeof FieldMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    intent: 'error',
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
  },
};
