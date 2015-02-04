var utils = require('../utils');
var error = require('./error');

exports.CHOOSE = function (index_num) {
  index_num = utils.parseNumber(index_num);
  if (index_num instanceof Error) {
    return index_num;
  }

  if (index_num < 1) {
    return error.value;
  }

  index_num = Math.floor(index_num);

  var chosen = arguments[index_num];
  if (chosen === undefined) {
    return error.value;
  }

  return chosen;
};

exports.INDEX = function (array, row_num, column_num) {
  column_num = (column_num === undefined) ? 0 : column_num;
  row_num = utils.parseNumber(row_num);
  if (row_num instanceof Error) {
    return row_num;
  }
  column_num = utils.parseNumber(column_num);
  if (column_num instanceof Error) {
    return column_num;
  }

  var whole_row = row_num === 0;
  var whole_col = column_num === 0;

  row_num--;
  column_num--;

  if (!(array[0] instanceof Array)) {
    array = [array];
  }

  if (!array instanceof Array) {
    array = [array];
  }

  if (!whole_col && column_num > array.length - 1) {
    return error.ref;
  }

  if (!whole_row && row_num > array[0].length - 1) {
    return error.ref;
  }

  var result;

  if (whole_row && !whole_col) {
    result = array[column_num];
  } else if (whole_col && !whole_row) {
    var row = [];
    for (var i = 0; i < array.length; i++) {
      row.push([array[i][row_num]]);
    }
    result = row;
  } else if (!whole_col && !whole_row) {
    result = array[column_num][row_num];
  } else {
    result = array;
  }

  if (result.length === 1) {
    result = result.pop();
  }
  if (result.length === 1) {
    result = result.pop();
  }

  return result;
};

exports.MATCH = function(lookupValue, lookupArray, matchType) {
  if (!(lookupArray instanceof Array)) {
    lookupArray = [lookupArray];
  }
  if (matchType === undefined || matchType === null) {
    matchType = 1;
  }
  matchType = utils.parseNumber(matchType);
  if (matchType instanceof Error) {
    return error.ref;
  }
  if (matchType > 1) {
    matchType = 1;
  } else if (matchType < -1) {
    matchType = -1;
  }
  if (matchType !== -1 && matchType !== 0 && matchType !== 1) {
    return error.na;
  }
  var result = error.na;
  for (var i = 0; i < lookupArray.length; i++) {
    if (typeof(lookupValue) !== typeof(lookupArray[i])) {
      continue;
    }
    if (lookupValue === lookupArray[i]) {
      result = i + 1;
      break;
    }
    if (matchType === 1) {
      if (lookupArray[i] < lookupValue) {
        result = i + 1;
      } else {
        break;
      }
    } else if (matchType === -1) {
      if (lookupArray[i] > lookupValue) {
        result = i + 1;
      } else {
        break;
      }
    } else if (matchType === 0) {
      if (typeof(lookupValue) === 'string') {
        if (lookupArray[i].match(lookupValue.replace(/\?/g, '.'))) {
          result = i + 1;
          break;
        }
      }
    }
  }
  return result;
};

exports.TRANSPOSE = function(a) {
  if (!(a[0] instanceof Array)) a = [a];

  // Calculate the width and height of the Array
  var w = a.length ? a.length : 0;
  var h = a[0].length;

  // In case it is a zero matrix, no transpose routine needed.
  if(h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  if (t.length == 1)
    t = t[0];

  return t;
};
