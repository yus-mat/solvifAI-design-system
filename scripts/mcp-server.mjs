import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const selfDir = path.dirname(fileURLToPath(import.meta.url));
const manifestCandidates = [
  path.join(selfDir, 'manifest.json'), // dist/ (built/installed package)
  path.join(selfDir, '../src/generated/manifest.json'), // local repo dev
];
const manifestPath = manifestCandidates.find(existsSync) ?? manifestCandidates[0];

function loadManifest() {
  try {
    return JSON.parse(readFileSync(manifestPath, 'utf-8'));
  } catch {
    throw new Error(
      `Manifest not found at ${manifestPath}. Run "npm run manifest:build" (or "npm run build:lib") in the design system repo first.`,
    );
  }
}

function textResult(value) {
  return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] };
}

const server = new McpServer({
  name: 'sola-design-system',
  version: '1.0.0',
});

server.registerTool(
  'list_components',
  {
    title: 'List SOLA components',
    description:
      'Lists every component in the SOLA design system with its category and description. Call this first, before generating any UI, to see what already exists.',
    inputSchema: {},
  },
  async () => {
    const manifest = loadManifest();
    return textResult(
      manifest.components.map((c) => ({
        name: c.name,
        category: c.category,
        description: c.description,
      })),
    );
  },
);

server.registerTool(
  'get_component',
  {
    title: 'Get SOLA component details',
    description:
      'Returns full details for one SOLA component by exact name: every prop, its type, allowed variant values, default value, and Storybook example names. Always call this before using a component in generated code, and never invent a prop or variant value that is not listed in the result.',
    inputSchema: {
      name: z.string().describe('Exact component name, e.g. "Button"'),
    },
  },
  async ({ name }) => {
    const manifest = loadManifest();
    const component = manifest.components.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (!component) {
      const suggestions = manifest.components
        .map((c) => c.name)
        .filter((n) => n.toLowerCase().includes(name.toLowerCase()));
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `No component named "${name}". Closest matches: ${suggestions.join(', ') || 'none — try search_components'}.`,
          },
        ],
      };
    }
    return textResult(component);
  },
);

server.registerTool(
  'search_components',
  {
    title: 'Search SOLA components',
    description:
      'Searches components by keyword against name, category, and description. Use this when unsure of the exact component name before falling back to get_component.',
    inputSchema: {
      query: z.string().describe('Keyword to search for, e.g. "toggle" or "overlay"'),
    },
  },
  async ({ query }) => {
    const manifest = loadManifest();
    const q = query.toLowerCase();
    const matches = manifest.components.filter((c) =>
      [c.name, c.category, c.description].filter(Boolean).some((field) => field.toLowerCase().includes(q)),
    );
    return textResult(
      matches.map((c) => ({ name: c.name, category: c.category, description: c.description })),
    );
  },
);

server.registerTool(
  'get_design_tokens',
  {
    title: 'Get SOLA design tokens',
    description:
      'Returns the valid design token vocabulary (color, radius, shadow, font, opacity). Each entry is a Tailwind utility suffix — e.g. "background-action-primary" is used as bg-background-action-primary or text-background-action-primary. Never invent a raw hex color or arbitrary Tailwind value; always use one of these tokens.',
    inputSchema: {
      namespace: z
        .enum(['color', 'radius', 'shadow', 'font', 'opacity'])
        .optional()
        .describe('Restrict to one token namespace; omit for all'),
    },
  },
  async ({ namespace }) => {
    const manifest = loadManifest();
    return textResult(namespace ? { [namespace]: manifest.tokens[namespace] } : manifest.tokens);
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
