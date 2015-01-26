var mathTrig = require('./math-trig');
var text = require('./text');
var jStat = require('jStat').jStat;
var utils = require('../utils');
var error = require('./error');
var evalExpr = require('../utils/expression-parser');
var _ = require('../utils/limited-lodash');

var SQRT2PI = 2.5066282746310002;

exports.AVEDEV = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range.length === 0) {
    return error.num;
  }
  if (range instanceof Error) {
    return range;
  }
  return jStat.sum(jStat(range).subtract(jStat.mean(range)).abs()[0]) / range.length;
};

exports.AVERAGE = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  if (range.length === 0) {
    return error.div0;
  }
  var n = range.length;
  var sum = 0;
  var count = 0;
  for (var i = 0; i < n; i++) {
    sum += range[i];
    count += 1;
  }
  return sum / count;
};

exports.AVERAGEA = function() {
  var range = utils.parseNumbersA(_.flatten(arguments));
  return exports.AVERAGE(range);
};

exports.AVERAGEIF = function(range, criteria, average_range) {
  average_range = average_range || range;
  range = _.flatten(range);
  var parsed = utils.parseNumbersX(range, _.flatten(average_range));
  if (parsed instanceof Error) {
    throw parsed;
  }
  range = parsed[0];
  average_range = parsed[1];

  if (criteria === null || criteria === undefined) {
    criteria = 0;
  }

  var average_count = 0;
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    if (evalExpr(range[i] + criteria)) {
      result += average_range[i];
      average_count++;
    }
  }

  if (average_count === 0) {
    return error.div0;
  }

  return result / average_count;
};

exports.AVERAGEIFS = function() {
  var criterias = utils.argsToArray(arguments);
  var range = _.flatten(criterias.shift());

  var result = 0;
  var count = 0;

  for (var i = 0; i < range.length; i++) {
    if (typeof(range[i]) !== 'number') {
      continue;
    }
    var valid = true;
    for (var c = 0; c < criterias.length; c += 2) {
      if (criterias[c].length !== range.length) {
        return error.value;
      }

      var criteria = criterias[c + 1];
      if (!/[><=!]/.test(criteria)) {
        if (!isNaN(parseFloat(criteria))) {
          criteria = '=' + criteria;
        } else {
          criteria = '=' + JSON.stringify(criteria);
        }
      } else {
        var sl = criteria.slice(1);
        if (!isNaN(parseFloat(sl))) {
          criteria = criteria[0] + sl;
        } else {
          criteria = criteria[0] + JSON.stringify(sl);
        }
      }
      if (!evalExpr(JSON.stringify(criterias[c][i]) + criteria)) {
        valid = false;
        break;
      }
    }
    if (valid) {
        result += range[i];
        count++;
    }
  }

  if (count === 0) {
    return error.div0;
  }

  return result / count;
};

exports.BETA = {};

exports.BETA.DIST = function(x, alpha, beta, cumulative, A, B) {
  if (typeof cumulative === 'number' && B === undefined) { // for BETADIST, wich has always cummulative == true
    B = A;
    A = cumulative;
    cumulative = true;
  }

  A = (A === undefined) ? 0 : A;
  B = (B === undefined) ? 1 : B;

  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  alpha = utils.parseNumber(alpha);
  if (alpha instanceof Error) {
    return alpha;
  }
  beta = utils.parseNumber(beta);
  if (beta instanceof Error) {
    return beta;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative
  }
  A = utils.parseNumber(A);
  if (A instanceof Error) {
    return A;
  }
  B = utils.parseNumber(B);
  if (B instanceof Error) {
    return B;
  }

  x = (x - A) / (B - A);
  return (cumulative) ? jStat.beta.cdf(x, alpha, beta) : jStat.beta.pdf(x, alpha, beta);
};

exports.BETA.INV = function(probability, alpha, beta, A, B) {
  A = (A === undefined) ? 0 : A;
  B = (B === undefined) ? 1 : B;

  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  alpha = utils.parseNumber(alpha);
  if (alpha instanceof Error) {
    return alpha;
  }
  beta = utils.parseNumber(beta);
  if (beta instanceof Error) {
    return beta;
  }
  A = utils.parseNumber(A);
  if (A instanceof Error) {
    return A;
  }
  B = utils.parseNumber(B);
  if (B instanceof Error) {
    return B;
  }

  return jStat.beta.inv(probability, alpha, beta) * (B - A) + A;
};

exports.BINOM = {};

exports.BINOM.DIST = function(successes, trials, probability, cumulative) {
  successes = utils.parseNumber(successes);
  if (successes instanceof Error) {
    return successes;
  }
  trials = utils.parseNumber(trials);
  if (trials instanceof Error) {
    return trials;
  }
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }

  if (successes < 0 || successes > trials) {
    return error.num;
  }
  if (probability < 0 || probability > 1) {
    return error.num;
  }
  return (cumulative) ? jStat.binomial.cdf(successes, trials, probability) : jStat.binomial.pdf(successes, trials, probability);
};

exports.BINOM.DIST.RANGE = function(trials, probability, successes, successes2) {
  successes2 = (successes2 === undefined) ? successes : successes2;

  trials = utils.parseNumber(trials);
  if (trials instanceof Error) {
    return trials;
  }
  if (trials < 0) {
    return error.num;
  }
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  if (probability < 0 || probability > 1) {
    return error.num;
  }
  successes = utils.parseNumber(successes);
  if (successes instanceof Error) {
    return successes;
  }
  if (successes < 0 || successes > trials) {
    return error.num;
  }
  successes2 = utils.parseNumber(successes2);
  if (successes2 instanceof Error) {
    return successes2;
  }
  if (successes2 < successes || successes2 > trials) {
    return error.num;
  }

  var result = 0;
  for (var i = successes; i <= successes2; i++) {
    result += mathTrig.COMBIN(trials, i) * Math.pow(probability, i) * Math.pow(1 - probability, trials - i);
  }
  return result;
};

