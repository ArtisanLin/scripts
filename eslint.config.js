import importX from 'eslint-plugin-import-x'
import vitest from 'eslint-plugin-vitest'
import { builtinModules } from 'node:module'
import tseslint from 'typescript-eslint'

const banConstEnum = {
  selector: 'TSEnumDeclaration[const=true]',
  message: '请使用非 const 枚举。本项目会自动内联枚举。',
}

export default tseslint.config(
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    extends: [tseslint.configs.base],
    plugins: {
      'import-x': importX,
    },
    rules: {
      'no-debugger': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      // 大部分代码预期是与环境无关的
      'no-restricted-globals': 'off',

      'no-restricted-syntax': ['error', banConstEnum],
      'sort-imports': ['error', { ignoreDeclarationSort: true }],

      'import-x/no-nodejs-modules': [
        'error',
        { allow: builtinModules.map(mod => `node:${mod}`) },
      ],
      // 该规则强制在 TypeScript 代码中使用 '@ts-expect-error' 注释来标识有意的类型错误，以提高代码的清晰度和可维护性
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      // 强制使用 'import type' 来导入类型
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      // 如果导入的内容只有带有内联类型限定符的说明符，则强制使用顶层 'import type' 限定符
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },

  // 测试文件，无限制（在 Node / Vitest 及 jsdom 运行）
  {
    files: ['**/__tests__/**', 'packages/dts-test/**', 'packages/logger/**'],
    plugins: { vitest },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      'no-console': 'off',
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
      'vitest/no-disabled-tests': 'error',
      'vitest/no-focused-tests': 'error',
    },
  },

  // JavaScript 文件
  {
    files: ['*.js'],
    rules: {
      // 仅对 JS 文件进行 `no-unused-vars` 检查，TS 文件由 TypeScript 自行检查
      'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    },
  },

  // Node 脚本
  {
    files: [
      'eslint.config.js',
      'rollup*.config.js',
      'scripts/**',
      './*.{js,ts}',
      'packages/*/*.js',
    ],
    rules: {
      'no-restricted-globals': 'off',
      'no-restricted-syntax': ['error', banConstEnum],
      'no-console': 'off',
    },
  },

  {
    ignores: [
      '**/dist/',
      '**/temp/',
      '**/coverage/',
      '.idea/',
      'explorations/',
      'dts-build/packages',
      'packages/logger-cli/src',
    ],
  },
)
