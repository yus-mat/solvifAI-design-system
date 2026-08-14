import type { Meta, StoryObj } from '@storybook/react-vite';
import { Attachment } from '@/components/Chat/Attachment';
import { ChatText } from '@/components/Chat/ChatText';
import { ChatMessage } from './ChatMessage';
import type { ChatMessageType } from './chatMessageTypes';

const sampleText =
  '資料作成を開始します。まずは、どのような資料を作成したいのか、具体的な資料名を教えていただけますか？';

type PlaygroundArgs = {
  type: ChatMessageType;
  message: string;
  timestamp: string;
  withAttachment: boolean;
};

const meta = {
  title: 'Chat/ChatMessage',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['ai', 'user'] satisfies ChatMessageType[],
    },
    message: { control: 'text' },
    timestamp: { control: 'text' },
    withAttachment: { control: 'boolean' },
  },
  args: {
    type: 'ai',
    message: sampleText,
    timestamp: '12:40pm',
    withAttachment: false,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[915px] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<PlaygroundArgs>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  render: ({ type, message, timestamp, withAttachment }) => (
    <ChatMessage
      type={type}
      timestamp={timestamp}
      onThumbsUp={type === 'ai' ? () => undefined : undefined}
      onThumbsDown={type === 'ai' ? () => undefined : undefined}
      onCopy={type === 'user' ? () => undefined : undefined}
      onRefresh={type === 'user' ? () => undefined : undefined}
      onSave={type === 'user' ? () => undefined : undefined}
      defaultEditValue={message}
      attachment={
        withAttachment && type === 'user' ? (
          <Attachment fileName="営業案ブレスト結果" fileExtension=".docx" />
        ) : undefined
      }
    >
      <ChatText variant={type === 'ai' ? 'ai' : 'user'}>{message}</ChatText>
    </ChatMessage>
  ),
};

export const AiThinking: Story = {
  render: () => (
    <ChatMessage type="ai">
      <ChatText variant="ai-thinking">考えています...</ChatText>
    </ChatMessage>
  ),
};

export const UserEditing: Story = {
  args: {
    type: 'user',
    message: sampleText,
  },
  render: ({ message }) => (
    <ChatMessage
      type="user"
      defaultEditing
      defaultEditValue={message}
      onSave={() => undefined}
      onCancel={() => undefined}
    >
      <ChatText variant="user">{message}</ChatText>
    </ChatMessage>
  ),
};
