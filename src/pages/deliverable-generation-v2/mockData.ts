export type DeliverableType = {
  id: string;
  label: string;
};

export type OutlineItem = {
  id: string;
  label: string;
  level: 'chapter' | 'section';
  defaultChecked?: boolean;
};

export type InputSource = {
  id: string;
  title: string;
  description?: string;
};

export type GenerationMode = {
  id: string;
  title: string;
  description: string;
};

export const DELIVERABLE_TYPES: DeliverableType[] = [
  { id: 'business-requirements', label: '業務要件定義書' },
  { id: 'rfp', label: 'RFP' },
  { id: 'rfi', label: 'RFI' },
  { id: 'proposal', label: '提案書' },
  { id: 'project-plan', label: 'プロジェクト計画書' },
  { id: 'system-requirements', label: 'システム要件定義書' },
  { id: 'design-doc', label: '設計書' },
];

export const OUTLINE_ITEMS: OutlineItem[] = [
  { id: 'ch1', label: '第1章 はじめに', level: 'chapter', defaultChecked: true },
  { id: 'ch1-1', label: '1. プロジェクトの背景', level: 'section', defaultChecked: true },
  { id: 'ch1-2', label: '2. プロジェクトの目的', level: 'section', defaultChecked: true },
  { id: 'ch2', label: '第2章 業務要件', level: 'chapter' },
  { id: 'ch2-1', label: '1. 業務要求一覧', level: 'section' },
  { id: 'ch2-2', label: '2. AsIS業務要求一覧', level: 'section' },
  { id: 'ch2-3', label: '3. ToBe業務一覧', level: 'section' },
  { id: 'ch2-4', label: '4. 非機能要件', level: 'section' },
];

export const INPUT_SOURCES: InputSource[] = [
  {
    id: 'local',
    title: 'ローカルファイルから選択',
    description: '対応形式: PDF, PPTX, DOCX, XLSX, TXT',
  },
  { id: 'ai-data', title: 'AI用データ連携資料から選択' },
  { id: 'minutes', title: '議事録から選択' },
];

export const GENERATION_MODES: GenerationMode[] = [
  {
    id: 'speed',
    title: '速度優先',
    description: '検討初期段階やテキストメモ等の簡易インプット時に推奨',
  },
  {
    id: 'quality',
    title: '品質優先',
    description: '検討が進み多様なインプットを基に精緻に出力したい時に推奨',
  },
];

export const DEFAULT_DOCUMENT_NAME = 'CRMシステム提案 v1.0';
export const DEFAULT_FORMAT_LABEL = '業務要件定義書';
export const DEFAULT_ATTACHED_FILE = 'document.pdf';

export type KantenHearingPoint = {
  id: string;
  question: string;
  relatedFiles: string[];
};

export type KantenCategory = {
  id: string;
  title: string;
  hearingPoints?: KantenHearingPoint[];
};

const COVER_RELATED_FILES = [
  '会社概要・組織図（宛先担当者の正式な所属・役職確認用）',
  'RFP（提案依頼書）または提案要件定義書（タイトル・目的の確認用）',
  '過去の提案書サンプル（表紙フォーマットの踏襲ルール確認用）',
];

export const KANTEN_CATEGORIES: KantenCategory[] = [
  {
    id: 'cover',
    title: '表紙',
    hearingPoints: [
      {
        id: 'cover-1',
        question:
          '提案書の宛先となる会社名・部署名・担当者名を正式名称で教えていただけますか？',
        relatedFiles: COVER_RELATED_FILES,
      },
      {
        id: 'cover-2',
        question:
          '提案書のタイトルや副題として使用したいキーワード・テーマはありますか？',
        relatedFiles: COVER_RELATED_FILES,
      },
      {
        id: 'cover-3',
        question:
          '提案書の宛先となる会社名・部署名・担当者名を正式名称で教えていただけますか？',
        relatedFiles: COVER_RELATED_FILES,
      },
    ],
  },
  { id: 'business-flow-tobe', title: '業務フロー（To-Be）' },
  { id: 'system-requirements', title: 'システム要求一覧' },
  { id: 'functional-requirements', title: '機能要件一覧' },
  { id: 'tobe-operations', title: 'ToBe業務一覧' },
];

