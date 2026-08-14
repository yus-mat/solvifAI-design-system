import type { HTMLAttributes, ReactNode } from 'react';
import { Avatar } from '@/components/Avatar';
import { ButtonIcon } from '@/components/Button';
import { Copy, PencilLine, RotateCw, ThumbsDown, ThumbsUp } from '@/icons';
import { CHAT_AI_AVATAR_ALT, CHAT_AI_AVATAR_SRC } from '../chatConstants';
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
  chatMessageMessageRowClassName,
  chatMessageRowClassName,
  chatMessageUserBodyClassName,
  chatMessageTimestampClassName,
} from './chatMessageStyles';

export type ChatMessageProps = {
  type?: ChatMessageType;
  children: ReactNode;
  attachment?: ReactNode;
  /** Override the default AI avatar. Ignored for user messages. */
  avatar?: ReactNode;
  timestamp?: string;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onCopy?: () => void;
  onRefresh?: () => void;
  onEdit?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'type'>;

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
      {type === 'ai' ? (
        <>
          {timestampNode}
          {actionGroup}
        </>
      ) : (
        <>
          {actionGroup}
          {timestampNode}
        </>
      )}
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
  className,
}: ChatMessageProps) {
  const actions = (
    <ChatMessageActions
      type={type}
      timestamp={timestamp}
      onThumbsUp={onThumbsUp}
      onThumbsDown={onThumbsDown}
      onCopy={onCopy}
      onRefresh={onRefresh}
      onEdit={onEdit}
    />
  );

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
              {children}
              {actions}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const avatarNode =
    avatar ?? (
      <Avatar size="sm" src={CHAT_AI_AVATAR_SRC} alt={CHAT_AI_AVATAR_ALT} />
    );

  return (
    <div className={chatMessageClassName({ type, className })}>
      <div className={chatMessageRowClassName(type)}>
        {avatarNode}
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
          {actions}
        </div>
      </div>
    </div>
  );
}
