import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Backdrop } from './Backdrop';
import { Dialog } from './Dialog';
import type { DialogProps } from './Dialog';

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  parameters: {
    storyPadding: false,
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: false },
    footer: { control: false },
    onClose: { action: 'close' },
  },
  args: {
    title: 'タイトル',
    subtitle: 'サブタイトル',
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogDemo({
  triggerLabel = 'ダイアログを開く',
  children,
  footer,
  ...dialogProps
}: Omit<DialogProps, 'open' | 'onClose'> & {
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-full p-8">
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <p className="mt-4 max-w-md body-2 text-text-neutral-secondary">
        ボタンを押すとダイアログがフェードインします。背景をクリックするか、閉じるボタンで閉じられます。
      </p>

      <Dialog
        {...dialogProps}
        open={open}
        footer={footer}
        onClose={() => setOpen(false)}
      >
        {children}
      </Dialog>
    </div>
  );
}

export const Playground: Story = {
  render: (args) => (
    <DialogDemo {...args}>
      <p className="body-2 text-text-neutral-primary">
        ダイアログ本文スロット。フォームや確認メッセージを配置します。
      </p>
    </DialogDemo>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <DialogDemo
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
        変更内容を保存しますか？
      </p>
    </DialogDemo>
  ),
};

export const BackdropOnly: Story = {
  render: () => (
    <div className="relative min-h-[240px]">
      <Backdrop />
      <p className="relative z-20 p-6 body-2 text-text-neutral-primary">
        Background/Overlay/Subtle の全画面オーバーレイ
      </p>
    </div>
  ),
};