export const KANTEN_LOADING_TITLE = '成果物に必要なインプット';
export const KANTEN_LOADING_TEXT = '読み込み中...';
export const KANTEN_DRAWER_TITLE = '成果物に必要なインプット';
export const KANTEN_DRAWER_SUBTITLE = `${DEFAULT_FORMAT_LABEL}の観点`;
export const KANTEN_HEARING_SECTION_LABEL = 'ヒアリングで確認する情報';
export const KANTEN_RELATED_FILES_LABEL = '関連資料の例';
export const KANTEN_ADD_TO_ITEM_LABEL = 'この項目に追加';

export const ANALYSIS_INFO_PANEL_TITLE = 'インプット充足度分析とは';
export const ANALYSIS_INFO_PANEL_BODY = [
  'AIがユーザーの添付したインプットの内容を確認し、選択したフォーマットの観点に基づいて情報の充足度をチェックします。',
  '不足している項目がある場合はその内容を提示し、追加の情報入力を促します。実行しなくてもドラフト生成は可能ですが、事前にインプット分析を行うことで不足情報の補完ができ、追加した情報がドラフトにどう反映されるかをプレビューで確認しながら進められます。',
];
export const ANALYSIS_TOGGLE_LABEL = 'インプット充足度分析実行';
export const ANALYSIS_TOGGLE_TAG = '推奨';
export type AnalysisQuestionStatus = 'sufficient' | 'insufficient';

export type AnalysisQuestion = {
  id: string;
  label: string;
  status: AnalysisQuestionStatus;
  defaultValue?: string;
};

export type AnalysisSection = {
  id: string;
  title: string;
  questions: AnalysisQuestion[];
};

export type AnalysisResultCategory = {
  id: string;
  title: string;
  sections: AnalysisSection[];
};

export type AnalysisChatAttachment = {
  fileName: string;
  fileExtension?: string;
  fileType?: 'document' | 'image';
  imageSrc?: string;
  imageAlt?: string;
  /** Object URL retained for image previews in the thread. */
  objectUrl?: string;
};

export type AnalysisChatMessage = {
  id: string;
  role: 'ai' | 'user';
  content: string;
  attachment?: AnalysisChatAttachment;
};

const ANALYSIS_SAMPLE_QUESTIONS: AnalysisQuestion[] = [
  {
    id: 'q-1',
    label: '（課題チケット単位など）で番号を割り振る想定ですか？',
    status: 'insufficient',
  },
  {
    id: 'q-2',
    label:
      '（連番の起点など）はすでに決まっていますか？決まっている場合、その具体的な形式を教えてください？',
    status: 'insufficient',
  },
  {
    id: 'q-3',
    label:
      '既存のプロジェクト管理ツールや課題管理システムと番号を紐づける必要がありますか？紐づける場合、どのシステムのどの識別子と対応させますか？',
    status: 'sufficient',
    defaultValue: 'Jira の課題キーと対応させる想定です。',
  },
];

export const ANALYSIS_RESULT_CATEGORIES: AnalysisResultCategory[] = [
  {
    id: 'business-requirements',
    title: '業務要求一覧',
    sections: [
      {
        id: 'section-1',
        title: '1. プロジェクトの背景',
        questions: ANALYSIS_SAMPLE_QUESTIONS,
      },
    ],
  },
  {
    id: 'business-flow-tobe',
    title: '業務フロー（To-Be）',
    sections: [
      {
        id: 'business-flow-section-1',
        title: '1. To-Be業務フロー',
        questions: [
          {
            id: 'q-flow-1',
            label: '業務フローの開始条件は定義されていますか？',
            status: 'sufficient',
            defaultValue: '受注登録の完了を開始条件とします。',
          },
          {
            id: 'q-flow-2',
            label: '例外時の分岐条件は定義されていますか？',
            status: 'insufficient',
          },
          {
            id: 'q-flow-3',
            label: '各工程の担当部門は確定していますか？',
            status: 'insufficient',
          },
        ],
      },
    ],
  },
  {
    id: 'system-requirements',
    title: 'システム要求一覧',
    sections: [
      {
        id: 'system-section-1',
        title: '1. 管理画面のチケットの切り方',
        questions: [
          {
            id: 'q-sys-1',
            label: 'スプリントチケットにはどのような命名規則を使用しますか？',
            status: 'sufficient',
            defaultValue:
              '各スプリントで「PROJ-S01-012」形式を採用します。スプリント番号とチケット番号を組み合わせることで、プロジェクト全体の進捗状況や作業の時系列管理が容易になります。',
          },
          {
            id: 'q-sys-4',
            label: 'チケットの担当者はどのように割り振りますか？',
            status: 'insufficient',
          },
          {
            id: 'q-sys-5',
            label:
              '外部の課題管理システムとの連携は必要ですか？必要な場合、どのシステムと連携しますか？',
            status: 'insufficient',
          },
        ],
      },
    ],
  },
  {
    id: 'functional-requirements',
    title: '機能要件一覧',
    sections: [
      {
        id: 'functional-section-1',
        title: '1. 機能要件',
        questions: [
          {
            id: 'q-function-1',
            label: '主要機能の利用者は定義されていますか？',
            status: 'sufficient',
            defaultValue: '管理者と一般利用者を想定しています。',
          },
          {
            id: 'q-function-2',
            label: '機能ごとの権限制御は定義されていますか？',
            status: 'insufficient',
          },
          {
            id: 'q-function-3',
            label: 'エラー時の表示内容は定義されていますか？',
            status: 'insufficient',
          },
        ],
      },
    ],
  },
  {
    id: 'tobe-operations',
    title: 'ToBe業務一覧',
    sections: [
      {
        id: 'tobe-section-1',
        title: '1. To-Be業務',
        questions: [
          {
            id: 'q-tobe-1',
            label: 'To-Be業務の目的は定義されていますか？',
            status: 'sufficient',
            defaultValue: '受注から出荷までのリードタイム短縮を目的とします。',
          },
          {
            id: 'q-tobe-2',
            label: '現行業務からの変更点は整理されていますか？',
            status: 'insufficient',
          },
          {
            id: 'q-tobe-3',
            label: '業務移行の条件は定義されていますか？',
            status: 'insufficient',
          },
        ],
      },
    ],
  },
];

