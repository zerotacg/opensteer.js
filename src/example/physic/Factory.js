import Rx from "rx";
import Vector from "opensteer/Vector";

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
     */
    position( position, acceleration ) {
        var movement = position.pairwise();
        acceleration = acceleration.startWith(new Vector(0,0,0));

        return (
            this.tick
            .withLatestFrom(movement, acceleration, this.physicsStep)
        );
    }

    physicsStep( tick, movement, acceleration ) {
        var last = movement[0];
        var current = movement[1];
        var next = new Vector(current);
        next.scale(2);
        next.sub(last);
        next.add(Vector.scale(acceleration, this.dt_square));

        return next;
    }

    /**
     * @param {Rx.Observable<opensteer.Vector>} position
     */
    movement( position ) {
        return position.pairwise().map(this.deltaPosition);
    }

    deltaPosition( positions ) {
        var prev = positions[ 0 ];
        var next = positions[ 1 ];

        return Vector.sub(next, prev);
    }
}