import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { Fade } from '@/components/Overlay/Fade';
import type { ChatTextVariant } from './chatTextTypes';
import {
  chatTextClassName,
  chatTextContentClassName,
  chatTextThinkingContentClassName,
} from './chatTextStyles';

export type ChatTextProps = {
  variant?: ChatTextVariant;
  children: ReactNode;
  truncated?: boolean;
  onExpand?: () => void;
} & HTMLAttributes<HTMLDivElement>;

export function ChatText({
  variant = 'ai',
  children,
  truncated = false,
  onExpand,
  className,
  ...rest
}: ChatTextProps) {
  const [expanded, setExpanded] = useState(false);
  const showFade = variant === 'user' && truncated && !expanded;
  const isThinking = variant === 'ai-thinking';

  const handleExpand = () => {
    setExpanded(true);
    onExpand?.();
  };

  return (
    <div className={chatTextClassName({ variant, className })} {...rest}>
      <p
        className={
          isThinking ? chatTextThinkingContentClassName : chatTextContentClassName
        }
      >
        {children}
      </p>
      {showFade ? (
        <Fade type="secondary" buttonLabel="全て表示" onButtonClick={handleExpand} />
      ) : null}
    </div>
  );
}
