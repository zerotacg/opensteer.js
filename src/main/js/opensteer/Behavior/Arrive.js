define(function(require) {
  "use strict";
  
  var Class  = require('opensteer/Class');
  var Vector = require('opensteer/Vector');

  var utilities = require('opensteer/utilities');

  var min = Math.min
    ,sqrt = Math.sqrt
    ,map  = utilities.map;

  var Position = require('./Position');
  var $super = Position.prototype;

  return Class( Position, {
    desiredVelocity: function()
    {
      var steer = new Vector( this.getPos() );
      var entity = this.entity;
      steer.sub( entity.getPos() );
      var dist = steer.length();
      var max_speed = entity.max_speed;
      var brake_dist = max_speed * max_speed / entity.max_force;
      brake_dist = map( dist, 0, brake_dist, 0, max_speed );
      steer.maxLength( min( brake_dist, max_speed ) );
      return steer;
    }
  });
}); 
