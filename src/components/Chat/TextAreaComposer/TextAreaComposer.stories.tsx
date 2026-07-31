import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextAreaComposer } from './TextAreaComposer';
import type { TextAreaComposerAttachment } from './textAreaComposerAttachment';

const meta = {
  title: 'Chat/TextAreaComposer',
  component: TextAreaComposer,
  tags: ['autodocs'],
  args: {
    placeholder: 'メッセージを入力...',
  },
} satisfies Meta<typeof TextAreaComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Elevated: Story = {
  args: { type: 'elevated' },
};

export const SmallActions: Story = {
  args: { actionSize: 'sm' },
};

export const FlushInPopover: Story = {
  args: {
    border: false,
    rounded: false,
    actionSize: 'sm',
  },
  decorators: [
    (Story) => (
      <div className="w-[214px] overflow-hidden rounded-lg border border-border-neutral-muted bg-surface-raise shadow-md">
        <Story />
      </div>
    ),
  ],
};

export const Filled: Story = {
  args: { defaultValue: 'スプリントチケットの命名規則について教えてください。' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithFileAttachment: Story = {
  render: function WithFileAttachmentStory() {
    const [lastFileName, setLastFileName] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-3">
        <TextAreaComposer
          type="elevated"
          onFileAttach={(file) => setLastFileName(file.name)}
        />
        {lastFileName ? (
          <p className="m-0 caption text-text-neutral-secondary">
            選択されたファイル: {lastFileName}
          </p>
        ) : null}
      </div>
    );
  },
};

export const ControlledAttachment: Story = {
  render: function ControlledAttachmentStory() {
    const [attachment, setAttachment] =
      useState<TextAreaComposerAttachment | null>({
        fileType: 'image',
        fileName: 'screenshot.png',
        imageSrc: 'https://picsum.photos/seed/composer-attachment/589/104',
        imageAlt: 'screenshot',
      });

    return (
      <TextAreaComposer
        attachment={attachment}
        onAttachmentChange={setAttachment}
      />
    );
  },
};
