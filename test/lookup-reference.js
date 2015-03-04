var lookupAndReference = require('../lib/lookup-reference');
var error = require('../lib/error');
var should = require('should');

suite('Lookup & Reference', function() {
  test('CHOOSE', function() {
    lookupAndReference.CHOOSE(2, 1, 2, 3).should.eql(2);
    lookupAndReference.CHOOSE(2, [1,3], [2,4], [3,5]).should.eql([2,4]);
    lookupAndReference.CHOOSE(4, [1,3], [2,4], [3,5]).should.eql(error.value);
    lookupAndReference.CHOOSE(-1, [1,3], [2,4], [3,5]).should.eql(error.value);
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

  test('MATCH', function() {
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

  test('TRANSPOSE', function() {
    lookupAndReference.TRANSPOSE([[1,2],[3,4]]).should.eql([[1,3],[2,4]]);
    lookupAndReference.TRANSPOSE([1,2,3]).should.eql([[1],[2],[3]]);
    lookupAndReference.TRANSPOSE([[1],[2],[3]]).should.eql([1,2,3]);
  });
});
