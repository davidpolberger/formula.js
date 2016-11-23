var lookupAndReference = require('../lib/lookup-reference');
var error = require('../lib/error');
var should = require('should');

suite('Lookup & Reference', function () {
  test('CHOOSE', function () {
    lookupAndReference.CHOOSE(2, 1, 2, 3).should.eql(2);
    lookupAndReference.CHOOSE(2, [1,3], [2,4], [3,5]).should.eql([2,4]);
    lookupAndReference.CHOOSE(4, [1,3], [2,4], [3,5]).should.eql(error.value);
    lookupAndReference.CHOOSE(-1, [1,3], [2,4], [3,5]).should.eql(error.value);
  });

  test('HLOOKUP', function () {
    lookupAndReference.HLOOKUP(1, [1], 1).should.equal(1);
    lookupAndReference.HLOOKUP(1, [[1],[2]], 1).should.equal(1);
    lookupAndReference.HLOOKUP(2, [[1],[2]], 1).should.equal(2);
    lookupAndReference.HLOOKUP(1, [[1, 'A'],[2, 'B']], 2).should.equal('A');
    lookupAndReference.HLOOKUP(1, [[1],[2]], 2).should.equal(error.ref);
    lookupAndReference.HLOOKUP(1, [[0],[3]], 1, true).should.equal(0);
    lookupAndReference.HLOOKUP(1, [[2],[3]], 1, true).should.equal(error.na);
    lookupAndReference.HLOOKUP(1, [[2],[3]], 1, false).should.equal(error.na);
    lookupAndReference.HLOOKUP(2, [[2],[3]], 1, false).should.equal(2);

    lookupAndReference.HLOOKUP('A', [['a'],['b']], 1, false).should.equal('a');
    lookupAndReference.HLOOKUP('A?', [['a1'],['b1']], 1, false).should.equal('a1');
    lookupAndReference.HLOOKUP('A*', [['a123'],['b123']], 1, false).should.equal('a123');
  });

  test('INDEX', function () {
    var array = [
      ['apples', 'lemmons'],
      ['bananas', 'pears']
    ];
    lookupAndReference.INDEX(1, 0, 0).should.eql(1);
    lookupAndReference.INDEX(array, 0, 0).should.eql(array);
    lookupAndReference.INDEX(array, 0, 1).should.eql(array[0]);
    lookupAndReference.INDEX(array, 1, 0).should.eql([['apples'], ['bananas']]);
    lookupAndReference.INDEX(array, 1, 1).should.eql('apples');
    lookupAndReference.INDEX(array, 2, 2).should.eql('pears');
    lookupAndReference.INDEX(array, 2, 1).should.eql('lemmons');
    lookupAndReference.INDEX(array, 1, 2).should.eql('bananas');
    lookupAndReference.INDEX(array, 3, 1).should.eql(error.ref);
    lookupAndReference.INDEX(array, 1, 3).should.eql(error.ref);
    lookupAndReference.INDEX([1, 2], 0, 1).should.eql([1, 2]);
    lookupAndReference.INDEX([1, 2], 0, 2).should.eql(error.ref);
    lookupAndReference.INDEX([[1], [2]], 1, 0).should.eql([[1], [2]]);
    lookupAndReference.INDEX([[1], [2]], 2, 0).should.eql(error.ref);
    lookupAndReference.INDEX([[1], [2]], 1, 1).should.eql(1);
    lookupAndReference.INDEX([[1], [2]], 1, 2).should.eql(2);
    lookupAndReference.INDEX([1, 2], 1, 1).should.eql(1);
    lookupAndReference.INDEX([1, 2], 1, 0).should.eql(1);
  });

  test('MATCH', function () {
    lookupAndReference.MATCH(1, [0, 1, 2, 3, 4, 100, 7]).should.equal(2);
    lookupAndReference.MATCH(4, [0, 1, 2, 3, 4, 100, 7], 1).should.equal(5);
    lookupAndReference.MATCH(4, [0, 1, 2, 3, 4, 100, 7], 0).should.equal(5);
    lookupAndReference.MATCH(4, [0, 1, 2, 3, 4, 100, 7], -1).should.equal(error.na);
    lookupAndReference.MATCH(5, [0, 1, 2, 3, 4, 100, 7], 1).should.equal(5);
    lookupAndReference.MATCH(5, [0, 1, 2, 3, 4, 100, 7], 0).should.equal(error.na);
    lookupAndReference.MATCH(5, [0, 1, 2, 3, 4, 100, 7], -1).should.equal(error.na);
    lookupAndReference.MATCH(4, [0, 1, 2, 3, 4, 100, 7], 2).should.equal(5);
    lookupAndReference.MATCH(4, [0, 1, 2, 3, 4, 100, 7], -2).should.equal(error.na);
    lookupAndReference.MATCH('jima', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(1);
    lookupAndReference.MATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(2);
    lookupAndReference.MATCH('j?b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na);
    lookupAndReference.MATCH('j??b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(2);
    lookupAndReference.MATCH('j???b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na);
    lookupAndReference.MATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(1);
    lookupAndReference.MATCH('j*', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(1);
    lookupAndReference.MATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(3);
    lookupAndReference.MATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], -1).should.equal(error.na);
    lookupAndReference.MATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], 1).should.equal(2);
  });

  test('TRANSPOSE', function () {
    lookupAndReference.TRANSPOSE([[1,2],[3,4]]).should.eql([[1,3],[2,4]]);
    lookupAndReference.TRANSPOSE([1,2,3]).should.eql([[1],[2],[3]]);
    lookupAndReference.TRANSPOSE([[1],[2],[3]]).should.eql([1,2,3]);
  });

  test('VLOOKUP', function () {
    lookupAndReference.VLOOKUP(1, [1], 1).should.equal(1);
    lookupAndReference.VLOOKUP(1, [[1, 2]], 1).should.equal(1);
    lookupAndReference.VLOOKUP(2, [[1, 2]], 1).should.equal(2);
    lookupAndReference.VLOOKUP(1, [[1, 2],['A', 'B']], 2).should.equal('A');
    lookupAndReference.VLOOKUP(1, [[1, 2]], 2).should.equal(error.ref);
    lookupAndReference.VLOOKUP(1, [[0, 3]], 1, true).should.equal(0);
    lookupAndReference.VLOOKUP(1, [[2, 3]], 1, true).should.equal(error.na);
    lookupAndReference.VLOOKUP(1, [[2, 3]], 1, false).should.equal(error.na);
    lookupAndReference.VLOOKUP(2, [[2, 3]], 1, false).should.equal(2);

    lookupAndReference.VLOOKUP('A', [['a', 'b']], 1, false).should.equal('a');
    lookupAndReference.VLOOKUP('A?', [['a1', 'b1']], 1, false).should.equal('a1');
    lookupAndReference.VLOOKUP('A*', [['a123', 'b123']], 1, false).should.equal('a123');
  });
});
