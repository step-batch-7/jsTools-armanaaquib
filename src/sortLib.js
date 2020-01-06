const getSortedLines = function (lines) {
  return lines.sort();
};

const getSortedContent = function (content) {
  const lines = content.split('\n');
  const sortedLines = getSortedLines(lines);
  return sortedLines.join('\n');
};

const errors = {
  ENOENT: 'sort: No such file or directory',
  EISDIR: 'sort: Is a directory',
  EACCES: 'sort: Permission denied'
};

const sortStreamData = function (inputStream, show) {
  let content = '';

  inputStream.on('error', errorDetail => {
    let error = errors[errorDetail.code];
    if (!error) {
      error = 'sort: file access got fail';
    }

    show(error);
  });

  inputStream.on('data', chunk => {
    content += chunk;
  });

  inputStream.on('end', () => {
    const sortedContent = getSortedContent(content);
    show(undefined, sortedContent);
  });
};

const parseSortProperties = function (userInputs) {
  const emptyLength = 0;
  if (userInputs.length === emptyLength) {
    return {file: undefined};
  }

  const firstFileIndex = 0;
  return {file: userInputs[firstFileIndex]};
};

const sort = function (userInputs, streamPicker, show) {
  const options = parseSortProperties(userInputs);
  const readableStream = streamPicker.pick(options.file);

  sortStreamData(readableStream, show);
};

module.exports = {sort};
