import React from "react";
import Rx from "rx";

import Target from "example/component/Target";
import Vehicle from "example/component/Vehicle";
import Example from "example/Example";
import { ZERO, default as Vector } from "opensteer/Vector";

export default class Seek extends Example {
    constructor() {
        super();
        this.subscriptions = [];
    }

    reset() {
        this.subscriptions.map(subscription => subscription.dispose() );
        this.subscriptions = [];
        super.reset();
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
        var x = Math.random() * 620 + 10;
        var y = Math.random() * 460 + 10;
        var start = new Vector(x, y, 0);
        var position = new Rx.Subject();
        var acceleration = new Rx.Subject();
        var integration = this.factory.position(position.startWith(start, start), acceleration.startWith( ZERO ) );
        var target = Rx.Observable.return( new Vector(320, 240, 0) );

        var steering = position.withLatestFrom(target, (src, dst) => {
            var distance = Vector.sub(dst, src);
            if ( distance.length() < 1 ) {
                this.reset();
            }
            return distance.normalize().scale(10);
        });

        var subscriptions = this.subscriptions;
        subscriptions.push(integration.subscribe(position));
        subscriptions.push(steering.subscribe(acceleration));

        return React.createElement(Vehicle, {
            key: "vehicle",
            position
        });
    }
}