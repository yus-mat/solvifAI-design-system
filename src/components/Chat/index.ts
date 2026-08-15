export { Attachment } from './Attachment';
export type { AttachmentProps } from './Attachment';
export type { AttachmentFileType } from './Attachment/attachmentTypes';

export { CHAT_AI_AVATAR_SRC, CHAT_AI_AVATAR_ALT } from './chatConstants';

export { AnswerPanel } from './AnswerPanel';
export type { AnswerPanelPage, AnswerPanelProps } from './AnswerPanel';

export { ChatText } from './ChatText';
export type { ChatTextProps } from './ChatText';
export type { ChatTextVariant } from './ChatText/chatTextTypes';

export { ChatMessage } from './ChatMessage';
export type { ChatMessageProps } from './ChatMessage';
export type { ChatMessageType } from './ChatMessage/chatMessageTypes';

export { TextAreaComposer } from './TextAreaComposer';
export type {
  TextAreaComposerActionSize,
  TextAreaComposerAttachment,
  TextAreaComposerProps,
} from './TextAreaComposer';
export type { TextAreaComposerType } from './TextAreaComposer/textAreaComposerTypes';
export {
  textAreaComposerDefaultAccept,
  getAttachmentFileType,
  createAttachmentFromFile,
  toChatMessageAttachment,
  revokeComposerAttachmentUrl,
} from './TextAreaComposer/textAreaComposerAttachment';
