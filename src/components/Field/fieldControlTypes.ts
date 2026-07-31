/** Props FormField injects into nested field controls (Input, TextArea, DateInput). */
export type FieldControlProps = {
  invalid?: boolean;
  onMaxLengthReached?: (reached: boolean) => void;
  'aria-describedby'?: string;
};
