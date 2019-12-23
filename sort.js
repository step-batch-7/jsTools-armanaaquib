const fs = require("fs");
const getPrintableString = require("./src/getPrintableString");
const getWriter = require("./src/getWriter");

const sort = function() {
    const requiredProperties = {
        doesExist: fs.existsSync,
        reader: fs.readFileSync,
        encodingType: "utf-8",
        showError: console.error,
        showContent: console.log
    };

    const userInputs = process.argv.slice(2);

    const printableString = getPrintableString(userInputs, requiredProperties);
    const writer = getWriter(userInputs, requiredProperties);

    writer(printableString);
};

sort();
