import { apply } from "opensteer/utilities";

/**
 * @class opensteer.behavior.ABehavior
 * @abstract
 */
export default class ABehavior {
    /**
     * @constructor
     * @param {Object} cfg
     */
    constructor( cfg ) {
        apply(this, cfg);
    }

    /**
     * @method desiredVelocity
     * @abstract
     * @return {Vector} the desired velocity length between 0 and 1
     */
}
