import { expect } from "chai";
import jspm from "jspm";
import Rx from "rx";

var System = jspm.Loader();

describe("example", function () {
    describe("physic", function () {
        describe("Stream", function () {
            var Stream;
            var Vector;

            beforeEach("setup", function ( done ) {
                var imports = [
                    "example/physic/Stream",
                    "opensteer/Vector"
                ];
                Promise.all( imports.map( path => System.import(path) ) )
                    .then(modules => {
                        Stream = modules[0].default;
                        Vector = modules[1].default;
                    })
                    .then(done, done);
            });

            describe("#movement()", function () {
                var factory;
                beforeEach("setup", function () {
                    factory = new Stream();
                });

                it("should return an observable", function () {
                    var position = Rx.Observable.return(new Vector());

                    expect(factory.movement(position)).to.be.an.instanceOf(Rx.Observable);
                });

                it("should the distance between 2 consecutive positions", function (done) {
                    var position = Rx.Observable.fromArray([
                        new Vector(1,2,3),
                        new Vector(3,2,1)
                    ]);

                    var movement = factory.movement(position);
                    movement.subscribeOnError(done);
                    movement.subscribeOnNext(movement => {
                        expect(movement.toObject()).to.deep.equal({ x: 2, y: 0, z: -2 });
                        done();
                    });
                });
            });
        });
    });
});
