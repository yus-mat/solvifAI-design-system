import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Backdrop } from '../Backdrop';
import { Drawer } from './Drawer';
import type { DrawerProps } from './Drawer';

const meta = {
  title: 'Overlay/Drawer',
  component: Drawer,
  parameters: {
    storyPadding: false,
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    open: { control: false },
    headerActions: { control: false },
    footer: { control: false },
    onClose: { action: 'close' },
  },
  args: {
    size: 'sm',
    title: 'タイトル',
    subtitle: 'サブタイトル',
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function DrawerDemo({
  triggerLabel = 'ドロワーを開く',
  children,
  footer,
  headerActions,
  ...drawerProps
}: Omit<DrawerProps, 'open' | 'onClose'> & {
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-full p-8">
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <p className="mt-4 max-w-md body-2 text-text-neutral-secondary">
        ボタンを押すと右からドロワーがスライドインします。背景をクリックするか、閉じるボタンで閉じられます。
      </p>

      <Backdrop open={open} onClick={() => setOpen(false)} />

      <Drawer
        {...drawerProps}
        open={open}
        headerActions={headerActions}
        footer={footer}
        onClose={() => setOpen(false)}
      >
        {children}
      </Drawer>
    </div>
  );
}

export const Playground: Story = {
  render: (args) => (
    <DrawerDemo {...args}>
      <p className="body-2 text-text-neutral-primary">
        ドロワー本文スロット。詳細パネルや設定フォームを配置します。
      </p>
    </DrawerDemo>
  ),
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <DrawerDemo {...args}>
      <p className="body-2 text-text-neutral-primary">
        680px 幅のドロワー（Size=MD）。
      </p>
    </DrawerDemo>
  ),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => (
    <DrawerDemo triggerLabel="フルビューポートドロワーを開く" {...args}>
      <p className="body-2 text-text-neutral-primary">
        ビューポート全幅のドロワー（Size=LG）。角丸なし。
      </p>
    </DrawerDemo>
  ),
};

export const WithHeaderActions: Story = {
  render: (args) => (
    <DrawerDemo
      {...args}
      headerActions={
        <>
          <Button size="sm" emphasis="secondary" intent="default">
            Button
          </Button>
          <Button size="sm" emphasis="secondary" intent="default">
            Button
          </Button>
        </>
      }
    >
      <p className="body-2 text-text-neutral-primary">
        ヘッダー右側にアクションボタンと閉じるボタンを並べた構成です。
      </p>
    </DrawerDemo>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <DrawerDemo
      {...args}
      footer={
        <>
          <Button emphasis="ghost" intent="default">
            キャンセル
          </Button>
          <Button>保存</Button>
        </>
      }
    >
      <p className="body-2 text-text-neutral-primary">
        フッターにアクションバーを配置した例です。
      </p>
    </DrawerDemo>
  ),
};