exports.BINOM.INV = function(trials, probability, alpha) {
  trials = utils.parseNumber(trials);
  if (trials instanceof Error) {
    return trials;
  }
  if (trials < 0) {
    return error.num;
  }
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  if (probability < 0 || probability > 1) {
    return error.num;
  }
  alpha = utils.parseNumber(alpha);
  if (alpha instanceof Error) {
    return alpha;
  }
  if (alpha < 0 || alpha > 1) {
    return error.num;
  }

  var x = 0;
  while (x <= trials) {
    if (jStat.binomial.cdf(x, trials, probability) >= alpha) {
      return x;
    }
    x++;
  }
};

exports.CHISQ = {};

exports.CHISQ.DIST = function(x, k, cumulative) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  if (x < 0) {
    return error.num;
  }
  k = utils.parseNumber(k);
  if (k instanceof Error) {
    return k;
  }
  if (k < 1 || k > Math.pow(10, 10)) {
    return error.num;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }

  return (cumulative) ? jStat.chisquare.cdf(x, k) : jStat.chisquare.pdf(x, k);
};

//TODO
exports.CHISQ.DIST.RT = function() {
 throw new Error('CHISQ.DIST.RT is not implemented');
};

exports.CHISQ.INV = function(probability, k) {
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  if (probability < 0 || probability > 1) {
    return error.num;
  }
  k = utils.parseNumber(k);
  if (k instanceof Error) {
    return k;
  }
  if (k < 1 || k > Math.pow(10, 10)) {
    return error.num;
  }
  return jStat.chisquare.inv(probability, k);
};

//TODO
exports.CHISQ.INV.RT = function() {
 throw new Error('CHISQ.INV.RT is not implemented');
};

//TODO
exports.CHISQ.TEST = function() {
 throw new Error('CHISQ.TEST is not implemented');
};

exports.CONFIDENCE = {};

exports.CONFIDENCE.NORM = function(alpha, sd, n) {
  alpha = utils.parseNumber(alpha);
  if (alpha instanceof Error) {
    return alpha;
  }
  if (alpha <= 0 || alpha >= 1) {
    return error.num;
  }
  sd = utils.parseNumber(sd);
  if (sd instanceof Error) {
    return sd;
  }
  if (sd <= 0) {
    return error.num;
  }
  n = utils.parseNumber(n);
  if (n instanceof Error) {
    return n;
  }
  if (n < 1) {
    return error.num;
  }
  return jStat.normalci(1, alpha, sd, n)[1] - 1;
};

exports.CONFIDENCE.T = function(alpha, sd, n) {
  alpha = utils.parseNumber(alpha);
  if (alpha instanceof Error) {
    return alpha;
  }
  if (alpha <= 0 || alpha >= 1) {
    return error.num;
  }
  sd = utils.parseNumber(sd);
  if (sd instanceof Error) {
    return sd;
  }
  if (sd <= 0) {
    return error.num;
  }
  n = utils.parseNumber(n);
  if (n instanceof Error) {
    return n;
  }
  if (n === 1) {
    return error.div0;
  }
  if (n < 1) {
    return error.num;
  }
  return jStat.tci(1, alpha, sd, n)[1] - 1;
};

exports.CORREL = function(array_x, array_y) {
  var parsed = utils.parseNumbersX(array_x, array_y);
  if (parsed instanceof Error) {
    return parsed;
  }
  var parsed_x = parsed[0];
  var parsed_y = parsed[1];
  if (parsed_x.length === 0 || parsed_y.length === 0) {
    return error.div0;
  }
  return jStat.corrcoeff(parsed_x, parsed_y);
};

exports.COUNT = function() {
  var numbers = utils.parseNumbers(_.flatten(arguments));
  return numbers.length;
};

exports.COUNTA = function() {
  var range = _.flatten(arguments);
  var count = 0;
  for (var i = 0; i < range.length; i++) {
    if (range[i] !== null && range[i] !== undefined) {
      count++;
    }
  }
  return count;
};

exports.COUNTBLANK = function() {
  var range = _.flatten(arguments);
  var blanks = 0;
  for (var i = 0; i < range.length; i++) {
    if (range[i] === undefined || range[i] === null || range[i] === '') {
      blanks++;
    }
  }
  return blanks;
};

exports.COUNTIF = function(range, criteria) {
  range = _.flatten(range);
  if (!/[><=!]/.test(criteria)) {
    criteria = '=' + JSON.stringify(criteria);
  } else {
    criteria = criteria[0] + JSON.stringify(criteria.slice(1));
  }
  var count = 0;
  for (var i = 0; i < range.length; i++) {
    if (evalExpr(JSON.stringify(range[i]) + criteria)) {
      count++
    }
  }
  return count;
};

exports.COUNTIFS = function() {
  var args = utils.argsToArray(arguments);

  var count = 0;

  for (var c = 0; c < args.length; c += 2) {
    var range = _.flatten(args[c]);
    var criteria = args[c+1];
    if (!/[><=!]/.test(criteria)) {
      if (!isNaN(parseFloat(criteria))) {
        criteria = '=' + criteria;
      } else {
        criteria = '=' + JSON.stringify(criteria);
      }
    } else {
      var sl = criteria.slice(1);
      if (!isNaN(parseFloat(sl))) {
        criteria = criteria[0] + sl;
      } else {
        criteria = criteria[0] + JSON.stringify(sl);
      }
    }
    for (var i = 0; i < range.length; i++) {
      if (evalExpr(JSON.stringify(range[i]) + criteria)) {
        count++;
      }
    }
  }

  return count;
};

exports.COVARIANCE = {};

