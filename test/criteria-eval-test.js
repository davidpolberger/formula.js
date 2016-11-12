var should = require('should');
var criteriaEval = require('../lib/criteria-eval');
var error = require('../lib/error');

suite('Criteria Evaluation', function () {
  suite('matchWithWildcards', function () {
    test('returns true for blank pattern and text', function () {
      criteriaEval.matchWithWildcards('', '').should.be.true();
    });
    test('returns true for blank text', function () {
      criteriaEval.matchWithWildcards('a', '').should.be.false();
    });
    test('returns true for blank pattern', function () {
      criteriaEval.matchWithWildcards('', 'a').should.be.false();
    });
    test('returns true for same text', function () {
      criteriaEval.matchWithWildcards('a', 'a').should.be.true();
    });
    test('returns false for different text ... of same length', function () {
      criteriaEval.matchWithWildcards('a', 'b').should.be.false();
    });
    test('returns false for different text ... of shorter length', function () {
      criteriaEval.matchWithWildcards('ab', 'c').should.be.false();
    });
    test('returns false for different text ... of longer length', function () {
      criteriaEval.matchWithWildcards('a', 'bc').should.be.false();
    });
    test('returns true for ? matching a char', function () {
      criteriaEval.matchWithWildcards('a?', 'ab').should.be.true();
      criteriaEval.matchWithWildcards('?b', 'ab').should.be.true();
    });
    test('returns false for ? with no chars left in text', function () {
      criteriaEval.matchWithWildcards('a?', 'a').should.be.false();
    });
    test('returns false for ? matching last char of text', function () {
      criteriaEval.matchWithWildcards('?a', 'a').should.be.false();
    });
    test('returns true for * matching one char', function () {
      criteriaEval.matchWithWildcards('a*', 'ab').should.be.true();
    });
    test('returns true for * matching multiple char at end of pattern', function () {
      criteriaEval.matchWithWildcards('a*', 'abc').should.be.true();
    });
    test('returns false for * matching char _not_ at end of pattern', function () {
      criteriaEval.matchWithWildcards('a*d', 'abc').should.be.false();
    });
    test('returns true for * matching multiple char _not_ at end of pattern', function () {
      criteriaEval.matchWithWildcards('a*c', 'abc').should.be.true();
    });
    test('returns true for * matching no chars', function () {
      criteriaEval.matchWithWildcards('a*c', 'ac').should.be.true();
    });
    test('returns true for * matching multiple chars', function () {
      criteriaEval.matchWithWildcards('a*c', 'a123c').should.be.true();
    });
    test('treats * as non-wildcard with ~ prefix', function () {
      criteriaEval.matchWithWildcards('a~*c', 'a*c').should.be.true();
      criteriaEval.matchWithWildcards('a~*c', 'aXc').should.be.false();
    });
    test('treats ? as non-wildcard with ~ prefix', function () {
      criteriaEval.matchWithWildcards('a~?c', 'a?c').should.be.true();
      criteriaEval.matchWithWildcards('a~?c', 'aXc').should.be.false();
    });
    test('Handles multiple sequential ?', function () {
      criteriaEval.matchWithWildcards('a???c', 'aXYZc').should.be.true();
    });
    test('Handles multiple sequential *', function () {
      criteriaEval.matchWithWildcards('a**c', 'aXYZc').should.be.true();
    });
    test('Handles escaped *, then (unescaped) *', function () {
      criteriaEval.matchWithWildcards('a~**c', 'a*XYZc').should.be.true();
    });
  });
  suite('parseCriteria returns function that', function () {
    test('evaluates equal operator', function () {
      criteriaEval.parseCriteria('=0')(1).should.be.false();
      criteriaEval.parseCriteria('=1')(1).should.be.true();
      criteriaEval.parseCriteria('=2')(1).should.be.false();
    });
    test('evaluates not-equal operator', function () {
      criteriaEval.parseCriteria('<>0')(1).should.be.true();
      criteriaEval.parseCriteria('<>1')(1).should.be.false();
      criteriaEval.parseCriteria('<>2')(1).should.be.true();
    });
    test('evaluates greater-than operator', function () {
      criteriaEval.parseCriteria('>0')(1).should.be.true();
      criteriaEval.parseCriteria('>1')(1).should.be.false();
      criteriaEval.parseCriteria('>2')(1).should.be.false();
    });
    test('evaluates less-than operator', function () {
      criteriaEval.parseCriteria('<0')(1).should.be.false();
      criteriaEval.parseCriteria('<1')(1).should.be.false();
      criteriaEval.parseCriteria('<2')(1).should.be.true();
    });
    test('evaluates greater-than-or-equal operator', function () {
      criteriaEval.parseCriteria('>=0')(1).should.be.true();
      criteriaEval.parseCriteria('>=1')(1).should.be.true();
      criteriaEval.parseCriteria('>=2')(1).should.be.false();
    });
    test('evaluates less-than-or-equal operator', function () {
      criteriaEval.parseCriteria('<=0')(1).should.be.false();
      criteriaEval.parseCriteria('<=1')(1).should.be.true();
      criteriaEval.parseCriteria('<=2')(1).should.be.true();
    });
    test('uses equal operator if right not prefixed with operator', function () {
      criteriaEval.parseCriteria('1')(1).should.be.true();
      criteriaEval.parseCriteria('2')(1).should.be.false();
    });

    //TODO: inline this ... too busy to do that right now
    function evalComparison(left, criteria) {
      return criteriaEval.parseCriteria(criteria)(left);
    }

    test('equals compares number string as number', function () {
      evalComparison(1, '=1.0').should.be.true();
      evalComparison(1, '= 1.0 ').should.be.true();
      evalComparison(1, '1.0').should.be.true();
      evalComparison(1, ' 1.0 ').should.be.true();
      evalComparison('1.0', 1).should.be.true();
      evalComparison(' 1.0 ', 1).should.be.true();
      evalComparison('1.0', '1.00').should.be.true();
    });
    test('not-equals compares number string as number', function () {
      evalComparison(1, '<>1.0').should.be.false();
      evalComparison(1, '<> 1.0 ').should.be.false();
    });
    test('compares boolean to boolean', function () {
      evalComparison(true, true).should.be.true();
      evalComparison(false, false).should.be.true();
      evalComparison(true, false).should.be.false();
      evalComparison(false, true).should.be.false();
    });
    test('matches strings', function () {
      evalComparison('a', 'a').should.be.true();
      evalComparison('a', '<>a').should.be.false();
      evalComparison('a', 'b').should.be.false();
      evalComparison('a', '<>b').should.be.true();
    });
    test('matches strings ignoring case', function () {
      evalComparison('abc', 'AbC').should.be.true();
    });
    test('compares strings alphabetically', function () {
      evalComparison('b', '>a').should.be.true();
      evalComparison('a', '<b').should.be.true();
      evalComparison('b', '>=a').should.be.true();
      evalComparison('a', '<=b').should.be.true();
    });
    test('compares boolean string criteria value as boolean', function () {
      evalComparison(true, 'true').should.be.true();
      evalComparison(true, 'TrUe').should.be.true();
      evalComparison(false, 'false').should.be.true();
      evalComparison(false, 'FaLsE').should.be.true();
    });
    test('true/false strings do not equal self!!', function () {
      //NOTE: this behavior occurs since the boolean string is converted to boolean (type) before 
      // tested against string value.  This is Excel behavior!!
      evalComparison('true', 'true').should.be.false();
      evalComparison('false', 'false').should.be.false();
    });
    test('does _not_ compare common boolean synonyms left value as boolean', function () {
      evalComparison('true', true).should.be.false();
      evalComparison('false', false).should.be.false();
      evalComparison(1, true).should.be.false();
      evalComparison(0, false).should.be.false();
    });
    test('does _not_ convert 0/1 criteria value to boolean', function () {
      evalComparison(true, 1).should.be.false();
      evalComparison(false, 0).should.be.false();
    });
    test('compares (=) to blank for blank right', function () {
      evalComparison('', '').should.be.true();
      evalComparison('x', '').should.be.false();
    });
    test('compares to blank for just operator right', function () {
      evalComparison('', '=').should.be.true();
      evalComparison('x', '=').should.be.false();
      evalComparison('', '<>').should.be.false();
      evalComparison('x', '<>').should.be.true();
    });
    test('compares to blank for null criteria', function () {
      evalComparison('', null).should.be.true();
      evalComparison('x', null).should.be.false();
    });
    test('compares to blank for null left', function () {
      evalComparison(null, '').should.be.true();
      evalComparison(null, 'x').should.be.false();
    });
  });
  suite('applyCriteriaToValues', function () {
    test('returns result for each input value', function () {
      criteriaEval.applyCriteriaToValues([], null).should.eql([]);
      criteriaEval.applyCriteriaToValues([1, 2, 3], 2).should.eql([false, true, false]);
    });
  });
  suite('performIf', function () {
    test('calls action with values that pass filter', function () {
      var values = [];
      criteriaEval.performIf([[2, 4, 8, 16], '>5'], function(value) { values.push(value); });
      values.should.eql([8, 16]);
    });
    test('calls action with values selected by test values that pass filter', function () {
      var values = [];
      criteriaEval.performIf([[2, 4, 8, 16], '>5', [1, 2, 3, 4]], function(v) { values.push(v); });
      values.should.eql([3, 4]);
    });
    test('supports single item', function () {
      var values = [];
      criteriaEval.performIf([6, 6], function(v) { values.push(v); });
      values.should.eql([6]);
      values = [];
      criteriaEval.performIf([6, 6, 4], function (v) { values.push(v); });
      values.should.eql([4]);
    });
    test('throws for array count mismatch', function () {
      (function () { criteriaEval.performIf([[1, 2, 3], 0, [1, 2]]); }).should.throw();
      (function () { criteriaEval.performIf([1, 0, [1, 2]]); }).should.throw();
      (function () { criteriaEval.performIf([[1, 2], 0, 1]); }).should.throw();
    });
    test('throws for missing arg', function () {
      (function () { criteriaEval.performIf([]); }).should.throw();
      (function () { criteriaEval.performIf([[]]); }).should.throw();
    });
  });
  suite('performIfs', function () {
    test('calls action with values selected by test values that pass filter', function () {
      var values = [];
      criteriaEval.performIfs([[1, 2, 3, 4], [2, 4, 8, 16], '>5'], function(v) { values.push(v); });
      values.should.eql([3, 4]);
    });
    test('calls action with values selected by test values that pass two filters', function () {
      var values = [];
      criteriaEval.performIfs([[1, 2, 3, 4], [2, 4, 8, 16], '>5', ['a', 'b', 'a', 'd'], 'a'], function (v) { values.push(v); });
      values.should.eql([3]);
    });
    test('supports single item', function () {
      var values = [];
      criteriaEval.performIfs([4, 6, 6], function(v) { values.push(v); });
      values.should.eql([4]);
    });
    test('throws for array count mismatch', function () {
      (function () { criteriaEval.performIfs([[1, 2], [1, 2, 3], 0]); }).should.throw();
      (function () { criteriaEval.performIfs([[1, 2], 1, 0]); }).should.throw();
      (function () { criteriaEval.performIfs([1, [1, 2], 0]); }).should.throw();
      (function () { criteriaEval.performIfs([[1, 2], [1, 2], 0, [3], 1]); }).should.throw();
    });
    test('throws for missing arg', function () {
      (function () { criteriaEval.performIfs([]); }).should.throw();
      (function () { criteriaEval.performIfs([[]]); }).should.throw();
      (function () { criteriaEval.performIfs([[], []]); }).should.throw();
      (function () { criteriaEval.performIfs([[], [], 0, []]); }).should.throw();
    });
  });
});
