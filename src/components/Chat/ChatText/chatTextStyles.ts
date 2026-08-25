import type { ChatTextVariant } from './chatTextTypes';

const variantClassNames: Record<ChatTextVariant, string> = {
  ai: 'max-w-[580px] p-0',
  'ai-thinking':
    'max-w-[580px] px-0 pb-0 pt-0 text-text-neutral-secondary',
  user: [
    'max-h-[200px] max-w-[580px] overflow-hidden',
    'rounded-xl',
    'bg-background-function-info-base',
    'px-4 py-3',
  ].join(' '),
  'user-editing': [
    'max-h-[200px] max-w-[580px] overflow-auto',
    'rounded-xl',
    'bg-background-neutral-primary',
    'border border-border-action-primary',
    'px-4 py-3 shadow-sm',
  ].join(' '),
};

export function chatTextClassName({
  variant = 'ai',
  className,
}: {
  variant?: ChatTextVariant;
  className?: string;
} = {}) {
  return [
    'relative body-1 text-text-neutral-primary',
    variantClassNames[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const chatTextContentClassName = 'm-0 break-words';

export const chatTextThinkingContentClassName =
  'chat-text-shimmer m-0 body-1 text-text-neutral-secondary';
