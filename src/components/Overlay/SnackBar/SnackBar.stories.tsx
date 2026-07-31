import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { motionAppearOpacityClassName } from '@/styles/motion';
import { useOverlayPresence } from '../useOverlayPresence';
import { SnackBar } from './SnackBar';
import type { SnackBarProps } from './SnackBar';
import { snackBarViewportClassName } from './snackBarStyles';
import type { SnackBarType } from './snackBarTypes';

const types: SnackBarType[] = ['default', 'error'];

const meta = {
  title: 'Overlay/SnackBar',
  component: SnackBar,
  parameters: {
    storyPadding: false,
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: types,
    },
    leadingIcon: { control: false },
  },
  args: {
    type: 'default',
    title: '承認依頼を送信しました',
    subtitle: 'Subtitle',
  },
} satisfies Meta<typeof SnackBar>;

export default meta;
type Story = StoryObj<typeof meta>;

function SnackBarDemo({
  triggerLabel = 'スナックバーを表示',
  autoHideMs = 4000,
  ...snackBarProps
}: SnackBarProps & {
  triggerLabel?: string;
  autoHideMs?: number;
}) {
  const [open, setOpen] = useState(false);
  const { mounted, shown, onTransitionEnd } = useOverlayPresence(open);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), autoHideMs);
    return () => window.clearTimeout(timer);
  }, [open, autoHideMs]);

  return (
    <div className="relative h-full p-8">
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <p className="mt-4 max-w-md body-2 text-text-neutral-secondary">
        ボタンを押すと画面下部にスナックバーが表示されます。数秒後に自動で閉じます。
      </p>

      {mounted ? (
        <div className={snackBarViewportClassName}>
          <SnackBar
            {...snackBarProps}
            className={[
              motionAppearOpacityClassName,
              shown ? 'pointer-events-auto opacity-100' : 'opacity-0',
              snackBarProps.className,
            ]
              .filter(Boolean)
              .join(' ')}
            onTransitionEnd={onTransitionEnd}
          />
        </div>
      ) : null}
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <SnackBarDemo {...args} />,
};

export const TitleOnly: Story = {
  render: (args) => <SnackBarDemo {...args} subtitle={undefined} />,
};

export const Error: Story = {
  args: {
    type: 'error',
    title: '送信に失敗しました',
    subtitle: 'ネットワーク接続を確認してください',
  },
  render: (args) => <SnackBarDemo {...args} />,
};

export const AllTypes: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      {types.map((type) => (
        <SnackBar
          key={type}
          type={type}
          title="承認依頼を送信しました"
          subtitle="Subtitle"
        />
      ))}
    </div>
  ),
};
