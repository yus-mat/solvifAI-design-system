import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Button, ButtonIcon } from '@/components/Button';
import {
  chatTextClassName,
  chatTextContentClassName,
} from '@/components/Chat/ChatText/chatTextStyles';
import { Copy, PencilLine, RotateCw, ThumbsDown, ThumbsUp } from '@/icons';
import { focusOutlineSuppressClassName } from '@/styles/focusRing';
import type { ChatMessageType } from './chatMessageTypes';
import {
  chatMessageActionGroupClassName,
  chatMessageActionsAlignmentClassName,
  chatMessageActionsClassName,
  chatMessageAttachmentRowClassName,
  chatMessageClassName,
  chatMessageContentAlignmentClassName,
  chatMessageContentClassName,
  chatMessageContentColumnClassName,
  chatMessageEditingActionsClassName,
  chatMessageMessageRowClassName,
  chatMessageRowClassName,
  chatMessageUserBodyClassName,
  chatMessageTimestampClassName,
} from './chatMessageStyles';

export type ChatMessageProps = {
  type?: ChatMessageType;
  children: ReactNode;
  attachment?: ReactNode;
  /** Optional AI avatar. Hidden by default. Ignored for user messages. */
  avatar?: ReactNode;
  timestamp?: string;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onCopy?: () => void;
  onRefresh?: () => void;
  onEdit?: () => void;
  editing?: boolean;
  defaultEditing?: boolean;
  onEditingChange?: (editing: boolean) => void;
  editValue?: string;
  defaultEditValue?: string;
  onEditValueChange?: (value: string) => void;
  onSave?: (value: string) => void;
  onCancel?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'type'>;

function textFromNode(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textFromNode).join('');
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromNode(node.props.children);
  }
  return '';
}

function ChatMessageActionButton({
  icon,
  'aria-label': ariaLabel,
  onClick,
}: {
  icon: ReactNode;
  'aria-label': string;
  onClick: () => void;
}) {
  return (
    <ButtonIcon
      emphasis="ghost"
      intent="default"
      size="sm"
      icon={icon}
      aria-label={ariaLabel}
      onClick={onClick}
    />
  );
}

function ChatMessageActions({
  type,
  timestamp,
  onThumbsUp,
  onThumbsDown,
  onCopy,
  onRefresh,
  onEdit,
}: {
  type: ChatMessageType;
  timestamp?: string;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onCopy?: () => void;
  onRefresh?: () => void;
  onEdit?: () => void;
}) {
  const hasAiActions = type === 'ai' && (onThumbsUp || onThumbsDown);
  const hasUserActions = type === 'user' && (onCopy || onRefresh || onEdit);
  const hasTimestamp = Boolean(timestamp);

  if (!hasAiActions && !hasUserActions && !hasTimestamp) return null;

  const timestampNode = hasTimestamp ? (
    <span className={chatMessageTimestampClassName}>{timestamp}</span>
  ) : null;

  const actionGroup =
    type === 'ai' && hasAiActions ? (
      <div className={chatMessageActionGroupClassName}>
        {onThumbsUp ? (
          <ChatMessageActionButton
            icon={<ThumbsUp aria-hidden />}
            aria-label="良い回答"
            onClick={onThumbsUp}
          />
        ) : null}
        {onThumbsDown ? (
          <ChatMessageActionButton
            icon={<ThumbsDown aria-hidden />}
            aria-label="悪い回答"
            onClick={onThumbsDown}
          />
        ) : null}
      </div>
    ) : type === 'user' && hasUserActions ? (
      <div className={chatMessageActionGroupClassName}>
        {onCopy ? (
          <ChatMessageActionButton
            icon={<Copy aria-hidden />}
            aria-label="メッセージをコピー"
            onClick={onCopy}
          />
        ) : null}
        {onRefresh ? (
          <ChatMessageActionButton
            icon={<RotateCw aria-hidden />}
            aria-label="やり直す"
            onClick={onRefresh}
          />
        ) : null}
        {onEdit ? (
          <ChatMessageActionButton
            icon={<PencilLine aria-hidden />}
            aria-label="メッセージを編集"
            onClick={onEdit}
          />
        ) : null}
      </div>
    ) : null;

  return (
    <div
      className={[
        chatMessageActionsClassName,
        chatMessageActionsAlignmentClassName(type),
      ].join(' ')}
    >
      {actionGroup}
      {timestampNode}
    </div>
  );
}

