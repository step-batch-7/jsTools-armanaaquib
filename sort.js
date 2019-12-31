const { createReadStream } = require('fs');
const { stdout, stderr } = process;
const { sort } = require('./src/sortLib');

const show = function (sortOutput) {
  if (sortOutput.sortedContent) {
    stdout.write(`${sortOutput.sortedContent}\n`);
  } else {
    stderr.write(`${sortOutput.errorMessage}\n`);
    process.exit = 2;
  }
};

const main = function () {
  const usrArgStartIndex = 2;
  const userInputs = process.argv.slice(usrArgStartIndex);

  sort(userInputs, createReadStream, process.stdin, show);
};

main();
