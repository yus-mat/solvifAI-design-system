import primitiveColors from '@/styles/generated/primitive-colors.json';

type PaletteRecord = Record<string, string | Record<string, string>>;

const TONAL_STEPS = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const;


function contrastText(hex: string) {
  if (hex === 'transparent') return 'text-text-neutral-primary';
  if (!hex.startsWith('#')) return 'text-text-neutral-inverse';

  const normalized = hex.replace('#', '');
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.62 ? 'text-text-neutral-primary' : 'text-text-neutral-inverse';
}

function TonalSwatch({ token, hex }: { token: string; hex: string }) {
  const checkerboard =
    hex === 'transparent'
      ? 'bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%,transparent_75%,#e5e7eb_75%,#e5e7eb),linear-gradient(45deg,#e5e7eb_25%,transparent_25%,transparent_75%,#e5e7eb_75%,#e5e7eb)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]'
      : '';

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <div
        className={[
          'flex h-12 items-end justify-start rounded-sm px-1.5 pb-1',
          checkerboard,
          contrastText(hex),
        ].join(' ')}
        style={{ backgroundColor: hex === 'transparent' ? undefined : hex }}
        title={hex}
      >
        <span className="text-[10px] font-medium leading-none opacity-90">{token}</span>
      </div>
      <code className="truncate text-[9px] text-text-muted">{hex}</code>
    </div>
  );
}

function TonalRamp({
  title,
  prefix,
  shades,
}: {
  title: string;
  prefix: string;
  shades: Record<string, string>;
}) {
  const entries = TONAL_STEPS.filter((step) => shades[step]).map((step) => ({
    step,
    hex: shades[step],
  }));

  if (entries.length === 0) return null;

  return (
    <section>
      <h4 className="mb-2 caption-bold text-text-neutral-primary">{title}</h4>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(3.5rem,1fr))] gap-2">
        {entries.map(({ step, hex }) => (
          <TonalSwatch key={step} token={`${prefix}/${step}`} hex={hex} />
        ))}
      </div>
    </section>
  );
}

function SolidSwatch({ title, token, hex }: { title: string; token: string; hex: string }) {
  return (
    <section>
      <h4 className="mb-2 caption-bold text-text-neutral-primary">{title}</h4>
      <div className="max-w-[8rem]">
        <TonalSwatch token={token} hex={hex} />
      </div>
    </section>
  );
}

function renderTailwindPalettes(palettes: PaletteRecord) {
  const solids: { name: string; token: string; hex: string }[] = [];
  const ramps: { name: string; prefix: string; shades: Record<string, string> }[] = [];

  for (const [name, value] of Object.entries(palettes)) {
    if (typeof value === 'string') {
      solids.push({ name, token: `tailwind/${name}`, hex: value });
      continue;
    }

    ramps.push({
      name,
      prefix: `tailwind/${name}`,
      shades: value,
    });
  }

  return { solids, ramps };
}

export function RawColorsDemo() {
  const tailwind = renderTailwindPalettes(primitiveColors.tailwind);
  const azure = primitiveColors.custom.azure;

  return (
    <div className="flex flex-col gap-10 bg-surface-base p-6">
      <div>
        <h2 className="body-2-bold text-text-primary">Raw color palettes</h2>
        <p className="mt-1 max-w-3xl caption text-text-secondary">
          Primitive tonals from Figma <code className="text-text-muted">Raw/color_tailwind</code>{' '}
          and <code className="text-text-muted">Raw/color_custom</code>. These are the building
          blocks behind semantic tokens — use semantic names in product UI when possible.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="caption-bold uppercase tracking-wide text-text-muted">
          Tailwind — solids
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {tailwind.solids.map((solid) => (
            <SolidSwatch
              key={solid.name}
              title={solid.name}
              token={solid.token}
              hex={solid.hex}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="caption-bold uppercase tracking-wide text-text-muted">
          Tailwind — tonals
        </h3>
        {tailwind.ramps.map((ramp) => (
          <TonalRamp key={ramp.name} title={ramp.name} prefix={ramp.prefix} shades={ramp.shades} />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="caption-bold uppercase tracking-wide text-text-muted">
          Custom — Azure
        </h3>
        <TonalRamp title="azure" prefix="custom/azure" shades={azure} />
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="caption-bold uppercase tracking-wide text-text-muted">
          Alpha overlays
        </h3>
        {Object.entries(primitiveColors.alpha).map(([family, shades]) => (
          <section key={family}>
            <h4 className="mb-2 caption-bold text-text-neutral-primary">{family}</h4>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))] gap-2">
              {Object.entries(shades).map(([step, hex]) => (
                <TonalSwatch key={step} token={`alpha/${family}/${step}`} hex={hex} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
