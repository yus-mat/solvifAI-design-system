import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALPHA_BLACK,
  ALPHA_NEUTRAL,
  ALPHA_WHITE,
  AZURE,
  TAILWIND,
} from './figma-palettes.mjs';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(rootDir, '../src/styles/generated/primitive-colors.json');

const payload = {
  tailwind: TAILWIND,
  custom: {
    azure: AZURE,
  },
  alpha: {
    black: ALPHA_BLACK,
    white: ALPHA_WHITE,
    neutral: ALPHA_NEUTRAL,
  },
};

writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);

console.log(`✔︎ ${path.relative(process.cwd(), outputPath)}`);
