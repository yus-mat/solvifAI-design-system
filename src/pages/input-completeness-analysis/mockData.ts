import type { AvatarStackItem } from '@/components/Avatar';

export type SlideItem = {
  number: number;
  title: string;
  selected?: boolean;
};

export type ConfirmationIssueCategory = '不足' | '矛盾' | '提案' | '曖昧';

/** Inline text segment for before/after diff rendering. */
export type TextSegment = {
  text: string;
  highlight?: 'removed' | 'added';
};

export type ChangeLocation = {
  id: string;
  heading: string;
  /** Slide number in the left slide list that this change affects. */
  slideNumber: number;
  before: TextSegment[];
  after: TextSegment[];
};

export type ConfirmationIssue = {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: ConfirmationIssueCategory;
  title: string;
  /** Prompt shown above the answer textarea when the card is expanded. */
  question: string;
  detail: string;
  changePreview: ChangeLocation[];
};

export const SLIDES: SlideItem[] = [
  { number: 1, title: 'プロジェクト概要・背景', selected: true },
  { number: 2, title: '現状分析・課題整理' },
  { number: 3, title: '機能要件・非機能要件' },
  { number: 4, title: 'システムアーキテクチャ案' },
  { number: 5, title: 'スケジュール・工数見積' },
  { number: 6, title: 'リスク・懸念事項' },
  { number: 7, title: '運用ルール・体制' },
  { number: 8, title: '承認フロー詳細' },
  { number: 9, title: '監査ログ要件' },
  { number: 10, title: '教育・引き継ぎ' },
];

export type SlideContentCard = {
  label: string;
  body: string;
};

export type SlideContent = {
  section: string;
  title: string;
  cards: SlideContentCard[];
};

export const SLIDE_CONTENTS: Record<number, SlideContent> = {
  1: {
    section: 'SECTION 01',
    title: 'プロジェクト概要・背景',
    cards: [
      {
        label: '背景',
        body: 'カスタマーサポート部門の業務効率化を目的としたシステムリニューアルプロジェクト',
      },
      {
        label: '目的',
        body: '対応時間の短縮・顧客満足度の向上・オペレーターの作業負荷低減',
      },
      {
        label: '対象範囲',
        body: '問い合わせ管理・FAQ自動応答・エスカレーションフロー',
      },
    ],
  },
  2: {
    section: 'SECTION 02',
    title: '現状分析・課題整理',
    cards: [
      {
        label: '現状',
        body: '問い合わせ対応は手作業中心で、ナレッジが個人に依存している',
      },
      {
        label: '課題',
        body: '一次回答までのリードタイムが長く、エスカレーション基準も属人化',
      },
      {
        label: '改善余地',
        body: 'FAQ自動提案と承認者不在時の自動エスカレーションで負荷を平準化',
      },
    ],
  },
  3: {
    section: 'SECTION 03',
    title: '機能要件・非機能要件',
    cards: [
      {
        label: '機能要件',
        body: 'チケット管理、FAQ検索、承認フロー、通知、監査ログの出力',
      },
      {
        label: '非機能',
        body: '可用性 99.9%、同時接続 500、主要画面の応答 2 秒以内',
      },
      {
        label: '制約',
        body: '既存 IdP 連携必須、個人情報は国内リージョンのみに保管',
      },
    ],
  },
  4: {
    section: 'SECTION 04',
    title: 'システムアーキテクチャ案',
    cards: [
      {
        label: '構成',
        body: 'Web / API / ワークフロー基盤 / ナレッジストアの 4 層構成',
      },
      {
        label: '連携',
        body: '社内 IdP・メール・チャット・BI ツールとの双方向連携を想定',
      },
      {
        label: '配置',
        body: '本番はマルチ AZ、検証はシングル AZ でコストを抑制',
      },
    ],
  },
  5: {
    section: 'SECTION 05',
    title: 'スケジュール・工数見積',
    cards: [
      {
        label: 'フェーズ',
        body: '要件定義 4 週 → 設計 6 週 → 実装 12 週 → 移行 4 週',
      },
      {
        label: '工数',
        body: '合計おおよそ 48 人月（開発 36 / デザイン 4 / PM・QA 8）',
      },
      {
        label: 'マイルストン',
        body: 'α 版レビュー、β 版パイロット、本番カットオーバーの 3 地点',
      },
    ],
  },
  6: {
    section: 'SECTION 06',
    title: 'リスク・懸念事項',
    cards: [
      {
        label: '技術',
        body: '既存チケットデータの移行品質と検索精度の両立が難所',
      },
      {
        label: '組織',
        body: '現場オペレーターの習熟コストと運用ルール変更への抵抗',
      },
      {
        label: '対策',
        body: 'パイロット部門での先行導入と段階的ロールアウトでリスクを分散',
      },
    ],
  },
  7: {
    section: 'SECTION 07',
    title: '運用ルール・体制',
    cards: [
      {
        label: '体制',
        body: 'サービスオーナー、運用リード、開発サポートの RACI を定義',
      },
      {
        label: '運用時間',
        body: '平日 9–18 時を標準とし、重大障害時のみオンコール対応',
      },
      {
        label: 'エスカレーション',
        body: '一次 / 二次 / 管理職の 3 段階。承認者不在時は上長へ自動転送',
      },
    ],
  },
  8: {
    section: 'SECTION 08',
    title: '承認フロー詳細',
    cards: [
      {
        label: '申請',
        body: '担当者が変更内容を起票し、影響範囲と根拠を添付して申請',
      },
      {
        label: '承認',
        body: '審査部門が内容確認。不在時は上長へ自動エスカレーション',
      },
      {
        label: '反映',
        body: '承認完了後にドラフトへ反映し、監査ログへ操作履歴を記録',
      },
    ],
  },
  9: {
    section: 'SECTION 09',
    title: '監査ログ要件',
    cards: [
      {
        label: '記録対象',
        body: 'ログイン、閲覧、編集、承認、エクスポートの各操作を記録',
      },
      {
        label: '保持',
        body: '最低 13 ヶ月保持し、改ざん防止のため追記専用ストレージへ保存',
      },
      {
        label: '参照',
        body: '監査担当のみ検索・エクスポート可能。個人情報はマスキング表示',
      },
    ],
  },
  10: {
    section: 'SECTION 10',
    title: '教育・引き継ぎ',
    cards: [
      {
        label: '研修',
        body: 'ロール別の操作研修と、FAQ メンテナンス手順のハンズオンを実施',
      },
      {
        label: 'ドキュメント',
        body: '運用マニュアル、障害対応 runbook、用語集をナレッジに集約',
      },
      {
        label: '引き継ぎ',
        body: 'リリース後 4 週間は開発チームが並走し、運用リードへ段階移管',
      },
    ],
  },
};

