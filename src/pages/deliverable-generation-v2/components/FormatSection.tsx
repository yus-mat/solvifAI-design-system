import { AccordionCard } from '@/components/AccordionCard';
import { ButtonIcon } from '@/components/Button/ButtonIcon';
import { Card } from '@/components/Card';
import { X } from '@/icons';
import { DEFAULT_FORMAT_LABEL } from '../mockData';
import { FormSectionHeader } from './FormSectionHeader';

export function FormatSection() {
  return (
    <AccordionCard
      defaultOpen
      header={<FormSectionHeader title="フォーマット" />}
      toggleLabel="フォーマットを展開"
    >
      <Card className="flex items-center justify-between rounded-xl p-6">
        <span className="body-2-bold text-text-neutral-primary">
          {DEFAULT_FORMAT_LABEL}
        </span>
        <ButtonIcon
          emphasis="ghost"
          intent="default"
          size="sm"
          icon={<X aria-hidden />}
          aria-label={`${DEFAULT_FORMAT_LABEL}を削除`}
        />
      </Card>
    </AccordionCard>
  );
}
