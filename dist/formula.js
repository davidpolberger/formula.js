(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["formulajs"] = factory();
	else
		root["formulajs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var categories = [
	  __webpack_require__(1),
	  __webpack_require__(14),
	  __webpack_require__(15),
	  __webpack_require__(17),
	  __webpack_require__(3),
	  __webpack_require__(11),
	  __webpack_require__(18),
	  __webpack_require__(19),
	  __webpack_require__(20),
	  __webpack_require__(7),
	  __webpack_require__(21),
	  __webpack_require__(2),
	  __webpack_require__(22),
	  __webpack_require__(5),
	];

	for (var c in categories) {
	  var category = categories[c];
	  for (var f in category) {
	    exports[f] = exports[f] || category[f];
	  }
	}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var statistical = __webpack_require__(2);

	function set(fn, root) {
	  if (root) {
	    for (var i in root) {
	      fn[i] = root[i];
	    }
	  }
	  return fn;
	}

	exports.BETADIST = statistical.BETA.DIST;
	exports.BETAINV = statistical.BETA.INV;
	exports.BINOMDIST = statistical.BINOM.DIST;
	exports.CHIDIST = statistical.CHISQ.DIST;
	exports.CHIINV = statistical.CHISQ.INV;
	exports.CHITEST = statistical.CHISQ.TEST;
	exports.CONFIDENCE = set(statistical.CONFIDENCE.NORM, statistical.CONFIDENCE);
	exports.COVAR = statistical.COVARIANCE.P;
	exports.CRITBINOM = statistical.BINOM.INV;
	exports.EXPONDIST = statistical.EXPON.DIST;
	exports.FDIST = statistical.F.DIST;
	exports.FINV = statistical.F.INV;
	exports.FTEST = statistical.F.TEST;
	exports.GAMMADIST = statistical.GAMMA.DIST;
	exports.GAMMAINV = statistical.GAMMA.INV;
	exports.HYPGEOMDIST = statistical.HYPGEOM.DIST;
	exports.LOGINV = statistical.LOGNORM.INV;
	exports.LOGNORMDIST = statistical.LOGNORM.DIST;
	exports.MODE = set(statistical.MODE.SNGL, statistical.MODE);
	exports.NEGBINOMDIST = statistical.NEGBINOM.DIST;
	exports.NORMDIST = statistical.NORM.DIST;
	exports.NORMINV = statistical.NORM.INV;
	exports.NORMSDIST = statistical.NORM.S.DIST;
	exports.NORMSINV = statistical.NORM.S.INV;
	exports.PERCENTILE = set(statistical.PERCENTILE.EXC, statistical.PERCENTILE);
	exports.PERCENTRANK = set(statistical.PERCENTRANK.INC, statistical.PERCENTRANK);
	exports.POISSON = set(statistical.POISSON.DIST, statistical.POISSON);
	exports.QUARTILE = set(statistical.QUARTILE.INC, statistical.QUARTILE);
	exports.RANK = set(statistical.RANK.EQ, statistical.RANK);
	exports.STDEV = set(statistical.STDEV.S, statistical.STDEV);
	exports.STDEVP = statistical.STDEV.P;
	exports.TDIST = statistical.T.DIST;
	exports.TINV = statistical.T.INV;
	exports.TTEST = statistical.T.TEST;
	exports.VAR = set(statistical.VAR.S, statistical.VAR);
	exports.VARP = statistical.VAR.P;
	exports.WEIBULL = set(statistical.WEIBULL.DIST, statistical.WEIBULL);
	exports.ZTEST = statistical.Z.TEST;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var mathTrig = __webpack_require__(3);
	var text = __webpack_require__(11);
	var jStat = __webpack_require__(13).jStat;
	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);
	var evalExpr = __webpack_require__(8);
	var _ = __webpack_require__(6);

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
	  if (Math.abs(probability.reduce(function (a, b) { return a+b; }) - 1) > 0.00005) {
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
	  if (range.length < 3) {
	    return error.div0;
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
	  if (range.length < 3) {
	    return error.div0;
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
	  if (sd <= 0) {
	    return error.num;
	  }
	  return (x - mean) / sd;
	};

	exports.STDEV = {};

	exports.STDEV.P = function() {
	  var v = exports.VAR.P.apply(this, arguments);
	  if (v instanceof Error) {
	    return v;
	  }
	  return Math.sqrt(v);
	};

	exports.STDEV.S = function() {
	  var v = exports.VAR.S.apply(this, arguments);
	  if (v instanceof Error) {
	    return v;
	  }
	  return Math.sqrt(v);
	};

	exports.STDEVA = function() {
	  var v = exports.VARA.apply(this, arguments);
	  if (v instanceof Error) {
	    return v;
	  }
	  return Math.sqrt(v);
	};

	exports.STDEVPA = function() {
	  var v = exports.VARPA.apply(this, arguments);
	  if (v instanceof Error) {
	    return v;
	  }
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
	  if (df < 1) {
	    return error.num;
	  }
	  cumulative = utils.parseBool(cumulative);
	  if (cumulative instanceof Error) {
	    return cumulative;
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

	exports.T.INV = function(probability, df) {
	  probability = utils.parseNumber(probability);
	  if (probability instanceof Error) {
	    return probability;
	  }
	  if (probability <= 0 || probability > 1) {
	    return error.num;
	  }
	  df = utils.parseNumber(df);
	  if (df instanceof Error) {
	    return df;
	  }
	  if (df < 1) {
	    return error.num;
	  }
	  df = Math.floor(df);
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
	  if (percent < 0 || percent > 1) {
	    return error.num;
	  }
	  var trim = mathTrig.FLOOR(range.length * percent, 2) / 2;
	  return jStat.mean(_.initial(_.rest(range.sort(function(a, b) {
	    return a - b;
	  }), trim), trim));
	};

	exports.VAR = {};

	exports.VAR.P = function() {
	  var range = utils.parseNumbers(_.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var sigma = 0;
	  var mean = exports.AVERAGE(range);
	  for (var i = 0; i < range.length; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  return sigma / range.length;
	};

	exports.VAR.S = function() {
	  var range = utils.parseNumbers(_.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var sigma = 0;
	  var mean = exports.AVERAGE(range);
	  for (var i = 0; i < range.length; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  return sigma / (range.length - 1);
	};

	exports.VARA = function() {
	  var range = utils.parseNumbersA(_.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var sigma = 0;
	  var mean = exports.AVERAGEA(range);
	  for (var i = 0; i < range.length; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  return sigma / (range.length - 1);
	};

	exports.VARPA = function() {
	  var range = utils.parseNumbersA(_.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var sigma = 0;
	  var mean = exports.AVERAGEA(range);
	  for (var i = 0; i < range.length; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  return sigma / range.length;
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
	  cumulative = utils.parseBool(cumulative);
	  if (cumulative instanceof Error) {
	    return cumulative;
	  }
	  return (cumulative) ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
	};

	exports.Z = {};

	exports.Z.TEST = function(array, x, sigma) {
	  array = utils.parseNumbers(_.flatten(array));
	  if (array instanceof Error) {
	    return array;
	  }
	  if (array.length === 0) {
	    return error.na;
	  }
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return x;
	  }

	  sigma = sigma || exports.STDEV.S(array);
	  var n = array.length;
	  return 1 - exports.NORM.S.DIST((exports.AVERAGE(array) - x) / (sigma / Math.sqrt(n)), true);
	};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);
	var statistical = __webpack_require__(2);
	var information = __webpack_require__(7);
	var evalExpr = __webpack_require__(8);
	var matrix = __webpack_require__(10);
	var _ = __webpack_require__(6);

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

	  if ((number < -1) || (number > 1)) {
	    return error.num;
	  }

	  return Math.acos(number);
	};

	exports.ACOSH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  if (number < 1) {
	    return error.num;
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

	  if ((number < -1) || (number > 1)) {
	    return error.num;
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

	  if ((number <= -1) || (number >= 1)) {
	    return error.num;
	  }

	  return Math.log((1 + number) / (1 - number)) / 2;
	};

	exports.BASE = function(number, radix, min_length) {
	  if (min_length === undefined || min_length === null) {
	    min_length = 0;
	  }

	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number < 0 || number >= 2e53) {
	    return error.num;
	  }
	  radix = utils.parseNumber(radix);
	  if (radix instanceof Error) {
	    return radix;
	  }
	  if (radix < 2 || radix > 36) {
	    return error.num;
	  }
	  min_length = utils.parseNumber(min_length);
	  if (min_length instanceof Error) {
	    return min_length;
	  }
	  if (min_length < 0) {
	    return error.num;
	  }
	  var result = number.toString(radix);
	  return new Array(Math.max(min_length + 1 - result.length, 0)).join('0') + result;
	};

	exports.CEILING = function(number, significance) {
	  return exports.CEILING.MATH(number,
	                              Math.abs(significance),
	                              significance >= 0 ? 0 : -1);
	};

	exports.CEILING.MATH = function(number, significance, mode) {
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

	  if (number >= 0) {
	    return exports.MROUND(Math.ceil(number / significance) * significance, significance);
	  } else {
	    if (mode === 0) {
	      return -exports.MROUND(Math.floor(Math.abs(number) / significance) * significance, significance);
	    } else {
	      return -exports.MROUND(Math.ceil(Math.abs(number) / significance) * significance, significance);
	    }
	  }
	};

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
	  if (number instanceof Error) {
	    return number;
	  }
	  radix = utils.parseNumber(radix);
	  if (radix instanceof Error) {
	    return radix;
	  }
	  if (radix < 2 || radix > 36) {
	    return error.num;
	  }
	  number = parseInt(number, radix);
	  if (isNaN(number)) {
	    return error.num;
	  }
	  return number;
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
	  if (number < 0) {
	    return error.num;
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
	  if (number < 0) {
	    return error.num;
	  }
	  var n = Math.floor(number);
	  if (n <= 1) {
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
	  if (number >= 0) {
	    return exports.MROUND(Math.floor(number / significance) * significance, significance);
	  } else {
	    return -exports.MROUND(Math.ceil(Math.abs(number) / significance), significance);
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
	  if (number >= 0) {
	    return exports.MROUND(Math.floor(number / significance) * significance, significance);
	  } else if (mode === 0 || mode === undefined) {
	    return -exports.MROUND(Math.ceil(Math.abs(number) / significance) * significance, significance);
	  }
	  return -exports.MROUND(Math.floor(Math.abs(number) / significance) * significance, significance);
	};

	// Deprecated
	exports.FLOOR.PRECISE = exports.FLOOR.MATH;

	// adapted http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
	exports.GCD = function() {
	  var range = utils.parseNumbersConvert(_.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  if (range.length === 0) {
	    return error.value;
	  }
	  var r0 = range[0];
	  var x = r0 < 0 ? -r0 : r0;
	  for (var i = 1; i < range.length; i++) {
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
	  if (number <= 0) {
	    return error.num;
	  }
	  return Math.log(number);
	};

	exports.LOG = function(number, base) {
	  base = (base === undefined) ? 10 : base;

	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number <= 0) {
	    return error.num;
	  }
	  base = utils.parseNumber(base);
	  if (base instanceof Error) {
	    return base;
	  }
	  if (base <= 0) {
	    return error.num;
	  }
	  var b = Math.log(base);
	  if (b === 0) {
	    return error.div0;
	  }
	  return Math.log(number) / b;
	};

	exports.LOG10 = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number <= 0) {
	    return error.num;
	  }
	  return Math.log(number) / Math.log(10);
	};

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
	  var matrix = [];

	  for (var col = 0; col < y.length; col++) {
	    matrix[col] = [];

	    for (var row = 0; row < x[0].length; row++) {
	      var sum = 0;
	      for (var i = 0; i < x.length; i++) {
	          sum += x[i][row] * y[col][i];
	      }
	      matrix[col][row] = sum;
	    }
	  }
	  return matrix;
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
	  if (denominator === 0) {
	    return error.div0;
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
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.round(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
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
	  if (number < 0) {
	    return error.num;
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
	    if (sum_range[i] instanceof Error) {
	      return sum_range[i];
	    }
	    if (typeof(sum_range[i]) !== 'number') {
	      continue;
	    }
	    if (evalExpr(JSON.stringify(range[i]) + criteria)) {
	      result += sum_range[i];
	    }
	  }
	  return result;
	};

	exports.SUMIFS = function() {
	  var criterias = utils.argsToArray(arguments);
	  var range = _.flatten(criterias.shift());
	  var result = 0;

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
	  var numbers = utils.parseNumbers(_.flatten(arguments));
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
	  var parsed = utils.parseNumbersX(array_x, array_y);
	  if (parsed instanceof Error) {
	    return parsed;
	  }
	  var parsed_x = parsed[0];
	  var parsed_y = parsed[1];
	  var result = 0;
	  for (var i = 0; i < parsed_x.length; i++) {
	    result += parsed_x[i] * parsed_x[i] - parsed_y[i] * parsed_y[i];
	  }
	  return result;
	};

	exports.SUMX2PY2 = function(array_x, array_y) {
	  var parsed = utils.parseNumbersX(array_x, array_y);
	  if (parsed instanceof Error) {
	    return parsed;
	  }
	  var parsed_x = parsed[0];
	  var parsed_y = parsed[1];
	  var result = 0;
	  for (var i = 0; i < parsed_x.length; i++) {
	    result += parsed_x[i] * parsed_x[i] + parsed_y[i] * parsed_y[i];
	  }
	  return result;
	};

	exports.SUMXMY2 = function(array_x, array_y) {
	  var parsed = utils.parseNumbersX(array_x, array_y);
	  if (parsed instanceof Error) {
	    return parsed;
	  }
	  var parsed_x = parsed[0];
	  var parsed_y = parsed[1];
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var _ = __webpack_require__(6);

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

	// Parse dates
	exports.excelToJsTimestamp = function(timestamp) {
	  if (timestamp < 60) {
	    timestamp++;
	  }
	  return Math.round((timestamp - 25569) * 86400000);
	};

	exports.jsToExcelTimestamp = function(timestamp) {
	  timestamp = (timestamp / 86400000) + 25569;
	  if (timestamp <= 60) {
	    timestamp--;
	  }
	  return timestamp;
	};

	/**
	 * Creates a new Date instance using the same parameters accepted by the Date
	 * class. If only a single parameter is given which is not a string, this
	 * function behaves exactly like the Date constructor. Otherwise, this function
	 * returns a date whose time zone offset has been set to UTC.
	 * <p>
	 * The standard Date constructor incorporates the local time zone unless special
	 * ISO 8601 strings are given. This is problematic for many calculations and by
	 * only using UTC Date instances, many problems are avoided.
	 *
	 * @param {*} [valueOrDateStringOrYear]
	 *   the first parameter to the Date constructor, which may be a value (the
	 *   number of milliseconds since 1 January 1970 00:00:00 UTC), a textual date
	 *   string (where the recognized format varies between implementations) or a
	 *   year.
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
	exports.createUTCDate = function(valueOrDateStringOrYear,
	                                 month,
	                                 day,
	                                 hour,
	                                 minute,
	                                 second,
	                                 millisecond) {
	  if ((arguments.length === 1) &&
	      (typeof valueOrDateStringOrYear !== "string")) {
	    return new Date(valueOrDateStringOrYear);
	  }

	  var date = null;

	  if (arguments.length === 0) {
	    date = new Date();
	  } else if (arguments.length === 1) {
	    date = new Date(valueOrDateStringOrYear);
	  } else if (arguments.length === 2) {
	    date = new Date(valueOrDateStringOrYear, month);
	  } else if (arguments.length === 3) {
	    date = new Date(valueOrDateStringOrYear, month, day);
	  } else if (arguments.length === 4) {
	    date = new Date(valueOrDateStringOrYear, month, day, hour);
	  } else if (arguments.length === 5) {
	    date = new Date(valueOrDateStringOrYear, month, day, hour, minute);
	  } else if (arguments.length === 6) {
	    date = new Date(valueOrDateStringOrYear,
	                    month,
	                    day,
	                    hour,
	                    minute,
	                    second);
	  } else if (arguments.length === 7) {
	    date = new Date(valueOrDateStringOrYear, month,
	                    month,
	                    day,
	                    hour,
	                    minute,
	                    second,
	                    millisecond);
	  }

	  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
	};

	exports.parseDate = function(date) {
	  if ((date !== null) && (date !== undefined) && (!isNaN(date))) {
	    if (date instanceof Date) {
	      return exports.createUTCDate(date);
	    }

	    var d = parseFloat(date);

	    if (d < 0) {
	      return error.num;
	    }

	    return exports.createUTCDate(exports.excelToJsTimestamp(d));
	  }

	  if (typeof date === 'string') {
	    date = exports.createUTCDate(date);

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
	  if (text instanceof Error) {
	    return text;
	  }
	  if (text === undefined || text === null) {
	    return '';
	  }
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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	exports.nil = new Error('#NULL!');
	exports.div0 = new Error('#DIV/0!');
	exports.value = new Error('#VALUE!');
	exports.ref = new Error('#REF!');
	exports.name = new Error('#NAME?');
	exports.num = new Error('#NUM!');
	exports.na = new Error('#N/A');
	exports.data = new Error('#GETTING_DATA');


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);

	// TODO
	exports.CELL = function() {
	 throw new Error('CELL is not implemented');
	};

	exports.ERROR = {};
	exports.ERROR.TYPE = function(error_val) {
	  switch (error_val) {
	    case error.nil: return 1;
	    case error.div0: return 2;
	    case error.value: return 3;
	    case error.ref: return 4;
	    case error.name: return 5;
	    case error.num: return 6;
	    case error.na: return 7;
	    case error.data: return 8;
	  }
	  return error.na;
	};

	// TODO
	exports.INFO = function() {
	 throw new Error('INFO is not implemented');
	};

	exports.ISBLANK = function(value) {
	  return value === null;
	};

	exports.ISERR = function(value) {
	  return ([error.value, error.ref, error.div0, error.num, error.name, error.nil]).indexOf(value) >= 0 ||
	    (typeof value === 'number' && (isNaN(value) || !isFinite(value)));
	};

	exports.ISERROR = function(value) {
	  return exports.ISERR(value) || value === error.na;
	};

	exports.ISEVEN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return (Math.floor(Math.abs(number)) & 1) ? false : true;
	};

	// TODO
	exports.ISFORMULA = function() {
	  throw new Error('ISFORMULA is not implemented');
	};

	exports.ISLOGICAL = function(value) {
	  return value === true || value === false;
	};

	exports.ISNA = function(value) {
	  return value === error.na;
	};

	exports.ISNONTEXT = function(value) {
	  return typeof(value) !== 'string';
	};

	exports.ISNUMBER = function(value) {
	  return typeof(value) === 'number' && !isNaN(value) && isFinite(value);
	};

	exports.ISODD = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return (Math.floor(Math.abs(number)) & 1) ? true : false;
	};

	// TODO
	exports.ISREF = function() {
	  throw new Error('ISREF is not implemented');
	};

	exports.ISTEXT = function(value) {
	  return typeof(value) === 'string';
	};

	exports.N = function(value) {
	  if (exports.ISNUMBER(value)) {
	    return value;
	  }
	  if (value instanceof Date) {
	    return utils.jsToExcelTimestamp(value.getTime());
	  }
	  if (value === true) {
	    return 1;
	  }
	  if (value === false) {
	    return 0;
	  }
	  if (exports.ISERROR(value)) {
	    return value;
	  }
	  return 0;
	};

	exports.NA = function() {
	  return error.na;
	};

	// TODO
	exports.SHEET = function() {
	  throw new Error('SHEET is not implemented');
	};

	// TODO
	exports.SHEETS = function() {
	  throw new Error('SHEETS is not implemented');
	};

	exports.TYPE = function(value) {
	  if (exports.ISNUMBER(value)) {
	    return 1;
	  }
	  if (exports.ISTEXT(value)) {
	    return 2;
	  }
	  if (exports.ISLOGICAL(value)) {
	    return 4;
	  }
	  if (exports.ISERROR(value)) {
	    return 16;
	  }
	  if (Array.isArray(value)) {
	    return 64;
	  }
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var jsep = __webpack_require__(9);

	jsep.addBinaryOp('=', 6);

	var binops = {
	  '+' : function(a, b) { return a + b; },
	  '-' : function(a, b) { return a - b; },
	  '*' : function(a, b) { return a * b; },
	  '/' : function(a, b) { return a / b; },
	  '%' : function(a, b) { return a % b; },
	  '>' : function(a, b) { return a > b; },
	  '>=' : function(a, b) { return a >= b; },
	  '<' : function(a, b) { return a < b; },
	  '<=' : function(a, b) { return a <= b; },
	  '=' : function(a, b) { return a == b; },
	  '==' : function(a, b) { return a == b; },
	  '!=' : function(a, b) { return a !== b; }
	};
	var unops = {
	  '-' : function(a) { return -a; },
	  '!' : function(a) { return !a; }
	};
	var logops = {
	  '&&' : function(a, b) { return a && b; },
	  '||' : function(a, b) { return a || b; }
	};

	function do_eval(node, variables) {
	  if (node.type === 'BinaryExpression') {
	    var binop = binops[node.operator];
	    if (!binop) {
	      throw new Error('Unknown binary operator ' + node.operator);
	    }
	    return binop(do_eval(node.left), do_eval(node.right));
	  } else if (node.type === 'UnaryExpression') {
	    var unop = unops[node.operator];
	    if (!unop) {
	      throw new Error('Unknown unary operator ' + node.operator);
	    }
	    return unop(do_eval(node.argument));
	  } else if (node.type === 'LogicalExpression') {
	    var logop = logops[node.operator];
	    if (!logop) {
	      throw new Error('Unknown logical operator ' + node.operator);
	    }
	    return logop(do_eval(node.left), do_eval(node.right));
	  } else if (node.type === 'Literal') {
	    return node.value;
	  } else if (node.type === 'Identifier') {
	    return variables ? variables[node.name] : undefined;
	  } else {
	    throw new Error('Unsupported expr node', node);
	  }
	}

	module.exports = function evalExpr(expr, variables) {
	  var ast = jsep(expr);
	  return do_eval(ast, variables);
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	//     JavaScript Expression Parser (JSEP) 0.2.9
	//     JSEP may be freely distributed under the MIT License
	//     http://jsep.from.so/

	/*global module: true, exports: true, console: true */
	(function (root) {
		'use strict';
		// Node Types
		// ----------
		
		// This is the full set of types that any JSEP node can be.
		// Store them here to save space when minified
		var COMPOUND = 'Compound',
			IDENTIFIER = 'Identifier',
			MEMBER_EXP = 'MemberExpression',
			LITERAL = 'Literal',
			THIS_EXP = 'ThisExpression',
			CALL_EXP = 'CallExpression',
			UNARY_EXP = 'UnaryExpression',
			BINARY_EXP = 'BinaryExpression',
			LOGICAL_EXP = 'LogicalExpression',
			CONDITIONAL_EXP = 'ConditionalExpression',
			ARRAY_EXP = 'Array',

			PERIOD_CODE = 46, // '.'
			COMMA_CODE  = 44, // ','
			SQUOTE_CODE = 39, // single quote
			DQUOTE_CODE = 34, // double quotes
			OPAREN_CODE = 40, // (
			CPAREN_CODE = 41, // )
			OBRACK_CODE = 91, // [
			CBRACK_CODE = 93, // ]
			QUMARK_CODE = 63, // ?
			SEMCOL_CODE = 59, // ;
			COLON_CODE  = 58, // :

			throwError = function(message, index) {
				var error = new Error(message + ' at character ' + index);
				error.index = index;
				error.dedscription = message;
				throw error;
			},

		// Operations
		// ----------
		
		// Set `t` to `true` to save space (when minified, not gzipped)
			t = true,
		// Use a quickly-accessible map to store all of the unary operators
		// Values are set to `true` (it really doesn't matter)
			unary_ops = {'-': t, '!': t, '~': t, '+': t},
		// Also use a map for the binary operations but set their values to their
		// binary precedence for quick reference:
		// see [Order of operations](http://en.wikipedia.org/wiki/Order_of_operations#Programming_language)
			binary_ops = {
				'||': 1, '&&': 2, '|': 3,  '^': 4,  '&': 5,
				'==': 6, '!=': 6, '===': 6, '!==': 6,
				'<': 7,  '>': 7,  '<=': 7,  '>=': 7, 
				'<<':8,  '>>': 8, '>>>': 8,
				'+': 9, '-': 9,
				'*': 10, '/': 10, '%': 10
			},
		// Get return the longest key length of any object
			getMaxKeyLen = function(obj) {
				var max_len = 0, len;
				for(var key in obj) {
					if((len = key.length) > max_len && obj.hasOwnProperty(key)) {
						max_len = len;
					}
				}
				return max_len;
			},
			max_unop_len = getMaxKeyLen(unary_ops),
			max_binop_len = getMaxKeyLen(binary_ops),
		// Literals
		// ----------
		// Store the values to return for the various literals we may encounter
			literals = {
				'true': true,
				'false': false,
				'null': null
			},
		// Except for `this`, which is special. This could be changed to something like `'self'` as well
			this_str = 'this',
		// Returns the precedence of a binary operator or `0` if it isn't a binary operator
			binaryPrecedence = function(op_val) {
				return binary_ops[op_val] || 0;
			},
		// Utility function (gets called from multiple places)
		// Also note that `a && b` and `a || b` are *logical* expressions, not binary expressions
			createBinaryExpression = function (operator, left, right) {
				var type = (operator === '||' || operator === '&&') ? LOGICAL_EXP : BINARY_EXP;
				return {
					type: type,
					operator: operator,
					left: left,
					right: right
				};
			},
			// `ch` is a character code in the next three functions
			isDecimalDigit = function(ch) {
				return (ch >= 48 && ch <= 57); // 0...9
			},
			isIdentifierStart = function(ch) {
				return (ch === 36) || (ch === 95) || // `$` and `_`
						(ch >= 65 && ch <= 90) || // A...Z
						(ch >= 97 && ch <= 122); // a...z
			},
			isIdentifierPart = function(ch) {
				return (ch === 36) || (ch === 95) || // `$` and `_`
						(ch >= 65 && ch <= 90) || // A...Z
						(ch >= 97 && ch <= 122) || // a...z
						(ch >= 48 && ch <= 57); // 0...9
			},

			// Parsing
			// -------
			// `expr` is a string with the passed in expression
			jsep = function(expr) {
				// `index` stores the character number we are currently at while `length` is a constant
				// All of the gobbles below will modify `index` as we move along
				var index = 0,
					charAtFunc = expr.charAt,
					charCodeAtFunc = expr.charCodeAt,
					exprI = function(i) { return charAtFunc.call(expr, i); },
					exprICode = function(i) { return charCodeAtFunc.call(expr, i); },
					length = expr.length,

					// Push `index` up to the next non-space character
					gobbleSpaces = function() {
						var ch = exprICode(index);
						// space or tab
						while(ch === 32 || ch === 9) {
							ch = exprICode(++index);
						}
					},
					
					// The main parsing function. Much of this code is dedicated to ternary expressions
					gobbleExpression = function() {
						var test = gobbleBinaryExpression(),
							consequent, alternate;
						
						gobbleSpaces();
						// Ternary expression: test ? consequent : alternate
						if(exprICode(index) === QUMARK_CODE) {
							index++;
							consequent = gobbleExpression();
							if(!consequent) {
								throwError('Expected expression', index);
							}
							gobbleSpaces();
							if(exprICode(index) === COLON_CODE) {
								index++;
								alternate = gobbleExpression();
								if(!alternate) {
									throwError('Expected expression', index);
								}
								return {
									type: CONDITIONAL_EXP,
									test: test,
									consequent: consequent,
									alternate: alternate
								};
							} else {
								throwError('Expected :', index);
							}
						} else {
							return test;
						}
					},

					// Search for the operation portion of the string (e.g. `+`, `===`)
					// Start by taking the longest possible binary operations (3 characters: `===`, `!==`, `>>>`)
					// and move down from 3 to 2 to 1 character until a matching binary operation is found
					// then, return that binary operation
					gobbleBinaryOp = function() {
						gobbleSpaces();
						var biop, to_check = expr.substr(index, max_binop_len), tc_len = to_check.length;
						while(tc_len > 0) {
							if(binary_ops.hasOwnProperty(to_check)) {
								index += tc_len;
								return to_check;
							}
							to_check = to_check.substr(0, --tc_len);
						}
						return false;
					},

					// This function is responsible for gobbling an individual expression,
					// e.g. `1`, `1+2`, `a+(b*2)-Math.sqrt(2)`
					gobbleBinaryExpression = function() {
						var ch_i, node, biop, prec, stack, biop_info, left, right, i;

						// First, try to get the leftmost thing
						// Then, check to see if there's a binary operator operating on that leftmost thing
						left = gobbleToken();
						biop = gobbleBinaryOp();

						// If there wasn't a binary operator, just return the leftmost node
						if(!biop) {
							return left;
						}

						// Otherwise, we need to start a stack to properly place the binary operations in their
						// precedence structure
						biop_info = { value: biop, prec: binaryPrecedence(biop)};

						right = gobbleToken();
						if(!right) {
							throwError("Expected expression after " + biop, index);
						}
						stack = [left, biop_info, right];

						// Properly deal with precedence using [recursive descent](http://www.engr.mun.ca/~theo/Misc/exp_parsing.htm)
						while((biop = gobbleBinaryOp())) {
							prec = binaryPrecedence(biop);

							if(prec === 0) {
								break;
							}
							biop_info = { value: biop, prec: prec };

							// Reduce: make a binary expression from the three topmost entries.
							while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
								right = stack.pop();
								biop = stack.pop().value;
								left = stack.pop();
								node = createBinaryExpression(biop, left, right);
								stack.push(node);
							}

							node = gobbleToken();
							if(!node) {
								throwError("Expected expression after " + biop, index);
							}
							stack.push(biop_info, node);
						}

						i = stack.length - 1;
						node = stack[i];
						while(i > 1) {
							node = createBinaryExpression(stack[i - 1].value, stack[i - 2], node); 
							i -= 2;
						}
						return node;
					},

					// An individual part of a binary expression:
					// e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
					gobbleToken = function() {
						var ch, curr_node, unop, to_check, tc_len;
						
						gobbleSpaces();
						ch = exprICode(index);

						if(isDecimalDigit(ch) || ch === PERIOD_CODE) {
							// Char code 46 is a dot `.` which can start off a numeric literal
							return gobbleNumericLiteral();
						} else if(ch === SQUOTE_CODE || ch === DQUOTE_CODE) {
							// Single or double quotes
							return gobbleStringLiteral();
						} else if(isIdentifierStart(ch) || ch === OPAREN_CODE) { // open parenthesis
							// `foo`, `bar.baz`
							return gobbleVariable();
						} else {
							to_check = expr.substr(index, max_unop_len);
							tc_len = to_check.length;
							while(tc_len > 0) {
								if(unary_ops.hasOwnProperty(to_check)) {
									index += tc_len;
									return {
										type: UNARY_EXP,
										operator: to_check,
										argument: gobbleToken(),
										prefix: true
									};
								}
								to_check = to_check.substr(0, --tc_len);
							}
							
							return false;
						}
					},
					// Parse simple numeric literals: `12`, `3.4`, `.5`. Do this by using a string to
					// keep track of everything in the numeric literal and then calling `parseFloat` on that string
					gobbleNumericLiteral = function() {
						var number = '', ch;
						while(isDecimalDigit(exprICode(index))) {
							number += exprI(index++);
						}

						if(exprICode(index) === PERIOD_CODE) { // can start with a decimal marker
							number += exprI(index++);

							while(isDecimalDigit(exprICode(index))) {
								number += exprI(index++);
							}
						}
						
						ch = exprI(index);
						if(ch === 'e' || ch === 'E') { // exponent marker
							number += exprI(index++);
							ch = exprI(index);
							if(ch === '+' || ch === '-') { // exponent sign
								number += exprI(index++);
							}
							while(isDecimalDigit(exprICode(index))) { //exponent itself
								number += exprI(index++);
							}
							if(!isDecimalDigit(exprICode(index-1)) ) {
								throwError('Expected exponent (' + number + exprI(index) + ')', index);
							}
						}
						

						// Check to make sure this isn't a variable name that start with a number (123abc)
						if(isIdentifierStart(exprICode(index))) {
							throwError( 'Variable names cannot start with a number (' +
										number + exprI(index) + ')', index);
						}

						return {
							type: LITERAL,
							value: parseFloat(number),
							raw: number
						};
					},

					// Parses a string literal, staring with single or double quotes with basic support for escape codes
					// e.g. `"hello world"`, `'this is\nJSEP'`
					gobbleStringLiteral = function() {
						var str = '', quote = exprI(index++), closed = false, ch;

						while(index < length) {
							ch = exprI(index++);
							if(ch === quote) {
								closed = true;
								break;
							} else if(ch === '\\') {
								// Check for all of the common escape codes
								ch = exprI(index++);
								switch(ch) {
									case 'n': str += '\n'; break;
									case 'r': str += '\r'; break;
									case 't': str += '\t'; break;
									case 'b': str += '\b'; break;
									case 'f': str += '\f'; break;
									case 'v': str += '\x0B'; break;
								}
							} else {
								str += ch;
							}
						}

						if(!closed) {
							throwError('Unclosed quote after "'+str+'"', index);
						}

						return {
							type: LITERAL,
							value: str,
							raw: quote + str + quote
						};
					},
					
					// Gobbles only identifiers
					// e.g.: `foo`, `_value`, `$x1`
					// Also, this function checks if that identifier is a literal:
					// (e.g. `true`, `false`, `null`) or `this`
					gobbleIdentifier = function() {
						var ch = exprICode(index), start = index, identifier;

						if(isIdentifierStart(ch)) {
							index++;
						} else {
							throwError('Unexpected ' + exprI(index), index);
						}

						while(index < length) {
							ch = exprICode(index);
							if(isIdentifierPart(ch)) {
								index++;
							} else {
								break;
							}
						}
						identifier = expr.slice(start, index);

						if(literals.hasOwnProperty(identifier)) {
							return {
								type: LITERAL,
								value: literals[identifier],
								raw: identifier
							};
						} else if(identifier === this_str) {
							return { type: THIS_EXP };
						} else {
							return {
								type: IDENTIFIER,
								name: identifier
							};
						}
					},

					// Gobbles a list of arguments within the context of a function call
					// or array literal. This function also assumes that the opening character
					// `(` or `[` has already been gobbled, and gobbles expressions and commas
					// until the terminator character `)` or `]` is encountered.
					// e.g. `foo(bar, baz)`, `my_func()`, or `[bar, baz]`
					gobbleArguments = function(termination) {
						var ch_i, args = [], node;
						while(index < length) {
							gobbleSpaces();
							ch_i = exprICode(index);
							if(ch_i === termination) { // done parsing
								index++;
								break;
							} else if (ch_i === COMMA_CODE) { // between expressions
								index++;
							} else {
								node = gobbleExpression();
								if(!node || node.type === COMPOUND) {
									throwError('Expected comma', index);
								}
								args.push(node);
							}
						}
						return args;
					},

					// Gobble a non-literal variable name. This variable name may include properties
					// e.g. `foo`, `bar.baz`, `foo['bar'].baz`
					// It also gobbles function calls:
					// e.g. `Math.acos(obj.angle)`
					gobbleVariable = function() {
						var ch_i, node;
						ch_i = exprICode(index);
							
						if(ch_i === OPAREN_CODE) {
							node = gobbleGroup();
						} else {
							node = gobbleIdentifier();
						}
						gobbleSpaces();
						ch_i = exprICode(index);
						while(ch_i === PERIOD_CODE || ch_i === OBRACK_CODE || ch_i === OPAREN_CODE) {
							index++;
							if(ch_i === PERIOD_CODE) {
								gobbleSpaces();
								node = {
									type: MEMBER_EXP,
									computed: false,
									object: node,
									property: gobbleIdentifier()
								};
							} else if(ch_i === OBRACK_CODE) {
								node = {
									type: MEMBER_EXP,
									computed: true,
									object: node,
									property: gobbleExpression()
								};
								gobbleSpaces();
								ch_i = exprICode(index);
								if(ch_i !== CBRACK_CODE) {
									throwError('Unclosed [', index);
								}
								index++;
							} else if(ch_i === OPAREN_CODE) {
								// A function call is being made; gobble all the arguments
								node = {
									type: CALL_EXP,
									'arguments': gobbleArguments(CPAREN_CODE),
									callee: node
								};
							}
							gobbleSpaces();
							ch_i = exprICode(index);
						}
						return node;
					},

					// Responsible for parsing a group of things within parentheses `()`
					// This function assumes that it needs to gobble the opening parenthesis
					// and then tries to gobble everything within that parenthesis, assuming
					// that the next thing it should see is the close parenthesis. If not,
					// then the expression probably doesn't have a `)`
					gobbleGroup = function() {
						index++;
						var node = gobbleExpression();
						gobbleSpaces();
						if(exprICode(index) === CPAREN_CODE) {
							index++;
							return node;
						} else {
							throwError('Unclosed (', index);
						}
					},

					// Responsible for parsing Array literals `[1, 2, 3]`
					// This function assumes that it needs to gobble the opening bracket
					// and then tries to gobble the expressions as arguments.
					gobbleArray = function() {
						index++;
						return {
							type: ARRAY_EXP,
							body: gobbleArguments(CBRACK_CODE)
						};
					},

					nodes = [], ch_i, node;
					
				while(index < length) {
					ch_i = exprICode(index);

					// Expressions can be separated by semicolons, commas, or just inferred without any
					// separators
					if(ch_i === SEMCOL_CODE || ch_i === COMMA_CODE) {
						index++; // ignore separators
					} else if (ch_i === OBRACK_CODE && (node = gobbleArray())) {
						nodes.push(node);
					} else {
						// Try to gobble each expression individually
						if((node = gobbleExpression())) {
							nodes.push(node);
						// If we weren't able to find a binary expression and are out of room, then
						// the expression passed in probably has too much
						} else if(index < length) {
							throwError('Unexpected "' + exprI(index) + '"', index);
						}
					}
				}

				// If there's only one expression just try returning the expression
				if(nodes.length === 1) {
					return nodes[0];
				} else {
					return {
						type: COMPOUND,
						body: nodes
					};
				}
			};

		// To be filled in by the template
		jsep.version = '0.2.9';
		jsep.toString = function() { return 'JavaScript Expression Parser (JSEP) v' + jsep.version; };

		/**
		 * @method jsep.addUnaryOp
		 * @param {string} op_name The name of the unary op to add
		 * @return jsep
		 */
		jsep.addUnaryOp = function(op_name) {
			unary_ops[op_name] = t; return this;
		};

		/**
		 * @method jsep.addBinaryOp
		 * @param {string} op_name The name of the binary op to add
		 * @param {number} precedence The precedence of the binary op (can be a float)
		 * @return jsep
		 */
		jsep.addBinaryOp = function(op_name, precedence) {
			max_binop_len = Math.max(op_name.length, max_binop_len);
			binary_ops[op_name] = precedence;
			return this;
		};

		/**
		 * @method jsep.removeUnaryOp
		 * @param {string} op_name The name of the unary op to remove
		 * @return jsep
		 */
		jsep.removeUnaryOp = function(op_name) {
			delete unary_ops[op_name];
			if(op_name.length === max_unop_len) {
				max_unop_len = getMaxKeyLen(unary_ops);
			}
			return this;
		};

		/**
		 * @method jsep.removeBinaryOp
		 * @param {string} op_name The name of the binary op to remove
		 * @return jsep
		 */
		jsep.removeBinaryOp = function(op_name) {
			delete binary_ops[op_name];
			if(op_name.length === max_binop_len) {
				max_binop_len = getMaxKeyLen(binary_ops);
			}
			return this;
		};

		// In desktop environments, have a way to restore the old value for `jsep`
		if (false) {
			var old_jsep = root.jsep;
			// The star of the show! It's a function!
			root.jsep = jsep;
			// And a courteous function willing to move out of the way for other similarly-named objects!
			jsep.noConflict = function() {
				if(root.jsep === jsep) {
					root.jsep = old_jsep;
				}
				return jsep;
			};
		} else {
			// In Node.JS environments
			if (typeof module !== 'undefined' && module.exports) {
				exports = module.exports = jsep;
			} else {
				exports.parse = jsep;
			}
		}
	}(this));


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	function _dim(x) {
	  var ret = [];
	  while(typeof x === "object") {
	    ret.push(x.length); x = x[0];
	  }
	  return ret;
	};

	exports.dim = function dim(x) {
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
	};

	exports.diag = function diag(d) {
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

	exports.rep = function rep(s,v,k) {
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
	    ret[i] = exports.rep(s,v,k+1);
	  }
	  return ret;
	};

	exports.identity = function identity(n) {
	  return exports.diag(exports.rep([n],1));
	};

	exports.dotMMsmall = function dotMMsmall (x,y) {
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

	exports.dotMMbig = function dotMMbig (x,y) {
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
	  var VV = exports.dotVV;
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

	exports.dotMV = function dotMV (x,y) {
	  var p = x.length, q = y.length,i;
	  var ret = Array(p), dotVV = exports.dotVV;
	  for(i=p-1;i>=0;i--) {
	    ret[i] = dotVV(x[i],y);
	  }
	  return ret;
	};

	exports.dotVM = function dotVM (x,y) {
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

	exports.dotVV = function dotVV (x,y) {
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

	exports.mulVS = function mulVS (x,y) {
	  var _n = x.length;
	  var i, ret = Array(_n);

	  for(i=_n-1;i!==-1;--i) {
	    ret[i] = x[i] * y;
	  }
	  return ret;
	};

	exports.mulSV = function mulSV (x,y) {
	  var _n = y.length;
	  var i, ret = Array(_n);

	  for(i=_n-1;i!==-1;--i) {
	    ret[i] = x * y[i];
	  }

	  return ret;
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);
	var numeral = __webpack_require__(12);
	var _ = __webpack_require__(6);

	//TODO
	exports.ASC = function() {
	 throw new Error('ASC is not implemented');
	};

	//TODO
	exports.BAHTTEXT = function() {
	 throw new Error('BAHTTEXT is not implemented');
	};

	exports.CHAR = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number < 1 || number > 255) {
	    return error.value;
	  }
	  return String.fromCharCode(number);
	};

	exports.CLEAN = function(text) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  return text.replace(/[\0-\x1F]/g, "");
	};

	exports.CODE = function(text) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  return text.charCodeAt(0);
	};

	exports.CONCATENATE = function() {
	  var args = _.flatten(arguments);

	  for (var i = 0; i < args.length; i++) {
	    var text = utils.parseText(args[i]);
	    if (text instanceof Error) {
	      return text;
	    }
	    args[i] = text;
	  }

	  return args.join('');
	};

	//TODO
	exports.DBCS = function() {
	 throw new Error('DBCS is not implemented');
	};

	exports.DOLLAR = function(number, decimals) {
	  decimals = (decimals === undefined) ? 2 : decimals;

	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  decimals = utils.parseNumber(decimals);
	  if (decimals instanceof Error) {
	    return decimals;
	  }
	  var format = '';
	  if (decimals <= 0) {
	    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	    format = '($0,0)';
	  } else if (decimals > 0) {
	    format = '($0,0.' + new Array(decimals + 1).join('0') + ')';
	  }
	  return numeral(number).format(format);
	};

	exports.EXACT = function(text1, text2) {
	  text1 = utils.parseText(text1);
	  if (text1 instanceof Error) {
	    return text1;
	  }
	  text2 = utils.parseText(text2);
	  if (text2 instanceof Error) {
	    return text2;
	  }
	  return text1 === text2;
	};

	exports.FIND = function(find_text, within_text, position) {
	  position = (position === undefined) ? 0 : position;

	  find_text = utils.parseText(find_text);
	  if (find_text instanceof Error) {
	    return find_text;
	  }
	  within_text = utils.parseText(within_text);
	  if (within_text instanceof Error) {
	    return within_text;
	  }
	  position = utils.parseNumber(position);
	  if (position instanceof Error) {
	    return position;
	  }
	  if (position < 0 || position > within_text.length) {
	    return error.value;
	  }
	  var result = within_text.indexOf(find_text, position - 1) + 1;
	  if (result === 0) {
	    return error.value;
	  }
	  return result;
	};

	exports.FIXED = function(number, decimals, no_commas) {
	  decimals = (decimals === undefined) ? 2 : decimals;
	  no_commas = (no_commas === undefined) ? false : no_commas;

	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  decimals = utils.parseNumber(decimals);
	  if (decimals instanceof Error) {
	    return decimals;
	  }

	  var format = no_commas ? '0' : '0,0';
	  if (decimals <= 0) {
	    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	  } else if (decimals > 0) {
	    format += '.' + new Array(decimals + 1).join('0');
	  }
	  return numeral(number).format(format);
	};

	exports.LEFT = function(text, number) {
	  number = (number === undefined) ? 1 : number;

	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number < 0) {
	    return error.value;
	  }
	  return text.substring(0, number);
	};

	exports.LEN = function(text) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  return text.length;
	};

	exports.LOWER = function(text) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  return text.toLowerCase();
	};

	exports.MID = function(text, start, number) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  start = utils.parseNumber(start);
	  if (start instanceof Error) {
	    return start;
	  }
	  if (start < 1) {
	    return error.value;
	  }
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number < 0) {
	    return error.value;
	  }
	  return text.substring(start - 1, number);
	};

	// TODO
	exports.NUMBERVALUE = function() {
	 throw new Error('NUMBERVALUE is not implemented');
	};

	// TODO
	exports.PRONETIC = function() {
	 throw new Error('PRONETIC is not implemented');
	};

	exports.PROPER = function(text) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }

	  return text.replace(/\w\S*/g, function(txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	};

	exports.REPLACE = function(text, position, length, new_text) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  position = utils.parseNumber(position);
	  if (position instanceof Error) {
	    return position;
	  }
	  if (position < 1) {
	    return error.value;
	  }
	  length = utils.parseNumber(length);
	  if (length instanceof Error) {
	    return length;
	  }
	  if (length < 0) {
	    return error.value;
	  }
	  new_text = utils.parseText(new_text);
	  if (new_text instanceof Error) {
	    return new_text;
	  }
	  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
	};

	exports.REPT = function(text, number) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  number = Math.floor(number);
	  if (number < 0) {
	    return error.value;
	  }
	  return new Array(number + 1).join(text);
	};

	exports.RIGHT = function(text, number) {
	  if (number === undefined || number === null) {
	    number = 1;
	  }
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number < 0) {
	    return error.value;
	  }
	  return text.substring(text.length - number);
	};

	// TODO: wildcards
	exports.SEARCH = function(find_text, within_text, position) {
	  position = (position === undefined) ? 0 : position;

	  find_text = utils.parseText(find_text);
	  if (find_text instanceof Error) {
	    return find_text;
	  }
	  within_text = utils.parseText(within_text);
	  if (within_text instanceof Error) {
	    return within_text;
	  }
	  position = utils.parseNumber(position);
	  if (position instanceof Error) {
	    return position;
	  }
	  if (position < 0 || position > within_text.length) {
	    return error.value;
	  }
	  var result = within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1) + 1;
	  if (result === 0) {
	    return error.value;
	  }
	  return result;
	};

	exports.SUBSTITUTE = function(text, old_text, new_text, occurrence) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  old_text = utils.parseText(old_text);
	  if (old_text instanceof Error) {
	    return old_text;
	  }
	  new_text = utils.parseText(new_text);
	  if (new_text instanceof Error) {
	    return new_text;
	  }
	  if (occurrence === undefined) {
	    return text.replace(new RegExp(old_text, 'g'), new_text);
	  }
	  occurrence = utils.parseNumber(occurrence);
	  if (occurrence instanceof Error) {
	    return occurrence;
	  }
	  if (occurrence < 1) {
	    return error.value;
	  }
	  for (var i = 1, index = 0; i <= occurrence; i++, index++) {
	    index = text.indexOf(old_text, index);
	  }
	  return text.substring(0, index - 1) + new_text + text.substring(index - 1 + old_text.length);
	};

	exports.T = function(value) {
	  if (value instanceof Error) {
	    return value;
	  }
	  return (typeof(value) === 'string') ? value : '';
	};

	// TODO
	exports.TEXT = function() {
	  throw new Error('TEXT is not implemented');
	};

	exports.TRIM = function(text) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  return text.replace(/ +/g, ' ').trim();
	};

	exports.UNICHAR = exports.CHAR;

	exports.UNICODE = exports.CODE;

	exports.UPPER = function(text) {
	  if (text instanceof Error) {
	    return text;
	  }
	  return text.toUpperCase();
	};

	// TODO: improve invalid formats
	exports.VALUE = function(text) {
	  text = utils.parseText(text);
	  if (text instanceof Error) {
	    return text;
	  }
	  return numeral().unformat(text);
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * numeral.js
	 * version : 1.5.3
	 * author : Adam Draper
	 * license : MIT
	 * http://adamwdraper.github.com/Numeral-js/
	 */

	(function () {

	    /************************************
	        Constants
	    ************************************/

	    var numeral,
	        VERSION = '1.5.3',
	        // internal storage for language config files
	        languages = {},
	        currentLanguage = 'en',
	        zeroFormat = null,
	        defaultFormat = '0,0',
	        // check for nodeJS
	        hasModule = (typeof module !== 'undefined' && module.exports);


	    /************************************
	        Constructors
	    ************************************/


	    // Numeral prototype object
	    function Numeral (number) {
	        this._value = number;
	    }

	    /**
	     * Implementation of toFixed() that treats floats more like decimals
	     *
	     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	     * problems for accounting- and finance-related software.
	     */
	    function toFixed (value, precision, roundingFunction, optionals) {
	        var power = Math.pow(10, precision),
	            optionalsRegExp,
	            output;
	            
	        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
	        // Multiply up by precision, round accurately, then divide and use native toFixed():
	        output = (roundingFunction(value * power) / power).toFixed(precision);

	        if (optionals) {
	            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
	            output = output.replace(optionalsRegExp, '');
	        }

	        return output;
	    }

	    /************************************
	        Formatting
	    ************************************/

	    // determine what type of formatting we need to do
	    function formatNumeral (n, format, roundingFunction) {
	        var output;

	        // figure out what kind of format we are dealing with
	        if (format.indexOf('$') > -1) { // currency!!!!!
	            output = formatCurrency(n, format, roundingFunction);
	        } else if (format.indexOf('%') > -1) { // percentage
	            output = formatPercentage(n, format, roundingFunction);
	        } else if (format.indexOf(':') > -1) { // time
	            output = formatTime(n, format);
	        } else { // plain ol' numbers or bytes
	            output = formatNumber(n._value, format, roundingFunction);
	        }

	        // return string
	        return output;
	    }

	    // revert to number
	    function unformatNumeral (n, string) {
	        var stringOriginal = string,
	            thousandRegExp,
	            millionRegExp,
	            billionRegExp,
	            trillionRegExp,
	            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            bytesMultiplier = false,
	            power;

	        if (string.indexOf(':') > -1) {
	            n._value = unformatTime(string);
	        } else {
	            if (string === zeroFormat) {
	                n._value = 0;
	            } else {
	                if (languages[currentLanguage].delimiters.decimal !== '.') {
	                    string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
	                }

	                // see if abbreviations are there so that we can multiply to the correct number
	                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');

	                // see if bytes are there so that we can multiply to the correct number
	                for (power = 0; power <= suffixes.length; power++) {
	                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;

	                    if (bytesMultiplier) {
	                        break;
	                    }
	                }

	                // do some math to create our number
	                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));

	                // round if we are talking about bytes
	                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
	            }
	        }
	        return n._value;
	    }

	    function formatCurrency (n, format, roundingFunction) {
	        var symbolIndex = format.indexOf('$'),
	            openParenIndex = format.indexOf('('),
	            minusSignIndex = format.indexOf('-'),
	            space = '',
	            spliceIndex,
	            output;

	        // check for space before or after currency
	        if (format.indexOf(' $') > -1) {
	            space = ' ';
	            format = format.replace(' $', '');
	        } else if (format.indexOf('$ ') > -1) {
	            space = ' ';
	            format = format.replace('$ ', '');
	        } else {
	            format = format.replace('$', '');
	        }

	        // format the number
	        output = formatNumber(n._value, format, roundingFunction);

	        // position the symbol
	        if (symbolIndex <= 1) {
	            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
	                output = output.split('');
	                spliceIndex = 1;
	                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
	                    // the symbol appears before the "(" or "-"
	                    spliceIndex = 0;
	                }
	                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
	                output = output.join('');
	            } else {
	                output = languages[currentLanguage].currency.symbol + space + output;
	            }
	        } else {
	            if (output.indexOf(')') > -1) {
	                output = output.split('');
	                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
	                output = output.join('');
	            } else {
	                output = output + space + languages[currentLanguage].currency.symbol;
	            }
	        }

	        return output;
	    }

	    function formatPercentage (n, format, roundingFunction) {
	        var space = '',
	            output,
	            value = n._value * 100;

	        // check for space before %
	        if (format.indexOf(' %') > -1) {
	            space = ' ';
	            format = format.replace(' %', '');
	        } else {
	            format = format.replace('%', '');
	        }

	        output = formatNumber(value, format, roundingFunction);
	        
	        if (output.indexOf(')') > -1 ) {
	            output = output.split('');
	            output.splice(-1, 0, space + '%');
	            output = output.join('');
	        } else {
	            output = output + space + '%';
	        }

	        return output;
	    }

	    function formatTime (n) {
	        var hours = Math.floor(n._value/60/60),
	            minutes = Math.floor((n._value - (hours * 60 * 60))/60),
	            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
	        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
	    }

	    function unformatTime (string) {
	        var timeArray = string.split(':'),
	            seconds = 0;
	        // turn hours and minutes into seconds and add them all up
	        if (timeArray.length === 3) {
	            // hours
	            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	            // minutes
	            seconds = seconds + (Number(timeArray[1]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[2]);
	        } else if (timeArray.length === 2) {
	            // minutes
	            seconds = seconds + (Number(timeArray[0]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[1]);
	        }
	        return Number(seconds);
	    }

	    function formatNumber (value, format, roundingFunction) {
	        var negP = false,
	            signed = false,
	            optDec = false,
	            abbr = '',
	            abbrK = false, // force abbreviation to thousands
	            abbrM = false, // force abbreviation to millions
	            abbrB = false, // force abbreviation to billions
	            abbrT = false, // force abbreviation to trillions
	            abbrForce = false, // force abbreviation
	            bytes = '',
	            ord = '',
	            abs = Math.abs(value),
	            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            min,
	            max,
	            power,
	            w,
	            precision,
	            thousands,
	            d = '',
	            neg = false;

	        // check if number is zero and a custom zero format has been set
	        if (value === 0 && zeroFormat !== null) {
	            return zeroFormat;
	        } else {
	            // see if we should use parentheses for negative number or if we should prefix with a sign
	            // if both are present we default to parentheses
	            if (format.indexOf('(') > -1) {
	                negP = true;
	                format = format.slice(1, -1);
	            } else if (format.indexOf('+') > -1) {
	                signed = true;
	                format = format.replace(/\+/g, '');
	            }

	            // see if abbreviation is wanted
	            if (format.indexOf('a') > -1) {
	                // check if abbreviation is specified
	                abbrK = format.indexOf('aK') >= 0;
	                abbrM = format.indexOf('aM') >= 0;
	                abbrB = format.indexOf('aB') >= 0;
	                abbrT = format.indexOf('aT') >= 0;
	                abbrForce = abbrK || abbrM || abbrB || abbrT;

	                // check for space before abbreviation
	                if (format.indexOf(' a') > -1) {
	                    abbr = ' ';
	                    format = format.replace(' a', '');
	                } else {
	                    format = format.replace('a', '');
	                }

	                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
	                    // trillion
	                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
	                    value = value / Math.pow(10, 12);
	                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
	                    // billion
	                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
	                    value = value / Math.pow(10, 9);
	                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
	                    // million
	                    abbr = abbr + languages[currentLanguage].abbreviations.million;
	                    value = value / Math.pow(10, 6);
	                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
	                    // thousand
	                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
	                    value = value / Math.pow(10, 3);
	                }
	            }

	            // see if we are formatting bytes
	            if (format.indexOf('b') > -1) {
	                // check for space before
	                if (format.indexOf(' b') > -1) {
	                    bytes = ' ';
	                    format = format.replace(' b', '');
	                } else {
	                    format = format.replace('b', '');
	                }

	                for (power = 0; power <= suffixes.length; power++) {
	                    min = Math.pow(1024, power);
	                    max = Math.pow(1024, power+1);

	                    if (value >= min && value < max) {
	                        bytes = bytes + suffixes[power];
	                        if (min > 0) {
	                            value = value / min;
	                        }
	                        break;
	                    }
	                }
	            }

	            // see if ordinal is wanted
	            if (format.indexOf('o') > -1) {
	                // check for space before
	                if (format.indexOf(' o') > -1) {
	                    ord = ' ';
	                    format = format.replace(' o', '');
	                } else {
	                    format = format.replace('o', '');
	                }

	                ord = ord + languages[currentLanguage].ordinal(value);
	            }

	            if (format.indexOf('[.]') > -1) {
	                optDec = true;
	                format = format.replace('[.]', '.');
	            }

	            w = value.toString().split('.')[0];
	            precision = format.split('.')[1];
	            thousands = format.indexOf(',');

	            if (precision) {
	                if (precision.indexOf('[') > -1) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
	                } else {
	                    d = toFixed(value, precision.length, roundingFunction);
	                }

	                w = d.split('.')[0];

	                if (d.split('.')[1].length) {
	                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
	                } else {
	                    d = '';
	                }

	                if (optDec && Number(d.slice(1)) === 0) {
	                    d = '';
	                }
	            } else {
	                w = toFixed(value, null, roundingFunction);
	            }

	            // format number
	            if (w.indexOf('-') > -1) {
	                w = w.slice(1);
	                neg = true;
	            }

	            if (thousands > -1) {
	                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
	            }

	            if (format.indexOf('.') === 0) {
	                w = '';
	            }

	            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
	        }
	    }

	    /************************************
	        Top Level Functions
	    ************************************/

	    numeral = function (input) {
	        if (numeral.isNumeral(input)) {
	            input = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            input = 0;
	        } else if (!Number(input)) {
	            input = numeral.fn.unformat(input);
	        }

	        return new Numeral(Number(input));
	    };

	    // version number
	    numeral.version = VERSION;

	    // compare numeral object
	    numeral.isNumeral = function (obj) {
	        return obj instanceof Numeral;
	    };

	    // This function will load languages and then set the global language.  If
	    // no arguments are passed in, it will simply return the current global
	    // language key.
	    numeral.language = function (key, values) {
	        if (!key) {
	            return currentLanguage;
	        }

	        if (key && !values) {
	            if(!languages[key]) {
	                throw new Error('Unknown language : ' + key);
	            }
	            currentLanguage = key;
	        }

	        if (values || !languages[key]) {
	            loadLanguage(key, values);
	        }

	        return numeral;
	    };
	    
	    // This function provides access to the loaded language data.  If
	    // no arguments are passed in, it will simply return the current
	    // global language object.
	    numeral.languageData = function (key) {
	        if (!key) {
	            return languages[currentLanguage];
	        }
	        
	        if (!languages[key]) {
	            throw new Error('Unknown language : ' + key);
	        }
	        
	        return languages[key];
	    };

	    numeral.language('en', {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            var b = number % 10;
	            return (~~ (number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '$'
	        }
	    });

	    numeral.zeroFormat = function (format) {
	        zeroFormat = typeof(format) === 'string' ? format : null;
	    };

	    numeral.defaultFormat = function (format) {
	        defaultFormat = typeof(format) === 'string' ? format : '0.0';
	    };

	    /************************************
	        Helpers
	    ************************************/

	    function loadLanguage(key, values) {
	        languages[key] = values;
	    }

	    /************************************
	        Floating-point helpers
	    ************************************/

	    // The floating-point helper functions and implementation
	    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

	    /**
	     * Array.prototype.reduce for browsers that don't support it
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
	     */
	    if ('function' !== typeof Array.prototype.reduce) {
	        Array.prototype.reduce = function (callback, opt_initialValue) {
	            'use strict';
	            
	            if (null === this || 'undefined' === typeof this) {
	                // At the moment all modern browsers, that support strict mode, have
	                // native implementation of Array.prototype.reduce. For instance, IE8
	                // does not support strict mode, so this check is actually useless.
	                throw new TypeError('Array.prototype.reduce called on null or undefined');
	            }
	            
	            if ('function' !== typeof callback) {
	                throw new TypeError(callback + ' is not a function');
	            }

	            var index,
	                value,
	                length = this.length >>> 0,
	                isValueSet = false;

	            if (1 < arguments.length) {
	                value = opt_initialValue;
	                isValueSet = true;
	            }

	            for (index = 0; length > index; ++index) {
	                if (this.hasOwnProperty(index)) {
	                    if (isValueSet) {
	                        value = callback(value, this[index], index, this);
	                    } else {
	                        value = this[index];
	                        isValueSet = true;
	                    }
	                }
	            }

	            if (!isValueSet) {
	                throw new TypeError('Reduce of empty array with no initial value');
	            }

	            return value;
	        };
	    }

	    
	    /**
	     * Computes the multiplier necessary to make x >= 1,
	     * effectively eliminating miscalculations caused by
	     * finite precision.
	     */
	    function multiplier(x) {
	        var parts = x.toString().split('.');
	        if (parts.length < 2) {
	            return 1;
	        }
	        return Math.pow(10, parts[1].length);
	    }

	    /**
	     * Given a variable number of arguments, returns the maximum
	     * multiplier that must be used to normalize an operation involving
	     * all of them.
	     */
	    function correctionFactor() {
	        var args = Array.prototype.slice.call(arguments);
	        return args.reduce(function (prev, next) {
	            var mp = multiplier(prev),
	                mn = multiplier(next);
	        return mp > mn ? mp : mn;
	        }, -Infinity);
	    }        


	    /************************************
	        Numeral Prototype
	    ************************************/


	    numeral.fn = Numeral.prototype = {

	        clone : function () {
	            return numeral(this);
	        },

	        format : function (inputString, roundingFunction) {
	            return formatNumeral(this, 
	                  inputString ? inputString : defaultFormat, 
	                  (roundingFunction !== undefined) ? roundingFunction : Math.round
	              );
	        },

	        unformat : function (inputString) {
	            if (Object.prototype.toString.call(inputString) === '[object Number]') { 
	                return inputString; 
	            }
	            return unformatNumeral(this, inputString ? inputString : defaultFormat);
	        },

	        value : function () {
	            return this._value;
	        },

	        valueOf : function () {
	            return this._value;
	        },

	        set : function (value) {
	            this._value = Number(value);
	            return this;
	        },

	        add : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum + corrFactor * curr;
	            }
	            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
	            return this;
	        },

	        subtract : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum - corrFactor * curr;
	            }
	            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;            
	            return this;
	        },

	        multiply : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) * (curr * corrFactor) /
	                    (corrFactor * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback, 1);
	            return this;
	        },

	        divide : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) / (curr * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback);            
	            return this;
	        },

	        difference : function (value) {
	            return Math.abs(numeral(this._value).subtract(value).value());
	        }

	    };

	    /************************************
	        Exposing Numeral
	    ************************************/

	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = numeral;
	    }

	    /*global ender:false */
	    if (typeof ender === 'undefined') {
	        // here, `this` means `window` in the browser, or `global` on the server
	        // add `numeral` as a global object via a string identifier,
	        // for Closure Compiler 'advanced' mode
	        this['numeral'] = numeral;
	    }

	    /*global define:false */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return numeral;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}).call(this);


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	this.j$ = this.jStat = (function(Math, undefined) {

	// For quick reference.
	var concat = Array.prototype.concat;
	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;

	// Calculate correction for IEEE error
	// TODO: This calculation can be improved.
	function calcRdx(n, m) {
	  var val = n > m ? n : m;
	  return Math.pow(10,
	                  17 - ~~(Math.log(((val > 0) ? val : -val)) * Math.LOG10E));
	}


	var isArray = Array.isArray || function isArray(arg) {
	  return toString.call(arg) === '[object Array]';
	};


	function isFunction(arg) {
	  return toString.call(arg) === '[object Function]';
	}


	function isNumber(arg) {
	  return typeof arg === 'number' && arg === arg;
	}


	// Converts the jStat matrix to vector.
	function toVector(arr) {
	  return concat.apply([], arr);
	}


	// The one and only jStat constructor.
	function jStat() {
	  return new jStat._init(arguments);
	}


	// TODO: Remove after all references in src files have been removed.
	jStat.fn = jStat.prototype;


	// By separating the initializer from the constructor it's easier to handle
	// always returning a new instance whether "new" was used or not.
	jStat._init = function _init(args) {
	  var i;

	  // If first argument is an array, must be vector or matrix.
	  if (isArray(args[0])) {
	    // Check if matrix.
	    if (isArray(args[0][0])) {
	      // See if a mapping function was also passed.
	      if (isFunction(args[1]))
	        args[0] = jStat.map(args[0], args[1]);
	      // Iterate over each is faster than this.push.apply(this, args[0].
	      for (i = 0; i < args[0].length; i++)
	        this[i] = args[0][i];
	      this.length = args[0].length;

	    // Otherwise must be a vector.
	    } else {
	      this[0] = isFunction(args[1]) ? jStat.map(args[0], args[1]) : args[0];
	      this.length = 1;
	    }

	  // If first argument is number, assume creation of sequence.
	  } else if (isNumber(args[0])) {
	    this[0] = jStat.seq.apply(null, args);
	    this.length = 1;

	  // Handle case when jStat object is passed to jStat.
	  } else if (args[0] instanceof jStat) {
	    // Duplicate the object and pass it back.
	    return jStat(args[0].toArray());

	  // Unexpected argument value, return empty jStat object.
	  // TODO: This is strange behavior. Shouldn't this throw or some such to let
	  // the user know they had bad arguments?
	  } else {
	    this[0] = [];
	    this.length = 1;
	  }

	  return this;
	};
	jStat._init.prototype = jStat.prototype;
	jStat._init.constructor = jStat;


	// Utility functions.
	// TODO: for internal use only?
	jStat.utils = {
	  calcRdx: calcRdx,
	  isArray: isArray,
	  isFunction: isFunction,
	  isNumber: isNumber,
	  toVector: toVector
	};


	// Easily extend the jStat object.
	// TODO: is this seriously necessary?
	jStat.extend = function extend(obj) {
	  var i, j;

	  if (arguments.length === 1) {
	    for (j in obj)
	      jStat[j] = obj[j];
	    return this;
	  }

	  for (i = 1; i < arguments.length; i++) {
	    for (j in arguments[i])
	      obj[j] = arguments[i][j];
	  }

	  return obj;
	};


	// Returns the number of rows in the matrix.
	jStat.rows = function rows(arr) {
	  return arr.length || 1;
	};


	// Returns the number of columns in the matrix.
	jStat.cols = function cols(arr) {
	  return arr[0].length || 1;
	};


	// Returns the dimensions of the object { rows: i, cols: j }
	jStat.dimensions = function dimensions(arr) {
	  return {
	    rows: jStat.rows(arr),
	    cols: jStat.cols(arr)
	  };
	};


	// Returns a specified row as a vector
	jStat.row = function row(arr, index) {
	  return arr[index];
	};


	// Returns the specified column as a vector
	jStat.col = function cols(arr, index) {
	  var column = new Array(arr.length);
	  for (var i = 0; i < arr.length; i++)
	    column[i] = [arr[i][index]];
	  return column;
	};


	// Returns the diagonal of the matrix
	jStat.diag = function diag(arr) {
	  var nrow = jStat.rows(arr);
	  var res = new Array(nrow);
	  for (var row = 0; row < nrow; row++)
	    res[row] = [arr[row][row]];
	  return res;
	};


	// Returns the anti-diagonal of the matrix
	jStat.antidiag = function antidiag(arr) {
	  var nrow = jStat.rows(arr) - 1;
	  var res = new Array(nrow);
	  for (var i = 0; nrow >= 0; nrow--, i++)
	    res[i] = [arr[i][nrow]];
	  return res;
	};

	// Transpose a matrix or array.
	jStat.transpose = function transpose(arr) {
	  var obj = [];
	  var objArr, rows, cols, j, i;

	  // Make sure arr is in matrix format.
	  if (!isArray(arr[0]))
	    arr = [arr];

	  rows = arr.length;
	  cols = arr[0].length;

	  for (i = 0; i < cols; i++) {
	    objArr = new Array(rows);
	    for (j = 0; j < rows; j++)
	      objArr[j] = arr[j][i];
	    obj.push(objArr);
	  }

	  // If obj is vector, return only single array.
	  return obj.length === 1 ? obj[0] : obj;
	};


	// Map a function to an array or array of arrays.
	// "toAlter" is an internal variable.
	jStat.map = function map(arr, func, toAlter) {
	  var row, nrow, ncol, res, col;

	  if (!isArray(arr[0]))
	    arr = [arr];

	  nrow = arr.length;
	  ncol = arr[0].length;
	  res = toAlter ? arr : new Array(nrow);

	  for (row = 0; row < nrow; row++) {
	    // if the row doesn't exist, create it
	    if (!res[row])
	      res[row] = new Array(ncol);
	    for (col = 0; col < ncol; col++)
	      res[row][col] = func(arr[row][col], row, col);
	  }

	  return res.length === 1 ? res[0] : res;
	};


	// Destructively alter an array.
	jStat.alter = function alter(arr, func) {
	  return jStat.map(arr, func, true);
	};


	// Generate a rows x cols matrix according to the supplied function.
	jStat.create = function  create(rows, cols, func) {
	  var res = new Array(rows);
	  var i, j;

	  if (isFunction(cols)) {
	    func = cols;
	    cols = rows;
	  }

	  for (i = 0; i < rows; i++) {
	    res[i] = new Array(cols);
	    for (j = 0; j < cols; j++)
	      res[i][j] = func(i, j);
	  }

	  return res;
	};


	function retZero() { return 0; }


	// Generate a rows x cols matrix of zeros.
	jStat.zeros = function zeros(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, retZero);
	};


	function retOne() { return 1; }


	// Generate a rows x cols matrix of ones.
	jStat.ones = function ones(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, retOne);
	};


	// Generate a rows x cols matrix of uniformly random numbers.
	jStat.rand = function rand(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, Math.random);
	};


	function retIdent(i, j) { return i === j ? 1 : 0; }


	// Generate an identity matrix of size row x cols.
	jStat.identity = function identity(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, retIdent);
	};


	// Tests whether a matrix is symmetric
	jStat.symmetric = function symmetric(arr) {
	  var issymmetric = true;
	  var size = arr.length;
	  var row, col;

	  if (arr.length !== arr[0].length)
	    return false;

	  for (row = 0; row < size; row++) {
	    for (col = 0; col < size; col++)
	      if (arr[col][row] !== arr[row][col])
	        return false;
	  }

	  return true;
	};


	// Set all values to zero.
	jStat.clear = function clear(arr) {
	  return jStat.alter(arr, retZero);
	};


	// Generate sequence.
	jStat.seq = function seq(min, max, length, func) {
	  if (!isFunction(func))
	    func = false;

	  var arr = [];
	  var hival = calcRdx(min, max);
	  var step = (max * hival - min * hival) / ((length - 1) * hival);
	  var current = min;
	  var cnt;

	  // Current is assigned using a technique to compensate for IEEE error.
	  // TODO: Needs better implementation.
	  for (cnt = 0;
	       current <= max;
	       cnt++, current = (min * hival + step * hival * cnt) / hival) {
	    arr.push((func ? func(current, cnt) : current));
	  }

	  return arr;
	};


	// TODO: Go over this entire implementation. Seems a tragic waste of resources
	// doing all this work. Instead, and while ugly, use new Function() to generate
	// a custom function for each static method.

	// Quick reference.
	var jProto = jStat.prototype;

	// Default length.
	jProto.length = 0;

	// For internal use only.
	// TODO: Check if they're actually used, and if they are then rename them
	// to _*
	jProto.push = Array.prototype.push;
	jProto.sort = Array.prototype.sort;
	jProto.splice = Array.prototype.splice;
	jProto.slice = Array.prototype.slice;


	// Return a clean array.
	jProto.toArray = function toArray() {
	  return this.length > 1 ? slice.call(this) : slice.call(this)[0];
	};


	// Map a function to a matrix or vector.
	jProto.map = function map(func, toAlter) {
	  return jStat(jStat.map(this, func, toAlter));
	};


	// Destructively alter an array.
	jProto.alter = function alter(func) {
	  jStat.alter(this, func);
	  return this;
	};


	// Extend prototype with methods that have no argument.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = function(func) {
	      var self = this,
	      results;
	      // Check for callback.
	      if (func) {
	        setTimeout(function() {
	          func.call(self, jProto[passfunc].call(self));
	        });
	        return this;
	      }
	      results = jStat[passfunc](this);
	      return isArray(results) ? jStat(results) : results;
	    };
	  })(funcs[i]);
	})('transpose clear symmetric rows cols dimensions diag antidiag'.split(' '));


	// Extend prototype with methods that have one argument.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = function(index, func) {
	      var self = this;
	      // check for callback
	      if (func) {
	        setTimeout(function() {
	          func.call(self, jProto[passfunc].call(self, index));
	        });
	        return this;
	      }
	      return jStat(jStat[passfunc](this, index));
	    };
	  })(funcs[i]);
	})('row col'.split(' '));


	// Extend prototype with simple shortcut methods.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = new Function(
	        'return jStat(jStat.' + passfunc + '.apply(null, arguments));');
	  })(funcs[i]);
	})('create zeros ones rand identity'.split(' '));


	// Exposing jStat.
	return jStat;

	}(Math));
	(function(jStat, Math) {

	var isFunction = jStat.utils.isFunction;

	// Ascending functions for sort
	function ascNum(a, b) { return a - b; }

	function clip(arg, min, max) {
	  return Math.max(min, Math.min(arg, max));
	}


	// sum of an array
	jStat.sum = function sum(arr) {
	  var sum = 0;
	  var i = arr.length;
	  var tmp;
	  while (--i >= 0)
	    sum += arr[i];
	  return sum;
	};


	// sum squared
	jStat.sumsqrd = function sumsqrd(arr) {
	  var sum = 0;
	  var i = arr.length;
	  while (--i >= 0)
	    sum += arr[i] * arr[i];
	  return sum;
	};


	// sum of squared errors of prediction (SSE)
	jStat.sumsqerr = function sumsqerr(arr) {
	  var mean = jStat.mean(arr);
	  var sum = 0;
	  var i = arr.length;
	  var tmp;
	  while (--i >= 0) {
	    tmp = arr[i] - mean;
	    sum += tmp * tmp;
	  }
	  return sum;
	};


	// product of an array
	jStat.product = function product(arr) {
	  var prod = 1;
	  var i = arr.length;
	  while (--i >= 0)
	    prod *= arr[i];
	  return prod;
	};


	// minimum value of an array
	jStat.min = function min(arr) {
	  var low = arr[0];
	  var i = 0;
	  while (++i < arr.length)
	    if (arr[i] < low)
	      low = arr[i];
	  return low;
	};


	// maximum value of an array
	jStat.max = function max(arr) {
	  var high = arr[0];
	  var i = 0;
	  while (++i < arr.length)
	    if (arr[i] > high)
	      high = arr[i];
	  return high;
	};


	// mean value of an array
	jStat.mean = function mean(arr) {
	  return jStat.sum(arr) / arr.length;
	};


	// mean squared error (MSE)
	jStat.meansqerr = function meansqerr(arr) {
	  return jStat.sumsqerr(arr) / arr.length;
	};


	// geometric mean of an array
	jStat.geomean = function geomean(arr) {
	  return Math.pow(jStat.product(arr), 1 / arr.length);
	};


	// median of an array
	jStat.median = function median(arr) {
	  var arrlen = arr.length;
	  var _arr = arr.slice().sort(ascNum);
	  // check if array is even or odd, then return the appropriate
	  return !(arrlen & 1)
	    ? (_arr[(arrlen / 2) - 1 ] + _arr[(arrlen / 2)]) / 2
	    : _arr[(arrlen / 2) | 0 ];
	};


	// cumulative sum of an array
	jStat.cumsum = function cumsum(arr) {
	  var len = arr.length;
	  var sums = new Array(len);
	  var i;
	  sums[0] = arr[0];
	  for (i = 1; i < len; i++)
	    sums[i] = sums[i - 1] + arr[i];
	  return sums;
	};


	// successive differences of a sequence
	jStat.diff = function diff(arr) {
	  var diffs = [];
	  var arrLen = arr.length;
	  var i;
	  for (i = 1; i < arrLen; i++)
	    diffs.push(arr[i] - arr[i - 1]);
	  return diffs;
	};


	// mode of an array
	// if there are multiple modes of an array, return all of them
	// is this the appropriate way of handling it?
	jStat.mode = function mode(arr) {
	  var arrLen = arr.length;
	  var _arr = arr.slice().sort(ascNum);
	  var count = 1;
	  var maxCount = 0;
	  var numMaxCount = 0;
	  var mode_arr = [];
	  var i;

	  for (i = 0; i < arrLen; i++) {
	    if (_arr[i] === _arr[i + 1]) {
	      count++;
	    } else {
	      if (count > maxCount) {
	        mode_arr = [_arr[i]];
	        maxCount = count;
	        numMaxCount = 0;
	      }
	      // are there multiple max counts
	      else if (count === maxCount) {
	        mode_arr.push(_arr[i]);
	        numMaxCount++;
	      }
	      // resetting count for new value in array
	      count = 1;
	    }
	  }

	  return numMaxCount === 0 ? mode_arr[0] : mode_arr;
	};


	// range of an array
	jStat.range = function range(arr) {
	  return jStat.max(arr) - jStat.min(arr);
	};

	// variance of an array
	// flag indicates population vs sample
	jStat.variance = function variance(arr, flag) {
	  return jStat.sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
	};


	// standard deviation of an array
	// flag indicates population vs sample
	jStat.stdev = function stdev(arr, flag) {
	  return Math.sqrt(jStat.variance(arr, flag));
	};


	// mean deviation (mean absolute deviation) of an array
	jStat.meandev = function meandev(arr) {
	  var devSum = 0;
	  var mean = jStat.mean(arr);
	  var i;
	  for (i = arr.length - 1; i >= 0; i--)
	    devSum += Math.abs(arr[i] - mean);
	  return devSum / arr.length;
	};


	// median deviation (median absolute deviation) of an array
	jStat.meddev = function meddev(arr) {
	  var devSum = 0;
	  var median = jStat.median(arr);
	  var i;
	  for (i = arr.length - 1; i >= 0; i--)
	    devSum += Math.abs(arr[i] - median);
	  return devSum / arr.length;
	};


	// coefficient of variation
	jStat.coeffvar = function coeffvar(arr) {
	  return jStat.stdev(arr) / jStat.mean(arr);
	};


	// quartiles of an array
	jStat.quartiles = function quartiles(arr) {
	  var arrlen = arr.length;
	  var _arr = arr.slice().sort(ascNum);
	  return [
	    _arr[ Math.round((arrlen) / 4) - 1 ],
	    _arr[ Math.round((arrlen) / 2) - 1 ],
	    _arr[ Math.round((arrlen) * 3 / 4) - 1 ]
	  ];
	};


	// Arbitary quantiles of an array. Direct port of the scipy.stats
	// implementation by Pierre GF Gerard-Marchant.
	jStat.quantiles = function quantiles(arr, quantilesArray, alphap, betap) {
	  var sortedArray = arr.slice().sort(ascNum);
	  var quantileVals = [quantilesArray.length];
	  var n = arr.length;
	  var i, p, m, aleph, k, gamma;

	  if (typeof alphap === 'undefined')
	    alphap = 3 / 8;
	  if (typeof betap === 'undefined')
	    betap = 3 / 8;

	  for (i = 0; i < quantilesArray.length; i++) {
	    p = quantilesArray[i];
	    m = alphap + p * (1 - alphap - betap);
	    aleph = n * p + m;
	    k = Math.floor(clip(aleph, 1, n - 1));
	    gamma = clip(aleph - k, 0, 1);
	    quantileVals[i] = (1 - gamma) * sortedArray[k - 1] + gamma * sortedArray[k];
	  }

	  return quantileVals;
	};

	// The percentile rank of score in a given array. Returns the percentage
	// of all values in the input array that are less than (kind='strict') or
	// less or equal than (kind='weak') score. Default is weak.
	jStat.percentileOfScore = function percentileOfScore(arr, score, kind) {
	  var counter = 0;
	  var len = arr.length;
	  var strict = false;
	  var value, i;

	  if (kind === 'strict')
	    strict = true;

	  for (i = 0; i < len; i++) {
	    value = arr[i];
	    if ((strict && value < score) ||
	        (!strict && value <= score)) {
	      counter++;
	    }
	  }

	  return counter / len;
	};

	// covariance of two arrays
	jStat.covariance = function covariance(arr1, arr2) {
	  var u = jStat.mean(arr1);
	  var v = jStat.mean(arr2);
	  var arr1Len = arr1.length;
	  var sq_dev = new Array(arr1Len);
	  var i;

	  for (i = 0; i < arr1Len; i++)
	    sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);

	  return jStat.sum(sq_dev) / (arr1Len - 1);
	};


	// (pearson's) population correlation coefficient, rho
	jStat.corrcoeff = function corrcoeff(arr1, arr2) {
	  return jStat.covariance(arr1, arr2) /
	      jStat.stdev(arr1, 1) /
	      jStat.stdev(arr2, 1);
	};


	var jProto = jStat.prototype;


	// Extend jProto with method for calculating cumulative sums, as it does not
	// run again in case of true.
	// If a matrix is passed, automatically assume operation should be done on the
	// columns.
	jProto.cumsum = function(fullbool, func) {
	  var arr = [];
	  var i = 0;
	  var tmpthis = this;

	  // Assignment reassignation depending on how parameters were passed in.
	  if (isFunction(fullbool)) {
	    func = fullbool;
	    fullbool = false;
	  }

	  // Check if a callback was passed with the function.
	  if (func) {
	    setTimeout(function() {
	      func.call(tmpthis, jProto.cumsum.call(tmpthis, fullbool));
	    });
	    return this;
	  }

	  // Check if matrix and run calculations.
	  if (this.length > 1) {
	    tmpthis = fullbool === true ? this : this.transpose();
	    for (; i < tmpthis.length; i++)
	      arr[i] = jStat.cumsum(tmpthis[i]);
	    return arr;
	  }

	  return jStat.cumsum(this[0], fullbool);
	};


	// Extend jProto with methods which don't require arguments and work on columns.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    // If a matrix is passed, automatically assume operation should be done on
	    // the columns.
	    jProto[passfunc] = function(fullbool, func) {
	      var arr = [];
	      var i = 0;
	      var tmpthis = this;
	      // Assignment reassignation depending on how parameters were passed in.
	      if (isFunction(fullbool)) {
	        func = fullbool;
	        fullbool = false;
	      }
	      // Check if a callback was passed with the function.
	      if (func) {
	        setTimeout(function() {
	          func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
	        });
	        return this;
	      }
	      // Check if matrix and run calculations.
	      if (this.length > 1) {
	        tmpthis = fullbool === true ? this : this.transpose();
	        for (; i < tmpthis.length; i++)
	          arr[i] = jStat[passfunc](tmpthis[i]);
	        return fullbool === true
	            ? jStat[passfunc](jStat.utils.toVector(arr))
	            : arr;
	      }
	      // Pass fullbool if only vector, not a matrix. for variance and stdev.
	      return jStat[passfunc](this[0], fullbool);
	    };
	  })(funcs[i]);
	})(('sum sumsqrd sumsqerr product min max mean meansqerr geomean median diff ' +
	    'mode range variance stdev meandev meddev coeffvar quartiles').split(' '));


	// Extend jProto with functions that take arguments. Operations on matrices are
	// done on columns.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = function() {
	      var arr = [];
	      var i = 0;
	      var tmpthis = this;
	      var args = Array.prototype.slice.call(arguments);

	      // If the last argument is a function, we assume it's a callback; we
	      // strip the callback out and call the function again.
	      if (isFunction(args[args.length - 1])) {
	        var callbackFunction = args[args.length - 1];
	        var argsToPass = args.slice(0, args.length - 1);

	        setTimeout(function() {
	          callbackFunction.call(tmpthis,
	                                jProto[passfunc].apply(tmpthis, argsToPass));
	        });
	        return this;

	      // Otherwise we curry the function args and call normally.
	      } else {
	        var callbackFunction = undefined;
	        var curriedFunction = function curriedFunction(vector) {
	          return jStat[passfunc].apply(tmpthis, [vector].concat(args));
	        }
	      }

	      // If this is a matrix, run column-by-column.
	      if (this.length > 1) {
	        tmpthis = tmpthis.transpose();
	        for (; i < tmpthis.length; i++)
	          arr[i] = curriedFunction(tmpthis[i]);
	        return arr;
	      }

	      // Otherwise run on the vector.
	      return curriedFunction(this[0]);
	    };
	  })(funcs[i]);
	})('quantiles percentileOfScore'.split(' '));

	}(this.jStat, Math));
	// Special functions //
	(function(jStat, Math) {

	// Log-gamma function
	jStat.gammaln = function gammaln(x) {
	  var j = 0;
	  var cof = [
	    76.18009172947146, -86.50532032941677, 24.01409824083091,
	    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
	  ];
	  var ser = 1.000000000190015;
	  var xx, y, tmp;
	  tmp = (y = xx = x) + 5.5;
	  tmp -= (xx + 0.5) * Math.log(tmp);
	  for (; j < 6; j++)
	    ser += cof[j] / ++y;
	  return Math.log(2.5066282746310005 * ser / xx) - tmp;
	};


	// gamma of x
	jStat.gammafn = function gammafn(x) {
	  var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563,
	           629.3311553128184, 866.9662027904133, -31451.272968848367,
	           -36144.413418691176, 66456.14382024054
	  ];
	  var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192,
	           -3107.771671572311, 22538.118420980151, 4755.8462775278811,
	           -134659.9598649693, -115132.2596755535];
	  var fact = false;
	  var n = 0;
	  var xden = 0;
	  var xnum = 0;
	  var y = x;
	  var i, z, yi, res, sum, ysq;
	  if (y <= 0) {
	    res = y % 1 + 3.6e-16;
	    if (res) {
	      fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
	      y = 1 - y;
	    } else {
	      return Infinity;
	    }
	  }
	  yi = y;
	  if (y < 1) {
	    z = y++;
	  } else {
	    z = (y -= n = (y | 0) - 1) - 1;
	  }
	  for (i = 0; i < 8; ++i) {
	    xnum = (xnum + p[i]) * z;
	    xden = xden * z + q[i];
	  }
	  res = xnum / xden + 1;
	  if (yi < y) {
	    res /= yi;
	  } else if (yi > y) {
	    for (i = 0; i < n; ++i) {
	      res *= y;
	      y++;
	    }
	  }
	  if (fact) {
	    res = fact / res;
	  }
	  return res;
	};


	// lower incomplete gamma function P(a,x)
	jStat.gammap = function gammap(a, x) {
	  var aln = jStat.gammaln(a);
	  var ap = a;
	  var sum = 1 / a;
	  var del = sum;
	  var b = x + 1 - a;
	  var c = 1 / 1.0e-30;
	  var d = 1 / b;
	  var h = d;
	  var i = 1;
	  // calculate maximum number of itterations required for a
	  var ITMAX = -~(Math.log((a >= 1) ? a : 1 / a) * 8.5 + a * 0.4 + 17);
	  var an, endval;

	  if (x < 0 || a <= 0) {
	    return NaN;
	  } else if (x < a + 1) {
	    for (; i <= ITMAX; i++) {
	      sum += del *= x / ++ap;
	    }
	    return sum * Math.exp(-x + a * Math.log(x) - (aln));
	  }

	  for (; i <= ITMAX; i++) {
	    an = -i * (i - a);
	    b += 2;
	    d = an * d + b;
	    c = b + an / c;
	    d = 1 / d;
	    h *= d * c;
	  }

	  return 1 - h * Math.exp(-x + a * Math.log(x) - (aln));
	};


	// natural log factorial of n
	jStat.factorialln = function factorialln(n) {
	  return n < 0 ? NaN : jStat.gammaln(n + 1);
	};

	// factorial of n
	jStat.factorial = function factorial(n) {
	  return n < 0 ? NaN : jStat.gammafn(n + 1);
	};

	// combinations of n, m
	jStat.combination = function combination(n, m) {
	  // make sure n or m don't exceed the upper limit of usable values
	  return (n > 170 || m > 170)
	      ? Math.exp(jStat.combinationln(n, m))
	      : (jStat.factorial(n) / jStat.factorial(m)) / jStat.factorial(n - m);
	};


	jStat.combinationln = function combinationln(n, m){
	  return jStat.factorialln(n) - jStat.factorialln(m) - jStat.factorialln(n - m);
	};


	// permutations of n, m
	jStat.permutation = function permutation(n, m) {
	  return jStat.factorial(n) / jStat.factorial(n - m);
	};


	// beta function
	jStat.betafn = function betafn(x, y) {
	  // ensure arguments are positive
	  if (x <= 0 || y <= 0)
	    return undefined;
	  // make sure x + y doesn't exceed the upper limit of usable values
	  return (x + y > 170)
	      ? Math.exp(jStat.betaln(x, y))
	      : jStat.gammafn(x) * jStat.gammafn(y) / jStat.gammafn(x + y);
	};


	// natural logarithm of beta function
	jStat.betaln = function betaln(x, y) {
	  return jStat.gammaln(x) + jStat.gammaln(y) - jStat.gammaln(x + y);
	};


	// Evaluates the continued fraction for incomplete beta function by modified
	// Lentz's method.
	jStat.betacf = function betacf(x, a, b) {
	  var fpmin = 1e-30;
	  var m = 1;
	  var qab = a + b;
	  var qap = a + 1;
	  var qam = a - 1;
	  var c = 1;
	  var d = 1 - qab * x / qap;
	  var m2, aa, del, h;

	  // These q's will be used in factors that occur in the coefficients
	  if (Math.abs(d) < fpmin)
	    d = fpmin;
	  d = 1 / d;
	  h = d;

	  for (; m <= 100; m++) {
	    m2 = 2 * m;
	    aa = m * (b - m) * x / ((qam + m2) * (a + m2));
	    // One step (the even one) of the recurrence
	    d = 1 + aa * d;
	    if (Math.abs(d) < fpmin)
	      d = fpmin;
	    c = 1 + aa / c;
	    if (Math.abs(c) < fpmin)
	      c = fpmin;
	    d = 1 / d;
	    h *= d * c;
	    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
	    // Next step of the recurrence (the odd one)
	    d = 1 + aa * d;
	    if (Math.abs(d) < fpmin)
	      d = fpmin;
	    c = 1 + aa / c;
	    if (Math.abs(c) < fpmin)
	      c = fpmin;
	    d = 1 / d;
	    del = d * c;
	    h *= del;
	    if (Math.abs(del - 1.0) < 3e-7)
	      break;
	  }

	  return h;
	};


	// Returns the inverse incomplte gamma function
	jStat.gammapinv = function gammapinv(p, a) {
	  var j = 0;
	  var a1 = a - 1;
	  var EPS = 1e-8;
	  var gln = jStat.gammaln(a);
	  var x, err, t, u, pp, lna1, afac;

	  if (p >= 1)
	    return Math.max(100, a + 100 * Math.sqrt(a));
	  if (p <= 0)
	    return 0;
	  if (a > 1) {
	    lna1 = Math.log(a1);
	    afac = Math.exp(a1 * (lna1 - 1) - gln);
	    pp = (p < 0.5) ? p : 1 - p;
	    t = Math.sqrt(-2 * Math.log(pp));
	    x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
	    if (p < 0.5)
	      x = -x;
	    x = Math.max(1e-3,
	                 a * Math.pow(1 - 1 / (9 * a) - x / (3 * Math.sqrt(a)), 3));
	  } else {
	    t = 1 - a * (0.253 + a * 0.12);
	    if (p < t)
	      x = Math.pow(p / t, 1 / a);
	    else
	      x = 1 - Math.log(1 - (p - t) / (1 - t));
	  }

	  for(; j < 12; j++) {
	    if (x <= 0)
	      return 0;
	    err = jStat.gammap(a, x) - p;
	    if (a > 1)
	      t = afac * Math.exp(-(x - a1) + a1 * (Math.log(x) - lna1));
	    else
	      t = Math.exp(-x + a1 * Math.log(x) - gln);
	    u = err / t;
	    x -= (t = u / (1 - 0.5 * Math.min(1, u * ((a - 1) / x - 1))));
	    if (x <= 0)
	      x = 0.5 * (x + t);
	    if (Math.abs(t) < EPS * x)
	      break;
	  }

	  return x;
	};


	// Returns the error function erf(x)
	jStat.erf = function erf(x) {
	  var cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
	             -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
	             4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
	             1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
	             6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
	             -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
	             -6.886027e-12, 8.94487e-13, 3.13092e-13,
	             -1.12708e-13, 3.81e-16, 7.106e-15,
	             -1.523e-15, -9.4e-17, 1.21e-16,
	             -2.8e-17];
	  var j = cof.length - 1;
	  var isneg = false;
	  var d = 0;
	  var dd = 0;
	  var t, ty, tmp, res;

	  if (x < 0) {
	    x = -x;
	    isneg = true;
	  }

	  t = 2 / (2 + x);
	  ty = 4 * t - 2;

	  for(; j > 0; j--) {
	    tmp = d;
	    d = ty * d - dd + cof[j];
	    dd = tmp;
	  }

	  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
	  return isneg ? res - 1 : 1 - res;
	};


	// Returns the complmentary error function erfc(x)
	jStat.erfc = function erfc(x) {
	  return 1 - jStat.erf(x);
	};


	// Returns the inverse of the complementary error function
	jStat.erfcinv = function erfcinv(p) {
	  var j = 0;
	  var x, err, t, pp;
	  if (p >= 2)
	    return -100;
	  if (p <= 0)
	    return 100;
	  pp = (p < 1) ? p : 2 - p;
	  t = Math.sqrt(-2 * Math.log(pp / 2));
	  x = -0.70711 * ((2.30753 + t * 0.27061) /
	                  (1 + t * (0.99229 + t * 0.04481)) - t);
	  for (; j < 2; j++) {
	    err = jStat.erfc(x) - pp;
	    x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
	  }
	  return (p < 1) ? x : -x;
	};


	// Returns the inverse of the incomplete beta function
	jStat.ibetainv = function ibetainv(p, a, b) {
	  var EPS = 1e-8;
	  var a1 = a - 1;
	  var b1 = b - 1;
	  var j = 0;
	  var lna, lnb, pp, t, u, err, x, al, h, w, afac;
	  if (p <= 0)
	    return 0;
	  if (p >= 1)
	    return 1;
	  if (a >= 1 && b >= 1) {
	    pp = (p < 0.5) ? p : 1 - p;
	    t = Math.sqrt(-2 * Math.log(pp));
	    x = (2.30753 + t * 0.27061) / (1 + t* (0.99229 + t * 0.04481)) - t;
	    if (p < 0.5)
	      x = -x;
	    al = (x * x - 3) / 6;
	    h = 2 / (1 / (2 * a - 1)  + 1 / (2 * b - 1));
	    w = (x * Math.sqrt(al + h) / h) - (1 / (2 * b - 1) - 1 / (2 * a - 1)) *
	        (al + 5 / 6 - 2 / (3 * h));
	    x = a / (a + b * Math.exp(2 * w));
	  } else {
	    lna = Math.log(a / (a + b));
	    lnb = Math.log(b / (a + b));
	    t = Math.exp(a * lna) / a;
	    u = Math.exp(b * lnb) / b;
	    w = t + u;
	    if (p < t / w)
	      x = Math.pow(a * w * p, 1 / a);
	    else
	      x = 1 - Math.pow(b * w * (1 - p), 1 / b);
	  }
	  afac = -jStat.gammaln(a) - jStat.gammaln(b) + jStat.gammaln(a + b);
	  for(; j < 10; j++) {
	    if (x === 0 || x === 1)
	      return x;
	    err = jStat.ibeta(x, a, b) - p;
	    t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
	    u = err / t;
	    x -= (t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x)))));
	    if (x <= 0)
	      x = 0.5 * (x + t);
	    if (x >= 1)
	      x = 0.5 * (x + t + 1);
	    if (Math.abs(t) < EPS * x && j > 0)
	      break;
	  }
	  return x;
	};


	// Returns the incomplete beta function I_x(a,b)
	jStat.ibeta = function ibeta(x, a, b) {
	  // Factors in front of the continued fraction.
	  var bt = (x === 0 || x === 1) ?  0 :
	    Math.exp(jStat.gammaln(a + b) - jStat.gammaln(a) -
	             jStat.gammaln(b) + a * Math.log(x) + b *
	             Math.log(1 - x));
	  if (x < 0 || x > 1)
	    return false;
	  if (x < (a + 1) / (a + b + 2))
	    // Use continued fraction directly.
	    return bt * jStat.betacf(x, a, b) / a;
	  // else use continued fraction after making the symmetry transformation.
	  return 1 - bt * jStat.betacf(1 - x, b, a) / b;
	};


	// Returns a normal deviate (mu=0, sigma=1).
	// If n and m are specified it returns a object of normal deviates.
	jStat.randn = function randn(n, m) {
	  var u, v, x, y, q, mat;
	  if (!m)
	    m = n;
	  if (n)
	    return jStat.create(n, m, function() { return jStat.randn(); });
	  do {
	    u = Math.random();
	    v = 1.7156 * (Math.random() - 0.5);
	    x = u - 0.449871;
	    y = Math.abs(v) + 0.386595;
	    q = x * x + y * (0.19600 * y - 0.25472 * x);
	  } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));
	  return v / u;
	};


	// Returns a gamma deviate by the method of Marsaglia and Tsang.
	jStat.randg = function randg(shape, n, m) {
	  var oalph = shape;
	  var a1, a2, u, v, x, mat;
	  if (!m)
	    m = n;
	  if (!shape)
	    shape = 1;
	  if (n) {
	    mat = jStat.zeros(n,m);
	    mat.alter(function() { return jStat.randg(shape); });
	    return mat;
	  }
	  if (shape < 1)
	    shape += 1;
	  a1 = shape - 1 / 3;
	  a2 = 1 / Math.sqrt(9 * a1);
	  do {
	    do {
	      x = jStat.randn();
	      v = 1 + a2 * x;
	    } while(v <= 0);
	    v = v * v * v;
	    u = Math.random();
	  } while(u > 1 - 0.331 * Math.pow(x, 4) &&
	          Math.log(u) > 0.5 * x*x + a1 * (1 - v + Math.log(v)));
	  // alpha > 1
	  if (shape == oalph)
	    return a1 * v;
	  // alpha < 1
	  do {
	    u = Math.random();
	  } while(u === 0);
	  return Math.pow(u, 1 / oalph) * a1 * v;
	};


	// making use of static methods on the instance
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jStat.fn[passfunc] = function() {
	      return jStat(
	          jStat.map(this, function(value) { return jStat[passfunc](value); }));
	    }
	  })(funcs[i]);
	})('gammaln gammafn factorial factorialln'.split(' '));


	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jStat.fn[passfunc] = function() {
	      return jStat(jStat[passfunc].apply(null, arguments));
	    };
	  })(funcs[i]);
	})('randn'.split(' '));

	}(this.jStat, Math));
	(function(jStat, Math) {

	// generate all distribution instance methods
	(function(list) {
	  for (var i = 0; i < list.length; i++) (function(func) {
	    // distribution instance method
	    jStat[func] = function(a, b, c) {
	      if (!(this instanceof arguments.callee))
	        return new arguments.callee(a, b, c);
	      this._a = a;
	      this._b = b;
	      this._c = c;
	      return this;
	    };
	    // distribution method to be used on a jStat instance
	    jStat.fn[func] = function(a, b, c) {
	      var newthis = jStat[func](a, b, c);
	      newthis.data = this;
	      return newthis;
	    };
	    // sample instance method
	    jStat[func].prototype.sample = function(arr) {
	      var a = this._a;
	      var b = this._b;
	      var c = this._c;
	      if (arr)
	        return jStat.alter(arr, function() {
	          return jStat[func].sample(a, b, c);
	        });
	      else
	        return jStat[func].sample(a, b, c);
	    };
	    // generate the pdf, cdf and inv instance methods
	    (function(vals) {
	      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
	        jStat[func].prototype[fnfunc] = function(x) {
	          var a = this._a;
	          var b = this._b;
	          var c = this._c;
	          if (!x && x !== 0)
	            x = this.data;
	          if (typeof x !== 'number') {
	            return jStat.fn.map.call(x, function(x) {
	              return jStat[func][fnfunc](x, a, b, c);
	            });
	          }
	          return jStat[func][fnfunc](x, a, b, c);
	        };
	      })(vals[i]);
	    })('pdf cdf inv'.split(' '));
	    // generate the mean, median, mode and variance instance methods
	    (function(vals) {
	      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
	        jStat[func].prototype[fnfunc] = function() {
	          return jStat[func][fnfunc](this._a, this._b, this._c);
	        };
	      })(vals[i]);
	    })('mean median mode variance'.split(' '));
	  })(list[i]);
	})((
	  'beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy ' +
	  'lognormal normal pareto studentt weibull uniform  binomial negbin hypgeom ' +
	  'poisson triangular'
	).split(' '));



	// extend beta function with static methods
	jStat.extend(jStat.beta, {
	  pdf: function pdf(x, alpha, beta) {
	    // PDF is zero outside the support
	    if (x > 1 || x < 0)
	      return 0;
	    // PDF is one for the uniform case
	    if (alpha == 1 && beta == 1)
	      return 1;

	    if (alpha < 512 || beta < 512) {
	      return (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) /
	          jStat.betafn(alpha, beta);
	    } else {
	      return Math.exp((alpha - 1) * Math.log(x) +
	                      (beta - 1) * Math.log(1 - x) -
	                      jStat.betaln(alpha, beta));
	    }
	  },

	  cdf: function cdf(x, alpha, beta) {
	    return (x > 1 || x < 0) ? (x > 1) * 1 : jStat.ibeta(x, alpha, beta);
	  },

	  inv: function inv(x, alpha, beta) {
	    return jStat.ibetainv(x, alpha, beta);
	  },

	  mean: function mean(alpha, beta) {
	    return alpha / (alpha + beta);
	  },

	  median: function median(alpha, beta) {
	    throw new Error('median not yet implemented');
	  },

	  mode: function mode(alpha, beta) {
	    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
	  },

	  // return a random sample
	  sample: function sample(alpha, beta) {
	    var u = jStat.randg(alpha);
	    return u / (u + jStat.randg(beta));
	  },

	  variance: function variance(alpha, beta) {
	    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
	  }
	});

	// extend F function with static methods
	jStat.extend(jStat.centralF, {
	  pdf: function pdf(x, df1, df2) {
	    if (x < 0)
	      return undefined;
	    return Math.sqrt((Math.pow(df1 * x, df1) * Math.pow(df2, df2)) /
	                     (Math.pow(df1 * x + df2, df1 + df2))) /
	                     (x * jStat.betafn(df1/2, df2/2));

	  },

	  cdf: function cdf(x, df1, df2) {
	    return jStat.ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
	  },

	  inv: function inv(x, df1, df2) {
	    return df2 / (df1 * (1 / jStat.ibetainv(x, df1 / 2, df2 / 2) - 1));
	  },

	  mean: function mean(df1, df2) {
	    return (df2 > 2) ? df2 / (df2 - 2) : undefined;
	  },

	  mode: function mode(df1, df2) {
	    return (df1 > 2) ? (df2 * (df1 - 2)) / (df1 * (df2 + 2)) : undefined;
	  },

	  // return a random sample
	  sample: function sample(df1, df2) {
	    var x1 = jStat.randg(df1 / 2) * 2;
	    var x2 = jStat.randg(df2 / 2) * 2;
	    return (x1 / df1) / (x2 / df2);
	  },

	  variance: function variance(df1, df2) {
	    if (df2 <= 4)
	      return undefined;
	    return 2 * df2 * df2 * (df1 + df2 - 2) /
	        (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
	  }
	});


	// extend cauchy function with static methods
	jStat.extend(jStat.cauchy, {
	  pdf: function pdf(x, local, scale) {
	    return (scale / (Math.pow(x - local, 2) + Math.pow(scale, 2))) / Math.PI;
	  },

	  cdf: function cdf(x, local, scale) {
	    return Math.atan((x - local) / scale) / Math.PI + 0.5;
	  },

	  inv: function(p, local, scale) {
	    return local + scale * Math.tan(Math.PI * (p - 0.5));
	  },

	  median: function median(local, scale) {
	    return local;
	  },

	  mode: function mode(local, scale) {
	    return local;
	  },

	  sample: function sample(local, scale) {
	    return jStat.randn() *
	        Math.sqrt(1 / (2 * jStat.randg(0.5))) * scale + local;
	  }
	});



	// extend chisquare function with static methods
	jStat.extend(jStat.chisquare, {
	  pdf: function pdf(x, dof) {
	    return Math.exp((dof / 2 - 1) * Math.log(x) - x / 2 - (dof / 2) *
	                    Math.log(2) - jStat.gammaln(dof / 2));
	  },

	  cdf: function cdf(x, dof) {
	    return jStat.gammap(dof / 2, x / 2);
	  },

	  inv: function(p, dof) {
	    return 2 * jStat.gammapinv(p, 0.5 * dof);
	  },

	  mean : function(dof) {
	    return dof;
	  },

	  // TODO: this is an approximation (is there a better way?)
	  median: function median(dof) {
	    return dof * Math.pow(1 - (2 / (9 * dof)), 3);
	  },

	  mode: function mode(dof) {
	    return (dof - 2 > 0) ? dof - 2 : 0;
	  },

	  sample: function sample(dof) {
	    return jStat.randg(dof / 2) * 2;
	  },

	  variance: function variance(dof) {
	    return 2 * dof;
	  }
	});



	// extend exponential function with static methods
	jStat.extend(jStat.exponential, {
	  pdf: function pdf(x, rate) {
	    return x < 0 ? 0 : rate * Math.exp(-rate * x);
	  },

	  cdf: function cdf(x, rate) {
	    return x < 0 ? 0 : 1 - Math.exp(-rate * x);
	  },

	  inv: function(p, rate) {
	    return -Math.log(1 - p) / rate;
	  },

	  mean : function(rate) {
	    return 1 / rate;
	  },

	  median: function (rate) {
	    return (1 / rate) * Math.log(2);
	  },

	  mode: function mode(rate) {
	    return 0;
	  },

	  sample: function sample(rate) {
	    return -1 / rate * Math.log(Math.random());
	  },

	  variance : function(rate) {
	    return Math.pow(rate, -2);
	  }
	});



	// extend gamma function with static methods
	jStat.extend(jStat.gamma, {
	  pdf: function pdf(x, shape, scale) {
	    return Math.exp((shape - 1) * Math.log(x) - x / scale -
	                    jStat.gammaln(shape) - shape * Math.log(scale));
	  },

	  cdf: function cdf(x, shape, scale) {
	    return jStat.gammap(shape, x / scale);
	  },

	  inv: function(p, shape, scale) {
	    return jStat.gammapinv(p, shape) * scale;
	  },

	  mean : function(shape, scale) {
	    return shape * scale;
	  },

	  mode: function mode(shape, scale) {
	    if(shape > 1) return (shape - 1) * scale;
	    return undefined;
	  },

	  sample: function sample(shape, scale) {
	    return jStat.randg(shape) * scale;
	  },

	  variance: function variance(shape, scale) {
	    return shape * scale * scale;
	  }
	});

	// extend inverse gamma function with static methods
	jStat.extend(jStat.invgamma, {
	  pdf: function pdf(x, shape, scale) {
	    return Math.exp(-(shape + 1) * Math.log(x) - scale / x -
	                    jStat.gammaln(shape) + shape * Math.log(scale));
	  },

	  cdf: function cdf(x, shape, scale) {
	    return 1 - jStat.gammap(shape, scale / x);
	  },

	  inv: function(p, shape, scale) {
	    return scale / jStat.gammapinv(1 - p, shape);
	  },

	  mean : function(shape, scale) {
	    return (shape > 1) ? scale / (shape - 1) : undefined;
	  },

	  mode: function mode(shape, scale) {
	    return scale / (shape + 1);
	  },

	  sample: function sample(shape, scale) {
	    return scale / jStat.randg(shape);
	  },

	  variance: function variance(shape, scale) {
	    if (shape <= 2)
	      return undefined;
	    return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
	  }
	});


	// extend kumaraswamy function with static methods
	jStat.extend(jStat.kumaraswamy, {
	  pdf: function pdf(x, alpha, beta) {
	    return Math.exp(Math.log(alpha) + Math.log(beta) + (alpha - 1) *
	                    Math.log(x) + (beta - 1) *
	                    Math.log(1 - Math.pow(x, alpha)));
	  },

	  cdf: function cdf(x, alpha, beta) {
	    return (1 - Math.pow(1 - Math.pow(x, alpha), beta));
	  },

	  mean : function(alpha, beta) {
	    return (beta * jStat.gammafn(1 + 1 / alpha) *
	            jStat.gammafn(beta)) / (jStat.gammafn(1 + 1 / alpha + beta));
	  },

	  median: function median(alpha, beta) {
	    return Math.pow(1 - Math.pow(2, -1 / beta), 1 / alpha);
	  },

	  mode: function mode(alpha, beta) {
	    if (!(alpha >= 1 && beta >= 1 && (alpha !== 1 && beta !== 1)))
	      return undefined;
	    return Math.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha);
	  },

	  variance: function variance(alpha, beta) {
	    throw new Error('variance not yet implemented');
	    // TODO: complete this
	  }
	});



	// extend lognormal function with static methods
	jStat.extend(jStat.lognormal, {
	  pdf: function pdf(x, mu, sigma) {
	    return Math.exp(-Math.log(x) - 0.5 * Math.log(2 * Math.PI) -
	                    Math.log(sigma) - Math.pow(Math.log(x) - mu, 2) /
	                    (2 * sigma * sigma));
	  },

	  cdf: function cdf(x, mu, sigma) {
	    return 0.5 +
	        (0.5 * jStat.erf((Math.log(x) - mu) / Math.sqrt(2 * sigma * sigma)));
	  },

	  inv: function(p, mu, sigma) {
	    return Math.exp(-1.41421356237309505 * sigma * jStat.erfcinv(2 * p) + mu);
	  },

	  mean: function mean(mu, sigma) {
	    return Math.exp(mu + sigma * sigma / 2);
	  },

	  median: function median(mu, sigma) {
	    return Math.exp(mu);
	  },

	  mode: function mode(mu, sigma) {
	    return Math.exp(mu - sigma * sigma);
	  },

	  sample: function sample(mu, sigma) {
	    return Math.exp(jStat.randn() * sigma + mu);
	  },

	  variance: function variance(mu, sigma) {
	    return (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
	  }
	});



	// extend normal function with static methods
	jStat.extend(jStat.normal, {
	  pdf: function pdf(x, mean, std) {
	    return Math.exp(-0.5 * Math.log(2 * Math.PI) -
	                    Math.log(std) - Math.pow(x - mean, 2) / (2 * std * std));
	  },

	  cdf: function cdf(x, mean, std) {
	    return 0.5 * (1 + jStat.erf((x - mean) / Math.sqrt(2 * std * std)));
	  },

	  inv: function(p, mean, std) {
	    return -1.41421356237309505 * std * jStat.erfcinv(2 * p) + mean;
	  },

	  mean : function(mean, std) {
	    return mean;
	  },

	  median: function median(mean, std) {
	    return mean;
	  },

	  mode: function (mean, std) {
	    return mean;
	  },

	  sample: function sample(mean, std) {
	    return jStat.randn() * std + mean;
	  },

	  variance : function(mean, std) {
	    return std * std;
	  }
	});



	// extend pareto function with static methods
	jStat.extend(jStat.pareto, {
	  pdf: function pdf(x, scale, shape) {
	    if (x <= scale)
	      return undefined;
	    return (shape * Math.pow(scale, shape)) / Math.pow(x, shape + 1);
	  },

	  cdf: function cdf(x, scale, shape) {
	    return 1 - Math.pow(scale / x, shape);
	  },

	  mean: function mean(scale, shape) {
	    if (shape <= 1)
	      return undefined;
	    return (shape * Math.pow(scale, shape)) / (shape - 1);
	  },

	  median: function median(scale, shape) {
	    return scale * (shape * Math.SQRT2);
	  },

	  mode: function mode(scale, shape) {
	    return scale;
	  },

	  variance : function(scale, shape) {
	    if (shape <= 2)
	      return undefined;
	    return (scale*scale * shape) / (Math.pow(shape - 1, 2) * (shape - 2));
	  }
	});



	// extend studentt function with static methods
	jStat.extend(jStat.studentt, {
	  pdf: function pdf(x, dof) {
	    return (jStat.gammafn((dof + 1) / 2) / (Math.sqrt(dof * Math.PI) *
	        jStat.gammafn(dof / 2))) *
	        Math.pow(1 + ((x * x) / dof), -((dof + 1) / 2));
	  },

	  cdf: function cdf(x, dof) {
	    var dof2 = dof / 2;
	    return jStat.ibeta((x + Math.sqrt(x * x + dof)) /
	                       (2 * Math.sqrt(x * x + dof)), dof2, dof2);
	  },

	  inv: function(p, dof) {
	    var x = jStat.ibetainv(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
	    x = Math.sqrt(dof * (1 - x) / x);
	    return (p > 0.5) ? x : -x;
	  },

	  mean: function mean(dof) {
	    return (dof > 1) ? 0 : undefined;
	  },

	  median: function median(dof) {
	    return 0;
	  },

	  mode: function mode(dof) {
	    return 0;
	  },

	  sample: function sample(dof) {
	    return jStat.randn() * Math.sqrt(dof / (2 * jStat.randg(dof / 2)));
	  },

	  variance: function variance(dof) {
	    return (dof  > 2) ? dof / (dof - 2) : (dof > 1) ? Infinity : undefined;
	  }
	});



	// extend weibull function with static methods
	jStat.extend(jStat.weibull, {
	  pdf: function pdf(x, scale, shape) {
	    if (x < 0)
	      return 0;
	    return (shape / scale) * Math.pow((x / scale), (shape - 1)) *
	        Math.exp(-(Math.pow((x / scale), shape)));
	  },

	  cdf: function cdf(x, scale, shape) {
	    return x < 0 ? 0 : 1 - Math.exp(-Math.pow((x / scale), shape));
	  },

	  inv: function(p, scale, shape) {
	    return scale * Math.pow(-Math.log(1 - p), 1 / shape);
	  },

	  mean : function(scale, shape) {
	    return scale * jStat.gammafn(1 + 1 / shape);
	  },

	  median: function median(scale, shape) {
	    return scale * Math.pow(Math.log(2), 1 / shape);
	  },

	  mode: function mode(scale, shape) {
	    if (shape <= 1)
	      return undefined;
	    return scale * Math.pow((shape - 1) / shape, 1 / shape);
	  },

	  sample: function sample(scale, shape) {
	    return scale * Math.pow(-Math.log(Math.random()), 1 / shape);
	  },

	  variance: function variance(scale, shape) {
	    return scale * scale * jStat.gammafn(1 + 2 / shape) -
	        Math.pow(this.mean(scale, shape), 2);
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.uniform, {
	  pdf: function pdf(x, a, b) {
	    return (x < a || x > b) ? 0 : 1 / (b - a);
	  },

	  cdf: function cdf(x, a, b) {
	    if (x < a)
	      return 0;
	    else if (x < b)
	      return (x - a) / (b - a);
	    return 1;
	  },

	  mean: function mean(a, b) {
	    return 0.5 * (a + b);
	  },

	  median: function median(a, b) {
	    return jStat.mean(a, b);
	  },

	  mode: function mode(a, b) {
	    throw new Error('mode is not yet implemented');
	  },

	  sample: function sample(a, b) {
	    return (a / 2 + b / 2) + (b / 2 - a / 2) * (2 * Math.random() - 1);
	  },

	  variance: function variance(a, b) {
	    return Math.pow(b - a, 2) / 12;
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.binomial, {
	  pdf: function pdf(k, n, p) {
	    return (p === 0 || p === 1) ?
	      ((n * p) === k ? 1 : 0) :
	      jStat.combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
	  },

	  cdf: function cdf(x, n, p) {
	    var binomarr = [],
	    k = 0;
	    if (x < 0) {
	      return 0;
	    }
	    if (x < n) {
	      for (; k <= x; k++) {
	        binomarr[ k ] = jStat.binomial.pdf(k, n, p);
	      }
	      return jStat.sum(binomarr);
	    }
	    return 1;
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.negbin, {
	  pdf: function pdf(k, r, p) {
	    return k !== k | 0
	      ? false
	      : k < 0
	        ? 0
	        : jStat.combination(k + r - 1, r - 1) * Math.pow(1 - p, k) * Math.pow(p, r);
	  },

	  cdf: function cdf(x, r, p) {
	    var sum = 0,
	    k = 0;
	    if (x < 0) return 0;
	    for (; k <= x; k++) {
	      sum += jStat.negbin.pdf(k, r, p);
	    }
	    return sum;
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.hypgeom, {
	  pdf: function pdf(k, N, m, n) {
	    // Hypergeometric PDF.

	    // A simplification of the CDF algorithm below.

	    // k = number of successes drawn
	    // N = population size
	    // m = number of successes in population
	    // n = number of items drawn from population

	    if(k !== k | 0) {
	      return false;
	    } else if(k < 0 || k < m - (N - n)) {
	      // It's impossible to have this few successes drawn.
	      return 0;
	    } else if(k > n || k > m) {
	      // It's impossible to have this many successes drawn.
	      return 0;
	    } else if (m * 2 > N) {
	      // More than half the population is successes.

	      if(n * 2 > N) {
	        // More than half the population is sampled.

	        return jStat.hypgeom.pdf(N - m - n + k, N, N - m, N - n)
	      } else {
	        // Half or less of the population is sampled.

	        return jStat.hypgeom.pdf(n - k, N, N - m, n);
	      }

	    } else if(n * 2 > N) {
	      // Half or less is successes.

	      return jStat.hypgeom.pdf(m - k, N, m, N - n);

	    } else if(m < n) {
	      // We want to have the number of things sampled to be less than the
	      // successes available. So swap the definitions of successful and sampled.
	      return jStat.hypgeom.pdf(k, N, n, m);
	    } else {
	      // If we get here, half or less of the population was sampled, half or
	      // less of it was successes, and we had fewer sampled things than
	      // successes. Now we can do this complicated iterative algorithm in an
	      // efficient way.

	      // The basic premise of the algorithm is that we partially normalize our
	      // intermediate product to keep it in a numerically good region, and then
	      // finish the normalization at the end.

	      // This variable holds the scaled probability of the current number of
	      // successes.
	      var scaledPDF = 1;

	      // This keeps track of how much we have normalized.
	      var samplesDone = 0;

	      for(var i = 0; i < k; i++) {
	        // For every possible number of successes up to that observed...

	        while(scaledPDF > 1 && samplesDone < n) {
	          // Intermediate result is growing too big. Apply some of the
	          // normalization to shrink everything.

	          scaledPDF *= 1 - (m / (N - samplesDone));

	          // Say we've normalized by this sample already.
	          samplesDone++;
	        }

	        // Work out the partially-normalized hypergeometric PDF for the next
	        // number of successes
	        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));
	      }

	      for(; samplesDone < n; samplesDone++) {
	        // Apply all the rest of the normalization
	        scaledPDF *= 1 - (m / (N - samplesDone));
	      }

	      // Bound answer sanely before returning.
	      return Math.min(1, Math.max(0, scaledPDF));
	    }
	  },

	  cdf: function cdf(x, N, m, n) {
	    // Hypergeometric CDF.

	    // This algorithm is due to Prof. Thomas S. Ferguson, <tom@math.ucla.edu>,
	    // and comes from his hypergeometric test calculator at
	    // <http://www.math.ucla.edu/~tom/distributions/Hypergeometric.html>.

	    // x = number of successes drawn
	    // N = population size
	    // m = number of successes in population
	    // n = number of items drawn from population

	    if(x < 0 || x < m - (N - n)) {
	      // It's impossible to have this few successes drawn or fewer.
	      return 0;
	    } else if(x >= n || x >= m) {
	      // We will always have this many successes or fewer.
	      return 1;
	    } else if (m * 2 > N) {
	      // More than half the population is successes.

	      if(n * 2 > N) {
	        // More than half the population is sampled.

	        return jStat.hypgeom.cdf(N - m - n + x, N, N - m, N - n)
	      } else {
	        // Half or less of the population is sampled.

	        return 1 - jStat.hypgeom.cdf(n - x - 1, N, N - m, n);
	      }

	    } else if(n * 2 > N) {
	      // Half or less is successes.

	      return 1 - jStat.hypgeom.cdf(m - x - 1, N, m, N - n);

	    } else if(m < n) {
	      // We want to have the number of things sampled to be less than the
	      // successes available. So swap the definitions of successful and sampled.
	      return jStat.hypgeom.cdf(x, N, n, m);
	    } else {
	      // If we get here, half or less of the population was sampled, half or
	      // less of it was successes, and we had fewer sampled things than
	      // successes. Now we can do this complicated iterative algorithm in an
	      // efficient way.

	      // The basic premise of the algorithm is that we partially normalize our
	      // intermediate sum to keep it in a numerically good region, and then
	      // finish the normalization at the end.

	      // Holds the intermediate, scaled total CDF.
	      var scaledCDF = 1;

	      // This variable holds the scaled probability of the current number of
	      // successes.
	      var scaledPDF = 1;

	      // This keeps track of how much we have normalized.
	      var samplesDone = 0;

	      for(var i = 0; i < x; i++) {
	        // For every possible number of successes up to that observed...

	        while(scaledCDF > 1 && samplesDone < n) {
	          // Intermediate result is growing too big. Apply some of the
	          // normalization to shrink everything.

	          var factor = 1 - (m / (N - samplesDone));

	          scaledPDF *= factor;
	          scaledCDF *= factor;

	          // Say we've normalized by this sample already.
	          samplesDone++;
	        }

	        // Work out the partially-normalized hypergeometric PDF for the next
	        // number of successes
	        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));

	        // Add to the CDF answer.
	        scaledCDF += scaledPDF;
	      }

	      for(; samplesDone < n; samplesDone++) {
	        // Apply all the rest of the normalization
	        scaledCDF *= 1 - (m / (N - samplesDone));
	      }

	      // Bound answer sanely before returning.
	      return Math.min(1, Math.max(0, scaledCDF));
	    }
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.poisson, {
	  pdf: function pdf(k, l) {
	    return Math.pow(l, k) * Math.exp(-l) / jStat.factorial(k);
	  },

	  cdf: function cdf(x, l) {
	    var sumarr = [],
	    k = 0;
	    if (x < 0) return 0;
	    for (; k <= x; k++) {
	      sumarr.push(jStat.poisson.pdf(k, l));
	    }
	    return jStat.sum(sumarr);
	  },

	  mean : function(l) {
	    return l;
	  },

	  variance : function(l) {
	    return l;
	  },

	  sample: function sample(l) {
	    var p = 1, k = 0, L = Math.exp(-l);
	    do {
	      k++;
	      p *= Math.random();
	    } while (p > L);
	    return k - 1;
	  }
	});

	// extend triangular function with static methods
	jStat.extend(jStat.triangular, {
	  pdf: function pdf(x, a, b, c) {
	    return (b <= a || c < a || c > b)
	      ? undefined
	      : (x < a || x > b)
	        ? 0
	        : (x <= c)
	          ? (2 * (x - a)) / ((b - a) * (c - a))
	          : (2 * (b - x)) / ((b - a) * (b - c));
	  },

	  cdf: function cdf(x, a, b, c) {
	    if (b <= a || c < a || c > b)
	      return undefined;
	    if (x < a) {
	      return 0;
	    } else {
	      if (x <= c)
	        return Math.pow(x - a, 2) / ((b - a) * (c - a));
	      return 1 - Math.pow(b - x, 2) / ((b - a) * (b - c));
	    }
	    // never reach this
	    return 1;
	  },

	  mean: function mean(a, b, c) {
	    return (a + b + c) / 3;
	  },

	  median: function median(a, b, c) {
	    if (c <= (a + b) / 2) {
	      return b - Math.sqrt((b - a) * (b - c)) / Math.sqrt(2);
	    } else if (c > (a + b) / 2) {
	      return a + Math.sqrt((b - a) * (c - a)) / Math.sqrt(2);
	    }
	  },

	  mode: function mode(a, b, c) {
	    return c;
	  },

	  sample: function sample(a, b, c) {
	    var u = Math.random();
	    if (u < ((c - a) / (b - a)))
	      return a + Math.sqrt(u * (b - a) * (c - a))
	    return b - Math.sqrt((1 - u) * (b - a) * (b - c));
	  },

	  variance: function variance(a, b, c) {
	    return (a * a + b * b + c * c - a * b - a * c - b * c) / 18;
	  }
	});

	}(this.jStat, Math));
	/* Provides functions for the solution of linear system of equations, integration, extrapolation,
	 * interpolation, eigenvalue problems, differential equations and PCA analysis. */

	(function(jStat, Math) {

	var push = Array.prototype.push;
	var isArray = jStat.utils.isArray;

	jStat.extend({

	  // add a vector/matrix to a vector/matrix or scalar
	  add: function add(arr, arg) {
	    // check if arg is a vector or scalar
	    if (isArray(arg)) {
	      if (!isArray(arg[0])) arg = [ arg ];
	      return jStat.map(arr, function(value, row, col) {
	        return value + arg[row][col];
	      });
	    }
	    return jStat.map(arr, function(value) { return value + arg; });
	  },

	  // subtract a vector or scalar from the vector
	  subtract: function subtract(arr, arg) {
	    // check if arg is a vector or scalar
	    if (isArray(arg)) {
	      if (!isArray(arg[0])) arg = [ arg ];
	      return jStat.map(arr, function(value, row, col) {
	        return value - arg[row][col] || 0;
	      });
	    }
	    return jStat.map(arr, function(value) { return value - arg; });
	  },

	  // matrix division
	  divide: function divide(arr, arg) {
	    if (isArray(arg)) {
	      if (!isArray(arg[0])) arg = [ arg ];
	      return jStat.multiply(arr, jStat.inv(arg));
	    }
	    return jStat.map(arr, function(value) { return value / arg; });
	  },

	  // matrix multiplication
	  multiply: function multiply(arr, arg) {
	    var row, col, nrescols, sum,
	    nrow = arr.length,
	    ncol = arr[0].length,
	    res = jStat.zeros(nrow, nrescols = (isArray(arg)) ? arg[0].length : ncol),
	    rescols = 0;
	    if (isArray(arg)) {
	      for (; rescols < nrescols; rescols++) {
	        for (row = 0; row < nrow; row++) {
	          sum = 0;
	          for (col = 0; col < ncol; col++)
	          sum += arr[row][col] * arg[col][rescols];
	          res[row][rescols] = sum;
	        }
	      }
	      return (nrow === 1 && rescols === 1) ? res[0][0] : res;
	    }
	    return jStat.map(arr, function(value) { return value * arg; });
	  },

	  // Returns the dot product of two matricies
	  dot: function dot(arr, arg) {
	    if (!isArray(arr[0])) arr = [ arr ];
	    if (!isArray(arg[0])) arg = [ arg ];
	    // convert column to row vector
	    var left = (arr[0].length === 1 && arr.length !== 1) ? jStat.transpose(arr) : arr,
	    right = (arg[0].length === 1 && arg.length !== 1) ? jStat.transpose(arg) : arg,
	    res = [],
	    row = 0,
	    nrow = left.length,
	    ncol = left[0].length,
	    sum, col;
	    for (; row < nrow; row++) {
	      res[row] = [];
	      sum = 0;
	      for (col = 0; col < ncol; col++)
	      sum += left[row][col] * right[row][col];
	      res[row] = sum;
	    }
	    return (res.length === 1) ? res[0] : res;
	  },

	  // raise every element by a scalar
	  pow: function pow(arr, arg) {
	    return jStat.map(arr, function(value) { return Math.pow(value, arg); });
	  },

	  // generate the absolute values of the vector
	  abs: function abs(arr) {
	    return jStat.map(arr, function(value) { return Math.abs(value); });
	  },

	  // computes the p-norm of the vector
	  // In the case that a matrix is passed, uses the first row as the vector
	  norm: function norm(arr, p) {
	    var nnorm = 0,
	    i = 0;
	    // check the p-value of the norm, and set for most common case
	    if (isNaN(p)) p = 2;
	    // check if multi-dimensional array, and make vector correction
	    if (isArray(arr[0])) arr = arr[0];
	    // vector norm
	    for (; i < arr.length; i++) {
	      nnorm += Math.pow(Math.abs(arr[i]), p);
	    }
	    return Math.pow(nnorm, 1 / p);
	  },

	  // TODO: make compatible with matrices
	  // computes the angle between two vectors in rads
	  angle: function angle(arr, arg) {
	    return Math.acos(jStat.dot(arr, arg) / (jStat.norm(arr) * jStat.norm(arg)));
	  },

	  // augment one matrix by another
	  aug: function aug(a, b) {
	    var newarr = a.slice(),
	    i = 0;
	    for (; i < newarr.length; i++) {
	      push.apply(newarr[i], b[i]);
	    }
	    return newarr;
	  },

	  inv: function inv(a) {
	    var rows = a.length,
	    cols = a[0].length,
	    b = jStat.identity(rows, cols),
	    c = jStat.gauss_jordan(a, b),
	    obj = [],
	    i = 0,
	    j;
	    for (; i < rows; i++) {
	      obj[i] = [];
	      for (j = cols - 1; j < c[0].length; j++)
	      obj[i][j - cols] = c[i][j];
	    }
	    return obj;
	  },

	  // calculate the determinant of a matrix
	  det: function det(a) {
	    var alen = a.length,
	    alend = alen * 2,
	    vals = new Array(alend),
	    rowshift = alen - 1,
	    colshift = alend - 1,
	    mrow = rowshift - alen + 1,
	    mcol = colshift,
	    i = 0,
	    result = 0,
	    j;
	    // check for special 2x2 case
	    if (alen === 2) {
	      return a[0][0] * a[1][1] - a[0][1] * a[1][0];
	    }
	    for (; i < alend; i++) {
	      vals[i] = 1;
	    }
	    for (i = 0; i < alen; i++) {
	      for (j = 0; j < alen; j++) {
	        vals[(mrow < 0) ? mrow + alen : mrow ] *= a[i][j];
	        vals[(mcol < alen) ? mcol + alen : mcol ] *= a[i][j];
	        mrow++;
	        mcol--;
	      }
	      mrow = --rowshift - alen + 1;
	      mcol = --colshift;
	    }
	    for (i = 0; i < alen; i++) {
	      result += vals[i];
	    }
	    for (; i < alend; i++) {
	      result -= vals[i];
	    }
	    return result;
	  },

	  gauss_elimination: function gauss_elimination(a, b) {
	    var i = 0,
	    j = 0,
	    n = a.length,
	    m = a[0].length,
	    factor = 1,
	    sum = 0,
	    x = [],
	    maug, pivot, temp, k;
	    a = jStat.aug(a, b);
	    maug = a[0].length;
	    for(; i < n; i++) {
	      pivot = a[i][i];
	      j = i;
	      for (k = i + 1; k < m; k++) {
	        if (pivot < Math.abs(a[k][i])) {
	          pivot = a[k][i];
	          j = k;
	        }
	      }
	      if (j != i) {
	        for(k = 0; k < maug; k++) {
	          temp = a[i][k];
	          a[i][k] = a[j][k];
	          a[j][k] = temp;
	        }
	      }
	      for (j = i + 1; j < n; j++) {
	        factor = a[j][i] / a[i][i];
	        for(k = i; k < maug; k++) {
	          a[j][k] = a[j][k] - factor * a[i][k];
	        }
	      }
	    }
	    for (i = n - 1; i >= 0; i--) {
	      sum = 0;
	      for (j = i + 1; j<= n - 1; j++) {
	        sum = x[j] * a[i][j];
	      }
	      x[i] =(a[i][maug - 1] - sum) / a[i][i];
	    }
	    return x;
	  },

	  gauss_jordan: function gauss_jordan(a, b) {
	    var m = jStat.aug(a, b),
	    h = m.length,
	    w = m[0].length;
	    // find max pivot
	    for (var y = 0; y < h; y++) {
	      var maxrow = y;
	      for (var y2 = y+1; y2 < h; y2++) {
	        if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
	          maxrow = y2;
	      }
	      var tmp = m[y];
	      m[y] = m[maxrow];
	      m[maxrow] = tmp
	      for (var y2 = y+1; y2 < h; y2++) {
	        c = m[y2][y] / m[y][y];
	        for (var x = y; x < w; x++) {
	          m[y2][x] -= m[y][x] * c;
	        }
	      }
	    }
	    // backsubstitute
	    for (var y = h-1; y >= 0; y--) {
	      c = m[y][y];
	      for (var y2 = 0; y2 < y; y2++) {
	        for (var x = w-1; x > y-1; x--) {
	          m[y2][x] -= m[y][x] * m[y2][y] / c;
	        }
	      }
	      m[y][y] /= c;
	      for (var x = h; x < w; x++) {
	        m[y][x] /= c;
	      }
	    }
	    return m;
	  },

	  lu: function lu(a, b) {
	    throw new Error('lu not yet implemented');
	  },

	  cholesky: function cholesky(a, b) {
	    throw new Error('cholesky not yet implemented');
	  },

	  gauss_jacobi: function gauss_jacobi(a, b, x, r) {
	    var i = 0;
	    var j = 0;
	    var n = a.length;
	    var l = [];
	    var u = [];
	    var d = [];
	    var xv, c, h, xk;
	    for (; i < n; i++) {
	      l[i] = [];
	      u[i] = [];
	      d[i] = [];
	      for (j = 0; j < n; j++) {
	        if (i > j) {
	          l[i][j] = a[i][j];
	          u[i][j] = d[i][j] = 0;
	        } else if (i < j) {
	          u[i][j] = a[i][j];
	          l[i][j] = d[i][j] = 0;
	        } else {
	          d[i][j] = a[i][j];
	          l[i][j] = u[i][j] = 0;
	        }
	      }
	    }
	    h = jStat.multiply(jStat.multiply(jStat.inv(d), jStat.add(l, u)), -1);
	    c = jStat.multiply(jStat.inv(d), b);
	    xv = x;
	    xk = jStat.add(jStat.multiply(h, x), c);
	    i = 2;
	    while (Math.abs(jStat.norm(jStat.subtract(xk,xv))) > r) {
	      xv = xk;
	      xk = jStat.add(jStat.multiply(h, xv), c);
	      i++;
	    }
	    return xk;
	  },

	  gauss_seidel: function gauss_seidel(a, b, x, r) {
	    var i = 0;
	    var n = a.length;
	    var l = [];
	    var u = [];
	    var d = [];
	    var j, xv, c, h, xk;
	    for (; i < n; i++) {
	      l[i] = [];
	      u[i] = [];
	      d[i] = [];
	      for (j = 0; j < n; j++) {
	        if (i > j) {
	          l[i][j] = a[i][j];
	          u[i][j] = d[i][j] = 0;
	        } else if (i < j) {
	          u[i][j] = a[i][j];
	          l[i][j] = d[i][j] = 0;
	        } else {
	          d[i][j] = a[i][j];
	          l[i][j] = u[i][j] = 0;
	        }
	      }
	    }
	    h = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d, l)), u), -1);
	    c = jStat.multiply(jStat.inv(jStat.add(d, l)), b);
	    xv = x;
	    xk = jStat.add(jStat.multiply(h, x), c);
	    i = 2;
	    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
	      xv = xk;
	      xk = jStat.add(jStat.multiply(h, xv), c);
	      i = i + 1;
	    }
	    return xk;
	  },

	  SOR: function SOR(a, b, x, r, w) {
	    var i = 0;
	    var n = a.length;
	    var l = [];
	    var u = [];
	    var d = [];
	    var j, xv, c, h, xk;
	    for (; i < n; i++) {
	      l[i] = [];
	      u[i] = [];
	      d[i] = [];
	      for (j = 0; j < n; j++) {
	        if (i > j) {
	          l[i][j] = a[i][j];
	          u[i][j] = d[i][j] = 0;
	        } else if (i < j) {
	          u[i][j] = a[i][j];
	          l[i][j] = d[i][j] = 0;
	        } else {
	          d[i][j] = a[i][j];
	          l[i][j] = u[i][j] = 0;
	        }
	      }
	    }
	    h = jStat.multiply(jStat.inv(jStat.add(d, jStat.multiply(l, w))),
	                       jStat.subtract(jStat.multiply(d, 1 - w),
	                                      jStat.multiply(u, w)));
	    c = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d,
	        jStat.multiply(l, w))), b), w);
	    xv = x;
	    xk = jStat.add(jStat.multiply(h, x), c);
	    i = 2;
	    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
	      xv = xk;
	      xk = jStat.add(jStat.multiply(h, xv), c);
	      i++;
	    }
	    return xk;
	  },

	  householder: function householder(a) {
	    var m = a.length;
	    var n = a[0].length;
	    var i = 0;
	    var w = [];
	    var p = [];
	    var alpha, r, k, j, factor;
	    for (; i < m - 1; i++) {
	      alpha = 0;
	      for (j = i + 1; j < n; j++)
	      alpha += (a[j][i] * a[j][i]);
	      factor = (a[i + 1][i] > 0) ? -1 : 1;
	      alpha = factor * Math.sqrt(alpha);
	      r = Math.sqrt((((alpha * alpha) - a[i + 1][i] * alpha) / 2));
	      w = jStat.zeros(m, 1);
	      w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);
	      for (k = i + 2; k < m; k++) w[k][0] = a[k][i] / (2 * r);
	      p = jStat.subtract(jStat.identity(m, n),
	          jStat.multiply(jStat.multiply(w, jStat.transpose(w)), 2));
	      a = jStat.multiply(p, jStat.multiply(a, p));
	    }
	    return a;
	  },

	  // TODO: not working properly.
	  QR: function QR(a, b) {
	    var m = a.length;
	    var n = a[0].length;
	    var i = 0;
	    var w = [];
	    var p = [];
	    var x = [];
	    var j, alpha, r, k, factor, sum;
	    for (; i < m - 1; i++) {
	      alpha = 0;
	      for (j = i + 1; j < n; j++)
	        alpha += (a[j][i] * a[j][i]);
	      factor = (a[i + 1][i] > 0) ? -1 : 1;
	      alpha = factor * Math.sqrt(alpha);
	      r = Math.sqrt((((alpha * alpha) - a[i + 1][i] * alpha) / 2));
	      w = jStat.zeros(m, 1);
	      w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);
	      for (k = i + 2; k < m; k++)
	        w[k][0] = a[k][i] / (2 * r);
	      p = jStat.subtract(jStat.identity(m, n),
	          jStat.multiply(jStat.multiply(w, jStat.transpose(w)), 2));
	      a = jStat.multiply(p, a);
	      b = jStat.multiply(p, b);
	    }
	    for (i = m - 1; i >= 0; i--) {
	      sum = 0;
	      for (j = i + 1; j <= n - 1; j++)
	      sum = x[j] * a[i][j];
	      x[i] = b[i][0] / a[i][i];
	    }
	    return x;
	  },

	  jacobi: function jacobi(a) {
	    var condition = 1;
	    var count = 0;
	    var n = a.length;
	    var e = jStat.identity(n, n);
	    var ev = [];
	    var b, i, j, p, q, maxim, theta, s;
	    // condition === 1 only if tolerance is not reached
	    while (condition === 1) {
	      count++;
	      maxim = a[0][1];
	      p = 0;
	      q = 1;
	      for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	          if (i != j) {
	            if (maxim < Math.abs(a[i][j])) {
	              maxim = Math.abs(a[i][j]);
	              p = i;
	              q = j;
	            }
	          }
	        }
	      }
	      if (a[p][p] === a[q][q])
	        theta = (a[p][q] > 0) ? Math.PI / 4 : -Math.PI / 4;
	      else
	        theta = Math.atan(2 * a[p][q] / (a[p][p] - a[q][q])) / 2;
	      s = jStat.identity(n, n);
	      s[p][p] = Math.cos(theta);
	      s[p][q] = -Math.sin(theta);
	      s[q][p] = Math.sin(theta);
	      s[q][q] = Math.cos(theta);
	      // eigen vector matrix
	      e = jStat.multiply(e, s);
	      b = jStat.multiply(jStat.multiply(jStat.inv(s), a), s);
	      a = b;
	      condition = 0;
	      for (i = 1; i < n; i++) {
	        for (j = 1; j < n; j++) {
	          if (i != j && Math.abs(a[i][j]) > 0.001) {
	            condition = 1;
	          }
	        }
	      }
	    }
	    for (i = 0; i < n; i++) ev.push(a[i][i]);
	    //returns both the eigenvalue and eigenmatrix
	    return [e, ev];
	  },

	  rungekutta: function rungekutta(f, h, p, t_j, u_j, order) {
	    var k1, k2, u_j1, k3, k4;
	    if (order === 2) {
	      while (t_j <= p) {
	        k1 = h * f(t_j, u_j);
	        k2 = h * f(t_j + h, u_j + k1);
	        u_j1 = u_j + (k1 + k2) / 2;
	        u_j = u_j1;
	        t_j = t_j + h;
	      }
	    }
	    if (order === 4) {
	      while (t_j <= p) {
	        k1 = h * f(t_j, u_j);
	        k2 = h * f(t_j + h / 2, u_j + k1 / 2);
	        k3 = h * f(t_j + h / 2, u_j + k2 / 2);
	        k4 = h * f(t_j +h, u_j + k3);
	        u_j1 = u_j + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
	        u_j = u_j1;
	        t_j = t_j + h;
	      }
	    }
	    return u_j;
	  },

	  romberg: function romberg(f, a, b, order) {
	    var i = 0;
	    var h = (b - a) / 2;
	    var x = [];
	    var h1 = [];
	    var g = [];
	    var m, a1, j, k, I, d;
	    while (i < order / 2) {
	      I = f(a);
	      for (j = a, k = 0; j <= b; j = j + h, k++) x[k] = j;
	      m = x.length;
	      for (j = 1; j < m - 1; j++) {
	        I += (((j % 2) !== 0) ? 4 : 2) * f(x[j]);
	      }
	      I = (h / 3) * (I + f(b));
	      g[i] = I;
	      h /= 2;
	      i++;
	    }
	    a1 = g.length;
	    m = 1;
	    while (a1 !== 1) {
	      for (j = 0; j < a1 - 1; j++)
	      h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
	      a1 = h1.length;
	      g = h1;
	      h1 = [];
	      m++;
	    }
	    return g;
	  },

	  richardson: function richardson(X, f, x, h) {
	    function pos(X, x) {
	      var i = 0;
	      var n = X.length;
	      var p;
	      for (; i < n; i++)
	        if (X[i] === x) p = i;
	      return p;
	    }
	    var n = X.length,
	    h_min = Math.abs(x - X[pos(X, x) + 1]),
	    i = 0,
	    g = [],
	    h1 = [],
	    y1, y2, m, a, j;
	    while (h >= h_min) {
	      y1 = pos(X, x + h);
	      y2 = pos(X, x);
	      g[i] = (f[y1] - 2 * f[y2] + f[2 * y2 - y1]) / (h * h);
	      h /= 2;
	      i++;
	    }
	    a = g.length;
	    m = 1;
	    while (a != 1) {
	      for (j = 0; j < a - 1; j++)
	      h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
	      a = h1.length;
	      g = h1;
	      h1 = [];
	      m++;
	    }
	    return g;
	  },

	  simpson: function simpson(f, a, b, n) {
	    var h = (b - a) / n;
	    var I = f(a);
	    var x = [];
	    var j = a;
	    var k = 0;
	    var i = 1;
	    var m;
	    for (; j <= b; j = j + h, k++)
	      x[k] = j;
	    m = x.length;
	    for (; i < m - 1; i++) {
	      I += ((i % 2 !== 0) ? 4 : 2) * f(x[i]);
	    }
	    return (h / 3) * (I + f(b));
	  },

	  hermite: function hermite(X, F, dF, value) {
	    var n = X.length;
	    var p = 0;
	    var i = 0;
	    var l = [];
	    var dl = [];
	    var A = [];
	    var B = [];
	    var j;
	    for (; i < n; i++) {
	      l[i] = 1;
	      for (j = 0; j < n; j++) {
	        if (i != j) l[i] *= (value - X[j]) / (X[i] - X[j]);
	      }
	      dl[i] = 0;
	      for (j = 0; j < n; j++) {
	        if (i != j) dl[i] += 1 / (X [i] - X[j]);
	      }
	      A[i] = (1 - 2 * (value - X[i]) * dl[i]) * (l[i] * l[i]);
	      B[i] = (value - X[i]) * (l[i] * l[i]);
	      p += (A[i] * F[i] + B[i] * dF[i]);
	    }
	    return p;
	  },

	  lagrange: function lagrange(X, F, value) {
	    var p = 0;
	    var i = 0;
	    var j, l;
	    var n = X.length;
	    for (; i < n; i++) {
	      l = F[i];
	      for (j = 0; j < n; j++) {
	        // calculating the lagrange polynomial L_i
	        if (i != j) l *= (value - X[j]) / (X[i] - X[j]);
	      }
	      // adding the lagrange polynomials found above
	      p += l;
	    }
	    return p;
	  },

	  cubic_spline: function cubic_spline(X, F, value) {
	    var n = X.length;
	    var i = 0, j;
	    var A = [];
	    var B = [];
	    var alpha = [];
	    var c = [];
	    var h = [];
	    var b = [];
	    var d = [];
	    for (; i < n - 1; i++)
	      h[i] = X[i + 1] - X[i];
	    alpha[0] = 0;
	    for (i = 1; i < n - 1; i++) {
	      alpha[i] = (3 / h[i]) * (F[i + 1] - F[i]) -
	          (3 / h[i-1]) * (F[i] - F[i-1]);
	    }
	    for (i = 1; i < n - 1; i++) {
	      A[i] = [];
	      B[i] = [];
	      A[i][i-1] = h[i-1];
	      A[i][i] = 2 * (h[i - 1] + h[i]);
	      A[i][i+1] = h[i];
	      B[i][0] = alpha[i];
	    }
	    c = jStat.multiply(jStat.inv(A), B);
	    for (j = 0; j < n - 1; j++) {
	      b[j] = (F[j + 1] - F[j]) / h[j] - h[j] * (c[j + 1][0] + 2 * c[j][0]) / 3;
	      d[j] = (c[j + 1][0] - c[j][0]) / (3 * h[j]);
	    }
	    for (j = 0; j < n; j++) {
	      if (X[j] > value) break;
	    }
	    j -= 1;
	    return F[j] + (value - X[j]) * b[j] + jStat.sq(value-X[j]) *
	        c[j] + (value - X[j]) * jStat.sq(value - X[j]) * d[j];
	  },

	  gauss_quadrature: function gauss_quadrature() {
	    throw new Error('gauss_quadrature not yet implemented');
	  },

	  PCA: function PCA(X) {
	    var m = X.length;
	    var n = X[0].length;
	    var flag = false;
	    var i = 0;
	    var j, temp1;
	    var u = [];
	    var D = [];
	    var result = [];
	    var temp2 = [];
	    var Y = [];
	    var Bt = [];
	    var B = [];
	    var C = [];
	    var V = [];
	    var Vt = [];
	    for (i = 0; i < m; i++) {
	      u[i] = jStat.sum(X[i]) / n;
	    }
	    for (i = 0; i < n; i++) {
	      B[i] = [];
	      for(j = 0; j < m; j++) {
	        B[i][j] = X[j][i] - u[j];
	      }
	    }
	    B = jStat.transpose(B);
	    for (i = 0; i < m; i++) {
	      C[i] = [];
	      for (j = 0; j < m; j++) {
	        C[i][j] = (jStat.dot([B[i]], [B[j]])) / (n - 1);
	      }
	    }
	    result = jStat.jacobi(C);
	    V = result[0];
	    D = result[1];
	    Vt = jStat.transpose(V);
	    for (i = 0; i < D.length; i++) {
	      for (j = i; j < D.length; j++) {
	        if(D[i] < D[j])  {
	          temp1 = D[i];
	          D[i] = D[j];
	          D[j] = temp1;
	          temp2 = Vt[i];
	          Vt[i] = Vt[j];
	          Vt[j] = temp2;
	        }
	      }
	    }
	    Bt = jStat.transpose(B);
	    for (i = 0; i < m; i++) {
	      Y[i] = [];
	      for (j = 0; j < Bt.length; j++) {
	        Y[i][j] = jStat.dot([Vt[i]], [Bt[j]]);
	      }
	    }
	    return [X, D, Vt, Y];
	  }
	});

	// extend jStat.fn with methods that require one argument
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jStat.fn[passfunc] = function(arg, func) {
	      var tmpthis = this;
	      // check for callback
	      if (func) {
	        setTimeout(function() {
	          func.call(tmpthis, jStat.fn[passfunc].call(tmpthis, arg));
	        }, 15);
	        return this;
	      }
	      if (typeof jStat[passfunc](this, arg) === 'number')
	        return jStat[passfunc](this, arg);
	      else
	        return jStat(jStat[passfunc](this, arg));
	    };
	  }(funcs[i]));
	}('add divide multiply subtract dot pow abs norm angle'.split(' ')));

	}(this.jStat, Math));
	(function(jStat, Math) {

	var slice = [].slice;
	var isNumber = jStat.utils.isNumber;

	// flag==true denotes use of sample standard deviation
	// Z Statistics
	jStat.extend({
	  // 2 different parameter lists:
	  // (value, mean, sd)
	  // (value, array, flag)
	  zscore: function zscore() {
	    var args = slice.call(arguments);
	    if (isNumber(args[1])) {
	      return (args[0] - args[1]) / args[2];
	    }
	    return (args[0] - jStat.mean(args[1])) / jStat.stdev(args[1], args[2]);
	  },

	  // 3 different paramter lists:
	  // (value, mean, sd, sides)
	  // (zscore, sides)
	  // (value, array, sides, flag)
	  ztest: function ztest() {
	    var args = slice.call(arguments);
	    if (args.length === 4) {
	      if(isNumber(args[1])) {
	        var z = jStat.zscore(args[0],args[1],args[2])
	        return (args[3] === 1) ?
	          (jStat.normal.cdf(-Math.abs(z),0,1)) :
	          (jStat.normal.cdf(-Math.abs(z),0,1)* 2);
	      }
	      var z = args[0]
	      return (args[2] === 1) ?
	        (jStat.normal.cdf(-Math.abs(z),0,1)) :
	        (jStat.normal.cdf(-Math.abs(z),0,1)*2);
	    }
	    var z = jStat.zscore(args[0],args[1],args[3])
	    return (args[1] === 1) ?
	      (jStat.normal.cdf(-Math.abs(z), 0, 1)) :
	      (jStat.normal.cdf(-Math.abs(z), 0, 1)*2);
	  }
	});

	jStat.extend(jStat.fn, {
	  zscore: function zscore(value, flag) {
	    return (value - this.mean()) / this.stdev(flag);
	  },

	  ztest: function ztest(value, sides, flag) {
	    var zscore = Math.abs(this.zscore(value, flag));
	    return (sides === 1) ?
	      (jStat.normal.cdf(-zscore, 0, 1)) :
	      (jStat.normal.cdf(-zscore, 0, 1) * 2);
	  }
	});

	// T Statistics
	jStat.extend({
	  // 2 parameter lists
	  // (value, mean, sd, n)
	  // (value, array)
	  tscore: function tscore() {
	    var args = slice.call(arguments);
	    return (args.length === 4) ?
	      ((args[0] - args[1]) / (args[2] / Math.sqrt(args[3]))) :
	      ((args[0] - jStat.mean(args[1])) /
	       (jStat.stdev(args[1], true) / Math.sqrt(args[1].length)));
	  },

	  // 3 different paramter lists:
	  // (value, mean, sd, n, sides)
	  // (tscore, n, sides)
	  // (value, array, sides)
	  ttest: function ttest() {
	    var args = slice.call(arguments);
	    var tscore;
	    if (args.length === 5) {
	      tscore = Math.abs(jStat.tscore(args[0], args[1], args[2], args[3]));
	      return (args[4] === 1) ?
	        (jStat.studentt.cdf(-tscore, args[3]-1)) :
	        (jStat.studentt.cdf(-tscore, args[3]-1)*2);
	    }
	    if (isNumber(args[1])) {
	      tscore = Math.abs(args[0])
	      return (args[2] == 1) ?
	        (jStat.studentt.cdf(-tscore, args[1]-1)) :
	        (jStat.studentt.cdf(-tscore, args[1]-1) * 2);
	    }
	    tscore = Math.abs(jStat.tscore(args[0], args[1]))
	    return (args[2] == 1) ?
	      (jStat.studentt.cdf(-tscore, args[1].length-1)) :
	      (jStat.studentt.cdf(-tscore, args[1].length-1) * 2);
	  }
	});

	jStat.extend(jStat.fn, {
	  tscore: function tscore(value) {
	    return (value - this.mean()) / (this.stdev(true) / Math.sqrt(this.cols()));
	  },

	  ttest: function ttest(value, sides) {
	    return (sides === 1) ?
	      (1 - jStat.studentt.cdf(Math.abs(this.tscore(value)), this.cols()-1)) :
	      (jStat.studentt.cdf(-Math.abs(this.tscore(value)), this.cols()-1)*2);
	  }
	});

	// F Statistics
	jStat.extend({
	  // Paramter list is as follows:
	  // (array1, array2, array3, ...)
	  // or it is an array of arrays
	  // array of arrays conversion
	  anovafscore: function anovafscore() {
	    var args = slice.call(arguments),
	    expVar, sample, sampMean, sampSampMean, tmpargs, unexpVar, i, j;
	    if (args.length === 1) {
	      tmpargs = new Array(args[0].length);
	      for (i = 0; i < args[0].length; i++) {
	        tmpargs[i] = args[0][i];
	      }
	      args = tmpargs;
	    }
	    // 2 sample case
	    if (args.length === 2) {
	      return jStat.variance(args[0]) / jStat.variance(args[1]);
	    }
	    // Builds sample array
	    sample = new Array();
	    for (i = 0; i < args.length; i++) {
	      sample = sample.concat(args[i]);
	    }
	    sampMean = jStat.mean(sample);
	    // Computes the explained variance
	    expVar = 0;
	    for (i = 0; i < args.length; i++) {
	      expVar = expVar + args[i].length * Math.pow(jStat.mean(args[i]) - sampMean, 2);
	    }
	    expVar /= (args.length - 1);
	    // Computes unexplained variance
	    unexpVar = 0;
	    for (i = 0; i < args.length; i++) {
	      sampSampMean = jStat.mean(args[i]);
	      for (j = 0; j < args[i].length; j++) {
	        unexpVar += Math.pow(args[i][j] - sampSampMean, 2);
	      }
	    }
	    unexpVar /= (sample.length - args.length);
	    return expVar / unexpVar;
	  },

	  // 2 different paramter setups
	  // (array1, array2, array3, ...)
	  // (anovafscore, df1, df2)
	  anovaftest: function anovaftest() {
	    var args = slice.call(arguments),
	    df1, df2, n, i;
	    if (isNumber(args[0])) {
	      return 1 - jStat.centralF.cdf(args[0], args[1], args[2]);
	    }
	    anovafscore = jStat.anovafscore(args);
	    df1 = args.length - 1;
	    n = 0;
	    for (i = 0; i < args.length; i++) {
	      n = n + args[i].length;
	    }
	    df2 = n - df1 - 1;
	    return 1 - jStat.centralF.cdf(anovafscore, df1, df2);
	  },

	  ftest: function ftest(fscore, df1, df2) {
	    return 1 - jStat.centralF.cdf(fscore, df1, df2);
	  }
	});

	jStat.extend(jStat.fn, {
	  anovafscore: function anovafscore() {
	    return jStat.anovafscore(this.toArray());
	  },

	  anovaftes: function anovaftes() {
	    var n = 0;
	    var i;
	    for (i = 0; i < this.length; i++) {
	      n = n + this[i].length;
	    }
	    return jStat.ftest(this.anovafscore(), this.length - 1, n - this.length);
	  }
	});

	// Error Bounds
	jStat.extend({
	  // 2 different parameter setups
	  // (value, alpha, sd, n)
	  // (value, alpha, array)
	  normalci: function normalci() {
	    var args = slice.call(arguments),
	    ans = new Array(2),
	    change;
	    if (args.length === 4) {
	      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
	                        args[2] / Math.sqrt(args[3]));
	    } else {
	      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
	                        jStat.stdev(args[2]) / Math.sqrt(args[2].length));
	    }
	    ans[0] = args[0] - change;
	    ans[1] = args[0] + change;
	    return ans;
	  },

	  // 2 different parameter setups
	  // (value, alpha, sd, n)
	  // (value, alpha, array)
	  tci: function tci() {
	    var args = slice.call(arguments),
	    ans = new Array(2),
	    change;
	    if (args.length === 4) {
	      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[3] - 1) *
	                        args[2] / Math.sqrt(args[3]));
	    } else {
	      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[2].length - 1) *
	                        jStat.stdev(args[2], true) / Math.sqrt(args[2].length));
	    }
	    ans[0] = args[0] - change;
	    ans[1] = args[0] + change;
	    return ans;
	  },

	  significant: function significant(pvalue, alpha) {
	    return pvalue < alpha;
	  }
	});

	jStat.extend(jStat.fn, {
	  normalci: function normalci(value, alpha) {
	    return jStat.normalci(value, alpha, this.toArray());
	  },

	  tci: function tci(value, alpha) {
	    return jStat.tci(value, alpha, this.toArray());
	  }
	});

	}(this.jStat, Math));


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var jStat = __webpack_require__(13).jStat;
	var text = __webpack_require__(11);
	var utils = __webpack_require__(4);
	var bessel = __webpack_require__(16);
	var _ = __webpack_require__(6);

	function isValidBinaryNumber(number) {
	  return (/^[01]{1,10}$/).test(number);
	}

	exports.BESSELI = function(x, n) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return x;
	  }
	  n = utils.parseNumber(n);
	  if (n instanceof Error) {
	    return n;
	  }
	  if (n < 0) {
	    return error.num;
	  }
	  return bessel.besseli(x, n);
	};

	exports.BESSELJ = function(x, n) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return x;
	  }
	  n = utils.parseNumber(n);
	  if (n instanceof Error) {
	    return n;
	  }
	  if (n < 0) {
	    return error.num;
	  }
	  return bessel.besselj(x, n);
	};

	exports.BESSELK = function(x, n) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return x;
	  }
	  n = utils.parseNumber(n);
	  if (n instanceof Error) {
	    return n;
	  }
	  if (n < 0) {
	    return error.num;
	  }
	  return bessel.besselk(x, n);
	};

	exports.BESSELY = function(x, n) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return x;
	  }
	  n = utils.parseNumber(n);
	  if (n instanceof Error) {
	    return n;
	  }
	  if (n < 0) {
	    return error.num;
	  }
	  return bessel.bessely(x, n);
	};

	exports.BIN2DEC = function(number) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }

	  // Convert binary number to decimal
	  var result = parseInt(number, 2);

	  // Handle negative numbers
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return parseInt(stringified.substring(1), 2) - 512;
	  } else {
	    return result;
	  }
	};


	exports.BIN2HEX = function(number, places) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character hexadecimal number if number is negative
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return (1099511627264 + parseInt(stringified.substring(1), 2)).toString(16);
	  }

	  // Convert binary number to hexadecimal
	  var result = parseInt(number, 2).toString(16);

	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.BIN2OCT = function(number, places) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character octal number if number is negative
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8);
	  }

	  // Convert binary number to octal
	  var result = parseInt(number, 2).toString(8);

	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.BITAND = function(number1, number2) {
	  // Return error if either number is a non-numeric value
	  number1 = utils.parseNumber(number1);
	  if (number1 instanceof Error) {
	    return number1;
	  }
	  number2 = utils.parseNumber(number2);
	  if (number2 instanceof Error) {
	    return number2;
	  }

	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }

	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }

	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }

	  // Return bitwise AND of two numbers
	  return number1 & number2;
	};

	exports.BITLSHIFT = function(number, shift) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  shift = utils.parseNumber(shift);
	  if (shift instanceof Error) {
	    return shift;
	  }

	  // Return error if number is less than 0
	  if (number < 0) {
	    return error.num;
	  }

	  // Return error if number is a non-integer
	  if (Math.floor(number) !== number) {
	    return error.num;
	  }

	  // Return error if number is greater than (2^48)-1
	  if (number > 281474976710655) {
	    return error.num;
	  }

	  // Return error if the absolute value of shift is greater than 53
	  if (Math.abs(shift) > 53) {
	    return error.num;
	  }

	  // Return number shifted by shift bits to the left or to the right if shift is negative
	  return (shift >= 0) ? number << shift : number >> -shift;
	};

	exports.BITOR = function(number1, number2) {
	  number1 = utils.parseNumber(number1);
	  if (number1 instanceof Error) {
	    return number1;
	  }
	  number2 = utils.parseNumber(number2);
	  if (number2 instanceof Error) {
	    return number2;
	  }

	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }

	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }

	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }

	  // Return bitwise OR of two numbers
	  return number1 | number2;
	};

	exports.BITRSHIFT = function(number, shift) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  shift = utils.parseNumber(shift);
	  if (shift instanceof Error) {
	    return shift;
	  }

	  // Return error if number is less than 0
	  if (number < 0) {
	    return error.num;
	  }

	  // Return error if number is a non-integer
	  if (Math.floor(number) !== number) {
	    return error.num;
	  }

	  // Return error if number is greater than (2^48)-1
	  if (number > 281474976710655) {
	    return error.num;
	  }

	  // Return error if the absolute value of shift is greater than 53
	  if (Math.abs(shift) > 53) {
	    return error.num;
	  }

	  // Return number shifted by shift bits to the right or to the left if shift is negative
	  return (shift >= 0) ? number >> shift : number << -shift;
	};

	exports.BITXOR = function(number1, number2) {
	  number1 = utils.parseNumber(number1);
	  if (number1 instanceof Error) {
	    return number1;
	  }
	  number2 = utils.parseNumber(number2);
	  if (number2 instanceof Error) {
	    return number2;
	  }

	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }

	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }

	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }

	  // Return bitwise XOR of two numbers
	  return number1 ^ number2;
	};

	exports.COMPLEX = function(real, imaginary, suffix) {
	  real = utils.parseNumber(real);
	  if (real instanceof Error) {
	    return real;
	  }
	  imaginary = utils.parseNumber(imaginary);
	  if (imaginary instanceof Error) {
	    return imaginary;
	  }

	  // Set suffix
	  suffix = (suffix === undefined) ? 'i' : suffix;

	  // Return error if suffix is neither "i" nor "j"
	  if (suffix !== 'i' && suffix !== 'j') {
	    return error.value;
	  }

	  // Return complex number
	  if (real === 0 && imaginary === 0) {
	    return 0;
	  } else if (real === 0) {
	    return (imaginary === 1) ? suffix : imaginary.toString() + suffix;
	  } else if (imaginary === 0) {
	    return real.toString();
	  } else {
	    var sign = (imaginary > 0) ? '+' : '';
	    return real.toString() + sign + ((imaginary === 1) ? suffix : imaginary.toString() + suffix);
	  }
	};

	exports.CONVERT = function(number, from_unit, to_unit) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // List of units supported by CONVERT and units defined by the International System of Units
	  // [Name, Symbol, Alternate symbols, Quantity, ISU, CONVERT, Conversion ratio]
	  var units = [
	    ["a.u. of action", "auh", null, "action", false, false, 1.05457168181818e-34],
	    ["a.u. of charge", "e", null, "electric_charge", false, false, 1.60217653141414e-19],
	    ["a.u. of energy", "Eh", null, "energy", false, false, 4.35974417757576e-18],
	    ["a.u. of length", "a0", null, "length", false, false, 5.29177210818182e-11],
	    ["a.u. of mass", "me", null, "mass", false, false, 9.10938261616162e-31],
	    ["a.u. of time", "auh/Eh", null, "time", false, false, 2.41888432650516e-17],
	    ["admiralty knot", "admkn", null, "speed", false, true, 0.514773333],
	    ["ampere", "A", null, "electric_current", true, false, 1],
	    ["ampere per meter", "A/m", null, "magnetic_field_intensity", true, false, 1],
	    ["ångström", "Å", ["ang"], "length", false, true, 1e-10],
	    ["are", "ar", null, "area", false, true, 100],
	    ["astronomical unit", "ua", null, "length", false, false, 1.49597870691667e-11],
	    ["bar", "bar", null, "pressure", false, false, 100000],
	    ["barn", "b", null, "area", false, false, 1e-28],
	    ["becquerel", "Bq", null, "radioactivity", true, false, 1],
	    ["bit", "bit", ["b"], "information", false, true, 1],
	    ["btu", "BTU", ["btu"], "energy", false, true, 1055.05585262],
	    ["byte", "byte", null, "information", false, true, 8],
	    ["candela", "cd", null, "luminous_intensity", true, false, 1],
	    ["candela per square metre", "cd/m2", null, "luminance", true, false, 1],
	    ["coulomb", "C", null, "electric_charge", true, false, 1],
	    ["cubic ångström", "ang3", ["ang^3"], "volume", false, true, 1e-30],
	    ["cubic foot", "ft3", ["ft^3"], "volume", false, true, 0.028316846592],
	    ["cubic inch", "in3", ["in^3"], "volume", false, true, 0.000016387064],
	    ["cubic light-year", "ly3", ["ly^3"], "volume", false, true, 8.46786664623715e-47],
	    ["cubic metre", "m3", null, "volume", true, true, 1],
	    ["cubic mile", "mi3", ["mi^3"], "volume", false, true, 4168181825.44058],
	    ["cubic nautical mile", "Nmi3", ["Nmi^3"], "volume", false, true, 6352182208],
	    ["cubic Pica", "Pica3", ["Picapt3", "Pica^3", "Picapt^3"], "volume", false, true, 7.58660370370369e-8],
	    ["cubic yard", "yd3", ["yd^3"], "volume", false, true, 0.764554857984],
	    ["cup", "cup", null, "volume", false, true, 0.0002365882365],
	    ["dalton", "Da", ["u"], "mass", false, false, 1.66053886282828e-27],
	    ["day", "d", ["day"], "time", false, true, 86400],
	    ["degree", "°", null, "angle", false, false, 0.0174532925199433],
	    ["degrees Rankine", "Rank", null, "temperature", false, true, 0.555555555555556],
	    ["dyne", "dyn", ["dy"], "force", false, true, 0.00001],
	    ["electronvolt", "eV", ["ev"], "energy", false, true, 1.60217656514141],
	    ["ell", "ell", null, "length", false, true, 1.143],
	    ["erg", "erg", ["e"], "energy", false, true, 1e-7],
	    ["farad", "F", null, "electric_capacitance", true, false, 1],
	    ["fluid ounce", "oz", null, "volume", false, true, 0.0000295735295625],
	    ["foot", "ft", null, "length", false, true, 0.3048],
	    ["foot-pound", "flb", null, "energy", false, true, 1.3558179483314],
	    ["gal", "Gal", null, "acceleration", false, false, 0.01],
	    ["gallon", "gal", null, "volume", false, true, 0.003785411784],
	    ["gauss", "G", ["ga"], "magnetic_flux_density", false, true, 1],
	    ["grain", "grain", null, "mass", false, true, 0.0000647989],
	    ["gram", "g", null, "mass", false, true, 0.001],
	    ["gray", "Gy", null, "absorbed_dose", true, false, 1],
	    ["gross registered ton", "GRT", ["regton"], "volume", false, true, 2.8316846592],
	    ["hectare", "ha", null, "area", false, true, 10000],
	    ["henry", "H", null, "inductance", true, false, 1],
	    ["hertz", "Hz", null, "frequency", true, false, 1],
	    ["horsepower", "HP", ["h"], "power", false, true, 745.69987158227],
	    ["horsepower-hour", "HPh", ["hh", "hph"], "energy", false, true, 2684519.538],
	    ["hour", "h", ["hr"], "time", false, true, 3600],
	    ["imperial gallon (U.K.)", "uk_gal", null, "volume", false, true, 0.00454609],
	    ["imperial hundredweight", "lcwt", ["uk_cwt", "hweight"], "mass", false, true, 50.802345],
	    ["imperial quart (U.K)", "uk_qt", null, "volume", false, true, 0.0011365225],
	    ["imperial ton", "brton", ["uk_ton", "LTON"], "mass", false, true, 1016.046909],
	    ["inch", "in", null, "length", false, true, 0.0254],
	    ["international acre", "uk_acre", null, "area", false, true, 4046.8564224],
	    ["IT calorie", "cal", null, "energy", false, true, 4.1868],
	    ["joule", "J", null, "energy", true, true, 1],
	    ["katal", "kat", null, "catalytic_activity", true, false, 1],
	    ["kelvin", "K", ["kel"], "temperature", true, true, 1],
	    ["kilogram", "kg", null, "mass", true, true, 1],
	    ["knot", "kn", null, "speed", false, true, 0.514444444444444],
	    ["light-year", "ly", null, "length", false, true, 9460730472580800],
	    ["litre", "L", ["l", "lt"], "volume", false, true, 0.001],
	    ["lumen", "lm", null, "luminous_flux", true, false, 1],
	    ["lux", "lx", null, "illuminance", true, false, 1],
	    ["maxwell", "Mx", null, "magnetic_flux", false, false, 1e-18],
	    ["measurement ton", "MTON", null, "volume", false, true, 1.13267386368],
	    ["meter per hour", "m/h", ["m/hr"], "speed", false, true, 0.00027777777777778],
	    ["meter per second", "m/s", ["m/sec"], "speed", true, true, 1],
	    ["meter per second squared", "m/s2", null, "acceleration", true, false, 1],
	    ["parsec", "pc", ["parsec"], "length", false, true, 30856775814671900],
	    ["meter squared per second", "m2/s", null, "kinematic_viscosity", true, false, 1],
	    ["metre", "m", null, "length", true, true, 1],
	    ["miles per hour", "mph", null, "speed", false, true, 0.44704],
	    ["millimetre of mercury", "mmHg", null, "pressure", false, false, 133.322],
	    ["minute", "arcmin", null, "angle", false, false, 0.000290888208665722],
	    ["minute", "min", ["mn"], "time", false, true, 60],
	    ["modern teaspoon", "tspm", null, "volume", false, true, 0.000005],
	    ["mole", "mol", null, "amount_of_substance", true, false, 1],
	    ["morgen", "Morgen", null, "area", false, true, 2500],
	    ["n.u. of action", "nuh", null, "action", false, false, 1.05457168181818e-34],
	    ["n.u. of mass", "nume", null, "mass", false, false, 9.10938261616162e-31],
	    ["n.u. of speed", "nuc0", null, "speed", false, false, 299792458],
	    ["n.u. of time", "nuh/(mec02)", null, "time", false, false, 1.28808866778687e-21],
	    ["nautical mile", "M", ["Nmi"], "length", false, true, 1852],
	    ["newton", "N", null, "force", true, true, 1],
	    ["œrsted", "Oe ", null, "magnetic_field_intensity", false, false, 79.5774715459477],
	    ["ohm", "Ω", null, "electric_resistance", true, false, 1],
	    ["ounce mass", "ozm", null, "mass", false, true, 0.028349523125],
	    ["pascal", "Pa", null, "pressure", true, false, 1],
	    ["pascal second", "Pa_s", null, "dynamic_viscosity", true, false, 1],
	    ["pferdestärke", "PS", null, "power", false, true, 735.49875],
	    ["phot", "ph", null, "illuminance", false, false, 0.0001],
	    ["pica (1/6 inch)", "pica", null, "length", false, true, 0.00035277777777778],
	    ["pica (1/72 inch)", "Pica", ["Picapt"], "length", false, true, 0.00423333333333333],
	    ["poise", "P", null, "dynamic_viscosity", false, false, 0.1],
	    ["pond", "pond", null, "force", false, true, 0.00980665],
	    ["pound force", "lbf", null, "force", false, true, 4.4482216152605],
	    ["pound mass", "lbm", null, "mass", false, true, 0.45359237],
	    ["quart", "qt", null, "volume", false, true, 0.000946352946],
	    ["radian", "rad", null, "angle", true, false, 1],
	    ["second", "arcsec", null, "angle", false, false, 0.00000484813681109536],
	    ["second", "s", ["sec"], "time", true, true, 1],
	    ["short hundredweight", "cwt", ["shweight"], "mass", false, true, 45.359237],
	    ["siemens", "S", null, "electrical_conductance", true, false, 1],
	    ["sievert", "Sv", null, "equivalent_dose", true, false, 1],
	    ["slug", "sg", null, "mass", false, true, 14.59390294],
	    ["square ångström", "ang2", ["ang^2"], "area", false, true, 1e-20],
	    ["square foot", "ft2", ["ft^2"], "area", false, true, 0.09290304],
	    ["square inch", "in2", ["in^2"], "area", false, true, 0.00064516],
	    ["square light-year", "ly2", ["ly^2"], "area", false, true, 8.95054210748189e+31],
	    ["square meter", "m2", null, "area", true, true, 1],
	    ["square mile", "mi2", ["mi^2"], "area", false, true, 2589988.110336],
	    ["square nautical mile", "Nmi2", ["Nmi^2"], "area", false, true, 3429904],
	    ["square Pica", "Pica2", ["Picapt2", "Pica^2", "Picapt^2"], "area", false, true, 0.00001792111111111],
	    ["square yard", "yd2", ["yd^2"], "area", false, true, 0.83612736],
	    ["statute mile", "mi", null, "length", false, true, 1609.344],
	    ["steradian", "sr", null, "solid_angle", true, false, 1],
	    ["stilb", "sb", null, "luminance", false, false, 0.0001],
	    ["stokes", "St", null, "kinematic_viscosity", false, false, 0.0001],
	    ["stone", "stone", null, "mass", false, true, 6.35029318],
	    ["tablespoon", "tbs", null, "volume", false, true, 0.0000147868],
	    ["teaspoon", "tsp", null, "volume", false, true, 0.00000492892],
	    ["tesla", "T", null, "magnetic_flux_density", true, true, 1],
	    ["thermodynamic calorie", "c", null, "energy", false, true, 4.184],
	    ["ton", "ton", null, "mass", false, true, 907.18474],
	    ["tonne", "t", null, "mass", false, false, 1000],
	    ["U.K. pint", "uk_pt", null, "volume", false, true, 0.00056826125],
	    ["U.S. bushel", "bushel", null, "volume", false, true, 0.03523907],
	    ["U.S. oil barrel", "barrel", null, "volume", false, true, 0.158987295],
	    ["U.S. pint", "pt", ["us_pt"], "volume", false, true, 0.000473176473],
	    ["U.S. survey mile", "survey_mi", null, "length", false, true, 1609.347219],
	    ["U.S. survey/statute acre", "us_acre", null, "area", false, true, 4046.87261],
	    ["volt", "V", null, "voltage", true, false, 1],
	    ["watt", "W", null, "power", true, true, 1],
	    ["watt-hour", "Wh", ["wh"], "energy", false, true, 3600],
	    ["weber", "Wb", null, "magnetic_flux", true, false, 1],
	    ["yard", "yd", null, "length", false, true, 0.9144],
	    ["year", "yr", null, "time", false, true, 31557600]
	  ];

	  // Binary prefixes
	  // [Name, Prefix power of 2 value, Previx value, Abbreviation, Derived from]
	  var binary_prefixes = {
	    Yi: ["yobi", 80, 1208925819614629174706176, "Yi", "yotta"],
	    Zi: ["zebi", 70, 1180591620717411303424, "Zi", "zetta"],
	    Ei: ["exbi", 60, 1152921504606846976, "Ei", "exa"],
	    Pi: ["pebi", 50, 1125899906842624, "Pi", "peta"],
	    Ti: ["tebi", 40, 1099511627776, "Ti", "tera"],
	    Gi: ["gibi", 30, 1073741824, "Gi", "giga"],
	    Mi: ["mebi", 20, 1048576, "Mi", "mega"],
	    ki: ["kibi", 10, 1024, "ki", "kilo"]
	  };

	  // Unit prefixes
	  // [Name, Multiplier, Abbreviation]
	  var unit_prefixes = {
	    Y: ["yotta", 1e+24, "Y"],
	    Z: ["zetta", 1e+21, "Z"],
	    E: ["exa", 1e+18, "E"],
	    P: ["peta", 1e+15, "P"],
	    T: ["tera", 1e+12, "T"],
	    G: ["giga", 1e+09, "G"],
	    M: ["mega", 1e+06, "M"],
	    k: ["kilo", 1e+03, "k"],
	    h: ["hecto", 1e+02, "h"],
	    e: ["dekao", 1e+01, "e"],
	    d: ["deci", 1e-01, "d"],
	    c: ["centi", 1e-02, "c"],
	    m: ["milli", 1e-03, "m"],
	    u: ["micro", 1e-06, "u"],
	    n: ["nano", 1e-09, "n"],
	    p: ["pico", 1e-12, "p"],
	    f: ["femto", 1e-15, "f"],
	    a: ["atto", 1e-18, "a"],
	    z: ["zepto", 1e-21, "z"],
	    y: ["yocto", 1e-24, "y"]
	  };

	  // Initialize units and multipliers
	  var from = null;
	  var to = null;
	  var base_from_unit = from_unit;
	  var base_to_unit = to_unit;
	  var from_multiplier = 1;
	  var to_multiplier = 1;
	  var alt;

	  // Lookup from and to units
	  for (var i = 0; i < units.length; i++) {
	    alt = (units[i][2] === null) ? [] : units[i][2];
	    if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
	      from = units[i];
	    }
	    if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
	      to = units[i];
	    }
	  }

	  // Lookup from prefix
	  if (from === null) {
	    var from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)];
	    var from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)];

	    // Handle dekao unit prefix (only unit prefix with two characters)
	    if (from_unit.substring(0, 2) === 'da') {
	      from_unit_prefix = ["dekao", 1e+01, "da"];
	    }

	    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
	    if (from_binary_prefix) {
	      from_multiplier = from_binary_prefix[2];
	      base_from_unit = from_unit.substring(2);
	    } else if (from_unit_prefix) {
	      from_multiplier = from_unit_prefix[1];
	      base_from_unit = from_unit.substring(from_unit_prefix[2].length);
	    }

	    // Lookup from unit
	    for (var j = 0; j < units.length; j++) {
	      alt = (units[j][2] === null) ? [] : units[j][2];
	      if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
	        from = units[j];
	      }
	    }
	  }

	  // Lookup to prefix
	  if (to === null) {
	    var to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)];
	    var to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)];

	    // Handle dekao unit prefix (only unit prefix with two characters)
	    if (to_unit.substring(0, 2) === 'da') {
	      to_unit_prefix = ["dekao", 1e+01, "da"];
	    }

	    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
	    if (to_binary_prefix) {
	      to_multiplier = to_binary_prefix[2];
	      base_to_unit = to_unit.substring(2);
	    } else if (to_unit_prefix) {
	      to_multiplier = to_unit_prefix[1];
	      base_to_unit = to_unit.substring(to_unit_prefix[2].length);
	    }

	    // Lookup to unit
	    for (var k = 0; k < units.length; k++) {
	      alt = (units[k][2] === null) ? [] : units[k][2];
	      if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
	        to = units[k];
	      }
	    }
	  }

	  // Return error if a unit does not exist
	  if (from === null || to === null) {
	    return error.na;
	  }

	  // Return error if units represent different quantities
	  if (from[3] !== to[3]) {
	    return error.na;
	  }

	  // Return converted number
	  return number * from[6] * from_multiplier / (to[6] * to_multiplier);
	};

	exports.DEC2BIN = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return error if number is not decimal, is lower than -512, or is greater than 511
	  if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character binary number if number is negative
	  if (number < 0) {
	    return '1' + text.REPT('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
	  }

	  // Convert decimal number to binary
	  var result = parseInt(number, 10).toString(2);

	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.DEC2HEX = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
	  if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character hexadecimal number if number is negative
	  if (number < 0) {
	    return (1099511627776 + number).toString(16);
	  }

	  // Convert decimal number to hexadecimal
	  var result = parseInt(number, 10).toString(16);

	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.DEC2OCT = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
	  if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character octal number if number is negative
	  if (number < 0) {
	    return (1073741824 + number).toString(8);
	  }

	  // Convert decimal number to octal
	  var result = parseInt(number, 10).toString(8);

	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.DELTA = function(number1, number2) {
	  // Set number2 to zero if undefined
	  number2 = (number2 === undefined) ? 0 : number2;
	  number1 = utils.parseNumber(number1);
	  if (number1 instanceof Error) {
	    return number1;
	  }
	  number2 = utils.parseNumber(number2);
	  if (number2 instanceof Error) {
	    return number2;
	  }

	  // Return delta
	  return (number1 === number2) ? 1 : 0;
	};

	// TODO: why is upper_bound not used ? The excel documentation has no examples with upper_bound
	exports.ERF = function(lower_bound, upper_bound) {
	  // Set number2 to zero if undefined
	  upper_bound = (upper_bound === undefined) ? 0 : upper_bound;

	  lower_bound = utils.parseNumber(lower_bound);
	  if (lower_bound instanceof Error) {
	    return lower_bound;
	  }
	  upper_bound = utils.parseNumber(upper_bound);
	  if (upper_bound instanceof Error) {
	    return upper_bound;
	  }

	  return jStat.erf(lower_bound);
	};

	// TODO
	exports.ERF.PRECISE = function() {
	 throw new Error('ERF.PRECISE is not implemented');
	};

	exports.ERFC = function(x) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return x;
	  }

	  return jStat.erfc(x);
	};

	// TODO
	exports.ERFC.PRECISE = function() {
	 throw new Error('ERFC.PRECISE is not implemented');
	};

	exports.GESTEP = function(number, step) {
	  step = step || 0;
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return delta
	  return (number >= step) ? 1 : 0;
	};

	exports.HEX2BIN = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Check if number is negative
	  var negative = (number.length === 10 && number.substring(0, 1).toLowerCase() === 'f') ? true : false;

	  // Convert hexadecimal number to decimal
	  var decimal = (negative) ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);

	  // Return error if number is lower than -512 or greater than 511
	  if (decimal < -512 || decimal > 511) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character binary number if number is negative
	  if (negative) {
	    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
	  }

	  // Convert decimal number to binary
	  var result = decimal.toString(2);

	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.HEX2DEC = function(number) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert hexadecimal number to decimal
	  var decimal = parseInt(number, 16);

	  // Return decimal number
	  return (decimal >= 549755813888) ? decimal - 1099511627776 : decimal;
	};

	exports.HEX2OCT = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert hexadecimal number to decimal
	  var decimal = parseInt(number, 16);

	  // Return error if number is positive and greater than 0x1fffffff (536870911)
	  if (decimal > 536870911 && decimal < 1098974756864) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character octal number if number is negative
	  if (decimal >= 1098974756864) {
	    return (decimal - 1098437885952).toString(8);
	  }

	  // Convert decimal number to octal
	  var result = decimal.toString(8);

	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.IMABS = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Return absolute value of complex number
	  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	};

	exports.IMAGINARY = function(inumber) {
	  if (inumber === undefined || inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Return 0 if inumber is equal to 0
	  if (inumber === 0 || inumber === '0') {
	    return 0;
	  }

	  // Handle special cases
	  if (['i', 'j'].indexOf(inumber) >= 0) {
	    return 1;
	  }

	  // Normalize imaginary coefficient
	  inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j');

	  // Lookup sign
	  var plus = inumber.indexOf('+');
	  var minus = inumber.indexOf('-');
	  if (plus === 0) {
	    plus = inumber.indexOf('+', 1);
	  }

	  if (minus === 0) {
	    minus = inumber.indexOf('-', 1);
	  }

	  // Lookup imaginary unit
	  var last = inumber.substring(inumber.length - 1, inumber.length);
	  var unit = (last === 'i' || last === 'j');

	  if (plus >= 0 || minus >= 0) {
	    // Return error if imaginary unit is neither i nor j
	    if (!unit) {
	      return error.num;
	    }

	    // Return imaginary coefficient of complex number
	    if (plus >= 0) {
	      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(plus + 1, inumber.length - 1));
	    } else {
	      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
	        error.num :
	        -Number(inumber.substring(minus + 1, inumber.length - 1));
	    }
	  } else {
	    if (unit) {
	      return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : inumber.substring(0, inumber.length - 1);
	    } else {
	      return (isNaN(inumber)) ? error.num : 0;
	    }
	  }
	};

	exports.IMARGUMENT = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Return error if inumber is equal to zero
	  if (x === 0 && y === 0) {
	    return error.div0;
	  }

	  // Return PI/2 if x is equal to zero and y is positive
	  if (x === 0 && y > 0) {
	    return Math.PI / 2;
	  }

	  // Return -PI/2 if x is equal to zero and y is negative
	  if (x === 0 && y < 0) {
	    return -Math.PI / 2;
	  }

	  // Return zero if x is negative and y is equal to zero
	  if (y === 0 && x > 0) {
	    return 0;
	  }

	  // Return zero if x is negative and y is equal to zero
	  if (y === 0 && x < 0) {
	    return -Math.PI;
	  }

	  // Return argument of complex number
	  if (x > 0) {
	    return Math.atan(y / x);
	  } else if (x < 0 && y >= 0) {
	    return Math.atan(y / x) + Math.PI;
	  } else {
	    return Math.atan(y / x) - Math.PI;
	  }
	};

	exports.IMCONJUGATE = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return conjugate of complex number
	  return (y !== 0) ? exports.COMPLEX(x, -y, unit) : inumber;
	};

	exports.IMCOS = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return cosine of complex number
	  return exports.COMPLEX(Math.cos(x) * (Math.exp(y) + Math.exp(-y)) / 2, -Math.sin(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
	};

	exports.IMCOSH = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return hyperbolic cosine of complex number
	  return exports.COMPLEX(Math.cos(y) * (Math.exp(x) + Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) - Math.exp(-x)) / 2, unit);
	};

	exports.IMCOT = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Return cotangent of complex number
	  return exports.IMDIV(exports.IMCOS(inumber), exports.IMSIN(inumber));
	};

	exports.IMDIV = function(inumber1, inumber2) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var a = exports.IMREAL(inumber1);
	  if (a instanceof Error) {
	    return a;
	  }
	  var b = exports.IMAGINARY(inumber1);
	  if (b instanceof Error) {
	    return b;
	  }
	  var c = exports.IMREAL(inumber2);
	  if (c instanceof Error) {
	    return c;
	  }
	  var d = exports.IMAGINARY(inumber2);
	  if (d instanceof Error) {
	    return d;
	  }

	  // Lookup imaginary unit
	  var unit1 = inumber1.substring(inumber1.length - 1);
	  var unit2 = inumber2.substring(inumber2.length - 1);
	  var unit = 'i';
	  if (unit1 === 'j') {
	    unit = 'j';
	  } else if (unit2 === 'j') {
	    unit = 'j';
	  }

	  // Return error if inumber2 is null
	  if (c === 0 && d === 0) {
	    return error.num;
	  }

	  // Return exponential of complex number
	  var den = c * c + d * d;
	  return exports.COMPLEX((a * c + b * d) / den, (b * c - a * d) / den, unit);
	};

	exports.IMEXP = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  var e = Math.exp(x);
	  return exports.COMPLEX(e * Math.cos(y), e * Math.sin(y), unit);
	};

	exports.IMLN = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)), Math.atan(y / x), unit);
	};

	exports.IMLOG10 = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(10), Math.atan(y / x) / Math.log(10), unit);
	};

	exports.IMLOG2 = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(2), Math.atan(y / x) / Math.log(2), unit);
	};

	exports.IMPOWER = function(inumber, number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Calculate power of modulus
	  var p = Math.pow(exports.IMABS(inumber), number);

	  // Calculate argument
	  var t = exports.IMARGUMENT(inumber);

	  // Return exponential of complex number
	  return exports.COMPLEX(p * Math.cos(number * t), p * Math.sin(number * t), unit);
	};

	exports.IMPRODUCT = function() {
	  // Initialize result
	  var result = arguments[0];

	  // Loop on all numbers
	  for (var i = 1; i < arguments.length; i++) {
	    // Lookup coefficients of two complex numbers
	    var a = exports.IMREAL(result);
	    if (a instanceof Error) {
	      return a;
	    }
	    var b = exports.IMAGINARY(result);
	    if (b instanceof Error) {
	      return b;
	    }
	    var c = exports.IMREAL(arguments[i]);
	    if (c instanceof Error) {
	      return c;
	    }
	    var d = exports.IMAGINARY(arguments[i]);
	    if (d instanceof Error) {
	      return d;
	    }

	    // Complute product of two complex numbers
	    result = exports.COMPLEX(a * c - b * d, a * d + b * c);
	  }

	  // Return product of complex numbers
	  return result;
	};

	exports.IMREAL = function(inumber) {
	  if (inumber === undefined || inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Return 0 if inumber is equal to 0
	  if (inumber === 0 || inumber === '0') {
	    return 0;
	  }

	  // Handle special cases
	  if (['i', '+i', '1i', '+1i', '-i', '-1i', 'j', '+j', '1j', '+1j', '-j', '-1j'].indexOf(inumber) >= 0) {
	    return 0;
	  }

	  // Lookup sign
	  var plus = inumber.indexOf('+');
	  var minus = inumber.indexOf('-');
	  if (plus === 0) {
	    plus = inumber.indexOf('+', 1);
	  }
	  if (minus === 0) {
	    minus = inumber.indexOf('-', 1);
	  }

	  // Lookup imaginary unit
	  var last = inumber.substring(inumber.length - 1, inumber.length);
	  var unit = (last === 'i' || last === 'j');

	  if (plus >= 0 || minus >= 0) {
	    // Return error if imaginary unit is neither i nor j
	    if (!unit) {
	      return error.num;
	    }

	    // Return real coefficient of complex number
	    if (plus >= 0) {
	      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(0, plus));
	    } else {
	      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(0, minus));
	    }
	  } else {
	    if (unit) {
	      return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : 0;
	    } else {
	      return (isNaN(inumber)) ? error.num : inumber;
	    }
	  }
	};

	exports.IMSEC = function(inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Return secant of complex number
	  return exports.IMDIV('1', exports.IMCOS(inumber));
	};

	exports.IMSECH = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Return hyperbolic secant of complex number
	  return exports.IMDIV('1', exports.IMCOSH(inumber));
	};

	exports.IMSIN = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return sine of complex number
	  return exports.COMPLEX(Math.sin(x) * (Math.exp(y) + Math.exp(-y)) / 2, Math.cos(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
	};

	exports.IMSINH = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return hyperbolic sine of complex number
	  return exports.COMPLEX(Math.cos(y) * (Math.exp(x) - Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) + Math.exp(-x)) / 2, unit);
	};

	exports.IMSQRT = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Calculate power of modulus
	  var s = Math.sqrt(exports.IMABS(inumber));

	  // Calculate argument
	  var t = exports.IMARGUMENT(inumber);

	  // Return exponential of complex number
	  return exports.COMPLEX(s * Math.cos(t / 2), s * Math.sin(t / 2), unit);
	};

	exports.IMSUB = function(inumber1, inumber2) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var a = exports.IMREAL(inumber1);
	  if (a instanceof Error) {
	    return a;
	  }
	  var b = exports.IMAGINARY(inumber1);
	  if (b instanceof Error) {
	    return b;
	  }
	  var c = exports.IMREAL(inumber2);
	  if (c instanceof Error) {
	    return c;
	  }
	  var d = exports.IMAGINARY(inumber2);
	  if (d instanceof Error) {
	    return d;
	  }

	  // Lookup imaginary unit
	  var unit1 = inumber1.substring(inumber1.length - 1);
	  var unit2 = inumber2.substring(inumber2.length - 1);
	  var unit = 'i';
	  if (unit1 === 'j') {
	    unit = 'j';
	  } else if (unit2 === 'j') {
	    unit = 'j';
	  }

	  // Return _ of two complex numbers
	  return exports.COMPLEX(a - c, b - d, unit);
	};

	exports.IMSUM = function() {
	  var args = _.flatten(arguments);

	  // Initialize result
	  var result = args[0];

	  // Loop on all numbers
	  for (var i = 1; i < args.length; i++) {
	    // Lookup coefficients of two complex numbers
	    var a = exports.IMREAL(result);
	    if (a instanceof Error) {
	      return a;
	    }
	    var b = exports.IMAGINARY(result);
	    if (b instanceof Error) {
	      return b;
	    }
	    var c = exports.IMREAL(args[i]);
	    if (c instanceof Error) {
	      return c;
	    }
	    var d = exports.IMAGINARY(args[i]);
	    if (d instanceof Error) {
	      return d;
	    }

	    // Complute product of two complex numbers
	    result = exports.COMPLEX(a + c, b + d);
	  }

	  // Return sum of complex numbers
	  return result;
	};

	exports.IMTAN = function(inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  if (x instanceof Error) {
	    return x;
	  }
	  var y = exports.IMAGINARY(inumber);
	  if (y instanceof Error) {
	    return y;
	  }

	  // Return tangent of complex number
	  return exports.IMDIV(exports.IMSIN(inumber), exports.IMCOS(inumber));
	};

	exports.OCT2BIN = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Check if number is negative
	  var negative = (number.length === 10 && number.substring(0, 1) === '7') ? true : false;

	  // Convert octal number to decimal
	  var decimal = (negative) ? parseInt(number, 8) - 1073741824 : parseInt(number, 8);

	  // Return error if number is lower than -512 or greater than 511
	  if (decimal < -512 || decimal > 511) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character binary number if number is negative
	  if (negative) {
	    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
	  }

	  // Convert decimal number to binary
	  var result = decimal.toString(2);

	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.OCT2DEC = function(number) {
	  // Return error if number is not octal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert octal number to decimal
	  var decimal = parseInt(number, 8);

	  // Return decimal number
	  return (decimal >= 536870912) ? decimal - 1073741824 : decimal;
	};

	exports.OCT2HEX = function(number, places) {
	  // Return error if number is not octal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert octal number to decimal
	  var decimal = parseInt(number, 8);

	  // Ignore places and return a 10-character octal number if number is negative
	  if (decimal >= 536870912) {
	    return 'ff' + (decimal + 3221225472).toString(16);
	  }

	  // Convert decimal number to hexadecimal
	  var result = decimal.toString(16);

	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var M = Math;
	function _horner(arr, v) { return arr.reduce(function(z,w){return v * z + w;},0); };
	function _bessel_iter(x, n, f0, f1, sign) {
	  if(!sign) sign = -1;
	  var tdx = 2 / x, f2;
	  if(n === 0) return f0;
	  if(n === 1) return f1;
	  for(var o = 1; o != n; ++o) {
	    f2 = f1 * o * tdx + sign * f0;
	    f0 = f1; f1 = f2;
	  }
	  return f1;
	}
	function _bessel_wrap(bessel0, bessel1, name, nonzero, sign) {
	  return function bessel(x,n) {
	    if(n === 0) return bessel0(x);
	    if(n === 1) return bessel1(x);
	    if(n < 0) throw name + ': Order (' + n + ') must be nonnegative';
	    if(nonzero == 1 && x === 0) throw name + ': Undefined when x == 0';
	    if(nonzero == 2 && x <= 0) throw name + ': Undefined when x <= 0';
	    var b0 = bessel0(x), b1 = bessel1(x);
	    return _bessel_iter(x, n, b0, b1, sign);
	  };
	}
	var besselj = (function() {
	  var b0_a1a = [57568490574.0,-13362590354.0,651619640.7,-11214424.18,77392.33017,-184.9052456].reverse();
	  var b0_a2a = [57568490411.0,1029532985.0,9494680.718,59272.64853,267.8532712,1.0].reverse();
	  var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
	  var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934935152e-7].reverse();
	  var W = 0.636619772; // 2 / Math.PI

	  function bessel0(x) {
	    var a, a1, a2, y = x * x, xx = M.abs(x) - 0.785398164;
	    if(M.abs(x) < 8) {
	      a1 = _horner(b0_a1a, y);
	      a2 = _horner(b0_a2a, y);
	      a = a1/a2;
	    }
	    else {
	      y = 64 / y;
	      a1 = _horner(b0_a1b, y);
	      a2 = _horner(b0_a2b, y);
	      a = M.sqrt(W/M.abs(x))*(M.cos(xx)*a1-M.sin(xx)*a2*8/M.abs(x));
	    }
	    return a;
	  }
	  var b1_a1a = [72362614232.0,-7895059235.0,242396853.1,-2972611.439, 15704.48260, -30.16036606].reverse();
	  var b1_a2a = [144725228442.0, 2300535178.0, 18583304.74, 99447.43394, 376.9991397, 1.0].reverse();
	  var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
	  var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
	  function bessel1(x) {
	    var a, a1, a2, y = x*x, xx = M.abs(x) - 2.356194491;
	    if(Math.abs(x)< 8) {
	      a1 = x*_horner(b1_a1a, y);
	      a2 = _horner(b1_a2a, y);
	      a = a1 / a2;
	    } else {
	      y = 64 / y;
	      a1=_horner(b1_a1b, y);
	      a2=_horner(b1_a2b, y);
	      a=M.sqrt(W/M.abs(x))*(M.cos(xx)*a1-M.sin(xx)*a2*8/M.abs(x));
	      if(x < 0) a = -a;
	    }
	    return a;
	  }
	  return function besselj(x, n) {
	    n = Math.round(n);
	    if(n === 0) return bessel0(M.abs(x));
	    if(n === 1) return bessel1(M.abs(x));
	    if(n < 0) throw 'BESSELJ: Order (' + n + ') must be nonnegative';
	    if(M.abs(x) === 0) return 0;

	    var ret, j, tox = 2 / M.abs(x), m, jsum, sum, bjp, bj, bjm;
	    if(M.abs(x) > n) {
	      ret = _bessel_iter(x, n, bessel0(M.abs(x)), bessel1(M.abs(x)),-1);
	    } else {
	      m=2*M.floor((n+M.floor(M.sqrt(40*n)))/2);
	      jsum=0;
	      bjp=ret=sum=0.0;
	      bj=1.0;
	      for (j=m;j>0;j--) {
	        bjm=j*tox*bj-bjp;
	        bjp=bj;
	        bj=bjm;
	        if (M.abs(bj) > 1E10) {
	          bj *= 1E-10;
	          bjp *= 1E-10;
	          ret *= 1E-10;
	          sum *= 1E-10;
	        }
	        if (jsum) sum += bj;
	        jsum=!jsum;
	        if (j == n) ret=bjp;
	      }
	      sum=2.0*sum-bj;
	      ret /= sum;
	    }
	    return x < 0 && (n%2) ? -ret : ret;
	  };
	})();
	var bessely = (function() {
	  var b0_a1a = [-2957821389.0, 7062834065.0, -512359803.6, 10879881.29, -86327.92757, 228.4622733].reverse();
	  var b0_a2a = [40076544269.0, 745249964.8, 7189466.438, 47447.26470, 226.1030244, 1.0].reverse();
	  var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
	  var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934945152e-7].reverse();

	  var W = 0.636619772;
	  function bessel0(x) {
	    var a, a1, a2, y = x * x, xx = x - 0.785398164;
	    if(x < 8) {
	      a1 = _horner(b0_a1a, y);
	      a2 = _horner(b0_a2a, y);
	      a = a1/a2 + W * besselj(x,0) * M.log(x);
	    } else {
	      y = 64 / y;
	      a1 = _horner(b0_a1b, y);
	      a2 = _horner(b0_a2b, y);
	      a = M.sqrt(W/x)*(M.sin(xx)*a1+M.cos(xx)*a2*8/x);
	    }
	    return a;
	  }

	  var b1_a1a = [-0.4900604943e13, 0.1275274390e13, -0.5153438139e11, 0.7349264551e9, -0.4237922726e7, 0.8511937935e4].reverse();
	  var b1_a2a = [0.2499580570e14, 0.4244419664e12, 0.3733650367e10, 0.2245904002e8, 0.1020426050e6, 0.3549632885e3, 1].reverse();
	  var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
	  var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
	  function bessel1(x) {
	    var a, a1, a2, y = x*x, xx = x - 2.356194491;
	    if(x < 8) {
	      a1 = x*_horner(b1_a1a, y);
	      a2 = _horner(b1_a2a, y);
	      a = a1/a2 + W * (besselj(x,1) * M.log(x) - 1 / x);
	    } else {
	      y = 64 / y;
	      a1=_horner(b1_a1b, y);
	      a2=_horner(b1_a2b, y);
	      a=M.sqrt(W/x)*(M.sin(xx)*a1+M.cos(xx)*a2*8/x);
	    }
	    return a;
	  }

	  return _bessel_wrap(bessel0, bessel1, 'BESSELY', 1, -1);
	})();
	var besseli = (function() {
	  var b0_a = [1.0, 3.5156229, 3.0899424, 1.2067492, 0.2659732, 0.360768e-1, 0.45813e-2].reverse();
	  var b0_b = [0.39894228, 0.1328592e-1, 0.225319e-2, -0.157565e-2, 0.916281e-2, -0.2057706e-1, 0.2635537e-1, -0.1647633e-1, 0.392377e-2].reverse();
	  function bessel0(x) {
	    if(x <= 3.75) return _horner(b0_a, x*x/(3.75*3.75));
	    return M.exp(M.abs(x))/M.sqrt(M.abs(x))*_horner(b0_b, 3.75/M.abs(x));
	  }

	  var b1_a = [0.5, 0.87890594, 0.51498869, 0.15084934, 0.2658733e-1, 0.301532e-2, 0.32411e-3].reverse();
	  var b1_b = [0.39894228, -0.3988024e-1, -0.362018e-2, 0.163801e-2, -0.1031555e-1, 0.2282967e-1, -0.2895312e-1, 0.1787654e-1, -0.420059e-2].reverse();
	  function bessel1(x) {
	    if(x < 3.75) return x * _horner(b1_a, x*x/(3.75*3.75));
	    return (x < 0 ? -1 : 1) * M.exp(M.abs(x))/M.sqrt(M.abs(x))*_horner(b1_b, 3.75/M.abs(x));
	  }

	  return function besseli(x, n) {
	    n = Math.round(n);
	    if(n === 0) return bessel0(x);
	    if(n == 1) return bessel1(x);
	    if(n < 0) throw 'BESSELI Order (' + n + ') must be nonnegative';
	    if(M.abs(x) === 0) return 0;

	    var ret, j, tox = 2 / M.abs(x), m, bip, bi, bim;
	    m=2*M.round((n+M.round(M.sqrt(40*n)))/2);
	    bip=ret=0.0;
	    bi=1.0;
	    for (j=m;j>0;j--) {
	      bim=j*tox*bi + bip;
	      bip=bi; bi=bim;
	      if (M.abs(bi) > 1E10) {
	        bi *= 1E-10;
	        bip *= 1E-10;
	        ret *= 1E-10;
	      }
	      if(j == n) ret = bip;
	    }
	    ret *= besseli(x, 0) / bi;
	    return x < 0 && (n%2) ? -ret : ret;
	  };

	})();

	var besselk = (function() {
	  var b0_a = [-0.57721566, 0.42278420, 0.23069756, 0.3488590e-1, 0.262698e-2, 0.10750e-3, 0.74e-5].reverse();
	  var b0_b = [1.25331414, -0.7832358e-1, 0.2189568e-1, -0.1062446e-1, 0.587872e-2, -0.251540e-2, 0.53208e-3].reverse();
	  function bessel0(x) {
	    if(x <= 2) return -M.log(x/2)*besseli(x,0) + _horner(b0_a, x*x/4);
	    return M.exp(-x)/M.sqrt(x)*_horner(b0_b, 2/x);
	  }

	  var b1_a = [1.0, 0.15443144, -0.67278579, -0.18156897, -0.1919402e-1, -0.110404e-2, -0.4686e-4].reverse();
	  var b1_b = [1.25331414, 0.23498619, -0.3655620e-1, 0.1504268e-1, -0.780353e-2, 0.325614e-2, -0.68245e-3].reverse();
	  function bessel1(x) {
	    if(x <= 2) return M.log(x/2)*besseli(x,1) + (1/x)*_horner(b1_a, x*x/4);
	    return M.exp(-x)/M.sqrt(x)*_horner(b1_b, 2/x);
	  }

	  return _bessel_wrap(bessel0, bessel1, 'BESSELK', 2, 1);
	})();
	if(true) {
	  exports.besselj = besselj;
	  exports.bessely = bessely;
	  exports.besseli = besseli;
	  exports.besselk = besselk;
	}



