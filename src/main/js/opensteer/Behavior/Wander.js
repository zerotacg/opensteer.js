"use strict";

define(function(require) {
  var Class  = require('opensteer/Class');
  var Vector = require('opensteer/Vector');
  var random = Math.random;
  var Behavior = require('../Behavior');

  return Class( Behavior, {
    speed: 12

   ,wander_side: 0

   ,wander_min: -5

   ,wander_max: 5

   ,entity: null
   
   ,steer: new Vector()
   
   ,scalarRandomWalk: function( walkspeed )
    {
      var initial = this.wander_side;
      var min = this.wander_min, max = this.wander_max;
      var next = initial + (((random() * 2) - 1) * walkspeed);
      if (next < min) return min;
      if (next > max) return max;
      return next;
    }
   
   ,getForce: function( t, dt, idt )
    {
      var steer = this.steer;
      steer.set( this.entity.getVelocity() );
      steer.normalize();
      var x = steer.x, y = steer.y;
      steer.set( y, -x, steer.z );
      var speed = this.speed * dt;
      this.wander_side = this.scalarRandomWalk( speed );
      steer.scale( this.wander_side );

      return steer;
    }
  });
}); 
