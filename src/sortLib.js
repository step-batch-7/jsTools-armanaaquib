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

const fileSorting = function (options, createReadStream, show) {
  const {file} = options;
  const readStream = createReadStream(file);

  sortStreamData(readStream, show);
};

const stdinSorting = function (stdin, show) {
  stdin.setEncoding('utf8');
  sortStreamData(stdin, show);
};

const parseSortProperties = function (userInputs) {
  const emptyLength = 0;
  if (userInputs.length === emptyLength) {
    return {file: undefined};
  }

  const firstFileIndex = 0;
  return {file: userInputs[firstFileIndex]};
};

const sort = function (userInputs, createReadStream, stdin, show) {
  const options = parseSortProperties(userInputs);

  if (options.file) {
    fileSorting(options, createReadStream, show);
  } else {
    stdinSorting(stdin, show);
  }

};

module.exports = {sort};
