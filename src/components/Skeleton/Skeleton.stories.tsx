import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';
import type { SkeletonSize } from './skeletonTypes';

const sizes: SkeletonSize[] = ['xs', 'sm', 'md', 'lg'];

const meta = {
  title: 'Content Display/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: sizes,
    },
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <p className="font-mono caption text-text-neutral-muted">{size}</p>
          <Skeleton size={size} />
        </div>
      ))}
    </div>
  ),
};
