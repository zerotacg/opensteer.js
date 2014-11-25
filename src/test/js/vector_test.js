'use strict';

var Vector = require('../../../build/opensteer/vector');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.vector = {
  setUp: function(done) {
    // setup here
    done();
  },

  'no args': function(test) {
    test.expect(3);
    // tests here
    var v = new Vector();
    test.equal( v.x, 0, 'x should be zero.');
    test.equal( v.y, 0, 'y should be zero.');
    test.equal( v.z, 0, 'z should be zero.');
    test.done();
  },

  'numbers': function(test) {
    test.expect(3);
    // tests here
    var v = new Vector( 1, 2, 3 );
    test.equal( v.x, 1, 'x should be 1.');
    test.equal( v.y, 2, 'y should be 2.');
    test.equal( v.z, 3, 'z should be 3.');
    test.done();
  },

  'object': function(test) {
    test.expect(3);
    // tests here
    var v = new Vector( { x: 1, y: 2, z: 3 } );
    test.equal( v.x, 1, 'x should be 1.');
    test.equal( v.y, 2, 'y should be 2.');
    test.equal( v.z, 3, 'z should be 3.');
    test.done();
  },

  'equals': function(test) {
    test.expect(1);
    // tests here
    var v = new Vector();
    test.ok( Vector.ZERO.equals(v), 'should be equal.');
    test.done();
  }
};
