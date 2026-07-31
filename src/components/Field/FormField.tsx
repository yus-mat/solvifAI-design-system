import {
  cloneElement,
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { INPUT_MAX_LENGTH_ERROR } from './constants';
import type { FieldControlProps } from './fieldControlTypes';
import { FieldMessage } from './FieldMessage';
import { Label } from './Label';

export type FormFieldProps = {
  label?: ReactNode;
  required?: boolean;
  hideLabel?: boolean;
  /** Helper text (muted). Hidden when an error is shown. */
  description?: ReactNode;
  /** Explicit validation error (takes precedence over max-length error). */
  error?: ReactNode;
  /** Shown when the nested control reaches `maxLength`. */
  maxLengthErrorMessage?: string;
  /** Associates the label with the control (`htmlFor` / `id`). */
  htmlFor?: string;
  /** id for the message element (`aria-describedby` on the control). */
  messageId?: string;
  children: ReactNode;
  className?: string;
};

function enhanceInputChild(
  child: ReactNode,
  {
    hasError,
    messageId,
    onMaxLengthReached,
  }: {
    hasError: boolean;
    messageId?: string;
    onMaxLengthReached: (reached: boolean) => void;
  },
): ReactNode {
  if (!isValidElement<FieldControlProps>(child)) return child;

  const controlChild = child as ReactElement<FieldControlProps>;

  return cloneElement(controlChild, {
    onMaxLengthReached,
    invalid: hasError || Boolean(controlChild.props.invalid),
    'aria-describedby': messageId ?? controlChild.props['aria-describedby'],
  });
}

export function FormField({
  label,
  required = false,
  hideLabel = false,
  description,
  error,
  maxLengthErrorMessage = INPUT_MAX_LENGTH_ERROR,
  htmlFor,
  messageId,
  children,
  className,
}: FormFieldProps) {
  const [maxLengthReached, setMaxLengthReached] = useState(false);

  const resolvedError =
    error ?? (maxLengthReached ? maxLengthErrorMessage : undefined);
  const hasError = Boolean(resolvedError);
  const message = hasError ? resolvedError : description;
  const showMessage = Boolean(message);

  const control = enhanceInputChild(children, {
    hasError,
    messageId,
    onMaxLengthReached: setMaxLengthReached,
  });

  const classes = ['flex w-full flex-col gap-2', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {!hideLabel && label ? (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      ) : null}

      <div className="flex w-full min-w-0 flex-col gap-0.5">
        {control}

        <FieldMessage
          id={messageId}
          intent={hasError ? 'error' : 'default'}
          visible={showMessage}
        >
          {message}
        </FieldMessage>
      </div>
    </div>
  );
}
