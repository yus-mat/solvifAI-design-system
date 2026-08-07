import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Chip } from '@/components/Chip';
import { IconWrapper } from '@/components/IconWrapper';
import { DropdownList } from '@/components/Overlay/DropdownList';
import { ListItemInteractive } from '@/components/Overlay/ListItemInteractive';
import { Search } from '@/icons';
import {
  defaultFilterOptions,
  type ComboboxOption,
} from './comboboxTypes';
import {
  comboboxInputClassName,
  comboboxWrapperClassName,
} from './inputStyles';

export type ComboboxInputProps = {
  options: ComboboxOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  /** Filter text in the search field. */
  inputValue?: string;
  onInputValueChange?: (value: string) => void;
  defaultInputValue?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiple?: boolean;
  invalid?: boolean;
  wrapperClassName?: string;
  placeholder?: string;
  filterOptions?: (
    options: ComboboxOption[],
    query: string,
  ) => ComboboxOption[];
  renderChip?: (
    option: ComboboxOption,
    onRemove: () => void,
  ) => ReactNode;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'size' | 'defaultValue'
>;

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(
    {
      options,
      value,
      onValueChange,
      inputValue: inputValueProp,
      onInputValueChange,
      defaultInputValue = '',
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      multiple = true,
      invalid = false,
      wrapperClassName,
      className,
      placeholder = '検索...',
      disabled,
      filterOptions = defaultFilterOptions,
      renderChip,
      id: idProp,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      onKeyDown,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const listboxId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const innerInputRef = useRef<HTMLInputElement>(null);

    const [uncontrolledInputValue, setUncontrolledInputValue] =
      useState(defaultInputValue);
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const isInputControlled = inputValueProp !== undefined;
    const inputValue = isInputControlled ? inputValueProp : uncontrolledInputValue;

    const isOpenControlled = openProp !== undefined;
    const open = isOpenControlled ? openProp : uncontrolledOpen;

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isOpenControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
        if (!next) setHighlightedIndex(-1);
      },
      [isOpenControlled, onOpenChange],
    );

    const setInputValue = useCallback(
      (next: string) => {
        if (!isInputControlled) setUncontrolledInputValue(next);
        onInputValueChange?.(next);
      },
      [isInputControlled, onInputValueChange],
    );

    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        innerInputRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const isInvalid =
      invalid || ariaInvalid === true || ariaInvalid === 'true';

    const selectedOptions = options.filter((option) =>
      value.includes(option.value),
    );
    const hasValues = multiple && selectedOptions.length > 0;

    const availableOptions = filterOptions(
      options.filter((option) => !value.includes(option.value)),
      inputValue,
    );

    useEffect(() => {
      if (!open) return;

      function handlePointerDown(event: MouseEvent) {
        if (!containerRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      }

      document.addEventListener('mousedown', handlePointerDown);
      return () => document.removeEventListener('mousedown', handlePointerDown);
    }, [open, setOpen]);

    useEffect(() => {
      if (highlightedIndex >= availableOptions.length) {
        setHighlightedIndex(availableOptions.length - 1);
      }
    }, [availableOptions.length, highlightedIndex]);

    function selectOption(option: ComboboxOption) {
      if (option.disabled) return;

      if (multiple) {
        if (!value.includes(option.value)) {
          onValueChange([...value, option.value]);
        }
      } else {
        onValueChange([option.value]);
      }

      setInputValue('');
      setOpen(false);
      innerInputRef.current?.focus();
    }

    function removeValue(optionValue: string) {
      onValueChange(value.filter((current) => current !== optionValue));
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!open) {
            setOpen(true);
            setHighlightedIndex(0);
            return;
          }
          setHighlightedIndex((index) =>
            index < availableOptions.length - 1 ? index + 1 : 0,
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!open) {
            setOpen(true);
            setHighlightedIndex(availableOptions.length - 1);
            return;
          }
          setHighlightedIndex((index) =>
            index > 0 ? index - 1 : availableOptions.length - 1,
          );
          break;
        case 'Enter':
          if (open && highlightedIndex >= 0) {
            event.preventDefault();
            const option = availableOptions[highlightedIndex];
            if (option) selectOption(option);
          }
          break;
        case 'Escape':
          if (open) {
            event.preventDefault();
            setOpen(false);
          }
          break;
        case 'Backspace':
          if (
            multiple &&
            inputValue === '' &&
            value.length > 0 &&
            highlightedIndex < 0
          ) {
            event.preventDefault();
            onValueChange(value.slice(0, -1));
          }
          break;
        default:
          break;
      }
    }

    const showList = open && !disabled && availableOptions.length > 0;

    return (
      <div ref={containerRef} className="relative w-full min-w-0">
        <div
          className={comboboxWrapperClassName({
            invalid: isInvalid,
            disabled,
            hasValues,
            className: wrapperClassName,
          })}
        >
          {hasValues
            ? selectedOptions.map((option) =>
                renderChip ? (
                  renderChip(option, () => removeValue(option.value))
                ) : (
                  <Chip
                    key={option.value}
                    onRemove={() => removeValue(option.value)}
                  >
                    {option.label}
                  </Chip>
                ),
              )
            : null}

          <input
            ref={setRef}
            id={inputId}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={showList ? listboxId : undefined}
            aria-activedescendant={
              showList && highlightedIndex >= 0
                ? `${listboxId}-option-${highlightedIndex}`
                : undefined
            }
            aria-invalid={isInvalid || undefined}
            aria-describedby={ariaDescribedBy}
            className={[comboboxInputClassName, className]
              .filter(Boolean)
              .join(' ')}
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(event) => {
              setInputValue(event.target.value);
              if (!open) setOpen(true);
              setHighlightedIndex(0);
            }}
            onFocus={(event) => {
              onFocus?.(event);
              if (!event.defaultPrevented && !disabled) setOpen(true);
            }}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            {...rest}
          />

          {!disabled ? (
            <IconWrapper
              size="s"
              className="ml-auto shrink-0 text-text-neutral-muted"
            >
              <Search aria-hidden />
            </IconWrapper>
          ) : null}
        </div>

        {showList ? (
          <div className="absolute top-full left-0 z-10 mt-0.5 w-full min-w-0">
            <DropdownList id={listboxId}>
              {availableOptions.map((option, index) => (
                <ListItemInteractive
                  key={option.value}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={false}
                  leadingSlot={option.leadingSlot}
                  hasBorder={index < availableOptions.length - 1}
                  selected={index === highlightedIndex}
                  disabled={option.disabled}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </ListItemInteractive>
              ))}
            </DropdownList>
          </div>
        ) : null}
      </div>
    );
  },
);

ComboboxInput.displayName = 'ComboboxInput';

export type { ComboboxOption } from './comboboxTypes';
