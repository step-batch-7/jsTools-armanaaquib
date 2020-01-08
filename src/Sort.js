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

const sortStreamData = function (inputStream, onCompletion) {
  let content = '';

  inputStream.on('error', errorDetail => {
    let error = errors[errorDetail.code];
    if (!error) {
      error = 'sort: file access got fail';
    }

    onCompletion(error);
  });

  inputStream.on('data', chunk => {
    content += chunk;
  });

  inputStream.on('end', () => {
    onCompletion(undefined, content);
  });
};

class Sort {
  constructor (options, streamPicker) {
    this.options = options;
    this.streamPicker = streamPicker;
  }

  perform(showOutput) {
    const readableStream = this.streamPicker.pick(this.options.fileName);

    const onCompletion = (error, content) => {
      let sortedContent = undefined;

      if (!error) {
        sortedContent = getSortedContent(content);
      }

      showOutput(error, sortedContent);
    };

    sortStreamData(readableStream, onCompletion);
  }
}

module.exports = Sort;
