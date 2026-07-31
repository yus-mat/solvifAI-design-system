export function FormSectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-0.5">
      <span
        className="flex size-[33px] items-center justify-center"
        aria-hidden
      >
        <span className="size-3.5 rounded-full bg-gradient-to-b from-background-action-primary-gradient-end/70 to-background-action-primary/70" />
      </span>
      <span className="body-1 text-text-neutral-primary">
        {title}
      </span>
    </div>
  );
}
