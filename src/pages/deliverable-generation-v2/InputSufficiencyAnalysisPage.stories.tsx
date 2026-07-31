import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { InputSufficiencyAnalysisPage } from './InputSufficiencyAnalysisPage';

const meta = {
  title: 'Pages/インプット充足度分析',
  component: InputSufficiencyAnalysisPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/deliverables/analysis']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    storyPadding: false,
  },
} satisfies Meta<typeof InputSufficiencyAnalysisPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
