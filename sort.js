const fs = require("fs");
const getSortedContentAndWriteType = require("./src/getSortedContentAndWriteType.js");

const sort = function() {
    const requiredProperties = {
        doesExist: fs.existsSync,
        reader: fs.readFileSync,
        encodingType: "utf-8",
        showError: console.error,
        showContent: console.log
    };

    const userInputs = process.argv.slice(2);
    const write = getSortedContentAndWriteType(userInputs, requiredProperties);

    write.type(write.printableString);
};

sort();
