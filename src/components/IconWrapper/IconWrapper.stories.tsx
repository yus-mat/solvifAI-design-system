import type { Meta, StoryObj } from '@storybook/react-vite';
import { Send } from '@/icons';
import { IconWrapper } from './IconWrapper';
import type { IconWrapperSize } from './iconWrapperTypes';

const sizes: IconWrapperSize[] = ['xs', 's', 'md', 'lg'];

const meta = {
  title: 'Foundation/IconWrapper',
  component: IconWrapper,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: sizes,
    },
  },
  args: {
    size: 'md',
    children: <Send aria-hidden />,
  },
} satisfies Meta<typeof IconWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <IconWrapper size={size}>
            <Send aria-hidden />
          </IconWrapper>
          <span className="font-mono caption text-text-neutral-muted">{size}</span>
        </div>
      ))}
    </div>
  ),
};
