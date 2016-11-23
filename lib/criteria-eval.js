var error = require('../lib/error');
var utils = require('../lib/utils');

function preg_quote(str, delimiter) {
  // http://kevin.vanzonneveld.net
  // +   original by: booeyOH
  // +   improved by: Ates Goral (http://magnetiq.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: preg_quote("$40");
  // *     returns 1: '\$40'
  // *     example 2: preg_quote("*RRRING* Hello?");
  // *     returns 2: '\*RRRING\* Hello\?'
  // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
  // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
  return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}

function globPatternToRegExp(globStr) {
  var regexStr = preg_quote(globStr)
    .replace(/\\\*/g, '.*') // replace pattern to match * char with pattern to match anything
    .replace(/\\\?/g, '.') // replace pattern to match ? char with pattern to match char
    .replace('~.*', '\\\*') // replace escaped * with pattern to match * char
    .replace('~.', '\\\?'); // replace escaped ? with pattern to match ? char
  regexStr = '^' + regexStr + '$';
  return new RegExp(regexStr, 'g');
}

/**
 * Indicates whether text matches a pattern that may contain wildcard chars.  Star (*) selects any
 * number of chars and question (?) selects exactly one char.  Preceding either wildcard char with
 * a tilda (~) escapes its special meaning.
 */
exports.matchWithWildcards = function (pattern, text) {
  return globPatternToRegExp(pattern).test(text);
};

///**
// * Indicates whether text matches a pattern that may contain wildcard chars.  Star (*) selects any
// * number of chars and question (?) selects exactly one char.  Preceding either wildcard char with
// * a tilda (~) escapes its special meaning.
// */
//exports.matchWithWildcardsOLD = function (pattern, text) {
//  //console.log('matchWithWildcards(' + pattern + ',' + text + ')');
//  var textPos = 0;
//  for (var patternPos = 0; patternPos < pattern.length; ++patternPos) {
//    //console.log('top of loop');
//    var patternCh = pattern[patternPos];
//    var ignoreWildcard = false;
//    if (patternCh === '~') {
//      var postTildaChar = pattern[patternPos + 1];
//      if (postTildaChar === '*' || postTildaChar === '?') {
//        patternCh = pattern[++patternPos];
//        ignoreWildcard = true;
//      }
//    }
//    //console.log('patternCh:' + patternCh);
//    if (patternCh === '*' && !ignoreWildcard) {
//      // handle * plus any ? and * that immediately follow it
//      var minCharCount = 0;
//      while (true) {
//        var ch = pattern[patternPos + 1];
//        if (ch === '*')
//          ; // ignore multiple * chars -- same behavior as just one
//        else if (ch === '?')
//          ++minCharCount; // each ? (in a * expression) requires one char in match substring
//        else
//          break;
//        ++patternPos;
//      }
//      if (patternPos >= pattern.length - 1) {
//        // pattern ends with * to match rest of text; just need to make sure ?s match text
//        var remainingTextLen = text.length - textPos;
//        return remainingTextLen >= minCharCount; 
//      }
//      var nextPatternCh = pattern[patternPos + 1];
//      //console.log('nextPatternCh:' + nextPatternCh);
//      var nextTextPos = text.indexOf(nextPatternCh, textPos);
//      //console.log('nextTextPos:' + nextTextPos);
//      if (nextTextPos === -1)
//        return false; // didn't find char in text
//      var matchedLen = nextTextPos - textPos;
//      //console.log('matchedLen:' + matchedLen);
//      //console.log('minCharCount:' + minCharCount);
//      if (matchedLen < minCharCount)
//        return false; // didn't find as many chars as ?s
//      textPos = nextTextPos;
//    } else {
//      if (textPos >= text.length)
//        return false; // more pattern than text
//      if (patternCh === '?' && !ignoreWildcard) {
//        // ignore the text char -- matches ?
//      } else {
//        if (patternCh !== text[textPos])
//          return false;
//      }
//      ++textPos;
//    }
//  }
//  return textPos >= text.length;
//}

/**
 * Evaluates the criteria parameter to an *IF function -- returning a function that accepts one 
 * value and returns the comparison result.
 *
 * The operator (=, <>, <, >, <=, >=) can be prefixed to the argument or omitted to select equals.  
 *
 * Comparison is type-sensitive for types: number, boolean, string, null.  And, some type 
 * conversion is performed ... sadly too complicated to describe :( ... checkout the code and tests.
 * 
 * String comparison is case insensitive and based on alphabetical ordering.
 * 
 * @param {string|number|boolean|null} criteria - Right operand plus optional operator prefix.
 * @returns {boolean function(value)} 
 */
