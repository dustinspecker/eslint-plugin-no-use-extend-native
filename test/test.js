'use strict';
import noUseExtendNativeRule from '../rules/no-use-extend-native';
import {RuleTester} from 'eslint';

let ruleTester = new RuleTester();

ruleTester.run('no-use-native-extend', noUseExtendNativeRule, {
  valid: [
    {code: 'gulp.task();'},
    {code: '[].push(1);'},
    {code: '({}).toString();'},
    {code: '/match_this/.test();'},
    {code: '\'string\'.toString();'},
    {code: '(function testFunction() {}).toString();'},
    {code: 'new Array().toString();'},
    {code: 'new ArrayBuffer().constructor();'},
    {code: 'new Boolean().toString();'},
    {code: 'new DataView().buffer();'},
    {code: 'new Date().getDate();'},
    {code: 'new Error().message();'},
    {code: 'new Float32Array().values();'},
    {code: 'new Float64Array().values();'},
    {code: 'new Function().toString();'},
    {code: 'new Int16Array().values();'},
    {code: 'new Int32Array().values();'},
    {code: 'new Int8Array().values();'},
    {code: 'new Map().clear();'},
    {code: 'new Number().toString();'},
    {code: 'new Object().toString();'},
    {code: 'new Promise().then();'},
    {code: 'new RegExp().test();'},
    {code: 'new Set().values();'},
    {code: 'new String().toString();'},
    {code: 'new Symbol().toString();'},
    {code: 'new Uint16Array().values();'},
    {code: 'new Uint32Array().values();'},
    {code: 'new Uint8ClampedArray().values();'},
    {code: 'new WeakMap().get();'},
    {code: 'new WeakSet().has();'}
  ],
  invalid: [
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
    }
  ]
});
