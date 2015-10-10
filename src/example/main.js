import Rx from "rx";
import Vector from "opensteer/Vector";

(function ( global ) {
    var canvas, context, subscription;

    function init() {

        var host = document.body;

        canvas = document.createElement('canvas');

        canvas.width = 512;
        canvas.height = 512;

        context = canvas.getContext('2d');

        host.appendChild(canvas);
    }

    function animate() {
        var entity = Rx.Observable.return({
            pos: { x: 0, y: 0, z: 0 },
            last: { x: 0, y: 0, z: 0 }
        });
        var physics = Rx.Observable.interval(20)
            .combineLatest(entity, physic)
        ;

        subscription = Rx.Observable.interval(0, Rx.Scheduler.requestAnimationFrame)
            .withLatestFrom(physics)
            .subscribe(draw)
        ;
    }

    var pos = new Vector();
    var last = new Vector();
    var speed = new Vector();

    function physic( tick, entity ) {
        var dt = 20;
        var f = 1/dt;
        var time = tick * dt * 0.002;
        pos.set(entity.pos);
        last.set(entity.last);

        speed.set(pos);
        speed.sub(last);
        speed.scale(f);

        entity.last = pos.toObject();
        entity.pos.x = Math.sin(time) * 192 + 256;
        entity.pos.y = Math.cos(time * 0.9) * 192 + 256;

        return entity;
    }

    function draw( frame ) {
        var tick = frame[0];
        var entity = frame[1];
        var x = entity.pos.x;
        var y = entity.pos.y;

        var color = Math.floor(Math.sin(tick * 0.02) * 100 + 120);
        context.fillStyle = 'rgb(20,20,'+color+')';
        context.beginPath();
        context.arc(x, y, 3, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    function main() {
        init();
        animate();
    }

    main();
}(window));