export function getSlideContent(slideNumber: number): SlideContent {
  return SLIDE_CONTENTS[slideNumber] ?? SLIDE_CONTENTS[1];
}

/** Source shown in the slide “インプット由来” popover. */
export type SlideAnnotationSourceKind =
  | 'analysisAnswer'
  | 'inputFile'
  | 'aiInference';

type SlideAnnotationSourceBase = {
  excerpt: string;
  citation: string;
};

export type SlideAnnotationSource =
  | (SlideAnnotationSourceBase & {
      kind: 'analysisAnswer';
      tagLabel: '充足度分析の回答';
      categoryId: string;
    })
  | (SlideAnnotationSourceBase & {
      kind: 'inputFile';
      tagLabel: 'インプットファイル参照';
    })
  | (SlideAnnotationSourceBase & {
      kind: 'aiInference';
      tagLabel: 'AI推論';
    });

/** Predefined hoverable text region on a slide card body. */
export type SlideTextAnnotation = {
  id: string;
  slideNumber: number;
  cardLabel: string;
  highlightText: string;
  source: SlideAnnotationSource;
};

export const SLIDE_TEXT_ANNOTATIONS: SlideTextAnnotation[] = [
  {
    id: 'ann-1-scope',
    slideNumber: 1,
    cardLabel: '対象範囲',
    highlightText: '問い合わせ管理・FAQ自動応答・エスカレーションフロー',
    source: {
      kind: 'analysisAnswer',
      tagLabel: '充足度分析の回答',
      excerpt:
        '需給計画部がシミュレーションツールで異なる市場シナリオに対応し最適な需給計画を策定する業務要件1-2が記載されているため、参照し作成',
      citation: '引用元：業務要件定義書サンプル ページ8',
      categoryId: 'business-requirements',
    },
  },
  {
    id: 'ann-1-purpose',
    slideNumber: 1,
    cardLabel: '目的',
    highlightText: '対応時間の短縮・顧客満足度の向上・オペレーターの作業負荷低減',
    source: {
      kind: 'inputFile',
      tagLabel: 'インプットファイル参照',
      excerpt:
        'プロジェクト憲章の「目標」節に一次対応時間短縮・CSAT向上・負荷低減が列挙されているため、目的文として転記した',
      citation: '参照：プロジェクト憲章_v0.3.pdf ページ2',
    },
  },
  {
    id: 'ann-1-background',
    slideNumber: 1,
    cardLabel: '背景',
    highlightText:
      'カスタマーサポート部門の業務効率化を目的としたシステムリニューアルプロジェクト',
    source: {
      kind: 'aiInference',
      tagLabel: 'AI推論',
      excerpt:
        '複数インプットに共通する「業務効率化」「システム刷新」の記述から、背景文を要約して生成した',
      citation: '根拠：ヒアリング議事録・現行課題一覧（統合推論）',
    },
  },
  {
    id: 'ann-2-issue',
    slideNumber: 2,
    cardLabel: '課題',
    highlightText: '一次回答までのリードタイムが長く、エスカレーション基準も属人化',
    source: {
      kind: 'aiInference',
      tagLabel: 'AI推論',
      excerpt:
        '現状ヒアリングとチケットログの傾向から、リードタイム遅延と基準の属人化を主要課題として推定した',
      citation: '根拠：現状分析メモ・チケット集計（統合推論）',
    },
  },
  {
    id: 'ann-2-as-is',
    slideNumber: 2,
    cardLabel: '現状',
    highlightText: '問い合わせ対応は手作業中心で、ナレッジが個人に依存している',
    source: {
      kind: 'inputFile',
      tagLabel: 'インプットファイル参照',
      excerpt:
        'As-Is 業務フロー図に「手作業対応」「個人フォルダ保管」が明記されているため、現状記述に反映した',
      citation: '参照：As-Is業務フロー_現状.pptx スライド4',
    },
  },
];
export function getSlideAnnotations(slideNumber: number): SlideTextAnnotation[] {
  return SLIDE_TEXT_ANNOTATIONS.filter((item) => item.slideNumber === slideNumber);
}

