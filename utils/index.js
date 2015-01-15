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

// strict = false -> try to convert non-numbers, return error if not possible
// strict = true -> convert non-numbers to 0 or 1
exports.parseNumber = function(string, strict) {
  if (string instanceof Error) {
    return string;
  }
  if (string === undefined || string === null) {
    return 0;
  }
  if (string === true) {
    return 1;
  }
  if (string === false) {
    return 0;
  }
  if (strict === true && typeof(string) !== 'number') {
    return 0;
  }
  if (!isNaN(string)) {
    var value = parseFloat(string);
    if (!isNaN(value)) {
      return value;
    }
  }
  return error.value;
};

// null and undefined elements are always ignored
// convert = false -> ignore non-numbers, ex: [1, "2", "a", true] -> [1]
// convert = true -> convert non-numbers to 0 or 1, ex: [1, "2", "a", true] -> [1, 0, 0, 1]
exports.parseNumbers = function(array, convert) {
  if (!(array instanceof Array)) {
    return error.value;
  }
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof Error) {
      return array[i];
    }
    if (array[i] === null ||
        array[i] === undefined ||
        !convert && typeof(array[i]) !== 'number') {
      continue;
    }
    var value = exports.parseNumber(array[i], true);
    if (value instanceof Error) {
      return value;
    }
    result[result.length] = value;
  }
  return result;
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
