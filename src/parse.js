const parse = function (userInputs) {
  const emptyLength = 0;

  if (userInputs.length === emptyLength) {
    return {};
  }

  const firstFileIndex = 0;
  return {file: userInputs[firstFileIndex]};
};

module.exports = parse;
