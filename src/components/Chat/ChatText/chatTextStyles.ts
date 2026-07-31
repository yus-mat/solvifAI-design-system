import type { ChatTextVariant } from './chatTextTypes';

const variantClassNames: Record<ChatTextVariant, string> = {
  ai: 'max-w-[580px] rounded-bl-xl rounded-br-xl rounded-tr-xl p-0',
  'ai-thinking': 'max-w-[580px] px-0 pb-0 pt-1',
  user: [
    'max-h-[200px] max-w-[580px] overflow-hidden',
    'rounded-bl-xl rounded-tl-xl rounded-tr-xl',
    'border-[0.5px] border-border-neutral-muted bg-background-neutral-muted',
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
    'relative body-2 text-text-neutral-primary',
    variantClassNames[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const chatTextContentClassName = 'm-0 break-words';

export const chatTextThinkingContentClassName =
  'chat-text-shimmer m-0 caption-bold';
