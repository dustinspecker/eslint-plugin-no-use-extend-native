# eslint-plugin-no-use-extend-native
[![NPM version](https://badge.fury.io/js/eslint-plugin-no-use-extend-native.svg)](https://badge.fury.io/js/eslint-plugin-no-use-extend-native) [![Build Status](https://travis-ci.org/dustinspecker/eslint-plugin-no-use-extend-native.svg?branch=master)](https://travis-ci.org/dustinspecker/eslint-plugin-no-use-extend-native) [![Coverage Status](https://img.shields.io/coveralls/dustinspecker/eslint-plugin-no-use-extend-native.svg)](https://coveralls.io/r/dustinspecker/eslint-plugin-no-use-extend-native?branch=master)

[![Code Climate](https://codeclimate.com/github/dustinspecker/eslint-plugin-no-use-extend-native/badges/gpa.svg)](https://codeclimate.com/github/dustinspecker/eslint-plugin-no-use-extend-native) [![Dependencies](https://david-dm.org/dustinspecker/eslint-plugin-no-use-extend-native.svg)](https://david-dm.org/dustinspecker/eslint-plugin-no-use-extend-native/#info=dependencies&view=table) [![DevDependencies](https://david-dm.org/dustinspecker/eslint-plugin-no-use-extend-native/dev-status.svg)](https://david-dm.org/dustinspecker/eslint-plugin-no-use-extend-native/#info=devDependencies&view=table)

> ESLint plugin to prevent use of extended native objects

*Uses [Sindre Sorhus](https://github.com/sindresorhus)'s [proto-props](https://github.com/sindresorhus/proto-props)*

## Install
First, install ESLint via
```
npm install --save-dev eslint
```

Then install eslint-plugin-no-use-extend-native
```
npm install --save-dev eslint-plugin-no-use-extend-native
```

## Usage
In your `.eslintrc` file add the plugin as such:

```javascript
{
  plugins: [
    'no-use-extend-native'
  ]
}
```

To modify the single rule, `no-use-extend-native`, add the rule to your `.eslintrc` as such:
```javascript
{
  plugins: [
    'no-use-extend-native'
  ],
  rules: {
    'no-use-extend-native/no-use-extend-native': 0
  }
}
```

The default value is `2`.

With this plugin enabled, ESLint will find issues with using extended native objects:
```javascript
var colors = require('colors');
console.log('unicorn'.green);
// => ESLint will give an error stating 'Avoid using extended native objects'

[].customFunction();
// => ESLint will give an error stating 'Avoid using extended native objects'
```

More examples can be seen in the [tests](https://github.com/dustinspecker/eslint-plugin-no-use-extend-native/blob/master/test/test.js).


## LICENSE
MIT © [Dustin Specker](https://github.com/dustinspecker)