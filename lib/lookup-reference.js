var utils = require('../utils');
var error = require('./error');

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
    return error.value
  }

  return chosen;
}