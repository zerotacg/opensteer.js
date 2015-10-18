import Rx from "rx";
import Vector from "opensteer/Vector";

export default class Factory {

    constructor() {
        this.dt = 20;
        this.dt_square = this.dt * this.dt;
        this.tick = Rx.Observable.interval(20);
    }

    /**
     * @param {Rx.Observable<opensteer.Vector>} acceleration
     * @param {opensteer.Vector} initialPosition
     */
    position(acceleration,  initialPosition) {
        this.tick
            .withLatestFrom(entity, (tick, entity) => entity )
        ;

        acceleration.map(this.scaleAcceleration);
    }

    scaleAcceleration(acceleration) {
        return Vector.scale(acceleration, this.dt_square);
    }

    physicsStep( entity ) {
        var pos = new Vector(entity.pos);
        var last = new Vector(entity.last || entity.pos);

        entity.last = pos.toObject();

        var speed = new Vector(pos);
        speed.sub(last);
        var force = new Vector(256, 256, 0);
        force.sub(pos);
        force.normalize();
        force.scale(0.001);
        speed.add(force);

        pos.add(speed);
        entity.pos = pos.toObject();

        return entity;
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