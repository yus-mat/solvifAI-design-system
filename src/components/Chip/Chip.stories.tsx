import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '@/components/Avatar';
import { Chip } from './Chip';

const meta = {
  title: 'Content Display/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    leadingSlot: { control: false },
    onRemove: { action: 'remove' },
  },
  args: {
    children: '田中 咲',
    onRemove: () => {},
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLeadingSlot: Story = {
  args: {
    leadingSlot: <Avatar name="田中 咲" colorIndex={4} />,
  },
};

export const WithoutRemove: Story = {
  args: {
    onRemove: undefined,
    removable: false,
    leadingSlot: <Avatar name="田中 咲" colorIndex={4} />,
  },
};

export const ComboboxChip: Story = {
  args: {
    children: '田中太郎',
    onRemove: () => {},
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    leadingSlot: <Avatar name="田中 咲" colorIndex={4} />,
    onRemove: () => {},
  },
};
