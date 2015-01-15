var utils = require('../utils');
var error = require('./error');
var statistical = require('./statistical');
var information = require('./information');
var evalExpr = require('../utils/expression-parser');
var matrix = require('../utils/matrix');
var _ = require('../utils/limited-lodash');

exports.ABS = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.abs(utils.parseNumber(number));
};

exports.ACOS = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.acos(number);
};

exports.ACOSH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.log(number + Math.sqrt(number * number - 1));
};

exports.ACOT = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.atan(1 / number);
};

exports.ACOTH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return 0.5 * Math.log((number + 1) / (number - 1));
};

//TODO: use options
exports.AGGREGATE = function(function_num, options, ref1, ref2) {
  function_num = utils.parseNumber(function_num);
  if (function_num instanceof Error) {
    return function_num;
  }
  options = utils.parseNumber(function_num);
  if (options instanceof Error) {
    return options;
  }
  switch (function_num) {
    case 1:
      return statistical.AVERAGE(ref1);
    case 2:
      return statistical.COUNT(ref1);
    case 3:
      return statistical.COUNTA(ref1);
    case 4:
      return statistical.MAX(ref1);
    case 5:
      return statistical.MIN(ref1);
    case 6:
      return exports.PRODUCT(ref1);
    case 7:
      return statistical.STDEV.S(ref1);
    case 8:
      return statistical.STDEV.P(ref1);
    case 9:
      return exports.SUM(ref1);
    case 10:
      return statistical.VAR.S(ref1);
    case 11:
      return statistical.VAR.P(ref1);
    case 12:
      return statistical.MEDIAN(ref1);
    case 13:
      return statistical.MODE.SNGL(ref1);
    case 14:
      return statistical.LARGE(ref1, ref2);
    case 15:
      return statistical.SMALL(ref1, ref2);
    case 16:
      return statistical.PERCENTILE.INC(ref1, ref2);
    case 17:
      return statistical.QUARTILE.INC(ref1, ref2);
    case 18:
      return statistical.PERCENTILE.EXC(ref1, ref2);
    case 19:
      return statistical.QUARTILE.EXC(ref1, ref2);
  }
};

exports.ARABIC = function(text) {
  text = text.trim().toUpperCase();

  // Credits: Rafa? Kukawski
  if (!/^-?M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
    return error.value;
  }
  var result = 0;
  text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
    result += {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    }[i];
  });
  if (text[0] === '-') {
    result *= -1;
  }
  return result;
};

exports.ASIN = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.asin(number);
};

exports.ASINH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.log(number + Math.sqrt(number * number + 1));
};

exports.ATAN = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.atan(number);
};

exports.ATAN2 = function(number_x, number_y) {
  number_x = utils.parseNumber(number_x);
  if (number_x instanceof Error) {
    return number_x;
  }
  number_y = utils.parseNumber(number_y);
  if (number_y instanceof Error) {
    return number_y;
  }
  return Math.atan2(number_x, number_y);
};

exports.ATANH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.log((1 + number) / (1 - number)) / 2;
};

exports.BASE = function(number, radix, min_length) {
  min_length = min_length || 0;

  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  radix = utils.parseNumber(radix);
  if (radix instanceof Error) {
    return radix;
  }
  min_length = utils.parseNumber(min_length);
  if (min_length instanceof Error) {
    return min_length;
  }
  min_length = (min_length === undefined) ? 0 : min_length;
  var result = number.toString(radix);
  return new Array(Math.max(min_length + 1 - result.length, 0)).join('0') + result;
};

exports.CEILING = function(number, significance, mode) {
  significance = (significance === undefined) ? 1 : Math.abs(significance);
  mode = mode || 0;

  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  significance = utils.parseNumber(significance);
  if (significance instanceof Error) {
    return significance;
  }
  mode = utils.parseNumber(mode);
  if (mode instanceof Error) {
    return mode;
  }
  if (significance === 0) {
    return 0;
  }
  var precision = -Math.floor(Math.log(significance) / Math.log(10));
  if (number >= 0) {
    return exports.ROUND(Math.ceil(number / significance) * significance, precision);
  } else {
    if (mode === 0) {
      return -exports.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
    } else {
      return -exports.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
    }
  }
};

exports.CEILING.MATH = exports.CEILING;

exports.CEILING.PRECISE = exports.CEILING;

