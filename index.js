/* eslint no-var: 0 */
'use strict'
const rule = require('./src/no-use-extend-native')
const {name, version} = require('./package.json')

const plugin = {
  meta: {
    name,
    version
  },
  rules: {
    'no-use-extend-native': rule
  },
  configs: {},
}

Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      'no-use-extend-native': plugin
    },
    rules: {
      'no-use-extend-native/no-use-extend-native': 2
    }
  }
})

module.exports = plugin
