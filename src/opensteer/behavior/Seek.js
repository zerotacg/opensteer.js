import ABehavior from "opensteer/behavior/ABehavior";
import Vector from "opensteer/Vector";

/**
 * @class behavior.Seek
 * @extends behavior.ABehavior
 */
export default class Seek extends ABehavior {

    constructor() {
        super();
        this.steer = new Vector();
        this.src_pos = new Vector();
        this.dst_pos = new Vector();
    }

    desiredVelocity() {
        var steer = this.steer;
        steer.set(this.dst_pos).sub(this.src_pos).normalize();

        return steer;
    }
};