exports.COMBIN = function(number, number_chosen) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  number_chosen = utils.parseNumber(number_chosen);
  if (number_chosen instanceof Error) {
    return number_chosen;
  }
  return exports.FACT(number) / (exports.FACT(number_chosen) * exports.FACT(number - number_chosen));
};

exports.COMBINA = function(number, number_chosen) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  number_chosen = utils.parseNumber(number_chosen);
  if (number_chosen instanceof Error) {
    return number_chosen;
  }
  return (number === 0 && number_chosen === 0) ? 1 : exports.COMBIN(number + number_chosen - 1, number - 1);
};

exports.COS = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.cos(number);
};

exports.COSH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return (Math.exp(number) + Math.exp(-number)) / 2;
};

exports.COT = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return 1 / Math.tan(number);
};

exports.COTH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  var e2 = Math.exp(2 * number);
  return (e2 + 1) / (e2 - 1);
};

exports.CSC = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return 1 / Math.sin(number);
};

exports.CSCH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return 2 / (Math.exp(number) - Math.exp(-number));
};

exports.DECIMAL = function(number, radix) {
  radix = (radix === undefined) ? 10 : 0;
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  radix = utils.parseNumber(radix);
  if (radix instanceof Error) {
    return radix;
  }
  return parseInt(number, radix);
};

exports.DEGREES = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return number * 180 / Math.PI;
};

exports.EVEN = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return exports.CEILING(number, -2, -1);
};

exports.EXP = Math.exp;

var MEMOIZED_FACT = [];
exports.FACT = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  var n = Math.floor(number);
  if (n === 0 || n === 1) {
    return 1;
  } else if (MEMOIZED_FACT[n] > 0) {
    return MEMOIZED_FACT[n];
  } else {
    MEMOIZED_FACT[n] = exports.FACT(n - 1) * n;
    return MEMOIZED_FACT[n];
  }
};

exports.FACTDOUBLE = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  var n = Math.floor(number);
  if (n <= 0) {
    return 1;
  } else {
    return n * exports.FACTDOUBLE(n - 2);
  }
};

exports.FLOOR = function(number, significance) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  significance = utils.parseNumber(significance);
  if (significance instanceof Error) {
    return significance;
  }
  if (significance === 0) {
    return 0;
  }

  if (!(number > 0 && significance > 0) && !(number < 0 && significance < 0)) {
    return error.num;
  }

  significance = Math.abs(significance);
  var precision = -Math.floor(Math.log(significance) / Math.log(10));
  if (number >= 0) {
    return exports.ROUND(Math.floor(number / significance) * significance, precision);
  } else {
    return -exports.ROUND(Math.ceil(Math.abs(number) / significance), precision);
  }
};

//TODO: Verify
exports.FLOOR.MATH = function(number, significance, mode) {
  significance = (significance === undefined) ? 1 : significance;
  mode = (mode === undefined) ? 0 : mode;

  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  significance = utils.parseNumber(significance);
  if (significance instanceof Error) {
    return significance;
  }
  mode = utils.parseNumber(mode);
  if (mode instanceof Error) {
    return mode;
  }
  if (significance === 0) {
    return 0;
  }

  significance = significance ? Math.abs(significance) : 1;
  var precision = -Math.floor(Math.log(significance) / Math.log(10));
  if (number >= 0) {
    return exports.ROUND(Math.floor(number / significance) * significance, precision);
  } else if (mode === 0 || mode === undefined) {
    return -exports.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
  }
  return -exports.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
};

// Deprecated
exports.FLOOR.PRECISE = exports.FLOOR.MATH;

// adapted http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
exports.GCD = function() {
  var range = utils.parseNumbers(_.flatten(arguments), true);
  if (range instanceof Error) {
    return range;
  }
  var n = range.length;
  var r0 = range[0];
  var x = r0 < 0 ? -r0 : r0;
  for (var i = 1; i < n; i++) {
    var ri = range[i];
    var y = ri < 0 ? -ri : ri;
    while (x && y) {
      if (x > y) {
        x %= y;
      } else {
        y %= x;
      }
    }
    x += y;
  }
  return x;
};


exports.INT = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.floor(number);
};

//TODO: verify
exports.ISO = {
  CEILING: exports.CEILING
};

