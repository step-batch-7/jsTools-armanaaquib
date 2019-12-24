const assert = require("chai").assert;
const applySorting = require("../src/applySorting");
const { showSortedContent } = require("../src/sortLib");

describe("#getPrintableString()", function() {
    it("should show error message if file is not found", function() {
        const doesExist = function(file) {
            assert.notStrictEqual(file, "fileName");
            return false;
        };

        const errorStream = function(errorMessage) {
            assert.strictEqual(errorMessage, "sort: No such file or directory");
        };

        const requiredProperties = {
            doesExist: doesExist,
            reader: () => {},
            encodingType: "utf-8",
            errorStream,
            outputStream: console.log,
            showSortedContent: () => {}
        };

        applySorting(["unavailable file"], requiredProperties);
    });

    it("should show sorted Content if file is found", function() {
        const doesExist = function(file) {
            assert.strictEqual(file, "fileName");
            return true;
        };

        const reader = function(file, encodingType, callBack) {
            callBack("never error", "l hellow h\naaquib\n12\nzahid khan\n zds");
        };

        const expectedSortedContent = " zds\n12\naaquib\nl hellow h\nzahid khan";
        const outputStream = function(sortedContent) {
            assert.strictEqual(sortedContent, expectedSortedContent);
        };

        const requiredProperties = {
            doesExist: doesExist,
            reader: reader,
            encodingType: "utf-8",
            showError: console.error,
            outputStream,
            showSortedContent
        };

        applySorting(["fileName"], requiredProperties);
    });
});
