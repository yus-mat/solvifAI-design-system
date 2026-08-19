import type { HTMLAttributes, ReactNode } from 'react';
import { ButtonIcon } from '@/components/Button';
import { ChevronDown, ChevronUp, Maximize2, X } from '@/icons';
import {
  answerPanelActionsClassName,
  answerPanelBodyClassName,
  answerPanelCaptionClassName,
  answerPanelClassName,
  answerPanelFooterActionsClassName,
  answerPanelFooterClassName,
  answerPanelHeaderClassName,
  answerPanelStepControlClassName,
  answerPanelStepLabelClassName,
  answerPanelSubtitleClassName,
  answerPanelTitleClassName,
  answerPanelTitleGroupClassName,
} from './answerPanelStyles';

export type AnswerPanelPage = {
  current: number;
  total: number;
  onPrevious?: () => void;
  onNext?: () => void;
};

export type AnswerPanelProps = {
  title: ReactNode;
  caption?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  onExpand?: () => void;
  expandLabel?: string;
  page?: AnswerPanelPage;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export function AnswerPanel({
  title,
  caption,
  subtitle,
  children,
  footer,
  onClose,
  closeLabel = '閉じる',
  onExpand,
  expandLabel = '拡大する',
  page,
  className,
  ...rest
}: AnswerPanelProps) {
  const showActions = Boolean(page || onExpand || onClose);
  const canGoPrevious = page != null && page.current > 1;
  const canGoNext = page != null && page.current < page.total;

  return (
    <div
      className={answerPanelClassName({ className })}
      {...rest}
    >
      <header className={answerPanelHeaderClassName}>
        <div className={answerPanelTitleGroupClassName}>
          {caption ? (
            <p className={answerPanelCaptionClassName}>{caption}</p>
          ) : null}
          <h2 className={answerPanelTitleClassName}>{title}</h2>
          {subtitle ? (
            <p className={answerPanelSubtitleClassName}>{subtitle}</p>
          ) : null}
        </div>

        {showActions ? (
          <div className={answerPanelActionsClassName}>
            {page ? (
              <div className={answerPanelStepControlClassName}>
                <ButtonIcon
                  emphasis="ghost"
                  intent="default"
                  size="sm"
                  icon={<ChevronDown aria-hidden />}
                  aria-label="次のステップ"
                  disabled={!canGoNext}
                  onClick={page.onNext}
                />
                <p className={answerPanelStepLabelClassName}>
                  {page.current}/{page.total}
                </p>
                <ButtonIcon
                  emphasis="ghost"
                  intent="default"
                  size="sm"
                  icon={<ChevronUp aria-hidden />}
                  aria-label="前のステップ"
                  disabled={!canGoPrevious}
                  onClick={page.onPrevious}
                />
              </div>
            ) : null}

            {onExpand ? (
              <ButtonIcon
                emphasis="ghost"
                intent="default"
                size="sm"
                icon={<Maximize2 aria-hidden />}
                aria-label={expandLabel}
                onClick={onExpand}
              />
            ) : null}

            {onClose ? (
              <ButtonIcon
                emphasis="ghost"
                intent="default"
                size="sm"
                icon={<X aria-hidden />}
                aria-label={closeLabel}
                tooltipPosition="bottom-right"
                tooltipShowOnFocus={false}
                onClick={onClose}
              />
            ) : null}
          </div>
        ) : null}
      </header>

      {children != null ? (
        <div className={answerPanelBodyClassName}>{children}</div>
      ) : null}

      {footer ? (
        <footer className={answerPanelFooterClassName}>
          <div className={answerPanelFooterActionsClassName}>{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}
