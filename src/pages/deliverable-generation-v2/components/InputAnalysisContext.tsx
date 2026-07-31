import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  createAttachmentFromFile,
  revokeComposerAttachmentUrl,
  type TextAreaComposerAttachment,
} from '@/components/Chat/TextAreaComposer/textAreaComposerAttachment';
import {
  ANALYSIS_AI_GREETING,
  ANALYSIS_AI_MOCK_REPLY,
  ANALYSIS_AI_REVISE_PROMPT_SUFFIX,
  ANALYSIS_AI_REVISE_REPLY,
  BUSINESS_FLOW_AI_MOCK_REPLY,
  BUSINESS_FLOW_DRAFT_TEXT,
  DEFAULT_ATTACHED_FILE,
  buildAnalysisInitialAnswers,
  findAnalysisQuestion,
  getAnalysisAiGeneratedAnswer,
  type AnalysisChatMessage,
} from '../mockData';

type AttachedInput = Pick<
  TextAreaComposerAttachment,
  'fileName' | 'fileExtension' | 'fileType' | 'imageSrc' | 'imageAlt' | 'objectUrl'
> & {
  id: string;
};

type InputAnalysisContextValue = {
  hasUpload: boolean;
  attachedInputs: AttachedInput[];
  analysisEnabled: boolean;
  analyzing: boolean;
  kantenOpen: boolean;
  kantenLoading: boolean;
  analysisInfoOpen: boolean;
  resultOpen: boolean;
  resultLoading: boolean;
  aiPanelOpen: boolean;
  selectedQuestionId: string | null;
  answerDrafts: Record<string, string>;
  savedAnswers: Record<string, string>;
  isEditingAnswer: (questionId: string) => boolean;
  isGeneratingAnswer: (questionId: string) => boolean;
  isAiAnswer: (questionId: string) => boolean;
  chatMessages: AnalysisChatMessage[];
  aiThinking: boolean;
  flowDraft: string;
  savedFlow: string;
  flowEditing: boolean;
  generateDiagram: boolean;
  flowChatMessages: AnalysisChatMessage[];
  flowAiThinking: boolean;
  generateLabel: string;
  uploadFile: (file?: File) => void;
  removeUpload: (id: string) => void;
  setAnalysisEnabled: (enabled: boolean) => void;
  openKanten: () => void;
  closeKanten: () => void;
  openAnalysisInfo: () => void;
  closeAnalysisInfo: () => void;
  startAnalysis: () => void;
  closeResult: () => void;
  openAiPanel: (questionId: string) => void;
  closeAiPanel: () => void;
  setAnswerDraft: (questionId: string, value: string) => void;
  startEditingAnswer: (questionId: string) => void;
  cancelEditingAnswer: (questionId: string) => void;
  saveAnswer: (questionId: string, value?: string) => void;
  generateAnswer: (questionId: string) => void;
  regenerateAnswer: (questionId: string) => void;
  sendChatMessage: (
    content: string,
    attachment?: AnalysisChatMessage['attachment'],
  ) => void;
  setFlowDraft: (value: string) => void;
  startFlowEdit: () => void;
  cancelFlowEdit: () => void;
  saveFlow: () => void;
  setGenerateDiagram: (enabled: boolean) => void;
  closeFlowPanel: () => void;
  sendFlowChatMessage: (
    content: string,
    attachment?: AnalysisChatMessage['attachment'],
  ) => void;
  createDraft: () => void;
};

const ANALYZING_DURATION_MS = 1200;
const KANTEN_LOADING_DURATION_MS = 1200;
const RESULT_LOADING_DURATION_MS = 1200;
const AI_THINKING_DELAY_MS = 3000;
const AI_REPLY_DELAY_MS = 800;
const AI_GENERATE_MS = 2600;

const InputAnalysisContext = createContext<InputAnalysisContextValue | null>(null);

let chatMessageId = 0;

function nextChatMessageId() {
  chatMessageId += 1;
  return `chat-${chatMessageId}`;
}

