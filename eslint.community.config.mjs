import communityNodes from '@n8n/eslint-plugin-community-nodes';
import tseslint from 'typescript-eslint';

const { ignores, plugins, rules } = communityNodes.configs.recommended;

export default tseslint.config(
  { ignores },
  {
    files: ['nodes/**/*.ts', 'credentials/**/*.ts'],
    extends: [tseslint.configs.base],
    plugins,
    rules,
  },
  {
    files: ['package.json'],
    plugins,
    rules,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { extraFileExtensions: ['.json'] },
    },
  },
);
