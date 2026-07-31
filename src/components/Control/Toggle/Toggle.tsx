import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
} from 'react';
import { toggleTrackClassName } from './toggleStyles';

export type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>;

const toggleThumbClassName =
  'pointer-events-none block size-3.5 rounded-full bg-background-neutral-primary transition-transform duration-150';

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    checked: checkedProp,
    defaultChecked = false,
    onCheckedChange,
    className,
    disabled,
    onClick,
    ...rest
  },
  ref,
) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : uncontrolledChecked;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;

    const nextChecked = !checked;
    if (!isControlled) setUncontrolledChecked(nextChecked);
    onCheckedChange?.(nextChecked);
  }

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={toggleTrackClassName({ checked, className })}
      onClick={handleClick}
      {...rest}
    >
      <span
        className={[toggleThumbClassName, checked ? 'translate-x-5' : 'translate-x-0'].join(
          ' ',
        )}
        aria-hidden
      />
    </button>
  );
});

Toggle.displayName = 'Toggle';
