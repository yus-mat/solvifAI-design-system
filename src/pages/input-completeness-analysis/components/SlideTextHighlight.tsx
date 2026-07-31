import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/Button';
import { TextAreaComposer } from '@/components/Chat';
import { DropdownList } from '@/components/Overlay/DropdownList';
import { ListItem } from '@/components/Overlay/ListItem';
import { Popover } from '@/components/Overlay/Popover';
import { Tag, type TagStatus } from '@/components/Tag';
import {
  ChevronRight,
  EllipsisVertical,
  FileText,
  MessageCircleMore,
} from '@/icons';
import type {
  SlideAnnotationSourceKind,
  SlideTextAnnotation,
} from '../mockData';

type OverlayMode = 'closed' | 'menu' | 'chat' | 'source';

const MENU_WIDTH = 150;
const CHAT_WIDTH = 214;
const SOURCE_WIDTH = 240;
const OVERLAY_GAP = 6;

const SOURCE_TAG_STATUS: Record<SlideAnnotationSourceKind, TagStatus> = {
  analysisAnswer: 'info',
  inputFile: 'default',
  aiInference: 'accent',
};

export type SlideTextHighlightProps = {
  annotation: SlideTextAnnotation;
  children: string;
  disabled?: boolean;
  onSendAiChat: (annotation: SlideTextAnnotation, message: string) => void;
  onOpenAnalysisSource: (annotation: SlideTextAnnotation) => void;
};

function overlayWidth(mode: OverlayMode) {
  if (mode === 'menu') return MENU_WIDTH;
  if (mode === 'chat') return CHAT_WIDTH;
  if (mode === 'source') return SOURCE_WIDTH;
  return 0;
}

