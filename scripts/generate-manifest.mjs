import { readFileSync, readdirSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { withCustomConfig } from 'react-docgen-typescript';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = path.join(rootDir, 'src/components');
const themeCssPath = path.join(rootDir, 'src/styles/theme.css');
const outputDir = path.join(rootDir, 'src/generated');
const outputPath = path.join(outputDir, 'manifest.json');

const docgenParser = withCustomConfig(path.join(rootDir, 'tsconfig.app.json'), {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => !prop.parent?.fileName.includes('node_modules'),
});

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function extractStoryMeta(storiesPath) {
  const source = readFileSync(storiesPath, 'utf-8');
  const titleMatch = source.match(/title:\s*['"]([^'"]+)['"]/);
  const exportNames = [...source.matchAll(/export const (\w+)/g)]
    .map((m) => m[1])
    .filter((name) => name !== 'meta');
  return {
    category: titleMatch ? titleMatch[1] : undefined,
    examples: exportNames,
  };
}

function extractTokens() {
  const source = readFileSync(themeCssPath, 'utf-8');
  const tokens = {};
  for (const match of source.matchAll(/^\s*--(color|radius|shadow|font|opacity)-([\w-]+):/gm)) {
    const [, namespace, name] = match;
    tokens[namespace] ??= [];
    tokens[namespace].push(`${namespace}-${name}`);
  }
  for (const namespace of Object.keys(tokens)) {
    tokens[namespace] = [...new Set(tokens[namespace])].sort();
  }
  return tokens;
}

function buildComponents() {
  const allFiles = walk(componentsDir);
  const tsxFiles = allFiles.filter((f) => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'));
  const components = [];

  for (const filePath of tsxFiles) {
    let docs;
    try {
      docs = docgenParser.parse(filePath);
    } catch (error) {
      console.warn(`⚠ skipped ${path.relative(rootDir, filePath)}: ${error.message}`);
      continue;
    }

    if (!docs || docs.length === 0) continue;

    const dir = path.dirname(filePath);
    const basename = path.basename(filePath, '.tsx');
    const storiesPath = path.join(dir, `${basename}.stories.tsx`);
    const storyMeta = statSync(storiesPath, { throwIfNoEntry: false })
      ? extractStoryMeta(storiesPath)
      : { category: undefined, examples: [] };

    for (const doc of docs) {
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(doc.displayName)) continue;

      components.push({
        name: doc.displayName,
        path: path.relative(rootDir, filePath),
        category: storyMeta.category ?? path.relative(componentsDir, dir).split(path.sep).join('/'),
        description: doc.description || undefined,
        props: Object.entries(doc.props ?? {}).map(([propName, prop]) => ({
          name: propName,
          type: prop.type?.name,
          values:
            prop.type?.name === 'enum'
              ? prop.type.value?.map((v) => v.value.replace(/^"(.*)"$/, '$1'))
              : undefined,
          required: prop.required,
          defaultValue: prop.defaultValue?.value,
          description: prop.description || undefined,
        })),
        examples: storyMeta.examples,
      });
    }
  }

  return components.sort((a, b) => a.name.localeCompare(b.name));
}

const manifest = {
  generatedAt: new Date().toISOString(),
  tokens: extractTokens(),
  components: buildComponents(),
};

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(
  `✔︎ ${path.relative(rootDir, outputPath)} (${manifest.components.length} components, ${Object.values(manifest.tokens).flat().length} tokens)`,
);
