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
    ]
    lookupAndReference.INDEX(array, 0, 0).should.eql(array);
    lookupAndReference.INDEX(array, 0, 1).should.eql(array[0]);
    lookupAndReference.INDEX(array, 1, 0).should.eql([['apples'], ['bananas']]);
    lookupAndReference.INDEX(array, 1, 1).should.eql('apples');
    lookupAndReference.INDEX(array, 2, 2).should.eql('pears');
    lookupAndReference.INDEX(array, 2, 1).should.eql('lemmons');
    lookupAndReference.INDEX(array, 1, 2).should.eql('bananas');
    lookupAndReference.INDEX(array, 3, 1).should.eql(error.ref);
    lookupAndReference.INDEX(array, 1, 3).should.eql(error.ref);
  });



  test('TRANSPOSE', function() {
    lookupAndReference.TRANSPOSE([[1,2],[3,4]]).should.eql([[1,3],[2,4]]);
    lookupAndReference.TRANSPOSE([1,2,3]).should.eql([[1],[2],[3]]);
    lookupAndReference.TRANSPOSE([[1],[2],[3]]).should.eql([1,2,3]);
  });
});
