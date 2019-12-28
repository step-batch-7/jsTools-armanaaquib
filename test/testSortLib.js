const assert = require("chai").assert;
const { sort } = require("../src/sortLib");
const EventEmitter = require("events");

describe("#sort()", function() {
    it("should give error message if given error code for file not available", function() {
        let showCalledCount = 0;
        let readerCalledCount = 0;

        const show = function(sortOutput) {
            assert.strictEqual(sortOutput.sortedContent, undefined);
            assert.strictEqual(sortOutput.errorMessage, "sort: No such file or directory");
            showCalledCount += 1;
        };

        const reader = function(file, encodingType, callBack) {
            assert.strictEqual(file, "fileName");
            assert.strictEqual(encodingType, "utf-8");
            callBack({ code: "ENOENT" }, undefined);
            readerCalledCount += 1;
        };

        const userInputs = ["fileName"];

        sort(userInputs, { readFile: reader }, undefined, show);

        assert.strictEqual(readerCalledCount, 1);
        assert.strictEqual(showCalledCount, 1);
    });

    it("should give error message if random error code is given", function() {
        let showCalledCount = 0;
        let readerCalledCount = 0;

        const show = function(sortOutput) {
            assert.strictEqual(sortOutput.sortedContent, undefined);
            assert.strictEqual(sortOutput.errorMessage, "sort: file access got fail");
            showCalledCount += 1;
        };

        const reader = function(file, encodingType, callBack) {
            assert.strictEqual(file, "fileName");
            assert.strictEqual(encodingType, "utf-8");
            callBack({ code: "randomError" }, undefined);
            readerCalledCount += 1;
        };

        const userInputs = ["fileName"];
        sort(userInputs, { readFile: reader }, undefined, show);

        assert.strictEqual(readerCalledCount, 1);
        assert.strictEqual(showCalledCount, 1);
    });

    it("should give sorted content if content is given", function() {
        let showCalledCount = 0;
        let readerCalledCount = 0;
        const content = "lvaiju hellow h\naaquib\n12\nzahid khan\n zd";
        const expectedSortedContent = " zd\n12\naaquib\nlvaiju hellow h\nzahid khan";

        const show = function(sortOutput) {
            assert.strictEqual(sortOutput.sortedContent, expectedSortedContent);
            assert.strictEqual(sortOutput.errorMessage, undefined);
            showCalledCount += 1;
        };

        const reader = function(file, encodingType, callBack) {
            assert.strictEqual(file, "fileName");
            assert.strictEqual(encodingType, "utf-8");
            callBack(undefined, content);
            readerCalledCount += 1;
        };

        const userInputs = ["fileName"];
        sort(userInputs, { readFile: reader }, undefined, show);

        assert.strictEqual(readerCalledCount, 1);
        assert.strictEqual(showCalledCount, 1);
    });

    it("should give empty if content is empty", function() {
        let showCalledCount = 0;
        let readerCalledCount = 0;
        const content = "";
        const expectedSortedContent = "";

        const show = function(sortOutput) {
            assert.strictEqual(sortOutput.sortedContent, expectedSortedContent);
            assert.strictEqual(sortOutput.errorMessage, undefined);
            showCalledCount += 1;
        };

        const reader = function(file, encodingType, callBack) {
            assert.strictEqual(file, "fileName");
            assert.strictEqual(encodingType, "utf-8");
            callBack(undefined, content);
            readerCalledCount += 1;
        };

        const userInputs = ["fileName"];
        sort(userInputs, { readFile: reader }, undefined, show);

        assert.strictEqual(readerCalledCount, 1);
        assert.strictEqual(showCalledCount, 1);
    });

    it("should sort if file is not given", function() {
        let showCalledCount = 0;
        let content = "lvaiju hellow h\naaquib\n12\nzahid khan\n zd";
        const expectedSortedContent = " zd\n12\naaquib\nlvaiju hellow h\nzahid khan";

        const show = function(sortOutput) {
            assert.strictEqual(sortOutput.sortedContent, expectedSortedContent);
            assert.strictEqual(sortOutput.errorMessage, undefined);
            showCalledCount += 1;
        };

        const eventEmitter = new EventEmitter();
        const userInputs = [];
        sort(userInputs, undefined, eventEmitter, show);
        eventEmitter.emit("data", content);
        eventEmitter.emit("end");

        assert.strictEqual(showCalledCount, 1);
    });
});
