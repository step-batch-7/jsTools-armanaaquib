const assert = require("chai").assert;
const { sort } = require("../src/sortLib");

describe("#sort()", function() {
    it("should give error message if given error code for file not available", function() {
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

    it("should give error message if random error code is given", function() {
        const show = function(sortOutput) {
            assert.strictEqual(sortOutput.sortedContent, undefined);
            assert.strictEqual(sortOutput.errorMessage, "sort: file access got fail");
        };

        const reader = function(file, encodingType, callBack) {
            assert.strictEqual(file, "fileName");
            assert.strictEqual(encodingType, "utf-8");
            callBack({ code: "randomError" }, undefined);
        };

        const userInputs = ["fileName"];

        sort(userInputs, { readFile: reader }, show);
    });

    it("should give sorted content if content is given", function() {
        const content = "lvaiju hellow h\naaquib\n12\nzahid khan\n zd";
        const expectedSortedContent = " zd\n12\naaquib\nlvaiju hellow h\nzahid khan";

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

    it("should give empty if content is empty", function() {
        const content = "";
        const expectedSortedContent = "";

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
