import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/Button';
import { ButtonIcon } from '../Button/ButtonIcon';
import { TextArea } from '../Field/TextArea';
import { Popover } from './Popover';
import type { PopoverProps } from './Popover';

const meta = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    storyPadding: false,
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: false },
    onClose: { action: 'close' },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

function PopoverDemo({
  triggerLabel = 'ポップオーバーを開く',
  children,
  ...popoverProps
}: Omit<PopoverProps, 'open' | 'onClose'> & {
  triggerLabel?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-full p-8">
      <div className="relative inline-block">
        <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
        <Popover
          {...popoverProps}
          open={open}
          closable
          onClose={() => setOpen(false)}
          className="absolute top-full left-0 z-10 mt-2 w-[min(100vw-3rem,377px)]"
        >
          {children}
        </Popover>
      </div>
      <p className="mt-4 max-w-md body-2 text-text-neutral-secondary">
        ボタンを押すとポップオーバーが表示されます。閉じるボタンで閉じられます。
      </p>
    </div>
  );
}

export const Playground: Story = {
  render: () => (
    <PopoverDemo>
      <p className="p-4 caption text-text-neutral-muted">
        Slot content — any children go here.
      </p>
    </PopoverDemo>
  ),
};

export const Closable: Story = {
  render: () => (
    <div className="p-8">
      <div className="w-full max-w-sm">
        <Popover closable onClose={() => undefined}>
          <p className="p-4 caption text-text-neutral-muted">
            常時表示のクローズ可能ポップオーバー（静的プレビュー）。
          </p>
        </Popover>
      </div>
    </div>
  ),
};

export const CommentBox: Story = {
  render: () => (
    <PopoverDemo triggerLabel="コメントを書く">
      <div className="flex flex-col gap-2 p-3">
        <TextArea
          rows={3}
          resize="none"
          wrapperClassName="min-h-0 border-0 bg-transparent hover:bg-transparent has-[textarea:focus-visible]:border-0"
          className="min-h-0 border-0 p-0"
        />
        <div className="flex justify-end">
          <ButtonIcon size="md" aria-label="送信" />
        </div>
      </div>
    </PopoverDemo>
  ),
};
