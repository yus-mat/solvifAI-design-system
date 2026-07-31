import {
  forwardRef,
  useEffect,
  useRef,
  type InputHTMLAttributes,
} from 'react';
import { Check, Minus } from '@/icons';
import {
  checkboxCheckIconClassName,
  checkboxControlClassName,
  checkboxInputClassName,
  checkboxMinusIconClassName,
  checkboxRootClassName,
} from './checkboxStyles';

export type CheckboxProps = {
  indeterminate?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { className, disabled, indeterminate = false, ...rest },
    ref,
  ) {
    const localRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (localRef.current) {
        localRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <span
        className={[checkboxRootClassName, className].filter(Boolean).join(' ')}
      >
        <input
          ref={(node) => {
            localRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="checkbox"
          disabled={disabled}
          className={checkboxInputClassName}
          {...rest}
        />
        <span className={checkboxControlClassName} aria-hidden="true">
          <Check className={checkboxCheckIconClassName} aria-hidden />
          <Minus className={checkboxMinusIconClassName} aria-hidden />
        </span>
      </span>
    );
  },
);

Checkbox.displayName = 'Checkbox';
