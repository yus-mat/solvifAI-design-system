import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
  title: 'Content Display/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['static', 'interactive'],
    },
    padded: {
      control: 'boolean',
    },
  },
  args: {
    type: 'static',
    padded: true,
    children: 'カードコンテンツ',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Interactive: Story = {
  args: {
    type: 'interactive',
    children: 'クリック可能なカード',
  },
};

export const NoPadding: Story = {
  args: {
    padded: false,
    children: (
      <div className="p-4 body-2 text-text-neutral-primary">カスタム内側余白</div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid max-w-xl gap-4 sm:grid-cols-2">
      <Card type="static">Static</Card>
      <Card type="interactive">Interactive</Card>
      <Card type="static" padded={false}>
        <div className="p-4 body-2">No padding</div>
      </Card>
    </div>
  ),
};
