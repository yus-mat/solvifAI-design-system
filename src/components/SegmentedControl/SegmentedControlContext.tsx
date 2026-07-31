import { createContext, useContext } from 'react';

export type SegmentedControlContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

export const SegmentedControlContext =
  createContext<SegmentedControlContextValue | null>(null);

export function useSegmentedControlContext() {
  const context = useContext(SegmentedControlContext);
  if (!context) {
    throw new Error(
      'SegmentedControlItem must be used within SegmentedControl',
    );
  }
  return context;
}
