const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-config-prettier');

module.exports = [
  { ignores: ['node_modules/**', '.expo/**', 'coverage/**'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: { parser: tsParser, parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' } },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: { ...tsPlugin.configs.recommended.rules, ...prettier.rules, '@typescript-eslint/no-explicit-any': 'error' },
  },
];
