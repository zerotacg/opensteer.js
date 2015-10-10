import { expect } from "chai";
import jspm from "jspm";

let System = jspm.Loader();

describe("opensteer", function () {
    describe("behavior", function () {
        describe("Seek", function () {
            var Seek, Vector;

            beforeEach("setup", function (done) {
                Promise.all([
                    System.import("opensteer/behavior/Seek").then(module => Seek = module.default),
                    System.import("opensteer/Vector").then(module => Vector = module)
                ]).then(() => done());
            });
            describe("#constructor()", function () {
                it("should create a source and destination vector and initialize them to zero", function () {
                    var behaviour = new Seek();

                    expect(behaviour.src_pos.equals(Vector.ZERO)).to.be.true;
                    expect(behaviour.src_pos.equals(behaviour.dst_pos)).to.be.true;
                    expect(behaviour.src_pos).to.not.equal(behaviour.dst_pos);
                });
            });
        });
    });
});
