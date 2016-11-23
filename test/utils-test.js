var error = require('../lib/error');
var should = require('should');
var utils = require('../lib/utils');

suite('Utils', function () {
  suite('arrayify', function () {
    test('returns input if array', function () {
      utils.arrayify([1, 2, 3]).should.eql([1, 2, 3]);
    });
    test('returns non-array as single item array', function () {
      utils.arrayify(123).should.eql([123]);
    });
  });
  test('argsToArray returns items from arguments object as an array', function () {
    (function () {
      should.deepEqual(utils.argsToArray(arguments), [1, 2, 3]);
    })(1, 2, 3);
  });
  test('cleanFloat', function () {
    utils.cleanFloat(3.0999999999999996).should.equal(3.1);
  });
  suite('parseBool', function () {
    test('returns input boolean', function () {
      utils.parseBool(true).should.be.true();
      utils.parseBool(false).should.be.false();
    });
    test('returns false for null', function () {
      utils.parseBool(null).should.be.false();
    });
    test('returns false for 0', function () {
      utils.parseBool(0).should.be.false();
    });
    test('returns true for number != 0', function () {
      utils.parseBool(1).should.be.true();
      utils.parseBool(-1).should.be.true();
      utils.parseBool(123).should.be.true();
    });
    test('returns true for string true', function () {
      utils.parseBool('TRUE').should.be.true();
      utils.parseBool('true').should.be.true();
    });
    test('returns false for string false', function () {
      utils.parseBool('FALSE').should.be.false();
      utils.parseBool('false').should.be.false();
    });
    test('returns input error', function () {
      var err = new Error();
      utils.parseBool(err).should.equal(err);
    });
    test('returns value error for invalid string', function () {
      utils.parseBool('xyz').should.equal(error.value);
    });
    test('returns true for NaN', function () {
      //TODO: I think the result should be value.error
      utils.parseBool(NaN).should.be.true();
    });
  });
  suite('parseNumber', function () {
    test('returns input number', function () {
      utils.parseNumber(12.34).should.equal(12.34);
    });
    test('returns number represented by string', function () {
      utils.parseNumber('2').should.equal(2);
      utils.parseNumber('2.3').should.equal(2.3);
      utils.parseNumber('-3').should.equal(-3);
    });
    test('returns 1 for true', function () {
      utils.parseNumber(true).should.equal(1);
    });
    test('returns 0 for false', function () {
      utils.parseNumber(false).should.equal(0);
    });
    test('returns 0 for null', function () {
      utils.parseNumber(null).should.equal(0);
    });
    test('returns value error for value not representing a number', function () {
      utils.parseNumber(undefined).should.equal(error.value);
      utils.parseNumber('').should.equal(error.value);
      utils.parseNumber('xyz').should.equal(error.value);
    });
    test('returns input error', function () {
      var error = new Error();
      utils.parseNumber(error).should.equal(error);
    });
  });
  test('parseNumbers', function () {
    utils.parseNumbers(2).should.equal(error.value);
    utils.parseNumbers(error.na).should.equal(error.na);
    utils.parseNumbers([2]).should.eql([2]);
    utils.parseNumbers(['2']).should.eql([]);
    utils.parseNumbers(['string']).should.eql([]);
    utils.parseNumbers([true]).should.eql([]);
    utils.parseNumbers([false]).should.eql([]);
    utils.parseNumbers([null]).should.eql([]);
    utils.parseNumbers([undefined]).should.eql([]);
    utils.parseNumbers([error.na]).should.equal(error.na);
  });
  suite('selectNumbersFromArray', function () {
    test('excludes non-number values', function () {
      utils.selectNumbersFromArray([1, 'x', true, false, [3], 2]).should.eql([1, 2]);
    });
  });
  suite('parseNumbersFromArguments', function () {
    test('returns array with numeric args', function () {
      utils.parseNumbersFromArguments([1, 2, 3]).should.eql([1, 2, 3]);
    });
    test('converts arg to number', function () {
      utils.parseNumbersFromArguments(['123']).should.eql([123]);
      utils.parseNumbersFromArguments([true]).should.eql([1]);
      utils.parseNumbersFromArguments([false]).should.eql([0]);
    });
    test('flattens array args', function () {
      utils.parseNumbersFromArguments([[1, 2], [3, 4]]).should.eql([1, 2, 3, 4]);
    });
    test('ignores non-number in array arg', function () {
      utils.parseNumbersFromArguments([['x']]).should.eql([]);
      utils.parseNumbersFromArguments([['2']]).should.eql([]);
      utils.parseNumbersFromArguments([[true]]).should.eql([]);
      utils.parseNumbersFromArguments([[false]]).should.eql([]);
    });
    test('returns empty for empty', function () {
      utils.parseNumbersFromArguments([]).should.eql([]);
    });
    test('returns first error item', function () {
      var e = new Error();
      utils.parseNumbersFromArguments([0, e, new Error()]).should.equal(e);
    });
  });
  test('parseNumbersA', function () {
    utils.parseNumbersA(2).should.equal(error.value);
    utils.parseNumbersA(error.na).should.equal(error.na);
    utils.parseNumbersA([2]).should.eql([2]);
    utils.parseNumbersA(['2']).should.eql([0]);
    utils.parseNumbersA(['string']).should.eql([0]);
    utils.parseNumbersA([true]).should.eql([1]);
    utils.parseNumbersA([false]).should.eql([0]);
    utils.parseNumbersA([null]).should.eql([]);
    utils.parseNumbersA([undefined]).should.eql([]);
    utils.parseNumbersA([error.na]).should.equal(error.na);
  });
  test('parseNumbersConvert', function () {
    utils.parseNumbersConvert(2).should.equal(error.value);
    utils.parseNumbersConvert(error.na).should.equal(error.na);
    utils.parseNumbersConvert([2]).should.eql([2]);
    utils.parseNumbersConvert(['2']).should.eql([2]);
    utils.parseNumbersConvert(['string']).should.equal(error.value);
    utils.parseNumbersConvert([true]).should.equal(error.value);
    utils.parseNumbersConvert([false]).should.equal(error.value);
    utils.parseNumbersConvert([null]).should.eql([0]);
    utils.parseNumbersConvert([undefined]).should.eql([0]);
    utils.parseNumbersConvert([error.na]).should.equal(error.na);
  });
  test('parseNumbersX', function () {
    utils.parseNumbersA(2, 2).should.equal(error.value);
    utils.parseNumbersA(error.na, error.na).should.equal(error.na);
    utils.parseNumbersX([2], [2]).should.eql([[2],[2]]);
    utils.parseNumbersX(['2'], ['2']).should.eql([[], []]);
    utils.parseNumbersX(['string'], ['string']).should.eql([[], []]);
    utils.parseNumbersX([true], [true]).should.eql([[], []]);
    utils.parseNumbersX([false], [false]).should.eql([[], []]);
    utils.parseNumbersX([null], [null]).should.eql([[], []]);
    utils.parseNumbersX([undefined], [undefined]).should.eql([[], []]);
    utils.parseNumbersX([error.na], [error.na]).should.equal(error.na);
  });
  test('parseMatrix', function () {
    utils.parseMatrix(1).should.eql([[1]]);
  });
  suite('parseText', function () {
    test('returns input string', function () {
      utils.parseText('string').should.equal('string');
    });
    test('returns a number as its decimal representation', function () {
      utils.parseText(123).should.equal('123');
    });
    test('returns TRUE for true', function () {
      utils.parseText(true).should.equal('TRUE');
    });
    test('returns FALSE for false', function () {
      utils.parseText(false).should.equal('FALSE');
    });
    test('returns the input error', function () {
      utils.parseText(error.na).should.equal(error.na);
    });
    test('returns blank for null', function () {
      utils.parseText(null).should.equal('');
    });
    test('returns blank for undefined', function () {
      //TODO: should this return an error instead?
      utils.parseText().should.equal('');
    });
    test('returns value error for other types', function () {
      utils.parseText([1]).should.equal(error.value);
    });
  });
  suite('createUTCDate', function () {
    test('returns Date object for now', function () {
      var date = new Date();
      //TODO: this test fails sometimes since the clock progresses between calling createUTCDate() and Date().
      utils.createUTCDate().should.eql(new Date(date.getTime() - new Date().getTimezoneOffset() * 60000));
    });
    test('returns Date object for js timestamp', function () {
      utils.createUTCDate(123456).should.eql(new Date(123456));
    });
    test('returns Date object for year,month', function () {
      utils.createUTCDate(2000, 1).should.eql(new Date(Date.parse('2000-02-01 00:00:00 GMT')));
    });
    test('returns Date object for year,month,day', function () {
      utils.createUTCDate(2000, 1, 3).should.eql(new Date(Date.parse('2000-02-03 00:00:00 GMT')));
    });
    test('returns Date object for year,month,day,hour', function () {
      utils.createUTCDate(2000, 1, 3, 4).should.eql(new Date(Date.parse('2000-02-03 04:00:00 GMT')));
    });
    test('returns Date object for year,month,day,hour,minute', function () {
      utils.createUTCDate(2000, 1, 3, 4, 5).should.eql(new Date(Date.parse('2000-02-03 04:05:00 GMT')));
    });
    test('returns Date object for year,month,day,hour,minute,second', function () {
      utils.createUTCDate(2000, 1, 3, 4, 5, 6).should.eql(new Date(Date.parse('2000-02-03 04:05:06 GMT')));
    });
    test('returns Date object for year,month,day,hour,minute,second,millisecond', function () {
      utils.createUTCDate(2000, 1, 3, 4, 5, 6, 7).should.eql(new Date(Date.parse('2000-02-03 04:05:06.007 GMT')));
    });
    test('parses required date/time formats', function () {
      var expected = new Date(Date.parse('2000-2-3 13:00 GMT')).getTime();
      utils.createUTCDate('2/3/2000 13:00').getTime().should.equal(expected);
      utils.createUTCDate('02/03/2000 13:00:00').getTime().should.equal(expected);
      utils.createUTCDate('2000-2-3 13:00:00.0').getTime().should.equal(expected);
      utils.createUTCDate('2000-02-03 13:00').getTime().should.equal(expected);
      utils.createUTCDate('2000-feb-03 13:00').getTime().should.equal(expected);
      utils.createUTCDate('2000-FEB-03 13:00').getTime().should.equal(expected);
      utils.createUTCDate('February 3, 2000 13:00').getTime().should.equal(expected);
      utils.createUTCDate('february 3, 2000 13:00').getTime().should.equal(expected);
    });
    test('parses date only text', function () {
      utils.createUTCDate('2/3/2000').should.eql(new Date(Date.parse('2000-2-3 00:00 GMT')));
    });
    test('parses time only text', function () {
      //new Date(Date.parse('1899-12-31 13:00 GMT')).should.equal(0);
      utils.createUTCDate('13:00').should.eql(new Date(Date.parse('1899-12-31 13:00 GMT')));
    });
    test('returns invalid date for invalid date format', function () {
      utils.createUTCDate('0/0/0').getTime().should.be.NaN();
    });
  });
  suite('parseDate', function () {
    test('returns Date object equal to input Date object', function () {
      utils.parseDate(new Date(2000, 2, 3)).should.eql(new Date(2000, 2, 3));
    });
    test('returns Date object equal to Excel timestamp', function () {
      utils.parseDate(36559.5).should.eql(new Date(Date.parse('2000-02-03 12:00:00 GMT')));
    });
    test('returns Date object equal to Excel timestamp string', function () {
      utils.parseDate('36559.5').should.eql(new Date(Date.parse('2000-02-03 12:00:00 GMT')));
    });
    test('parses date/time text', function () {
      utils.parseDate('2/3/2000 13:00').should.eql(new Date(Date.parse('2000-2-3 13:00 GMT')));
    });
    test('returns num error for negative number', function () {
      utils.parseDate(-1).should.equal(error.num);
    });
    test('returns value error for invalid date format', function () {
      utils.parseDate('0/0/0').should.equal(error.value);
    });
  });
  suite('excelToJsTimestamp', function () {
      test('February 3, 2001', function () {
          utils.excelToJsTimestamp(36925).should.equal(Date.UTC(2001, 1, 3));
      });
      test('January 1, 1900', function () {
          utils.excelToJsTimestamp(1).should.equal(Date.UTC(1900, 0, 1));
      });
  });
  suite('jsToExcelTimestamp', function () {
      test('February 3, 2001', function () {
          utils.jsToExcelTimestamp(Date.UTC(2001, 1, 3)).should.equal(36925);
      });
      test('January 1, 1900', function () {
          utils.jsToExcelTimestamp(Date.UTC(1900, 0, 1)).should.equal(1);
      });
  });
});