exports.LCM = function() {
  var o = _.flatten(arguments);
  var n = o.length;
  while (n--) {
    o[n] = utils.parseNumber(o[n]);
    if (o[n] instanceof Error) {
      return o[n];
    }
    if (o[n] === 0) {
      return 0;
    }
    if (o[n] < 0) {
      return error.num;
    }
  }

  function lcm(numbers) {
    return numbers.reduce(function(a, b) {
      return Math.abs(a * b) / exports.GCD(a, b);
    });
  }
  return lcm(o);
};

exports.LN = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.log(number);
};

exports.LOG = function(number, base) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  base = utils.parseNumber(base);
  if (base instanceof Error) {
    return base;
  }
  base = (base === undefined) ? 10 : base;
  return Math.log(number) / Math.log(base);
};

exports.LOG10 = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.log(number) / Math.log(10);
};

function _dim(x) {
  var ret = [];
  while(typeof x === "object") {
    ret.push(x.length); x = x[0];
  }
  return ret;
}


function dim(x) {
  var y,z;
  if(typeof x === "object") {
      y = x[0];
      if(typeof y === "object") {
          z = y[0];
          if(typeof z === "object") {
              return _dim(x);
          }
          return [x.length,y.length];
      }
      return [x.length];
  }
  return [];
}

exports.MDETERM = function(x) {
  x = utils.parseMatrix(x);
  if (x instanceof Error) {
    return x;
  }

  var s = matrix.dim(x);
  if(s.length !== 2 || s[0] !== s[1]) {
    throw new Error('can only calculate determinant on square matrices');
  }
  var n = s[0], ret = 1,i,j,k,A = x,Aj,Ai,alpha,temp,k1,k2,k3;
  for(j=0;j<n-1;j++) {
    k=j;
    for(i=j+1;i<n;i++) {
      if(Math.abs(A[i][j]) > Math.abs(A[k][j])) {
        k = i;
      }
    }
    if(k !== j) {
      temp = A[k]; A[k] = A[j]; A[j] = temp;
      ret *= -1;
    }
    Aj = A[j];
    for(i=j+1;i<n;i++) {
      Ai = A[i];
      alpha = Ai[j]/Aj[j];
      for(k=j+1;k<n-1;k+=2) {
        k1 = k+1;
        Ai[k] -= Aj[k]*alpha;
        Ai[k1] -= Aj[k1]*alpha;
      }
      if(k!==n) {
        Ai[k] -= Aj[k]*alpha;
      }
    }
    if(Aj[j] === 0) {
      return 0;
    }
    ret *= Aj[j];
  }
  return ret*A[j][j];

};

exports.MINVERSE = function(x) {
  x = utils.parseMatrix(x);
  if (x instanceof Error) {
    return x;
  }
  var s = matrix.dim(x), m = s[0], n = s[1];
  var A = x, Ai, Aj;
  var I = matrix.identity(m), Ii, Ij;
  var i,j,k;
  for(j=0;j<n;++j) {
    var i0 = -1;
    var v0 = -1;
    for(i=j;i!==m;++i) {
      k = Math.abs(A[i][j]);
      if(k>v0) {
        i0 = i; v0 = k;
      }
    }
    Aj = A[i0]; A[i0] = A[j]; A[j] = Aj;
    Ij = I[i0]; I[i0] = I[j]; I[j] = Ij;
    x = Aj[j];
    for(k=j;k!==n;++k) {
      Aj[k] /= x;
    }
    for(k=n-1;k!==-1;--k) {
      Ij[k] /= x;
    }
    for(i=m-1;i!==-1;--i) {
      if(i!==j) {
        Ai = A[i];
        Ii = I[i];
        x = Ai[j];
        for(k=j+1;k!==n;++k) {
          Ai[k] -= Aj[k]*x;
        }
        for(k=n-1;k>0;--k) {
          Ii[k] -= Ij[k]*x; --k; Ii[k] -= Ij[k]*x;
        }
        if(k===0) {
          Ii[0] -= Ij[0]*x;
        }
      }
    }
  }
  return I;
};

exports.MMULT = function(x, y) {
  x = utils.parseMatrix(x);
  if (x instanceof Error) {
    return x;
  }
  y = utils.parseMatrix(y);
  if (y instanceof Error) {
    return y;
  }
  var d = matrix.dim;
  switch(d(x).length*1000+d(y).length) {
  case 2002:
    if(y.length < 10) {
      return matrix.dotMMsmall(x,y);
    }
    return matrix.dotMMbig(x,y);
  case 2001: return matrix.dotMV(x,y);
  case 1002: return matrix.dotVM(x,y);
  case 1001: return matrix.dotVV(x,y);
  case 1000: return matrix.mulVS(x,y);
  case 1: return matrix.mulSV(x,y);
  case 0: return x*y;
  default: throw new Error('can only multiply vectors and matrices');
  }
};

