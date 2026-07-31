import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { INPUT_MAX_LENGTH } from './constants';
import { DateInput } from './DateInput';
import { ComboboxInput } from './ComboboxInput';
import { FormField } from './FormField';
import { Input } from './Input';
import { TextArea } from './TextArea';

const fieldId = 'report-name';
const messageId = 'report-name-message';

const meta = {
  title: 'Forms/FormField',
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

function FieldWithInput({
  error,
  description,
  disabled,
  defaultValue,
}: {
  error?: string;
  description?: string;
  disabled?: boolean;
  defaultValue?: string;
}) {
  return (
    <FormField
      label="ラベルを入力"
      required
      description={description}
      error={error}
      htmlFor={fieldId}
      messageId={messageId}
    >
      <Input
        id={fieldId}
        disabled={disabled}
        defaultValue={defaultValue}
        aria-describedby={messageId}
      />
    </FormField>
  );
}

export const Default: Story = {
  render: () => <FieldWithInput description="ラベルを入力" />,
};

export const Filled: Story = {
  render: () => (
    <FieldWithInput
      description="ラベルを入力"
      defaultValue="例）カスタマーレポートv2"
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <FieldWithInput error="ラベルを入力" />
  ),
};

export const Disabled: Story = {
  render: () => (
    <FieldWithInput description="ラベルを入力" disabled />
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <FormField label="ラベルを入力" required htmlFor={fieldId}>
      <Input id={fieldId} />
    </FormField>
  ),
};

export const MaxLengthError: Story = {
  render: () => (
    <FormField
      label="ラベルを入力"
      required
      description="ラベルを入力"
      htmlFor={fieldId}
      messageId={messageId}
    >
      <Input
        id={fieldId}
        aria-describedby={messageId}
        defaultValue={'あ'.repeat(INPUT_MAX_LENGTH)}
      />
    </FormField>
  ),
};

export const WithTextArea: Story = {
  render: () => (
    <FormField
      label="メッセージ"
      required
      description="自由記述で入力してください"
      htmlFor="message"
      messageId="message-msg"
    >
      <TextArea id="message" aria-describedby="message-msg" />
    </FormField>
  ),
};

export const WithDateInput: Story = {
  render: () => (
    <FormField
      label="日付"
      required
      description="対象期間の開始日"
      htmlFor="start-date"
      messageId="start-date-msg"
    >
      <DateInput id="start-date" aria-describedby="start-date-msg" />
    </FormField>
  ),
};

const comboboxOptions = [
  { value: 'tanaka', label: '田中太郎' },
  { value: 'sato', label: '佐藤花子' },
];

function FormFieldComboboxExample() {
  const [value, setValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  return (
    <FormField
      label="メンバー"
      required
      description="ラベルを入力"
      htmlFor="form-members"
      messageId="form-members-msg"
    >
      <ComboboxInput
        id="form-members"
        aria-describedby="form-members-msg"
        options={comboboxOptions}
        value={value}
        onValueChange={setValue}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
      />
    </FormField>
  );
}

export const WithComboboxInput: Story = {
  render: () => <FormFieldComboboxExample />,
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <FieldWithInput description="ラベルを入力" />
      <FieldWithInput
        description="ラベルを入力"
        defaultValue="例）カスタマーレポートv2"
      />
      <FieldWithInput error="ラベルを入力" />
      <FieldWithInput description="ラベルを入力" disabled />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
