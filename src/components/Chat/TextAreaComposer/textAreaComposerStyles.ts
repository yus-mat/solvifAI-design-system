import type { TextAreaComposerType } from './textAreaComposerTypes';

const typeClassNames: Record<TextAreaComposerType, string> = {
  default: 'bg-background-neutral-primary',
  elevated: 'bg-background-neutral-primary shadow-md',
};

export function textAreaComposerClassName({
  type = 'default',
  disabled = false,
  border = true,
  rounded = true,
  className,
}: {
  type?: TextAreaComposerType;
  disabled?: boolean;
  border?: boolean;
  rounded?: boolean;
  className?: string;
} = {}) {
  return [
    'relative isolate flex max-h-[600px] w-full flex-col overflow-hidden transition-colors',
    rounded ? 'rounded-2xl' : 'rounded-none',
    border
      ? 'border-[0.5px] border-solid border-border-neutral-muted'
      : 'border-0',
    typeClassNames[type],
    disabled ? 'opacity-[0.38]' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const textAreaComposerAttachmentSlotClassName = 'p-3';

export const textAreaComposerInputClassName =
  'min-h-10 w-full resize-none border-0 bg-transparent px-3 pt-3 body-1 text-text-neutral-primary outline-none placeholder:text-text-neutral-muted disabled:cursor-not-allowed';

export const textAreaComposerActionBarClassName =
  'flex items-center justify-between px-3 py-2';

export const textAreaComposerTrailingActionsClassName =
  'flex items-center gap-1';
