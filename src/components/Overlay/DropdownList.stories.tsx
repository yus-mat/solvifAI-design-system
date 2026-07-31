import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownList } from './DropdownList';
import { ListItem } from './ListItem';

const meta = {
  title: 'List/DropdownList',
  component: DropdownList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-40">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownList>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownList>
      <ListItem>ListName</ListItem>
      <ListItem>ListName</ListItem>
      <ListItem>ListName</ListItem>
      <ListItem>ListName</ListItem>
      <ListItem>ListName</ListItem>
    </DropdownList>
  ),
};

export const WithDestructiveItem: Story = {
  render: () => (
    <DropdownList>
      <ListItem>ListName</ListItem>
      <ListItem>ListName</ListItem>
      <ListItem intent="destructive">Delete</ListItem>
    </DropdownList>
  ),
};
