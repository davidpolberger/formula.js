var error = require('./error');
var utils = require('./utils');
var information = require('./information');
var _ = require('./limited-lodash');

exports.AND = function () {
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

exports.FALSE = function () {
  return false;
};

exports.IF = function(test, then_value, otherwise_value) {
  test = utils.parseBool(test);
  if (test instanceof Error) {
    return test;
  }
  if (then_value === undefined) {
    return error.value;
  }
  if (otherwise_value === undefined) {
    otherwise_value = false;
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

exports.OR = function () {
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

exports.TRUE = function () {
  return true;
};

exports.XOR = function () {
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
