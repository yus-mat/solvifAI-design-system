import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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
    value: 0,
    onChange: () => {},
    items: [
      { label: 'Tab Item', badge: <NotificationBadge count={1} /> },
      { label: 'Tab Item' },
      { label: 'Tab Item' },
    ],
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function PlaygroundStory(args) {
    const [value, setValue] = useState(args.value);

    return (
      <div className="max-w-2xl">
        <Tab {...args} value={value} onChange={setValue} />
        <p className="mt-4 caption text-text-neutral-muted">
          Active tab: {value + 1} · Tab key moves left → right through items
        </p>
      </div>
    );
  },
};

export const FiveTabs: Story = {
  render: function FiveTabsStory() {
    const [value, setValue] = useState(0);

    return (
      <Tab
        value={value}
        onChange={setValue}
        className="max-w-3xl"
        items={Array.from({ length: 5 }, (_, index) => ({
          label: `Tab ${index + 1}`,
        }))}
      />
    );
  },
};
