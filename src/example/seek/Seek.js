import React from "react";
import Rx from "rx";

import Target from "example/component/Target";
import Vehicle from "example/component/Vehicle";
import Example from "example/Example";
import Vector from "opensteer/Vector";
import SeekBehavior from "opensteer/behavior/Seek";

export default class Seek extends Example {
    constructor() {
        super();
        this.targetPosition = this.createTargetPosition();
        this.vehicleStart = new Rx.Subject();
        this.vehiclePosition = this.createVehiclePosition( this.vehicleStart, this.targetPosition );
    }

    createTargetPosition() {
        return Rx.Observable.return(new Vector(320, 240, 0));
    }

    main() {
        super.main();
        this.reset();
    }

    reset() {
        var x = Math.random() * 620 + 10;
        var y = Math.random() * 460 + 10;
        var start = new Vector(x, y, 0);
        this.vehicleStart.onNext(start);
    }

    renderChildren() {
        return [
            this.renderTarget(),
            this.renderVehicle()
        ];
    }

    renderTarget() {
        return React.createElement(Target, {
            key: "target",
            position: this.targetPosition
        });
    }

    renderVehicle() {
        return React.createElement(Vehicle, {
            key: "vehicle",
            position: this.vehiclePosition
        });
    }

    createVehiclePosition( start, target ) {
        return start.flatMap( this.createVehiclePositions.bind( this, target ) );
    }

    createVehiclePositions( target, start ) {
        var position = new Rx.Subject();
        var acceleration = new Rx.Subject();
        var integration = this.factory.verletIntegration(position, acceleration);

        var maxSpeed = Rx.Observable.return(10);
        var steering = position.withLatestFrom(target, maxSpeed, SeekBehavior.steer);
        var reset = target.combineLatest(position, Vector.sub).map(Vector.magnitude).filter(this.shouldReset).take(1).delay(750);

        integration.subscribe(position);
        steering.subscribe(acceleration);
        reset.subscribeOnNext(() => {
            position.onCompleted();
            this.reset();
        });

        position.onNext(start);

        return position;
    }

    shouldReset( distance ) {
        return distance < 20;
    }
}