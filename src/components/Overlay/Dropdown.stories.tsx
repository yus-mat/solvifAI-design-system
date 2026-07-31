import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { ListItem } from './ListItem';

const listItems = (
  <>
    <ListItem>ListName</ListItem>
    <ListItem>ListName</ListItem>
    <ListItem>ListName</ListItem>
    <ListItem intent="destructive">Delete</ListItem>
  </>
);

const meta = {
  title: 'List/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-40 pb-52">
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Label',
    children: listItems,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default closed state — click trigger to open. */
export const Playground: Story = {};

/** Menu panel visible (layout / list styling). */
export const Open: Story = {
  args: {
    defaultOpen: true,
  },
};

export const WithoutLeadingIcon: Story = {
  args: {
    leadingSlot: null,
    defaultOpen: true,
    label: 'Options',
    children: (
      <>
        <ListItem leadingSlot={null}>Option A</ListItem>
        <ListItem leadingSlot={null}>Option B</ListItem>
      </>
    ),
  },
};

/** Selection updates the trigger label and closes the menu. */
export const Selectable: Story = {
  render: function SelectableStory() {
    const [type, setType] = useState('全ての種類');

    return (
      <Dropdown
        leadingSlot={null}
        value={type}
        onValueChange={setType}
        className="min-w-[120px]"
      >
        <ListItem leadingSlot={null}>全ての種類</ListItem>
        <ListItem leadingSlot={null}>矛盾</ListItem>
        <ListItem leadingSlot={null}>不足</ListItem>
      </Dropdown>
    );
  },
};
