import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatText } from './ChatText';
import type { ChatTextVariant } from './chatTextTypes';

const sampleText =
  '資料作成を開始します。まずは、どのような資料を作成したいのか、具体的な資料名を教えていただけますか？';

type PlaygroundArgs = {
  variant: ChatTextVariant;
  children: string;
  truncated: boolean;
};

const meta = {
  title: 'Chat/ChatText',
  component: ChatText,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['ai', 'ai-thinking', 'user'] satisfies ChatTextVariant[],
    },
    children: { control: 'text' },
    truncated: { control: 'boolean' },
  },
  args: {
    variant: 'ai',
    children: sampleText,
    truncated: false,
  },
} satisfies Meta<PlaygroundArgs>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {};