export type ReadOnlyAnalysisAnswer = {
  id: string;
  question: string;
  answer: string;
  status: 'sufficient' | 'missing';
};

export type ReadOnlyAnalysisCategory = {
  id: string;
  title: string;
  answers: ReadOnlyAnalysisAnswer[];
};

export const READONLY_ANALYSIS_DRAWER_TITLE = 'インプット診断レポート';
export const READONLY_ANALYSIS_TITLE = 'インプット充足度';

export const READONLY_ANALYSIS_CATEGORIES: ReadOnlyAnalysisCategory[] = [
  {
    id: 'business-requirements',
    title: '業務要求一覧',
    answers: [
      {
        id: 'br-1',
        question: '対象業務の範囲は何ですか？',
        answer:
          '問い合わせ管理、FAQ自動応答、エスカレーションフローを対象とします。需給計画部がシミュレーションツールで異なる市場シナリオに対応し最適な需給計画を策定する業務要件1-2を参照しています。',
        status: 'sufficient',
      },
      {
        id: 'br-2',
        question: 'プロジェクトの目的は何ですか？',
        answer:
          '対応時間の短縮、顧客満足度の向上、オペレーターの作業負荷低減を目的とします。',
        status: 'missing',
      },
      {
        id: 'br-3',
        question: '業務要求の優先順位は定義されていますか？',
        answer: '優先順位と判断基準の追記が必要です。',
        status: 'missing',
      },
    ],
  },
  {
    id: 'to-be-flow',
    title: '業務フロー（To-Be）',
    answers: [
      {
        id: 'flow-1',
        question: 'To-Be業務フローは定義されていますか？',
        answer:
          '問い合わせ受付から回答、エスカレーションまでの基本フローが定義されています。',
        status: 'sufficient',
      },
      {
        id: 'flow-2',
        question: '例外時の分岐は定義されていますか？',
        answer: '例外発生時の分岐条件を追記する必要があります。',
        status: 'missing',
      },
      {
        id: 'flow-3',
        question: '承認者不在時のフローは定義されていますか？',
        answer: '代理承認と自動エスカレーションの定義が不足しています。',
        status: 'missing',
      },
    ],
  },
  {
    id: 'system-requirements',
    title: 'システム要求一覧',
    answers: [
      {
        id: 'sr-1',
        question: '必須の非機能要件は何ですか？',
        answer:
          '可用性 99.9%、同時接続 500、主要画面の応答 2 秒以内を目標とします。',
        status: 'sufficient',
      },
      {
        id: 'sr-2',
        question: 'セキュリティ要件は定義されていますか？',
        answer: '権限管理と監査ログの保持要件を追記する必要があります。',
        status: 'missing',
      },
      {
        id: 'sr-3',
        question: '外部システムとの連携条件は定義されていますか？',
        answer: '連携方式と障害時の再送条件が不足しています。',
        status: 'missing',
      },
    ],
  },
  {
    id: 'functional-requirements',
    title: '機能要件一覧',
    answers: [
      {
        id: 'fr-1',
        question: '主要機能は網羅されていますか？',
        answer: 'チケット管理、FAQ検索、承認、通知の主要機能が定義されています。',
        status: 'sufficient',
      },
      {
        id: 'fr-2',
        question: '検索機能の詳細条件は定義されていますか？',
        answer: '検索対象、絞り込み条件、並び順の定義が不足しています。',
        status: 'missing',
      },
      {
        id: 'fr-3',
        question: '通知機能の発火条件は定義されていますか？',
        answer: '通知タイミングと再通知条件を追記する必要があります。',
        status: 'missing',
      },
    ],
  },
  {
    id: 'to-be-business',
    title: 'ToBe業務一覧',
    answers: [
      {
        id: 'tb-1',
        question: '将来業務の担当と役割は定義されていますか？',
        answer: '主要な担当部門と役割分担が定義されています。',
        status: 'sufficient',
      },
      {
        id: 'tb-2',
        question: '運用開始後の改善プロセスは定義されていますか？',
        answer: '改善要望の収集と優先順位付けのプロセスが不足しています。',
        status: 'missing',
      },
      {
        id: 'tb-3',
        question: '教育と引き継ぎ方法は定義されていますか？',
        answer: '教育計画と引き継ぎ完了条件を追記する必要があります。',
        status: 'missing',
      },
    ],
  },
];

