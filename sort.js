const { createReadStream } = require('fs');
const { stdout, stderr, stdin } = process;
const { sort } = require('./src/sortLib');

const show = function (error, output) {
  if (error) {
    stderr.write(`${error}\n`);
    process.exit = 2;
    return;
  }
  stdout.write(`${output}\n`);
};

const main = function () {
  const usrArgStartIndex = 2;
  const userInputs = process.argv.slice(usrArgStartIndex);

  sort(userInputs, { createReadStream, stdin }, show);
};

main();
