import { focusRingOffsetClassName } from '@/styles/focusRing';
import type { AttachmentFileType } from './attachmentTypes';

const interactiveOverlayClassName = [
  'before:pointer-events-none before:absolute before:inset-0 before:z-[1]',
  'before:rounded-[inherit] before:bg-transparent before:transition-colors before:duration-150',
  'hover:before:bg-background-interactive-hover',
  'active:before:bg-background-interactive-pressed',
  'focus-within:before:bg-background-interactive-hover',
].join(' ');

const attachmentImageFrameClassName =
  'relative size-full overflow-hidden rounded-[inherit]';

export function attachmentRootClassName({
  fileType = 'document',
  disabled = false,
  className,
}: {
  fileType?: AttachmentFileType;
  disabled?: boolean;
  className?: string;
} = {}) {
  return [
    'group relative isolate max-h-20 max-w-[120px]',
    'rounded-md border-[0.5px] border-border-neutral-muted shadow-sm',
    'transition-[box-shadow,opacity] duration-150',
    fileType === 'image'
      ? 'h-20 w-[120px] shrink-0 bg-background-neutral-primary'
      : [
          'flex h-20 w-[120px] shrink-0 flex-col justify-between',
          'bg-background-neutral-secondary p-2',
        ].join(' '),
    !disabled ? interactiveOverlayClassName : '',
    !disabled ? focusRingOffsetClassName : '',
    disabled ? 'pointer-events-none cursor-not-allowed opacity-[0.38]' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export { attachmentImageFrameClassName };

/** Name + extension stack — Figma: space-between in the 80px card. */
export const attachmentDocumentContentClassName =
  'relative z-[2] flex min-h-0 min-w-0 flex-1 flex-col justify-between overflow-hidden';

export const attachmentFileNameClassName =
  'm-0 min-w-0 line-clamp-2 overflow-hidden break-words caption text-text-neutral-primary';

export const attachmentExtensionClassName =
  'm-0 h-[18px] shrink-0 truncate caption text-text-neutral-primary';

export const attachmentImageClassName =
  'absolute inset-0 z-0 size-full rounded-[inherit] object-cover';

/** Figma: remove sits outside top-right; visible on hover / focus. */
export const attachmentRemoveButtonClassName = [
  'absolute -right-3.5 -top-[22px] z-[3]',
  'opacity-0 transition-opacity duration-150',
  'group-hover:opacity-100 group-focus-within:opacity-100',
  'focus-within:opacity-100',
].join(' ');