exports.COVARIANCE.P = function(array1, array2) {
  var parsed = utils.parseNumbersX(array1, array2);
  if (parsed instanceof Error) {
    return parsed;
  }
  var parsed_x = parsed[0];
  var parsed_y = parsed[1];
  if (parsed_x.length === 0 || parsed_y.length === 0) {
    return error.div0;
  }
  var mean1 = jStat.mean(parsed_x);
  var mean2 = jStat.mean(parsed_y);
  var result = 0;
  var n = parsed_x.length;
  for (var i = 0; i < n; i++) {
    result += (parsed_x[i] - mean1) * (parsed_y[i] - mean2);
  }
  return result / n;
};

exports.COVARIANCE.S = function(array1, array2) {
  var parsed = utils.parseNumbersX(array1, array2);
  if (parsed instanceof Error) {
    return parsed;
  }
  var parsed_x = parsed[0];
  var parsed_y = parsed[1];
  if (parsed_x.length === 0 || parsed_y.length === 0) {
    return error.div0;
  }
  return jStat.covariance(parsed_x, parsed_y);
};

exports.DEVSQ = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  var mean = jStat.mean(range);
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    result += Math.pow((range[i] - mean), 2);
  }
  return result;
};

exports.EXPON = {};

exports.EXPON.DIST = function(x, lambda, cumulative) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  if (x < 0) {
    return error.num
  }
  lambda = utils.parseNumber(lambda);
  if (lambda instanceof Error) {
    return lambda;
  }
  if (lambda <= 0) {
    return error.num;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }
  return (cumulative) ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda);
};

exports.F = {};

// TODO: verify if this is not the other way around
// actually looks like Excel switched the cumulative for the other
exports.F.DIST = function(x, d1, d2, cumulative) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  if (x < 0) {
    return error.num
  }
  d1 = utils.parseNumber(d1);
  if (d1 instanceof Error) {
    return d1;
  }
  if (d1 < 1) {
    return error.num;
  }
  d2 = utils.parseNumber(d2);
  if (d2 instanceof Error) {
    return d2;
  }
  if (d2 < 1) {
    return error.num;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }
  return (cumulative) ? jStat.centralF.pdf(x, d1, d2) : jStat.centralF.cdf(x, d1, d2);
};

//TODO
exports.F.DIST.RT = function() {
 throw new Error('F.DIST.RT is not implemented');
};

exports.F.INV = function(probability, d1, d2) {
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  if (probability < 0 || probability > 1) {
    return error.num;
  }
  d1 = utils.parseNumber(d1);
  if (d1 instanceof Error) {
    return d1;
  }
  if (d1 < 1) {
    return error.num;
  }
  d2 = utils.parseNumber(d2);
  if (d2 instanceof Error) {
    return d2;
  }
  if (d2 < 1) {
    return error.num;
  }

  return jStat.centralF.inv(probability, d1, d2);
};

//TODO
exports.F.INV.RT = function() {
 throw new Error('F.INV.RT is not implemented');
};

//TODO
exports.F.TEST = function() {
 throw new Error('F.TEST is not implemented');
};

//TODO
exports.FISHER = function(x) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  if (x <= -1 || x >= 1) {
    return error.num;
  }
  return Math.log((1 + x) / (1 - x)) / 2;
};

exports.FISHERINV = function(y) {
  y = utils.parseNumber(y);
  if (y instanceof Error) {
    return y;
  }
  var e2y = Math.exp(2 * y);
  return (e2y - 1) / (e2y + 1);
};

exports.FORECAST = function(x, data_y, data_x) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  var parsed = utils.parseNumbersX(data_y, data_x);
  if (parsed instanceof Error) {
    return parsed;
  }
  data_y = parsed[0];
  data_x = parsed[1];
  if (data_y.length === 0 || data_x.length === 1) {
    return error.na;
  }
  var xmean = jStat.mean(data_x);
  var ymean = jStat.mean(data_y);
  var n = data_x.length;
  var num = 0;
  var den = 0;
  for (var i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den += Math.pow(data_x[i] - xmean, 2);
  }
  if (den === 0) {
    return error.div0;
  }
  var b = num / den;
  var a = ymean - b * xmean;
  return a + b * x;
};

exports.FREQUENCY = function(data, bins) {
  data = utils.parseNumbers(_.flatten(data));
  if (data instanceof Error) {
    return data;
  }
  if (data.length === 0) {
    var r = [];
    for (var i = 0; i < bins.length + 1; i++) {
      r.push(0);
    }
    return r;
  }
  bins = utils.parseNumbers(_.flatten(bins));
  if (bins instanceof Error) {
    return bins;
  }
  if (bins.length === 0) {
    return [0, data.length];
  }
  var n = data.length;
  var b = bins.length;
  var r = [];
  for (var i = 0; i <= b; i++) {
    r[i] = 0;
    for (var j = 0; j < n; j++) {
      if (i === 0) {
        if (data[j] <= bins[0]) {
          r[0] += 1;
        }
      } else if (i < b) {
        if (data[j] > bins[i - 1] && data[j] <= bins[i]) {
          r[i] += 1;
        }
      } else if (i === b) {
        if (data[j] > bins[b - 1]) {
          r[b] += 1;
        }
      }
    }
  }
  return r;
};


exports.GAMMA = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }

  if (number === 0) {
    return error.num;
  }

  if (parseInt(number, 10) === number && number < 0) {
    return error.num;
  }

  return jStat.gammafn(number);
};

exports.GAMMA.DIST = function(value, alpha, beta, cumulative) {
  value = utils.parseNumber(value);
  if (value instanceof Error) {
    return value;
  }
  if (value < 0) {
    return error.num;
  }
  alpha = utils.parseNumber(alpha);
  if (alpha instanceof Error) {
    return alpha;
  }
  if (alpha <= 0) {
    return error.num;
  }
  beta = utils.parseNumber(beta);
  if (beta instanceof Error) {
    return beta;
  }
  if (beta <= 0) {
    return error.num;
  }
  if (cumulative === undefined) {
    cumulative = false;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }

  return cumulative ? jStat.gamma.cdf(value, alpha, beta, true) : jStat.gamma.pdf(value, alpha, beta, false);
};

