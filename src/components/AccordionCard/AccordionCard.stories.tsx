import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionCard } from './AccordionCard';
import type { AccordionCardSize } from './accordionCardTypes';

const sizes: AccordionCardSize[] = ['sm', 'md'];

const meta = {
  title: 'Content Display/AccordionCard',
  component: AccordionCard,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: sizes,
    },
    open: { control: false },
    onOpenChange: { action: 'openChange' },
  },
  args: {
    size: 'md',
    header: (
      <div>
        <p className="body-2-bold text-text-neutral-primary">
          アコーディオンカード
        </p>
        <p className="caption text-text-neutral-secondary">
          サブタイトル
        </p>
      </div>
    ),
    children: (
      <p className="body-2 text-text-neutral-primary">
        展開時に表示される本文スロットです。
      </p>
    ),
  },
} satisfies Meta<typeof AccordionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {sizes.map((size) => (
        <AccordionCard key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
