import ReactDOM from "react/lib/ReactDOM";
import React from "react";
import Rx from "rx";

import Entity from "example/component/Entity";
import Vector from "opensteer/Vector";

var canvas, subscription;

main();

function main() {
    init();
    animate();
}

function init() {
    var host = document.body;
    canvas = document.createElement('div');
    host.appendChild(canvas);
}

function animate() {
    var entity = createEntityStream();
    var physics = Rx.Observable.interval(20)
        .combineLatest(entity, (tick, entity) => entity )
        .map(physicsStep)
    ;

    subscription = Rx.Observable.interval(0, Rx.Scheduler.requestAnimationFrame)
        .withLatestFrom(physics, (tick,entity) => [entity])
        .subscribe(render)
    ;
}

function createEntityStream() {
    var entity = Rx.Observable.return({
        key: "entity-1",
        pos: {
            x: 256,
            y: 0,
            z: 0
        },
        last: {
            x: 256 - 0.1,
            y: 0,
            z: 0
        }
    });

    return entity;
}

function physicsStep( entity ) {
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


var ENTITY = React.createFactory(Entity);

function render( nodes ) {
    ReactDOM.render(
        React.DOM.div(
            null,
            nodes.map( node => ENTITY(node) )
        ),
        canvas
    );
}
