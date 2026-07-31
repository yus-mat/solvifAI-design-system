import { useEffect, useRef, useState } from 'react';
import { ChatMessage, ChatText, TextAreaComposer } from '@/components/Chat';
import { SidePanel } from '@/components/Overlay';
import type { ConfirmationIssue, IssueChatMessage } from '../mockData';
import {
  createIssueChatReply,
  createIssueChatSeed,
} from '../mockData';

const AI_THINKING_MS = 900;

export type IssueAiChatPanelProps = {
  issue: ConfirmationIssue;
  width?: number;
  onClose: () => void;
};

export function IssueAiChatPanel({
  issue,
  width = 420,
  onClose,
}: IssueAiChatPanelProps) {
  const [messages, setMessages] = useState<IssueChatMessage[]>(() =>
    createIssueChatSeed(issue),
  );
  const [composerValue, setComposerValue] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const replyCountRef = useRef(0);
  const thinkTimerRef = useRef<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(createIssueChatSeed(issue));
    setComposerValue('');
    setAiThinking(false);
    replyCountRef.current = 0;
  }, [issue]);

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
    if (!trimmed || aiThinking) return;

    const userMessage: IssueChatMessage = {
      id: `${issue.id}-user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setComposerValue('');
    setAiThinking(true);

    if (thinkTimerRef.current != null) {
      window.clearTimeout(thinkTimerRef.current);
    }

    thinkTimerRef.current = window.setTimeout(() => {
      const reply = createIssueChatReply(
        issue,
        trimmed,
        replyCountRef.current,
      );
      replyCountRef.current += 1;
      setMessages((prev) => [...prev, reply]);
      setAiThinking(false);
      thinkTimerRef.current = null;
    }, AI_THINKING_MS);
  };

  return (
    <div className="h-full w-full shrink-0" style={{ width }}>
      <SidePanel
        variant="full-bleed"
        title="AIチャットで相談"
        subtitle={issue.title}
        onClose={onClose}
        width={width}
        className="h-full w-full shadow-none"
        footer={
          <TextAreaComposer
            type="elevated"
            value={composerValue}
            onChange={setComposerValue}
            onSend={handleSend}
            sendDisabled={aiThinking || !composerValue.trim()}
            disabled={aiThinking}
            placeholder="メッセージを入力..."
          />
        }
      >
        <div ref={listRef} className="flex flex-col gap-6">
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
      </SidePanel>
    </div>
  );
}
