import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButtonField } from './RadioButtonField';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Control/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '配信方法',
    defaultValue: 'email',
    children: null,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButtonField value="email" label="メール" />
      <RadioButtonField value="sms" label="SMS" />
      <RadioButtonField value="push" label="プッシュ通知" />
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  args: { label: '配信方法', children: null },
  render: function Controlled(args) {
    const [value, setValue] = useState('sms');
    return (
      <RadioGroup {...args} value={value} onValueChange={setValue}>
        <RadioButtonField value="email" label="メール" />
        <RadioButtonField value="sms" label="SMS" />
        <RadioButtonField value="push" label="プッシュ通知" disabled />
      </RadioGroup>
    );
  },
};
