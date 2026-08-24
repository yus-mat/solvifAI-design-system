import type { Meta, StoryObj } from '@storybook/react-vite';
import { RawColorsDemo } from './RawColors';

type SwatchSpec = {
  name: string;
  bgClass: string;
  textClass?: string;
  borderClass?: string;
  /** Parent surface for alpha / transparent interactive tokens */
  surfaceClass?: string;
};

type SwatchGroup = {
  title: string;
  swatches: SwatchSpec[];
};

const onSurface = 'bg-surface-raise';

const groups: SwatchGroup[] = [
  {
    title: 'Surface',
    swatches: [
      { name: 'surface-base', bgClass: 'bg-surface-base' },
      { name: 'surface-muted', bgClass: 'bg-surface-muted' },
      { name: 'surface-raise', bgClass: 'bg-surface-raise' },
    ],
  },
  {
    title: 'Text — neutral',
    swatches: [
      {
        name: 'text-neutral-primary',
        bgClass: onSurface,
        textClass: 'text-text-neutral-primary',
      },
      {
        name: 'text-neutral-secondary',
        bgClass: onSurface,
        textClass: 'text-text-neutral-secondary',
      },
      {
        name: 'text-neutral-muted',
        bgClass: onSurface,
        textClass: 'text-text-neutral-muted',
      },
      {
        name: 'text-neutral-inverse',
        bgClass: 'bg-background-action-primary',
        textClass: 'text-text-neutral-inverse',
      },
    ],
  },
  {
    title: 'Text — action, danger & function',
    swatches: [
      {
        name: 'text-action-primary',
        bgClass: onSurface,
        textClass: 'text-text-action-primary',
      },
      {
        name: 'text-danger-primary',
        bgClass: onSurface,
        textClass: 'text-text-danger-primary',
      },
      {
        name: 'text-function-emphasis',
        bgClass: onSurface,
        textClass: 'text-text-function-emphasis',
      },
      {
        name: 'text-function-error',
        bgClass: onSurface,
        textClass: 'text-text-function-error',
      },
      {
        name: 'text-function-success',
        bgClass: onSurface,
        textClass: 'text-text-function-success',
      },
      {
        name: 'text-function-warning',
        bgClass: onSurface,
        textClass: 'text-text-function-warning',
      },
      {
        name: 'text-function-info',
        bgClass: onSurface,
        textClass: 'text-text-function-info',
      },
    ],
  },
  {
    title: 'Background — neutral',
    swatches: [
      { name: 'bg-neutral-primary', bgClass: 'bg-background-neutral-primary' },
      { name: 'bg-neutral-secondary', bgClass: 'bg-background-neutral-secondary' },
      { name: 'bg-neutral-muted', bgClass: 'bg-background-neutral-muted' },
      {
        name: 'bg-neutral-inverse',
        bgClass: 'bg-background-neutral-inverse',
        textClass: 'text-text-neutral-inverse',
      },
    ],
  },
  {
    title: 'Background — action & danger',
    swatches: [
      {
        name: 'bg-action-primary',
        bgClass: 'bg-background-action-primary',
        textClass: 'text-text-neutral-inverse',
      },
      {
        name: 'bg-action-secondary',
        bgClass: 'bg-background-action-secondary',
        textClass: 'text-text-action-primary',
      },
      {
        name: 'bg-danger-primary',
        bgClass: 'bg-background-danger-primary',
        textClass: 'text-text-neutral-inverse',
      },
      {
        name: 'bg-danger-secondary',
        bgClass: 'bg-background-danger-secondary',
        textClass: 'text-text-danger-primary',
      },
    ],
  },
  {
    title: 'Background — function (subtle)',
    swatches: [
      {
        name: 'function-accent-subtle',
        bgClass: 'bg-background-function-accent-subtle',
        textClass: 'text-text-function-emphasis',
      },
      {
        name: 'function-error-subtle',
        bgClass: 'bg-background-function-error-subtle',
        textClass: 'text-text-function-error',
      },
      {
        name: 'function-success-subtle',
        bgClass: 'bg-background-function-success-subtle',
        textClass: 'text-text-function-success',
      },
      {
        name: 'function-warning-subtle',
        bgClass: 'bg-background-function-warning-subtle',
        textClass: 'text-text-function-warning',
      },
      {
        name: 'function-info-subtle',
        bgClass: 'bg-background-function-info-subtle',
        textClass: 'text-text-function-info',
      },
    ],
  },
  {
    title: 'Background — function (base)',
    swatches: [
      {
        name: 'function-accent-base',
        bgClass: 'bg-background-function-accent-base',
        textClass: 'text-text-function-emphasis',
      },
      {
        name: 'function-error-base',
        bgClass: 'bg-background-function-error-base',
        textClass: 'text-text-function-error',
      },
      {
        name: 'function-success-base',
        bgClass: 'bg-background-function-success-base',
        textClass: 'text-text-function-success',
      },
      {
        name: 'function-warning-base',
        bgClass: 'bg-background-function-warning-base',
        textClass: 'text-text-function-warning',
      },
      {
        name: 'function-info-base',
        bgClass: 'bg-background-function-info-base',
        textClass: 'text-text-function-info',
      },
    ],
  },
  {
    title: 'Background — function (strong)',
    swatches: [
      {
        name: 'function-accent-strong',
        bgClass: 'bg-background-function-accent-strong',
        textClass: 'text-text-neutral-inverse',
      },
      {
        name: 'function-error-strong',
        bgClass: 'bg-background-function-error-strong',
        textClass: 'text-text-neutral-inverse',
      },
      {
        name: 'function-success-strong',
        bgClass: 'bg-background-function-success-strong',
        textClass: 'text-text-neutral-inverse',
      },
      {
        name: 'function-warning-strong',
        bgClass: 'bg-background-function-warning-strong',
        textClass: 'text-text-neutral-inverse',
      },
      {
        name: 'function-info-strong',
        bgClass: 'bg-background-function-info-strong',
        textClass: 'text-text-neutral-inverse',
      },
    ],
  },
  {
    title: 'Background — interactive (on surface-raise)',
    swatches: [
      {
        name: 'interactive-default',
        bgClass: 'bg-background-interactive-default',
        surfaceClass: onSurface,
      },
      {
        name: 'interactive-hover',
        bgClass: 'bg-background-interactive-hover',
        surfaceClass: onSurface,
      },
      {
        name: 'interactive-focus',
        bgClass: 'bg-background-interactive-focus',
        surfaceClass: onSurface,
      },
      {
        name: 'interactive-pressed',
        bgClass: 'bg-background-interactive-pressed',
        surfaceClass: onSurface,
      },
      {
        name: 'interactive-selected',
        bgClass: 'bg-background-interactive-selected',
        surfaceClass: onSurface,
      },
    ],
  },
  {
    title: 'Background — overlay',
    swatches: [
      {
        name: 'overlay-subtle',
        bgClass: 'bg-background-overlay-subtle',
        surfaceClass: 'bg-surface-base',
        textClass: 'text-text-neutral-primary',
      },
      {
        name: 'overlay-strong',
        bgClass: 'bg-background-overlay-strong',
        surfaceClass: 'bg-surface-base',
        textClass: 'text-text-neutral-inverse',
      },
    ],
  },
  {
    title: 'Border',
    swatches: [
      {
        name: 'border-neutral-muted',
        bgClass: onSurface,
        borderClass: 'border border-border-neutral-muted',
      },
      {
        name: 'border-neutral-secondary',
        bgClass: onSurface,
        borderClass: 'border border-border-neutral-secondary',
      },
      {
        name: 'border-neutral-primary',
        bgClass: onSurface,
        borderClass: 'border border-border-neutral-primary',
      },
      {
        name: 'border-action-primary',
        bgClass: onSurface,
        borderClass: 'border border-border-action-primary',
      },
      {
        name: 'border-function-error',
        bgClass: onSurface,
        borderClass: 'border border-border-function-error',
      },
      {
        name: 'border-function-success',
        bgClass: onSurface,
        borderClass: 'border border-border-function-success',
      },
      {
        name: 'border-function-emphasis',
        bgClass: onSurface,
        borderClass: 'border border-border-function-emphasis',
      },
    ],
  },
  {
    title: 'Identity (avatar)',
    swatches: [
      { name: 'user-1', bgClass: 'bg-user-1-bg', textClass: 'text-user-1-text' },
      { name: 'user-2', bgClass: 'bg-user-2-bg', textClass: 'text-user-2-text' },
      { name: 'user-3', bgClass: 'bg-user-3-bg', textClass: 'text-user-3-text' },
      { name: 'user-4', bgClass: 'bg-user-4-bg', textClass: 'text-user-4-text' },
      { name: 'user-5', bgClass: 'bg-user-5-bg', textClass: 'text-user-5-text' },
      { name: 'user-6', bgClass: 'bg-user-6-bg', textClass: 'text-user-6-text' },
    ],
  },
];

