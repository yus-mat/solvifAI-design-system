import { copyFileSync, chmodSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gitDir = path.join(rootDir, '.git');

if (!existsSync(gitDir)) {
  process.exit(0);
}

const source = path.join(rootDir, 'scripts/hooks/pre-commit');
const hooksDir = path.join(gitDir, 'hooks');
const dest = path.join(hooksDir, 'pre-commit');

mkdirSync(hooksDir, { recursive: true });
copyFileSync(source, dest);
chmodSync(dest, 0o755);

console.log('✔︎ git pre-commit hook installed (enforces design-system boundary only in clones marked downstream)');
