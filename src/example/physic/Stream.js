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
     * @param {opensteer.Vector} initialPosition
     * @param {Rx.Observable<opensteer.Vector>} acceleration
     */
    position( initialPosition, acceleration ) {
        var pos = new Rx.Subject();
        var last = pos.startWith(initialPosition);
        var current = last.skip(1).startWith(initialPosition);

        this.tick
            .withLatestFrom(last, current, acceleration, this.physicsStep )
        ;
    }

    physicsStep( last, current, acceleration ) {
        var next = new Vector(current);
        next.scale(2);
        next.sub(last);
        next.add(Vector.scale(acceleration, this.dt_square));

        return next;
    }

    /**
     * @param {Rx.Observable<opensteer.Vector>} position
     */
    movement(position) {
        return position.pairwise().map(this.deltaPosition);
    }

    deltaPosition(positions) {
        var prev = positions[0];
        var next = positions[1];

        return Vector.sub( next, prev );
    }
}