exports.GAMMA.INV = function(probability, alpha, beta) {
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  if (probability < 0 || probability > 1) {
    return error.num;
  }
  alpha = utils.parseNumber(alpha);
  if (alpha instanceof Error) {
    return alpha;
  }
  if (alpha <= 0) {
    return error.num;
  }
  beta = utils.parseNumber(beta);
  if (beta instanceof Error) {
    return beta;
  }
  if (beta <= 0) {
    return error.num;
  }
  return jStat.gamma.inv(probability, alpha, beta);
};

exports.GAMMALN = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  if (number <= 0) {
    return error.num;
  }
  return jStat.gammaln(number);
};

exports.GAMMALN.PRECISE = function(x) {
  var gamma = exports.GAMMA(x);
  if (gamma instanceof Error) {
    return gamma;
  }
  return Math.log(gamma);
};

exports.GAUSS = function(z) {
  z = utils.parseNumber(z);
  if (z instanceof Error) {
    return z;
  }
  return jStat.normal.cdf(z, 0, 1) - 0.5;
};

exports.GEOMEAN = function() {
  var args = utils.parseNumbers(_.flatten(arguments));
  if (args instanceof Error) {
    return args;
  }
  if (args.length === 0) {
    return error.num;
  }
  for (var i = 0; i < args.length; i++) {
    if (args[i] <= 0) {
      return error.num;
    }
  }
  return jStat.geomean(args);
};

exports.GROWTH = function(known_y, known_x, new_x, use_const) {
  // Credits: Ilmari Karonen (http://stackoverflow.com/questions/14161990/how-to-implement-growth-function-in-javascript)
  var i;
  var parsed_known_y = [];
  var y;
  for (var i = 0; i < known_y.length; i++) {
    if (known_y[i] === undefined || known_y[i] === null) {
      return error.value;
    }
    y = utils.parseNumber(known_y[i]);
    if (y instanceof Error) {
      return y;
    }
    if (y <= 0) {
      return error.num;
    }
    parsed_known_y.push(y);
  }
  known_y = parsed_known_y;

  if (known_x === undefined) {
    known_x = [];
    for (i = 1; i <= known_y.length; i++) {
      known_x.push(i);
    }
  }
  if (known_y.length !== known_x.length) {
    return error.ref;
  }
  known_x = utils.parseNumbers(known_x);
  if (known_x instanceof Error) {
    return known_x;
  }
  if (known_y.length !== known_x.length) {
    return error.value;
  }
  if (new_x === undefined) {
    new_x = [];
    for (i = 1; i <= known_y.length; i++) {
      new_x.push(i);
    }
  }
  new_x = utils.parseNumbers(new_x);
  if (new_x instanceof Error) {
    return new_x;
  }
  if (new_x.length === 0) {
    return error.value;
  }
  if (use_const === undefined) {
    use_const = true;
  }
  use_const = utils.parseBool(use_const);
  if (use_const instanceof Error) {
    return use_const;
  }

  // Calculate sums over the data:
  var n = known_y.length;
  var avg_x = 0;
  var avg_y = 0;
  var avg_xy = 0;
  var avg_xx = 0;
  for (i = 0; i < n; i++) {
    var x = known_x[i];
    var y = Math.log(known_y[i]);
    avg_x += x;
    avg_y += y;
    avg_xy += x * y;
    avg_xx += x * x;
  }
  avg_x /= n;
  avg_y /= n;
  avg_xy /= n;
  avg_xx /= n;

  // Compute linear regression coefficients:
  var beta;
  var alpha;
  if (use_const) {
    beta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x);
    alpha = avg_y - beta * avg_x;
  } else {
    beta = avg_xy / avg_xx;
    alpha = 0;
  }

  // Compute and return result array:
  var new_y = [];
  for (i = 0; i < new_x.length; i++) {
    new_y.push(Math.exp(alpha + beta * new_x[i]));
  }
  return new_y;
};

exports.HARMEAN = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  var n = range.length;
  var den = 0;
  for (var i = 0; i < n; i++) {
    if (range[i] <= 0) {
      return error.num;
    }
    den += 1 / range[i];
  }
  return n / den;
};

exports.HYPGEOM = {};

exports.HYPGEOM.DIST = function(x, n, M, N, cumulative) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  if (x < 0) {
    return error.num;
  }
  n = utils.parseNumber(n);
  if (n instanceof Error) {
    return n;
  }
  if (n <= 0) {
    return error.num;
  }
  M = utils.parseNumber(M);
  if (M instanceof Error) {
    return M;
  }
  if (M <= 0) {
    return error.num;
  }
  if (x > Math.min(n, M)) {
    return error.num;
  }
  N = utils.parseNumber(N);
  if (N instanceof Error) {
    return N;
  }
  if (n > N) {
    return error.num;
  }
  if (M > N) {
    return error.num;
  }
  if (N <= 0) {
    return error.num;
  }
  if (x < Math.max(0, (n - N + M))) {
    return error.num;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }

  function pdf(x, n, M, N) {
    return mathTrig.COMBIN(M, x) * mathTrig.COMBIN(N - M, n - x) / mathTrig.COMBIN(N, n);
  }

  function cdf(x, n, M, N) {
    var result = 0;
    for (var i = 0; i <= x; i++) {
      result += pdf(i, n, M, N);
    }
    return result;
  }

  return (cumulative) ? cdf(x, n, M, N) : pdf(x, n, M, N);
};

