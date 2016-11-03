var error = require('../lib/error');
var _ = require('./limited-lodash');

exports.argsToArray = function(args) {
  return Array.prototype.slice.call(args, 0);
};

exports.cleanFloat = function(number) {
  var power = 1e14;
  return Math.round(number * power) / power;
};

exports.parseBool = function(bool) {
  if (typeof bool === 'boolean') {
    return bool;
  }

  if (bool instanceof Error) {
    return bool;
  }

  if (typeof bool === 'number') {
    return bool !== 0;
  }

  if (typeof bool === 'string') {
    var up = bool.toUpperCase();
    if (up === 'TRUE') {
      return true;
    }

    if (up === 'FALSE') {
      return false;
    }
  }

  if (bool instanceof Date && !isNaN(bool)) {
    return true;
  }

  return error.value;
};

/*
 * 2 -> 2
 * '2' -> 2
 * 'invalid' -> #value!
 * true -> 1
 * false -> 0
 * undefined -> 0
 * null -> 0
 * error -> error
 */
exports.parseNumber = function(num) {
  if (num instanceof Error) {
    return num;
  }
  if (num === undefined || num === null) {
    return 0;
  }
  if (num === false) {
    return 0;
  }
  if (num === true) {
    return 1;
  }
  if (!isNaN(num)) {
    var value = parseFloat(num);
    if (!isNaN(value)) {
      return value;
    }
  }
  return error.value;
};

/*
 * 2 -> #value!
 * error -> error
 * [2] -> [2]
 * ['2'] -> []
 * ['invalid'] -> []
 * [true] -> []
 * [false] -> []
 * [undefined] -> []
 * [null] -> []
 * [error] -> error
 */
exports.parseNumbers = function(array) {
  if (array instanceof Error) {
    return array;
  }
  if (!(array instanceof Array)) {
    return error.value;
  }
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof Error) {
      return array[i];
    }
    if (typeof(array[i]) !== 'number') {
      continue;
    }
    result.push(array[i]);
  }
  return result;
};

/*
 * 2 -> #value!
 * error -> error
 * [2] -> [2]
 * ['2'] -> [0]
 * ['invalid'] -> [0]
 * [true] -> [1]
 * [false] -> [0]
 * [undefined] -> []
 * [null] -> []
 * [error] -> error
 */
exports.parseNumbersA = function(array) {
  if (array instanceof Error) {
    return array;
  }
  if (!(array instanceof Array)) {
    return error.value;
  }
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof Error) {
      return array[i];
    }
    if (array[i] === undefined || array[i] === null) {
      continue;
    }
    if (array[i] === false) {
      result.push(0);
    } else if (array[i] === true) {
      result.push(1);
    } else if (typeof(array[i]) !== 'number') {
      result.push(0);
    } else {
      result.push(array[i]);
    }
  }
  return result;
};

/*
 * 2 -> #value!
 * error -> error
 * [2] -> [2]
 * ['2'] -> [2]
 * ['invalid'] -> #value!
 * [true] -> #value!
 * [false] -> #value!
 * [undefined] -> [0]
 * [null] -> [0]
 * [error] -> error
 */
exports.parseNumbersConvert = function(array) {
  if (array instanceof Error) {
    return array;
  }
  if (!(array instanceof Array)) {
    return error.value;
  }
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof Error) {
      return array[i];
    }
    if (array[i] === undefined || array[i] === null) {
      result.push(0);
    } else {
      var value = parseFloat(array[i]);
      if (!isNaN(value)) {
        result.push(value);
      } else {
        return error.value;
      }
    }
  }
  return result;
};

/*
 * 2, 2 -> #value!
 * error, error -> error
 * [2], [2] -> [[2], [2]]
 * ['2'], ['2'] -> [[2], [2]]
 * ['invalid'], ['invalid] -> [[], []]
 * [true], [true] -> [[], []]
 * [false], [false] -> [[], []]
 * [undefined], [undefined] -> [[], []]
 * [null], [null] -> [[], []]
 * [error], [error] -> error
 */
exports.parseNumbersX = function(array_x, array_y) {
    if (array_x instanceof Error) {
      return array_x;
    }
    if (array_y instanceof Error) {
      return array_y;
    }
    if (!(array_x instanceof Array) || !(array_y instanceof Array)) {
      return error.value;
    }
    if (array_x.length !== array_y.length) {
      return error.na;
    }
    var parsed_x = [];
    var parsed_y = [];
    for (var i = 0; i < array_x.length; i++) {
      if (array_x[i] instanceof Error) {
        return array_x[i];
      }
      if (array_y[i] instanceof Error) {
        return array_y[i];
      }
      if (typeof(array_x[i]) !== 'number' || typeof(array_y[i]) !== 'number') {
        continue;
      }
      parsed_x.push(array_x[i]);
      parsed_y.push(array_y[i]);
    }
    return [parsed_x, parsed_y];
};

