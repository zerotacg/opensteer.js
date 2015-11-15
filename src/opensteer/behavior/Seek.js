import ABehavior from "opensteer/behavior/ABehavior";
import Vector from "opensteer/Vector";

/**
 * @class opensteer.behavior.Seek
 * @extends opensteer.behavior.ABehavior
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
}

Seek.steer = function( src, dst, maxSpeed ) {
    var steer = Vector.sub(dst, src);
    steer = Vector.normalize(steer);

    return Vector.scale( steer, maxSpeed );
};