export const ANALYSIS_RESULT_DRAWER_TITLE = 'インプット診断レポート';
export const ANALYSIS_RESULT_LOADING_TEXT = '分析中...';
export const ANALYSIS_DRAFT_SNACKBAR_TITLE = 'ドラフトを作成しました';

export const ANALYSIS_AI_PANEL_TITLE = 'AIと対話して作成';
export const ANALYSIS_AI_PANEL_SUBTITLE =
  '質問への回答をAIと一緒に作成できます。';

export const ANALYSIS_AI_GREETING =
  'この質問への回答を一緒に作成しましょう。わかっている範囲で構いませんので、現状を教えてください。';

export const ANALYSIS_AI_MOCK_REPLY =
  'ありがとうございます。いただいた内容をもとに回答案を作成しました。必要であれば追記や修正をお願いします。';

export const ANALYSIS_AI_REVISE_PROMPT_SUFFIX = 'の質問への回答を修正したいです。';
export const ANALYSIS_AI_REVISE_REPLY =
  'もちろんです。どのように回答を修正されたいか、具体的な内容を教えていただけますか？';

export const ANALYSIS_AI_GENERATED_ANSWERS: Record<string, string[]> = {
  'q-1': [
    '課題チケット単位で番号を割り振る想定です。プロジェクト略称を接頭辞に付与します。',
    'エピック／ストーリー単位ではなく、課題チケット単位での採番を前提とします。',
  ],
  'q-2': [
    '連番はプロジェクト開始時点を起点とし、「PROJ-0001」形式で採番します。',
    '年度ごとにリセットし、「YY-0001」形式で管理する想定です。',
  ],
  'q-sys-4': [
    '担当者はスプリント計画時にスクラムマスターが割り当て、負荷を平準化します。',
  ],
  'q-sys-5': [
    'Jira との双方向連携を行い、課題キーを共通識別子として同期します。',
  ],
};

export function getAnalysisAiGeneratedAnswer(
  questionId: string,
  generationIndex: number,
): string {
  const variants = ANALYSIS_AI_GENERATED_ANSWERS[questionId] ?? [
    'インプット内容をもとに回答案を作成しました。必要に応じて編集してください。',
  ];
  return variants[generationIndex % variants.length] ?? variants[0]!;
}
export const BUSINESS_FLOW_CATEGORY_ID = 'business-flow-tobe';

export const BUSINESS_FLOW_DRAFT_TEXT = `[推定フロー]
├─ 営業：注文受付
　　└─ 受注内容の確認・顧客へ通知
├─ 生産管理：在庫引当
　　├─ 在庫確保・出荷準備の開始
　　└─ 在庫あり？
　　　　├─ あり：出荷指示
　　　　└─ なし：緊急調達
├─ 倉庫：ピッキング/出荷
　　└─ 出荷伝票の作成・梱包・検品
├─ 配送手配
　　└─ 運送会社への引き渡し・追跡番号の発行
├─ 顧客への出荷完了通知
　　└─ 納品予定日・追跡情報の連絡
└─ 経理：請求処理
　　└─ 請求書の発行・入金確認`;

