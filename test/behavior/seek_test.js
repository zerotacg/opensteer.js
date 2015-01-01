'use strict';

var Seek    = require( '../../src/opensteer/behavior/Seek' );
var Vector  = require( '../../src/opensteer/Vector' );

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

exports.Seek = {
    setUp: function( done ) {
        // setup here
        done();
      },

    'constructor': function( test ) {
        var s = new Seek();
        test.ok( s.src_pos.equals( Vector.ZERO ) );
        test.ok( s.src_pos.equals( s.dst_pos ) );
        test.notEqual( s.src_pos, s.dst_pos );
        test.done();
    }
};
