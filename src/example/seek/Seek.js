import React from "react";
import Target from "example/component/Target";
import Vehicle from "example/component/Vehicle";
import Example from "example/Example";

export default class Seek extends Example {
    constructor() {
        super();
        this.vehicle = {};
        this.target = {};
        this.init();
    }

    init() {
        this.children = [
            this.createTarget(),
            this.createVehicle()
        ];
    }

    createTarget() {
        return React.createElement(Target, {
            key: "target",
            pos: {
                x: 320,
                y: 240
            }
        });
    }

    createVehicle() {
        return React.createElement(Vehicle, {
            key: "vehicle",
            pos: {
                x: 10,
                y: 10
            }
        });
    }
}