exports.MOD = function(dividend, divisor) {
  dividend = utils.parseNumber(dividend);
  if (dividend instanceof Error) {
    return dividend;
  }
  divisor = utils.parseNumber(divisor);
  if (divisor instanceof Error) {
    return divisor;
  }
  if (divisor === 0) {
    return error.div0;
  }
  var modulus = Math.abs(dividend % divisor);
  return (divisor > 0) ? modulus : -modulus;
};

exports.MROUND = function(number, multiple) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  multiple = utils.parseNumber(multiple);
  if (multiple instanceof Error) {
    return multiple;
  }
  if (number * multiple < 0) {
    return error.num;
  }

  return Math.round(number / multiple) * multiple;
};

exports.MULTINOMIAL = function() {
  var args = _.flatten(arguments);
  var n = args.length;
  for (var i = 0; i < n; i++) {
    args[i] = utils.parseNumber(args[i]);
    if (args[i] instanceof Error) {
      return args[i];
    } 
  }
  var sum = 0;
  var divisor = 1;
  for (var i = 0; i < args.length; i++) {
    sum += args[i];
    divisor *= exports.FACT(args[i]);
  }
  return exports.FACT(sum) / divisor;
};

exports.MUNIT = function(dimension) {
  dimension = utils.parseNumber(dimension);
  if (dimension instanceof Error) {
    return dimension;
  }
  return matrix.identity(dimension);
};

exports.ODD = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  var temp = Math.ceil(Math.abs(number));
  temp = (temp & 1) ? temp : temp + 1;
  return (number > 0) ? temp : -temp;
};

exports.PI = function() {
  return Math.PI;
};

exports.POWER = function(number, power) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  power = utils.parseNumber(power);
  if (power instanceof Error) {
    return power;
  }
  var result = Math.pow(number, power);
  if (isNaN(result)) {
    return error.num;
  }

  return result;
};

exports.PRODUCT = function() {
  var args = utils.parseNumbers(_.flatten(arguments));
  if (args instanceof Error) {
    return args;
  }
  var result = 1;
  for (var i = 0; i < args.length; i++) {
    result *= args[i];
  }
  return result;
};

exports.QUOTIENT = function(numerator, denominator) {
  numerator = utils.parseNumber(numerator);
  if (numerator instanceof Error) {
    return numerator;
  }
  denominator = utils.parseNumber(denominator);
  if (denominator instanceof Error) {
    return denominator;
  }
  return parseInt(numerator / denominator, 10);
};

exports.RADIANS = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return number * Math.PI / 180;
};

exports.RAND = function() {
  return Math.random();
};

exports.RANDBETWEEN = function(bottom, top) {
  bottom = utils.parseNumber(bottom);
  if (bottom instanceof Error) {
    return bottom;
  }
  top = utils.parseNumber(top);
  if (top instanceof Error) {
    return top;
  }
  // Creative Commons Attribution 3.0 License
  // Copyright (c) 2012 eqcode
  return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1;
};

// TODO
exports.ROMAN = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  // The MIT License
  // Copyright (c) 2008 Steven Levithan
  var digits = String(number).split('');
  var key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  var roman = '';
  var i = 3;
  while (i--) {
    roman = (key[+digits.pop() + (i * 10)] || '') + roman;
  }
  return new Array(+digits.join('') + 1).join('M') + roman;
};

exports.ROUND = function(number, digits) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  digits = utils.parseNumber(digits);
  if (digits instanceof Error) {
    return digits;
  }
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
};

exports.ROUNDDOWN = function(number, digits) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  digits = utils.parseNumber(digits);
  if (digits instanceof Error) {
    return digits;
  }
  var sign = (number > 0) ? 1 : -1;
  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
};

exports.ROUNDUP = function(number, digits) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  digits = utils.parseNumber(digits);
  if (digits instanceof Error) {
    return digits;
  }
  var sign = (number > 0) ? 1 : -1;
  return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
};

exports.SEC = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return 1 / Math.cos(number);
};

exports.SECH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return 2 / (Math.exp(number) + Math.exp(-number));
};

