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

const onCompletion = function (error, content) {
  if (error) {
    let errorMessage = errors[error.code];
    if (!errorMessage) { errorMessage = 'sort: file access got fail'; }

    this.show({ errorMessage });
    return;
  }

  const sortedContent = getSortedContent(content);
  this.show({ sortedContent });
};

const applyFileSorting = function (options, reader, show) {
  const { file } = options;
  reader(file, 'utf-8', onCompletion.bind({ show }));
};

const applyStdInSorting = function (stdin, show) {
  let content = '';
  stdin.on('data', chunk => {
    content += chunk;
  });

  stdin.on('end', () => {
    const sortedContent = getSortedContent(content);
    show({ sortedContent });
  });
};

const parseSortProperties = function (userInputs) {
  const empty = 0;
  if (userInputs.length === empty) {
    return { file: undefined };
  }

  const firstFileIndex = 0;
  return { file: userInputs[firstFileIndex] };
};

const sort = function (userInputs, fs, stdin, show) {
  const options = parseSortProperties(userInputs);

  if (options.file) {
    const reader = fs.readFile;
    applyFileSorting(options, reader, show);
    return;
  }

  applyStdInSorting(stdin, show);
};

module.exports = { sort };

