import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { ButtonIcon } from '@/components/Button';
import { Attachment } from '@/components/Chat/Attachment';
import { ArrowUp, Mic, Plus } from '@/icons';
import type { TextAreaComposerType } from './textAreaComposerTypes';
import {
  createAttachmentFromFile,
  revokeComposerAttachmentUrl,
  textAreaComposerDefaultAccept,
  type TextAreaComposerAttachment,
} from './textAreaComposerAttachment';
import {
  textAreaComposerActionBarClassName,
  textAreaComposerAttachmentSlotClassName,
  textAreaComposerClassName,
  textAreaComposerInputClassName,
  textAreaComposerTrailingActionsClassName,
} from './textAreaComposerStyles';

export type { TextAreaComposerAttachment } from './textAreaComposerAttachment';

export type TextAreaComposerActionSize = 'sm' | 'md';

export type TextAreaComposerProps = {
  type?: TextAreaComposerType;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** When false, omits the outer border (e.g. flush inside a Popover). Default true. */
  border?: boolean;
  /** When false, removes the outer corner radius. Default true. */
  rounded?: boolean;
  /** Size for the default action-bar ButtonIcons. Default `md`. */
  actionSize?: TextAreaComposerActionSize;
  /**
   * Replaces the default action-bar controls (attach / voice / send).
   * When omitted, the built-in ButtonIcon row is rendered at `actionSize`.
   */
  actions?: ReactNode;
  /**
   * Extra controls placed beside the attach button in the default action bar.
   * Only rendered when `actions` is omitted — has no effect if `actions` is set.
   */
  leadingActions?: ReactNode;
  /** Custom attachment slot — ignored when `attachment` is set. */
  attachments?: ReactNode;
  attachment?: TextAreaComposerAttachment | null;
  defaultAttachment?: TextAreaComposerAttachment | null;
  onAttachmentChange?: (attachment: TextAreaComposerAttachment | null) => void;
  onAttachmentRemove?: () => void;
  /** MIME types / extensions for the built-in file picker. */
  accept?: string;
  /** Called when a file is selected via the built-in file picker. */
  onFileAttach?: (file: File) => void;
  /** Override attach-button behavior. When omitted, opens the local file picker. */
  onAttach?: () => void;
  onVoice?: () => void;
  onSend?: () => void;
  sendDisabled?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'defaultValue' | 'onChange'>;

export function TextAreaComposer({
  type = 'default',
  value: valueProp,
  defaultValue = '',
  onChange,
  placeholder = 'メッセージを入力...',
  disabled = false,
  border = true,
  rounded = true,
  actionSize = 'md',
  actions,
  leadingActions,
  attachments,
  attachment: attachmentProp,
  defaultAttachment = null,
  onAttachmentChange,
  onAttachmentRemove,
  accept = textAreaComposerDefaultAccept,
  onFileAttach,
  onAttach,
  onVoice,
  onSend,
  sendDisabled,
  className,
  ...rest
}: TextAreaComposerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [uncontrolledAttachment, setUncontrolledAttachment] =
    useState<TextAreaComposerAttachment | null>(defaultAttachment);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const isAttachmentControlled = attachmentProp !== undefined;
  const attachment = isAttachmentControlled
    ? attachmentProp
    : uncontrolledAttachment;

  const setAttachment = (next: TextAreaComposerAttachment | null) => {
    if (!isAttachmentControlled) setUncontrolledAttachment(next);
    onAttachmentChange?.(next);
  };

  const handleChange = (next: string) => {
    if (!isControlled) setUncontrolledValue(next);
    onChange?.(next);
  };

  const handleAttachmentRemove = () => {
    if (!isAttachmentControlled) {
      revokeComposerAttachmentUrl(attachment);
    }
    setAttachment(null);
    onAttachmentRemove?.();
  };

  const handleAttachClick = () => {
    if (disabled) return;

    if (onAttach) {
      onAttach();
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!isAttachmentControlled) {
      revokeComposerAttachmentUrl(attachment);
    }

    const nextAttachment = createAttachmentFromFile(file);
    setAttachment(nextAttachment);
    onFileAttach?.(file);
  };

  useEffect(() => {
    if (isAttachmentControlled) return;
    return () => revokeComposerAttachmentUrl(attachment);
  }, [attachment?.objectUrl, isAttachmentControlled]);

  const hasContent = value.trim().length > 0 || Boolean(attachment);
  const canSend = !sendDisabled && !disabled && hasContent;

  const attachmentNode = attachment ? (
    <Attachment {...attachment} onRemove={handleAttachmentRemove} />
  ) : (
    attachments
  );

  const defaultActions = (
    <>
      <div className={textAreaComposerTrailingActionsClassName}>
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size={actionSize}
          icon={<Plus aria-hidden />}
          aria-label="ファイルを添付"
          disabled={disabled}
          onClick={handleAttachClick}
        />
        {leadingActions}
      </div>
      <div className={textAreaComposerTrailingActionsClassName}>
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size={actionSize}
          icon={<Mic aria-hidden />}
          aria-label="音声入力"
          disabled={disabled}
          onClick={onVoice}
        />
        <ButtonIcon
          emphasis="primary"
          intent="default"
          size={actionSize}
          icon={<ArrowUp aria-hidden />}
          aria-label="送信"
          disabled={!canSend}
          onClick={onSend}
        />
      </div>
    </>
  );

  return (
    <div
      className={textAreaComposerClassName({
        type,
        disabled,
        border,
        rounded,
        className,
      })}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={handleFileChange}
      />

      {attachmentNode ? (
        <div className={textAreaComposerAttachmentSlotClassName}>
          {attachmentNode}
        </div>
      ) : null}

      <textarea
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        rows={2}
        className={textAreaComposerInputClassName}
        onChange={(event) => handleChange(event.target.value)}
        {...rest}
      />

      <div className={textAreaComposerActionBarClassName}>
        {actions ?? defaultActions}
      </div>
    </div>
  );
}
