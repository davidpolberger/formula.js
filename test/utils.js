var utils = require('../utils');
var should = require('should');
var error = require('../lib/error');

suite('Utils', function() {
  test('argsToArray', function() {
    (function() {
      should.deepEqual(utils.argsToArray(arguments), [1, 2, 3]);
    })(1, 2, 3);
  });

  test('cleanFloat', function() {
    utils.cleanFloat(3.0999999999999996).should.equal(3.1);
  });

  test('parseBool', function() {
    utils.parseBool(true).should.equal(true);
    utils.parseBool(0).should.equal(false);
    utils.parseBool(1).should.equal(true);
    utils.parseBool('TRUE').should.equal(true);
    utils.parseBool('FALSE').should.equal(false);
    utils.parseBool(new Date()).should.equal(true);
    utils.parseBool(NaN).should.equal(true);
    var err = new Error();
    utils.parseBool(err).should.equal(err);
  });

  test('parseNumber', function() {
    utils.parseNumber(1).should.equal(1);
    utils.parseNumber('1').should.equal(1);
    utils.parseNumber(true).should.equal(1);
    utils.parseNumber(false).should.equal(0);
    utils.parseNumber(null).should.equal(0);
    utils.parseNumber(undefined).should.equal(0);
    utils.parseNumber('string').should.equal(error.value);
    utils.parseNumber(error.na).should.equal(error.na);

    utils.parseNumber(1, true).should.equal(1);
    utils.parseNumber('1', true).should.equal(0);
    utils.parseNumber(true, true).should.equal(1);
    utils.parseNumber(false, true).should.equal(0);
    utils.parseNumber(null, true).should.equal(0);
    utils.parseNumber(undefined, true).should.equal(0);
    utils.parseNumber('string', true).should.equal(0);
    utils.parseNumber(error.na, true).should.equal(error.na);
  });

  test('parseNumbers', function() {
    utils.parseNumbers(null).should.equal(error.value);
    utils.parseNumbers(1).should.equal(error.value);
    utils.parseNumbers([1]).should.containEql(1);
    utils.parseNumbers(['1']).should.be.empty;
    utils.parseNumbers([true]).should.be.empty;
    utils.parseNumbers([false]).should.be.empty;
    utils.parseNumbers([null]).should.be.empty;
    utils.parseNumbers([undefined]).should.be.empty;
    utils.parseNumbers(['string']).should.be.empty;
    utils.parseNumbers([error.na]).should.equal(error.na);

    utils.parseNumbers(null, true).should.equal(error.value);
    utils.parseNumbers(1, true).should.equal(error.value);
    utils.parseNumbers([1], true).should.containEql(1);
    utils.parseNumbers(['1'], true).should.containEql(0);
    utils.parseNumbers([true], true).should.containEql(1);
    utils.parseNumbers([false], true).should.containEql(0);
    utils.parseNumbers([null], true).should.be.empty;
    utils.parseNumbers([undefined], true).should.be.empty;
    utils.parseNumbers(['string'], true).should.containEql(0);
    utils.parseNumbers([error.na], true).should.equal(error.na);
  });

  test('parseMatrix', function() {
    utils.parseMatrix().should.equal(error.value);
  });
});
