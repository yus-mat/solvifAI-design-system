import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDown } from '@/icons';
import { ListItem } from './ListItem';

const meta = {
  title: 'List/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-40">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    children: 'ListName',
  },
};

export const Destructive: Story = {
  args: {
    children: 'ListName',
    intent: 'destructive',
  },
};

export const WithoutLeadingIcon: Story = {
  args: {
    children: 'ListName',
    leadingSlot: null,
  },
};

export const CustomLeadingIcon: Story = {
  args: {
    children: 'ListName',
    leadingSlot: <ChevronDown className="text-text-action-primary" aria-hidden />,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-40 flex-col">
      <ListItem>ListName</ListItem>
      <ListItem intent="destructive">ListName</ListItem>
      <ListItem selected>ListName</ListItem>
    </div>
  ),
};
