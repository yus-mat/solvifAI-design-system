import { useRef, useState } from 'react';
import { AccordionCard } from '@/components/AccordionCard';
import { Button } from '@/components/Button';
import { Attachment, TextAreaComposer } from '@/components/Chat';
import { InfoBlock } from '@/components/InfoBlock';
import { IconWrapper } from '@/components/IconWrapper';
import {
  ArrowRight,
  Database,
  FileText,
  Upload,
} from '@/icons';
import { INPUT_SOURCES } from '../mockData';
import { FormSectionHeader } from './FormSectionHeader';
import { useInputAnalysis } from './InputAnalysisContext';

const sourceIcons = {
  local: <Upload aria-hidden />,
  'ai-data': <Database aria-hidden />,
  minutes: <FileText aria-hidden />,
};

export function InputSection() {
  const [inputText, setInputText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    attachedInputs,
    uploadFile,
    removeUpload,
    openKanten,
  } = useInputAnalysis();

  const handleSourceClick = (sourceId: string) => {
    if (sourceId === 'local') {
      fileInputRef.current?.click();
    } else {
      uploadFile();
    }
  };

  return (
    <AccordionCard
      defaultOpen
      header={<FormSectionHeader title="インプット" />}
      toggleLabel="インプットを展開"
    >
      <div className="flex flex-col gap-6">
        <InfoBlock
          type="info"
          title="成果物に必要なインプットとは"
          subtitle="選択したフォーマットには確認観点が設定されています。観点に沿ったインプットを添付すると、成果物の精度が向上します。"
          actions={
            <Button
              emphasis="secondary"
              intent="default"
              size="sm"
              leadingIcon={<ArrowRight aria-hidden />}
              onClick={openKanten}
            >
              確認観点を見る
            </Button>
          }
        />

        <div className="flex flex-col gap-3">
          {INPUT_SOURCES.map((source) => (
            <button
              key={source.id}
              type="button"
              onClick={() => handleSourceClick(source.id)}
              className="flex w-full items-center gap-2 rounded-md border border-border-neutral-muted bg-background-neutral-primary px-3 py-2 text-left hover:bg-background-interactive-hover"
            >
              <IconWrapper size="md">
                {sourceIcons[source.id as keyof typeof sourceIcons]}
              </IconWrapper>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="body-2 text-text-neutral-primary">{source.title}</span>
                {source.description ? (
                  <span className="text-[10px] text-text-neutral-secondary">
                    {source.description}
                  </span>
                ) : null}
              </span>
            </button>
          ))}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(event) => {
              const files = event.target.files;
              if (files?.length) {
                Array.from(files).forEach((file) => uploadFile(file));
              }
              event.target.value = '';
            }}
          />
        </div>

        {attachedInputs.length > 0 ? (
          <div className="flex flex-col gap-3">
            <p className="m-0 text-[10px] text-text-neutral-secondary">追加されたインプット</p>
            <div className="flex flex-wrap items-start gap-3">
              {attachedInputs.map((item) => (
                <Attachment
                  key={item.id}
                  fileName={item.fileName}
                  fileExtension={item.fileExtension}
                  fileType={item.fileType}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  onRemove={() => removeUpload(item.id)}
                  removeLabel="ファイルを削除"
                />
              ))}
            </div>
          </div>
        ) : null}

        <TextAreaComposer
          value={inputText}
          onChange={setInputText}
          placeholder="テキストを入力してください"
          onFileAttach={uploadFile}
          onSend={() => setInputText('')}
        />
      </div>
    </AccordionCard>
  );
}
