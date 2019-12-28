const fs = require("fs");
const { sort } = require("./src/sortLib");

const show = function(sortOutput) {
    sortOutput.sortedContent && console.log(sortOutput.sortedContent);
    sortOutput.errorMessage && console.error(sortOutput.errorMessage);
};

const main = function() {
    const userInputs = process.argv.slice(2);

    sort(userInputs, fs, process.stdin, show);
};

main();
