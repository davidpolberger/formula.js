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
    if (bool === 0) {
      return false;
    } else {
      return true;
    }
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

exports.parseMatrix = function(matrix, strict) {
  var colSize;
  if (!matrix || (colSize = matrix.length) === 0) {
    return error.value;
  }
  var rowSize = matrix[0].length;
  for (var i = 0; i < colSize; i++) {
    for (var j = 0; j < rowSize; j++) {
      matrix[i][j] = exports.parseNumber(matrix[i][j]);
      if (matrix[i][j] instanceof Error) {
        return matrix[i][j];
      }
    }
  }
  return matrix;
};

// Parse dates
exports.excelToJsTimestamp = function(timestamp) {
  if (timestamp < 60) {
    timestamp++;
  }
  return (timestamp - 25569) * 86400000;
};

exports.jsToExcelTimestamp = function(timestamp) {
  timestamp = (timestamp / 86400000) + 25569;
  if (timestamp <= 60) {
    timestamp--;
  }
  return timestamp;
};

exports.parseDate = function(date) {
  if (!isNaN(date)) {
    if (date instanceof Date) {
      return new Date(date);
    }
    var d = parseInt(date, 10);
    if (d < 0) {
      return error.num;
    }
    return new Date(exports.excelToJsTimestamp(d));
  }
  if (typeof date === 'string') {
    date = new Date(date);
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
