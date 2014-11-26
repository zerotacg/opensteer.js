'use strict';

var clazz       = require('../utilities').clazz
  , apply       = require('../utilities').apply
  , abstract    = require('../utilities').abstract
  ;

/**
 * @class ABehavior
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

    /**
     * @param {number} t absolute time
     * @param {number} dt relative time
     * @param {number} idt inverted relative time
     * @return {CVector}
     */
  , getForce: abstract
});
