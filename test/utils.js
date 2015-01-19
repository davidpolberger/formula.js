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
    utils.parseNumber(2).should.equal(2);
    utils.parseNumber('2').should.equal(2);
    utils.parseNumber('string').should.equal(error.value);
    utils.parseNumber(true).should.equal(1);
    utils.parseNumber(false).should.equal(0);
    utils.parseNumber(null).should.equal(0);
    utils.parseNumber(undefined).should.equal(0);
    utils.parseNumber(error.na).should.equal(error.na);
  });

  test('parseNumbers', function() {
    utils.parseNumbers(2).should.eql(error.value);
    utils.parseNumbers(error.na).should.eql(error.na);
    utils.parseNumbers([2]).should.eql([2]);
    utils.parseNumbers(['2']).should.eql([]);
    utils.parseNumbers(['string']).should.eql([]);
    utils.parseNumbers([true]).should.eql([]);
    utils.parseNumbers([false]).should.eql([]);
    utils.parseNumbers([null]).should.eql([]);
    utils.parseNumbers([undefined]).should.eql([]);
    utils.parseNumbers([error.na]).should.eql(error.na);
  });

  test('parseNumbersA', function() {
    utils.parseNumbersA(2).should.eql(error.value);
    utils.parseNumbersA(error.na).should.eql(error.na);
    utils.parseNumbersA([2]).should.eql([2]);
    utils.parseNumbersA(['2']).should.eql([0]);
    utils.parseNumbersA(['string']).should.eql([0]);
    utils.parseNumbersA([true]).should.eql([1]);
    utils.parseNumbersA([false]).should.eql([0]);
    utils.parseNumbersA([null]).should.eql([]);
    utils.parseNumbersA([undefined]).should.eql([]);
    utils.parseNumbersA([error.na]).should.eql(error.na);
  });

  test('parseNumbersConvert', function() {
    utils.parseNumbersConvert(2).should.eql(error.value);
    utils.parseNumbersConvert(error.na).should.eql(error.na);
    utils.parseNumbersConvert([2]).should.eql([2]);
    utils.parseNumbersConvert(['2']).should.eql([2]);
    utils.parseNumbersConvert(['string']).should.eql(error.value);
    utils.parseNumbersConvert([true]).should.eql(error.value);
    utils.parseNumbersConvert([false]).should.eql(error.value);
    utils.parseNumbersConvert([null]).should.eql([0]);
    utils.parseNumbersConvert([undefined]).should.eql([0]);
    utils.parseNumbersConvert([error.na]).should.eql(error.na);
  });

  test('parseNumbersX', function() {
    utils.parseNumbersA(2, 2).should.eql(error.value);
    utils.parseNumbersA(error.na, error.na).should.eql(error.na);
    utils.parseNumbersX([2], [2]).should.eql([[2],[2]]);
    utils.parseNumbersX(['2'], ['2']).should.eql([[], []]);
    utils.parseNumbersX(['string'], ['string']).should.eql([[], []]);
    utils.parseNumbersX([true], [true]).should.eql([[], []]);
    utils.parseNumbersX([false], [false]).should.eql([[], []]);
    utils.parseNumbersX([null], [null]).should.eql([[], []]);
    utils.parseNumbersX([undefined], [undefined]).should.eql([[], []]);
    utils.parseNumbersX([error.na], [error.na]).should.eql(error.na);
  });

  test('parseMatrix', function() {
    utils.parseMatrix().should.equal(error.value);
  });
});
