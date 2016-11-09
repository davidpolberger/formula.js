var evalExpr = require('../lib/expression-parser');
var should = require('should');

suite('expression-parser', function () {
  test('parses boolean literal', function () {
    evalExpr('true').should.be.true();
    evalExpr('false').should.be.false();
    //TODO: evalExpr('TRUE').should.be.true();
    //TODO: evalExpr('FALSE').should.be.false();
    //TODO: evalExpr('TrUe').should.be.true();
    //TODO: evalExpr('FaLsE').should.be.false();
  });
  test('parses number literal', function () {
    evalExpr('1').should.equal(1);
    evalExpr('123.456').should.equal(123.456);
    evalExpr('-5').should.equal(-5);
  });
  //NOTE: *IF functions don't enclose strings in quotes
  test('parses string literal with double quotes', function () {
    evalExpr('"Abc"').should.equal('Abc');
  });
  //NOTE: *IF functions don't enclose strings in quotes
  test('parses string literal with single quotes', function () {
    evalExpr("'Abc'").should.equal('Abc');
  });
  test('parses undecorated text as string literal (not a variable/name)', function () {
    evalExpr('Abc').should.equal('Abc');
  });
  //NOTE: *IF functions don't do math
  test('performs math', function () {
    evalExpr('1+2').should.equal(3);
    evalExpr('1-2').should.equal(-1);
    evalExpr('1*2').should.equal(2);
    evalExpr('1/2').should.equal(0.5);
    evalExpr('3%2').should.equal(1);
  });
  //NOTE: *IF functions don't do string concatenation
  test('+ concatenates if either arg is string', function () {
    evalExpr('a+b').should.equal('ab');
    evalExpr('a+1').should.equal('a1');
    evalExpr('1+a').should.equal('1a');
    evalExpr('true+a').should.equal('truea');
    evalExpr('afalse').should.equal('afalse');
  });
  //NOTE: *IF functions don't to math
  test('returns NaN for numeric-only operations on strings', function () {
    evalExpr('a-b').should.be.NaN();
    evalExpr('a*b').should.be.NaN();
    evalExpr('a/b').should.be.NaN();
    evalExpr('a%b').should.be.NaN();
  });
  test('tests equality', function () {
    evalExpr('1=1').should.equal(true);
    evalExpr('1=2').should.equal(false);
    evalExpr('"a"="a"').should.equal(true);
    evalExpr("'a'='a'").should.equal(true);
    evalExpr('"1"=1').should.equal(true);
  });
  // NOTE: *IF functions only use = for equality
  test('tests equality (==)', function () {
    evalExpr('1==1').should.equal(true);
  });
  // NOTE: *IF functions use <> instead of !=
  test('tests inequality', function () {
    evalExpr('1!=2').should.equal(true);
    evalExpr('1!=1').should.equal(false);
    evalExpr('"a"!="b"').should.equal(true);
    evalExpr('"a"!="A"').should.equal(true);
  });
});
