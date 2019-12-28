const fs = require('fs');
const { sort } = require('./src/sortLib');

const show = function (sortOutput) {
  sortOutput.sortedContent &&
    process.stdout.write(sortOutput.sortedContent + '\n');
  sortOutput.errorMessage &&
    process.stderr.write(sortOutput.errorMessage + '\n');
};

const main = function () {
  const usrArgStartIndex = 2;
  const userInputs = process.argv.slice(usrArgStartIndex);

  sort(userInputs, fs, process.stdin, show);
};

main();