function Swatch({ name, bgClass, textClass, borderClass, surfaceClass }: SwatchSpec) {
  const swatch = (
    <div
      className={[
        'flex h-14 w-full min-w-[7rem] items-center justify-center rounded-base px-2',
        bgClass,
        borderClass,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={`caption-bold ${textClass ?? 'text-text-primary'}`}>Aa</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-1.5">
      {surfaceClass ? (
        <div className={`rounded-base p-1 ${surfaceClass}`}>{swatch}</div>
      ) : (
        swatch
      )}
      <code className="text-[10px] text-text-muted">{name}</code>
    </div>
  );
}

function ColorsDemo() {
  return (
    <div className="flex flex-col gap-8 bg-surface-base p-6">
      <div>
        <h2 className="body-2-bold text-text-primary">Semantic colors</h2>
        <p className="mt-1 caption text-text-secondary">
          Synced from Figma <code className="text-text-muted">semantic</code> collection. Use the
          Theme toolbar to compare light and dark modes.
        </p>
      </div>

      {groups.map((group) => (
        <section key={group.title}>
          <h3 className="mb-3 caption-bold uppercase tracking-wide text-text-muted">
            {group.title}
          </h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-3">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticPalette: Story = {
  render: () => <ColorsDemo />,
};

export const RawPalettes: Story = {
  render: () => <RawColorsDemo />,
};
