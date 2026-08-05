import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonIcon } from '@/components/Button';
import { TextAreaComposer } from '@/components/Chat/TextAreaComposer';
import { Picker, PickerGroup } from '@/components/Picker';
import { ArrowUp } from '@/icons';
import { AnswerPanel } from './AnswerPanel';

const deliverableOptions = [
  { value: 'requirements', title: '業務要件定義書' },
  { value: 'system-design', title: 'システム設計書' },
  { value: 'test-plan', title: 'テスト計画書' },
  { value: 'user-manual', title: 'ユーザーマニュアル' },
  { value: 'project-plan', title: 'プロジェクト計画書' },
  { value: 'risk', title: 'リスク管理表' },
  { value: 'change-log', title: '変更管理ログ' },
  { value: 'qa-report', title: '品質保証報告書' },
  { value: 'ops-manual', title: '運用手順書' },
  { value: 'other', title: 'その他' },
] as const;

function DeliverablePickerGrid() {
  return (
    <PickerGroup
      defaultValue="requirements"
      className="grid w-full grid-cols-3 gap-2"
    >
      {deliverableOptions.map((option) => (
        <Picker
          key={option.value}
          value={option.value}
          title={option.title}
          subtitle="業務要件定義書"
        />
      ))}
    </PickerGroup>
  );
}

const defaultFooter = (
  <ButtonIcon
    emphasis="primary"
    intent="default"
    size="md"
    icon={<ArrowUp aria-hidden />}
    aria-label="送信"
  />
);

const meta = {
  title: 'Chat/AnswerPanel',
  component: AnswerPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: { control: false },
    footer: { control: false },
    page: { control: false },
    onClose: { action: 'close' },
    onExpand: { action: 'expand' },
  },
  args: {
    caption: 'キャプション',
    title: '成果物の種類を教えてください。',
    subtitle: '以下のオプションから選択できます。',
    page: {
      current: 1,
      total: 3,
    },
    footer: defaultFooter,
    children: <DeliverablePickerGrid />,
  },
} satisfies Meta<typeof AnswerPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-[800px]">
      <AnswerPanel
        {...args}
        onClose={args.onClose ?? (() => undefined)}
        onExpand={args.onExpand ?? (() => undefined)}
        page={{
          current: args.page?.current ?? 1,
          total: args.page?.total ?? 3,
          onPrevious: args.page?.onPrevious,
          onNext: args.page?.onNext,
        }}
      />
    </div>
  ),
};

export const Minimal: Story = {
  args: {
    caption: undefined,
    subtitle: undefined,
    onExpand: undefined,
    page: undefined,
    footer: undefined,
    children: (
      <PickerGroup
        defaultValue="requirements"
        className="grid w-full grid-cols-2 gap-2"
      >
        <Picker
          value="requirements"
          title="業務要件定義書"
          subtitle="業務の要件を定義する文書"
        />
        <Picker
          value="system-design"
          title="システム設計書"
          subtitle="システムの設計を記述する文書"
        />
        <Picker
          value="test-plan"
          title="テスト計画書"
          subtitle="テストの計画を記述する文書"
        />
        <Picker value="other" title="その他" subtitle="上記以外の成果物" />
      </PickerGroup>
    ),
  },
  render: (args) => (
    <div className="w-full max-w-[800px]">
      <AnswerPanel
        {...args}
        onExpand={undefined}
        page={undefined}
        onClose={args.onClose ?? (() => undefined)}
      />
    </div>
  ),
};

export const WithComposer: Story = {
  args: {
    caption: undefined,
    subtitle: undefined,
    onExpand: undefined,
    page: undefined,
    footer: undefined,
    title: '成果物の種類を教えてください。',
    children: (
      <PickerGroup
        defaultValue="requirements"
        className="grid w-full grid-cols-2 gap-2"
      >
        <Picker
          value="requirements"
          title="業務要件定義書"
          subtitle="業務の要件を定義する文書"
        />
        <Picker
          value="system-design"
          title="システム設計書"
          subtitle="システムの設計を記述する文書"
        />
        <Picker
          value="test-plan"
          title="テスト計画書"
          subtitle="テストの計画を記述する文書"
        />
        <Picker value="other" title="その他" subtitle="上記以外の成果物" />
      </PickerGroup>
    ),
  },
  render: (args) => (
    <div className="flex w-full max-w-[800px] flex-col gap-3">
      <AnswerPanel
        {...args}
        onExpand={undefined}
        page={undefined}
        onClose={args.onClose ?? (() => undefined)}
      />
      <TextAreaComposer disabled placeholder="メッセージを入力..." />
    </div>
  ),
};
