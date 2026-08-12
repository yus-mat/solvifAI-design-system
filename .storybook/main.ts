import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** Page stories are for local product preview only — omit from published builds. */
const includePages = process.env.STORYBOOK_INCLUDE_PAGES === 'true';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ...(includePages
      ? ['../src/pages/**/*.stories.@(js|jsx|mjs|ts|tsx)']
      : []),
  ],
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const base = process.env.STORYBOOK_BASE_PATH || '/';

    return mergeConfig(config, {
      base,
      resolve: {
        alias: {
          '@': path.resolve(rootDir, '../src'),
        },
      },
      server: {
        fs: {
          allow: [path.resolve(rootDir, '..')],
        },
      },
    });
  },
};

export default config;
