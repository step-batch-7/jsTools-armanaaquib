const getWriter = function(userInputs, requiredProperties) {
    const doesExist = requiredProperties.doesExist;
    const showContent = requiredProperties.showContent;
    const showError = requiredProperties.showError;
    const file = userInputs[0];

    if (doesExist(file)) {
        return showContent;
    }

    return showError;
};

module.exports = getWriter;
