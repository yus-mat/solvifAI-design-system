/**
 * Build-time resolver for primitive color references.
 * JSON tokens stay reference-only; resolved hex/rgba values live here until
 * primitive colors are synced from Figma.
 */
import {
  ALPHA_BLACK,
  ALPHA_NEUTRAL,
  ALPHA_WHITE,
  AZURE,
  TAILWIND,
} from './figma-palettes.mjs';

function normalizeRef(ref) {
  return ref
    .replace(/^\{|\}$/g, '')
    .replace(/\.Azure\./gi, '.azure.');
}

function lookupPath(parts) {
  if (parts[0] === 'color' && parts[1] === 'tailwind') {
    const [, , palette, shade] = parts;
    if (palette === 'transparent' || palette === 'white' || palette === 'black') {
      return TAILWIND[palette];
    }
    return TAILWIND[palette]?.[shade];
  }

  if (parts[0] === 'color' && parts[1] === 'custom' && parts[2] === 'azure') {
    return AZURE[parts[3]];
  }

  if (parts[0] === 'color' && parts[1] === 'alpha' && parts[2] === 'color') {
    const [, , , family, level] = parts;
    if (family === 'neutral') return ALPHA_NEUTRAL[level];
    if (family === 'black') return ALPHA_BLACK[level];
    if (family === 'white') return ALPHA_WHITE[level];
  }

  return undefined;
}

export function resolveColorReference(ref) {
  if (!ref || typeof ref !== 'string') return ref;
  if (!ref.startsWith('{')) return ref;

  const parts = normalizeRef(ref).split('.');
  const value = lookupPath(parts);
  if (value === undefined) {
    throw new Error(`Unresolved color reference: ${ref}`);
  }
  return value;
}

export function resolveThemedValue(value, theme, token) {
  if (value === undefined || value === null) return undefined;

  if (typeof value === 'string') {
    return value.startsWith('{') ? resolveColorReference(value) : value;
  }

  if (typeof value === 'object' && ('light' in value || 'dark' in value)) {
    const themed = value[theme];
    return themed ? resolveThemedValue(themed, theme, token) : undefined;
  }

  return value;
}

export function resolveOverlay(token, theme) {
  const ext = token.original?.$extensions?.[theme]?.figma;
  if (!ext) return undefined;

  const base = resolveColorReference(ext.baseToken);
  const opacity = ext.opacity ?? 1;

  if (base.startsWith('#')) {
    const hex = base.replace('#', '');
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return base;
}

function singleShadowToCss(shadow, theme) {
  const color = resolveThemedValue(shadow.color, theme);
  const inset = shadow.inset ? 'inset ' : '';
  return `${inset}${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.spread} ${color}`;
}

export function shadowToCss(shadow, theme = 'light') {
  if (Array.isArray(shadow)) {
    return shadow.map((s) => singleShadowToCss(s, theme)).join(', ');
  }
  return singleShadowToCss(shadow, theme);
}

export function tokenPathToCssVar(path) {
  if (path[0] === 'color') {
    return `--${path.slice(1).join('-')}`;
  }
  if (path[0] === 'spacing') {
    return `--spacing-${path[1]}`;
  }
  if (path[0] === 'borderRadius') {
    return `--radius-${path[1]}`;
  }
  if (path[0] === 'shadow') {
    return `--shadow-${path[1]}`;
  }
  return `--${path.join('-')}`;
}
