import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/Button';
import {
  motionAppearDurationMs,
  motionAppearEasing,
  motionAppearOpacityClassName,
  motionAppearTransformClassName,
} from '@/styles/motion';

const meta = {
  title: 'Foundation/Motion',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AppearanceStandard: Story = {
  render: function AppearanceStandardStory() {
    const [visible, setVisible] = useState(false);

    return (
      <div className="space-y-6">
        <div className="max-w-xl space-y-2 body-2 text-text-neutral-primary">
          <p className="m-0 font-medium">Appearance motion (tentative)</p>
          <p className="m-0 text-text-neutral-secondary">
            Use for enter/exit transitions on overlays, drawers, dialogs, and
            similar mounted surfaces. Hover and press states keep their own
            shorter color transitions.
          </p>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono caption text-text-neutral-muted">
            <dt>easing</dt>
            <dd className="m-0">{motionAppearEasing}</dd>
            <dt>duration</dt>
            <dd className="m-0">{motionAppearDurationMs}ms</dd>
          </dl>
        </div>

        <Button onClick={() => setVisible((value) => !value)}>
          {visible ? 'Hide panel' : 'Show panel'}
        </Button>

        <div className="relative h-40 overflow-hidden rounded-lg border border-border-neutral-muted bg-background-neutral-secondary">
          <div
            className={[
              'absolute top-4 right-0 w-48 rounded-l-lg bg-surface-raise px-4 py-3 shadow-md',
              motionAppearTransformClassName,
              visible ? 'translate-x-0' : 'translate-x-full',
            ].join(' ')}
          >
            <p className="m-0 caption text-text-neutral-primary">
              Slides in from the right
            </p>
          </div>
          <div
            className={[
              'absolute inset-0 bg-background-overlay-subtle',
              motionAppearOpacityClassName,
              visible ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            aria-hidden
          />
        </div>
      </div>
    );
  },
};
