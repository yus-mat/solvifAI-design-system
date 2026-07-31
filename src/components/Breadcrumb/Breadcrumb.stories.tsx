import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hierarchical navigation trail. Previous pages are links (underline on hover/press); the last item is the current page.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#">ホーム</BreadcrumbItem>
      <BreadcrumbItem href="#">プロジェクト</BreadcrumbItem>
      <BreadcrumbItem>成果物生成</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const TwoLevels: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#">Link</BreadcrumbItem>
      <BreadcrumbItem>Link</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const ThreeLevels: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#">Link</BreadcrumbItem>
      <BreadcrumbItem href="#">Link</BreadcrumbItem>
      <BreadcrumbItem>Link</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const FourLevels: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#">Link</BreadcrumbItem>
      <BreadcrumbItem href="#">Link</BreadcrumbItem>
      <BreadcrumbItem href="#">Link</BreadcrumbItem>
      <BreadcrumbItem>Link</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const AllLengths: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbItem href="#">Link</BreadcrumbItem>
        <BreadcrumbItem>Link</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem href="#">Link</BreadcrumbItem>
        <BreadcrumbItem href="#">Link</BreadcrumbItem>
        <BreadcrumbItem>Link</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem href="#">Link</BreadcrumbItem>
        <BreadcrumbItem href="#">Link</BreadcrumbItem>
        <BreadcrumbItem href="#">Link</BreadcrumbItem>
        <BreadcrumbItem>Link</BreadcrumbItem>
      </Breadcrumb>
    </div>
  ),
};
