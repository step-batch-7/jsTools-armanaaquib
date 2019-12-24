const getStreamType = function(userInputs, requiredProperties) {
    const doesExist = requiredProperties.doesExist;
    const showContent = requiredProperties.showContent;
    const showError = requiredProperties.showError;
    const file = userInputs[0];

    if (doesExist(file)) {
        return "outputStream";
    }

    return "errorStream";
};

const getSortedLines = function(lines) {
    return lines.sort();
};

module.exports = { getStreamType, getSortedLines };
