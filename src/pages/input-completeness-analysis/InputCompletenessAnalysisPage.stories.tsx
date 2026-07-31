import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputCompletenessAnalysisPage } from './InputCompletenessAnalysisPage';

const meta = {
  title: 'Pages/ドラフト画面',
  component: InputCompletenessAnalysisPage,
  parameters: {
    layout: 'fullscreen',
    storyPadding: false,
  },
} satisfies Meta<typeof InputCompletenessAnalysisPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
