import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  title: 'Forms/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'ラベルを入力',
    required: true,
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Optional: Story = {
  args: {
    required: false,
  },
};
