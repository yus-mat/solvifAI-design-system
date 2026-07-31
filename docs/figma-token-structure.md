# SOLA Figma Design Token Structure

Source file: [SOLA (Figma)](https://www.figma.com/design/wGuiIwIAHBXQoW8LudaBcz/SOLA?node-id=0-1)

Generated artifacts:

- `tokens/primitives/color.json` — raw color palettes
- `tokens/primitives/spacing.json` — spacing scale
- `tokens/primitives/radius.json` — border radius scale
- `tokens/primitives/shadow.json` — elevation shadows
- `tokens/semantic/color.json` — semantic role tokens referencing primitives (no hex literals)
- `style-dictionary.config.mjs` — builds `dist/tokens/` from all token sources
- This document — architecture and mapping summary

---

## Architecture overview

SOLA uses a **three-tier color system** plus supporting primitive collections:

```
┌─────────────────────────────────────────────────────────────┐
│  Semantic/New  (Light / Dark modes)                         │
│  Role-based tokens: Text, Background, Border, Surface, …    │
└───────────────┬─────────────────────┬───────────────────────┘
                │                     │
                ▼                     ▼
┌───────────────────────────┐  ┌──────────────────────────────┐
│  Raw/color_tailwind       │  │  Raw/color_custom            │
│  Tailwind palette (245)   │  │  Brand palettes (22)         │
│  gray, rose, emerald, …   │  │  Azure, Sky blue             │
└───────────────────────────┘  └──────────────────────────────┘
                │
                ▼
┌───────────────────────────┐
│   Raw/color_alpha         │
│  Alpha overlays (37)      │
│  black/a*, white/a*, …    │
└───────────────────────────┘
```

**Key principle:** Semantic tokens never store hex values. They alias (reference) raw palette tokens. Raw color tokens are the leaf nodes where Figma holds the actual color values.

---

## Variable collections

| Collection | Modes | Variables | Role |
|---|---:|---:|---|
| `Semantic/New` | Light, Dark | 58 | UI role tokens (what designers & devs consume) |
| `Raw/color_tailwind` | Mode 1 | 245 | Tailwind CSS color scales |
| `Raw/color_custom` | Mode 1 | 22 | SOLA brand palettes (Azure, Sky blue) |
| ` Raw/color_alpha` | alpha-tokens-figma-native | 37 | Transparent overlays & state fills |
| `Raw/spacing` | default | 35 | Spacing scale (Tailwind-compatible px) |
| `Raw/border-radius` | default | 9 | Border radius scale |
| `Production-tokens` | SolvifAI v2 | 40 | Legacy/app-specific tokens (leaf values) |
| `Identity` | Mode 1 | 12 | User avatar color pairs (User/1–6 bg+text) |

---

## Connection point: Semantic → Raw

### How aliasing works

Each `Semantic/New` color variable resolves through a **variable alias chain**:

```
Semantic/New/Text/Primary  ──Light──▶  Raw/color_tailwind/gray/950
                           ──Dark───▶  Raw/color_tailwind/gray/50
```

In `tokens/semantic/color.json` this is expressed as:

```json
"text": {
  "primary": {
    "$type": "color",
    "light": { "$value": "{color.tailwind.gray.950}" },
    "dark":  { "$value": "{color.tailwind.gray.50}" }
  }
}
```

The referenced leaf values live in `tokens/primitives/color.json`.

### Mapping statistics (58 semantic tokens × 2 modes)

| Target collection | Alias count | Usage |
|---|---:|---|
| `Raw/color_tailwind` | 74 | Neutrals, status colors, surfaces, borders |
| `Raw/color_custom` | 16 | Brand accent, action, primary buttons |
| ` Raw/color_alpha` | 20 | Scrims, overlays, interactive state fills |
| `transparent` | 4 | Ghost/secondary button backgrounds |
| Literal RGBA | 2 | `Background/Overlay` only (see below) |

---

## Semantic → Raw/color_tailwind

Used for **neutral UI**, **status/feedback colors**, and **structural surfaces**.

### Neutrals (gray scale)

| Semantic token | Light → | Dark → |
|---|---|---|
| `Text/Primary` | `gray/950` | `gray/50` |
| `Text/Secondary` | `gray/700` | `gray/300` |
| `Text/Muted` | `gray/400` | `gray/600` |
| `Text/Inverse` | `gray/50` | `gray/950` |
| `Background/Primary` | `white` | `gray/700` |
| `Background/Secondary` | `gray/100` | `gray/900` |
| `Background/Muted` | `gray/200` | `gray/600` |
| `Surface/Default` | `white` | `gray/900` |
| `Surface/Raise` | `white` | `gray/700` |
| `Surface/Muted` | `gray/100` | `gray/800` |
| `Surface/Subtle` | `gray/50` | `gray/800` |
| `Border/Primary` | `gray/700` | `gray/300` |
| `Border/Secondary` | `gray/400` | `gray/600` |
| `Border/Muted` | `gray/200` | `gray/800` |
| `Border/Inverse` | `white` | `gray/950` |

### Status colors (Tailwind hues)

| Role | Text (L / D) | Background (L / D) | Border (L / D) |
|---|---|---|---|
| Error | `rose/700` / `rose/300` | `rose/100` / `rose/900` | `rose/600` / `rose/400` |
| Success | `emerald/700` / `emerald/300` | `emerald/100` / `emerald/900` | `emerald/600` / `emerald/400` |
| Warning | `orange/700` / `orange/300` | `orange/100` / `orange/900` | `orange/600` / `orange/400` |
| Info | `cyan/700` / `cyan/300` | `cyan/100` / `cyan/900` | `cyan/600` / `cyan/400` |
| Accent | `violet/700` / `violet/300` | `violet/50` / `violet/950` (subtle), `violet/600` / `violet/700` (strong) | `violet/600` / `violet/400` |

### Destructive buttons

| State | Light / Dark (same in both modes) |
|---|---|
| Primary Default | `rose/700` |
| Primary Hover | `rose/800` |
| Primary Pressed | `rose/900` |
| Secondary Default | `transparent` |
| Secondary Hover | `rose/50` / `rose/800` |
| Secondary Pressed | `rose/100` / `rose/900` |

### Interactive backgrounds

| State | Light | Dark |
|---|---|---|
| Default | `white` | `gray/700` |
| Hover | `gray/100` | `gray/600` |
| Pressed | `gray/200` | `gray/500` |

---

## Semantic → Raw/color_custom

Used for **brand identity** — the Azure palette is the primary brand color.

| Semantic token | Light → | Dark → |
|---|---|---|
| `Text/Action` | `Azure/700` | `Azure/300` |
| `Border/Action` | `Azure/600` | `Azure/400` |
| `Background/Brand` | `Azure/100` | `Azure/900` |
| `Background/Accent/Primary/Default` | `Azure/700` | `Azure/700` |
| `Background/Accent/Primary/Hover` | `Azure/800` | `Azure/800` |
| `Background/Accent/Primary/Pressed` | `Azure/900` | `Azure/900` |
| `Background/Accent/Secondary/Default` | `transparent` | `transparent` |
| `Background/Accent/Secondary/Hover` | `Azure/50` | `Azure/950` |
| `Background/Accent/Secondary/Pressed` | `Azure/100` | `Azure/900` |

### Raw/color_custom palettes

| Palette | Shades | Notes |
|---|---|---|
| **Azure** | 50–950 (11 steps) | Primary brand color; drives accent/action tokens |
| **Sky blue** | 50–950 (11 steps) | Secondary brand palette; available but not wired to semantic tokens yet |

Naming in Figma: `Azure/700`, `Sky blue/500` (space in palette name).

---

## Semantic → Raw/color_alpha

Used for **overlays, scrims, and subtle interactive fills**. These tokens are mode-agnostic (same reference in Light and Dark).

| Semantic token | → Alpha reference |
|---|---|
| `preview-overlay` | `color/black/a16` |
| `drawer-scrim` | `color/black/a32` |
| `modal-scrim` | `color/black/a48` |
| `backdrop` | `color/black/a64` |
| `disabled-fill` | `color/neutral/a4` |
| `card-hover` | `color/neutral/a4` |
| `hover-fill` | `color/neutral/a8` |
| `input-fill` | `color/neutral/a8` |
| `pressed-fill` | `color/neutral/a12` |
| `selected-fill` | `color/neutral/a16` |

The alpha collection also defines `color/black/a*`, `color/white/a*`, and `color/neutral/a*` scales (a4 through a80), plus semantic-named aliases under `semantic/overlay/*` and `semantic/state/*`.

---

## Exception: Background/Overlay

`Background/Overlay` is the **only semantic token that stores literal RGBA** in Figma instead of aliasing to a raw token:

| Mode | Figma value |
|---|---|
| Light | black @ 38% opacity |
| Dark | white @ 38% opacity |

In `tokens/semantic/color.json` this is documented via `$extensions.figma` with `baseToken` + `opacity` references rather than a hex literal.

---

## Non-color primitive tokens

All non-color primitives live under `tokens/primitives/` (`spacing.json`, `radius.json`, `shadow.json`). Color primitives are in `tokens/primitives/color.json`.

### Spacing (`Raw/spacing`)

Source: [SOLA Figma](https://www.figma.com/design/wGuiIwIAHBXQoW8LudaBcz/SOLA?node-id=0-1) — collection `Raw/spacing` (35 variables, `default` mode).

Tailwind-compatible spacing scale. Values are `dimension` tokens in px.

| Figma variable | JSON key | Value |
|---|---|---:|
| `spacing/0` | `spacing.0` | 0px |
| `spacing/px` | `spacing.px` | 1px |
| `spacing/0_5` | `spacing.0-5` | 2px |
| `spacing/1` | `spacing.1` | 4px |
| `spacing/4` | `spacing.4` | 16px |
| `spacing/8` | `spacing.8` | 32px |
| `spacing/96` | `spacing.96` | 384px |

Scopes: `WIDTH_HEIGHT`, `GAP`.

### Border radius (`Raw/border-radius`)

Source: [SOLA Figma](https://www.figma.com/design/wGuiIwIAHBXQoW8LudaBcz/SOLA?node-id=0-1) — collection `Raw/border-radius` (9 variables).

| Figma variable | JSON key | Value |
|---|---|---:|
| `radius/none` | `borderRadius.none` | 0px |
| `radius/sm` | `borderRadius.sm` | 2px |
| `radius/base` | `borderRadius.base` | 4px |
| `radius/md` | `borderRadius.md` | 6px |
| `radius/lg` | `borderRadius.lg` | 8px |
| `radius/xl` | `borderRadius.xl` | 12px |
| `radius/2xl` | `borderRadius.2xl` | 16px |
| `radius/3xl` | `borderRadius.3xl` | 24px |
| `radius/full` | `borderRadius.full` | 9999px |

Scopes: `CORNER_RADIUS`.

### Shadow (effect styles)

Source: [AIチャットドラフト生成 Figma](https://www.figma.com/design/WmFckTlgALQCxc15dHSJWR/AI%E3%83%81%E3%83%A3%E3%83%83%E3%83%88%E3%83%89%E3%83%A9%E3%83%95%E3%83%88%E7%94%9F%E6%88%90%E3%83%BB%E3%82%B3%E3%83%A9%E3%83%9C%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E6%A9%9F%E8%83%BD?node-id=84-7868) — local effect styles `SM` and `MD`.

Shadow colors reference alpha primitives (no hex literals):

| JSON key | Figma style | Color ref | Offset | Blur | Spread |
|---|---|---|---:|---:|---:|
| `shadow.sm` | SM | `{color.alpha.color.black.a4}` | 3px, 3px | 8px | 0px |
| `shadow.md` | MD | `{color.alpha.color.black.a4}` | 0px, 12px | 24px | 1px |

Example in `tokens/primitives/shadow.json`:

```json
"shadow": {
  "sm": {
    "$type": "shadow",
    "$value": {
      "color": "{color.alpha.color.black.a4}",
      "offsetX": "3px",
      "offsetY": "3px",
      "blur": "8px",
      "spread": "0px"
    }
  }
}
```

> **Note:** SOLA also defines legacy effect styles `boxShadow/button` and `boxShadow/card` (multi-layer). These are not exported yet; the AI chat file styles are the canonical elevation tokens for new UI.

---

## Token reference notation

| Figma path | Primitive file | Semantic reference |
|---|---|---|
| `Raw/color_tailwind/gray/950` | `tokens/primitives/color.json` → `color.tailwind.gray.950` | `{color.tailwind.gray.950}` |
| `Raw/color_custom/Azure/700` | `tokens/primitives/color.json` → `color.custom.azure.700` | `{color.custom.azure.700}` |
| ` Raw/color_alpha/color/black/a32` | `tokens/primitives/color.json` → `color.alpha.color.black.a32` | `{color.alpha.color.black.a32}` |
| `Semantic/New/Text/Primary` (Light) | — | `tokens/semantic/color.json` → `color.text.primary` (mode: light) |
| `Raw/spacing/4` | `tokens/primitives/spacing.json` → `spacing.4` | `{spacing.4}` |
| `Raw/border-radius/lg` | `tokens/primitives/radius.json` → `borderRadius.lg` | `{borderRadius.lg}` |
| Effect style `SM` | `tokens/primitives/shadow.json` → `shadow.sm` | `{shadow.sm}` |

---

## Recommended consumption pattern

1. **Use semantic tokens in UI code** — never reference raw palette tokens directly in components.
2. **Resolve via theme mode** — pick `light` or `dark` from each semantic entry.
3. **Resolve references recursively** — follow `{color.*}` / `{shadow.*}` chains until a leaf token; leaf color values live in Figma (sync separately if needed).
4. **Use primitive tokens for layout** — reference `spacing.*`, `borderRadius.*`, and `shadow.*` from `tokens/primitives/` (no semantic layer for these yet).
5. **Build with Style Dictionary** — run `npm run tokens:build` to compile all token files into `dist/tokens/`.
6. **Keep raw tokens as source of truth** — when updating brand colors, change `Raw/color_custom/Azure/*` in Figma; semantic tokens update automatically via aliases.

---

## File map (Figma canvas ↔ collections)

The **⾊ Color** page (`node-id=0-1`) documents the token system visually:

- Raw palette swatches labeled `Raw / Azure /50`, `Raw / Gray/100`, etc.
- Semantic token table with Light/Dark columns (`text.primary`, `background.primary`, …)
- Theme preview sections (`Theme / Light`, `Theme / Dark`)

The variable collections above are the authoritative source; the canvas is the documentation layer.
