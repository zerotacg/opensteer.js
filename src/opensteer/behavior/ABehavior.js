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
     * @return {CVector}
     */
  , desiredVelocity: abstract
});
