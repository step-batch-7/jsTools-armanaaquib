const assert = require("chai").assert;
const { sort } = require("../src/sortLib");

describe("#sort()", function() {
    it("should give error message if error code for file not available given", function() {
        const show = function(sortOutput) {
            assert.strictEqual(sortOutput.sortedContent, undefined);
            assert.strictEqual(sortOutput.errorMessage, "sort: No such file or directory");
        };

        const reader = function(file, encodingType, callBack) {
            assert.strictEqual(file, "fileName");
            assert.strictEqual(encodingType, "utf-8");
            callBack({ code: "ENOENT" }, undefined);
        };

        const userInputs = ["fileName"];

        sort(userInputs, { readFile: reader }, show);
    });

    it("should give sorted content if content is given", function() {
        const content = "l hellow h\naaquib\n12\nzahid khan\n zds";
        const expectedSortedContent = " zds\n12\naaquib\nl hellow h\nzahid khan";

        const show = function(sortOutput) {
            assert.strictEqual(sortOutput.sortedContent, expectedSortedContent);
            assert.strictEqual(sortOutput.errorMessage, undefined);
        };

        const reader = function(file, encodingType, callBack) {
            assert.strictEqual(file, "fileName");
            assert.strictEqual(encodingType, "utf-8");
            callBack(undefined, content);
        };

        const userInputs = ["fileName"];
        sort(userInputs, { readFile: reader }, show);
    });
});
