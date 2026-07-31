import { useState } from 'react';
import { AccordionCard } from '@/components/AccordionCard';
import { Picker, PickerGroup } from '@/components/Picker';
import { GENERATION_MODES } from '../mockData';
import { FormSectionHeader } from './FormSectionHeader';

export function GenerationModeSection() {
  const [mode, setMode] = useState('speed');

  return (
    <AccordionCard
      defaultOpen
      header={<FormSectionHeader title="生成モード" />}
      toggleLabel="生成モードを展開"
    >
      <PickerGroup value={mode} onValueChange={setMode} className="gap-3">
        {GENERATION_MODES.map((item) => (
          <Picker
            key={item.id}
            value={item.id}
            title={item.title}
            subtitle={item.description}
            className="px-5 py-3.5 [&_.flex]:flex-row [&_.flex]:flex-wrap [&_.flex]:items-center [&_.flex]:gap-4"
          />
        ))}
      </PickerGroup>
    </AccordionCard>
  );
}
