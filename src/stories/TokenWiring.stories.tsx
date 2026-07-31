import type { Meta, StoryObj } from '@storybook/react-vite';

function TokenWiringDemo() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <p className="body-2 text-text-secondary">
        Semantic Tailwind utilities backed by generated design tokens.
      </p>

      <div className="rounded-base border border-border-neutral-muted bg-background-neutral-primary px-3 py-2.5 caption text-text-neutral-primary">
        Tailwind + design tokens
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-base bg-background-action-primary px-3 py-1.5 caption text-text-neutral-inverse">
          action primary
        </span>
        <span className="rounded-base border border-border-action-primary px-3 py-1.5 caption text-text-action-primary">
          border action
        </span>
        <span className="rounded-base border border-border-function-error px-3 py-1.5 caption text-text-function-error">
          border error
        </span>
      </div>

      <input
        className="w-64 rounded-base border border-border-neutral-muted bg-background-neutral-primary px-3 py-2.5 caption text-text-neutral-primary outline-none placeholder:text-text-neutral-muted hover:bg-background-interactive-hover focus-visible:border-border-action-primary focus-visible:bg-background-interactive-focus"
        placeholder="例）カスタマーレポートv2"
      />
    </div>
  );
}

const meta = {
  title: 'Foundation/Token Wiring',
  component: TokenWiringDemo,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TokenWiringDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
