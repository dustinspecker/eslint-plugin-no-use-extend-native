'use strict';
import noUseExtendNativeRule from '../rules/no-use-extend-native';
import {RuleTester} from 'eslint';

let ruleTester = new RuleTester();

ruleTester.run('no-use-native-extend', noUseExtendNativeRule, {
  valid: [
    'gulp.task();',
    'Custom.prototype.custom',
    'Array.prototype.map',
    'Array.prototype.map.call([1,2,3], function (x) { console.log(x); });',
    '[].push(1);',
    '({}).toString();',
    '/match_this/.test();',
    '\'string\'.toString();',
    '(1).toFixed();',
    '1..toFixed();',
    '1.0.toFixed();',
    '(\'str\' + \'ing\').toString();',
    '(\'str\' + \'i\' + \'ng\').toString();',
    '(1 + 1).valueOf();',
    '(1 + 1 + 1).valueOf();',
    '(1 + \'string\').toString();',
    '(/regex/ + /regex/).toString();',
    '(/regex/ + 1).toString();',
    '([1] + [2]).toString();',
    '(function testFunction() {}).toString();',
    'new Array().toString();',
    'new ArrayBuffer().constructor();',
    'new Boolean().toString();',
    'new DataView().buffer();',
    'new Date().getDate();',
    'new Error().message();',
    'new Error().stack;',
    'new Float32Array().values();',
    'new Float64Array().values();',
    'new Function().toString();',
    'new Int16Array().values();',
    'new Int32Array().values();',
    'new Int8Array().values();',
    'new Map().clear();',
    'new Number().toString();',
    'new Object().toString();',
    'new Object().toString;',
    'new Promise().then();',
    'new RegExp().test();',
    'new Set().values();',
    'new String().toString();',
    'new Symbol().toString();',
    'new Uint16Array().values();',
    'new Uint32Array().values();',
    'new Uint8ClampedArray().values();',
    'new WeakMap().get();',
    'new WeakSet().has();',
    'new Array()[\'length\']',
    'new Array()[\'toString\']()'
  ].map(code => ({code})),
  invalid: [
    {
      code: 'Array.prototype.custom;',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '[].length();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '\'unicorn\'.green;',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '[].custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '({}).custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '/match_this/.custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '\'string\'.custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '(\'str\' + \'ing\').custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '(\'str\' + \'i\' + \'ng\').custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '(1 + \'ing\').custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '(/regex/ + \'ing\').custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '(1 + 1).toLowerCase();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '(1 + 1 + 1).toLowerCase();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: '(function testFunction() {}).custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Array().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new ArrayBuffer().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Boolean().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new DataView().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Date().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Error().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Float32Array().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Float64Array().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Function().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Int16Array().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Int32Array().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Int8Array().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Map().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Number().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Object().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Promise().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new RegExp().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Set().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new String().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Symbol().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Uint16Array().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Uint32Array().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Uint8Array().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Uint8ClampedArray().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new WeakMap().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new WeakSet().custom();',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Array()[\'custom\']',
      errors: [{message: 'Avoid using extended native objects'}]
    },
    {
      code: 'new Array()[\'custom\']()',
      errors: [{message: 'Avoid using extended native objects'}]
    }
  ]
});
