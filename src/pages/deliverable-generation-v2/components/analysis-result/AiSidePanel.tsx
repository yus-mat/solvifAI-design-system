import { useEffect, useState } from 'react';
import { Attachment, ChatMessage, ChatText, TextAreaComposer } from '@/components/Chat';
import type { TextAreaComposerAttachment } from '@/components/Chat/TextAreaComposer';
import {
  revokeComposerAttachmentUrl,
  toChatMessageAttachment,
} from '@/components/Chat/TextAreaComposer/textAreaComposerAttachment';
import { SidePanel } from '@/components/Overlay';
import {
  ANALYSIS_AI_PANEL_SUBTITLE,
  ANALYSIS_AI_PANEL_TITLE,
  findAnalysisQuestion,
} from '../../mockData';
import { useInputAnalysis } from '../InputAnalysisContext';

export function AiSidePanel() {
  const {
    aiPanelOpen,
    selectedQuestionId,
    chatMessages,
    aiThinking,
    closeAiPanel,
    sendChatMessage,
  } = useInputAnalysis();
  const [composerValue, setComposerValue] = useState('');
  const [composerAttachment, setComposerAttachment] =
    useState<TextAreaComposerAttachment | null>(null);
  const [renderedQuestionId, setRenderedQuestionId] = useState(
    selectedQuestionId,
  );

  useEffect(() => {
    if (selectedQuestionId) setRenderedQuestionId(selectedQuestionId);
  }, [selectedQuestionId]);

  if (!renderedQuestionId) return null;

  const panelOpen = aiPanelOpen && selectedQuestionId != null;
  const match = findAnalysisQuestion(renderedQuestionId);
  const subtitle = match?.question.label ?? ANALYSIS_AI_PANEL_SUBTITLE;

  const handleSend = () => {
    const trimmed = composerValue.trim();
    if (!trimmed && !composerAttachment) return;

    const attachmentForMessage = toChatMessageAttachment(composerAttachment);
    sendChatMessage(trimmed, attachmentForMessage);

    setComposerValue('');
    setComposerAttachment(null);
  };

  const handleAttachmentChange = (
    attachment: TextAreaComposerAttachment | null,
  ) => {
    if (
      composerAttachment?.objectUrl &&
      composerAttachment.objectUrl !== attachment?.objectUrl
    ) {
      revokeComposerAttachmentUrl(composerAttachment);
    }
    setComposerAttachment(attachment);
  };

  return (
    <SidePanel
      resizable
      animateWidthOnMount
      open={panelOpen}
      onWidthExitComplete={() => setRenderedQuestionId(null)}
      title={ANALYSIS_AI_PANEL_TITLE}
      subtitle={subtitle}
      onClose={closeAiPanel}
      className="h-full shrink-0"
      footer={
        <TextAreaComposer
          type="elevated"
          value={composerValue}
          onChange={setComposerValue}
          attachment={composerAttachment}
          onAttachmentChange={handleAttachmentChange}
          onSend={handleSend}
        />
      }
    >
      <div className="flex flex-col gap-6">
        {aiThinking ? (
          <ChatMessage type="ai">
            <ChatText variant="ai-thinking">考えています...</ChatText>
          </ChatMessage>
        ) : null}
        {chatMessages.map((message) => (
          <ChatMessage
            key={message.id}
            type={message.role}
            attachment={
              message.attachment ? (
                <Attachment
                  fileName={message.attachment.fileName}
                  fileExtension={message.attachment.fileExtension}
                  fileType={message.attachment.fileType}
                  imageSrc={message.attachment.imageSrc}
                  imageAlt={message.attachment.imageAlt}
                />
              ) : undefined
            }
          >
            <ChatText variant={message.role === 'ai' ? 'ai' : 'user'}>
              {message.content}
            </ChatText>
          </ChatMessage>
        ))}
      </div>
    </SidePanel>
  );
}
