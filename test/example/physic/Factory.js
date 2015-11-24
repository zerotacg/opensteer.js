import { expect } from "chai";
import jspm from "jspm";
import Rx from "rx";

var System = jspm.Loader();

describe("example", function () {
    describe("physic", function () {
        describe("Factory", function () {
            var Factory;
            var Vector;
            var scheduler;

            beforeEach("setup", function ( done ) {
                var imports = [
                    "example/physic/Factory",
                    "opensteer/Vector"
                ];
                Promise.all( imports.map( path => System.import(path) ) )
                    .then(modules => {
                        Factory = modules[0].default;
                        Vector = modules[1].default;

                        scheduler = new Rx.TestScheduler();
                    })
                    .then(done, done);
            });

            describe("#movement()", function () {
                var factory;
                beforeEach("setup", function () {
                    factory = new Factory();
                });

                it("should return an observable", function () {
                    var position = Rx.Observable.return(new Vector());

                    expect(factory.movement(position)).to.be.an.instanceOf(Rx.Observable);
                });

                it("should duplicate the first position", function () {
                    var onNext = Rx.ReactiveTest.onNext;
                    var position = scheduler.createColdObservable(
                        onNext(100, new Vector(1,2,3) ),
                        onNext(200, new Vector(3,2,1) )
                    );

                    var movement = factory.movement(position);
                    var messages = scheduler.startScheduler(() => movement).messages;

                    expect(messages).to.have.length(2);
                    expect(messages[0].toString()).to.equal("OnNext({ x: 1, y: 2, z: 3},{ x: 1, y: 2, z: 3})@300");
                    expect(messages[1].toString()).to.equal("OnNext({ x: 1, y: 2, z: 3},{ x: 3, y: 2, z: 1})@400");
                });
            });
        });
    });
});
