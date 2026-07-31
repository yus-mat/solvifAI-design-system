import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarStack } from './AvatarStack';
import type { AvatarStackItem } from './avatarTypes';

const sixUsers: AvatarStackItem[] = [
  { name: '山田' },
  { name: '佐藤' },
  { name: '鈴木' },
  { name: '田中' },
  { name: '伊藤' },
  { name: '渡辺' },
];

const meta = {
  title: 'Content Display/AvatarStack',
  component: AvatarStack,
  tags: ['autodocs'],
  args: {
    avatars: sixUsers,
    maxVisible: 4,
    size: 'sm',
  },
} satisfies Meta<typeof AvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Overflow: Story = {
  args: {
    avatars: sixUsers,
    maxVisible: 4,
  },
};

export const ActiveUser: Story = {
  args: {
    avatars: [
      { name: '山田', active: true },
      { name: '佐藤' },
      { name: '鈴木' },
    ],
    maxVisible: 3,
  },
};

export const AllVisibleCounts: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {[1, 2, 3, 4].map((count) => (
        <AvatarStack
          key={count}
          avatars={sixUsers.slice(0, count)}
          maxVisible={count}
        />
      ))}
      <AvatarStack avatars={sixUsers} maxVisible={4} />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const SizeMd: Story = {
  args: {
    avatars: sixUsers,
    maxVisible: 4,
    size: 'md',
  },
};
