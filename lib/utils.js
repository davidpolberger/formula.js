var error = require('../lib/error');

exports.arrayify = function (item) {
  if (item instanceof Array)
    return item;
  return [item];
}

exports.argsToArray = function (args) {
  return Array.prototype.slice.call(args, 0);
};

exports.throwIfMissingArgument = function (arg, name) {
  if (arg === undefined)
    throw new Error('Missing ' + (name || 'argument') + '.');
}

exports.throwIfNoArguments = function (args) {
  if (args.length === 0)
    throw new Error('Function requires at least one argument.');
}

exports.cleanFloat = function(number) {
  var power = 1e14;
  return Math.round(number * power) / power;
};

exports.parseBool = function(value) {
  if (typeof value === 'boolean')
    return value;
  if (typeof value === 'number')
    return value !== 0;
  if (typeof value === 'string') {
    var up = value.toUpperCase();
    if (up === 'TRUE')
      return true;
    if (up === 'FALSE')
      return false;
  }
  if (value === null)
    return false;
  if (value instanceof Error)
    return value;
  return error.value;
};

/**
 * Returns the input (non-NaN) number or the input error or the number represented by a string or 
 * 1/0 for true/false.  Otherwise (i.e. undefined, null, NaN, string not representing a number ...)
 * returns error.value.
 */
exports.parseNumber = function(value) {
  if (typeof value === 'number' && !isNaN(value))
    return value;
  if (value === false)
    return 0;
  if (value === true)
    return 1;
  if (value === null)
    return 0;
  if (value instanceof Error)
    return value;
  var float = parseFloat(value);
  if (!isNaN(float))
    return float;
  return error.value;
};

/**
 * Returns an array of numbers from an input array -- skipping each non-number of the input.
 */
exports.selectNumbersFromArray = function (array) {
  var numbers = [];
  for (var i = 0; i < array.length; ++i) {
    var item = array[i];
    if (typeof (item) === 'number')
      numbers.push(item);
  }
  return numbers;
}

/**
 * Parses the arguments to a function that accepts the standard, variable-length numbers.
 * Throws if the input is empty.  Otherwise, returns an array of numbers represented
 * by the arguments -- including flattening array arguments.  For non-array arguments, includes 
 * numbers and values that can be converted to numbers, and returns value error if any value does 
 * not represent a number.  For an array argument, ignores all non-number elements -- even values 
 * that in other contexts are usually converted to numbers!  For example, ['0'] results in [0], 
 * ['x'] results in value error and both [['0']] and [['x']] result in [].
 * 
 * Usually, an excel function that takes variable length number arguments requires at least 
 * argument, but this does not enforce this minimum.  Therefore, the implementation in this
 * library can provide more functionality than the excel version.  This does not conflict with 
 * the excel version since Excel does not allow a cell to be loaded with a function that has
 * no arguments.  This is extended behavior -- not different behavior.
 *
 * @param {[varies]} args - arguments object or Array.
 * @returns {[number]} 
 */
exports.parseNumbersFromArguments = function (args) {
  var numbers = [];
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg instanceof Array) {
      numbers = numbers.concat(exports.selectNumbersFromArray(arg));
    } else {
      var number = exports.parseNumber(arg);
      if (number instanceof Error)
        return number;
      numbers.push(number);
    }
  }
  return numbers;
};

/**
 * TODO: This function is partially if not fully replaced by parseNumbersFromArguments.
 * NOTE: this function treats values as argument array items -- ignoring non-numbers
 *
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

/**
 * Returns an array of numbers -- one for each input array item.  The number is the input item if 
 * it is a number or is 1/0 for true/false or otherwise is 0.  Returns the input if it is an error.
 *
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

/**
 * Returns an array of numbers -- one for each input array item.  The number is the input item if 
 * it represents (is convertible to) a number.  Returns value error is any value does not represent
 * a number.  Returns the input if it is an error.
 *
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

/**
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

/**
 * Returns an excel (OLE Automation) date/time value from a javascript timestamp.
 */
exports.excelToJsTimestamp = function(timestamp) {
  if (timestamp < 60) {
    timestamp++;
  }
  return Math.round((timestamp - 25569) * 86400000);
};

/**
 * Returns a javascript timestamp from an excel (OLE Automation) date/time value.
 */
exports.jsToExcelTimestamp = function (timestamp) {
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
  if (arguments.length === 1 && typeof ms1970OrDateStrOrYear !== 'string') {
    // 1st arg is the only and is not a string ... so it must be milliseconds since 1970
    return new Date(ms1970OrDateStrOrYear);
  }
  var date;
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
  } else {
    date = new Date(ms1970OrDateStrOrYear, month, day, hour, minute, second, millisecond);
  }
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};

exports.parseDate = function(value) {
  if ((value !== null) && (value !== undefined) && (!isNaN(value))) {
    if (value instanceof Date) {
      return exports.createUTCDate(value);
    }
    var float = parseFloat(value);
    if (float < 0) {
      return error.num;
    }
    return exports.createUTCDate(exports.excelToJsTimestamp(float));
  }
  if (typeof value === 'string') {
    value = exports.createUTCDate(value);
    if (!isNaN(value)) {
      return value;
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

exports.parseText = function(value) {
  if (typeof (value) === 'string')
    return value;
  if (typeof(value) === 'number')
    return value.toString();
  if (typeof(value) === 'boolean')
    return value.toString().toUpperCase();
  if (value === undefined || value === null)
    return '';
  if (value instanceof Error)
    return value;
  return error.value;
};