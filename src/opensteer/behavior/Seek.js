if ( typeof define !== 'function' ) {
    /*jshint latedef:false */
    var define = require( 'amdefine' )( module );
}

define( function( require ) {
    'use strict';

    var clazz       = require('../utilities').clazz
      , Vector      = require('../Vector')
      , ABehavior   = require('./ABehavior')
      ;

    /**
     * @class Seek
     * @extends Behavior
     */
    return clazz( ABehavior, {

        steer: undefined

      , src_pos: undefined

      , dst_pos: undefined

      , max_velocity: 1

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
                 .scale( this.max_velocity )
            ;
            return steer;
        }
    });
});
