var lookupAndReference = require('../lib/lookup-reference');
var error = require('../lib/error');

suite('Lookup & Reference', function() {
  test('TRANSPOSE', function() {
    lookupAndReference.TRANSPOSE([[1,2],[3,4]]).should.eql([[1,3],[2,4]]);
    lookupAndReference.TRANSPOSE([1,2,3]).should.eql([[1],[2],[3]]);
    lookupAndReference.TRANSPOSE([[1],[2],[3]]).should.eql([1,2,3]);
  });

  test('CHOOSE', function() {
    lookupAndReference.CHOOSE(2, 1, 2, 3).should.eql(2);
    lookupAndReference.CHOOSE(2, [1,3], [2,4], [3,5]).should.eql([2,4]);
    lookupAndReference.CHOOSE(4, [1,3], [2,4], [3,5]).should.eql(error.value);
    lookupAndReference.CHOOSE(-1, [1,3], [2,4], [3,5]).should.eql(error.value);
  });
});
