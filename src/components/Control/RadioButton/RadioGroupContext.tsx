import { createContext, useContext } from 'react';

export type RadioGroupContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  name: string;
};

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null,
);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}
