const fs = require("fs");
const applySorting = require("./src/applySorting");
const { showSortedContent } = require("./src/sortLib");

const requiredProperties = {
    doesExist: fs.existsSync,
    reader: fs.readFile,
    encodingType: "utf-8",
    outputStream: console.log,
    errorStream: console.error,
    showSortedContent
};

const main = function() {
    const userInputs = process.argv.slice(2);

    applySorting(userInputs, requiredProperties);
};

main();
