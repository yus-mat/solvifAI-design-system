import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoBlock } from './InfoBlock';
import type { InfoBlockType } from './infoBlockTypes';

const types: InfoBlockType[] = [
  'default',
  'error',
  'success',
  'info',
  'brand',
  'accent',
  'warning',
];

const meta = {
  title: 'Content Display/InfoBlock',
  component: InfoBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: types,
    },
    leadingIcon: { control: false },
    trailing: { control: false },
    actions: { control: false },
    onToggleChange: { action: 'toggleChange' },
    onCtaClick: { action: 'ctaClick' },
    onClose: { action: 'close' },
  },
  args: {
    type: 'default',
    title: 'AIが確認した理由',
    subtitle: 'Subtitle',
    showToggle: true,
    defaultToggleChecked: true,
    toggleLabel: '有効化',
    showCta: true,
    ctaLabel: 'Button',
    closable: true,
  },
} satisfies Meta<typeof InfoBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FullFeatured: Story = {
  args: {
    type: 'accent',
    title: 'AIが確認した理由',
    subtitle: 'この設定を有効にすると、ドキュメント作成がよりスムーズになります。',
    showToggle: true,
    defaultToggleChecked: true,
    showCta: true,
    children: (
      <p className="m-0 caption text-text-neutral-primary">
        AIが提案する理由の詳細テキストがここに入ります。
      </p>
    ),
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      {types.map((type) => (
        <InfoBlock
          key={type}
          type={type}
          title="AIが確認した理由"
          subtitle="Subtitle"
          showToggle
          defaultToggleChecked
          showCta
          closable
        />
      ))}
    </div>
  ),
};
