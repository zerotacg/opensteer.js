"use strict";

define(function(require) {
  var Class  = require('opensteer/Class');
  var Vector = require('opensteer/Vector');

  var Position = require('./Position');

  return Class( Position, {
    desiredVelocity: function()
    {
      var steer = new Vector( this.getPos() );
      steer.sub( this.entity.getPos() );
      steer.normalize();
      steer.scale( this.entity.max_speed );
      return steer;
    }
  });
}); 
