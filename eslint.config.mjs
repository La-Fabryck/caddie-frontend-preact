// @ts-check
import eslint from '@eslint/js';
import * as tsParser from '@typescript-eslint/parser';
// @ts-ignore
import * as importPlugin from 'eslint-plugin-import';
import react from "eslint-plugin-react"
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint, { configs as tsconfigs } from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tsconfigs.recommendedTypeChecked,
  //@ts-expect-error expect any due to not being a TS module
  importPlugin.flatConfigs.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      react
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
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
      '@typescript-eslint/no-explicit-any': 'off',

      // https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
      // Consistently add inline type to imports
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],

      // Alphabetical order imports
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
      
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      yoda: ['error', 'never'],

      // https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-4060570
      // Allow React Hooks Form handleSubmit to take () => Promise<void>
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          "checksVoidReturn": {
            // Disables checking an asynchronous function passed as a JSX attribute expected to be a function that returns void.
            "attributes": false
          }
        }
      ]
    },
  },
);
