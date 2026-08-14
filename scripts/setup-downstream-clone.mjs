import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const markerPath = path.join(rootDir, '.design-system-role');
writeFileSync(markerPath, 'downstream\n');

const claudeLocalPath = path.join(rootDir, 'CLAUDE.local.md');
const claudeLocalLines = [
  '# This is a downstream (features) clone',
  '',
  'Do not edit anything under these paths - they belong to the design system',
  'source of truth, solvifAI-design-system, not this clone:',
  '',
  '- src/components/',
  '- tokens/',
  '- src/styles/theme.css',
  '- src/styles/global.css',
  '- src/icons/',
  '- src/stories/',
  '- .storybook/',
  '',
  'If a feature needs a component change (missing prop, slot, variant, size, or',
  'state), stop and flag it instead of editing the component or working around',
  'it locally. Use this template:',
  '',
  '**Component build gap**',
  '- Component: <name>',
  '- What is missing: <prop/slot/variant/state>',
  '- Needed for: <feature/page>',
  '',
  'A pre-commit hook also technically blocks commits that touch those paths in',
  'this clone - this file explains why, before you hit that block.',
  '',
];
writeFileSync(claudeLocalPath, claudeLocalLines.join('\n'));

const cursorRulesDir = path.join(rootDir, '.cursor/rules');
mkdirSync(cursorRulesDir, { recursive: true });
const cursorRulePath = path.join(cursorRulesDir, 'no-component-edits.local.mdc');
const cursorRuleLines = [
  '---',
  'description: This clone is downstream of the design system - do not edit design-system-owned paths.',
  'globs: src/components/**/*,tokens/**/*,src/styles/theme.css,src/styles/global.css,src/icons/**/*,src/stories/**/*,.storybook/**/*',
  'alwaysApply: true',
  '---',
  '',
  '# Downstream clone - do not edit the design system here',
  '',
  'This folder is a downstream (features) clone of solvifAI-design-system. The',
  'files matched by this rule (components, tokens, theme.css, global.css,',
  'icons, foundation stories, Storybook config) are owned by that repo, not',
  'this one.',
  '',
  'If a feature needs a change to one of these files: stop, do not edit it or',
  'work around it locally, and flag the gap instead using this template:',
  '',
  '**Component build gap**',
  '- Component: <name>',
  '- What is missing: <prop/slot/variant/state>',
  '- Needed for: <feature/page>',
  '',
  'A pre-commit hook will also block a commit that touches these paths here.',
  '',
];
writeFileSync(cursorRulePath, cursorRuleLines.join('\n'));

try {
  execSync('node scripts/install-git-hooks.mjs', { cwd: rootDir, stdio: 'inherit' });
} catch {
  // non-git environment; nothing to install
}

console.log('');
console.log('✔︎ This clone is now marked as downstream:');
console.log(`  - ${path.relative(rootDir, markerPath)} (local marker, gitignored)`);
console.log(`  - ${path.relative(rootDir, claudeLocalPath)} (Claude Code guidance, gitignored)`);
console.log(`  - ${path.relative(rootDir, cursorRulePath)} (Cursor guidance, gitignored)`);
console.log('  - pre-commit hook installed');
console.log('');
console.log('Edits to src/components/, tokens/, theme.css, global.css, src/icons/, src/stories/, or .storybook/ will now be blocked at commit time in this clone.');
