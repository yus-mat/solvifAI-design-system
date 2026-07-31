import type { Meta, StoryObj } from '@storybook/react-vite';

type TypeSpec = {
  name: string;
  className: string;
  sample: string;
  figma: string;
};

/** Gen Interface JP semantic utilities mapped one-to-one to Figma text styles. */
const bodyStyles: TypeSpec[] = [
  {
    name: 'caption',
    figma: 'caption',
    className: 'caption',
    sample: '補足テキスト — Gen Interface JP caption (12px / 135%)',
  },
  {
    name: 'caption-bold',
    figma: 'caption-bold',
    className: 'caption-bold',
    sample: 'ラベル — Gen Interface JP caption-bold (12px / 135%)',
  },
  {
    name: 'body-2',
    figma: 'body-2',
    className: 'body-2',
    sample: '本文 — Gen Interface JP body-2 (14px / 145%)',
  },
  {
    name: 'body-2-bold',
    figma: 'body-2-bold',
    className: 'body-2-bold',
    sample: '強調本文 — Gen Interface JP body-2-bold (14px / 145%)',
  },
  {
    name: 'body-1',
    figma: 'body-1',
    className: 'body-1',
    sample: '標準本文 — Gen Interface JP body-1 (16px / 150%)',
  },
  {
    name: 'body-1-bold',
    figma: 'body-1-bold',
    className: 'body-1-bold',
    sample: '見出し補助 — Gen Interface JP body-1-bold (16px / 150%)',
  },
];

const headingStyles: TypeSpec[] = [
  {
    name: 'heading-3',
    figma: 'heading-3',
    className: 'heading-3',
    sample: 'ページ見出し — Gen Interface JP heading-3 (20px / 140%)',
  },
  {
    name: 'heading-2',
    figma: 'heading-2',
    className: 'heading-2',
    sample: 'ディスプレイ — Gen Interface JP heading-2 (24px / 140%)',
  },
  {
    name: 'heading-1',
    figma: 'heading-1',
    className: 'heading-1',
    sample: 'ページタイトル — Gen Interface JP heading-1 (28px / 140%)',
  },
];

function TypeSample({ spec }: { spec: TypeSpec }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border-neutral-muted py-4">
      <span className="font-mono caption text-text-neutral-muted">
        {spec.name} → {spec.figma}
      </span>
      <p className={spec.className}>{spec.sample}</p>
    </div>
  );
}

const meta = {
  title: 'Foundation/Typography',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
  render: () => (
    <div className="max-w-2xl">
      {bodyStyles.map((spec) => (
        <TypeSample key={spec.name} spec={spec} />
      ))}
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="max-w-2xl">
      {headingStyles.map((spec) => (
        <TypeSample key={spec.name} spec={spec} />
      ))}
    </div>
  ),
};
