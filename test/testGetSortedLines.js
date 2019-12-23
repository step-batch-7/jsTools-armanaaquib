const assert = require("chai").assert;
const getSortedLines = require("../src/getSortedLines");

describe("#getSortedLines()", function() {
    it("should return sorted lines", function() {
        const lines = ["l hellow h", "aaquib", "12", "zahid khan", " zds"];
        const sortedLines = [" zds", "12", "aaquib", "l hellow h", "zahid khan"];

        assert.deepStrictEqual(getSortedLines(lines), sortedLines);
    });
});