export function ChatMessage({
  type = 'ai',
  children,
  attachment,
  avatar,
  timestamp,
  onThumbsUp,
  onThumbsDown,
  onCopy,
  onRefresh,
  onEdit,
  editing: editingProp,
  defaultEditing = false,
  onEditingChange,
  editValue,
  defaultEditValue,
  onEditValueChange,
  onSave,
  onCancel,
  className,
}: ChatMessageProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messageText = defaultEditValue ?? textFromNode(children);

  const isEditingControlled = editingProp !== undefined;
  const [uncontrolledEditing, setUncontrolledEditing] = useState(defaultEditing);
  const isEditing = type === 'user' && (isEditingControlled ? editingProp : uncontrolledEditing);

  const isValueControlled = editValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(messageText);
  const value = isValueControlled ? editValue : uncontrolledValue;

  const setEditing = (next: boolean) => {
    if (!isEditingControlled) setUncontrolledEditing(next);
    onEditingChange?.(next);
  };

  const setValue = (next: string) => {
    if (!isValueControlled) setUncontrolledValue(next);
    onEditValueChange?.(next);
  };

  const canEdit =
    type === 'user' &&
    Boolean(onEdit || onSave || onEditingChange || editingProp !== undefined);

  const handleEdit = () => {
    if (!isValueControlled) setUncontrolledValue(messageText);
    onEdit?.();
    setEditing(true);
  };

  const handleCancel = () => {
    if (!isValueControlled) setUncontrolledValue(messageText);
    onCancel?.();
    setEditing(false);
  };

  const handleSave = () => {
    onSave?.(value);
    setEditing(false);
  };

  useEffect(() => {
    if (!isEditing) return;
    // preventScroll: focusing must not jump the message in the scroll container.
    textareaRef.current?.focus({ preventScroll: true });
  }, [isEditing]);

  const hoverActions = isEditing ? null : (
    <ChatMessageActions
      type={type}
      timestamp={timestamp}
      onThumbsUp={onThumbsUp}
      onThumbsDown={onThumbsDown}
      onCopy={onCopy}
      onRefresh={onRefresh}
      onEdit={canEdit ? handleEdit : undefined}
    />
  );

  const editingActions = isEditing ? (
    <div className={chatMessageEditingActionsClassName}>
      <Button
        emphasis="ghost"
        size="sm"
        className="text-text-action-primary"
        onClick={handleCancel}
      >
        キャンセル
      </Button>
      <Button emphasis="primary" size="sm" onClick={handleSave}>
        保存
      </Button>
    </div>
  ) : null;

  if (type === 'user') {
    return (
      <div className={chatMessageClassName({ type, className })}>
        <div className={chatMessageMessageRowClassName}>
          <div
            className={[
              chatMessageUserBodyClassName,
              chatMessageContentAlignmentClassName(type),
            ].join(' ')}
          >
            {attachment ? (
              <div className={chatMessageAttachmentRowClassName}>
                {attachment}
              </div>
            ) : null}
            <div className="relative">
              {isEditing ? (
                <div className="relative">
                  {/* Ghost: same box as ChatText so width/height stay stable while editing */}
                  <div
                    aria-hidden
                    className={[
                      chatTextClassName({ variant: 'user' }),
                      'invisible',
                    ].join(' ')}
                  >
                    <p className={`${chatTextContentClassName} whitespace-pre-wrap`}>
                      {value || '\u00A0'}
                    </p>
                  </div>
                  <textarea
                    ref={textareaRef}
                    aria-label="メッセージを編集"
                    className={[
                      chatTextClassName({ variant: 'user-editing' }),
                      // chatTextClassName includes `relative`; it wins over `absolute` in
                      // CSS source order, so force absolute or the ghost stacks above.
                      '!absolute inset-0 w-full resize-none overflow-auto bg-transparent',
                      focusOutlineSuppressClassName,
                    ].join(' ')}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        event.preventDefault();
                        handleCancel();
                      }
                      if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                        event.preventDefault();
                        handleSave();
                      }
                    }}
                  />
                </div>
              ) : (
                children
              )}
              {hoverActions}
              {editingActions}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={chatMessageClassName({ type, className })}>
      <div className={chatMessageRowClassName(type)}>
        {avatar}
        <div
          className={[
            chatMessageContentColumnClassName,
            chatMessageContentAlignmentClassName(type),
          ].join(' ')}
        >
          <div className={chatMessageContentClassName}>
            {attachment ? (
              <div className={chatMessageAttachmentRowClassName}>
                {attachment}
              </div>
            ) : null}
            {children}
          </div>
          {hoverActions}
        </div>
      </div>
    </div>
  );
}
