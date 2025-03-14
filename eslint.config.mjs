// @ts-check
import eslint from '@eslint/js';
import * as tsParser from '@typescript-eslint/parser';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint, { configs as tsconfigs } from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tsconfigs.recommendedTypeChecked,
  react.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      // https://www.npmjs.com/package/eslint-import-resolver-typescript#configuration
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
      ],

      'import-x/ignore': ['\.(scss|less|css)$'],

      react: {
        version: 'detect',
      },
    },

    rules: {
      // ---> react specifics
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-4060570
      // Allow React Hooks Form handleSubmit to take () => Promise<void>
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            // Disables checking an asynchronous function passed as a JSX attribute expected to be a function that returns void.
            attributes: false,
          },
        },
      ],
      // <---

      // @typescript-eslint rules ----->

      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-deprecated': 'error',

      // No magic numbers
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': ['error', { ignore: [0] }], // ignore array index

      // Disallow empty functions
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'error',

      // Enforce using a particular method signature syntax
      '@typescript-eslint/method-signature-style': 'error',

      // Enforce default parameters to be last
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',

      // Require the Record type
      '@typescript-eslint/consistent-indexed-object-style': 'error',

      // Require each enum member value to be explicitly initialized
      '@typescript-eslint/prefer-enum-initializers': 'error',

      // Disallow the use of variables before they are defined
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',

      // Require any function or method that returns a Promise to be marked async.
      '@typescript-eslint/promise-function-async': 'error',

      // Disallow certain types in boolean expressions
      '@typescript-eslint/strict-boolean-expressions': 'error',

      // Disallow classes used as namespaces.
      // Override typescript-eslint strict to allow empty Module classes with decorators
      '@typescript-eslint/no-extraneous-class': [
        'error',
        {
          /** Whether to allow extraneous classes that include a decorator. */
          allowWithDecorator: true,
        },
      ],

      // Enforce template literal expressions to be of `string` type
      // Override typescript-eslint strictTyped to remove this rule.
      '@typescript-eslint/restrict-template-expressions': 'off',

      // Disallow unused variables.
      // Override typescript-eslint recommended config to allow unused variables starting with _
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // <----- @typescript-eslint rules

      // eslint rules ----->

      eqeqeq: ['error', 'always', { null: 'ignore' }],
      yoda: ['error', 'never'],

      // Disallow await inside of loops
      'no-await-in-loop': 'error',

      // Disallow else blocks after return statements in if statements
      'no-else-return': 'error',

      // Enforce consistent function declarations as `function xyz()`
      'func-style': ['error', 'declaration'],

      // Require default cases in switch statements
      'default-case': 'error',
      'default-case-last': 'error',

      // Disallow assignments that can lead to race conditions due to usage of `await` or `yield`
      'require-atomic-updates': ['error', { allowProperties: true }],

      // Enforce a maximum number of parameters in function definitions
      'max-params': ['error', 3],

      // Disallow `Array` constructors
      'no-array-constructor': 'error',

      // Disallow bitwise operators
      'no-bitwise': 'error',

      // Disallow the use of alert, confirm, and prompt
      'no-alert': 'error',

      // Disallow the use of `arguments.caller` or `arguments.callee`
      'no-caller': 'error',

      // Disallow extending native types such as Object.prototype.extra = 55;
      'no-extend-native': 'error',

      // Disallow the use of eval()
      'no-eval': 'error',

      // Disallow unnecessary calls to .bind()
      'no-extra-bind': 'error',

      // Disallow shorthand type conversions, use explicit functions
      'no-implicit-coercion': 'error',

      // Disallow nested ternary expressions
      'no-nested-ternary': 'error',

      // Disallow the unary operators ++ and --
      'no-plusplus': 'error',

      // Disallow javascript: URLs. ex: location.href = 'javascript:void(0)';
      'no-script-url': 'error',

      // Disallow ternary operators when simpler alternatives exist
      'no-unneeded-ternary': 'error',

      // Disallow unnecessary calls to `.call()` and `.apply()`
      'no-useless-call': 'error',

      // <----- eslint rules

      // Style imports :

      // https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
      // Consistently add inline `type` to imports & exports
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'import-x/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],

      // Alphabetical order imports
      'import-x/order': [
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

      // Find and remove unused es6 module imports
      'unused-imports/no-unused-imports': 'error',
    },
  },
);
