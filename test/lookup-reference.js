var lookupAndReference = require('../lib/lookup-reference');

suite('Lookup & Reference', function() {
  test('TRANSPOSE', function() {
    lookupAndReference.TRANSPOSE([[1,2],[3,4]]).should.eql([[1,3],[2,4]]);
    lookupAndReference.TRANSPOSE([1,2,3]).should.eql([[1],[2],[3]]);
    lookupAndReference.TRANSPOSE([[1],[2],[3]]).should.eql([1,2,3]);
  });
});
