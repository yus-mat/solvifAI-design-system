import type { HTMLAttributes } from 'react';
import { ButtonIcon } from '@/components/Button';
import { X } from '@/icons';
import type { AttachmentFileType } from './attachmentTypes';
import {
  attachmentDocumentContentClassName,
  attachmentExtensionClassName,
  attachmentFileNameClassName,
  attachmentImageClassName,
  attachmentImageFrameClassName,
  attachmentRemoveButtonClassName,
  attachmentRootClassName,
} from './attachmentStyles';

export type AttachmentProps = {
  fileName: string;
  fileExtension?: string;
  fileType?: AttachmentFileType;
  imageSrc?: string;
  imageAlt?: string;
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function splitFileName(fileName: string, fileExtension?: string) {
  const extension =
    fileExtension ??
    fileName.match(/(\.[^.]+)$/)?.[1] ??
    '';
  const normalizedExtension =
    extension && !extension.startsWith('.') ? `.${extension}` : extension;
  const displayName =
    normalizedExtension && fileName.endsWith(normalizedExtension)
      ? fileName.slice(0, -normalizedExtension.length)
      : fileName;

  return {
    displayName,
    extension: normalizedExtension,
  };
}

function AttachmentRemoveButton({
  removeLabel,
  disabled,
  onRemove,
}: {
  removeLabel: string;
  disabled?: boolean;
  onRemove?: () => void;
}) {
  if (!onRemove) return null;

  return (
    <div className={attachmentRemoveButtonClassName}>
      <ButtonIcon
        emphasis="ghost"
        intent="default"
        size="sm"
        icon={<X aria-hidden />}
        aria-label={removeLabel}
        tooltip={false}
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
      />
    </div>
  );
}

export function Attachment({
  fileName,
  fileExtension,
  fileType = 'document',
  imageSrc,
  imageAlt = '',
  onRemove,
  removeLabel = '添付を削除',
  disabled = false,
  className,
  tabIndex,
  ...rest
}: AttachmentProps) {
  const rootClassName = attachmentRootClassName({
    fileType,
    disabled,
    className,
  });

  if (fileType === 'image') {
    if (!imageSrc) return null;

    return (
      <div
        className={rootClassName}
        tabIndex={disabled ? undefined : tabIndex ?? (onRemove ? 0 : undefined)}
        {...rest}
      >
        <div className={attachmentImageFrameClassName}>
          <img
            src={imageSrc}
            alt={imageAlt || fileName}
            className={attachmentImageClassName}
          />
        </div>
        <AttachmentRemoveButton
          removeLabel={removeLabel}
          disabled={disabled}
          onRemove={onRemove}
        />
      </div>
    );
  }

  const { displayName, extension } = splitFileName(fileName, fileExtension);

  return (
    <div
      className={rootClassName}
      tabIndex={disabled ? undefined : tabIndex ?? (onRemove ? 0 : undefined)}
      {...rest}
    >
      <div className={attachmentDocumentContentClassName}>
        <p className={attachmentFileNameClassName}>{displayName}</p>
        {extension ? (
          <p className={attachmentExtensionClassName}>{extension}</p>
        ) : null}
      </div>
      <AttachmentRemoveButton
        removeLabel={removeLabel}
        disabled={disabled}
        onRemove={onRemove}
      />
    </div>
  );
}
