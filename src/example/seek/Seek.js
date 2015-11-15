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
        this.subscriptions = [];
        this.reset = this.reset.bind(this);
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
        var integration = this.factory.position(position, acceleration );
        var target = Rx.Observable.return( new Vector(320, 240, 0) );

        var maxSpeed = Rx.Observable.return( 10 );
        var steering = position.withLatestFrom(target, maxSpeed, SeekBehavior.steer);
        var reset = target.combineLatest(position, Vector.sub).map(Vector.magnitude).filter(this.shouldReset);

        var subscriptions = this.subscriptions;
        subscriptions.push(integration.subscribe(position));
        subscriptions.push(steering.subscribe(acceleration));
        subscriptions.push(reset.delay(750).subscribeOnNext( this.reset ));

        position.onNext(start);

        return React.createElement(Vehicle, {
            key: "vehicle",
            position
        });
    }

    shouldReset( distance ) {
        return distance < 20;
    }
}