export const BUSINESS_FLOW_GENERATE_LABEL = '図を生成';
export const BUSINESS_FLOW_PANEL_TITLE = 'AIと対話して作成';
export const BUSINESS_FLOW_PANEL_SUBTITLE = '業務フロー図を確認・修正できます。';
export const BUSINESS_FLOW_AI_GREETING =
  '業務フロー図を生成しました。修正したい点があれば教えてください。';
export const BUSINESS_FLOW_AI_MOCK_REPLY =
  'ありがとうございます。いただいた内容をもとにフロー図を更新しました。必要であれば追記や修正をお願いします。';

export type BusinessFlowChartStep = {
  id: string;
  number: number;
  title: string;
  description: string;
};

export type BusinessFlowChartDecision = {
  label: string;
  yesLabel: string;
  noLabel: string;
  noStep: BusinessFlowChartStep;
};

export type BusinessFlowChartData = {
  title: string;
  subtitle: string;
  stepsBeforeDecision: BusinessFlowChartStep[];
  decision: BusinessFlowChartDecision;
  stepsAfterDecision: BusinessFlowChartStep[];
  endLabel: string;
};

export const BUSINESS_FLOW_CHART: BusinessFlowChartData = {
  title: '受注・出荷管理業務フロー',
  subtitle: 'Order Fulfillment Standard Operating Procedure',
  stepsBeforeDecision: [
    {
      id: 'step-1',
      number: 1,
      title: '営業：注文受付',
      description: '受注内容の確認・顧客へ通知',
    },
    {
      id: 'step-2',
      number: 2,
      title: '生産管理：在庫引当',
      description: '在庫確保・出荷準備の開始',
    },
  ],
  decision: {
    label: '在庫あり？',
    yesLabel: 'はい',
    noLabel: 'いいえ',
    noStep: {
      id: 'step-3',
      number: 3,
      title: '緊急調達',
      description: 'サプライヤーへの発注・納期確認',
    },
  },
  stepsAfterDecision: [
    {
      id: 'step-4',
      number: 4,
      title: '倉庫：ピッキング/出荷',
      description: '出荷伝票の作成・梱包・検品',
    },
    {
      id: 'step-5',
      number: 5,
      title: '配送手配',
      description: '運送会社への引き渡し・追跡番号の発行',
    },
    {
      id: 'step-6',
      number: 6,
      title: '顧客への出荷完了通知',
      description: '納品予定日・追跡情報の連絡',
    },
    {
      id: 'step-7',
      number: 7,
      title: '経理：請求処理',
      description: '請求書の発行・入金確認',
    },
  ],
  endLabel: '業務完了',
};

export function buildAnalysisInitialAnswers() {
  const answers: Record<string, string> = {};
  for (const category of ANALYSIS_RESULT_CATEGORIES) {
    for (const section of category.sections) {
      for (const question of section.questions) {
        answers[question.id] = question.defaultValue ?? '';
      }
    }
  }
  return answers;
}

export function isAnalysisQuestionAnswered(
  questionId: string,
  savedAnswers: Record<string, string>,
) {
  return (savedAnswers[questionId] ?? '').trim().length > 0;
}

export function getCategoryAnswerCounts(
  category: AnalysisResultCategory,
  savedAnswers: Record<string, string>,
) {
  let sufficientCount = 0;
  let insufficientCount = 0;
  for (const section of category.sections) {
    for (const question of section.questions) {
      if (isAnalysisQuestionAnswered(question.id, savedAnswers)) {
        sufficientCount += 1;
      } else {
        insufficientCount += 1;
      }
    }
  }
  return { sufficientCount, insufficientCount };
}

export function getDiagnosisAnswerCounts(savedAnswers: Record<string, string>) {
  let sufficientCount = 0;
  let insufficientCount = 0;
  for (const category of ANALYSIS_RESULT_CATEGORIES) {
    const counts = getCategoryAnswerCounts(category, savedAnswers);
    sufficientCount += counts.sufficientCount;
    insufficientCount += counts.insufficientCount;
  }
  return { sufficientCount, insufficientCount };
}

export function findAnalysisQuestion(questionId: string) {
  for (const category of ANALYSIS_RESULT_CATEGORIES) {
    for (const section of category.sections) {
      const question = section.questions.find((item) => item.id === questionId);
      if (question) {
        return { category, section, question };
      }
    }
  }
  return null;
}
