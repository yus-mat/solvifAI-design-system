import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SnackBar } from '@/components/Overlay/SnackBar';
import { snackBarBottomCenterViewportClassName } from '@/components/Overlay/SnackBar/snackBarStyles';
import { motionAppearDurationMs } from '@/styles/motion';
import { GlobalHeader } from '@/components/GlobalHeader';
import { SlideSidebar } from './components/SlideSidebar';
import { SlidePreview } from './components/SlidePreview';
import {
  ConfirmationPanel,
  type AnswerSource,
} from './components/ConfirmationPanel';
import { ApplyConfirmationDialog } from './components/ApplyConfirmationDialog';
import { IssueAiChatPanel } from './components/IssueAiChatPanel';
import { ReadOnlyAnalysisDrawer } from './components/ReadOnlyAnalysisDrawer';
import { useHorizontalResize } from '@/hooks/useHorizontalResize';
import { isAnswerErroneous } from './answerValidation';
import {
  COLLABORATOR_AVATARS,
  CONFIRMATION_ISSUES,
  createSlideAiChatReply,
  createSlideAiChatSeed,
  getAiGeneratedAnswer,
  SLIDES,
  type ConfirmationIssue,
  type SlideAiChatMessage,
  type SlideTextAnnotation,
} from './mockData';

const PANEL_DEFAULT_WIDTH = 506;
const PANEL_MIN_WIDTH = 360;
const PANEL_MAX_WIDTH = 720;
const TOAST_DISMISS_MS = 4000;
const APPLY_SHIMMER_MS = 2400;
/** Simulated AI scan delay before the confirmation dialog opens. */
const LOCATION_SCAN_MS = 1600;
/** Simulated quick AI answer generation. */
const AI_GENERATE_MS = 2600;
/** Side panel width when consulting via AI chat (opens beside 確認事項). */
const AI_CHAT_PANEL_WIDTH = 420;
/** Simulated AI reply delay for slide inline chat. */
const SLIDE_AI_REPLY_MS = 900;

type PageToast = {
  type: 'default' | 'error';
  title: string;
  subtitle?: string;
};

function addToSet(prev: Set<string>, id: string) {
  const next = new Set(prev);
  next.add(id);
  return next;
}

function removeFromSet(prev: Set<string>, id: string) {
  if (!prev.has(id)) return prev;
  const next = new Set(prev);
  next.delete(id);
  return next;
}

