import React from "react";
import Rx from "rx";

import Target from "example/component/Target";
import Vehicle from "example/component/Vehicle";
import Example from "example/Example";
import Vector from "opensteer/Vector";

export default class Seek extends Example {
    constructor() {
        super();
        this.vehicle = {};
        this.target = {};
        this.reset();
    }

    reset() {
        this.createChildren();
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
        var start = new Vector(10, 10, 0);
        var acceleration = Rx.Observable.return(new Vector(1000.0, 0, 0));
        var position = this.factory.position(start, acceleration);

        return React.createElement(Vehicle, {
            key: "vehicle",
            position
        });
    }
}