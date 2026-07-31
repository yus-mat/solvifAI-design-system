import type { HTMLAttributes, ReactNode } from 'react';
import { Avatar } from '@/components/Avatar';
import { ButtonIcon } from '@/components/Button';
import { PencilLine, ThumbsDown, ThumbsUp } from '@/icons';
import { CHAT_AI_AVATAR_ALT, CHAT_AI_AVATAR_SRC } from '../chatConstants';
import type { ChatMessageType } from './chatMessageTypes';
import {
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
  avatar?: ReactNode;
  userName?: string;
  timestamp?: string;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onEdit?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'type'>;

function ChatMessageActions({
  type,
  timestamp,
  onThumbsUp,
  onThumbsDown,
  onEdit,
}: {
  type: ChatMessageType;
  timestamp?: string;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onEdit?: () => void;
}) {
  const hasAiActions = type === 'ai' && (onThumbsUp || onThumbsDown);
  const hasUserActions = type === 'user' && onEdit;
  const hasTimestamp = Boolean(timestamp);

  if (!hasAiActions && !hasUserActions && !hasTimestamp) return null;

  return (
    <div
      className={[
        chatMessageActionsClassName,
        chatMessageActionsAlignmentClassName(type),
      ].join(' ')}
    >
      {type === 'ai' ? (
        <>
          {onThumbsUp ? (
            <ButtonIcon
              emphasis="ghost"
              intent="default"
              size="sm"
              icon={<ThumbsUp aria-hidden />}
              aria-label="良い回答"
              onClick={onThumbsUp}
            />
          ) : null}
          {onThumbsDown ? (
            <ButtonIcon
              emphasis="ghost"
              intent="default"
              size="sm"
              icon={<ThumbsDown aria-hidden />}
              aria-label="悪い回答"
              onClick={onThumbsDown}
            />
          ) : null}
        </>
      ) : null}
      {hasTimestamp ? (
        <span className={chatMessageTimestampClassName}>{timestamp}</span>
      ) : null}
      {type === 'user' && onEdit ? (
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size="sm"
          icon={<PencilLine aria-hidden />}
          aria-label="メッセージを編集"
          onClick={onEdit}
        />
      ) : null}
    </div>
  );
}

export function ChatMessage({
  type = 'ai',
  children,
  attachment,
  avatar,
  userName,
  timestamp,
  onThumbsUp,
  onThumbsDown,
  onEdit,
  className,
}: ChatMessageProps) {
  const defaultAvatar =
    type === 'user' ? (
      <Avatar
        size="sm"
        name={userName}
        colorIndex={userName ? 1 : undefined}
        active
      />
    ) : (
      <Avatar size="sm" src={CHAT_AI_AVATAR_SRC} alt={CHAT_AI_AVATAR_ALT} />
    );

  const avatarNode = avatar ?? defaultAvatar;

  const actions = (
    <ChatMessageActions
      type={type}
      timestamp={timestamp}
      onThumbsUp={onThumbsUp}
      onThumbsDown={onThumbsDown}
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
          {avatarNode}
        </div>
      </div>
    );
  }

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