function revokeChatAttachmentUrls(messages: AnalysisChatMessage[]) {
  for (const message of messages) {
    if (message.attachment?.objectUrl) {
      URL.revokeObjectURL(message.attachment.objectUrl);
    }
  }
}

export function InputAnalysisProvider({ children }: { children: ReactNode }) {
  const [attachedInputs, setAttachedInputs] = useState<AttachedInput[]>([]);
  const [analysisEnabled, setAnalysisEnabled] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [kantenOpen, setKantenOpen] = useState(false);
  const [kantenLoading, setKantenLoading] = useState(false);
  const [analysisInfoOpen, setAnalysisInfoOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  );
  const [answerDrafts, setAnswerDrafts] = useState(buildAnalysisInitialAnswers);
  const [savedAnswers, setSavedAnswers] = useState(buildAnalysisInitialAnswers);
  const [editingQuestionIds, setEditingQuestionIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [generatingQuestionIds, setGeneratingQuestionIds] = useState<
    Set<string>
  >(() => new Set());
  const [answerSources, setAnswerSources] = useState<
    Record<string, 'ai' | 'manual'>
  >({});
  const [chatMessages, setChatMessages] = useState<AnalysisChatMessage[]>([]);
  const [aiThinking, setAiThinking] = useState(false);
  const [flowDraft, setFlowDraftState] = useState(BUSINESS_FLOW_DRAFT_TEXT);
  const [savedFlow, setSavedFlow] = useState(BUSINESS_FLOW_DRAFT_TEXT);
  const [flowEditing, setFlowEditing] = useState(false);
  const [generateDiagram, setGenerateDiagramState] = useState(false);
  const [flowChatMessages, setFlowChatMessages] = useState<
    AnalysisChatMessage[]
  >([]);
  const [flowAiThinking, setFlowAiThinking] = useState(false);

  const analyzingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const kantenTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const resultTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const aiReplyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const flowAiReplyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const generateTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const generationIndexesRef = useRef<Record<string, number>>({});

  const startAnalyzing = useCallback(() => {
    setAnalyzing(true);
    clearTimeout(analyzingTimer.current);
    analyzingTimer.current = setTimeout(() => {
      setAnalyzing(false);
    }, ANALYZING_DURATION_MS);
  }, []);

  const uploadFile = useCallback((file?: File) => {
    const next = file
      ? createAttachmentFromFile(file)
      : {
          fileName: DEFAULT_ATTACHED_FILE,
          fileType: 'document' as const,
        };

    setAttachedInputs((prev) => [
      ...prev,
      {
        id: `upload-${Date.now()}-${prev.length}`,
        fileName: next.fileName,
        fileExtension: 'fileExtension' in next ? next.fileExtension : undefined,
        fileType: next.fileType,
        imageSrc: 'imageSrc' in next ? next.imageSrc : undefined,
        imageAlt: 'imageAlt' in next ? next.imageAlt : undefined,
        objectUrl: 'objectUrl' in next ? next.objectUrl : undefined,
      },
    ]);
  }, []);

  const removeUpload = useCallback((id: string) => {
    setAttachedInputs((prev) => {
      const target = prev.find((item) => item.id === id);
      revokeComposerAttachmentUrl(target);
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const attachedInputsRef = useRef(attachedInputs);
  attachedInputsRef.current = attachedInputs;

  useEffect(() => {
    return () => {
      for (const item of attachedInputsRef.current) {
        revokeComposerAttachmentUrl(item);
      }
    };
  }, []);

  const changeAnalysisEnabled = useCallback(
    (enabled: boolean) => {
      setAnalysisEnabled(enabled);
      startAnalyzing();
    },
    [startAnalyzing],
  );

  const closeAiPanel = useCallback(() => {
    setAiPanelOpen(false);
    setSelectedQuestionId(null);
    setChatMessages((prev) => {
      revokeChatAttachmentUrls(prev);
      return [];
    });
    setAiThinking(false);
    clearTimeout(aiReplyTimer.current);
  }, []);

  const closeFlowPanel = useCallback(() => {
    setGenerateDiagramState(false);
    setFlowChatMessages((prev) => {
      revokeChatAttachmentUrls(prev);
      return [];
    });
    setFlowAiThinking(false);
    clearTimeout(flowAiReplyTimer.current);
  }, []);

  const openKanten = useCallback(() => {
    setAnalysisInfoOpen(false);
    setResultOpen(false);
    setResultLoading(false);
    closeAiPanel();
    closeFlowPanel();
    setKantenOpen(true);
    setKantenLoading(true);
    clearTimeout(kantenTimer.current);
    kantenTimer.current = setTimeout(() => {
      setKantenLoading(false);
    }, KANTEN_LOADING_DURATION_MS);
  }, [closeAiPanel, closeFlowPanel]);

  const closeKanten = useCallback(() => {
    setKantenOpen(false);
  }, []);

  const openAnalysisInfo = useCallback(() => {
    setKantenOpen(false);
    setResultOpen(false);
    setResultLoading(false);
    closeAiPanel();
    closeFlowPanel();
    setAnalysisInfoOpen(true);
  }, [closeAiPanel, closeFlowPanel]);

  const closeAnalysisInfo = useCallback(() => {
    setAnalysisInfoOpen(false);
  }, []);

  const closeResult = useCallback(() => {
    setResultOpen(false);
    setResultLoading(false);
    closeAiPanel();
    closeFlowPanel();
    setFlowEditing(false);
  }, [closeAiPanel, closeFlowPanel]);

  const startAnalysis = useCallback(() => {
    setKantenOpen(false);
    setAnalysisInfoOpen(false);
    closeAiPanel();
    closeFlowPanel();
    setFlowEditing(false);
    setResultOpen(true);
    setResultLoading(true);
    startAnalyzing();
    clearTimeout(resultTimer.current);
    resultTimer.current = setTimeout(() => {
      setResultLoading(false);
    }, RESULT_LOADING_DURATION_MS);
  }, [closeAiPanel, closeFlowPanel, startAnalyzing]);

  const openAiPanel = useCallback(
    (questionId: string) => {
      const match = findAnalysisQuestion(questionId);
      if (!match) return;

      closeFlowPanel();
      setSelectedQuestionId(questionId);
      setAiPanelOpen(true);
      clearTimeout(aiReplyTimer.current);

      const hasExistingAnswer = (savedAnswers[questionId] ?? '').trim().length > 0;

      if (hasExistingAnswer) {
        setChatMessages([
          {
            id: nextChatMessageId(),
            role: 'user',
            content: `${match.question.label}${ANALYSIS_AI_REVISE_PROMPT_SUFFIX}`,
          },
        ]);
        setAiThinking(true);
        aiReplyTimer.current = setTimeout(() => {
          setAiThinking(false);
          setChatMessages((prev) => [
            ...prev,
            {
              id: nextChatMessageId(),
              role: 'ai',
              content: ANALYSIS_AI_REVISE_REPLY,
            },
          ]);
        }, AI_THINKING_DELAY_MS);
        return;
      }

      setChatMessages([]);
      setAiThinking(true);
      aiReplyTimer.current = setTimeout(() => {
        setAiThinking(false);
        setChatMessages([
          {
            id: nextChatMessageId(),
            role: 'ai',
            content: ANALYSIS_AI_GREETING,
          },
        ]);
      }, AI_THINKING_DELAY_MS);
    },
    [closeFlowPanel, savedAnswers],
  );

  const setAnswerDraft = useCallback((questionId: string, value: string) => {
    setAnswerDrafts((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const startEditingAnswer = useCallback((questionId: string) => {
    setEditingQuestionIds((prev) => {
      if (prev.has(questionId)) return prev;
      const next = new Set(prev);
      next.add(questionId);
      return next;
    });
  }, []);

  const cancelEditingAnswer = useCallback(
    (questionId: string) => {
      setEditingQuestionIds((prev) => {
        if (!prev.has(questionId)) return prev;
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      });
      setAnswerDrafts((prev) => ({
        ...prev,
        [questionId]: savedAnswers[questionId] ?? '',
      }));
    },
    [savedAnswers],
  );

  const isEditingAnswer = useCallback(
    (questionId: string) => editingQuestionIds.has(questionId),
    [editingQuestionIds],
  );

  const isGeneratingAnswer = useCallback(
    (questionId: string) => generatingQuestionIds.has(questionId),
    [generatingQuestionIds],
  );

  const isAiAnswer = useCallback(
    (questionId: string) => answerSources[questionId] === 'ai',
    [answerSources],
  );

  const saveAnswer = useCallback(
    (questionId: string, value?: string) => {
      const nextValue = value ?? answerDrafts[questionId] ?? '';
      setAnswerDrafts((prev) => ({ ...prev, [questionId]: nextValue }));
      setSavedAnswers((prev) => ({ ...prev, [questionId]: nextValue }));
      setEditingQuestionIds((prev) => {
        if (!prev.has(questionId)) return prev;
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      });
    },
    [answerDrafts],
  );

  const runAiGeneration = useCallback((questionId: string) => {
    const existing = generateTimers.current.get(questionId);
    if (existing != null) clearTimeout(existing);

    setGeneratingQuestionIds((prev) => new Set(prev).add(questionId));
    setEditingQuestionIds((prev) => {
      const next = new Set(prev);
      next.delete(questionId);
      return next;
    });

    const nextIndex = generationIndexesRef.current[questionId] ?? 0;
    generationIndexesRef.current[questionId] = nextIndex + 1;

    const timer = setTimeout(() => {
      const generated = getAnalysisAiGeneratedAnswer(questionId, nextIndex);
      setAnswerDrafts((drafts) => ({
        ...drafts,
        [questionId]: generated,
      }));
      setAnswerSources((prev) => ({ ...prev, [questionId]: 'ai' }));
      setGeneratingQuestionIds((ids) => {
        const next = new Set(ids);
        next.delete(questionId);
        return next;
      });
      generateTimers.current.delete(questionId);
    }, AI_GENERATE_MS);

    generateTimers.current.set(questionId, timer);
  }, []);

  const generateAnswer = useCallback(
    (questionId: string) => {
      runAiGeneration(questionId);
    },
    [runAiGeneration],
  );

  const regenerateAnswer = useCallback(
    (questionId: string) => {
      runAiGeneration(questionId);
    },
    [runAiGeneration],
  );
  const sendChatMessage = useCallback(
    (content: string, attachment?: AnalysisChatMessage['attachment']) => {
      const trimmed = content.trim();
      if ((!trimmed && !attachment) || !selectedQuestionId) return;

      setChatMessages((prev) => [
        ...prev,
        {
          id: nextChatMessageId(),
          role: 'user',
          content: trimmed,
          attachment,
        },
      ]);

      clearTimeout(aiReplyTimer.current);
      aiReplyTimer.current = setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { id: nextChatMessageId(), role: 'ai', content: ANALYSIS_AI_MOCK_REPLY },
        ]);
        setAnswerDrafts((prev) => ({
          ...prev,
          [selectedQuestionId]:
            prev[selectedQuestionId]?.trim().length > 0
              ? prev[selectedQuestionId]
              : 'Jira の課題キーと対応させ、プロジェクト略称を接頭辞に付与する想定です。',
        }));
      }, AI_REPLY_DELAY_MS);
    },
    [selectedQuestionId],
  );

  const setFlowDraft = useCallback((value: string) => {
    setFlowDraftState(value);
  }, []);

  const startFlowEdit = useCallback(() => {
    setFlowEditing(true);
  }, []);

  const cancelFlowEdit = useCallback(() => {
    setFlowDraftState(savedFlow);
    setFlowEditing(false);
  }, [savedFlow]);

  const saveFlow = useCallback(() => {
    setSavedFlow(flowDraft);
    setFlowEditing(false);
  }, [flowDraft]);

  const setGenerateDiagram = useCallback(
    (enabled: boolean) => {
      if (!enabled) {
        closeFlowPanel();
        return;
      }

      closeAiPanel();
      setGenerateDiagramState(true);
      setFlowChatMessages([]);
      setFlowAiThinking(false);
      clearTimeout(flowAiReplyTimer.current);
    },
    [closeAiPanel, closeFlowPanel],
  );

  const sendFlowChatMessage = useCallback(
    (content: string, attachment?: AnalysisChatMessage['attachment']) => {
      const trimmed = content.trim();
      if (!trimmed && !attachment) return;
      if (!generateDiagram) return;

      setFlowChatMessages((prev) => [
        ...prev,
        {
          id: nextChatMessageId(),
          role: 'user',
          content: trimmed,
          attachment,
        },
      ]);

      clearTimeout(flowAiReplyTimer.current);
      flowAiReplyTimer.current = setTimeout(() => {
        setFlowChatMessages((prev) => [
          ...prev,
          {
            id: nextChatMessageId(),
            role: 'ai',
            content: BUSINESS_FLOW_AI_MOCK_REPLY,
          },
        ]);
      }, AI_REPLY_DELAY_MS);
    },
    [generateDiagram],
  );

  const createDraft = useCallback(() => {
    closeResult();
  }, [closeResult]);

  const value = useMemo<InputAnalysisContextValue>(
    () => ({
      hasUpload: attachedInputs.length > 0,
      attachedInputs,
      analysisEnabled,
      analyzing,
      kantenOpen,
      kantenLoading,
      analysisInfoOpen,
      resultOpen,
      resultLoading,
      aiPanelOpen,
      selectedQuestionId,
      answerDrafts,
      savedAnswers,
      isEditingAnswer,
      isGeneratingAnswer,
      isAiAnswer,
      chatMessages,
      aiThinking,
      flowDraft,
      savedFlow,
      flowEditing,
      generateDiagram,
      flowChatMessages,
      flowAiThinking,
      generateLabel: analysisEnabled
        ? '分析してドラフト生成する'
        : 'ドラフト生成',
      uploadFile,
      removeUpload,
      setAnalysisEnabled: changeAnalysisEnabled,
      openKanten,
      closeKanten,
      openAnalysisInfo,
      closeAnalysisInfo,
      startAnalysis,
      closeResult,
      openAiPanel,
      closeAiPanel,
      setAnswerDraft,
      startEditingAnswer,
      cancelEditingAnswer,
      saveAnswer,
      generateAnswer,
      regenerateAnswer,
      sendChatMessage,
      setFlowDraft,
      startFlowEdit,
      cancelFlowEdit,
      saveFlow,
      setGenerateDiagram,
      closeFlowPanel,
      sendFlowChatMessage,
      createDraft,
    }),
    [
      attachedInputs,
      analysisEnabled,
      analyzing,
      kantenOpen,
      kantenLoading,
      analysisInfoOpen,
      resultOpen,
      resultLoading,
      aiPanelOpen,
      selectedQuestionId,
      answerDrafts,
      savedAnswers,
      isEditingAnswer,
      isGeneratingAnswer,
      isAiAnswer,
      chatMessages,
      aiThinking,
      flowDraft,
      savedFlow,
      flowEditing,
      generateDiagram,
      flowChatMessages,
      flowAiThinking,
      uploadFile,
      removeUpload,
      changeAnalysisEnabled,
      openKanten,
      closeKanten,
      openAnalysisInfo,
      closeAnalysisInfo,
      startAnalysis,
      closeResult,
      openAiPanel,
      closeAiPanel,
      setAnswerDraft,
      startEditingAnswer,
      cancelEditingAnswer,
      saveAnswer,
      generateAnswer,
      regenerateAnswer,
      sendChatMessage,
      setFlowDraft,
      startFlowEdit,
      cancelFlowEdit,
      saveFlow,
      setGenerateDiagram,
      closeFlowPanel,
      sendFlowChatMessage,
      createDraft,
    ],
  );

  return (
    <InputAnalysisContext.Provider value={value}>
      {children}
    </InputAnalysisContext.Provider>
  );
}

export function useInputAnalysis() {
  const context = useContext(InputAnalysisContext);
  if (!context) {
    throw new Error(
      'useInputAnalysis must be used within an InputAnalysisProvider',
    );
  }
  return context;
}
