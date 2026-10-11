import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import type { ESLint } from 'eslint';

// The plugin's published declarations use the legacy ESLint context types.
// Its flat-config runtime is compatible; adapt only this external boundary.
const typescriptPlugin = tsPlugin as unknown as ESLint.Plugin;

export default defineConfig([
  { ignores: ['dist/**', 'node_modules/**', 'work/**', 'outputs/**'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: { parser: tsParser, parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, globals: { ...globals.browser, ...globals.node } },
    plugins: { '@typescript-eslint': typescriptPlugin },
    rules: { ...js.configs.recommended.rules, ...tsPlugin.configs.recommended.rules, 'no-undef': 'off', 'no-unused-vars': 'off' },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: { 'react-hooks': { rules: reactHooks.rules }, 'react-refresh': reactRefresh },
    rules: { 'react-hooks/rules-of-hooks': 'error', 'react-hooks/exhaustive-deps': 'error', 'react-refresh/only-export-components': ['error', { allowConstantExport: true }] },
  },
]);
