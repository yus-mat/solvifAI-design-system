import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

function preferredBase(): 'light' | 'dark' {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function solaTheme(base: 'light' | 'dark') {
  return create({
    base,
    brandTitle: 'SOLA',
    brandUrl: './',
    // Relative so GitHub Pages base path (`/solvifAI-design-system/`) resolves correctly
    brandImage: './brand/sola-logo.png',
    brandTarget: '_self',
  });
}

function applyManagerTheme() {
  addons.setConfig({
    theme: solaTheme(preferredBase()),
  });
}

applyManagerTheme();

if (typeof window !== 'undefined' && window.matchMedia) {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', applyManagerTheme);
}