export type SlideAiChatMessage = {
  id: string;
  role: 'ai' | 'user';
  content: string;
};

export function createSlideAiChatSeed(
  annotation: SlideTextAnnotation,
): SlideAiChatMessage[] {
  return [
    {
      id: `${annotation.id}-seed`,
      role: 'ai',
      content: `スライドの「${annotation.highlightText}」について相談できます。どのように編集したいか教えてください。`,
    },
  ];
}

export function createSlideAiChatReply(
  annotation: SlideTextAnnotation,
  userMessage: string,
  replyIndex: number,
): SlideAiChatMessage {
  const trimmed = userMessage.trim() || '方針の整理';
  if (replyIndex === 0) {
    return {
      id: `${annotation.id}-reply-${replyIndex}`,
      role: 'ai',
      content: [
        `「${trimmed}」を踏まえると、次の表現が候補です。`,
        '',
        `・${annotation.highlightText}の記述を、インプット由来の根拠に合わせて具体化する`,
        `・${annotation.source.citation} の内容と整合を取る`,
        '',
        '必要なら文言案をさらに絞り込みましょう。',
      ].join('\n'),
    };
  }

  return {
    id: `${annotation.id}-reply-${replyIndex}`,
    role: 'ai',
    content: [
      '追加のご要望を反映した案です。',
      '',
      `・「${annotation.highlightText}」を、より運用実態に近い表現へ調整`,
      '',
      'このままドラフトへ反映するか、条件をさらに指定してください。',
    ].join('\n'),
  };
}

