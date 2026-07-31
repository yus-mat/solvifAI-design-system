import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NotificationBadge } from '@/components/NotificationBadge';
import { Tab } from './Tab';
import { TabGroup } from './TabGroup';

const meta = {
  title: 'Navigation/TabGroup',
  component: TabGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    value: 0,
    onChange: () => {},
    children: null,
  },
} satisfies Meta<typeof TabGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeTabs: Story = {
  render: function ThreeTabsStory() {
    const [value, setValue] = useState(0);

    return (
      <div className="max-w-2xl">
        <TabGroup value={value} onChange={setValue}>
          <Tab badge={<NotificationBadge count={1} />}>Tab Item</Tab>
          <Tab>Tab Item</Tab>
          <Tab>Tab Item</Tab>
        </TabGroup>
        <p className="mt-4 caption text-text-neutral-muted">
          Active tab: {value + 1}
        </p>
      </div>
    );
  },
};

export const FiveTabs: Story = {
  render: function FiveTabsStory() {
    const [value, setValue] = useState(0);

    return (
      <TabGroup value={value} onChange={setValue} className="max-w-3xl">
        {Array.from({ length: 5 }, (_, index) => (
          <Tab key={index}>Tab {index + 1}</Tab>
        ))}
      </TabGroup>
    );
  },
};