/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var utils = __webpack_require__(4);
	var information = __webpack_require__(7);
	var _ = __webpack_require__(6);

	exports.AND = function() {
	  var args = _.flatten(arguments);
	  var result = true;
	  for (var i = 0; i < args.length; i++) {
	    var b = utils.parseBool(args[i]);
	    if (b instanceof Error) {
	      return b;
	    }
	    if (!b) {
	      result = false;
	    }
	  }
	  return result;
	};

	exports.FALSE = function() {
	  return false;
	};

	exports.IF = function(test, then_value, otherwise_value) {
	  if (then_value === undefined) {
	    then_value = true;
	  }
	  if (otherwise_value === undefined) {
	    otherwise_value = false;
	  }
	  test = utils.parseBool(test);
	  if (test instanceof Error) {
	    return test;
	  }
	  return test ? then_value : otherwise_value;
	};

	exports.IFERROR = function(value, valueIfError) {
	  if (information.ISERROR(value)) {
	    return valueIfError;
	  }
	  return value;
	};

	exports.IFNA = function(value, value_if_na) {
	  return value === error.na ? value_if_na : value;
	};

	exports.NOT = function(logical) {
	  logical = utils.parseBool(logical);
	  if (logical instanceof Error) {
	    return logical;
	  }
	  return !logical;
	};

	exports.OR = function() {
	  var args = _.flatten(arguments);
	  var result = false;
	  for (var i = 0; i < args.length; i++) {
	    var b = utils.parseBool(args[i]);
	    if (b instanceof Error) {
	      return b;
	    }
	    if (b) {
	      result = true;
	    }
	  }
	  return result;
	};

	exports.TRUE = function() {
	  return true;
	};

	exports.XOR = function() {
	  var args = _.flatten(arguments);
	  var result = 0;
	  for (var i = 0; i < args.length; i++) {
	    var b = utils.parseBool(args[i]);
	    if (b instanceof Error) {
	      return b;
	    }
	    if (b) {
	      result++;
	    }
	  }
	  return (Math.floor(Math.abs(result)) & 1) ? true : false;
	};


