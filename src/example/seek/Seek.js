import React from "react";
import Rx from "rx";

import Target from "example/component/Target";
import Vehicle from "example/component/Vehicle";
import Example from "example/Example";
import { ZERO, default as Vector } from "opensteer/Vector";

export default class Seek extends Example {
    constructor() {
        super();
    }

    createChildren() {
        return [
            this.createTarget(),
            this.createVehicle()
        ];
    }

    createTarget() {
        var position = Rx.Observable.return({
            x: 320,
            y: 240
        });

        return React.createElement(Target, {
            key: "target",
            position
        });
    }

    createVehicle() {
        var x = Math.random() * 640;
        var y = Math.random() * 480;
        var start = new Vector(x, y, 0);
        var position = new Rx.Subject();
        var acceleration = new Rx.Subject();
        var integration = this.factory.position(position.startWith(start, start), acceleration.startWith( ZERO ) );
        var target = Rx.Observable.return( new Vector(320, 240, 0) );

        var steering = position.withLatestFrom(target, (src, dst) => {
            return Vector.sub(dst, src).normalize().scale(10);
        });

        position.withLatestFrom(target, (src, dst) => {
            var distance = Vector.sub(dst, src).length();
            if ( distance < 20 ) {
                this.reset();
            }
        }).publish().connect();

        integration.subscribe(position);
        steering.subscribe(acceleration);

        return React.createElement(Vehicle, {
            key: "vehicle",
            position
        });
    }
}