exports.INTERCEPT = function(known_y, known_x) {
  var parsed = utils.parseNumbersX(known_y, known_x);
  if (parsed instanceof Error) {
    return parsed;
  }
  parsed_known_y = parsed[0];
  parsed_known_x = parsed[1];
  if (parsed_known_y.length === 0 || parsed_known_x.length === 0) {
    return error.na
  }

  return exports.FORECAST(0, parsed_known_y, parsed_known_x);
};

exports.KURT = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  if (range.length < 4) {
    return error.div0;
  }
  var mean = jStat.mean(range);
  var n = range.length;
  var sigma = 0;
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 4);
  }
  var stdev = jStat.stdev(range, true);
  if (stdev === 0) {
    return error.div0;
  }
  sigma = sigma / Math.pow(stdev, 4);
  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
};

exports.LARGE = function(range, k) {
  range = utils.parseNumbers(_.flatten(range));
  if (range instanceof Error) {
    return range;
  }
  if (range.length === 0) {
    return error.num;
  }
  k = utils.parseNumber(k);
  if (k instanceof Error) {
    return k;
  }
  if (k <= 0 || k > range.length) {
    return error.num;
  }
  return range.sort(function(a, b) {
    return b - a;
  })[k - 1];
};

// TODO: implement LINEST(known_y's, [known_x's], [const], [stats])
exports.LINEST = function(data_y, data_x) {
  var parsed = utils.parseNumbersX(data_y, data_x);
  if (parsed instanceof Error) {
    return parsed;
  }
  data_y = parsed[0];
  data_x = parsed[1];
  if (data_y.length === 0 || data_x.length === 0) {
    return error.na
  }
  var ymean = jStat.mean(data_y);
  var xmean = jStat.mean(data_x);
  var n = data_x.length;
  var num = 0;
  var den = 0;
  for (var i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den += Math.pow(data_x[i] - xmean, 2);
  }
  var m = num / den;
  var b = ymean - m * xmean;
  return [m, b];
};

//TODO
exports.LOGEST = function() {
 throw new Error('LOGEST is not implemented');
};

exports.LOGNORM = {};

exports.LOGNORM.DIST = function(x, mean, sd, cumulative) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  if (x <= 0) {
    return error.num;
  }
  mean = utils.parseNumber(mean);
  if (mean instanceof Error) {
    return mean;
  }
  sd = utils.parseNumber(sd);
  if (sd instanceof Error) {
    return sd;
  }
  if (sd <= 0) {
    return error.num;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }
  return (cumulative) ? jStat.lognormal.cdf(x, mean, sd) : jStat.lognormal.pdf(x, mean, sd);
};

exports.LOGNORM.INV = function(probability, mean, sd) {
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  if (probability <= 0 || probability >= 1) {
    return error.num;
  }
  mean = utils.parseNumber(mean);
  if (mean instanceof Error) {
    return mean;
  }
  sd = utils.parseNumber(sd);
  if (sd instanceof Error) {
    return sd;
  }
  if (sd <= 0) {
    return error.num;
  }
  return jStat.lognormal.inv(probability, mean, sd);
};

exports.MAX = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  return (range.length === 0) ? 0 : Math.max.apply(Math, range);
};

exports.MAXA = function() {
  var range = utils.parseNumbersA(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  return (range.length === 0) ? 0 : Math.max.apply(Math, range);
};

exports.MEDIAN = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  return jStat.median(range);
};

exports.MIN = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  return (range.length === 0) ? 0 : Math.min.apply(Math, range);
};

exports.MINA = function() {
  var range = utils.parseNumbersA(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  return (range.length === 0) ? 0 : Math.min.apply(Math, range);
};

exports.MODE = {};

exports.MODE.MULT = function() {
  // Credits: Roönaän
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  var n = range.length;
  var count = {};
  var maxItems = [];
  var max = 0;
  var currentItem;
  var onlyNonRepeatedValues = true;

  for (var i = 0; i < n; i++) {
    currentItem = range[i];
    count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
    if (count[currentItem] > 1) {
      onlyNonRepeatedValues = false;
    }
    if (count[currentItem] > max) {
      max = count[currentItem];
      maxItems = [];
    }
    if (count[currentItem] === max) {
      maxItems[maxItems.length] = currentItem;
    }
  }
  if (onlyNonRepeatedValues) {
    return error.na;
  }
  return maxItems;
};

exports.MODE.SNGL = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  var mult = exports.MODE.MULT(range);
  if (mult instanceof Error) {
    return mult;
  }
  return mult.sort(function(a, b) {
    return a - b;
  })[0];
};

exports.NEGBINOM = {};

exports.NEGBINOM.DIST = function(k, r, p, cumulative) {
  k = utils.parseNumber(k);
  if (k instanceof Error) {
    return k;
  }
  r = utils.parseNumber(r);
  if (r instanceof Error) {
    return r;
  }
  if (k < 0 || r < 1) {
    return error.num;
  }
  p = utils.parseNumber(p);
  if (p instanceof Error) {
    return p;
  }
  if (p < 0 || p > 1) {
    return error.num;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }
  return (cumulative) ? jStat.negbin.cdf(k, r, p) : jStat.negbin.pdf(k, r, p);
};

exports.NORM = {};

exports.NORM.DIST = function(x, mean, sd, cumulative) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  mean = utils.parseNumber(mean);
  if (mean instanceof Error) {
    return mean;
  }
  sd = utils.parseNumber(sd);
  if (sd instanceof Error) {
    return sd;
  }
  if (sd <= 0) {
    return error.num;
  }

  // Return normal distribution computed by jStat [http://jstat.org]
  return (cumulative) ? jStat.normal.cdf(x, mean, sd) : jStat.normal.pdf(x, mean, sd);
};

exports.NORM.INV = function(probability, mean, sd) {
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  if (probability <= 0 || probability >= 1) {
    return error.num;
  }
  mean = utils.parseNumber(mean);
  if (mean instanceof Error) {
    return mean;
  }
  sd = utils.parseNumber(sd);
  if (sd instanceof Error) {
    return sd;
  }
  if (sd <= 0) {
    return error.num;
  }
  return jStat.normal.inv(probability, mean, sd);
};

