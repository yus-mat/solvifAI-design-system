import { Button, SplitButton } from '@/components/Button';
import { TextArea } from '@/components/Field';
import { ListItem } from '@/components/Overlay/ListItem';
import { MessageCircleMore, PencilLine, Sparkles } from '@/icons';
import { BUSINESS_FLOW_GENERATE_LABEL } from '../../mockData';
import { useInputAnalysis } from '../InputAnalysisContext';

export type BusinessFlowCategoryProps = {
  onSaved?: () => void;
};

export function BusinessFlowCategory({ onSaved }: BusinessFlowCategoryProps) {
  const {
    flowDraft,
    savedFlow,
    flowEditing,
    setFlowDraft,
    startFlowEdit,
    cancelFlowEdit,
    saveFlow,
    setGenerateDiagram,
  } = useInputAnalysis();

  const isDirty = flowDraft !== savedFlow;

  const handleSave = () => {
    saveFlow();
    onSaved?.();
  };

  const openFlowPanel = () => setGenerateDiagram(true);

  const aiChatMenu = (
    <ListItem
      leadingSlot={<MessageCircleMore aria-hidden />}
      onClick={openFlowPanel}
    >
      AIチャットに相談
    </ListItem>
  );

  return (
    <div className="flex flex-col gap-4">
      {flowEditing ? (
        <TextArea
          value={flowDraft}
          onChange={(event) => setFlowDraft(event.target.value)}
          rows={12}
          resize="vertical"
          aria-label="業務フロー"
          className="font-mono caption"
        />
      ) : (
        <pre className="m-0 whitespace-pre-wrap break-words font-mono caption text-text-neutral-primary">
          {savedFlow}
        </pre>
      )}

      <div className="flex items-center justify-end gap-2">
        <Button
          emphasis="ghost"
          intent="default"
          size="sm"
          leadingIcon={<Sparkles aria-hidden />}
          onClick={openFlowPanel}
        >
          {BUSINESS_FLOW_GENERATE_LABEL}
        </Button>
        {flowEditing ? (
          <>
            <Button
              size="sm"
              emphasis="secondary"
              intent="default"
              onClick={cancelFlowEdit}
            >
              キャンセル
            </Button>
            <Button size="sm" disabled={!isDirty} onClick={handleSave}>
              保存
            </Button>
          </>
        ) : (
          <SplitButton
            variant="secondary"
            leadingIcon={<PencilLine aria-hidden />}
            onClick={startFlowEdit}
            menu={aiChatMenu}
            menuPlacement="above"
            menuLabel="業務フローのオプション"
          >
            編集
          </SplitButton>
        )}
      </div>
    </div>
  );
}
