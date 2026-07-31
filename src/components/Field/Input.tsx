import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import type { InputHTMLAttributes } from 'react';
import { INPUT_MAX_LENGTH } from './constants';
import { inputClassName, inputWrapperClassName } from './inputStyles';

export type InputProps = {
  invalid?: boolean;
  wrapperClassName?: string;
  /** Character limit (HTML `maxlength`). Defaults to 255 (VARCHAR standard). */
  maxLength?: number;
  /** Called by FormField when value length reaches `maxLength`. */
  onMaxLengthReached?: (reached: boolean) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    invalid = false,
    wrapperClassName,
    className,
    placeholder = '例）カスタマーレポートv2',
    disabled,
    maxLength = INPUT_MAX_LENGTH,
    onMaxLengthReached,
    onInput,
    onChange,
    value,
    defaultValue,
    'aria-invalid': ariaInvalid,
    ...rest
  },
  ref,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);

  const syncMaxLength = useCallback(
    (length: number) => {
      onMaxLengthReached?.(length >= maxLength);
    },
    [onMaxLengthReached, maxLength],
  );

  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (el) syncMaxLength(el.value.length);
  }, [syncMaxLength, value, defaultValue]);

  useEffect(() => {
    if (typeof value === 'string') {
      syncMaxLength(value.length);
    }
  }, [value, syncMaxLength]);

  const isInvalid =
    invalid || ariaInvalid === true || ariaInvalid === 'true';

  return (
    <div
      className={inputWrapperClassName({
        invalid: isInvalid,
        disabled,
        className: wrapperClassName,
      })}
    >
      <input
        ref={setRef}
        className={[inputClassName, className].filter(Boolean).join(' ')}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
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
});

Input.displayName = 'Input';
