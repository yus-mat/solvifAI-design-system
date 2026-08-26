import type { HTMLAttributes, ReactNode } from 'react';
import { ButtonIcon } from '@/components/Button';
import { ChevronLeft, ChevronRight, Maximize2, X } from '@/icons';
import {
  answerPanelActionsClassName,
  answerPanelBodyClassName,
  answerPanelCaptionClassName,
  answerPanelClassName,
  answerPanelFooterActionsClassName,
  answerPanelFooterClassName,
  answerPanelFooterRowClassName,
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
  const showHeaderActions = Boolean(onExpand || onClose);
  const showFooter = Boolean(footer || page);
  const canGoPrevious = page != null && page.current > 1;
  const canGoNext = page != null && page.current < page.total;

  const pagination = page ? (
    <div className={answerPanelStepControlClassName}>
      <ButtonIcon
        emphasis="ghost"
        intent="default"
        size="sm"
        icon={<ChevronLeft aria-hidden />}
        aria-label="前のステップ"
        tooltipPosition="top-left"
        disabled={!canGoPrevious}
        onClick={page.onPrevious}
      />
      <p className={answerPanelStepLabelClassName}>
        {page.current}/{page.total}
      </p>
      <ButtonIcon
        emphasis="ghost"
        intent="default"
        size="sm"
        icon={<ChevronRight aria-hidden />}
        aria-label="次のステップ"
        tooltipPosition="top-left"
        disabled={!canGoNext}
        onClick={page.onNext}
      />
    </div>
  ) : null;

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

        {showHeaderActions ? (
          <div className={answerPanelActionsClassName}>
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

      {showFooter ? (
        <footer className={answerPanelFooterClassName}>
          <div className={answerPanelFooterRowClassName}>
            {pagination}
            {footer ? (
              <div className={answerPanelFooterActionsClassName}>{footer}</div>
            ) : null}
          </div>
        </footer>
      ) : null}
    </div>
  );
}
