import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Control/Toggle',
  component: Toggle,
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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
    <div className="flex items-center gap-6">
      <Toggle aria-label="Off" />
      <Toggle defaultChecked aria-label="On" />
      <Toggle disabled aria-label="Disabled off" />
      <Toggle disabled defaultChecked aria-label="Disabled on" />
    </div>
  ),
};
