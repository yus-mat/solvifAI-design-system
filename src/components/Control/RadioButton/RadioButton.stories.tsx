import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'Control/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadioButton aria-label="Unchecked" />
      <RadioButton defaultChecked aria-label="Checked" />
      <RadioButton disabled aria-label="Disabled unchecked" />
      <RadioButton disabled defaultChecked aria-label="Disabled checked" />
    </div>
  ),
};
