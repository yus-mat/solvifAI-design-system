import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Control/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

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
      <Checkbox aria-label="Unchecked" />
      <Checkbox defaultChecked aria-label="Checked" />
      <Checkbox disabled aria-label="Disabled unchecked" />
      <Checkbox disabled defaultChecked aria-label="Disabled checked" />
    </div>
  ),
};
