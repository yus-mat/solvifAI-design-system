import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { chipGroupClassName } from './chipStyles';
import {
  ChipGroupProvider,
  type ChipRegistration,
} from './ChipGroupContext';

const COMPOSITE_NAVIGATION_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'Delete',
  'Backspace',
]);

export type ChipGroupProps = {
  inline?: boolean;
  /** Accessible name for the composite group (standalone mode). */
  label?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  function ChipGroup(
    {
      inline = false,
      label = '選択済みの項目',
      children,
      className,
      onKeyDown,
      onKeyDownCapture,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) {
    const rootRef = useRef<HTMLDivElement>(null);
    const registryRef = useRef(new Map<string, ChipRegistration>());
    const [registryVersion, setRegistryVersion] = useState(0);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const setRootRef = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const getChipIdList = useCallback(
      () => Array.from(registryRef.current.keys()),
      [],
    );

    const chipIds = useMemo(
      () => getChipIdList(),
      [getChipIdList, registryVersion],
    );

    const registerChip = useCallback(
      (id: string, registration: ChipRegistration) => {
        const previous = registryRef.current.get(id);
        if (
          previous &&
          previous.onRemove === registration.onRemove &&
          previous.disabled === registration.disabled
        ) {
          return;
        }
        registryRef.current.set(id, registration);
        setRegistryVersion((version) => version + 1);
      },
      [],
    );

    const unregisterChip = useCallback((id: string) => {
      if (!registryRef.current.delete(id)) return;
      setRegistryVersion((version) => version + 1);
    }, []);

    const getChipIndex = useCallback(
      (id: string) => Array.from(registryRef.current.keys()).indexOf(id),
      [],
    );

    const focusChip = useCallback((id: string) => {
      const index = getChipIndex(id);
      if (index < 0) return;
      setFocusedIndex(index);
      rootRef.current?.focus();
    }, [getChipIndex]);

    const focusedChipId =
      focusedIndex >= 0 ? (chipIds[focusedIndex] ?? null) : null;

    useEffect(() => {
      const count = getChipIdList().length;
      if (count === 0) {
        setFocusedIndex(-1);
        return;
      }

      if (focusedIndex >= count) {
        setFocusedIndex(count - 1);
      }
    }, [chipIds, focusedIndex, getChipIdList]);

    function removeFocusedChip() {
      if (focusedIndex < 0) return;
      const id = getChipIdList()[focusedIndex];
      const registration = id ? registryRef.current.get(id) : undefined;
      if (!registration || registration.disabled) return;
      registration.onRemove?.();
    }

    function handleKeyDownCapture(event: KeyboardEvent<HTMLDivElement>) {
      onKeyDownCapture?.(event);
      if (event.defaultPrevented || inline) return;
      if (!COMPOSITE_NAVIGATION_KEYS.has(event.key)) return;
      event.stopPropagation();
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      onKeyDown?.(event);
      if (event.defaultPrevented || inline) return;

      const count = getChipIdList().length;
      if (count === 0) return;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((index) =>
            index < 0 ? 0 : Math.min(index + 1, count - 1),
          );
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((index) =>
            index < 0 ? count - 1 : Math.max(index - 1, 0),
          );
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(count - 1);
          break;
        case 'Delete':
        case 'Backspace':
          event.preventDefault();
          removeFocusedChip();
          break;
        default:
          break;
      }
    }

    const contextValue = useMemo(
      () => ({
        mode: inline ? ('inline' as const) : ('composite' as const),
        registryVersion,
        focusedChipIndex: inline ? -1 : focusedIndex,
        registerChip,
        unregisterChip,
        getChipIndex,
        focusChip,
      }),
      [
        inline,
        registryVersion,
        focusedIndex,
        registerChip,
        unregisterChip,
        getChipIndex,
        focusChip,
      ],
    );

    const isComposite = !inline;

    return (
      <ChipGroupProvider value={contextValue}>
        <div
          ref={setRootRef}
          role={isComposite ? 'group' : 'list'}
          aria-label={isComposite ? label : undefined}
          aria-activedescendant={
            isComposite && focusedChipId ? focusedChipId : undefined
          }
          tabIndex={isComposite ? 0 : undefined}
          className={chipGroupClassName({
            inline,
            hasActiveChip: isComposite && focusedIndex >= 0,
            className,
          })}
          {...rest}
          onKeyDownCapture={handleKeyDownCapture}
          onKeyDown={handleKeyDown}
          onFocus={(event) => {
            onFocus?.(event);
            if (event.defaultPrevented || inline) return;
            if (getChipIdList().length === 0) return;
            setFocusedIndex((index) => (index < 0 ? 0 : index));
          }}
          onBlur={(event) => {
            onBlur?.(event);
            if (inline) return;
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setFocusedIndex(-1);
            }
          }}
        >
          {children}
        </div>
      </ChipGroupProvider>
    );
  },
);

ChipGroup.displayName = 'ChipGroup';
