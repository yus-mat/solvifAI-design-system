import type { ReactNode } from 'react';

export type ComboboxOption = {
  value: string;
  label: ReactNode;
  leadingSlot?: ReactNode;
  disabled?: boolean;
};

export function defaultFilterOptions(
  options: ComboboxOption[],
  query: string,
): ComboboxOption[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return options;

  return options.filter((option) => {
    const labelText =
      typeof option.label === 'string' ? option.label : option.value;
    return (
      labelText.toLowerCase().includes(normalizedQuery) ||
      option.value.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function getOptionLabelText(option: ComboboxOption) {
  return typeof option.label === 'string' ? option.label : option.value;
}
