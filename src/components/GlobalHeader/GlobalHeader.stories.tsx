import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlobalHeader } from './GlobalHeader';

const meta = {
  title: 'Components/GlobalHeader',
  component: GlobalHeader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GlobalHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAvatars = [
  { initials: '山', colorIndex: 1 as const },
  { initials: '山', colorIndex: 2 as const },
  { initials: '山', colorIndex: 3 as const },
  { initials: '山', colorIndex: 4 as const },
  { initials: '山', colorIndex: 5 as const },
];

export const Funnel: Story = {
  args: {
    variant: 'funnel',
  },
};

export const DraftOwner: Story = {
  args: {
    variant: 'draft',
    title: '成果物名',
    statusLabel: '下書き',
    avatars: sampleAvatars,
    showPrimaryAction: true,
  },
};

export const DraftMember: Story = {
  args: {
    variant: 'draft',
    title: '成果物名',
    statusLabel: '下書き',
    avatars: sampleAvatars,
    showPrimaryAction: false,
  },
};
