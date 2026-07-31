import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '@/components/Button';
import type { FadeType } from './fadeTypes';
import { fadeButtonWrapperClassName, fadeClassName } from './fadeStyles';

export type FadeProps = {
  type?: FadeType;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Fade({
  type = 'primary',
  showButton = true,
  buttonLabel = '全て表示',
  onButtonClick,
  children,
  className,
  ...rest
}: FadeProps) {
  return (
    <div className={fadeClassName({ type, className })} {...rest}>
      {children ??
        (showButton ? (
          <div className={fadeButtonWrapperClassName}>
            <Button
              size="sm"
              emphasis="ghost"
              intent="default"
              onClick={onButtonClick}
            >
              {buttonLabel}
            </Button>
          </div>
        ) : null)}
    </div>
  );
}