export const CONFIRMATION_ISSUES: ConfirmationIssue[] = [
  {
    id: '1',
    priority: 'high',
    category: '矛盾',
    title: '業務要求一覧と業務フローでエスカレーション条件が異なります',
    question:
      '業務要求一覧には「承認者不在の場合は上長へ自動エスカレーション」と記載があるが、業務フローでは「担当者が手動で上申する」となっています。どちらを優先しますか？',
    detail:
      '業務要求一覧では「24時間以内にエスカレーション」と記載されていますが、業務フローでは「即時エスカレーション」となっており、条件が一致していません。',
    changePreview: [
      {
        id: '1-1',
        heading: '##変更箇所 1. 業務要求一覧（スライド3）',
        slideNumber: 3,
        before: [
          { text: '審査部門とは、社内の審査・承認を担当する部門を指します。' },
          {
            text: '要件定義書の第3章「組織と役割」に明記されており、業務フローとの整合性が確認されています。',
            highlight: 'removed',
          },
        ],
        after: [
          { text: '審査部門とは、社内の審査・承認を担当する部門を指します。' },
          {
            text: '承認者不在の場合は上長へ自動エスカレーションする。',
            highlight: 'added',
          },
          {
            text: '要件定義書の第3章「組織と役割」に明記されており、業務フローとの整合性が確認されています。',
          },
        ],
      },
      {
        id: '1-2',
        heading: '##変更箇所 2. 業務プロセス詳細（スライド4）',
        slideNumber: 4,
        before: [
          { text: '審査部門の具体的な業務プロセスは、' },
          { text: '申請受付から承認まで', highlight: 'removed' },
          {
            text: 'の各ステップで構成されており、各担当者の役割分担が明確化されています。',
          },
        ],
        after: [
          { text: '審査部門の具体的な業務プロセスは、' },
          {
            text: '申請受付から承認まで（承認者不在時は上長へ自動エスカレーション）',
            highlight: 'added',
          },
          {
            text: 'の各ステップで構成されており、各担当者の役割分担が明確化されています。',
          },
        ],
      },
      {
        id: '1-3',
        heading: '##変更箇所 3. システム連携要件（スライド5）',
        slideNumber: 5,
        before: [
          {
            text: '審査部門の業務効率化のため、社内システムとの連携が必須となっており、データの',
          },
          { text: 'リアルタイム共有と承認履歴の管理', highlight: 'removed' },
          { text: 'が求められています。' },
        ],
        after: [
          {
            text: '審査部門の業務効率化のため、社内システムとの連携が必須となっており、データの',
          },
          {
            text: 'リアルタイム共有と承認履歴の管理（自動エスカレーション含む）',
            highlight: 'added',
          },
          { text: 'が求められています。' },
        ],
      },
      {
        id: '1-4',
        heading: '##変更箇所 4. リスク管理と対策（スライド6）',
        slideNumber: 6,
        before: [
          {
            text: '審査業務に伴うリスクとして、不正申請や承認遅延が挙げられ、これらのリスクを低減するための監査体制と自動通知機能が導入されています。',
          },
        ],
        after: [
          {
            text: '審査業務に伴うリスクとして、不正申請や承認遅延が挙げられ、これらのリスクを低減するための監査体制と自動通知機能が導入されています。',
          },
        ],
      },
      {
        id: '1-5',
        heading: '##変更箇所 5. 運用ルール（スライド7）',
        slideNumber: 7,
        before: [
          {
            text: 'エスカレーション発生時は、担当者が手動で上長へ連絡し、口頭で状況を共有する運用とします。',
            highlight: 'removed',
          },
        ],
        after: [
          {
            text: 'エスカレーション発生時は、システムが自動的に上長へ通知し、承認履歴に記録される運用とします。',
            highlight: 'added',
          },
        ],
      },
      {
        id: '1-6',
        heading: '##変更箇所 6. 承認フロー詳細（スライド8）',
        slideNumber: 8,
        before: [
          { text: '一次承認はチームリーダーが行い、' },
          { text: '二次承認は部門長が手動で実施', highlight: 'removed' },
          { text: 'します。承認者不在時の代替フローは定義されていません。' },
        ],
        after: [
          { text: '一次承認はチームリーダーが行い、' },
          {
            text: '二次承認は部門長が実施（不在時は上長へ自動エスカレーション）',
            highlight: 'added',
          },
          { text: 'します。' },
        ],
      },
      {
        id: '1-7',
        heading: '##変更箇所 7. 監査ログ要件（スライド9）',
        slideNumber: 9,
        before: [
          {
            text: '承認操作のログは月次で手動エクスポートし、監査部門へメール送付する。',
            highlight: 'removed',
          },
        ],
        after: [
          {
            text: '承認操作のログはリアルタイムで監査システムへ連携し、エスカレーション履歴と合わせて保管する。',
            highlight: 'added',
          },
        ],
      },
      {
        id: '1-8',
        heading: '##変更箇所 8. 教育・引き継ぎ（スライド10）',
        slideNumber: 10,
        before: [
          {
            text: '新規担当者への引き継ぎは、前任者からの口頭説明を中心に実施する。',
          },
        ],
        after: [
          {
            text: '新規担当者への引き継ぎは、マニュアルとシステム上の承認履歴サンプルを用いて実施する。',
            highlight: 'added',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    priority: 'high',
    category: '曖昧',
    title: '「適切なタイミング」の判定基準が要件定義書に明記されていません',
    question:
      '要件定義書に「適切なタイミングで通知する」と記載されていますが、具体的な閾値や判定条件が定義されていません。どのように定義しますか？',
    detail:
      '要件定義書に「適切なタイミングで通知する」と記載されていますが、具体的な閾値や判定条件が定義されておらず、解釈が分かれる可能性があります。',
    changePreview: [
      {
        id: '2-1',
        heading: '##変更箇所 1. 通知要件（スライド3）',
        slideNumber: 3,
        before: [
          { text: 'システムはユーザーに対して' },
          { text: '適切なタイミング', highlight: 'removed' },
          { text: 'で通知を送信します。' },
        ],
        after: [
          { text: 'システムはユーザーに対して' },
          {
            text: '申請から24時間以内',
            highlight: 'added',
          },
          { text: 'で通知を送信します。' },
        ],
      },
    ],
  },
  {
    id: '3',
    priority: 'medium',
    category: '不足',
    title: '業務フローに登場する「審査部門」の定義が要件定義書に記載されていません',
    question:
      '業務フロー上で審査部門が関与するステップが複数ありますが、部門の役割・責任範囲が要件定義書に定義されていません。どのような定義を追記しますか？',
    detail:
      '業務フロー上で審査部門が関与するステップが複数ありますが、部門の役割・責任範囲が要件定義書に定義されていません。',
    changePreview: [
      {
        id: '3-1',
        heading: '##変更箇所 1. 組織と役割（スライド2）',
        slideNumber: 2,
        before: [
          {
            text: '本プロジェクトに関与する組織は、カスタマーサポート部と情報システム部です。',
          },
        ],
        after: [
          {
            text: '本プロジェクトに関与する組織は、カスタマーサポート部、情報システム部、',
          },
          {
            text: 'ならびに審査部門（社内の審査・承認を担当する部門）',
            highlight: 'added',
          },
          { text: 'です。' },
        ],
      },
    ],
  },
  {
    id: '4',
    priority: 'low',
    category: '提案',
    title: '例外処理のエラーハンドリング手順を業務要件定義書に追記することを推奨します',
    question:
      '審査部門での例外発生時のエスカレーション先や記録方法が未記載です。どのような手順を追記しますか？',
    detail:
      '審査部門での例外発生時のエスカレーション先や記録方法が未記載のため、運用時の属人化を防ぐ観点で追記を提案します。',
    changePreview: [
      {
        id: '4-1',
        heading: '##変更箇所 1. 例外処理（スライド7）',
        slideNumber: 7,
        before: [
          {
            text: '通常フロー以外のケースについては、担当者が個別に判断します。',
          },
        ],
        after: [
          {
            text: '通常フロー以外のケースについては、担当者が個別に判断します。',
          },
          {
            text: '例外発生時は上長へエスカレーションし、対応内容をシステム上に記録します。',
            highlight: 'added',
          },
        ],
      },
    ],
  },
  {
    id: '5',
    priority: 'medium',
    category: '不足',
    title: 'システム設計書と業務要件定義書で承認フローの担当者名が一致していません',
    question:
      'システム設計書と業務要件定義書で承認フローの担当者名が異なっています。どちらを正としますか？',
    detail:
      'システム設計書では「マネージャー承認」、業務要件定義書では「課長承認」となっており、担当者名が一致していません。',
    changePreview: [
      {
        id: '5-1',
        heading: '##変更箇所 1. 承認フロー（スライド4）',
        slideNumber: 4,
        before: [
          { text: '承認は' },
          { text: 'マネージャー', highlight: 'removed' },
          { text: 'が行います。' },
        ],
        after: [
          { text: '承認は' },
          { text: '課長', highlight: 'added' },
          { text: 'が行います。' },
        ],
      },
    ],
  },
];

export const COLLABORATOR_AVATARS: AvatarStackItem[] = [
  { name: '担当者', initials: '担', colorIndex: 1 },
  { name: '佐藤太郎', initials: '佐', colorIndex: 2 },
];

/** Canned quick-generate answers per confirmation issue (index 0 = first, 1 = regenerate). */
export const AI_GENERATED_ANSWERS: Record<string, string[]> = {
  '1': [
    '業務フロー側の「担当者が手動で上申する」を優先し、業務要求一覧の自動エスカレーション記載を手動上申に合わせて修正します。',
    '業務フローの手動上申を正とし、要求一覧の自動エスカレーション文言を「担当者による上申」へ統一して矛盾を解消します。',
  ],
  '2': [
    '「適切なタイミング」は申請受付から24時間以内に通知することと定義し、要件定義書に閾値を追記します。',
    '「適切なタイミング」を申請受付後24時間以内と明記し、超過時のリマインド条件も要件定義書へ追記します。',
  ],
  '3': [
    '審査部門は申請の妥当性確認と承認可否の判断を担う部門とし、要件定義書の組織・役割に追記します。',
    '審査部門を「申請妥当性の確認と承認判断を行う部門」と定義し、組織・役割の節へ追記します。',
  ],
  '4': [
    '例外発生時は上長へエスカレーションし、対応内容をシステム上に記録する手順を業務要件へ追記します。',
    '例外時は上長へエスカレーションしたうえで対応内容をシステムに記録する運用手順を業務要件へ追記します。',
  ],
  '5': [
    '業務要件定義書の「課長承認」を正とし、システム設計書のマネージャー表記を課長に合わせます。',
    '承認者は業務要件定義書どおり「課長」に統一し、システム設計書のマネージャー表記を課長へ修正します。',
  ],
};

export type IssueChatRole = 'ai' | 'user';

export type IssueChatMessage = {
  id: string;
  role: IssueChatRole;
  content: string;
  /** Short answer applied to the card when この回答を使う is pressed. */
  usableAnswer?: string;
};

export function createIssueChatSeed(issue: ConfirmationIssue): IssueChatMessage[] {
  return [
    {
      id: `${issue.id}-seed-ai`,
      role: 'ai',
      content: `「${issue.title}」について相談できます。どの点を優先して決めたいか教えてください。`,
    },
  ];
}

/** Mock AI reply after the user sends a chat message for an issue. */
export function createIssueChatReply(
  issue: ConfirmationIssue,
  userMessage: string,
  replyIndex: number,
): IssueChatMessage {
  const usableAnswer = getAiGeneratedAnswer(issue.id, replyIndex);

  if (replyIndex === 0) {
    return {
      id: `${issue.id}-reply-${replyIndex}`,
      role: 'ai',
      usableAnswer,
      content: [
        `ご意向「${userMessage.trim() || '方針の整理'}」を踏まえると、次のように整理できます。`,
        '',
        `・${usableAnswer}`,
        '・関連する業務フロー／要求一覧の記載を揃える',
        '・反映後に矛盾が残らないか再点検する',
        '',
        'この方針でドラフトへ反映して問題なければ、「この回答を使う」を押してください。',
      ].join('\n'),
    };
  }

  return {
    id: `${issue.id}-reply-${replyIndex}`,
    role: 'ai',
    usableAnswer,
    content: [
      '追加のご要望を反映した案です。',
      '',
      `・${usableAnswer}`,
      '',
      '必要ならさらに条件を絞り込みましょう。',
    ].join('\n'),
  };
}

function getAiGeneratedAnswer(issueId: string, generationIndex: number): string {
  const variants = AI_GENERATED_ANSWERS[issueId] ?? [
    '回答案を生成しました。内容を確認のうえ反映してください。',
  ];
  return variants[generationIndex % variants.length] ?? variants[0]!;
}

export { getAiGeneratedAnswer };
