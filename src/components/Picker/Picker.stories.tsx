import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconWrapper } from '@/components/IconWrapper';
import { Sparkles } from '@/icons';
import { Picker } from './Picker';
import { PickerGroup } from './PickerGroup';

const leadingSlot = (
  <IconWrapper size="md">
    <Sparkles aria-hidden />
  </IconWrapper>
);

const meta = {
  title: 'Control/Picker',
  component: PickerGroup,
  tags: ['autodocs'],
  argTypes: {
    value: { control: false },
    onValueChange: { action: 'valueChange' },
  },
  args: {
    defaultValue: 'dialog',
    children: null,
  },
} satisfies Meta<typeof PickerGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <PickerGroup {...args} className="max-w-xs">
      <Picker
        value="dialog"
        title="AIと対話して作成"
        subtitle="チャット形式でドキュメントを作成"
        leadingSlot={leadingSlot}
      />
      <Picker
        value="template"
        title="テンプレートから作成"
        subtitle="用意されたテンプレートを使用"
        leadingSlot={leadingSlot}
      />
    </PickerGroup>
  ),
};

export const ThreeOptions: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <PickerGroup defaultValue="email" className="max-w-xs">
      <Picker
        value="email"
        title="メール"
        subtitle="メール形式で送信"
        leadingSlot={leadingSlot}
      />
      <Picker
        value="pdf"
        title="PDF"
        subtitle="PDFとしてエクスポート"
        leadingSlot={leadingSlot}
      />
      <Picker
        value="link"
        title="リンク共有"
        subtitle="閲覧用リンクを発行"
        leadingSlot={leadingSlot}
      />
    </PickerGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <PickerGroup defaultValue="dialog" disabled className="max-w-xs">
      <Picker
        value="dialog"
        title="AIと対話して作成"
        subtitle="チャット形式でドキュメントを作成"
        leadingSlot={leadingSlot}
      />
      <Picker
        value="template"
        title="テンプレートから作成"
        subtitle="用意されたテンプレートを使用"
        leadingSlot={leadingSlot}
      />
    </PickerGroup>
  ),
};
