import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComboboxInput } from './ComboboxInput';
import type { ComboboxOption } from './comboboxTypes';
import { FormField } from './FormField';

const SAMPLE_OPTIONS: ComboboxOption[] = [
  { value: 'tanaka', label: '田中太郎' },
  { value: 'sato', label: '佐藤花子' },
  { value: 'yamada', label: '山田太郎' },
  { value: 'suzuki', label: '鈴木一郎' },
  { value: 'takahashi', label: '高橋美咲' },
];

function ComboboxDemo({
  initialValue = [] as string[],
  defaultOpen = false,
  invalid = false,
  disabled = false,
}: {
  initialValue?: string[];
  defaultOpen?: boolean;
  invalid?: boolean;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(defaultOpen);

  return (
    <ComboboxInput
      options={SAMPLE_OPTIONS}
      value={value}
      onValueChange={setValue}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      open={open}
      onOpenChange={setOpen}
      invalid={invalid}
      disabled={disabled}
    />
  );
}

const meta = {
  title: 'Forms/ComboboxInput',
  component: ComboboxInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ComboboxInput>;

export default meta;
type Story = StoryObj;

export const Empty: Story = {
  render: () => <ComboboxDemo />,
};

export const Open: Story = {
  render: () => <ComboboxDemo defaultOpen />,
};

export const Filled: Story = {
  render: () => <ComboboxDemo initialValue={['tanaka', 'sato']} />,
};

export const Invalid: Story = {
  render: () => <ComboboxDemo invalid />,
};

export const Disabled: Story = {
  render: () => <ComboboxDemo disabled />,
};

export const InFormField: Story = {
  render: function InFormFieldStory() {
    const [value, setValue] = useState<string[]>(['tanaka']);
    const [inputValue, setInputValue] = useState('');

    return (
      <FormField
        label="メンバー"
        required
        description="ラベルを入力"
        htmlFor="members"
        messageId="members-msg"
      >
        <ComboboxInput
          id="members"
          aria-describedby="members-msg"
          options={SAMPLE_OPTIONS}
          value={value}
          onValueChange={setValue}
          inputValue={inputValue}
          onInputValueChange={setInputValue}
        />
      </FormField>
    );
  },
};

export const InFormFieldWithError: Story = {
  render: function InFormFieldWithErrorStory() {
    const [value, setValue] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    return (
      <FormField
        label="メンバー"
        required
        error="1人以上選択してください"
        htmlFor="members-error"
        messageId="members-error-msg"
      >
        <ComboboxInput
          id="members-error"
          aria-describedby="members-error-msg"
          options={SAMPLE_OPTIONS}
          value={value}
          onValueChange={setValue}
          inputValue={inputValue}
          onInputValueChange={setInputValue}
        />
      </FormField>
    );
  },
};