exports.SERIESSUM = function(x, n, m, coefficients) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  n = utils.parseNumber(n);
  if (n instanceof Error) {
    return n;
  }
  m = utils.parseNumber(m);
  if (m instanceof Error) {
    return m;
  }
  coefficients = utils.parseNumbers(coefficients);
  if (coefficients instanceof Error) {
    return coefficients;
  }
  var result = coefficients[0] * Math.pow(x, n);
  for (var i = 1; i < coefficients.length; i++) {
    result += coefficients[i] * Math.pow(x, n + i * m);
  }
  return result;
};

exports.SIGN = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  if (number < 0) {
    return -1;
  } else if (number === 0) {
    return 0;
  } else {
    return 1;
  }
};

exports.SIN = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.sin(number);
};

exports.SINH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return (Math.exp(number) - Math.exp(-number)) / 2;
};

exports.SQRT = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  if (number < 0) {
    return error.num;
  }
  return Math.sqrt(number);
};

exports.SQRTPI = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.sqrt(number * Math.PI);
};

exports.SUBTOTAL = function() {
  var args = utils.argsToArray(arguments);
  var function_code = utils.parseNumber(args.shift());
  if (function_code instanceof Error) {
    return function_code;
  }
  switch (function_code) {
    case 1:
      return statistical.AVERAGE(args);
    case 2:
      return statistical.COUNT(args);
    case 3:
      return statistical.COUNTA(args);
    case 4:
      return statistical.MAX(args);
    case 5:
      return statistical.MIN(args);
    case 6:
      return exports.PRODUCT(args);
    case 7:
      return statistical.STDEV.S(args);
    case 8:
      return statistical.STDEV.P(args);
    case 9:
      return exports.SUM(args);
    case 10:
      return statistical.VAR.S(args);
    case 11:
      return statistical.VAR.P(args);
      // no hidden values for us
    case 101:
      return statistical.AVERAGE(args);
    case 102:
      return statistical.COUNT(args);
    case 103:
      return statistical.COUNTA(args);
    case 104:
      return statistical.MAX(args);
    case 105:
      return statistical.MIN(args);
    case 106:
      return exports.PRODUCT(args);
    case 107:
      return statistical.STDEV.S(args);
    case 108:
      return statistical.STDEV.P(args);
    case 109:
      return exports.SUM(args);
    case 110:
      return statistical.VAR.S(args);
    case 111:
      return statistical.VAR.P(args);

  }
};

exports.SUM = function() {
  var numbers = utils.parseNumbers(_.flatten(arguments));
  var result = 0;
  var i = numbers.length;
  while (i--) {
    result += numbers[i];
  }

  return result;
};

exports.SUMIF = function(range, criteria, sum_range) {
  range = _.flatten(range);
  sum_range = sum_range !== undefined ? _.flatten(sum_range) : range;
  sum_range = utils.parseNumbers(sum_range);
  if (sum_range instanceof Error) {
    return sum_range;
  }
  if (!/[><=!]/.test(criteria)) {
    criteria = '=' + JSON.stringify(criteria);
  } else {
    criteria = criteria[0] + JSON.stringify(criteria.slice(1));
  }
  var result = 0;
  for (var i = 0; i < sum_range.length; i++) {
    if (evalExpr(JSON.stringify(range[i]) + criteria)) {
      result += sum_range[i];
    }
  }
  return result;
};

exports.SUMIFS = function() {
  var criterias = utils.argsToArray(arguments);
  var range = _.flatten(criterias.shift());
  if (range instanceof Error) {
    return range;
  }

  var result = 0;

  for (var i = 0; i < range.length; i++) {
    var n = utils.parseNumber(range[i], true);
    var valid = true;
    for (var c = 0; c < criterias.length; c += 2) {
      if (criterias[c].length !== range.length) {
        return error.value;
      }

      var criteria = criterias[c + 1];
      if (!/[><=!]/.test(criteria)) {
        criteria = '=' + JSON.stringify(criteria);
      } else {
        criteria = criteria[0] + JSON.stringify(criteria.slice(1));
      }
      if (!evalExpr(JSON.stringify(criterias[c][i]) + criteria)) {
        valid = false;
        break;
      }
    }
    if (valid) {
        result += n;
    }
  }

  return result;
};

