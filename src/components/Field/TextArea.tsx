import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import type { TextareaHTMLAttributes } from 'react';
import {
  textAreaClassName,
  textAreaWrapperClassName,
} from './inputStyles';

export type TextAreaProps = {
  invalid?: boolean;
  wrapperClassName?: string;
  /** When set, reports to FormField via `onMaxLengthReached`. */
  maxLength?: number;
  onMaxLengthReached?: (reached: boolean) => void;
  resize?: 'none' | 'vertical' | 'both';
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      invalid = false,
      wrapperClassName,
      className,
      placeholder = 'メッセージを入力...',
      disabled,
      maxLength,
      onMaxLengthReached,
      onInput,
      onChange,
      value,
      defaultValue,
      rows = 4,
      resize = 'vertical',
      'aria-invalid': ariaInvalid,
      ...rest
    },
    ref,
  ) {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const syncMaxLength = useCallback(
      (length: number) => {
        if (maxLength == null) return;
        onMaxLengthReached?.(length >= maxLength);
      },
      [onMaxLengthReached, maxLength],
    );

    const setRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useLayoutEffect(() => {
      if (maxLength == null) return;
      const el = innerRef.current;
      if (el) syncMaxLength(el.value.length);
    }, [syncMaxLength, value, defaultValue, maxLength]);

    useEffect(() => {
      if (typeof value === 'string' && maxLength != null) {
        syncMaxLength(value.length);
      }
    }, [value, syncMaxLength, maxLength]);

    const isInvalid =
      invalid || ariaInvalid === true || ariaInvalid === 'true';

    const resizeClass =
      resize === 'none'
        ? 'resize-none'
        : resize === 'both'
          ? 'resize'
          : 'resize-y';

    return (
      <div
        className={textAreaWrapperClassName({
          invalid: isInvalid,
          disabled,
          className: wrapperClassName,
        })}
      >
        <textarea
          ref={setRef}
          className={[textAreaClassName, resizeClass, className]
            .filter(Boolean)
            .join(' ')}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          rows={rows}
          aria-invalid={isInvalid || undefined}
          onInput={(event) => {
            syncMaxLength(event.currentTarget.value.length);
            onInput?.(event);
          }}
          onChange={(event) => {
            syncMaxLength(event.currentTarget.value.length);
            onChange?.(event);
          }}
          {...rest}
        />
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
