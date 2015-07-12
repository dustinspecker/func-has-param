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

let coffeeFile, jsFile;

// contents of awesome-js-file.js
/**
 * function test(param) {}
 */
jsFile = fs.readFileSync('awesome-js-file.js');

funcHasParam(jsFile, 'test', 'param');
// => true

funcHasParam(jsFile, 'test', 'x');
// => false


// contents of awesome-coffee-file.coffee
/**
 * test = (param) -> {}
 */
coffeeFile = fs.readFileSync('awesome-coffee-file.coffee');

funcHasParam(coffeeFile, 'test', 'param', {language: 'coffee'});
// => true

funcHasParam(coffeeFile, 'test', 'x', {language: 'coffee'});
// => false
```

### ES5
```javascript
var fs = require('fs')
  , funcHasParam = require('func-has-param')
  , coffeeFile, jsFile;

// contents of awesome-js-file.js
/**
 * function test(param) {}
 */
jsFile = fs.readFileSync('awesome-js-file.js');

funcHasParam(jsFile, 'test', 'param');
// => true

funcHasParam(jsFile, 'test', 'x');
// => false

// contents of awesome-coffee-file.coffee
/**
 * test = (param) -> {}
 */
coffeeFile = fs.readFileSync('awesome-coffee-file.coffee');

funcHasParam(coffeeFile, 'test', 'param', {language: 'coffee'});
// => true

funcHasParam(coffeeFile, 'test', 'x', {language: 'coffee'});
// => false
```

## Options
### language
A string with the language of the file being inspected. Default option is `js`. Other possible option is `coffee`.

## LICENSE
MIT