import Rx from "rx";
import { ZERO, default as Vector } from "opensteer/Vector";

export default class Factory {

    constructor() {
        var dt_in_ms = 20;
        var dt_in_s = dt_in_ms / 1000;
        this.dt_square = dt_in_s * dt_in_s;
        this.tick = Rx.Observable.interval(dt_in_ms);
        this.physicsStep = this.physicsStep.bind(this);
    }

    /**
     * @param {Rx.Observable<opensteer.Vector>} position
     * @param {Rx.Observable<opensteer.Vector>} acceleration
     * @return {Rx.Observable<opensteer.Vector>}
     */
    verletIntegration( position, acceleration ) {
        var movement = this.movement(position);
        acceleration = acceleration.startWith(ZERO);

        return (
            this.tick
                .withLatestFrom(movement, acceleration, this.physicsStep)
        );
    }

    /**
     * @param {Rx.Observable<opensteer.Vector>} position
     * @return {Rx.Observable<opensteer.Vector[2]>} position
     */
    movement( position ) {
        return position.merge(position.take(1)).pairwise();
    }

    /**
     *
     * @param tick
     * @param {Rx.Observable<opensteer.Vector[2]>} movement
     * @param {Rx.Observable<opensteer.Vector>} acceleration
     * @returns {*}
     */
    physicsStep( tick, movement, acceleration ) {
        var previous = movement[ 0 ];
        var current = movement[ 1 ];
        var next;

        next = Vector.scale(current, 2);
        next = Vector.sub(next, previous);
        acceleration = Vector.scale(acceleration, this.dt_square);
        next = Vector.add(next, acceleration);

        return next;
    }

}