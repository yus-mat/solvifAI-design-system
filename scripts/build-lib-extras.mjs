import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');

copyFileSync(path.join(rootDir, 'src/generated/manifest.json'), path.join(distDir, 'manifest.json'));
copyFileSync(path.join(rootDir, 'scripts/mcp-server.mjs'), path.join(distDir, 'mcp-server.mjs'));

const tokenFiles = [
  'src/styles/generated/primitives.css',
  'src/styles/generated/shadows.css',
  'src/styles/generated/semantic-light.css',
  'src/styles/generated/semantic-dark.css',
  'src/styles/theme.css',
];
writeFileSync(
  path.join(distDir, 'theme.css'),
  tokenFiles.map((f) => readFileSync(path.join(rootDir, f), 'utf-8')).join('\n'),
);

console.log('✔︎ dist/manifest.json, dist/mcp-server.mjs, dist/theme.css');
