import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxField } from './CheckboxField';

const meta = {
  title: 'Control/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
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
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LabelLeft: Story = {
  args: {
    labelPosition: 'left',
  },
};

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
