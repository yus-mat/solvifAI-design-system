import type { Meta, StoryObj } from '@storybook/react-vite';
import { PencilLine } from '@/icons';
import { ListItemInteractive } from './ListItemInteractive';

const leadingIcon = <PencilLine aria-hidden />;

const meta = {
  title: 'List/ListItemInteractive',
  component: ListItemInteractive,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  args: {
    leadingSlot: leadingIcon,
    children: 'List item label',
  },
} satisfies Meta<typeof ListItemInteractive>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    leadingSlot: leadingIcon,
    children: 'Search result title',
  },
};

export const WithTrailingSlot: Story = {
  args: {
    leadingSlot: leadingIcon,
    trailingSlot: <span className="caption text-text-muted">2h ago</span>,
    children: 'Comment preview text',
  },
};

export const WithBorder: Story = {
  render: () => (
    <div className="flex flex-col overflow-clip rounded-base border border-border-muted">
      <ListItemInteractive
        hasBorder
        leadingSlot={leadingIcon}
      >
        First result
      </ListItemInteractive>
      <ListItemInteractive
        hasBorder
        leadingSlot={leadingIcon}
      >
        Second result
      </ListItemInteractive>
      <ListItemInteractive leadingSlot={leadingIcon}>
        Last result
      </ListItemInteractive>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <ListItemInteractive
        leadingSlot={leadingIcon}
      >
        Default
      </ListItemInteractive>
      <ListItemInteractive
        selected
        leadingSlot={leadingIcon}
      >
        Selected
      </ListItemInteractive>
      <ListItemInteractive disabled leadingSlot={leadingIcon}>
        Disabled
      </ListItemInteractive>
    </div>
  ),
};
