const fs = require("fs");
const getSortedLines = require("./getSortedLines");

const getSortedContent = function(file, requiredProperties) {
    const reader = requiredProperties.reader;
    const encodingType = requiredProperties.encodingType;
    const fileContent = reader(file, encodingType);

    const fileLines = fileContent.split("\n");

    return getSortedLines(fileLines).join("\n");
};

const getSortedContentAndWriteType = function(userInputs, requiredProperties) {
    const file = userInputs[0];

    const doesExist = requiredProperties.doesExist;
    const showError = requiredProperties.showError;
    if (!doesExist(file)) {
        const errorMessage = "sort: No such file or directory";
        return { type: requiredProperties.showError, printableString: errorMessage };
    }

    const sortedContent = getSortedContent(file, requiredProperties);

    return { type: requiredProperties.showContent, printableString: sortedContent };
};

module.exports = getSortedContentAndWriteType;
