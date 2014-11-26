'use strict';

var clazz     = require('../utilities').clazz
  , CVector   = require('../c_vector')
  , ABehavior = require('./a_behavior')
  ;

/**
 * @class CSeek
 * @extends ABehavior
 */
module.exports = clazz( ABehavior, {

    steer: undefined

  , src_pos: undefined

  , dst_pos: undefined

  , max_velocity: 10

  , constructor: function()
    {
        this.steer = new CVector();
        this.src_pos = new CVector();
        this.dst_pos = new CVector();
        ABehavior.apply( this, arguments );
    }

  , desiredVelocity: function()
    {
        var steer = this.steer;
        steer.set( this.dst_pos )
             .sub( this.src_pos )
        ;
        return steer;
    }

  , getForce: function( t, dt, idt )
    {
        var steer = this.desiredVelocity();
        steer.normalize()
             .scale( this.max_velocity )
             .scale( idt )
        ;
        return steer;
    }
});
