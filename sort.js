const {stdout, stderr, stdin} = process;
const {createReadStream} = require('fs');

const parse = require('./src/parse');
const StreamPicker = require('./src/streamPicker');
const Sort = require('./src/Sort');

const showOutput = function (error, output) {
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
  const options = parse(userInputs);

  const sort = new Sort(options, streamPicker);
  sort.perform(showOutput);
};

main();