/***/ }),
/* 18 */
14,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var utils = __webpack_require__(4);

	var WEEK_STARTS = [
	  undefined,
	  0,
	  1,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  1,
	  2,
	  3,
	  4,
	  5,
	  6,
	  0
	];
	var WEEK_TYPES = [
	  [],
	  [1, 2, 3, 4, 5, 6, 7],
	  [7, 1, 2, 3, 4, 5, 6],
	  [6, 0, 1, 2, 3, 4, 5],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [7, 1, 2, 3, 4, 5, 6],
	  [6, 7, 1, 2, 3, 4, 5],
	  [5, 6, 7, 1, 2, 3, 4],
	  [4, 5, 6, 7, 1, 2, 3],
	  [3, 4, 5, 6, 7, 1, 2],
	  [2, 3, 4, 5, 6, 7, 1],
	  [1, 2, 3, 4, 5, 6, 7]
	];
	var WEEKEND_TYPES = [
	  [],
	  [6, 0],
	  [0, 1],
	  [1, 2],
	  [2, 3],
	  [3, 4],
	  [4, 5],
	  [5, 6],
	  undefined,
	  undefined,
	  undefined, [0, 0],
	  [1, 1],
	  [2, 2],
	  [3, 3],
	  [4, 4],
	  [5, 5],
	  [6, 6]
	];

	exports.DATE = function(year, month, day) {
	  year = utils.parseNumber(year);
	  if (year instanceof Error) {
	    return year;
	  }
	  month = utils.parseNumber(month);
	  if (month instanceof Error) {
	    return month;
	  }
	  day = utils.parseNumber(day);
	  if (day instanceof Error) {
	    return day;
	  }
	  if (year < 0 || month < 0 || day < 0) {
	    return error.num;
	  }
	  var date = Date.UTC(year, month - 1, day);
	  return utils.jsToExcelTimestamp(date);
	};

	exports.DATEVALUE = function(date_text) {
	  if (typeof date_text !== 'string') {
	    return error.value;
	  }
	  var date = utils.parseDate(date_text);
	  if (date instanceof Error) {
	    return date;
	  }
	  return utils.jsToExcelTimestamp(date);
	};

	exports.DAY = function(serial_number) {
	  var date = utils.parseDate(serial_number);
	  if (date instanceof Error) {
	    return date;
	  }
	  return date.getUTCDate();
	};

	exports.DAYS = function(end_date, start_date) {
	  end_date = utils.parseDate(end_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  return utils.jsToExcelTimestamp(end_date) - utils.jsToExcelTimestamp(start_date);
	};

	exports.DAYS360 = function(start_date, end_date, method) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  end_date = utils.parseDate(end_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  method = utils.parseBool(method);
	  if (method instanceof Error) {
	    return method;
	  }
	  var sm = start_date.getUTCMonth();
	  var em = end_date.getUTCMonth();
	  var sd, ed;
	  if (method) {
	    sd = start_date.getUTCDate() === 31 ? 30 : start_date.getUTCDate();
	    ed = end_date.getUTCDate() === 31 ? 30 : end_date.getUTCDate();
	  } else {
	    var smd = utils.createUTCDate(start_date.getUTCFullYear(), sm + 1, 0).getUTCDate();
	    var emd = utils.createUTCDate(end_date.getUTCFullYear(), em + 1, 0).getUTCDate();
	    sd = start_date.getUTCDate() === smd ? 30 : start_date.getUTCDate();
	    if (end_date.getUTCDate() == emd) {
	      if (sd < 30) {
	        em++;
	        ed = 1;
	      } else {
	        ed = 30;
	      }
	    } else {
	      ed = end_date.getUTCDate();
	    }
	  }
	  return 360 * (end_date.getUTCFullYear() - start_date.getUTCFullYear()) +
	    30 * (em - sm) + (ed - sd);
	};

	exports.EDATE = function(start_date, months) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (isNaN(months)) {
	    return error.value;
	  }
	  months = parseInt(months, 10);
	  start_date.setUTCMonth(start_date.getUTCMonth() + months);
	  return utils.jsToExcelTimestamp(start_date);
	};

	exports.EOMONTH = function(start_date, months) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (isNaN(months)) {
	    return error.value;
	  }
	  months = parseInt(months, 10);
	  return utils.jsToExcelTimestamp(utils.createUTCDate(start_date.getUTCFullYear(), start_date.getUTCMonth() + months + 1, 0));
	};

	exports.HOUR = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getUTCHours();
	};

	exports.ISOWEEKNUM = function(date) {
	  date = utils.parseDate(date);
	  if (date instanceof Error) {
	    return date;
	  }

	  date.setUTCHours(0, 0, 0);
	  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
	  var yearStart = utils.createUTCDate(date.getUTCFullYear(), 0, 1);
	  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
	};

	exports.MINUTE = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getUTCMinutes();
	};

	exports.MONTH = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getUTCMonth() + 1;
	};

	exports.NETWORKDAYS = function(start_date, end_date, holidays) {
	  return exports.NETWORKDAYS.INTL(start_date, end_date, 1, holidays);
	};

	exports.NETWORKDAYS.INTL = function(start_date, end_date, weekend, holidays) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  end_date = utils.parseDate(end_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (weekend === undefined) {
	    weekend = WEEKEND_TYPES[1];
	  } else {
	    weekend = WEEKEND_TYPES[weekend];
	  }
	  if (!(weekend instanceof Array)) {
	    return error.value;
	  }
	  if (holidays === undefined) {
	    holidays = [];
	  } else if (!(holidays instanceof Array)) {
	    holidays = [holidays];
	  }
	  for (var i = 0; i < holidays.length; i++) {
	    var h = utils.parseDate(holidays[i]);
	    if (h instanceof Error) {
	      return h;
	    }
	    holidays[i] = h;
	  }
	  var days = (end_date - start_date) / (1000 * 60 * 60 * 24);
	  var total = days;
	  var day = start_date;
	  for (i = 0; i < days; i++) {
	    var d = day.getUTCDay();
	    var dec = false;
	    if (d === weekend[0] || d === weekend[1]) {
	      dec = true;
	    }
	    for (var j = 0; j < holidays.length; j++) {
	      var holiday = holidays[j];
	      if (holiday.getUTCDate() == day.getUTCDate() &&
	        holiday.getUTCMonth() == day.getUTCMonth() &&
	        holiday.getUTCFullYear() == day.getUTCFullYear()) {
	        dec = true;
	        break;
	      }
	    }
	    if (dec) {
	      total--;
	    }
	    day.setUTCDate(day.getUTCDate() + 1);
	  }
	  return total + 1;
	};

	exports.NOW = function() {
	  return utils.jsToExcelTimestamp(utils.createUTCDate());
	};

	exports.SECOND = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getUTCSeconds();
	};

	exports.TIME = function(hour, minute, second) {
	  hour = utils.parseNumber(hour);
	  if (hour instanceof Error) {
	    return hour;
	  }
	  minute = utils.parseNumber(minute);
	  if (minute instanceof Error) {
	    return minute;
	  }
	  second = utils.parseNumber(second);
	  if (second instanceof Error) {
	    return second;
	  }
	  if (hour < 0 || minute < 0 || second < 0) {
	    return error.num;
	  }
	  return (3600 * hour + 60 * minute + second) / 86400;
	};

	exports.TIMEVALUE = function(time_text) {
	  time_text = utils.parseDate(time_text);
	  if (time_text instanceof Error) {
	    return time_text;
	  }
	  return (3600 * time_text.getUTCHours() +
	    60 * time_text.getUTCMinutes() +
	    time_text.getUTCSeconds()) / 86400;
	};

	exports.TODAY = function() {
	  var date = utils.createUTCDate();
	  date.setUTCHours(0, 0, 0, 0);
	  return utils.jsToExcelTimestamp(date);
	};

	exports.WEEKDAY = function(serial_number, return_type) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  if (return_type === undefined) {
	    return_type = 1;
	  }
	  var day = serial_number.getUTCDay();
	  return WEEK_TYPES[return_type][day];
	};

	exports.WEEKNUM = function(serial_number, return_type) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  if (return_type === undefined) {
	    return_type = 1;
	  }
	  if (return_type === 21) {
	    return exports.ISOWEEKNUM(serial_number);
	  }
	  var week_start = WEEK_STARTS[return_type];
	  var jan = utils.createUTCDate(serial_number.getUTCFullYear(), 0, 1);
	  var inc = jan.getUTCDay() < week_start ? 1 : 0;
	  jan -= Math.abs(jan.getUTCDay() - week_start) * 24 * 60 * 60 * 1000;
	  return Math.floor(((serial_number - jan) / (1000 * 60 * 60 * 24)) / 7 + 1) + inc;
	};

	exports.WORKDAY = function(start_date, days, holidays) {
	  return exports.WORKDAY.INTL(start_date, days, 1, holidays);
	};

	exports.WORKDAY.INTL = function(start_date, days, weekend, holidays) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  days = utils.parseNumber(days);
	  if (days instanceof Error) {
	    return days;
	  }
	  if (weekend === undefined) {
	    weekend = WEEKEND_TYPES[1];
	  } else {
	    weekend = WEEKEND_TYPES[weekend];
	  }
	  if (!(weekend instanceof Array)) {
	    return error.value;
	  }
	  if (holidays === undefined) {
	    holidays = [];
	  } else if (!(holidays instanceof Array)) {
	    holidays = [holidays];
	  }
	  start_date.setUTCHours(0, 0, 0);
	  for (var i = 0; i < holidays.length; i++) {
	    var h = utils.parseDate(holidays[i]);
	    if (h instanceof Error) {
	      return h;
	    }
	    holidays[i] = h;
	  }
	  var d = 0;
	  var totalNumberOfDays = Math.abs(days);

	  while (d < totalNumberOfDays) {
	    if (days >= 0) {
	      start_date.setUTCDate(start_date.getUTCDate() + 1);
	    } else {
	      start_date.setUTCDate(start_date.getUTCDate() - 1);
	    }

	    var day = start_date.getUTCDay();
	    if (day === weekend[0] || day === weekend[1]) {
	      continue;
	    }
	    for (var j = 0; j < holidays.length; j++) {
	      var holiday = holidays[j];
	      if (holiday.getUTCDate() == start_date.getUTCDate() &&
	        holiday.getUTCMonth() == start_date.getUTCMonth() &&
	        holiday.getUTCFullYear() == start_date.getUTCFullYear()) {
	        d--;
	        break;
	      }
	    }
	    d++;
	  }

	  /* The time of the start date was set to 00:00 before beginning the process of
	   * finding the end date. Due to daylight saving time, the time of the end date
	   * may not be 00:00 if a date has been processed where clocks are advanced or
	   * set back. As this function should return whole days, the returned Excel
	   * date is rounded. (Truncating the returned Excel date instead would have
	   * returned the wrong date if a date has been processed where clocks are set
	   * back.)
	   */
	  return Math.round(utils.jsToExcelTimestamp(start_date));
	};

	exports.YEAR = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getUTCFullYear();
	};

	exports.YEARFRAC = function(start_date, end_date, basis) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  end_date = utils.parseDate(end_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (basis === undefined) {
	    basis = 0;
	  }
	  var sd = start_date.getUTCDate();
	  var sm = start_date.getUTCMonth() + 1;
	  var sy = start_date.getUTCFullYear();
	  var ed = end_date.getUTCDate();
	  var em = end_date.getUTCMonth() + 1;
	  var ey = end_date.getUTCFullYear();

	  switch (basis) {
	    case 0:
	      if (sd === 31 && ed === 31) {
	        sd = 30;
	        ed = 30;
	      } else if (sd === 31) {
	        sd = 30;
	      } else if (sd === 30 && ed === 31) {
	        ed = 30;
	      }
	      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
	    case 1:
	      var feb29Between = function(date1, date2) {
	        var mar1year1 = utils.createUTCDate(date1.getUTCFullYear(), 2, 1);
	        if (utils.createUTCDate(date1.getUTCFullYear(), 1, 29).getUTCMonth() == 1 && date1 - mar1year1 < 0 && date2 - mar1year1 >= 0) {
	          return true;
	        }
	        var mar1year2 = utils.createUTCDate(date2.getUTCFullYear(), 2, 1);
	        if (utils.createUTCDate(date2.getUTCFullYear(), 1, 29).getUTCMonth() == 1 && date2 - mar1year2 >= 0 && date1 - mar1year2 < 0) {
	          return true;
	        }
	        return false;
	      };
	      var ylength = 365;
	      if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
	        if (sy === ey && utils.createUTCDate(sy, 1, 29).getUTCMonth() == 1) {
	          ylength = 366;
	        } else if (feb29Between(start_date, end_date) || (em === 1 && ed === 29)) {
	          ylength = 366;
	        }
	        return (end_date - start_date) / 1000 / 60 / 60 / 24 / ylength;
	      }
	      var years = (ey - sy) + 1;
	      var days = (utils.createUTCDate(ey + 1, 0, 1) - utils.createUTCDate(sy, 0, 1)) / 1000 / 60 / 60 / 24;
	      var average = days / years;
	      return (end_date - start_date) / 1000 / 60 / 60 / 24 / average;
	    case 2:
	      return (end_date - start_date) / 1000 / 60 / 60 / 24 / 360;
	    case 3:
	      return (end_date - start_date) / 1000 / 60 / 60 / 24 / 365;
	    case 4:
	      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
	  }
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var dateTime = __webpack_require__(19);
	var utils = __webpack_require__(4);
	var _ = __webpack_require__(6);

	// TODO
	exports.ACCRINT = function() {
	 throw new Error('ACCRINT is not implemented');
	};

	// TODO
	exports.ACCRINTM = function() {
	 throw new Error('ACCRINTM is not implemented');
	};

	// TODO
	exports.AMORDEGRC = function() {
	 throw new Error('AMORDEGRC is not implemented');
	};

	// TODO
	exports.AMORLINC = function() {
	 throw new Error('AMORLINC is not implemented');
	};

	// TODO
	exports.COUPDAYBS = function() {
	 throw new Error('COUPDAYBS is not implemented');
	};

	// TODO
	exports.COUPDAYS = function() {
	 throw new Error('COUPDAYS is not implemented');
	};

	// TODO
	exports.COUPDAYSNC = function() {
	 throw new Error('COUPDAYSNC is not implemented');
	};

	// TODO
	exports.COUPNCD = function() {
	 throw new Error('COUPNCD is not implemented');
	};

	// TODO
	exports.COUPNUM = function() {
	 throw new Error('COUPNUM is not implemented');
	};

	// TODO
	exports.COUPPCD = function() {
	 throw new Error('COUPPCD is not implemented');
	};

	exports.CUMIPMT = function(rate, periods, value, start, end, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
	  // Requires exports.FV() and exports.PMT() from exports.js [http://stoic.com/exports/]

	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  value = utils.parseNumber(value);
	  if (value instanceof Error) {
	    return value;
	  }

	  // Return error if either rate, periods, or value are lower than or equal to zero
	  if (rate <= 0 || periods <= 0 || value <= 0) {
	    return error.num;
	  }

	  // Return error if start < 1, end < 1, or start > end
	  if (start < 1 || end < 1 || start > end) {
	    return error.num;
	  }

	  // Return error if type is neither 0 nor 1
	  if (type !== 0 && type !== 1) {
	    return error.num;
	  }

	  // Compute cumulative interest
	  var payment = exports.PMT(rate, periods, value, 0, type);
	  var interest = 0;

	  if (start === 1) {
	    if (type === 0) {
	      interest = -value;
	      start++;
	    }
	  }

	  for (var i = start; i <= end; i++) {
	    if (type === 1) {
	      interest += exports.FV(rate, i - 2, payment, value, 1) - payment;
	    } else {
	      interest += exports.FV(rate, i - 1, payment, value, 0);
	    }
	  }
	  interest *= rate;

	  // Return cumulative interest
	  return interest;
	};

	exports.CUMPRINC = function(rate, periods, value, start, end, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	  // Credits: Hannes Stiebitzhofer for the translations of function and variable names

	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  value = utils.parseNumber(value);
	  if (value instanceof Error) {
	    return value;
	  }

	  // Return error if either rate, periods, or value are lower than or equal to zero
	  if (rate <= 0 || periods <= 0 || value <= 0) {
	    return error.num;
	  }

	  // Return error if start < 1, end < 1, or start > end
	  if (start < 1 || end < 1 || start > end) {
	    return error.num;
	  }

	  // Return error if type is neither 0 nor 1
	  if (type !== 0 && type !== 1) {
	    return error.num;
	  }

	  // Compute cumulative principal
	  var payment = exports.PMT(rate, periods, value, 0, type);
	  var principal = 0;
	  if (start === 1) {
	    if (type === 0) {
	      principal = payment + value * rate;
	    } else {
	      principal = payment;
	    }
	    start++;
	  }
	  for (var i = start; i <= end; i++) {
	    if (type > 0) {
	      principal += payment - (exports.FV(rate, i - 2, payment, value, 1) - payment) * rate;
	    } else {
	      principal += payment - exports.FV(rate, i - 1, payment, value, 0) * rate;
	    }
	  }

	  // Return cumulative principal
	  return principal;
	};

	exports.DB = function(cost, salvage, life, period, month) {
	  // Initialize month
	  month = (month === undefined) ? 12 : month;

	  cost = utils.parseNumber(cost);
	  if (cost instanceof Error) {
	    return cost;
	  }
	  salvage = utils.parseNumber(salvage);
	  if (salvage instanceof Error) {
	    return salvage;
	  }
	  life = utils.parseNumber(life);
	  if (life instanceof Error) {
	    return life;
	  }
	  period = utils.parseNumber(period);
	  if (period instanceof Error) {
	    return period;
	  }
	  month = utils.parseNumber(month);
	  if (month instanceof Error) {
	    return month;
	  }

	  // Return error if any of the parameters is negative
	  if (cost < 0 || salvage < 0 || life < 0 || period < 0) {
	    return error.num;
	  }

	  // Return error if month is not an integer between 1 and 12
	  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(month) === -1) {
	    return error.num;
	  }

	  // Return error if period is greater than life
	  if (period > life) {
	    return error.num;
	  }

	  // Return 0 (zero) if salvage is greater than or equal to cost
	  if (salvage >= cost) {
	    return 0;
	  }

	  // Rate is rounded to three decimals places
	  var rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3);

	  // Compute initial depreciation
	  var initial = cost * rate * month / 12;

	  // Compute total depreciation
	  var total = initial;
	  var current = 0;
	  var ceiling = (period === life) ? life - 1 : period;
	  for (var i = 2; i <= ceiling; i++) {
	    current = (cost - total) * rate;
	    total += current;
	  }

	  // Depreciation for the first and last periods are special cases
	  if (period === 1) {
	    // First period
	    return initial;
	  } else if (period === life) {
	    // Last period
	    return (cost - total) * rate;
	  } else {
	    return current;
	  }
	};

	exports.DDB = function(cost, salvage, life, period, factor) {
	  // Initialize factor
	  factor = (factor === undefined) ? 2 : factor;

	  cost = utils.parseNumber(cost);
	  if (cost instanceof Error) {
	    return cost;
	  }
	  salvage = utils.parseNumber(salvage);
	  if (salvage instanceof Error) {
	    return salvage;
	  }
	  life = utils.parseNumber(life);
	  if (life instanceof Error) {
	    return life;
	  }
	  period = utils.parseNumber(period);
	  if (period instanceof Error) {
	    return period;
	  }
	  factor = utils.parseNumber(factor);
	  if (factor instanceof Error) {
	    return factor;
	  }

	  // Return error if any of the parameters is negative or if factor is null
	  if (cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0) {
	    return error.num;
	  }

	  // Return error if period is greater than life
	  if (period > life) {
	    return error.num;
	  }

	  // Return 0 (zero) if salvage is greater than or equal to cost
	  if (salvage >= cost) {
	    return 0;
	  }

	  // Compute depreciation
	  var total = 0;
	  var current = 0;
	  for (var i = 1; i <= period; i++) {
	    current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
	    total += current;
	  }

	  // Return depreciation
	  return current;
	};

	// TODO
	exports.DISC = function() {
	 throw new Error('DISC is not implemented');
	};

	exports.DOLLARDE = function(dollar, fraction) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  dollar = utils.parseNumber(dollar);
	  if (dollar instanceof Error) {
	    return dollar;
	  }
	  fraction = utils.parseNumber(fraction);
	  if (fraction instanceof Error) {
	    return fraction;
	  }

	  // Return error if fraction is negative
	  if (fraction < 0) {
	    return error.num;
	  }

	  // Return error if fraction is greater than or equal to 0 and less than 1
	  if (fraction >= 0 && fraction < 1) {
	    return error.div0;
	  }

	  // Truncate fraction if it is not an integer
	  fraction = parseInt(fraction, 10);

	  // Compute integer part
	  var result = parseInt(dollar, 10);

	  // Add decimal part
	  result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;

	  // Round result
	  var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
	  result = Math.round(result * power) / power;

	  // Return converted dollar price
	  return result;
	};

	exports.DOLLARFR = function(dollar, fraction) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  dollar = utils.parseNumber(dollar);
	  if (dollar instanceof Error) {
	    return dollar;
	  }
	  fraction = utils.parseNumber(fraction);
	  if (fraction instanceof Error) {
	    return fraction;
	  }

	  // Return error if fraction is negative
	  if (fraction < 0) {
	    return error.num;
	  }

	  // Return error if fraction is greater than or equal to 0 and less than 1
	  if (fraction >= 0 && fraction < 1) {
	    return error.div0;
	  }

	  // Truncate fraction if it is not an integer
	  fraction = parseInt(fraction, 10);

	  // Compute integer part
	  var result = parseInt(dollar, 10);

	  // Add decimal part
	  result += (dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction;

	  // Return converted dollar price
	  return result;
	};

	// TODO
	exports.DURATION = function() {
	 throw new Error('DURATION is not implemented');
	};

	exports.EFFECT = function(rate, periods) {
	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }

	  // Return error if rate <=0 or periods < 1
	  if (rate <= 0 || periods < 1) {
	    return error.num;
	  }

	  // Truncate periods if it is not an integer
	  periods = parseInt(periods, 10);

	  // Return effective annual interest rate
	  return Math.pow(1 + rate / periods, periods) - 1;
	};

	exports.FV = function(rate, periods, payment, value, type) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  value = value || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  payment = utils.parseNumber(payment);
	  if (payment instanceof Error) {
	    return payment;
	  }
	  value = utils.parseNumber(value);
	  if (value instanceof Error) {
	    return value;
	  }
	  type = utils.parseNumber(type);
	  if (type instanceof Error) {
	    return type;
	  }

	  // Return future value
	  var result;
	  if (rate === 0) {
	    result = value + payment * periods;
	  } else {
	    var term = Math.pow(1 + rate, periods);
	    if (type === 1) {
	      result = value * term + payment * (1 + rate) * (term - 1) / rate;
	    } else {
	      result = value * term + payment * (term - 1) / rate;
	    }
	  }
	  return -result;
	};

	exports.FVSCHEDULE = function(principal, schedule) {
	  principal = utils.parseNumber(principal);
	  if (principal instanceof Error) {
	    return principal;
	  }
	  schedule = utils.parseNumbers(_.flatten(schedule));
	  if (schedule instanceof Error) {
	    return schedule;
	  }

	  var n = schedule.length;
	  var future = principal;

	  // Apply all interests in schedule
	  for (var i = 0; i < n; i++) {
	    // Apply scheduled interest
	    future *= 1 + schedule[i];
	  }

	  // Return future value
	  return future;
	};

	// TODO
	exports.INTRATE = function() {
	 throw new Error('INTRATE is not implemented');
	};

	exports.IPMT = function(rate, period, periods, present, future, type) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  period = utils.parseNumber(period);
	  if (period instanceof Error) {
	    return period;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  present = utils.parseNumber(present);
	  if (present instanceof Error) {
	    return present;
	  }
	  future = utils.parseNumber(future);
	  if (future instanceof Error) {
	    return future;
	  }
	  type = utils.parseNumber(type);
	  if (type instanceof Error) {
	    return type;
	  }

	  // Compute payment
	  var payment = exports.PMT(rate, periods, present, future, type);

	  // Compute interest
	  var interest;
	  if (period === 1) {
	    if (type === 1) {
	      interest = 0;
	    } else {
	      interest = -present;
	    }
	  } else {
	    if (type === 1) {
	      interest = exports.FV(rate, period - 2, payment, present, 1) - payment;
	    } else {
	      interest = exports.FV(rate, period - 1, payment, present, 0);
	    }
	  }

	  // Return interest
	  return interest * rate;
	};

	exports.IRR = function(values, guess) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  guess = guess || 0;
	  values = utils.parseNumbers(_.flatten(values));
	  if (values instanceof Error) {
	    return values;
	  }
	  guess = utils.parseNumber(guess);
	  if (guess instanceof Error) {
	    return guess;
	  }

	  // Calculates the resulting amount
	  var irrResult = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = values[0];
	    for (var i = 1; i < values.length; i++) {
	      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
	    }
	    return result;
	  };

	  // Calculates the first derivation
	  var irrResultDeriv = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = 0;
	    for (var i = 1; i < values.length; i++) {
	      var frac = (dates[i] - dates[0]) / 365;
	      result -= frac * values[i] / Math.pow(r, frac + 1);
	    }
	    return result;
	  };

	  // Initialize dates and check that values contains at least one positive value and one negative value
	  var dates = [];
	  var positive = false;
	  var negative = false;
	  for (var i = 0; i < values.length; i++) {
	    dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
	    if (values[i] > 0) {
	      positive = true;
	    }
	    if (values[i] < 0) {
	      negative = true;
	    }
	  }

	  // Return error if values does not contain at least one positive value and one negative value
	  if (!positive || !negative) {
	    return error.num;
	  }

	  // Initialize guess and resultRate
	  guess = (guess === undefined) ? 0.1 : guess;
	  var resultRate = guess;

	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-10;

	  // Implement Newton's method
	  var newRate, epsRate, resultValue;
	  var iteration = 0;
	  var contLoop = true;
	  do {
	    resultValue = irrResult(values, dates, resultRate);
	    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
	    epsRate = Math.abs(newRate - resultRate);
	    resultRate = newRate;
	    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
	  } while (contLoop);

	  // Return internal rate of return
	  return resultRate;
	};

	exports.ISPMT = function(rate, period, periods, value) {
	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  period = utils.parseNumber(period);
	  if (period instanceof Error) {
	    return period;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  value = utils.parseNumber(value);
	  if (value instanceof Error) {
	    return value;
	  }

	  // Return interest
	  return value * rate * (period / periods - 1);
	};

	// TODO
	exports.MDURATION = function() {
	 throw new Error('MDURATION is not implemented');
	};

	exports.MIRR = function(values, finance_rate, reinvest_rate) {
	  values = utils.parseNumbers(_.flatten(values));
	  if (values instanceof Error) {
	    return values;
	  }
	  finance_rate = utils.parseNumber(finance_rate);
	  if (finance_rate instanceof Error) {
	    return finance_rate;
	  }
	  reinvest_rate = utils.parseNumber(reinvest_rate);
	  if (reinvest_rate instanceof Error) {
	    return reinvest_rate;
	  }

	  // Initialize number of values
	  var n = values.length;

	  // Lookup payments (negative values) and incomes (positive values)
	  var payments = [];
	  var incomes = [];
	  for (var i = 0; i < n; i++) {
	    if (values[i] < 0) {
	      payments.push(values[i]);
	    } else {
	      incomes.push(values[i]);
	    }
	  }

	  // Return modified internal rate of return
	  var num = -exports.NPV(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
	  var den = exports.NPV(finance_rate, payments) * (1 + finance_rate);
	  return Math.pow(num / den, 1 / (n - 1)) - 1;
	};

	exports.NOMINAL = function(rate, periods) {
	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }

	  // Return error if rate <=0 or periods < 1
	  if (rate <= 0 || periods < 1) {
	    return error.num;
	  }

	  // Truncate periods if it is not an integer
	  periods = parseInt(periods, 10);

	  // Return nominal annual interest rate
	  return (Math.pow(rate + 1, 1 / periods) - 1) * periods;
	};

	exports.NPER = function(rate, payment, present, future, type) {
	  type = (type === undefined) ? 0 : type;
	  future = (future === undefined) ? 0 : future;

	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  payment = utils.parseNumber(payment);
	  if (payment instanceof Error) {
	    return payment;
	  }
	  present = utils.parseNumber(present);
	  if (present instanceof Error) {
	    return present;
	  }
	  future = utils.parseNumber(future);
	  if (future instanceof Error) {
	    return future;
	  }
	  type = utils.parseNumber(type);
	  if (type instanceof Error) {
	    return type;
	  }

	  // Return number of periods
	  var num = payment * (1 + rate * type) - future * rate;
	  var den = (present * rate + payment * (1 + rate * type));
	  return Math.log(num / den) / Math.log(1 + rate);
	};

	exports.NPV = function(rate) {
	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }

	  var args = utils.parseNumbers(_.flatten(arguments));

	  // Initialize net present value
	  var value = 0;

	  // Loop on all values
	  for (var j = 1; j < args.length; j++) {
	    value += args[j] / Math.pow(1 + rate, j);
	  }

	  // Return net present value
	  return value;
	};

	// TODO
	exports.ODDFPRICE = function() {
	 throw new Error('ODDFPRICE is not implemented');
	};

	// TODO
	exports.ODDFYIELD = function() {
	 throw new Error('ODDFYIELD is not implemented');
	};

	// TODO
	exports.ODDLPRICE = function() {
	 throw new Error('ODDLPRICE is not implemented');
	};

	// TODO
	exports.ODDLYIELD = function() {
	 throw new Error('ODDLYIELD is not implemented');
	};

	exports.PDURATION = function(rate, present, future) {
	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  present = utils.parseNumber(present);
	  if (present instanceof Error) {
	    return present;
	  }
	  future = utils.parseNumber(future);
	  if (future instanceof Error) {
	    return future;
	  }

	  // Return error if rate <=0
	  if (rate <= 0) {
	    return error.num;
	  }

	  // Return number of periods
	  return (Math.log(future) - Math.log(present)) / Math.log(1 + rate);
	};

	exports.PMT = function(rate, periods, present, future, type) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  present = utils.parseNumber(present);
	  if (present instanceof Error) {
	    return present;
	  }
	  future = utils.parseNumber(future);
	  if (future instanceof Error) {
	    return future;
	  }
	  type = utils.parseNumber(type);
	  if (type instanceof Error) {
	    return type;
	  }

	  // Return payment
	  var result;
	  if (rate === 0) {
	    result = (present + future) / periods;
	  } else {
	    var term = Math.pow(1 + rate, periods);
	    if (type === 1) {
	      result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
	    } else {
	      result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
	    }
	  }
	  return -result;
	};

	exports.PPMT = function(rate, period, periods, present, future, type) {
	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  present = utils.parseNumber(present);
	  if (present instanceof Error) {
	    return present;
	  }
	  future = utils.parseNumber(future);
	  if (future instanceof Error) {
	    return future;
	  }
	  type = utils.parseNumber(type);
	  if (type instanceof Error) {
	    return type;
	  }

	  return exports.PMT(rate, periods, present, future, type) - exports.IPMT(rate, period, periods, present, future, type);
	};

	// TODO
	exports.PRICE = function() {
	 throw new Error('PRICE is not implemented');
	};

	// TODO
	exports.PRICEDISC = function() {
	 throw new Error('PRICEDISC is not implemented');
	};

	// TODO
	exports.PRICEMAT = function() {
	 throw new Error('PRICEMAT is not implemented');
	};

	exports.PV = function(rate, periods, payment, future, type) {
	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  payment = utils.parseNumber(payment);
	  if (payment instanceof Error) {
	    return payment;
	  }
	  future = utils.parseNumber(future);
	  if (future instanceof Error) {
	    return future;
	  }
	  type = utils.parseNumber(type);
	  if (type instanceof Error) {
	    return type;
	  }

	  // Return present value
	  if (rate === 0) {
	    return -payment * periods - future;
	  } else {
	    return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
	  }
	};

	exports.RATE = function(periods, payment, present, future, type, guess) {
	  // Credits: rabugento

	  guess = (guess === undefined) ? 0.01 : guess;
	  future = (future === undefined) ? 0 : future;
	  type = (type === undefined) ? 0 : type;

	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  payment = utils.parseNumber(payment);
	  if (payment instanceof Error) {
	    return payment;
	  }
	  present = utils.parseNumber(present);
	  if (present instanceof Error) {
	    return present;
	  }
	  future = utils.parseNumber(future);
	  if (future instanceof Error) {
	    return future;
	  }
	  type = utils.parseNumber(type);
	  if (type instanceof Error) {
	    return type;
	  }
	  guess = utils.parseNumber(guess);
	  if (guess instanceof Error) {
	    return guess;
	  }

	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-10;

	  // Set maximum number of iterations
	  var iterMax = 50;

	  // Implement Newton's method
	  var y, y0, y1, x0, x1 = 0,
	    f = 0,
	    i = 0;
	  var rate = guess;
	  if (Math.abs(rate) < epsMax) {
	    y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
	  } else {
	    f = Math.exp(periods * Math.log(1 + rate));
	    y = present * f + payment * (1 / rate + type) * (f - 1) + future;
	  }
	  y0 = present + payment * periods + future;
	  y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
	  i = x0 = 0;
	  x1 = rate;
	  while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
	    rate = (y1 * x0 - y0 * x1) / (y1 - y0);
	    x0 = x1;
	    x1 = rate;
	    if (Math.abs(rate) < epsMax) {
	      y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
	    } else {
	      f = Math.exp(periods * Math.log(1 + rate));
	      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
	    }
	    y0 = y1;
	    y1 = y;
	    ++i;
	  }
	  return rate;
	};

	// TODO
	exports.RECEIVED = function() {
	 throw new Error('RECEIVED is not implemented');
	};

	exports.RRI = function(periods, present, future) {
	  periods = utils.parseNumber(periods);
	  if (periods instanceof Error) {
	    return periods;
	  }
	  present = utils.parseNumber(present);
	  if (present instanceof Error) {
	    return present;
	  }
	  future = utils.parseNumber(future);
	  if (future instanceof Error) {
	    return future;
	  }

	  // Return error if periods or present is equal to 0 (zero)
	  if (periods === 0 || present === 0) {
	    return error.num;
	  }

	  // Return equivalent interest rate
	  return Math.pow(future / present, 1 / periods) - 1;
	};

	exports.SLN = function(cost, salvage, life) {
	  cost = utils.parseNumber(cost);
	  if (cost instanceof Error) {
	    return cost;
	  }
	  salvage = utils.parseNumber(salvage);
	  if (salvage instanceof Error) {
	    return salvage;
	  }
	  life = utils.parseNumber(life);
	  if (life instanceof Error) {
	    return life;
	  }

	  // Return error if life equal to 0 (zero)
	  if (life === 0) {
	    return error.num;
	  }

	  // Return straight-line depreciation
	  return (cost - salvage) / life;
	};

	exports.SYD = function(cost, salvage, life, period) {
	  // Return error if any of the parameters is not a number
	  cost = utils.parseNumber(cost);
	  if (cost instanceof Error) {
	    return cost;
	  }
	  salvage = utils.parseNumber(salvage);
	  if (salvage instanceof Error) {
	    return salvage;
	  }
	  life = utils.parseNumber(life);
	  if (life instanceof Error) {
	    return life;
	  }
	  period = utils.parseNumber(period);
	  if (period instanceof Error) {
	    return period;
	  }

	  // Return error if life equal to 0 (zero)
	  if (life === 0) {
	    return error.num;
	  }

	  // Return error if period is lower than 1 or greater than life
	  if (period < 1 || period > life) {
	    return error.num;
	  }

	  // Truncate period if it is not an integer
	  period = parseInt(period, 10);

	  // Return straight-line depreciation
	  return ((cost - salvage) * (life - period + 1) * 2) / (life * (life + 1));
	};

	exports.TBILLEQ = function(settlement, maturity, discount) {
	  settlement = utils.parseDate(settlement);
	  if (settlement instanceof Error) {
	    return settlement;
	  }
	  maturity = utils.parseDate(maturity);
	  if (maturity instanceof Error) {
	    return maturity;
	  }
	  discount = utils.parseNumber(discount);
	  if (discount instanceof Error) {
	    return discount;
	  }

	  // Return error if discount is lower than or equal to zero
	  if (discount <= 0) {
	    return error.num;
	  }

	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }

	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }

	  // Return bond-equivalent yield
	  return (365 * discount) / (360 - discount * dateTime.DAYS360(settlement, maturity, false));
	};

	exports.TBILLPRICE = function(settlement, maturity, discount) {
	  settlement = utils.parseDate(settlement);
	  if (settlement instanceof Error) {
	    return settlement;
	  }
	  maturity = utils.parseDate(maturity);
	  if (maturity instanceof Error) {
	    return maturity;
	  }
	  discount = utils.parseNumber(discount);
	  if (discount instanceof Error) {
	    return discount;
	  }

	  // Return error if discount is lower than or equal to zero
	  if (discount <= 0) {
	    return error.num;
	  }

	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }

	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }

	  // Return bond-equivalent yield
	  return 100 * (1 - discount * dateTime.DAYS360(settlement, maturity, false) / 360);
	};

	exports.TBILLYIELD = function(settlement, maturity, price) {
	  settlement = utils.parseDate(settlement);
	  if (settlement instanceof Error) {
	    return settlement;
	  }
	  maturity = utils.parseDate(maturity);
	  if (maturity instanceof Error) {
	    return maturity;
	  }
	  price = utils.parseNumber(price);
	  if (price instanceof Error) {
	    return price;
	  }

	  // Return error if price is lower than or equal to zero
	  if (price <= 0) {
	    return error.num;
	  }

	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }

	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }

	  // Return bond-equivalent yield
	  return (100 - price) * 360 / (price * dateTime.DAYS360(settlement, maturity, false));
	};

	// TODO
	exports.VDB = function() {
	 throw new Error('VDB is not implemented');
	};


	exports.XIRR = function(values, dates, guess) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  values = utils.parseNumbers(_.flatten(values));
	  if (values instanceof Error) {
	    return values;
	  }
	  dates = utils.parseDates(_.flatten(dates));
	  if (dates instanceof Error) {
	    return dates;
	  }
	  guess = utils.parseNumber(guess);
	  if (guess instanceof Error) {
	    return guess;
	  }

	  // Calculates the resulting amount
	  var irrResult = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = values[0];
	    for (var i = 1; i < values.length; i++) {
	      result += values[i] / Math.pow(r, dateTime.DAYS(dates[i], dates[0]) / 365);
	    }
	    return result;
	  };

	  // Calculates the first derivation
	  var irrResultDeriv = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = 0;
	    for (var i = 1; i < values.length; i++) {
	      var frac = dateTime.DAYS(dates[i], dates[0]) / 365;
	      result -= frac * values[i] / Math.pow(r, frac + 1);
	    }
	    return result;
	  };

	  // Check that values contains at least one positive value and one negative value
	  var positive = false;
	  var negative = false;
	  for (var i = 0; i < values.length; i++) {
	    if (values[i] > 0) {
	      positive = true;
	    }
	    if (values[i] < 0) {
	      negative = true;
	    }
	  }

	  // Return error if values does not contain at least one positive value and one negative value
	  if (!positive || !negative) {
	    return error.num;
	  }

	  // Initialize guess and resultRate
	  guess = guess || 0.1;
	  var resultRate = guess;

	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-10;

	  // Implement Newton's method
	  var newRate, epsRate, resultValue;
	  var iteration = 0;
	  var contLoop = true;
	  do {
	    resultValue = irrResult(values, dates, resultRate);
	    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
	    epsRate = Math.abs(newRate - resultRate);
	    resultRate = newRate;
	    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
	  } while (contLoop);

	  // Return internal rate of return
	  return resultRate;
	};

	exports.XNPV = function(rate, values, dates) {
	  rate = utils.parseNumber(rate);
	  if (rate instanceof Error) {
	    return rate;
	  }
	  values = utils.parseNumbers(_.flatten(values));
	  if (values instanceof Error) {
	    return values;
	  }
	  dates = utils.parseDates(_.flatten(dates));
	  if (dates instanceof Error) {
	    return dates;
	  }

	  var result = 0;
	  for (var i = 0; i < values.length; i++) {
	    result += values[i] / Math.pow(1 + rate, dateTime.DAYS(dates[i], dates[0]) / 365);
	  }
	  return result;
	};

	// TODO
	exports.YIELD = function() {
	 throw new Error('YIELD is not implemented');
	};

	// TODO
	exports.YIELDDISC = function() {
	 throw new Error('YIELDDISC is not implemented');
	};

	// TODO
	exports.YIELDMAT = function() {
	 throw new Error('YIELDMAT is not implemented');
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(6);
	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);

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

	exports.HLOOKUP = function(lookup_value, table_array, row_index_num, range_lookup) {
	  if (range_lookup === undefined || range_lookup === null) {
	    range_lookup = true;
	  }
	  if (lookup_value instanceof Error) {
	    return lookup_value;
	  }
	  if (table_array instanceof Error) {
	    return table_array;
	  }
	  if (!(table_array instanceof Array)) {
	    return error.na;
	  }
	  if (!(table_array[0] instanceof Array)) {
	    table_array = [table_array];
	  }
	  row_index_num = utils.parseNumber(row_index_num);
	  if (row_index_num instanceof Error) {
	    return row_index_num;
	  }
	  if (row_index_num < 1) {
	    return error.value;
	  }
	  if (row_index_num - 1 >= table_array[0].length) {
	    return error.ref;
	  }
	  range_lookup = utils.parseBool(range_lookup);
	  if (range_lookup instanceof Error) {
	    return range_lookup;
	  }

	  var header = [];
	  for (var i = 0; i < table_array.length; i++) {
	    header[i] = table_array[i][0];
	  }

	  var index = exports.MATCH(lookup_value, header, range_lookup ? 1 : 0);
	  if (index instanceof Error) {
	    return index;
	  }

	  return table_array[index - 1][row_index_num - 1];
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
	  if (lookupValue instanceof Error) {
	    return lookupValue;
	  }
	  if (lookupArray instanceof Error) {
	    return lookupArray;
	  }
	  if (!(lookupArray instanceof Array)) {
	    lookupArray = [lookupArray];
	  }
	  if (lookupArray[0] instanceof Array && lookupArray[0].length > 1) {
	    return error.na;
	  }
	  lookupArray = _.flatten(lookupArray);
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
	        if (lookupArray[i].match(new RegExp(lookupValue.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\?/g, '.').replace(/\*/g, '.*?'), 'i'))) {
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

	exports.VLOOKUP = function(lookup_value, table_array, col_index_num, range_lookup) {
	  if (range_lookup === undefined || range_lookup === null) {
	    range_lookup = true;
	  }
	  if (lookup_value instanceof Error) {
	    return lookup_value;
	  }
	  if (table_array instanceof Error) {
	    return table_array;
	  }
	  if (!(table_array instanceof Array)) {
	    return error.na;
	  }
	  if (!(table_array[0] instanceof Array)) {
	    table_array = [table_array];
	  }
	  col_index_num = utils.parseNumber(col_index_num);
	  if (col_index_num instanceof Error) {
	    return col_index_num;
	  }
	  if (col_index_num < 1) {
	    return error.value;
	  }
	  if (col_index_num - 1 >= table_array.length) {
	    return error.ref;
	  }
	  range_lookup = utils.parseBool(range_lookup);
	  if (range_lookup instanceof Error) {
	    return range_lookup;
	  }

	  var header = [];
	  for (var i = 0; i < table_array[0].length; i++) {
	    header[i] = table_array[0][i];
	  }

	  var index = exports.MATCH(lookup_value, header, range_lookup ? 1 : 0);
	  if (index instanceof Error) {
	    return index;
	  }

	  return table_array[col_index_num - 1][index - 1];
	};


/***/ }),
/* 22 */
14
/******/ ])))
});
;