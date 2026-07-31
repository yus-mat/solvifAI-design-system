import { useEffect, useState } from 'react';
import { Attachment, ChatMessage, ChatText, TextAreaComposer } from '@/components/Chat';
import type { TextAreaComposerAttachment } from '@/components/Chat/TextAreaComposer';
import {
  revokeComposerAttachmentUrl,
  toChatMessageAttachment,
} from '@/components/Chat/TextAreaComposer/textAreaComposerAttachment';
import { SidePanel } from '@/components/Overlay';
import {
  BUSINESS_FLOW_PANEL_SUBTITLE,
  BUSINESS_FLOW_PANEL_TITLE,
} from '../../mockData';
import { useInputAnalysis } from '../InputAnalysisContext';
import { BusinessFlowChart } from './BusinessFlowChart';

export function FlowChartSidePanel() {
  const {
    generateDiagram,
    flowChatMessages,
    flowAiThinking,
    closeFlowPanel,
    sendFlowChatMessage,
  } = useInputAnalysis();
  const [composerValue, setComposerValue] = useState('');
  const [composerAttachment, setComposerAttachment] =
    useState<TextAreaComposerAttachment | null>(null);
  const [mounted, setMounted] = useState(generateDiagram);

  useEffect(() => {
    if (generateDiagram) setMounted(true);
  }, [generateDiagram]);

  if (!mounted) return null;

  const handleSend = () => {
    const trimmed = composerValue.trim();
    if (!trimmed && !composerAttachment) return;

    const attachmentForMessage = toChatMessageAttachment(composerAttachment);
    sendFlowChatMessage(trimmed, attachmentForMessage);

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
      open={generateDiagram}
      onWidthExitComplete={() => setMounted(false)}
      title={BUSINESS_FLOW_PANEL_TITLE}
      subtitle={BUSINESS_FLOW_PANEL_SUBTITLE}
      onClose={closeFlowPanel}
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
        <BusinessFlowChart />
        {flowAiThinking ? (
          <ChatMessage type="ai">
            <ChatText variant="ai-thinking">考えています...</ChatText>
          </ChatMessage>
        ) : null}
        {flowChatMessages.map((message) => (
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
