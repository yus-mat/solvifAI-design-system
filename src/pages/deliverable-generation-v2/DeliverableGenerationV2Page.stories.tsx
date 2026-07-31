import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { DeliverableGenerationV2Page } from './DeliverableGenerationV2Page';

const meta = {
  title: 'Pages/成果物生成v2',
  component: DeliverableGenerationV2Page,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/deliverables/generate']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    storyPadding: false,
  },
} satisfies Meta<typeof DeliverableGenerationV2Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
