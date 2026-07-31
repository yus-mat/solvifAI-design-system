import type { AttachmentProps } from '@/components/Chat/Attachment';
import type { AttachmentFileType } from '@/components/Chat/Attachment/attachmentTypes';

export type TextAreaComposerAttachment = Omit<AttachmentProps, 'onRemove'> & {
  file?: File;
  /** Set when the composer creates a preview URL — used for cleanup. */
  objectUrl?: string;
};

const imageMimePrefix = 'image/';

export const textAreaComposerDefaultAccept =
  'image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv';

export function getAttachmentFileType(file: File): AttachmentFileType {
  return file.type.startsWith(imageMimePrefix) ? 'image' : 'document';
}

export function createAttachmentFromFile(
  file: File,
): TextAreaComposerAttachment {
  const fileType = getAttachmentFileType(file);

  if (fileType === 'image') {
    const objectUrl = URL.createObjectURL(file);
    return {
      file,
      fileType,
      fileName: file.name,
      imageSrc: objectUrl,
      imageAlt: file.name,
      objectUrl,
    };
  }

  return {
    file,
    fileType,
    fileName: file.name,
  };
}

export function toChatMessageAttachment(
  attachment: TextAreaComposerAttachment | null | undefined,
) {
  if (!attachment) return undefined;

  return {
    fileName: attachment.fileName,
    fileExtension: attachment.fileExtension,
    fileType: attachment.fileType,
    imageSrc: attachment.imageSrc,
    imageAlt: attachment.imageAlt,
    objectUrl: attachment.objectUrl,
  };
}

export function revokeComposerAttachmentUrl(
  attachment: TextAreaComposerAttachment | null | undefined,
) {
  if (attachment?.objectUrl) {
    URL.revokeObjectURL(attachment.objectUrl);
  }
}
