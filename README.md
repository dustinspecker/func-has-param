# func-has-param
[![NPM version](https://badge.fury.io/js/func-has-param.svg)](https://badge.fury.io/js/func-has-param) [![Build Status](https://travis-ci.org/dustinspecker/func-has-param.svg)](https://travis-ci.org/dustinspecker/func-has-param) [![Coverage Status](https://img.shields.io/coveralls/dustinspecker/func-has-param.svg)](https://coveralls.io/r/dustinspecker/func-has-param?branch=master)

[![Code Climate](https://codeclimate.com/github/dustinspecker/func-has-param/badges/gpa.svg)](https://codeclimate.com/github/dustinspecker/func-has-param) [![Dependencies](https://david-dm.org/dustinspecker/func-has-param.svg)](https://david-dm.org/dustinspecker/func-has-param/#info=dependencies&view=table) [![DevDependencies](https://david-dm.org/dustinspecker/func-has-param/dev-status.svg)](https://david-dm.org/dustinspecker/func-has-param/#info=devDependencies&view=table)

> Check if function in file has parameter

## Install
```
npm install --save func-has-param
```

## Usage
### ES2015 (ES6)
```javascript
import fs from 'fs';
import funcHasParam from 'func-has-param';

// contents of awesome-js-file.js
/**
 * function test(param) {}
 */
fs.readFile('awesome-js-file.js', 'utf8', (err, data) => {
  funcHasParam(data, 'test', 'param');
  // => true

  funcHasParam(data, 'test', 'x');
  // => false
});

// contents of awesome-coffee-file.coffee
/**
 * test = (param) -> {}
 */
fs.readFile('awesome-coffee-file.coffee', 'utf8', (err, data) => {
  funcHasParam(data, 'test', 'param', {language: 'coffee'});
  // => true

  funcHasParam(data, 'test', 'x', {language: 'coffee'});
  // => false
  });

// contents of awesome-ts-file.ts
/**
 * function test (param: string): string {}
 */
fs.readFile('awesome-ts-file.ts', 'utf8', (err, data) => {
  funcHasParam(data, 'test', 'param', {language: 'ts'});
  // => true

  funcHasParam(data, 'test', 'param', {language: 'ts', type: 'string'});
  // => true

  funcHasParam(data, 'test', 'param', {language: 'ts', type: 'int'});
  // => false

  funcHasParam(data, 'test', 'x', {language: 'ts'});
  // => false
});
```

### ES5
```javascript
var fs = require('fs')
  , funcHasParam = require('func-has-param');

// contents of awesome-js-file.js
/**
 * function test(param) {}
 */
fs.readFile('awesome-js-file.js', 'utf8', function (err, data) {
  funcHasParam(data, 'test', 'param');
  // => true

  funcHasParam(data, 'test', 'x');
  // => false
});

// contents of awesome-coffee-file.coffee
/**
 * test = (param) -> {}
 */
fs.readFileSync('awesome-coffee-file.coffee', 'utf8', function (err, data) {
  funcHasParam(data, 'test', 'param', {language: 'coffee'});
  // => true

  funcHasParam(data, 'test', 'x', {language: 'coffee'});
  // => false
});

// contents of awesome-ts-file.ts
/**
 * function test (param: string): string {}
 */
fs.readFileSync('awesome-ts-file.ts', 'utf8', function (err, data) {
  funcHasParam(data, 'test', 'param', {language: 'ts'});
  // => true

  funcHasParam(data, 'test', 'param', {language: 'ts', type: 'string'});
  // => true

  funcHasParam(data, 'test', 'param', {language: 'ts', type: 'int'});
  // => false

  funcHasParam(data, 'test', 'x', {language: 'ts'});
  // => false
});
```

## API

### funcHasParam(fileContents, functionName, parameterName, [options])

Returns a `boolean`.

#### fileContents

Type: `string`

File contents to be searched for `functionName` with `parameterName`.

#### functionName

Type: `string`

Function name to look for.

#### parameterName

Type: `string`

Parameter name to look for within function signature.

#### options

##### language

Type: `string`

Default: `js`

A string with the language of the file being inspected. Default option is `js` for JavaScript. Other possible options are `coffee` for CoffeeScript and `ts` for TypeScript.

##### regex

Type: `regex`

Custom regex to use. Must include a group.

##### type

Type: `string`

Only used when using language option with `ts` value. A string that's used to match the parameter type as well as the parameter name.

## LICENSE
MIT