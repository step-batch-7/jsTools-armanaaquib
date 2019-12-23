const fs = require("fs");
const assert = require("chai").assert;
const getPrintableString = require("../src/getPrintableString");

describe("#getPrintableString()", function() {
    it("should return console.error functions and error message if files is not found", function() {
        const doesExist = function(file) {
            assert.notStrictEqual(file, "fileName");
            return false;
        };

        const requiredProperties = {
            doesExist: doesExist,
            reader: () => {},
            encodingType: "utf-8",
            showError: console.error,
            showContent: console.log
        };

        const expectedValue = "sort: No such file or directory";

        assert.deepStrictEqual(getPrintableString(["worongFile"], requiredProperties), expectedValue);
    });

    it("should return console.log functions and sorted Content if files is found", function() {
        const doesExist = function(file) {
            assert.strictEqual(file, "fileName");
            return true;
        };

        const reader = function(file, encodingType) {
            assert.strictEqual(file, "fileName");
            assert.strictEqual(encodingType, "utf-8");

            return "l hellow h\naaquib\n12\nzahid khan\n zds";
        };

        const requiredProperties = {
            doesExist: doesExist,
            reader: reader,
            encodingType: "utf-8",
            showError: console.error,
            showContent: console.log
        };

        const expectedValue = " zds\n12\naaquib\nl hellow h\nzahid khan";

        assert.deepStrictEqual(getPrintableString(["fileName"], requiredProperties), expectedValue);
    });
});