exports.NORM.S = {};

exports.NORM.S.DIST = function(z, cumulative) {
  z = utils.parseNumber(z);
  if (z instanceof Error) {
    return error.value;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }
  return (cumulative) ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1);
};

exports.NORM.S.INV = function(probability) {
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return error.value;
  }
  if (probability <= 0 || probability >= 1) {
    return error.num;
  }
  return jStat.normal.inv(probability, 0, 1);
};

exports.PEARSON = function(data_x, data_y) {
  var parsed = utils.parseNumbersX(data_x, data_y);
  if (parsed instanceof Error) {
    return parsed;
  }
  data_x = parsed[0];
  data_y = parsed[1];
  if (data_x.length === 0 || data_y.length === 0) {
    return error.na;
  }
  var xmean = jStat.mean(data_x);
  var ymean = jStat.mean(data_y);
  var n = data_x.length;
  var num = 0;
  var den1 = 0;
  var den2 = 0;
  for (var i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den1 += Math.pow(data_x[i] - xmean, 2);
    den2 += Math.pow(data_y[i] - ymean, 2);
  }
  return num / Math.sqrt(den1 * den2);
};

exports.PERCENTILE = {};

exports.PERCENTILE.EXC = function(array, k) {
  array = utils.parseNumbers(_.flatten(array));
  if (array instanceof Error) {
    return array;
  }
  if (array.length === 0) {
    return error.num;
  }
  k = utils.parseNumber(k);
  if (k instanceof Error) {
    return k;
  }
  if (k <= 0 || k >= 1) {
    return error.num;
  }
  array = array.sort(function(a, b) {
    return a - b;
  });
  var n = array.length;
  if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) {
    return error.num;
  }
  var l = k * (n + 1) - 1;
  var fl = Math.floor(l);
  return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
};

exports.PERCENTILE.INC = function(array, k) {
  array = utils.parseNumbers(_.flatten(array));
  if (array instanceof Error) {
    return array;
  }
  if (array.length === 0) {
    return error.num;
  }
  k = utils.parseNumber(k);
  if (k instanceof Error) {
    return k;
  }
  if (k <= 0 || k >= 1) {
    return error.num;
  }
  array = array.sort(function(a, b) {
    return a - b;
  });
  var n = array.length;
  var l = k * (n - 1);
  var fl = Math.floor(l);
  return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
};

exports.PERCENTRANK = {};

exports.PERCENTRANK.EXC = function(array, x, significance) {
  significance = (significance === undefined) ? 3 : significance;
  array = utils.parseNumbers(_.flatten(array));
  if (array instanceof Error) {
    return array;
  }
  if (array.length === 0) {
    return error.num;
  }
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  significance = utils.parseNumber(significance);
  if (significance instanceof Error) {
    return significance;
  }
  if (significance < 1) {
    return error.num;
  }
  array = array.sort(function(a, b) {
    return a - b;
  });
  var uniques = _.uniq(array);
  var n = array.length;
  var m = uniques.length;
  var power = Math.pow(10, significance);
  var result = 0;
  var match = false;
  var i = 0;
  while (!match && i < m) {
    if (x === uniques[i]) {
      result = (array.indexOf(uniques[i]) + 1) / (n + 1);
      match = true;
    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
      result = (array.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
      match = true;
    }
    i++;
  }
  return Math.floor(result * power) / power;
};

exports.PERCENTRANK.INC = function(array, x, significance) {
  significance = (significance === undefined) ? 3 : significance;
  array = utils.parseNumbers(_.flatten(array));
  if (array instanceof Error) {
    return array;
  }
  if (array.length === 0) {
    return error.num;
  }
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  significance = utils.parseNumber(significance);
  if (significance instanceof Error) {
    return significance;
  }
  if (significance < 1) {
    return error.num;
  }
  array = array.sort(function(a, b) {
    return a - b;
  });
  var uniques = _.uniq(array);
  var n = array.length;
  var m = uniques.length;
  var power = Math.pow(10, significance);
  var result = 0;
  var match = false;
  var i = 0;
  while (!match && i < m) {
    if (x === uniques[i]) {
      result = array.indexOf(uniques[i]) / (n - 1);
      match = true;
    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
      result = (array.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
      match = true;
    }
    i++;
  }
  return Math.floor(result * power) / power;
};

exports.PERMUT = function(number, number_chosen) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  if (number <= 0) {
    return error.num;
  }
  number_chosen = utils.parseNumber(number_chosen);
  if (number_chosen instanceof Error) {
    return number_chosen;
  }
  if (number_chosen < 0) {
    return error.num;
  }
  if (number < number_chosen) {
    return error.num;
  }
  return mathTrig.FACT(number) / mathTrig.FACT(number - number_chosen);
};

exports.PERMUTATIONA = function(number, number_chosen) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  if (number < 0) {
    return error.num;
  }
  number_chosen = utils.parseNumber(number_chosen);
  if (number_chosen instanceof Error) {
    return number_chosen;
  }
  if (number_chosen < 0) {
    return error.num;
  } 
  return Math.pow(number, number_chosen);
};

exports.PHI = function(x) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  return Math.exp(-0.5 * x * x) / SQRT2PI;
};

exports.POISSON = {};

exports.POISSON.DIST = function(x, mean, cumulative) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  if (x < 0) {
    return error.num;
  }
  mean = utils.parseNumber(mean);
  if (mean instanceof Error) {
    return mean;
  }
  if (mean < 0) {
    return error.num;
  }
  cumulative = utils.parseBool(cumulative);
  if (cumulative instanceof Error) {
    return cumulative;
  }
  return (cumulative) ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean);
};

