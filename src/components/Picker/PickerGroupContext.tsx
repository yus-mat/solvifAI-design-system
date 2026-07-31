import { createContext, useContext } from 'react';

export type PickerGroupContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  name: string;
};

export const PickerGroupContext = createContext<PickerGroupContextValue | null>(
  null,
);

export function usePickerGroupContext() {
  const context = useContext(PickerGroupContext);
  if (!context) {
    throw new Error('Picker must be used within PickerGroup');
  }
  return context;
}
