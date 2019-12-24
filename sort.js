const fs = require("fs");
const getPrintableString = require("./src/getPrintableString");
const { getStreamType } = require("./src/sortLib");

const requiredProperties = {
    doesExist: fs.existsSync,
    reader: fs.readFileSync,
    encodingType: "utf-8"
};

const show = {
    outputStream: console.log,
    errorStream: console.error
};

const main = function() {
    const userInputs = process.argv.slice(2);

    const printableString = getPrintableString(userInputs, requiredProperties);
    const stream = getStreamType(userInputs, requiredProperties);

    show[stream](printableString);
};

main();
