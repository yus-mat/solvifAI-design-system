import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/Button';
import { SplitButton } from '@/components/Button/SplitButton';
import { ListItem } from '@/components/Overlay/ListItem';
import { SidePanel } from './SidePanel';

const meta = {
  title: 'Overlay/SidePanel',
  component: SidePanel,
  parameters: {
    storyPadding: false,
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    headerAction: { control: false },
    footer: { control: false },
    children: { control: false },
    onClose: { action: 'close' },
  },
  args: {
    title: 'タイトル',
    subtitle: 'サブタイトル',
  },
} satisfies Meta<typeof SidePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex h-screen justify-end bg-surface-muted p-4">
      <SidePanel
        {...args}
        onClose={() => undefined}
        footer={
          <Button className="w-full" size="sm">
            アクション
          </Button>
        }
      >
        <p className="m-0 body-2 text-text-neutral-primary">
          ボディスロット。スクロール可能なメインコンテンツを配置します。
        </p>
      </SidePanel>
    </div>
  ),
};

export const WithHeaderAction: Story = {
  render: (args) => (
    <div className="flex h-screen justify-end bg-surface-muted p-4">
      <SidePanel
        {...args}
        headerAction={
          <SplitButton
            menu={
              <>
                <ListItem leadingSlot={null}>リンクをコピー</ListItem>
                <ListItem leadingSlot={null}>共有</ListItem>
              </>
            }
          >
            共有
          </SplitButton>
        }
        onClose={() => undefined}
      >
        <p className="m-0 body-2 text-text-neutral-secondary">
          ヘッダーアクションスロット付きの例です。
        </p>
      </SidePanel>
    </div>
  ),
};

export const Resizable: Story = {
  render: (args) => (
    <div className="flex h-screen justify-end bg-surface-muted p-4">
      <SidePanel
        {...args}
        resizable
        defaultWidth={460}
        minWidth={360}
        maxWidth={680}
        onClose={() => undefined}
      >
        <p className="m-0 body-2 text-text-neutral-secondary">
          左端をドラッグして幅を調整できます（360px〜680px）。
        </p>
      </SidePanel>
    </div>
  ),
};

export const WithoutFooter: Story = {
  args: {
    showFooter: false,
  },
  render: (args) => (
    <div className="flex h-screen justify-end bg-surface-muted p-4">
      <SidePanel {...args} onClose={() => undefined}>
        <p className="m-0 body-2 text-text-neutral-secondary">
          フッターなしの例です。
        </p>
      </SidePanel>
    </div>
  ),
};

export const FullBleed: Story = {
  args: {
    variant: 'full-bleed',
  },
  render: (args) => (
    <div className="flex h-screen justify-end bg-surface-muted">
      <SidePanel
        {...args}
        onClose={() => undefined}
        footer={
          <Button className="w-full" size="sm">
            アクション
          </Button>
        }
      >
        <p className="m-0 body-2 text-text-neutral-primary">
          画面端に密着させる場合の例です（角丸なし、左端のみボーダー）。
        </p>
      </SidePanel>
    </div>
  ),
};
