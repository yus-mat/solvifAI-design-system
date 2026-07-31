import { useMemo, useState } from 'react';
import { AccordionCard } from '@/components/AccordionCard';
import { Checkbox } from '@/components/Control/Checkbox';
import { OUTLINE_ITEMS } from '../mockData';
import { FormSectionHeader } from './FormSectionHeader';

export function DraftOutlineSection() {
  const initialChecked = useMemo(
    () =>
      Object.fromEntries(
        OUTLINE_ITEMS.map((item) => [item.id, Boolean(item.defaultChecked)]),
      ),
    [],
  );
  const [checked, setChecked] = useState(initialChecked);

  const allChecked = OUTLINE_ITEMS.every((item) => checked[item.id]);

  const toggleAll = () => {
    const next = !allChecked;
    setChecked(Object.fromEntries(OUTLINE_ITEMS.map((item) => [item.id, next])));
  };

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AccordionCard
      defaultOpen
      header={<FormSectionHeader title="ドラフト目次" />}
      toggleLabel="ドラフト目次を展開"
    >
      <div className="flex flex-col gap-3.5">
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex w-fit items-center gap-3 rounded-md border border-border-neutral-muted px-4 py-3 body-2-bold text-text-neutral-primary"
        >
          <Checkbox checked={allChecked} readOnly aria-hidden />
          全選択
        </button>

        <div className="overflow-hidden rounded-lg border border-border-neutral-muted">
          {OUTLINE_ITEMS.map((item, index) => (
            <label
              key={item.id}
              className={[
                'flex h-12 cursor-pointer items-center gap-3 border-border-neutral-muted px-4',
                index < OUTLINE_ITEMS.length - 1 ? 'border-b' : '',
                item.level === 'section' ? 'pl-9' : '',
              ].join(' ')}
            >
              <Checkbox
                checked={checked[item.id]}
                onChange={() => toggleItem(item.id)}
              />
              <span
                className={
                  item.level === 'chapter'
                    ? 'body-2-bold text-text-neutral-primary'
                    : 'body-2 text-text-neutral-primary'
                }
              >
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </AccordionCard>
  );
}
