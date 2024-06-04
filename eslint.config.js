import babelParser from '@babel/eslint-parser'
import eslintJS from '@eslint/js'
import eslintPluginEslintPlugin from 'eslint-plugin-eslint-plugin'
import eslintPluginNoUseExtendNative from './index.js'
import globals from 'globals'

export default [
  eslintJS.configs.recommended,
  eslintPluginEslintPlugin.configs['flat/recommended'],
  eslintPluginNoUseExtendNative.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
      parser: babelParser,
    },
    ignores: [
      "coverage",
    ],
  }
]
