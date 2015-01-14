var error = require('../lib/error');
var _ = require('./limited-lodash');

exports.argsToArray = function(args) {
  return Array.prototype.slice.call(args, 0);
};
/*
exports.numbers = function() {
  var possibleNumbers = _.flatten(arguments);
  possibleNumbers.forEach(function (value, index) {
    if (value instanceof Date) {
      possibleNumbers[index] = exports.serialDate(value);
    }
  });
  return possibleNumbers.filter(function(el) {
    return typeof el === 'number';
  });
};*/

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

exports.parseNumbers = function(array, convert) {
  if (!(array instanceof Array)) {
    return error.value;
  }
  var result = [];
  var n = array.length;
  for (var i = 0; i < n; i++) {
    if (array[i] instanceof Error) {
      return array[i];
    }
    if (array[i] === null ||
        array[i] === undefined ||
        !convert && typeof(array[i]) !== 'number') {
      continue;
    }
    var value = exports.parseNumber(array[i]);
    if (value instanceof Error) {
      return value;
    }
    result[i] = value;
  }
  return result;
};
/*
exports.parseNumberArray = function(arr) {
  var len;
  if (!arr || (len = arr.length) === 0) {
    return error.value;
  }
  var parsed;
  while (len--) {
    parsed = exports.parseNumber(arr[len]);
    if (parsed === error.value) {
      return parsed;
    }
    arr[len] = parsed;
  }
  return arr;
};
*/
exports.parseMatrix = function(matrix) {
  var n;
  if (!matrix || (n = matrix.length) === 0) {
    return error.value;
  }
  var pnarr;
  for (var i = 0; i < matrix.length; i++) {
    pnarr = exports.parseNumbers(matrix[i]);
    matrix[i] = pnarr;
    if (pnarr instanceof Error) {
      return pnarr;
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
/*
exports.parseDateArray = function(arr) {
  var len = arr.length;
  var parsed;
  while (len--) {
    parsed = exports.parseDate(arr[len]);
    if (parsed === error.value) {
      return parsed;
    }
    arr[len] = parsed;
  }
  return arr;
};

var d1900 = new Date(1900, 0, 1);
exports.serialDate = function (date) {
  if (date <= -2203891200000) {
    return (date - d1900) / 86400000 + 1;
  }
  return (date - d1900) / 86400000 + 2;
};

exports.arrayValuesToNumbers = function(arr) {
  var n = arr.length;
  var el;
  var numbers = [];
  while (n--) {
    el = arr[n];
    if (el === null) {
      arr.splice(n, 1);
    }
    if (typeof el === 'number') {
      continue;
    }
    if (el === true) {
      arr[n] = 1;
      continue;
    }
    if (el === false) {
      arr[n] = 0;
      continue;
    }
    if (typeof el === 'string') {
      var number = exports.parseNumber(el);
      if (number instanceof Error) {
        arr[n] = 0;
      } else {
        arr[n] = number;
      }
    }
  }
  return arr;
};
*/
