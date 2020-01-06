const {stdout, stderr, stdin} = process;
const {createReadStream} = require('fs');

const {sort} = require('./src/sortLib');
const StreamPicker = require('./src/streamPicker');

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
  const streamPicker = new StreamPicker(createReadStream, stdin);

  sort(userInputs, streamPicker, show);
};

main();
