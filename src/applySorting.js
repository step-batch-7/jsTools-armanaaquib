const { applyFileSorting } = require("./sortLib");

const applySorting = function(userInputs, requiredProperties) {
    const file = userInputs[0];

    const { doesExist, errorStream } = requiredProperties;
    if (!doesExist(file)) {
        errorStream("sort: No such file or directory");
        return;
    }

    applyFileSorting(file, requiredProperties);
};

module.exports = applySorting;
