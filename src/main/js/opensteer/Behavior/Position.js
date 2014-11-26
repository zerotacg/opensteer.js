"use strict";

define(function(require) {
  var Class  = require('opensteer/Class');
  var Vector = require('opensteer/Vector');

  var Behavior = require('../Behavior');

  return Class( Behavior, {
    pos: null

   ,next: new Vector()

   ,entity: null

   ,desiredVelocity: function(){}
   
   ,getPos: function()
    {
      return this.pos;
    }
    
   ,calcNext: function( dt, entity )
    {
      var next = this.next;
      next.set( entity.getVelocity() );
      next.scale( dt );
      next.add( entity.getPos() );
    }

   ,getForce: function( t, dt, idt )
    {
      var steer = this.desiredVelocity();
      steer.sub( this.entity.getVelocity() );
      return steer;
    }
  });
}); 
