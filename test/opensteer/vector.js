import { expect } from "chai";

import jspm from "jspm";

let System = jspm.Loader();

describe("opensteer", function () {
    describe("Vector", function () {
        var Vector, ZERO;

        beforeEach("setup", function (done) {
            System.import("opensteer/Vector")
                .then(module => {
                    Vector = module.default;
                    ZERO = module.ZERO;
                })
                .then(done)
            ;
        });

        describe("#constructor()", function () {
            it("should initialize the components with zero", function () {
                var v = new Vector();

                expect(v.x).to.equal(0);
                expect(v.y).to.equal(0);
                expect(v.z).to.equal(0);
            });
        });

        describe("#constructor(number, number, number)", function () {
            it("should initialize with given values", function () {
                var v = new Vector(1, 2, 3);

                expect(v.x).to.equal(1);
                expect(v.y).to.equal(2);
                expect(v.z).to.equal(3);
            });
        });

        describe("#constructor(Object)", function () {
            it("should initialize with given values", function () {
                var v = new Vector({ x: 1, y: 2, z: 3 });

                expect(v.x).to.equal(1);
                expect(v.y).to.equal(2);
                expect(v.z).to.equal(3);
            });
        });

        describe("#equals", function () {
            context("when all components of the other vector are equal", function () {
                it("should should return true", function () {
                    var v = new Vector();
                    expect(ZERO.equals(v)).to.be.true;
                });
            });
        });
    });
});
