import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
  title: 'Foundation/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    children: 'Link',
    href: '#',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InParagraph: Story = {
  render: (args) => (
    <p className="max-w-sm body-2 text-text-neutral-secondary">
      詳細は
      <Link {...args} className="mx-1" />
      をご確認ください。
    </p>
  ),
};
