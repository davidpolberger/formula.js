var error = require('./error');

exports.flatten = function(array, shallow) {
  return _flatten(array, shallow, false, []);
};

exports.initial = function (array) {
  var length = array ? array.length : 0;
  return slice(array, 0, length ? length - 1 : 0);
};

exports.rest = function (array) {
  return slice(array, 1);
};

exports.argsToArray = function(args) {
  return Array.prototype.slice.call(args, 0);
};

exports.numbers = function() {
  var possibleNumbers = exports.flatten(arguments);
  return possibleNumbers.filter(function(el) {
    return typeof el === 'number';
  });
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

exports.parseNumber = function(string) {
  if (string === undefined || string === '') {
    return error.value;
  }
  if (!isNaN(string)) {
    return parseFloat(string);
  }
  return error.value;
};

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

exports.parseMatrix = function(matrix) {
  var n;
  if (!matrix || (n = matrix.length) === 0) {
    return error.value;
  }
  var pnarr;
  for (var i = 0; i < matrix.length; i++) {
    pnarr = exports.parseNumberArray(matrix[i]);
    matrix[i] = pnarr;
    if (pnarr instanceof Error) {
      return pnarr;
    }
  }
  return matrix;
};

var d1900 = new Date(1900, 0, 1);
exports.parseDate = function(date) {
  if (!isNaN(date)) {
    if (date instanceof Date) {
      return new Date(date);
    }
    var d = parseInt(date, 10);
    if (d < 0) {
      return error.num;
    }
    if (d <= 60) {
      return new Date(d1900.getTime() + (d - 1) * 86400000);
    }
    return new Date(d1900.getTime() + (d - 2) * 86400000);
  }
  if (typeof date === 'string') {
    date = new Date(date);
    if (!isNaN(date)) {
      return date;
    }
  }
  return error.value;
};

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

exports.anyIsError = function() {
  var n = arguments.length;
  while (n--) {
    if (arguments[n] instanceof Error) {
      return true;
    }
  }
  return false;
};

exports.arrayValuesToNumbers = function(arr) {
  var n = arr.length;
  var el;
  while (n--) {
    el = arr[n];
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

exports.matrix = {};

exports.matrix._dim = function _dim(x) {
  var ret = [];
  while(typeof x === "object") {
    ret.push(x.length); x = x[0];
  }
  return ret;
};

exports.matrix.dim = function dim(x) {
  var y,z;
  if(typeof x === "object") {
    y = x[0];
    if(typeof y === "object") {
      z = y[0];
      if(typeof z === "object") {
        return exports.matrix._dim(x);
      }
      return [x.length,y.length];
    }
    return [x.length];
  }
  return [];
};

exports.matrix.diag = function diag(d) {
  var i,i1,j,n = d.length, A = Array(n), Ai;
  for(i=n-1;i>=0;i--) {
    Ai = Array(n);
    i1 = i+2;
    for(j=n-1;j>=i1;j-=2) {
      Ai[j] = 0;
      Ai[j-1] = 0;
    }
    if(j>i) { Ai[j] = 0; }
    Ai[i] = d[i];
    for(j=i-1;j>=1;j-=2) {
      Ai[j] = 0;
      Ai[j-1] = 0;
    }
    if(j===0) {
      Ai[0] = 0;
    }
    A[i] = Ai;
  }
  return A;
};

exports.matrix.rep = function rep(s,v,k) {
  if(k === undefined) {
    k=0;
  }
  var n = s[k], ret = Array(n), i;
  if(k === s.length-1) {
    for(i=n-2;i>=0;i-=2) {
      ret[i+1] = v; ret[i] = v;
    }
    if(i===-1) {
      ret[0] = v;
    }
    return ret;
  }
  for(i=n-1;i>=0;i--) {
    ret[i] = exports.matrix.rep(s,v,k+1);
  }
  return ret;
};

exports.matrix.identity = function identity(n) {
  return exports.matrix.diag(exports.matrix.rep([n],1));
};

exports.matrix.dotMMsmall = function dotMMsmall (x,y) {
  var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
  p = x.length; q = y.length; r = y[0].length;
  ret = Array(p);
  for(i=p-1;i>=0;i--) {
    foo = Array(r);
    bar = x[i];
    for(k=r-1;k>=0;k--) {
      woo = bar[q-1]*y[q-1][k];
      for(j=q-2;j>=1;j-=2) {
          i0 = j-1;
          woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
      }
      if(j===0) {
        woo += bar[0]*y[0][k];
      }
      foo[k] = woo;
    }
    ret[i] = foo;
  }
  return ret;
};

exports.matrix.dotMMbig = function dotMMbig (x,y) {
  function gc(A,j,x) {
      var n = A.length, i;
      for(i=n-1;i>0;--i) {
          x[i] = A[i][j];
          --i;
          x[i] = A[i][j];
      }
      if(i===0) x[0] = A[0][j];
  }
  var p = y.length, v = Array(p);
  var m = x.length, n = y[0].length, A = new Array(m), xj;
  var VV = exports.matrix.dotVV;
  var i,j,k,z;
  --p;
  --m;
  for(i=m;i!==-1;--i) A[i] = Array(n);
  --n;
  for(i=n;i!==-1;--i) {
      gc(y,i,v);
      for(j=m;j!==-1;--j) {
          z=0;
          xj = x[j];
          A[j][i] = VV(xj,v);
      }
  }
  return A;
};

exports.matrix.dotMV = function dotMV (x,y) {
  var p = x.length, q = y.length,i;
  var ret = Array(p), dotVV = exports.matrix.dotVV;
  for(i=p-1;i>=0;i--) {
    ret[i] = dotVV(x[i],y);
  }
  return ret;
};

exports.matrix.dotVM = function dotVM (x,y) {
  var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
  p = x.length; q = y[0].length;
  ret = Array(q);
  for(k=q-1;k>=0;k--) {
    woo = x[p-1]*y[p-1][k];
    for(j=p-2;j>=1;j-=2) {
      i0 = j-1;
      woo += x[j]*y[j][k] + x[i0]*y[i0][k];
    }
    if(j===0) {
      woo += x[0]*y[0][k];
    }
    ret[k] = woo;
  }
  return ret;
};

exports.matrix.dotVV = function dotVV (x,y) {
  var i,n=x.length,i1,ret = x[n-1]*y[n-1];
  for(i=n-2;i>=1;i-=2) {
    i1 = i-1;
    ret += x[i]*y[i] + x[i1]*y[i1];
  }
  if(i===0) {
    ret += x[0]*y[0];
  }
  return ret;
};

exports.matrix.mulVS = function mulVS (x,y) {
  var _n = x.length;
  var i, ret = Array(_n);

  for(i=_n-1;i!==-1;--i) {
    ret[i] = x[i] * y;
  }
  return ret;
};

exports.matrix.mulSV = function mulSV (x,y) {
  var _n = y.length;
  var i, ret = Array(_n);

  for(i=_n-1;i!==-1;--i) {
    ret[i] = x * y[i];
  }

  return ret;
};

function every (obj, predicate, context) {
  if (obj === null) {
    return true;
  }
  predicate = _.iteratee(predicate, context);
  var keys = obj.length !== +obj.length && _.keys(obj);
  var length = (keys || obj).length;
  var index, currentKey;
  for (index = 0; index < length; index++) {
    currentKey = keys ? keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }
  return true;
}

function isArguments (args) {
  return args && args.toString() === '[object Arguments]';
}

var _flatten = function _flatten (input, shallow, strict, output) {
  if (shallow && every(input, Array.isArray)) {
    return concat.apply(output, input);
  }
  for (var i = 0, length = input.length; i < length; i++) {
    var value = input[i];
    if (!Array.isArray(value) && !isArguments(value)) {
      if (!strict) output.push(value);
    } else if (shallow) {
      push.apply(output, value);
    } else {
      _flatten(value, shallow, strict, output);
    }
  }
  return output;
};

function isBoolean (bool) {
  return bool === true || bool === false;
}

exports.uniq = function uniq (array) {
  if (array === null) {
    return [];
  }
  var result = [];
  var seen = [];
  for (var i = 0, length = array.length; i < length; i++) {
    var value = array[i];
    if (result.indexOf(value) < 0) {
      result.push(value);
    }
  }
  return result;
};

function slice(array, start, end) {
  var index = -1;
  var length = array ? array.length : 0;

  start = start === null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  if (end && end == length && !start) {
    return baseSlice(array);
  }
  length = start > end ? 0 : (end - start);

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}