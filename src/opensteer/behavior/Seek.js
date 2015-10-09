if ( typeof define !== 'function' ) {
    /*jshint latedef:false */
    var define = require( 'amdefine' )( module );
}

define( function( require ) {
    'use strict';

    var utilities = require('../utilities');
    var clazz       = utilities.clazz;
    var Vector      = require('../Vector');
    var ABehavior   = require('./ABehavior');

    /**
     * @class Seek
     * @extends Behavior
     */
    return clazz( ABehavior, {

        steer: undefined

      , src_pos: undefined

      , dst_pos: undefined

      , constructor: function()
        {
            this.steer = new Vector();
            this.src_pos = new Vector();
            this.dst_pos = new Vector();
            ABehavior.apply( this, arguments );
        }

      , desiredVelocity: function()
        {
            var steer = this.steer;
            steer.set( this.dst_pos )
                 .sub( this.src_pos )
                 .normalize()
            ;
            return steer;
        }
    });
});
