const assert = require("chai").assert;
const { applyFileSorting, getSortedLines, showSortedContent } = require("../src/sortLib");

describe("#getSortedLines()", function() {
    it("should return sorted lines", function() {
        const lines = ["l hellow h", "aaquib", "12", "zahid khan", " zds"];
        const sortedLines = [" zds", "12", "aaquib", "l hellow h", "zahid khan"];

        assert.deepStrictEqual(getSortedLines(lines), sortedLines);
    });
});

describe("#showSortedContent()", function() {
    it("should show sorted content to output stream", function() {
        const content = "l hellow h\naaquib\n12\nzahid khan\n zds";
        const expectedSortedContent = " zds\n12\naaquib\nl hellow h\nzahid khan";

        const outputStream = function(sortedContent) {
            assert.strictEqual(sortedContent, expectedSortedContent);
        };

        showSortedContent.call({ outputStream }, "never error", content);
    });
});

describe("#applyFileSorting()", function() {
    it("should passed correct arguments and should show sorted content", function() {
        const outputStream = () => {};
        const showSortedContent = function(error, content) {
            assert.strictEqual(content, "content");
            assert.strictEqual(this.outputStream, outputStream);
        };

        const reader = function(file, encodingType, callBack) {
            assert.strictEqual(file, "fileName");
            assert.strictEqual(encodingType, "utf-8");
            callBack("never error", "content");
        };

        const requiredProperties = {
            doesExist: () => {},
            reader,
            encodingType: "utf-8",
            outputStream,
            errorStream: () => {},
            showSortedContent
        };
        applyFileSorting("fileName", requiredProperties);
    });
});
