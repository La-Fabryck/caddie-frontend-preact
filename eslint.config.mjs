import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
// eslint-disable-next-line import/default
import tsParser from '@typescript-eslint/parser';
// @ts-expect-error types not shipped
import _import from 'eslint-plugin-import';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [],
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
    ),
  ),
  {
    plugins: {
      // @ts-expect-error incompatible types
      '@typescript-eslint': fixupPluginRules(typescriptEslintEslintPlugin),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...Object.fromEntries(Object.entries(globals.jest).map(([key]) => [key, 'off'])),
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },

        typescript: {
          alwaysTryTypes: true,
          project: '<root>/tsconfig.json',
        },
      },

      'import/internal-regex': '^@/',

      react: {
        version: 'detect',
      },
    },

    rules: {
      // react specifics
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      // default config starts here
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],

          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      yoda: ['error', 'never'],
    },
  },
];
