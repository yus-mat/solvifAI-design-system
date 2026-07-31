import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import type { AvatarColorIndex } from './avatarTypes';

const colorIndices: AvatarColorIndex[] = [1, 2, 3, 4, 5, 6];

const meta = {
  title: 'Content Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    colorIndex: {
      control: { type: 'select' },
      options: colorIndices,
    },
  },
  args: {
    name: '山田 太郎',
    size: 'sm',
    colorIndex: 1,
    active: false,
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Initial: Story = {
  args: {
    name: '田中 咲',
    colorIndex: 4,
  },
};

export const Photo: Story = {
  args: {
    src: 'https://i.pravatar.cc/96?img=12',
    alt: 'User photo',
    size: 'md',
  },
};

export const Icon: Story = {
  args: {
    size: 'md',
  },
};

export const Active: Story = {
  args: {
    name: '田中 咲',
    colorIndex: 4,
    active: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar size="sm" name="山田 太郎" colorIndex={1} />
      <Avatar size="sm" name="山田 太郎" colorIndex={1} active />
      <Avatar size="md" name="山田 太郎" colorIndex={3} />
      <Avatar size="md" name="山田 太郎" colorIndex={3} active />
    </div>
  ),
};

export const IdentityColors: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {colorIndices.map((colorIndex) => (
        <Avatar
          key={colorIndex}
          name={`User ${colorIndex}`}
          initials={String(colorIndex)}
          colorIndex={colorIndex}
        />
      ))}
    </div>
  ),
};
