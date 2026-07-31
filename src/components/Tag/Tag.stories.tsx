import type { Meta, StoryObj } from '@storybook/react-vite';
import { Send } from '@/icons';
import { Tag } from './Tag';
import type { TagSize, TagStatus, TagType } from './tagTypes';

const sizes: TagSize[] = ['sm', 'md'];

const statuses: TagStatus[] = [
  'default',
  'brand',
  'success',
  'error',
  'warning',
  'info',
  'accent',
];

const types: TagType[] = ['filled', 'outline', 'inverse'];

const meta = {
  title: 'Content Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: statuses,
    },
    type: {
      control: 'select',
      options: types,
    },
    size: {
      control: 'radio',
      options: sizes,
    },
    leadingIcon: { control: false },
  },
  args: {
    children: 'ステータス',
    status: 'default',
    type: 'filled',
    size: 'sm',
    showLeadingIcon: false,
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLeadingIcon: Story = {
  args: {
    showLeadingIcon: true,
    leadingIcon: <Send aria-hidden />,
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex max-w-md flex-wrap gap-2">
      {statuses.map((status) => (
        <Tag key={status} status={status} type="filled">
          {status}
        </Tag>
      ))}
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {types.map((type) => (
        <div key={type}>
          <p className="mb-2 caption text-text-muted">{type}</p>
          <div className="flex max-w-md flex-wrap gap-2">
            {statuses.map((status) => (
              <Tag key={`${type}-${status}`} status={status} type={type}>
                {status}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <Tag key={size} status="default" type="outline" size={size}>
          推奨
        </Tag>
      ))}
    </div>
  ),
};

