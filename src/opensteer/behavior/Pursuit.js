"use strict";
/*
define(function(require) {
  var Class  = require('opensteer/Class');
  var Vector = require('opensteer/Vector');

  var Seek = require('./Seek');
  var $super = Seek.prototype;

  return Class( Seek, {
    target: null

   ,constructor: function()
    {
      Seek.apply( this, arguments );
      this.pos = new Vector();
    }
    
   ,getForce: function( t, dt, idt )
    {
      this.calcNext( 1, this.target );
      return $super.getForce.apply( this, arguments );
    }

   ,getPos: function()
    {
      return this.next;
    }
    
  });
}); 
*/
