const { getSortedLines } = require("./sortLib");

const getSortedContent = function(file, requiredProperties) {
    const reader = requiredProperties.reader;
    const encodingType = requiredProperties.encodingType;
    const fileContent = reader(file, encodingType);

    const fileLines = fileContent.split("\n");

    return getSortedLines(fileLines).join("\n");
};

const getPrintableString = function(userInputs, requiredProperties) {
    const file = userInputs[0];

    const doesExist = requiredProperties.doesExist;
    if (!doesExist(file)) {
        return (errorMessage = "sort: No such file or directory");
    }

    const sortedContent = getSortedContent(file, requiredProperties);

    return getSortedContent(file, requiredProperties);
};

module.exports = getPrintableString;
