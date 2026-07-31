import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationBadge } from './NotificationBadge';

const meta = {
  title: 'Content Display/NotificationBadge',
  component: NotificationBadge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['alert', 'neutral'],
    },
  },
  args: {
    type: 'alert',
    count: 1,
  },
} satisfies Meta<typeof NotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Dot: Story = {
  args: {
    count: undefined,
  },
};

export const Over99: Story = {
  args: {
    count: 120,
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NotificationBadge type="alert" count={1} />
      <NotificationBadge type="alert" count={99} />
      <NotificationBadge type="alert" count={120} />
      <NotificationBadge type="neutral" count={3} />
      <NotificationBadge />
    </div>
  ),
};
