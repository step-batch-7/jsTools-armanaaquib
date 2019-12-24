const assert = require("assert");
const { getWriter, getSortedLines } = require("../src/sortLib");

describe("#getWriteType", function() {
    it("should return console.log if file is found", function() {
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

        assert.strictEqual(getWriter(["fileName"], requiredProperties), console.log);
    });

    it("should return console.error if file is found", function() {
        const doesExist = function(file) {
            return false;
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

        assert.strictEqual(getWriter(["fileName"], requiredProperties), console.error);
    });
});

describe("#getSortedLines()", function() {
    it("should return sorted lines", function() {
        const lines = ["l hellow h", "aaquib", "12", "zahid khan", " zds"];
        const sortedLines = [" zds", "12", "aaquib", "l hellow h", "zahid khan"];

        assert.deepStrictEqual(getSortedLines(lines), sortedLines);
    });
});
