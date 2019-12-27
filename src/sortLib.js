const getSortedLines = function(lines) {
    return lines.sort();
};

const getSortedContent = function(content) {
    const lines = content.split("\n");
    const sortedLines = getSortedLines(lines);
    return sortedLines.join("\n");
};

const errors = {
    ENOENT: "sort: No such file or directory",
    EISDIR: "sort: Is a directory",
    EACCES: "sort: Permission denied"
};

const onCompletion = function(error, content) {
    if (error) {
        let errorMessage = errors[error.code];
        if (!errorMessage) errorMessage = "sort: file access got fail";

        this.show({ errorMessage });
        return;
    }

    const sortedContent = getSortedContent(content);
    this.show({ sortedContent });
};

const applyFileSorting = function(options, reader, show) {
    const { file } = options;
    reader(file, "utf-8", onCompletion.bind({ show }));
};

const parseSortProperties = function(userInputs) {
    return { file: userInputs[0] };
};

const sort = function(userInputs, fs, show) {
    const options = parseSortProperties(userInputs);
    const reader = fs.readFile;

    applyFileSorting(options, reader, show);
};

module.exports = { sort };
