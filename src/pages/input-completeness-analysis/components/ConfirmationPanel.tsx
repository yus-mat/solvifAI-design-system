import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { Button } from '@/components/Button';
import { ButtonIcon } from '@/components/Button/ButtonIcon';
import { Checkbox } from '@/components/Control/Checkbox';
import { Input } from '@/components/Field/Input';
import { IconWrapper } from '@/components/IconWrapper';
import { Backdrop } from '@/components/Overlay/Backdrop';
import { Dialog } from '@/components/Overlay/Dialog';
import { Dropdown } from '@/components/Overlay/Dropdown';
import { DropdownList } from '@/components/Overlay/DropdownList';
import { ListItem } from '@/components/Overlay/ListItem';
import { NotificationBadge } from '@/components/NotificationBadge';
import { SegmentedControl, SegmentedControlItem } from '@/components/SegmentedControl';
import { Tab } from '@/components/Tab';
import {
  Archive,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  PanelRightClose,
  Search,
  Sparkles,
  Trash2,
} from '@/icons';
import type {
  ConfirmationIssue,
  ConfirmationIssueCategory,
  SlideAiChatMessage,
  SlideTextAnnotation,
} from '../mockData';
import { ConfirmationIssueCard } from './ConfirmationIssueCard';
import { SlideAiChatTab } from './SlideAiChatTab';

export type AnswerSource = 'manual' | 'ai';

export type SelectionListFilter = 'all' | 'selected' | 'unselected';

export type StatusFilter = 'pending' | 'resolved' | 'archived';

export type CategoryFilter = '全ての種類' | ConfirmationIssueCategory;

export type SortOrder = '新しい順' | '古い順';

const PAGE_SIZE = 5;

const CATEGORY_OPTIONS: CategoryFilter[] = [
  '全ての種類',
  '不足',
  '矛盾',
  '提案',
  '曖昧',
];

const SORT_OPTIONS: SortOrder[] = ['新しい順', '古い順'];

export type ConfirmationPanelProps = {
  issues: ConfirmationIssue[];
  answers: Record<string, string>;
  answerSources: Record<string, AnswerSource>;
  fieldErrors: Record<string, boolean>;
  forcedOpenIds: Set<string>;
  resolvedIds: Set<string>;
  archivedIds: Set<string>;
  selectedIds: Set<string>;
  generatingIds: Set<string>;
  editingIds: Set<string>;
  scanningIssueId?: string | null;
  isBatchScanning?: boolean;
  commentCount?: number;
  width?: number;
  onResizePointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
  onAnswerChange: (issueId: string, value: string) => void;
  onApply: (issueId: string) => void;
  onGenerateAnswer: (issueId: string) => void;
  onRegenerateAnswer: (issueId: string) => void;
  onOpenAiChat: (issueId: string) => void;
  onStartEdit: (issueId: string) => void;
  onSaveEdit: (issueId: string, value: string) => void;
  onCancelEdit: (issueId: string) => void;
  onReviewLocations?: (issueId: string) => void;
  onOpenChange: (issueId: string, open: boolean) => void;
  onSelectedChange: (issueId: string, selected: boolean) => void;
  onSelectAllChange: (issueIds: string[], selected: boolean) => void;
  onClearSelection: () => void;
  onBatchGenerate: () => void;
  onBatchApply: () => void;
  onArchiveSelected: () => void;
  onRestoreSelected: () => void;
  onDeleteSelected: () => void;
  activeTab?: number;
  onActiveTabChange?: (index: number) => void;
  aiChatHasActivity?: boolean;
  slideAiMessages?: SlideAiChatMessage[];
  slideAiAnnotation?: SlideTextAnnotation | null;
  onSlideAiMessagesChange?: (messages: SlideAiChatMessage[]) => void;
};

