import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Control/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primitive switch control (track + thumb). Use when the label is custom, external, or absent — provide `aria-label` or `aria-labelledby`. For the standard labeled switch from Figma, use `ToggleField` instead.',
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    'aria-label': '通知',
  },
};

export const On: Story = {
  args: {
    defaultChecked: true,
    'aria-label': '通知',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': '通知',
  },
};

export const DisabledOn: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': '通知',
  },
};

export const Controlled: Story = {
  render: function ControlledToggle() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col items-center gap-3">
        <Toggle checked={checked} onCheckedChange={setChecked} aria-label="通知" />
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
      <Toggle aria-label="Off" />
      <Toggle defaultChecked aria-label="On" />
      <Toggle disabled aria-label="Disabled off" />
      <Toggle disabled defaultChecked aria-label="Disabled on" />
    </div>
  ),
};