exports.PROB = function(range, probability, lower, upper) {
  lower = (lower === undefined) ? 0 : lower;
  upper = (upper === undefined) ? lower : upper;

  range = utils.parseNumbers(_.flatten(range));
  if (range instanceof Error) {
    return range;
  }
  probability = utils.parseNumbers(_.flatten(probability));
  if (probability instanceof Error) {
    return probability;
  }
  if (range.length !== probability.length) {
    return error.na;
  }
  if (probability.filter(function (el) { return el <= 0 || el > 1; }).length > 0) {
    return error.num;
  }
  if (probability.reduce(function (a, b) { return a+b; }) !== 1) {
    return error.num;
  }
  lower = utils.parseNumber(lower);
  if (lower instanceof Error) {
    return lower;
  }
  upper = utils.parseNumber(upper);
  if (upper instanceof Error) {
    return upper;
  }
  if (lower === upper) {
    return (range.indexOf(lower) >= 0) ? probability[range.indexOf(lower)] : 0;
  }

  var sorted = range.sort(function(a, b) {
    return a - b;
  });
  var n = sorted.length;
  var result = 0;
  for (var i = 0; i < n; i++) {
    if (sorted[i] >= lower && sorted[i] <= upper) {
      result += probability[range.indexOf(sorted[i])];
    }
  }
  return result;
};

exports.QUARTILE = {};

exports.QUARTILE.EXC = function(range, quart) {
  range = utils.parseNumbers(_.flatten(range));
  if (range instanceof Error) {
    return range;
  }
  if (range.length === 0) {
    return error.num;
  }
  quart = utils.parseNumber(quart);
  if (quart instanceof Error) {
    return quart;
  }
  quart = parseInt(quart, 10);
  switch (quart) {
    case 1:
      return exports.PERCENTILE.EXC(range, 0.25);
    case 2:
      return exports.PERCENTILE.EXC(range, 0.5);
    case 3:
      return exports.PERCENTILE.EXC(range, 0.75);
    default:
      return error.num;
  }
};

exports.QUARTILE.INC = function(range, quart) {
  range = utils.parseNumbers(_.flatten(range));
  if (range instanceof Error) {
    return range;
  }
  if (range.length === 0) {
    return error.num;
  }
  quart = utils.parseNumber(quart);
  if (quart instanceof Error) {
    return quart;
  }
  quart = parseInt(quart, 10);
  switch (quart) {
    case 1:
      return exports.PERCENTILE.INC(range, 0.25);
    case 2:
      return exports.PERCENTILE.INC(range, 0.5);
    case 3:
      return exports.PERCENTILE.INC(range, 0.75);
    default:
      return error.num;
  }
};

exports.RANK = {};

exports.RANK.AVG = function(number, range, order) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  range = utils.parseNumbers(_.flatten(range));
  if (range instanceof Error) {
    return range;
  }
  if (range.length === 0) {
    return error.na;
  }
  if (range.indexOf(number) < 0) {
    return error.na;
  }
  order = order || false;
  var sort = (order) ? function(a, b) {
    return a - b;
  } : function(a, b) {
    return b - a;
  };
  range = range.sort(sort);

  var length = range.length;
  var count = 0;
  for (var i = 0; i < length; i++) {
    if (range[i] === number) {
      count++;
    }
  }

  return (count > 1) ? (2 * range.indexOf(number) + count + 1) / 2 : range.indexOf(number) + 1;
};

exports.RANK.EQ = function(number, range, order) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  range = utils.parseNumbers(_.flatten(range));
  if (range instanceof Error) {
    return range;
  }
  if (range.length === 0) {
    return error.na;
  }
  if (range.indexOf(number) < 0) {
    return error.na;
  }
  order = order || false;
  var sort = (order) ? function(a, b) {
    return a - b;
  } : function(a, b) {
    return b - a;
  };
  range = range.sort(sort);
  return range.indexOf(number) + 1;
};

exports.RSQ = function(data_x, data_y) {
  var parsed = utils.parseNumbersX(data_x, data_y);
  if (parsed instanceof Error) {
    return parsed;
  }
  data_x = parsed[0];
  data_y = parsed[1];
  if (data_x.length === 0 || data_y === 0) {
    return error.na;
  }
  if (data_x.length === 1 || data_y.length === 1) {
    return error.div0;
  }
  return Math.pow(exports.PEARSON(data_x, data_y), 2);
};

exports.SKEW = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  var mean = jStat.mean(range);
  var n = range.length;
  var sigma = 0;
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 3);
  }
  return n * sigma / ((n - 1) * (n - 2) * Math.pow(jStat.stdev(range, true), 3));
};

exports.SKEW.P = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  if (range instanceof Error) {
    return range;
  }
  var mean = jStat.mean(range);
  var n = range.length;
  var m2 = 0;
  var m3 = 0;
  for (var i = 0; i < n; i++) {
    m3 += Math.pow(range[i] - mean, 3);
    m2 += Math.pow(range[i] - mean, 2);
  }
  m3 = m3 / n;
  m2 = m2 / n;
  return m3 / Math.pow(m2, 3 / 2);
};

exports.SLOPE = function(data_y, data_x) {
  var parsed = utils.parseNumbersX(data_x, data_y);
  if (parsed instanceof Error) {
    return parsed;
  }
  data_x = parsed[0];
  data_y = parsed[1];
  if (data_x.length === 0 || data_y === 0) {
    return error.na;
  }
  var xmean = jStat.mean(data_x);
  var ymean = jStat.mean(data_y);
  var n = data_x.length;
  var num = 0;
  var den = 0;
  for (var i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den += Math.pow(data_x[i] - xmean, 2);
  }
  if (den === 0) {
    return error.div0;
  }
  return num / den;
};

exports.SMALL = function(range, k) {
  range = utils.parseNumbers(_.flatten(range));
  if (range instanceof Error) {
    return range;
  }
  k = utils.parseNumber(k);
  if (k instanceof Error) {
    return k;
  }
  return range.sort(function(a, b) {
    return a - b;
  })[k - 1];
};

