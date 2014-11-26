define(function(require) {
    'use strict';

    var extend = require('opensteer/extend')
      , Class  = require('opensteer/Class')
      , Vector = require('opensteer/Vector')
      ;

    return Class({
        constructor: function( cfg )
        {
            extend( this, cfg );
        }

      , getForce: function( t, dt, idt )
        {
            return Vector.ZERO;
        }
    });
});