exports.parseCriteria = function (criteria) {
  if (criteria === null) criteria = '';
  var ch0 = criteria[0];
  var operation;
  var rightArg;
  if (ch0 === '<') {
    var ch1 = criteria[1];
    if (ch1 === '>') {
      operation = function (left, right) { return left !== right; };
      rightArg = criteria.substring(2);
    }
    else if (ch1 === '=') {
      operation = function (left, right) { return left <= right; };
      rightArg = criteria.substring(2);
    }
    else {
      operation = function (left, right) { return left < right; };
      rightArg = criteria.substring(1);
    }
  } else if (ch0 === '>') {
    if (criteria[1] === '=') {
      operation = function (left, right) { return left >= right; };
      rightArg = criteria.substring(2);
    }
    else {
      operation = function (left, right) { return left > right; };
      rightArg = criteria.substring(1);
    }
  } else {
    rightArg = ch0 === '=' ? criteria.substring(1) : criteria;
    operation = function (left, right) {
      if (typeof left === 'string' & typeof right === 'string')
        return exports.matchWithWildcards(right, left);
      return left === right;
    };
  }
  var rightIsNumber;
  var rightNumber = parseFloat(rightArg);
  if (!isNaN(rightNumber)) {
    rightIsNumber = true;
    rightArg = rightNumber;
  }
  else {
    if (typeof rightArg === 'string') {
      var up = rightArg.toUpperCase();
      if (up === 'TRUE')
        rightArg = true;
      else if (up === 'FALSE')
        rightArg = false;
      else
        rightArg = rightArg.toUpperCase();
    }
  }
  return function (left) {
    if (left === null) left = '';
    if (rightIsNumber) {
      var leftNumber = parseFloat(left);
      if (!isNaN(leftNumber)) {
        return operation(leftNumber, rightArg);
      }
    }
    if (typeof left === 'string')
      left = left.toUpperCase();
    return operation(left, rightArg);
  };
};

/**
 * Implements the comparison algorithm for *IF functions.  Returns the evaluated value of each
 * value for the criteria.
 * @param {[string|number|boolean|null]} values - Array of values or a single value which is 
 *  treated as an array of one item.
 * @param {string|number|boolean|null} criteria
 * @returns {[boolean]} - contains item for each item of values.
 */
exports.applyCriteriaToValues = function (values, criteria) {
  var compare = exports.parseCriteria(criteria);
  values = utils.arrayify(values);
  var results = new Array(values.length);
  for (var i = 0; i < values.length; ++i)
    results[i] = compare(values[i]);
  return results;
};

/**
 * Implements an *IF function for its arguments and an action function.
 * @param {[varies]} args - arguments to the *IF function.
 * @param {function(value)} action - function to handle each value satisfying the criteria.
 */
exports.performIf = function (args, action) {
  var range = args[0];
  var criteria = args[1];
  var valueRange = args[2];
  utils.throwIfMissingArgument(range, 'range');
  utils.throwIfMissingArgument(criteria, 'criteria');
  if (valueRange === undefined) valueRange = range;

  range = utils.arrayify(range);
  valueRange = utils.arrayify(valueRange);
  if (valueRange.length !== range.length)
    throw new Error('Ranges must have same number of elements.');

  var comparisons = exports.applyCriteriaToValues(range, criteria);
  for (var i = 0; i < range.length; ++i)
    if (comparisons[i])
      action(valueRange[i]);
};

/**
 * Implements an *IFS function for its arguments and an action function.
 * @param {[varies]} args - arguments to the *IFS function.
 * @param {function(value)} action - function to handle each value satisfying the criteria.
 */
exports.performIfs = function (args, action) {
  var valueRange = args[0];
  var testRange1 = args[1];
  utils.throwIfMissingArgument(valueRange, 'sum_range');
  utils.throwIfMissingArgument(testRange1, 'range1');
  valueRange = utils.arrayify(valueRange);
  var ranges = [];
  var criterias = [];
  var argIndex = 1;
  while (args[argIndex] !== undefined) {
    var range = utils.arrayify(args[argIndex++]);
    if (range.length !== valueRange.length)
      throw new Error('Ranges must have same number of elements.');
    ranges.push(range);
    var criteria = args[argIndex++];
    if (criteria === undefined)
      throw new Error('Missing criteria for values.');
    criterias.push(criteria);
  }
  var comparisons = exports.applyCriteriaToValues(ranges[0], criterias[0]);
  for (var r = 0; r < ranges.length; ++r) {
    var nextComparisons = exports.applyCriteriaToValues(ranges[r], criterias[r]);
    for (var c = 0; c < nextComparisons.length; ++c)
      comparisons[c] = comparisons[c] && nextComparisons[c];
  }
  for (var i = 0; i < valueRange.length; ++i)
    if (comparisons[i])
      action(valueRange[i]);
};