exports.STANDARDIZE = function(x, mean, sd) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  mean = utils.parseNumber(mean);
  if (mean instanceof Error) {
    return mean;
  }
  sd = utils.parseNumber(sd);
  if (sd instanceof Error) {
    return sd;
  }
  return (x - mean) / sd;
};

exports.STDEV = {};

exports.STDEV.P = function() {
  var v = exports.VAR.P.apply(this, arguments);
  return Math.sqrt(v);
};

exports.STDEV.S = function() {
  var v = exports.VAR.S.apply(this, arguments);
  return Math.sqrt(v);
};

exports.STDEVA = function() {
  var v = exports.VARA.apply(this, arguments);
  return Math.sqrt(v);
};

exports.STDEVPA = function() {
  var v = exports.VARPA.apply(this, arguments);
  return Math.sqrt(v);
};


exports.STEYX = function(data_y, data_x) {
  var parsed = utils.parseNumbersX(data_x, data_y);
  if (parsed instanceof Error) {
    return parsed;
  }
  data_x = parsed[0];
  data_y = parsed[1];
  if (data_x.length === 0 || data_y === 0) {
    return error.na;
  }
  var xmean = jStat.mean(data_x);
  var ymean = jStat.mean(data_y);
  var n = data_x.length;
  var lft = 0;
  var num = 0;
  var den = 0;
  for (var i = 0; i < n; i++) {
    lft += Math.pow(data_y[i] - ymean, 2);
    num += (data_x[i] - xmean) * (data_y[i] - ymean);
    den += Math.pow(data_x[i] - xmean, 2);
  }
  if (den === 0) {
    return error.div0;
  }
  return Math.sqrt((lft - num * num / den) / (n - 2));
};

exports.T = text.T;

exports.T.DIST = function(x, df, cumulative) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  df = utils.parseNumber(df);
  if (df instanceof Error) {
    return df;
  }
  return (cumulative) ? jStat.studentt.cdf(x, df) : jStat.studentt.pdf(x, df);
};

//TODO
exports.T.DIST['2T'] = function() {
 throw new Error('T.DIST.2T is not implemented');
};

//TODO
exports.T.DIST.RT = function() {
 throw new Error('T.DIST.RT is not implemented');
};

//TODO
exports.T.INV = function(probability, df) {
  probability = utils.parseNumber(probability);
  if (probability instanceof Error) {
    return probability;
  }
  df = utils.parseNumber(df);
  if (df instanceof Error) {
    return df;
  }
  return jStat.studentt.inv(probability, df);
};

//TODO
exports.T.INV['2T'] = function() {
 throw new Error('T.INV.2T is not implemented');
};

//TODO
exports.T.TEST = function() {
 throw new Error('T.TEST is not implemented');
};

//TODO
exports.TREND = function() {
 throw new Error('TREND is not implemented');
};

exports.TRIMMEAN = function(range, percent) {
  range = utils.parseNumbers(_.flatten(range));
  if (range instanceof Error) {
    return range;
  }
  percent = utils.parseNumber(percent);
  if (percent instanceof Error) {
    return percent;
  }
  var trim = mathTrig.FLOOR(range.length * percent, 2) / 2;
  return jStat.mean(_.initial(_.rest(range.sort(function(a, b) {
    return a - b;
  }), trim), trim));
};

exports.VAR = {};

exports.VAR.P = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  var n = range.length;
  var sigma = 0;
  var mean = exports.AVERAGE(range);
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2);
  }
  return sigma / n;
};

exports.VAR.S = function() {
  var range = utils.parseNumbers(_.flatten(arguments));
  var n = range.length;
  var sigma = 0;
  var mean = exports.AVERAGE(range);
  for (var i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2);
  }
  return sigma / (n - 1);
};

exports.VARA = function() {
  var range = _.flatten(arguments);
  var n = range.length;
  var sigma = 0;
  var count = 0;
  var mean = exports.AVERAGEA(range);
  for (var i = 0; i < n; i++) {
    var el = range[i];
    if (typeof el === 'number') {
      sigma += Math.pow(el - mean, 2);
    } else if (el === true) {
      sigma += Math.pow(1 - mean, 2);
    } else {
      sigma += Math.pow(0 - mean, 2);
    }

    if (el !== null) {
      count++;
    }
  }
  return sigma / (count - 1);
};

exports.VARPA = function() {
  var range = _.flatten(arguments);
  var n = range.length;
  var sigma = 0;
  var count = 0;
  var mean = exports.AVERAGEA(range);
  for (var i = 0; i < n; i++) {
    var el = range[i];
    if (typeof el === 'number') {
      sigma += Math.pow(el - mean, 2);
    } else if (el === true) {
      sigma += Math.pow(1 - mean, 2);
    } else {
      sigma += Math.pow(0 - mean, 2);
    }

    if (el !== null) {
      count++;
    }
  }
  return sigma / count;
};

exports.WEIBULL = {};

exports.WEIBULL.DIST = function(x, alpha, beta, cumulative) {
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }
  alpha = utils.parseNumber(alpha);
  if (alpha instanceof Error) {
    return alpha;
  }
  beta = utils.parseNumber(beta);
  if (beta instanceof Error) {
    return beta;
  }
  return (cumulative) ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
};

exports.Z = {};

exports.Z.TEST = function(range, x, sd) {
  range = utils.parseNumbers(_.flatten(range));
  if (range instanceof Error) {
    return range;
  }
  x = utils.parseNumber(x);
  if (x instanceof Error) {
    return x;
  }

  sd = sd || exports.STDEV.S(range);
  var n = range.length;
  return 1 - exports.NORM.S.DIST((exports.AVERAGE(range) - x) / (sd / Math.sqrt(n)), true);
};
