'use strict';

var clazz       = require('../utilities').clazz
  , apply       = require('../utilities').apply
  , abstract    = require('../utilities').abstract
  ;

/**
 * @class Behavior
 * @abstract
 */
module.exports = clazz({
    /**
     * @constructor
     * @param {Object} cfg
     */
    constructor: function( cfg )
    {
        apply( this, cfg );
    }

    /**
     * @return {Vector} the desired velocity
     *   length between 0 and 1
     */
  , desiredVelocity: abstract
});
