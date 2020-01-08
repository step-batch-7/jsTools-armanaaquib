const parseOptions = function (userInputs) {
  const emptyLength = 0;

  if (userInputs.length === emptyLength) {
    return {};
  }

  const firstFileIndex = 0;
  return {fileName: userInputs[firstFileIndex]};
};

module.exports = parseOptions;
