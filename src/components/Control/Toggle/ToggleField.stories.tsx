import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ToggleField } from './ToggleField';

const meta = {
  title: 'Control/ToggleField',
  component: ToggleField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Labeled switch field — composes `Toggle` with label text, layout, and accessibility wiring. Use for standard form/settings toggles. For custom label layouts (e.g. label + tag), use `Toggle` directly.',
      },
    },
  },
  argTypes: {
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
  },
  args: {
    label: 'ラベル',
    labelPosition: 'right',
  },
} satisfies Meta<typeof ToggleField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LabelLeft: Story = {
  args: {
    labelPosition: 'left',
  },
};

export const On: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledOn: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  render: function ControlledToggleField() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col items-start gap-3">
        <ToggleField
          label="通知"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="caption text-text-neutral-muted">
          {checked ? 'On' : 'Off'}
        </p>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleField label="Off" />
      <ToggleField label="On" defaultChecked />
      <ToggleField label="Disabled off" disabled />
      <ToggleField label="Disabled on" disabled defaultChecked />
    </div>
  ),
};
