import type { Meta, StoryObj } from '@storybook/react-vite';
import { Attachment } from './Attachment';
import type { AttachmentFileType } from './attachmentTypes';

type PlaygroundArgs = {
  fileName: string;
  fileExtension: string;
  fileType: AttachmentFileType;
  imageSrc: string;
  imageAlt: string;
  disabled: boolean;
  showRemove: boolean;
};

const meta = {
  title: 'Chat/Attachment',
  component: Attachment,
  tags: ['autodocs'],
  argTypes: {
    fileType: {
      control: 'radio',
      options: ['document', 'image'] satisfies AttachmentFileType[],
    },
    fileName: { control: 'text' },
    fileExtension: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    disabled: { control: 'boolean' },
    showRemove: { control: 'boolean' },
  },
  args: {
    fileName: '営業案ブレスト結果',
    fileExtension: '.docx',
    fileType: 'document',
    imageSrc: 'https://picsum.photos/seed/attachment-inline/240/160',
    imageAlt: 'screenshot',
    disabled: false,
    showRemove: true,
  },
} satisfies Meta<PlaygroundArgs>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  render: ({
    showRemove,
    fileType,
    imageSrc,
    imageAlt,
    fileName,
    fileExtension,
    disabled,
  }) => (
    <div className="p-8">
      <Attachment
        fileName={fileName}
        fileExtension={fileExtension}
        fileType={fileType}
        imageSrc={fileType === 'image' ? imageSrc : undefined}
        imageAlt={imageAlt}
        disabled={disabled}
        onRemove={showRemove ? () => undefined : undefined}
      />
    </div>
  ),
};

/** Matches Figma component set: document / image × default / hover (remove). */
export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-start gap-6">
        <Attachment
          fileName="営業案ブレスト結果"
          fileExtension=".docx"
          onRemove={() => undefined}
        />
        <Attachment fileName="営業案ブレスト結果" fileExtension=".docx" />
      </div>
      <div className="flex items-start gap-6">
        <Attachment
          fileName="フロー図.png"
          fileType="image"
          imageSrc="https://picsum.photos/seed/attachment-figma/240/160"
          imageAlt="フロー図"
          onRemove={() => undefined}
        />
        <Attachment
          fileName="フロー図.png"
          fileType="image"
          imageSrc="https://picsum.photos/seed/attachment-figma/240/160"
          imageAlt="フロー図"
        />
      </div>
      <p className="caption text-text-neutral-muted">
        Hover the left cards to reveal the remove control (Figma Hover / State4).
      </p>
    </div>
  ),
};
