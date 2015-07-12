'use strict';

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
 * Get functionName's params in contents
 * @param {String} contents - string to search for function info
 * @param {String} functionName - function name to get params of
 * @param {Object} [opts] - passed options
 *   {String} [opts.language = 'js'] - language file of file being used ('js', 'coffee', 'ts')
 *   {String} [opts.type] - parameter type (used only for TypeScript)
 * @returns {Array} - list of params
 */
function getParams(contents, functionName, opts) {
  let matches, regex;

  if (opts.language === 'coffee') {
    regex = new RegExp(`${functionName}[\\s]*=[\\s]*\\(([\\s\\S]*?)\\)`);
  } else {
    regex = new RegExp(`function ${functionName}[\\s]*\\(([\\s\\S]*?)\\)`);
  }

  matches = regex.exec(contents);

  return matches[1].split(',').map((match) => {
    const typeLocation = match.indexOf(':');

    let type = null;

    if (opts.language !== 'ts') {
      return match.trim();
    }

    if (opts.type && typeLocation !== -1) {
      type = match.substring(typeLocation + 1, match.length);
      type = type.trim();
    }

    if (typeLocation !== -1) {
      match = match.substring(0, typeLocation);
    }

    match = match.trim();

    if (opts.type) {
      return {
        match,
        type
      };
    }

    return match;
  });
}

/**
 * Does function in string have a param?
 * @param {String} contents - string to search
 * @param {String} functionName - name of function to verify param exists
 * @param {String} paramName - name of param to search for
 * @param {Object} [opts] - passed options
 *   {String} [opts.language = 'js'] - language file of file being used ('js', 'coffee', 'ts')
 *   {String} [opts.type] - parameter type (used only for TypeScript)
 * @throws {Error} - if contents is empty
 * @throws {TypeError} - if contents, functionName, or paramName isn't a string
 * @returns {Boolean} - function functionName has parameter paramName in fileContents
 */
export default function funcHasParam(contents, functionName, paramName, opts) {
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

  params = getParams(contents, functionName, opts);

  if (opts.type) {
    for (i = 0; i < params.length; i++) {
      if (params[i].match === paramName && params[i].type === opts.type) {
        return true;
      }
    }

    return false;
  }

  return params.includes(paramName);
}