// TODO: return copy of matrix
exports.parseMatrix = function(matrix) {
  if (!(matrix instanceof Array)) {
    matrix = [matrix];
  }
  if (!(matrix[0] instanceof Array)) {
    matrix = [matrix];
  }
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      matrix[i][j] = exports.parseNumber(matrix[i][j]);
      if (matrix[i][j] instanceof Error) {
        return matrix[i][j];
      }
    }
  }
  if (matrix.length === 0 || matrix[0].length === 0) {
    return error.value;
  }
  return matrix;
};

// Parse dates
exports.excelToJsTimestamp = function(timestamp) {
  if (timestamp < 60) {
    timestamp++;
  }
  return Math.round((timestamp - 25569) * 86400000);
};

exports.jsToExcelTimestamp = function(timestamp) {
  timestamp = (timestamp / 86400000) + 25569;
  if (timestamp <= 60) {
    timestamp--;
  }
  return timestamp;
};

/**
 * Creates a new Date instance using the same parameters accepted by the Date
 * constructor. If only a single, non-string parameter is given, this
 * function behaves exactly like the Date constructor. Otherwise, this function
 * returns a date with time zone offset set to UTC.
 * <p>
 * The standard Date constructor incorporates the local time zone unless special
 * ISO 8601 strings are given. This is problematic for many calculations and by
 * only using UTC Date instances, many problems are avoided.
 * <p>
 * Unlike Date, Excel can parse a string that contains time without date (i.e. 
 * '2:30').  Further, without a date part, the resulting timestamp does include
 * date information, but it's strange: 0-jan-1900.  This corresponds to the 
 * excel timestamp value of 0.  The date 31-dec-1899 is used instead since its
 * somewhat close.  But do note that this date actually corresponds to an excel
 * timestamp of -1 -- which is invalid ... as all negative timestamp values are
 * invalid.  The real solution is to avoid using Date at all.  But that's 
 * undesirable since Date provides alot of utility.
 *
 * @param {Number|String} [ms1970OrDateStrOrYear]
 *   the first parameter to the Date constructor, which may be the number of 
 *   milliseconds since 1 January 1970 00:00:00 UTC, a textual date string 
 *   (where the recognized format varies between implementations) or a
 *   year (when there's more than one parameter).
 * @param {Number} [month]
 *   the month.
 * @param {Number} [day]
 *   the day.
 * @param {Number} [hour]
 *   the hour.
 * @param {Number} [minute]
 *   the minute.
 * @param {Number} [second]
 *   the second.
 * @param {Number} [millisecond]
 *   the millisecond.
 * @return {Date}
 *   a new Date instance.
 */
exports.createUTCDate = function(ms1970OrDateStrOrYear, month, day, hour, minute, second, millisecond) {
  if ((arguments.length === 1) &&
      (typeof ms1970OrDateStrOrYear !== 'string')) {
    // 1st arg is the only and is not a string ... so it must be milliseconds since 1970
    return new Date(ms1970OrDateStrOrYear);
  }

  var date = null;

  if (arguments.length === 0) {
    date = new Date();
  } else if (arguments.length === 1) {
    //NOTE: 1st arg is the only and must be a string (see check above)
    date = new Date(ms1970OrDateStrOrYear);
    if (isNaN(date.getTime()))
      date = new Date('12/31/1899 ' + ms1970OrDateStrOrYear);
  } else if (arguments.length === 2) {
    date = new Date(ms1970OrDateStrOrYear, month);
  } else if (arguments.length === 3) {
    date = new Date(ms1970OrDateStrOrYear, month, day);
  } else if (arguments.length === 4) {
    date = new Date(ms1970OrDateStrOrYear, month, day, hour);
  } else if (arguments.length === 5) {
    date = new Date(ms1970OrDateStrOrYear, month, day, hour, minute);
  } else if (arguments.length === 6) {
    date = new Date(ms1970OrDateStrOrYear, month, day, hour, minute, second);
  } else if (arguments.length === 7) {
    date = new Date(ms1970OrDateStrOrYear, month, day, hour, minute, second, millisecond);
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};

exports.parseDate = function(date) {
  if ((date !== null) && (date !== undefined) && (!isNaN(date))) {
    if (date instanceof Date) {
      return exports.createUTCDate(date);
    }

    var d = parseFloat(date);

    if (d < 0) {
      return error.num;
    }

    return exports.createUTCDate(exports.excelToJsTimestamp(d));
  }

  if (typeof date === 'string') {

    date = exports.createUTCDate(date);

    if (!isNaN(date)) {
      return date;
    }
  }

  return error.value;
};

exports.parseDates = function(array) {
  if (!(array instanceof Array)) {
    return error.value;
  }
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof Error) {
      return array[i];
    }
    if (array[i] === null || array[i] === undefined) {
      continue;
    }
    var value = exports.parseDate(array[i]);
    if (value instanceof Error) {
      return value;
    }
    result[result.length] = value;
  }
  return result;
};

exports.parseText = function(text) {
  if (text instanceof Error) {
    return text;
  }
  if (text === undefined || text === null) {
    return '';
  }
  if (typeof(text) === 'string') {
    return text;
  }
  if (typeof(text) === 'number') {
    return text.toString();
  }
  if (typeof(text) === 'boolean') {
    return text.toString().toUpperCase();
  }
  return error.value;
};
