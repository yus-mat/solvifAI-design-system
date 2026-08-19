import { forwardRef, type InputHTMLAttributes } from 'react';
import {
  radioButtonControlClassName,
  radioButtonInputClassName,
  radioButtonRootClassName,
} from './radioButtonStyles';

export type RadioButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  function RadioButton({ className, ...rest }, ref) {
    return (
      <span
        className={[radioButtonRootClassName, className].filter(Boolean).join(' ')}
      >
        <input
          ref={ref}
          type="radio"
          className={radioButtonInputClassName}
          {...rest}
        />
        <span className={radioButtonControlClassName} aria-hidden="true" />
      </span>
    );
  },
);

RadioButton.displayName = 'RadioButton';