export function SlideTextHighlight({
  annotation,
  children,
  disabled = false,
  onSendAiChat,
  onOpenAnalysisSource,
}: SlideTextHighlightProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [textHovered, setTextHovered] = useState(false);
  const [triggerHovered, setTriggerHovered] = useState(false);
  const [overlay, setOverlay] = useState<OverlayMode>('closed');
  const [composerValue, setComposerValue] = useState('');
  const [overlayPos, setOverlayPos] = useState<{ top: number; left: number } | null>(
    null,
  );

  const showTrigger =
    !disabled && (textHovered || triggerHovered || overlay !== 'closed');
  const expanded =
    !disabled && (triggerHovered || overlay !== 'closed');
  const outlined = showTrigger;

  useLayoutEffect(() => {
    if (overlay === 'closed') {
      setOverlayPos(null);
      return;
    }

    const update = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const width = overlayWidth(overlay);
      let left = rect.right + OVERLAY_GAP;
      if (left + width > window.innerWidth - 8) {
        left = Math.max(8, rect.left - OVERLAY_GAP - width);
      }
      setOverlayPos({ top: rect.top, left });
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [overlay]);

  useEffect(() => {
    if (overlay === 'closed') return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        rootRef.current?.contains(target) ||
        overlayRef.current?.contains(target)
      ) {
        return;
      }
      setOverlay('closed');
      setComposerValue('');
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOverlay('closed');
        setComposerValue('');
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [overlay]);

  const handleSend = () => {
    const trimmed = composerValue.trim();
    if (!trimmed) return;
    onSendAiChat(annotation, trimmed);
    setComposerValue('');
    setOverlay('closed');
  };

  const overlayNode =
    overlay !== 'closed' && overlayPos
      ? createPortal(
          <div
            ref={overlayRef}
            className="fixed z-[100]"
            style={{ top: overlayPos.top, left: overlayPos.left }}
          >
            {overlay === 'menu' ? (
              <div id={menuId} className="w-[150px]" role="presentation">
                <DropdownList role="menu">
                  <ListItem
                    leadingSlot={<MessageCircleMore aria-hidden />}
                    onClick={() => setOverlay('chat')}
                  >
                    AIチャットに相談
                  </ListItem>
                  <ListItem
                    leadingSlot={<FileText aria-hidden />}
                    onClick={() => setOverlay('source')}
                  >
                    インプット由来
                  </ListItem>
                </DropdownList>
              </div>
            ) : null}

            {overlay === 'chat' ? (
              <div className="w-[214px]">
                <Popover open className="w-full overflow-hidden p-0 shadow-md">
                  <TextAreaComposer
                    border={false}
                    rounded={false}
                    actionSize="sm"
                    value={composerValue}
                    onChange={setComposerValue}
                    onSend={handleSend}
                    sendDisabled={!composerValue.trim()}
                    placeholder="メッセージを入力..."
                  />
                </Popover>
              </div>
            ) : null}

            {overlay === 'source' ? (
              <div className="w-[240px]">
                <Popover open className="w-full shadow-md">
                  <div className="flex flex-col items-start gap-2 p-2">
                    <Tag
                      status={SOURCE_TAG_STATUS[annotation.source.kind]}
                      type="filled"
                      size="sm"
                      className="w-auto max-w-full shrink-0"
                    >
                      {annotation.source.tagLabel}
                    </Tag>
                    <p className="m-0 caption text-text-neutral-primary">
                      {annotation.source.excerpt}
                    </p>
                    <p className="m-0 caption text-text-neutral-secondary">
                      {annotation.source.citation}
                    </p>
                    {annotation.source.kind === 'analysisAnswer' ? (
                      <Button
                        emphasis="secondary"
                        intent="default"
                        size="sm"
                        trailingIcon={<ChevronRight aria-hidden />}
                        onClick={() => {
                          onOpenAnalysisSource(annotation);
                          setOverlay('closed');
                        }}
                      >
                        回答を見る
                      </Button>
                    ) : null}
                  </div>
                </Popover>
              </div>
            ) : null}
          </div>,
          document.body,
        )
      : null;

  return (
    <span
      ref={rootRef}
      className="relative inline-block max-w-full"
      onMouseEnter={() => setTextHovered(true)}
      onMouseLeave={() => setTextHovered(false)}
    >
      <span
        className={[
          'block rounded-sm transition-[box-shadow,background-color] duration-150',
          outlined
            ? 'bg-white/[0.06] shadow-[inset_0_0_0_1px_var(--border-function-info)]'
            : null,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </span>

      {showTrigger ? (
        <span
          className="absolute right-0 top-0 z-20 flex size-6 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
          onMouseEnter={() => setTriggerHovered(true)}
          onMouseLeave={() => setTriggerHovered(false)}
        >
          <button
            ref={triggerRef}
            type="button"
            aria-label="テキストのアクション"
            aria-expanded={overlay !== 'closed'}
            aria-haspopup="menu"
            aria-controls={overlay === 'menu' ? menuId : undefined}
            className={[
              'flex cursor-pointer items-center justify-center bg-background-function-info-strong text-text-neutral-inverse transition-[width,height,border-radius,transform] duration-150',
              expanded
                ? 'size-3.5 rounded-[3px]'
                : 'size-2 rounded-[2px]',
            ].join(' ')}
            onClick={(event) => {
              event.stopPropagation();
              setOverlay((prev) => (prev === 'closed' ? 'menu' : 'closed'));
              setComposerValue('');
            }}
          >
            {expanded ? (
              <EllipsisVertical className="size-2.5" aria-hidden />
            ) : null}
          </button>
        </span>
      ) : null}

      {overlayNode}
    </span>
  );
}

export function renderAnnotatedCardBody({
  body,
  annotation,
  disabled,
  onSendAiChat,
  onOpenAnalysisSource,
}: {
  body: string;
  annotation?: SlideTextAnnotation;
  disabled?: boolean;
  onSendAiChat: (annotation: SlideTextAnnotation, message: string) => void;
  onOpenAnalysisSource: (annotation: SlideTextAnnotation) => void;
}): ReactNode {
  if (!annotation) return body;

  const index = body.indexOf(annotation.highlightText);
  if (index < 0) return body;

  const before = body.slice(0, index);
  const match = body.slice(index, index + annotation.highlightText.length);
  const after = body.slice(index + annotation.highlightText.length);

  return (
    <>
      {before}
      <SlideTextHighlight
        annotation={annotation}
        disabled={disabled}
        onSendAiChat={onSendAiChat}
        onOpenAnalysisSource={onOpenAnalysisSource}
      >
        {match}
      </SlideTextHighlight>
      {after}
    </>
  );
}
