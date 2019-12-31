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

  inputStream.on('error', error => {
    let errorMessage = errors[error.code];
    if (!errorMessage) { errorMessage = 'sort: file access got fail'; }

    show({ errorMessage });
  });

  inputStream.on('data', chunk => {
    content += chunk;
  });

  inputStream.on('end', () => {
    const sortedContent = getSortedContent(content);
    show({ sortedContent });
  });
};

const fileSorting = function (options, createReadStream, show) {
  const { file } = options;
  const inputStream = createReadStream(file);

  sortStreamData(inputStream, show);
};

const stdinSorting = function (stdin, show) {
  stdin.setEncoding('utf8');
  sortStreamData(stdin, show);
};

const parseSortProperties = function (userInputs) {
  const empty = 0;
  if (userInputs.length === empty) {
    return { file: undefined };
  }

  const firstFileIndex = 0;
  return { file: userInputs[firstFileIndex] };
};

const sort = function (userInputs, createReadStream, stdin, show) {
  const options = parseSortProperties(userInputs);

  if (options.file) {
    fileSorting(options, createReadStream, show);
  } else {
    stdinSorting(stdin, show);
  }
};

module.exports = { sort };
