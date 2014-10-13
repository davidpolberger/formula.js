exports.TRANSPOSE = function t (arr) {
  var transposed = arr.slice(0, arr.length);

  var len = transposed.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j <i; j++) {
      var temp = transposed[i][j];
      transposed[i][j] = transposed[j][i];
      transposed[j][i] = temp;
    }
  }
  return transposed;
}