import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '@/components/Avatar';
import { IconWrapper } from '@/components/IconWrapper';
import { Search } from '@/icons';
import { inputWrapperClassName } from '@/components/Field/inputStyles';
import { Chip } from './Chip';
import { ChipGroup } from './ChipGroup';

const meta = {
  title: 'Content Display/ChipGroup',
  component: ChipGroup,
  parameters: {
    options: { enableShortcuts: false },
  },
  tags: ['autodocs'],
  argTypes: {
    inline: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => (
    <ChipGroup {...args}>
      <Chip
        leadingSlot={<Avatar name="田中 咲" colorIndex={4} />}
        onRemove={() => {}}
      >
        田中 咲
      </Chip>
      <Chip
        leadingSlot={<Avatar name="佐藤 花子" colorIndex={2} />}
        onRemove={() => {}}
      >
        佐藤 花子
      </Chip>
      <Chip onRemove={() => {}}>山田 太郎</Chip>
    </ChipGroup>
  ),
};

function KeyboardDemo() {
  const [chips, setChips] = useState([
    '田中 咲',
    '佐藤 花子',
    '山田 太郎',
    '鈴木 一郎',
    '高橋 美咲',
  ]);

  return (
    <div className="flex max-w-md flex-col gap-3">
      <p className="caption text-text-muted">
        Tab to focus the group, then use arrow keys to move between chips.
        Delete or Backspace removes the focused chip.
      </p>
      <ChipGroup label="選択済みのメンバー">
        {chips.map((name) => (
          <Chip
            key={name}
            onRemove={() => setChips((prev) => prev.filter((chip) => chip !== name))}
          >
            {name}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  );
}

export const KeyboardNavigation: Story = {
  render: () => <KeyboardDemo />,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Standalone ChipGroup is a single tab stop. Arrow keys rove focus between chips; Delete/Backspace removes the focused chip. Remove buttons are not in the tab order.',
      },
    },
  },
};

export const InlineInCombobox: Story = {
  render: () => (
    <div
      className={inputWrapperClassName({
        className: 'flex items-center gap-2 p-1',
      })}
    >
      <ChipGroup inline className="min-w-0 flex-1">
        <Chip onRemove={() => {}}>田中太郎</Chip>
        <Chip onRemove={() => {}}>田中太郎</Chip>
        <Chip onRemove={() => {}}>佐藤花子</Chip>
      </ChipGroup>
      <IconWrapper size="s" className="ml-auto shrink-0 text-text-neutral-muted">
        <Search aria-hidden />
      </IconWrapper>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Inline ChipGroup has no wrapper padding or composite keyboard behavior — the combobox input owns focus.',
      },
    },
  },
};
