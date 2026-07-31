import { useEffect, useRef, useState } from 'react';
import { ChatMessage, ChatText, TextAreaComposer } from '@/components/Chat';
import type { SlideAiChatMessage, SlideTextAnnotation } from '../mockData';
import { createSlideAiChatReply } from '../mockData';

const AI_THINKING_MS = 900;

export type SlideAiChatTabProps = {
  messages: SlideAiChatMessage[];
  annotation: SlideTextAnnotation | null;
  onMessagesChange: (messages: SlideAiChatMessage[]) => void;
};

export function SlideAiChatTab({
  messages,
  annotation,
  onMessagesChange,
}: SlideAiChatTabProps) {
  const [composerValue, setComposerValue] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const replyCountRef = useRef(0);
  const thinkTimerRef = useRef<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    replyCountRef.current = Math.max(
      0,
      messages.filter((message) => message.role === 'ai').length - 1,
    );
  }, [annotation?.id, messages]);

  useEffect(() => {
    return () => {
      if (thinkTimerRef.current != null) {
        window.clearTimeout(thinkTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, aiThinking]);

  const handleSend = () => {
    const trimmed = composerValue.trim();
    if (!trimmed || aiThinking || !annotation) return;

    const userMessage: SlideAiChatMessage = {
      id: `${annotation.id}-user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const withUser = [...messages, userMessage];
    onMessagesChange(withUser);
    setComposerValue('');
    setAiThinking(true);

    if (thinkTimerRef.current != null) {
      window.clearTimeout(thinkTimerRef.current);
    }

    thinkTimerRef.current = window.setTimeout(() => {
      const reply = createSlideAiChatReply(
        annotation,
        trimmed,
        replyCountRef.current,
      );
      replyCountRef.current += 1;
      onMessagesChange([...withUser, reply]);
      setAiThinking(false);
      thinkTimerRef.current = null;
    }, AI_THINKING_MS);
  };

  if (!annotation && messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 body-2 text-text-neutral-secondary">
        スライド上のテキストから AI チャットを開始できます
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {annotation ? (
        <div className="shrink-0 border-b border-border-neutral-muted px-4 py-3">
          <p className="m-0 caption-bold text-text-neutral-primary">
            AIチャットで編集
          </p>
          <p className="m-0 mt-0.5 line-clamp-2 caption text-text-neutral-secondary">
            {annotation.highlightText}
          </p>
        </div>
      ) : null}

      <div ref={listRef} className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} type={message.role}>
            <ChatText variant={message.role === 'ai' ? 'ai' : 'user'}>
              {message.content}
            </ChatText>
          </ChatMessage>
        ))}
        {aiThinking ? (
          <ChatMessage type="ai">
            <ChatText variant="ai-thinking">考えています...</ChatText>
          </ChatMessage>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-border-neutral-muted p-3">
        <TextAreaComposer
          type="elevated"
          value={composerValue}
          onChange={setComposerValue}
          onSend={handleSend}
          sendDisabled={aiThinking || !composerValue.trim() || !annotation}
          disabled={aiThinking || !annotation}
          placeholder="メッセージを入力..."
        />
      </div>
    </div>
  );
}
