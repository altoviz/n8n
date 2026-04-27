/**
 * Patches eslint-plugin-n8n-nodes-base to replace removed ESLint 9 context methods.
 * context.getFilename() and context.getSourceCode() were removed in ESLint 9 flat-config mode
 * but the plugin hasn't been updated yet. This runs as a postinstall hook.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';

const REPLACEMENTS = [
  [/context\.getFilename\(\)/g, 'context.filename'],
  [/context\.getSourceCode\(\)/g, 'context.sourceCode'],
];

const PLUGIN_PATHS = [
  'node_modules/eslint-plugin-n8n-nodes-base/dist/lib/rules',
  'node_modules/@n8n/node-cli/node_modules/eslint-plugin-n8n-nodes-base/dist/lib/rules',
];

let patched = 0;

for (const dir of PLUGIN_PATHS) {
  const fullDir = join(process.cwd(), dir);
  try {
    for await (const file of glob('*.js', { cwd: fullDir })) {
      const filePath = join(fullDir, file);
      let src = readFileSync(filePath, 'utf8');
      const original = src;
      for (const [pattern, replacement] of REPLACEMENTS) {
        src = src.replace(pattern, replacement);
      }
      if (src !== original) {
        writeFileSync(filePath, src);
        patched++;
      }
    }
  } catch {
    // directory doesn't exist (e.g. nested copy not present), skip
  }
}

if (patched > 0) {
  console.log(`patched ${patched} file(s) in eslint-plugin-n8n-nodes-base for ESLint 9+ compat`);
}