export function ConfirmationPanel({
  issues,
  answers,
  answerSources,
  fieldErrors,
  forcedOpenIds,
  resolvedIds,
  archivedIds,
  selectedIds,
  generatingIds,
  editingIds,
  scanningIssueId = null,
  isBatchScanning = false,
  commentCount = 2,
  width = 506,
  onResizePointerDown,
  onAnswerChange,
  onApply,
  onGenerateAnswer,
  onRegenerateAnswer,
  onOpenAiChat,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onReviewLocations,
  onOpenChange,
  onSelectedChange,
  onSelectAllChange,
  onClearSelection,
  onBatchGenerate,
  onBatchApply,
  onArchiveSelected,
  onRestoreSelected,
  onDeleteSelected,
  activeTab: activeTabProp,
  onActiveTabChange,
  aiChatHasActivity = false,
  slideAiMessages = [],
  slideAiAnnotation = null,
  onSlideAiMessagesChange,
}: ConfirmationPanelProps) {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(2);
  const isTabControlled = activeTabProp !== undefined;
  const activeTab = isTabControlled ? activeTabProp : uncontrolledActiveTab;
  const setActiveTab = (index: number) => {
    if (!isTabControlled) setUncontrolledActiveTab(index);
    onActiveTabChange?.(index);
  };
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [selectionListFilter, setSelectionListFilter] =
    useState<SelectionListFilter>('all');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>('全ての種類');
  const [sortOrder, setSortOrder] = useState<SortOrder>('新しい順');
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const issueOrder = useMemo(() => {
    const order = new Map<string, number>();
    issues.forEach((issue, index) => {
      order.set(issue.id, index);
    });
    return order;
  }, [issues]);

  const pendingIssues = issues.filter(
    (issue) => !resolvedIds.has(issue.id) && !archivedIds.has(issue.id),
  );
  const resolvedIssues = issues.filter(
    (issue) => resolvedIds.has(issue.id) && !archivedIds.has(issue.id),
  );
  const archivedIssues = issues.filter((issue) => archivedIds.has(issue.id));
  const statusIssues =
    statusFilter === 'resolved'
      ? resolvedIssues
      : statusFilter === 'archived'
        ? archivedIssues
        : pendingIssues;

  const isArchiveView = statusFilter === 'archived';
  const showSelectionChrome =
    statusFilter === 'pending' || statusFilter === 'archived';

  const filteredIssues = useMemo(() => {
    let result = statusIssues;

    if (categoryFilter !== '全ての種類') {
      result = result.filter((issue) => issue.category === categoryFilter);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((issue) => {
        const haystack = [
          issue.title,
          issue.question,
          issue.detail,
          issue.category,
        ]
          .join('\n')
          .toLowerCase();
        return haystack.includes(query);
      });
    }

    if (showSelectionChrome && selectionListFilter !== 'all') {
      result =
        selectionListFilter === 'selected'
          ? result.filter((issue) => selectedIds.has(issue.id))
          : result.filter((issue) => !selectedIds.has(issue.id));
    }

    return [...result].sort((a, b) => {
      const diff =
        (issueOrder.get(a.id) ?? 0) - (issueOrder.get(b.id) ?? 0);
      // Later items in the source list are treated as newer.
      return sortOrder === '古い順' ? diff : -diff;
    });
  }, [
    categoryFilter,
    issueOrder,
    searchQuery,
    selectionListFilter,
    selectedIds,
    showSelectionChrome,
    sortOrder,
    statusIssues,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredIssues.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageStart = safePage * PAGE_SIZE;
  const pageIssues = filteredIssues.slice(pageStart, pageStart + PAGE_SIZE);
  const pageSelectableIds = pageIssues.map((issue) => issue.id);
  const selectedOnPageCount = pageSelectableIds.filter((id) =>
    selectedIds.has(id),
  ).length;
  const allPageSelected =
    pageSelectableIds.length > 0 &&
    selectedOnPageCount === pageSelectableIds.length;
  const somePageSelected =
    selectedOnPageCount > 0 && selectedOnPageCount < pageSelectableIds.length;

  const rangeStart = filteredIssues.length === 0 ? 0 : pageStart + 1;
  const rangeEnd = Math.min(pageStart + PAGE_SIZE, filteredIssues.length);
  const isBusy =
    Boolean(scanningIssueId) || generatingIds.size > 0 || isBatchScanning;
  const selectedCount = selectedIds.size;
  const showBulkActions = showSelectionChrome && selectedCount > 0;
  const showArchiveAction = statusFilter === 'pending' && selectedCount > 0;
  const showDeleteAction = showSelectionChrome && selectedCount > 0;
  const showSelectionCta = showSelectionChrome && selectedCount > 0;

  useEffect(() => {
    setPage(0);
  }, [
    statusFilter,
    selectionListFilter,
    searchQuery,
    categoryFilter,
    sortOrder,
  ]);

  useEffect(() => {
    if (!showSelectionChrome && selectionListFilter !== 'all') {
      setSelectionListFilter('all');
    }
  }, [selectionListFilter, showSelectionChrome]);

  useEffect(() => {
    if (!filterMenuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!filterMenuRef.current?.contains(event.target as Node)) {
        setFilterMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [filterMenuOpen]);

  const handleStatusFilterChange = (value: string) => {
    const next = value as StatusFilter;
    setStatusFilter(next);
    setFilterMenuOpen(false);
    setDeleteDialogOpen(false);
    if (next === 'resolved') {
      setSelectionListFilter('all');
    }
    onClearSelection();
  };

  const handleConfirmDelete = () => {
    setDeleteDialogOpen(false);
    onDeleteSelected();
  };

  const handleRestoreSelected = () => {
    onRestoreSelected();
    setStatusFilter('pending');
    setSelectionListFilter('all');
  };

  return (
    <aside
      className="relative flex h-full shrink-0 flex-col border-l border-border-neutral-muted bg-surface-raise"
      style={{ width }}
    >
      {onResizePointerDown ? (
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="パネル幅を調整"
          className="absolute -left-1 top-0 z-10 h-full w-2 cursor-col-resize touch-none"
          onPointerDown={onResizePointerDown}
        />
      ) : null}

      <div className="flex h-[53px] shrink-0 items-center justify-between pr-2">
        <Tab
          value={activeTab}
          onChange={setActiveTab}
          className="min-w-0 flex-1"
          aria-label="サイドパネル"
          items={[
            {
              label: 'AIチャット',
              trailingSlot: aiChatHasActivity ? (
                <NotificationBadge />
              ) : undefined,
            },
            {
              label: 'コメント',
              trailingSlot: (
                <NotificationBadge type="neutral" count={commentCount} />
              ),
            },
            {
              label: '確認事項',
              trailingSlot: <NotificationBadge />,
            },
          ]}
        />
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size="sm"
          icon={<PanelRightClose aria-hidden />}
          aria-label="パネルを閉じる"
          tooltipPosition="bottom-right"
        />
      </div>

      {activeTab === 2 ? (
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div
            className={[
              'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pt-5',
              showSelectionCta ? 'pb-28' : 'pb-4',
            ].join(' ')}
          >
            <h2 className="m-0 body-2-bold text-text-neutral-primary">
              確認事項
            </h2>

            <SegmentedControl
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
              className="w-full"
            >
              <SegmentedControlItem
                value="pending"
                showIcon={false}
                trailingSlot={pendingIssues.length}
                className="min-w-0 flex-1 justify-center"
              >
                未対応
              </SegmentedControlItem>
              <SegmentedControlItem
                value="resolved"
                showIcon={false}
                trailingSlot={resolvedIssues.length}
                className="min-w-0 flex-1 justify-center"
              >
                反映済み
              </SegmentedControlItem>
              <SegmentedControlItem
                value="archived"
                showIcon={false}
                trailingSlot={archivedIssues.length}
                className="min-w-0 flex-1 justify-center"
              >
                アーカイブ
              </SegmentedControlItem>
            </SegmentedControl>

            <div className="flex items-center gap-2">
              <div className="relative min-w-0 flex-1">
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="検索..."
                  aria-label="確認事項を検索"
                  className="pr-9"
                />
                <span className="pointer-events-none absolute inset-y-0 right-2 z-[2] flex items-center text-text-neutral-muted">
                  <IconWrapper size="s">
                    <Search aria-hidden />
                  </IconWrapper>
                </span>
              </div>
              <div className="w-[120px] shrink-0">
                <Dropdown
                  leadingSlot={null}
                  value={categoryFilter}
                  onValueChange={(value) =>
                    setCategoryFilter(value as CategoryFilter)
                  }
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <ListItem key={option} leadingSlot={null}>
                      {option}
                    </ListItem>
                  ))}
                </Dropdown>
              </div>
              <div className="w-[120px] shrink-0">
                <Dropdown
                  leadingSlot={null}
                  value={sortOrder}
                  onValueChange={(value) => setSortOrder(value as SortOrder)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <ListItem key={option} leadingSlot={null}>
                      {option}
                    </ListItem>
                  ))}
                </Dropdown>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {showSelectionChrome ? (
                <div
                  ref={filterMenuRef}
                  className="relative flex shrink-0 items-center gap-1"
                >
                  <label className="flex cursor-pointer items-center gap-2 rounded-base px-2 py-1.5">
                    <Checkbox
                      checked={allPageSelected}
                      indeterminate={somePageSelected}
                      disabled={isBusy || pageSelectableIds.length === 0}
                      aria-label="全て選択"
                      onChange={(event) => {
                        onSelectAllChange(
                          pageSelectableIds,
                          event.target.checked,
                        );
                      }}
                    />
                    <span className="caption-bold text-text-neutral-primary">
                      全て選択
                    </span>
                  </label>
                  <ButtonIcon
                    emphasis="ghost"
                    intent="default"
                    size="sm"
                    icon={<ChevronDown aria-hidden />}
                    aria-label="選択フィルター"
                    aria-expanded={filterMenuOpen}
                    disabled={isBusy}
                    onClick={() => setFilterMenuOpen((prev) => !prev)}
                  />
                  {filterMenuOpen ? (
                    <div className="absolute left-0 top-full z-30 mt-1 min-w-[140px]">
                      <DropdownList
                        role="menu"
                        onClick={() => setFilterMenuOpen(false)}
                      >
                        <ListItem
                          leadingSlot={null}
                          selected={selectionListFilter === 'all'}
                          onClick={() => setSelectionListFilter('all')}
                        >
                          すべて
                        </ListItem>
                        <ListItem
                          leadingSlot={null}
                          selected={selectionListFilter === 'selected'}
                          onClick={() => setSelectionListFilter('selected')}
                        >
                          選択済み
                        </ListItem>
                        <ListItem
                          leadingSlot={null}
                          selected={selectionListFilter === 'unselected'}
                          onClick={() => setSelectionListFilter('unselected')}
                        >
                          未選択
                        </ListItem>
                      </DropdownList>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {showBulkActions ? (
                <div className="flex shrink-0 items-center gap-0.5">
                  {showArchiveAction ? (
                    <ButtonIcon
                      emphasis="ghost"
                      intent="default"
                      size="sm"
                      icon={<Archive aria-hidden />}
                      aria-label="アーカイブ"
                      disabled={isBusy}
                      onClick={onArchiveSelected}
                    />
                  ) : null}
                  {showDeleteAction ? (
                    <ButtonIcon
                      emphasis="ghost"
                      intent="default"
                      size="sm"
                      icon={<Trash2 aria-hidden />}
                      aria-label="削除"
                      disabled={isBusy}
                      onClick={() => setDeleteDialogOpen(true)}
                    />
                  ) : null}
                </div>
              ) : null}

              <div className="ml-auto flex shrink-0 items-center gap-2">
                <span className="caption text-text-neutral-secondary">
                  {rangeStart}~{rangeEnd} / {filteredIssues.length}
                </span>
                <div className="flex items-center gap-0.5">
                  <ButtonIcon
                    emphasis="ghost"
                    intent="default"
                    size="sm"
                    icon={<ChevronLeft aria-hidden />}
                    aria-label="前のページ"
                    disabled={safePage <= 0 || isBusy}
                    onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  />
                  <span className="min-w-10 text-center caption text-text-neutral-secondary">
                    {safePage + 1}/{totalPages}
                  </span>
                  <ButtonIcon
                    emphasis="ghost"
                    intent="default"
                    size="sm"
                    icon={<ChevronRight aria-hidden />}
                    aria-label="次のページ"
                    disabled={safePage >= totalPages - 1 || isBusy}
                    onClick={() =>
                      setPage((prev) => Math.min(totalPages - 1, prev + 1))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {pageIssues.map((issue) => {
                const isScanning = scanningIssueId === issue.id;
                const isResolved = resolvedIds.has(issue.id);
                const isArchived = archivedIds.has(issue.id);
                const isGenerating = generatingIds.has(issue.id);
                const isEditing = editingIds.has(issue.id);
                const isForcedOpen =
                  forcedOpenIds.has(issue.id) ||
                  isScanning ||
                  isGenerating ||
                  isEditing;
                const canSelect =
                  showSelectionChrome &&
                  (isArchiveView ? isArchived : !isResolved && !isArchived);

                return (
                  <ConfirmationIssueCard
                    key={issue.id}
                    issue={issue}
                    answer={answers[issue.id] ?? ''}
                    onAnswerChange={(value) => onAnswerChange(issue.id, value)}
                    onApply={() => onApply(issue.id)}
                    onGenerateAnswer={() => onGenerateAnswer(issue.id)}
                    onRegenerateAnswer={() => onRegenerateAnswer(issue.id)}
                    onOpenAiChat={() => onOpenAiChat(issue.id)}
                    onStartEdit={() => onStartEdit(issue.id)}
                    onSaveEdit={(value) => onSaveEdit(issue.id, value)}
                    onCancelEdit={() => onCancelEdit(issue.id)}
                    onReviewLocations={
                      onReviewLocations
                        ? () => onReviewLocations(issue.id)
                        : undefined
                    }
                    hasError={Boolean(fieldErrors[issue.id])}
                    isScanning={isScanning}
                    isGenerating={isGenerating}
                    isEditing={isEditing}
                    isAiAnswer={answerSources[issue.id] === 'ai'}
                    isResolved={isResolved}
                    selected={selectedIds.has(issue.id)}
                    onSelectedChange={
                      canSelect
                        ? (next) => onSelectedChange(issue.id, next)
                        : undefined
                    }
                    open={isForcedOpen ? true : undefined}
                    onOpenChange={(open) => onOpenChange(issue.id, open)}
                  />
                );
              })}
              {pageIssues.length === 0 ? (
                <p className="m-0 py-8 text-center body-2 text-text-neutral-secondary">
                  {searchQuery.trim() || categoryFilter !== '全ての種類'
                    ? '条件に一致する確認事項はありません'
                    : statusFilter === 'resolved'
                      ? '反映済みの確認事項はありません'
                      : statusFilter === 'archived'
                        ? 'アーカイブされた確認事項はありません'
                        : selectionListFilter === 'selected'
                          ? '選択済みの確認事項はありません'
                          : selectionListFilter === 'unselected'
                            ? '未選択の確認事項はありません'
                            : '未対応の確認事項はありません'}
                </p>
              ) : null}
            </div>
          </div>

          {showSelectionCta ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
              <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-lg border border-border-neutral-muted bg-surface-raise px-3 py-3 shadow-md">
                <span className="shrink-0 body-2-bold text-text-neutral-primary">
                  {selectedCount}件選択中
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  {isArchiveView ? (
                    <Button
                      size="md"
                      onClick={handleRestoreSelected}
                      disabled={isBusy}
                    >
                      アーカイブから復元
                    </Button>
                  ) : (
                    <>
                      <Button
                        emphasis="secondary"
                        intent="default"
                        size="md"
                        leadingIcon={<Sparkles aria-hidden />}
                        onClick={onBatchGenerate}
                        disabled={isBusy}
                      >
                        一括生成
                      </Button>
                      <Button
                        size="md"
                        onClick={onBatchApply}
                        disabled={isBusy}
                        leadingIcon={
                          isBatchScanning ? (
                            <LoaderCircle
                              className="animate-spin"
                              aria-hidden
                            />
                          ) : undefined
                        }
                      >
                        {isBatchScanning ? '反映内容を確認中' : '一括反映'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : activeTab === 0 ? (
        <SlideAiChatTab
          messages={slideAiMessages}
          annotation={slideAiAnnotation}
          onMessagesChange={onSlideAiMessagesChange ?? (() => undefined)}
        />
      ) : (
        <div className="flex flex-1 items-center justify-center p-8 body-2 text-text-neutral-secondary">
          コメントはこのデモでは未実装です
        </div>
      )}

      <Backdrop
        open={deleteDialogOpen}
        onClick={() => setDeleteDialogOpen(false)}
      />
      <Dialog
        open={deleteDialogOpen}
        title="本当に削除しますか？"
        onClose={() => setDeleteDialogOpen(false)}
        footer={
          <>
            <Button
              emphasis="ghost"
              intent="default"
              onClick={() => setDeleteDialogOpen(false)}
            >
              戻る
            </Button>
            <Button intent="danger" onClick={handleConfirmDelete}>
              削除する
            </Button>
          </>
        }
      >
        <p className="m-0 body-2 text-text-neutral-primary">
          削除した項目は元に戻せません。
        </p>
      </Dialog>
    </aside>
  );
}
