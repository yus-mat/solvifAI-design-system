import type { ChatMessageType } from './chatMessageTypes';

export function chatMessageClassName({
  type = 'ai',
  editing = false,
  className,
}: {
  type?: ChatMessageType;
  editing?: boolean;
  className?: string;
} = {}) {
  return [
    'group relative flex w-full flex-col gap-0',
    editing ? 'mb-10' : 'mb-8',
    type === 'user' ? 'items-end' : 'items-start',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function chatMessageRowClassName(type: ChatMessageType = 'ai') {
  return [
    'flex w-full gap-4',
    type === 'user' ? 'items-end justify-end' : 'items-start justify-start',
  ].join(' ');
}

export const chatMessageContentColumnClassName =
  'relative flex min-w-0 flex-1 flex-col gap-1';

export const chatMessageContentClassName =
  'flex min-w-0 flex-col gap-1';

export const chatMessageMessageRowClassName =
  'flex items-end justify-end gap-4';

export const chatMessageUserBodyClassName =
  'flex min-w-0 flex-col gap-1';

export function chatMessageContentAlignmentClassName(type: ChatMessageType = 'ai') {
  return type === 'user' ? 'items-end' : 'items-start';
}

export const chatMessageAttachmentRowClassName =
  'flex items-end';

export const chatMessageActionsClassName = [
  'absolute top-full mt-1 flex items-center gap-2',
  'opacity-0 transition-opacity duration-150',
  'group-hover:opacity-100 group-focus-within:opacity-100',
].join(' ');

export const chatMessageActionGroupClassName =
  'flex items-center gap-0.5';

export const chatMessageEditingActionsClassName =
  'absolute top-full mt-1 flex items-center justify-end gap-0.5';

export function chatMessageActionsAlignmentClassName(type: ChatMessageType = 'ai') {
  return type === 'user' ? 'right-0' : 'left-0';
}

export const chatMessageTimestampClassName =
  'whitespace-nowrap caption text-text-neutral-muted';