exports.SUMPRODUCT = function() {
  if (!arguments || arguments.length === 0) {
    return error.value;
  }
  var arrays = arguments.length + 1;
  var result = 0;
  var product;
  var i;
  if (!(arguments[0] instanceof Array)) {
    product = 1;
    for (i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'number') {
        product *= arguments[i];
      } else {
        return error.value;
      }
    }
    return product;
  }
  var k;
  var _i;
  var _ij;
  for (i = 0; i < arguments[0].length; i++) {
    if (!(arguments[0][i] instanceof Array)) {
      product = 1;
      for (k = 1; k < arrays; k++) {
        _i = utils.parseNumber(arguments[k - 1][i]);
        if (_i instanceof Error) {
          return _i;
        }
        product *= _i;
      }
      result += product;
    } else {
      for (var j = 0; j < arguments[0][i].length; j++) {
        product = 1;
        for (k = 1; k < arrays; k++) {
          _ij = utils.parseNumber(arguments[k - 1][i][j]);
          if (_ij instanceof Error) {
            return _ij;
          }
          product *= _ij;
        }
        result += product;
      }
    }
  }
  return result;
};

exports.SUMSQ = function() {
  var numbers = utils.parseNumbers(_.flatten(arguments), true);
  if (numbers instanceof Error) {
    return numbers;
  }
  var result = 0;
  var length = numbers.length;
  for (var i = 0; i < length; i++) {
    result += (information.ISNUMBER(numbers[i])) ? numbers[i] * numbers[i] : 0;
  }
  return result;
};

exports.SUMX2MY2 = function(array_x, array_y) {
  if (array_x.length !== array_y.length) {
    return error.na;
  }
  var n = array_x.length;
  var x;
  var y;
  var parsed_x = [];
  var parsed_y = [];
  for (var i = 0; i < n; i++) {
    if (array_x[i] instanceof Error) {
      return array_x[i];
    }
    if (array_y[i] instanceof Error) {
      return array_y[i];
    }
    x = utils.parseNumber(array_x[i]);
    y = utils.parseNumber(array_y[i]);
    if (x instanceof Error || y instanceof Error) {
      continue;
    }
    parsed_x[parsed_x.length] = x;
    parsed_y[parsed_y.length] = y;
  }
  var result = 0;
  for (var i = 0; i < parsed_x.length; i++) {
    result += parsed_x[i] * parsed_x[i] - parsed_y[i] * parsed_y[i];
  }
  return result;
};

exports.SUMX2PY2 = function(array_x, array_y) {
  if (array_x.length !== array_y.length) {
    return error.na;
  }
  var n = array_x.length;
  var x;
  var y;
  var parsed_x = [];
  var parsed_y = [];
  for (var i = 0; i < n; i++) {
    if (array_x[i] instanceof Error) {
      return array_x[i];
    }
    if (array_y[i] instanceof Error) {
      return array_y[i];
    }
    x = utils.parseNumber(array_x[i]);
    y = utils.parseNumber(array_y[i]);
    if (x instanceof Error || y instanceof Error) {
      continue;
    }
    parsed_x[parsed_x.length] = x;
    parsed_y[parsed_y.length] = y;
  }
  var result = 0;
  for (var i = 0; i < parsed_x.length; i++) {
    result += parsed_x[i] * parsed_x[i] + parsed_y[i] * parsed_y[i];
  }
  return result;
};

exports.SUMXMY2 = function(array_x, array_y) {
  if (array_x.length !== array_y.length) {
    return error.na;
  }
  var n = array_x.length;
  var x;
  var y;
  var parsed_x = [];
  var parsed_y = [];
  for (var i = 0; i < n; i++) {
    if (array_x[i] instanceof Error) {
      return array_x[i];
    }
    if (array_y[i] instanceof Error) {
      return array_y[i];
    }
    x = utils.parseNumber(array_x[i]);
    y = utils.parseNumber(array_y[i]);
    if (x instanceof Error || y instanceof Error) {
      continue;
    }
    parsed_x[parsed_x.length] = x;
    parsed_y[parsed_y.length] = y;
  }
  var result = 0;
  for (var i = 0; i < parsed_x.length; i++) {
    result += Math.pow(parsed_x[i] - parsed_y[i], 2);
  }
  return result;
};

exports.TAN = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return Math.tan(number);
};

exports.TANH = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  var e2 = Math.exp(2 * number);
  return (e2 - 1) / (e2 + 1);
};

exports.TRUNC = function(number, digits) {
  digits = (digits === undefined) ? 0 : digits;
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  digits = utils.parseNumber(digits);
  if (digits instanceof Error) {
    return digits;
  }
  var sign = (number > 0) ? 1 : -1;
  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
};
