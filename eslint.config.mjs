import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  { ignores: ['build'] },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs', '**/*.json'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      parser: tsparser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': ['error'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: ['class', 'function', 'return', 'try', 'switch'],
        },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'never', prev: 'import', next: 'import' },
        {
          blankLine: 'always',
          prev: '*',
          next: ['multiline-block-like', 'multiline-const'],
        },
        { blankLine: 'never', prev: 'case', next: 'case' },
      ],
    },
  },
];
