import { expect } from "chai";
import jspm from "jspm";
let System = jspm.Loader();

describe("opensteer", function () {
    let awesome;

    beforeEach("setup", function () {
        return (
            System.import("opensteer")
                .then(( module ) => {
                    awesome = module.awesome;
                })
        );
    });
    describe("#awesome", function () {
        it("should be awesome", function () {
            expect(awesome()).to.equal("awesome");
        });
    });
});
