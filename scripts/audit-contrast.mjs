/**
 * WCAG 2.1 contrast audit for semantic text + background pairs.
 * Run: node scripts/audit-contrast.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

function parseCssVars(filePath) {
  const css = fs.readFileSync(filePath, 'utf8');
  const vars = {};
  for (const match of css.matchAll(/--([a-z0-9-]+):\s*([^;]+);/gi)) {
    vars[match[1]] = match[2].trim();
  }
  return vars;
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function parseColor(input) {
  if (!input) return null;
  if (input.startsWith('#')) return hexToRgb(input);
  const rgba = input.match(/rgba?\(([^)]+)\)/i);
  if (!rgba) return null;
  const parts = rgba[1].split(',').map((p) => Number.parseFloat(p.trim()));
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}

function luminance([r, g, b]) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(fg, bg) {
  const fgRgb = parseColor(fg);
  const bgRgb = parseColor(bg);
  if (!fgRgb || !bgRgb) return null;
  const l1 = luminance(fgRgb);
  const l2 = luminance(bgRgb);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
  ['Brand primary button', 'text-inverse', 'background-brand-primary-default'],
  ['Brand primary hover', 'text-inverse', 'background-brand-primary-hover'],
  ['Destructive primary button', 'text-inverse', 'background-desctructive-primary-default'],
  ['Status success tag', 'text-status-success', 'background-status-success'],
  ['Status error tag', 'text-status-error', 'background-status-error'],
  ['Status warning tag', 'text-status-warning', 'background-status-warning'],
  ['Status info tag', 'text-status-info', 'background-status-info'],
  ['Status accent tag', 'text-status-accent', 'background-status-accent'],
  ['Status brand tag', 'text-action', 'background-status-brand'],
  ['Body on surface', 'text-primary', 'surface-default'],
  ['Secondary on surface', 'text-secondary', 'surface-default'],
  ['Muted on surface', 'text-muted', 'surface-default'],
  ['Action on surface', 'text-action', 'surface-default'],
  ['Text inverse on brand primary', 'text-inverse', 'background-brand-primary-default'],
];

for (const theme of ['light', 'dark']) {
  const vars = parseCssVars(
    path.join(root, `src/styles/generated/semantic-${theme}.css`),
  );
  console.log(`\n=== ${theme.toUpperCase()} ===`);
  for (const [label, textVar, bgVar] of pairs) {
    const ratio = contrastRatio(vars[textVar], vars[bgVar]);
    const passAA = ratio !== null && ratio >= 4.5;
    const passLarge = ratio !== null && ratio >= 3;
    console.log(
      `${passAA ? '✓' : passLarge ? '~' : '✗'} ${label}: ${ratio?.toFixed(2) ?? 'n/a'}:1 (${textVar} on ${bgVar})`,
    );
  }
}
