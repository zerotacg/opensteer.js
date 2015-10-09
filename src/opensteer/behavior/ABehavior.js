if ( typeof define !== 'function' ) {
    /*jshint latedef:false */
    var define = require('amdefine')(module);
}

define(function ( require ) {
    'use strict';

    var clazz = require('../utilities').clazz;
    var apply = require('../utilities').apply;
    var abstract = require('../utilities').abstract;

    /**
     * @class Behavior
     * @abstract
     */
    return clazz({
        /**
         * @constructor
         * @param {Object} cfg
         */
        constructor: function ( cfg ) {
            apply(this, cfg);
        }

        /**
         * @return {Vector} the desired velocity
         *   length between 0 and 1
         */,
        desiredVelocity: abstract
    });
});
