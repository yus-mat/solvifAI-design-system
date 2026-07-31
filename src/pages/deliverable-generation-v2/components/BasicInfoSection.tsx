import { useState } from 'react';
import { AccordionCard } from '@/components/AccordionCard';
import { Input } from '@/components/Field';
import { Label } from '@/components/Field';
import { Picker, PickerGroup } from '@/components/Picker';
import {
  DEFAULT_DOCUMENT_NAME,
  DELIVERABLE_TYPES,
} from '../mockData';
import { FormSectionHeader } from './FormSectionHeader';

export function BasicInfoSection() {
  const [documentName, setDocumentName] = useState(DEFAULT_DOCUMENT_NAME);
  const [deliverableType, setDeliverableType] = useState('business-requirements');

  return (
    <AccordionCard
      defaultOpen
      header={<FormSectionHeader title="基本情報" />}
      toggleLabel="基本情報を展開"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Label className="body-2-bold text-text-neutral-secondary">
            成果物資料名
          </Label>
          <Input
            value={documentName}
            onChange={(event) => setDocumentName(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label className="body-2-bold text-text-neutral-secondary">
            成果物種別
          </Label>
          <PickerGroup
            value={deliverableType}
            onValueChange={setDeliverableType}
            className="grid grid-cols-2 gap-5"
          >
            {DELIVERABLE_TYPES.map((type) => (
              <Picker
                key={type.id}
                value={type.id}
                title={type.label}
                className="px-6 py-4 [&_span]:text-base"
              />
            ))}
          </PickerGroup>
        </div>
      </div>
    </AccordionCard>
  );
}
