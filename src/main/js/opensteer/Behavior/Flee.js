"use strict";

define(function(require) {
  var Class  = require('opensteer/Class');
  var Vector = require('opensteer/Vector');

  var Seek = require('./Seek');
  var $super = Seek.prototype;

  return Class( Seek, {
    desiredVelocity: function()
    {
      var steer = $super.desiredVelocity.apply( this, arguments );
      steer.scale( -1 );
      return steer;
    }
  });
}); 