export function InputCompletenessAnalysisPage() {
  const [selectedSlide, setSelectedSlide] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answerSources, setAnswerSources] = useState<Record<string, AnswerSource>>(
    {},
  );
  const [generationIndexes, setGenerationIndexes] = useState<Record<string, number>>(
    {},
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [forcedOpenIds, setForcedOpenIds] = useState<Set<string>>(() => new Set());
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(() => new Set());
  const [archivedIds, setArchivedIds] = useState<Set<string>>(() => new Set());
  const [deletedIds, setDeletedIds] = useState<Set<string>>(() => new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(() => new Set());
  const [editingIds, setEditingIds] = useState<Set<string>>(() => new Set());
  const [chatIssueId, setChatIssueId] = useState<string | null>(null);
  const [chatRailExpanded, setChatRailExpanded] = useState(false);
  const [renderedChatIssue, setRenderedChatIssue] =
    useState<ConfirmationIssue | null>(null);
  const [applyTargetId, setApplyTargetId] = useState<string | null>(null);
  const [reviewTargetId, setReviewTargetId] = useState<string | null>(null);
  const [batchApplyIds, setBatchApplyIds] = useState<string[]>([]);
  const [batchDialogIndex, setBatchDialogIndex] = useState(0);
  const [isBatchScanning, setIsBatchScanning] = useState(false);
  const [scanningIssueId, setScanningIssueId] = useState<string | null>(null);
  const [isSlideApplying, setIsSlideApplying] = useState(false);
  const [applyingSlideNumbers, setApplyingSlideNumbers] = useState<number[]>([]);
  const [toast, setToast] = useState<PageToast | null>(null);
  const [confirmationTab, setConfirmationTab] = useState(2);
  const [slideAiMessages, setSlideAiMessages] = useState<SlideAiChatMessage[]>(
    [],
  );
  const [slideAiAnnotation, setSlideAiAnnotation] =
    useState<SlideTextAnnotation | null>(null);
  const [aiChatHasActivity, setAiChatHasActivity] = useState(false);
  const [analysisDrawerOpen, setAnalysisDrawerOpen] = useState(false);
  const [analysisFocusCategoryId, setAnalysisFocusCategoryId] = useState<
    string | null
  >(null);
  const applyTimerRef = useRef<number | null>(null);
  const scanTimerRef = useRef<number | null>(null);
  const batchScanTimerRef = useRef<number | null>(null);
  const generateTimersRef = useRef<Map<string, number>>(new Map());
  const slideAiReplyTimerRef = useRef<number | null>(null);

  const { width: panelWidth, onPointerDown: onPanelResizePointerDown } =
    useHorizontalResize({
      defaultWidth: PANEL_DEFAULT_WIDTH,
      minWidth: PANEL_MIN_WIDTH,
      maxWidth: PANEL_MAX_WIDTH,
      edge: 'start',
    });

  const clearScanTimer = useCallback(() => {
    if (scanTimerRef.current != null) {
      window.clearTimeout(scanTimerRef.current);
      scanTimerRef.current = null;
    }
  }, []);

  const clearBatchScanTimer = useCallback(() => {
    if (batchScanTimerRef.current != null) {
      window.clearTimeout(batchScanTimerRef.current);
      batchScanTimerRef.current = null;
    }
  }, []);

  const clearGenerateTimers = useCallback(() => {
    for (const timer of generateTimersRef.current.values()) {
      window.clearTimeout(timer);
    }
    generateTimersRef.current.clear();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), TOAST_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    return () => {
      if (applyTimerRef.current != null) {
        window.clearTimeout(applyTimerRef.current);
      }
      if (slideAiReplyTimerRef.current != null) {
        window.clearTimeout(slideAiReplyTimerRef.current);
      }
      clearScanTimer();
      clearBatchScanTimer();
      clearGenerateTimers();
    };
  }, [clearBatchScanTimer, clearGenerateTimers, clearScanTimer]);

  const handleSendSlideAiChat = useCallback(
    (annotation: SlideTextAnnotation, message: string) => {
      const seed = createSlideAiChatSeed(annotation);
      const userMessage: SlideAiChatMessage = {
        id: `${annotation.id}-user-${Date.now()}`,
        role: 'user',
        content: message,
      };

      setSlideAiAnnotation(annotation);
      setSlideAiMessages([...seed, userMessage]);
      setAiChatHasActivity(true);
      setConfirmationTab(0);

      if (slideAiReplyTimerRef.current != null) {
        window.clearTimeout(slideAiReplyTimerRef.current);
      }

      slideAiReplyTimerRef.current = window.setTimeout(() => {
        const reply = createSlideAiChatReply(annotation, message, 0);
        setSlideAiMessages((prev) => [...prev, reply]);
        slideAiReplyTimerRef.current = null;
      }, SLIDE_AI_REPLY_MS);
    },
    [],
  );

  const handleOpenAnalysisSource = useCallback(
    (annotation: SlideTextAnnotation) => {
      if (annotation.source.kind !== 'analysisAnswer') return;
      setAnalysisFocusCategoryId(annotation.source.categoryId);
      setAnalysisDrawerOpen(true);
    },
    [],
  );

  const handleAnswerChange = useCallback((issueId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [issueId]: value }));
    setAnswerSources((prev) => {
      if (prev[issueId] === 'manual' || prev[issueId] == null) {
        return { ...prev, [issueId]: 'manual' };
      }
      return prev;
    });
    setFieldErrors((prev) => {
      if (!prev[issueId]) return prev;
      const next = { ...prev };
      delete next[issueId];
      return next;
    });
  }, []);

  const runAiGeneration = useCallback((issueId: string, nextIndex: number) => {
    const existing = generateTimersRef.current.get(issueId);
    if (existing != null) {
      window.clearTimeout(existing);
    }

    setGeneratingIds((prev) => addToSet(prev, issueId));
    setEditingIds((prev) => removeFromSet(prev, issueId));
    setForcedOpenIds((prev) => addToSet(prev, issueId));
    setFieldErrors((prev) => {
      if (!prev[issueId]) return prev;
      const next = { ...prev };
      delete next[issueId];
      return next;
    });

    const timer = window.setTimeout(() => {
      setAnswers((prev) => ({
        ...prev,
        [issueId]: getAiGeneratedAnswer(issueId, nextIndex),
      }));
      setAnswerSources((prev) => ({ ...prev, [issueId]: 'ai' }));
      setGenerationIndexes((prev) => ({ ...prev, [issueId]: nextIndex }));
      setGeneratingIds((prev) => removeFromSet(prev, issueId));
      generateTimersRef.current.delete(issueId);
    }, AI_GENERATE_MS);

    generateTimersRef.current.set(issueId, timer);
  }, []);

  const handleGenerateAnswer = useCallback(
    (issueId: string) => {
      if (
        scanningIssueId ||
        isSlideApplying ||
        applyTargetId ||
        isBatchScanning ||
        batchApplyIds.length > 0
      ) {
        return;
      }
      runAiGeneration(issueId, 0);
    },
    [
      applyTargetId,
      batchApplyIds.length,
      isBatchScanning,
      isSlideApplying,
      runAiGeneration,
      scanningIssueId,
    ],
  );

  const handleRegenerateAnswer = useCallback(
    (issueId: string) => {
      if (
        scanningIssueId ||
        isSlideApplying ||
        applyTargetId ||
        isBatchScanning ||
        batchApplyIds.length > 0
      ) {
        return;
      }
      const nextIndex = (generationIndexes[issueId] ?? 0) + 1;
      runAiGeneration(issueId, nextIndex);
    },
    [
      applyTargetId,
      batchApplyIds.length,
      generationIndexes,
      isBatchScanning,
      isSlideApplying,
      runAiGeneration,
      scanningIssueId,
    ],
  );

  const handleSelectedChange = useCallback(
    (issueId: string, selected: boolean) => {
      setSelectedIds((prev) =>
        selected ? addToSet(prev, issueId) : removeFromSet(prev, issueId),
      );
    },
    [],
  );

  const handleSelectAllChange = useCallback(
    (issueIds: string[], selected: boolean) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const id of issueIds) {
          if (selected) {
            next.add(id);
          } else {
            next.delete(id);
          }
        }
        return next;
      });
    },
    [],
  );

  const handleClearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const visibleIssues = useMemo(
    () => CONFIRMATION_ISSUES.filter((issue) => !deletedIds.has(issue.id)),
    [deletedIds],
  );

  const handleArchiveSelected = useCallback(() => {
    if (selectedIds.size === 0) return;

    const ids = Array.from(selectedIds);
    setArchivedIds((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.add(id);
      return next;
    });
    setSelectedIds(new Set());
    if (chatIssueId && selectedIds.has(chatIssueId)) {
      setChatIssueId(null);
    }
    setToast({ type: 'default', title: 'アーカイブしました' });
  }, [chatIssueId, selectedIds]);

  const handleRestoreSelected = useCallback(() => {
    if (selectedIds.size === 0) return;

    const ids = Array.from(selectedIds);
    setArchivedIds((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (const id of ids) {
        if (next.delete(id)) changed = true;
      }
      return changed ? next : prev;
    });
    setSelectedIds(new Set());
    setToast({ type: 'default', title: 'アーカイブから復元しました' });
  }, [selectedIds]);

  const handleDeleteSelected = useCallback(() => {
    if (selectedIds.size === 0) return;

    const ids = Array.from(selectedIds);
    setDeletedIds((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.add(id);
      return next;
    });
    setArchivedIds((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (const id of ids) {
        if (next.delete(id)) changed = true;
      }
      return changed ? next : prev;
    });
    setResolvedIds((prev) => {
      let changed = false;
      const next = new Set(prev);
      for (const id of ids) {
        if (next.delete(id)) changed = true;
      }
      return changed ? next : prev;
    });
    setSelectedIds(new Set());
    if (chatIssueId && selectedIds.has(chatIssueId)) {
      setChatIssueId(null);
    }
    setToast({ type: 'default', title: '削除しました' });
  }, [chatIssueId, selectedIds]);

  const handleBatchGenerate = useCallback(() => {
    if (
      scanningIssueId ||
      isSlideApplying ||
      applyTargetId ||
      isBatchScanning ||
      batchApplyIds.length > 0 ||
      selectedIds.size === 0
    ) {
      return;
    }

    for (const issueId of selectedIds) {
      if (
        resolvedIds.has(issueId) ||
        archivedIds.has(issueId) ||
        generatingIds.has(issueId)
      ) {
        continue;
      }
      const currentIndex = generationIndexes[issueId];
      runAiGeneration(
        issueId,
        currentIndex == null ? 0 : currentIndex + 1,
      );
    }
  }, [
    applyTargetId,
    archivedIds,
    batchApplyIds.length,
    generatingIds,
    generationIndexes,
    isBatchScanning,
    isSlideApplying,
    resolvedIds,
    runAiGeneration,
    scanningIssueId,
    selectedIds,
  ]);

  const handleBatchApply = useCallback(() => {
    if (
      scanningIssueId ||
      isSlideApplying ||
      applyTargetId ||
      reviewTargetId ||
      isBatchScanning ||
      batchApplyIds.length > 0 ||
      selectedIds.size === 0
    ) {
      return;
    }

    const orderedIds = visibleIssues
      .map((issue) => issue.id)
      .filter(
        (id) =>
          selectedIds.has(id) &&
          !resolvedIds.has(id) &&
          !archivedIds.has(id),
      );

    if (orderedIds.length === 0) return;

    const nextErrors: Record<string, boolean> = {};
    let hasError = false;

    for (const issueId of orderedIds) {
      const answer = answers[issueId] ?? '';
      const issue = CONFIRMATION_ISSUES.find((item) => item.id === issueId);
      if (
        !issue ||
        !answer.trim() ||
        isAnswerErroneous(answer, issue.question, issue.title)
      ) {
        nextErrors[issueId] = true;
        hasError = true;
      }
    }

    if (hasError) {
      setFieldErrors((prev) => ({ ...prev, ...nextErrors }));
      setForcedOpenIds((prev) => {
        const next = new Set(prev);
        for (const id of Object.keys(nextErrors)) {
          next.add(id);
        }
        return next;
      });
      setToast({
        type: 'error',
        title: '回答内容を見直してください',
        subtitle: '選択した項目に未入力または不適切な回答があります',
      });
      return;
    }

    setFieldErrors((prev) => {
      const next = { ...prev };
      for (const id of orderedIds) {
        delete next[id];
      }
      return next;
    });

    clearBatchScanTimer();
    setIsBatchScanning(true);
    batchScanTimerRef.current = window.setTimeout(() => {
      setIsBatchScanning(false);
      setBatchApplyIds(orderedIds);
      setBatchDialogIndex(0);
      batchScanTimerRef.current = null;
    }, LOCATION_SCAN_MS);
  }, [
    answers,
    applyTargetId,
    archivedIds,
    batchApplyIds.length,
    clearBatchScanTimer,
    isBatchScanning,
    isSlideApplying,
    resolvedIds,
    reviewTargetId,
    scanningIssueId,
    selectedIds,
    visibleIssues,
  ]);

  const handleOpenAiChat = useCallback(
    (issueId: string) => {
      if (scanningIssueId || isSlideApplying || applyTargetId) return;
      setEditingIds((prev) => removeFromSet(prev, issueId));
      setForcedOpenIds((prev) => addToSet(prev, issueId));
      setChatIssueId(issueId);
    },
    [applyTargetId, isSlideApplying, scanningIssueId],
  );

  const handleCloseAiChat = useCallback(() => {
    setChatIssueId(null);
  }, []);

  useEffect(() => {
    if (chatIssueId) {
      const issue =
        CONFIRMATION_ISSUES.find((item) => item.id === chatIssueId) ?? null;
      setRenderedChatIssue(issue);
      const raf = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setChatRailExpanded(true));
      });
      return () => window.cancelAnimationFrame(raf);
    }

    setChatRailExpanded(false);
    const timer = window.setTimeout(() => {
      setRenderedChatIssue(null);
    }, motionAppearDurationMs);
    return () => window.clearTimeout(timer);
  }, [chatIssueId]);

  const handleStartEdit = useCallback((issueId: string) => {
    setEditingIds((prev) => addToSet(prev, issueId));
    setForcedOpenIds((prev) => addToSet(prev, issueId));
  }, []);

  const handleSaveEdit = useCallback((issueId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [issueId]: value }));
    setEditingIds((prev) => removeFromSet(prev, issueId));
    setFieldErrors((prev) => {
      if (!prev[issueId]) return prev;
      const next = { ...prev };
      delete next[issueId];
      return next;
    });
  }, []);

  const handleCancelEdit = useCallback((issueId: string) => {
    setEditingIds((prev) => removeFromSet(prev, issueId));
  }, []);

  const startLocationScan = useCallback(
    (issueId: string) => {
      clearScanTimer();
      setScanningIssueId(issueId);
      setForcedOpenIds((prev) => addToSet(prev, issueId));

      scanTimerRef.current = window.setTimeout(() => {
        setScanningIssueId(null);
        setApplyTargetId(issueId);
        scanTimerRef.current = null;
      }, LOCATION_SCAN_MS);
    },
    [clearScanTimer],
  );

  const handleApply = useCallback(
    (issueId: string) => {
      if (
        scanningIssueId ||
        isSlideApplying ||
        applyTargetId ||
        reviewTargetId ||
        chatIssueId ||
        isBatchScanning ||
        batchApplyIds.length > 0 ||
        generatingIds.has(issueId) ||
        editingIds.has(issueId)
      ) {
        return;
      }

      const answer = answers[issueId] ?? '';
      if (!answer.trim()) return;

      const issue = CONFIRMATION_ISSUES.find((item) => item.id === issueId);
      if (
        !issue ||
        isAnswerErroneous(answer, issue.question, issue.title)
      ) {
        setFieldErrors((prev) => ({ ...prev, [issueId]: true }));
        setForcedOpenIds((prev) => addToSet(prev, issueId));
        return;
      }

      setFieldErrors((prev) => {
        if (!prev[issueId]) return prev;
        const next = { ...prev };
        delete next[issueId];
        return next;
      });
      startLocationScan(issueId);
    },
    [
      answers,
      applyTargetId,
      batchApplyIds.length,
      chatIssueId,
      editingIds,
      generatingIds,
      isBatchScanning,
      isSlideApplying,
      reviewTargetId,
      scanningIssueId,
      startLocationScan,
    ],
  );

  const handleReviewLocations = useCallback(
    (issueId: string) => {
      if (
        scanningIssueId ||
        isSlideApplying ||
        applyTargetId ||
        chatIssueId ||
        isBatchScanning ||
        batchApplyIds.length > 0
      ) {
        return;
      }
      setReviewTargetId(issueId);
    },
    [
      applyTargetId,
      batchApplyIds.length,
      chatIssueId,
      isBatchScanning,
      isSlideApplying,
      scanningIssueId,
    ],
  );

  const handleOpenChange = useCallback((issueId: string, open: boolean) => {
    if (!open) {
      setForcedOpenIds((prev) => removeFromSet(prev, issueId));
      setEditingIds((prev) => removeFromSet(prev, issueId));
    }
  }, []);

  const handleConfirmApply = useCallback(() => {
    if (isSlideApplying || scanningIssueId || reviewTargetId || isBatchScanning) {
      return;
    }

    if (batchApplyIds.length > 0) {
      const issueIds = batchApplyIds;
      const affectedSlides = [
        ...new Set(
          issueIds.flatMap((issueId) => {
            const issue = CONFIRMATION_ISSUES.find((item) => item.id === issueId);
            return issue
              ? issue.changePreview.map((location) => location.slideNumber)
              : [];
          }),
        ),
      ];

      setBatchApplyIds([]);
      setBatchDialogIndex(0);
      setIsSlideApplying(true);
      setApplyingSlideNumbers(affectedSlides);

      if (applyTimerRef.current != null) {
        window.clearTimeout(applyTimerRef.current);
      }

      applyTimerRef.current = window.setTimeout(() => {
        setResolvedIds((prev) => {
          const next = new Set(prev);
          for (const id of issueIds) {
            next.add(id);
          }
          return next;
        });
        setSelectedIds((prev) => {
          const next = new Set(prev);
          for (const id of issueIds) {
            next.delete(id);
          }
          return next;
        });
        setIsSlideApplying(false);
        setApplyingSlideNumbers([]);
        setToast({
          type: 'default',
          title: `${issueIds.length}件の回答内容をドラフトに反映しました`,
        });
        applyTimerRef.current = null;
      }, APPLY_SHIMMER_MS);
      return;
    }

    if (!applyTargetId) return;

    const issueId = applyTargetId;
    const issue = CONFIRMATION_ISSUES.find((item) => item.id === issueId);
    const affectedSlides = issue
      ? [...new Set(issue.changePreview.map((location) => location.slideNumber))]
      : [];

    setApplyTargetId(null);
    setIsSlideApplying(true);
    setApplyingSlideNumbers(affectedSlides);

    if (applyTimerRef.current != null) {
      window.clearTimeout(applyTimerRef.current);
    }

    applyTimerRef.current = window.setTimeout(() => {
      setResolvedIds((prev) => addToSet(prev, issueId));
      setSelectedIds((prev) => removeFromSet(prev, issueId));
      setIsSlideApplying(false);
      setApplyingSlideNumbers([]);
      setToast({
        type: 'default',
        title: '回答内容をドラフトに反映しました',
      });
      applyTimerRef.current = null;
    }, APPLY_SHIMMER_MS);
  }, [
    applyTargetId,
    batchApplyIds,
    isBatchScanning,
    isSlideApplying,
    reviewTargetId,
    scanningIssueId,
  ]);

  const handleCloseDialog = useCallback(() => {
    if (isSlideApplying || scanningIssueId || isBatchScanning) return;
    setApplyTargetId(null);
    setReviewTargetId(null);
    setBatchApplyIds([]);
    setBatchDialogIndex(0);
  }, [isBatchScanning, isSlideApplying, scanningIssueId]);

  const handleDialogCardIndexChange = useCallback((nextIndex: number) => {
    setBatchDialogIndex(Math.max(0, nextIndex - 1));
  }, []);

  const isBatchDialog = batchApplyIds.length > 0;
  const dialogIssueId = isBatchDialog
    ? batchApplyIds[batchDialogIndex]
    : (applyTargetId ?? reviewTargetId);
  const dialogIssue = dialogIssueId
    ? CONFIRMATION_ISSUES.find((issue) => issue.id === dialogIssueId)
    : undefined;
  const dialogMode = reviewTargetId && !isBatchDialog ? 'review' : 'apply';
  const dialogCardIndex = isBatchDialog ? batchDialogIndex + 1 : 1;
  const dialogCardTotal = isBatchDialog ? batchApplyIds.length : 1;
  const confirmationWidth = chatRailExpanded
    ? Math.max(PANEL_MIN_WIDTH, Math.round(panelWidth * 0.85))
    : panelWidth;

  return (
    <div className="relative flex h-screen min-h-0 flex-col overflow-hidden bg-surface-default">
      <GlobalHeader variant="draft" avatars={COLLABORATOR_AVATARS} />

      <div className="flex min-h-0 flex-1">
        <SlideSidebar
          slides={SLIDES}
          selectedSlide={selectedSlide}
          onSelectSlide={setSelectedSlide}
          applyingSlideNumbers={applyingSlideNumbers}
        />
        <SlidePreview
          currentSlide={selectedSlide}
          totalSlides={SLIDES.length}
          onSlideChange={setSelectedSlide}
          isApplying={
            isSlideApplying && applyingSlideNumbers.includes(selectedSlide)
          }
          onSendSlideAiChat={handleSendSlideAiChat}
          onOpenAnalysisSource={handleOpenAnalysisSource}
        />
        <ConfirmationPanel
          issues={visibleIssues}
          answers={answers}
          answerSources={answerSources}
          fieldErrors={fieldErrors}
          forcedOpenIds={forcedOpenIds}
          resolvedIds={resolvedIds}
          archivedIds={archivedIds}
          selectedIds={selectedIds}
          generatingIds={generatingIds}
          editingIds={editingIds}
          scanningIssueId={scanningIssueId}
          isBatchScanning={isBatchScanning}
          width={confirmationWidth}
          onResizePointerDown={
            chatRailExpanded ? undefined : onPanelResizePointerDown
          }
          onAnswerChange={handleAnswerChange}
          onApply={handleApply}
          onGenerateAnswer={handleGenerateAnswer}
          onRegenerateAnswer={handleRegenerateAnswer}
          onOpenAiChat={handleOpenAiChat}
          onStartEdit={handleStartEdit}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onReviewLocations={handleReviewLocations}
          onOpenChange={handleOpenChange}
          onSelectedChange={handleSelectedChange}
          onSelectAllChange={handleSelectAllChange}
          onClearSelection={handleClearSelection}
          onBatchGenerate={handleBatchGenerate}
          onBatchApply={handleBatchApply}
          onArchiveSelected={handleArchiveSelected}
          onRestoreSelected={handleRestoreSelected}
          onDeleteSelected={handleDeleteSelected}
          activeTab={confirmationTab}
          onActiveTabChange={setConfirmationTab}
          aiChatHasActivity={aiChatHasActivity}
          slideAiMessages={slideAiMessages}
          slideAiAnnotation={slideAiAnnotation}
          onSlideAiMessagesChange={setSlideAiMessages}
        />
        {renderedChatIssue ? (
          <div
            className="h-full shrink-0 overflow-hidden transition-[width] duration-[var(--motion-appear-duration)] ease-in-out motion-reduce:transition-none"
            style={{ width: chatRailExpanded ? AI_CHAT_PANEL_WIDTH : 0 }}
          >
            <IssueAiChatPanel
              issue={renderedChatIssue}
              width={AI_CHAT_PANEL_WIDTH}
              onClose={handleCloseAiChat}
            />
          </div>
        ) : null}
      </div>

      {dialogIssue ? (
        <ApplyConfirmationDialog
          open={Boolean(dialogIssueId)}
          issue={dialogIssue}
          answer={answers[dialogIssue.id] ?? ''}
          mode={dialogMode}
          cardIndex={dialogCardIndex}
          cardTotal={dialogCardTotal}
          onClose={handleCloseDialog}
          onConfirm={dialogMode === 'apply' ? handleConfirmApply : undefined}
          onCardIndexChange={
            isBatchDialog ? handleDialogCardIndexChange : undefined
          }
        />
      ) : null}

      <ReadOnlyAnalysisDrawer
        open={analysisDrawerOpen}
        focusedCategoryId={analysisFocusCategoryId}
        onClose={() => setAnalysisDrawerOpen(false)}
      />

      {toast ? (
        <div className={snackBarBottomCenterViewportClassName}>
          <div className="pointer-events-auto">
            <SnackBar
              type={toast.type}
              title={toast.title}
              subtitle={toast.subtitle}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
