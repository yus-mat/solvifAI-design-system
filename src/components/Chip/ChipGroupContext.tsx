import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';

export type ChipGroupMode = 'composite' | 'inline';

export type ChipRegistration = {
  onRemove?: () => void;
  disabled?: boolean;
};

export type ChipGroupContextValue = {
  mode: ChipGroupMode;
  /** Bumped when chips register/unregister — keeps chip indices in sync. */
  registryVersion: number;
  /** Roving focus index within the group, or -1 when none. */
  focusedChipIndex: number;
  registerChip: (id: string, registration: ChipRegistration) => void;
  unregisterChip: (id: string) => void;
  getChipIndex: (id: string) => number;
  focusChip: (id: string) => void;
};

const ChipGroupContext = createContext<ChipGroupContextValue | null>(null);

export function ChipGroupProvider({
  value,
  children,
}: {
  value: ChipGroupContextValue;
  children: ReactNode;
}) {
  return (
    <ChipGroupContext.Provider value={value}>{children}</ChipGroupContext.Provider>
  );
}

export function useChipGroupContext() {
  return useContext(ChipGroupContext);
}
