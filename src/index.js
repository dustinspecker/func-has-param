'use strict';
import funcGetParams from 'func-get-params';

/**
 * Check for string type
 * @param {Object} o - object to type check
 * @param {String} paramName - parameter name being checked
 * @throws {TypeError} - if o is not a string
 */
function stringCheck(o, paramName) {
  if (typeof o !== 'string') {
    throw new TypeError(`Expected ${paramName} to be a string`);
  }
}

/**
 * Check for empty string
 * @param {String} str - string to check if not empty
 * @param {String} paramName - parameter name being checked
 * @throws {Error} - if str is an empty string
 */
function emptyStringCheck(str, paramName) {
  if (str.length === 0) {
    throw new Error(`Expected ${paramName} to be non-empty string`);
  }
}

/**
 * Check for whitespace
 * @param {String} str - string to check for whitespace
 * @param {String} paramName - parameter name being checked
 * @throws {Error} - if str contains whitespace
 */
function whitespaceCheck(str, paramName) {
  if (str.match(/\s/g)) {
    throw new Error(`Expected ${paramName} to not contain whitespace`);
  }
}

/**
 * Does function in string have a param?
 * @param {String} contents - string to search
 * @param {String} functionName - name of function to verify param exists
 * @param {String} paramName - name of param to search for
 * @param {Object} [opts={language:'js'}] - passed options
 * @param {String} [opts.language='js'] - language file of file being used ('js', 'coffee', 'ts')
 * @param {String} [opts.regex] - custom regex that must have a group matcher
 * @param {String} [opts.type] - parameter type (used only for TypeScript)
 * @throws {Error} - if contents is empty
 * @throws {TypeError} - if contents, functionName, or paramName isn't a string
 * @returns {Boolean} - function functionName has parameter paramName in fileContents
 */
module.exports = function (contents, functionName, paramName, opts) {
  let i, params;

  if (opts && opts.language !== 'js' && opts.language !== 'coffee' && opts.language !== 'ts') {
    throw new Error(`Expected opts.language to be 'js' or 'coffee'`);
  }
  opts = opts || {language: 'js'};

  stringCheck(contents, 'contents');
  emptyStringCheck(contents, 'contents');

  stringCheck(functionName, 'functionName');
  emptyStringCheck(functionName, 'functionName');
  whitespaceCheck(functionName, 'functionName');

  stringCheck(paramName, 'paramName');
  emptyStringCheck(paramName, 'paramName');
  whitespaceCheck(paramName, 'paramName');

  if (contents.indexOf(functionName) === -1) {
    throw new Error(`Expected function ${functionName} to be in fileContents`);
  }

  params = funcGetParams(contents, functionName, opts);

  if (opts.type) {
    for (i = 0; i < params.length; i++) {
      if (params[i].param === paramName && params[i].type === opts.type) {
        return true;
      }
    }

    return false;
  }

  return params.indexOf(paramName) > -1;
};
