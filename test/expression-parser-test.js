var evalExpr = require('../lib/expression-parser');
var should = require('should');

suite('expression-parser', function () {
  test('returns literal value', function () {
    evalExpr('true').should.be.true();
    evalExpr('false').should.be.false();
    evalExpr('1').should.equal(1);
    evalExpr('"Abc"').should.equal('Abc');
  });
  test('treats undecorated text as string literal', function () {
    evalExpr('Abc').should.equal('Abc');
  });
  test('performs math', function () {
    evalExpr('1+2').should.equal(3);
    evalExpr('1-2').should.equal(-1);
    evalExpr('1*2').should.equal(2);
    evalExpr('1/2').should.equal(0.5);
  });
  test('tests equality', function () {
    evalExpr('1=1').should.equal(true);
    evalExpr('1=2').should.equal(false);
    evalExpr('"a"="a"').should.equal(true);
    evalExpr('"1"=1').should.equal(true);
  });
  test('tests equality (==)', function () {
    evalExpr('1==1').should.equal(true);
  });
  test('tests inequality', function () {
    evalExpr('1!=2').should.equal(true);
    evalExpr('1!=1').should.equal(false);
    evalExpr('"a"!="b"').should.equal(true);
    evalExpr('"a"!="A"').should.equal(true);
  });
});
