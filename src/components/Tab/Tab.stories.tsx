import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationBadge } from '@/components/NotificationBadge';
import { Tab } from './Tab';

const meta = {
  title: 'Navigation/Tab',
  component: Tab,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    children: 'Tab Item',
    active: false,
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xs">
      <Tab {...args} />
    </div>
  ),
};

export const Active: Story = {
  args: {
    active: true,
  },
  render: (args) => (
    <div className="max-w-xs">
      <Tab {...args} />
    </div>
  ),
};

export const WithBadge: Story = {
  render: (args) => (
    <div className="max-w-xs">
      <Tab {...args} badge={<NotificationBadge count={1} />} />
    </div>
  ),
};
