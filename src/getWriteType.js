const getWriteType = function(requiredProperties, file) {
    const doesExist = requiredProperties.doesExist;
    const showContent = requiredProperties.showContent;
    const showError = requiredProperties.showError;

    if (doesExist(file)) {
        return showContent;
    }

    return showError;
};

module.exports = getWriteType;
