const eslintJS = require('@eslint/js')
const eslintPluginEslintPlugin = require('eslint-plugin-eslint-plugin')
const eslintPluginNoUseExtendNative = require('.')
const globals = require('globals')

module.exports = [
  eslintJS.configs.recommended,
  eslintPluginEslintPlugin.configs['flat/recommended'],
  eslintPluginNoUseExtendNative.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
    ignores: [
      "coverage",
    ],
  }
]
