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
        const errorMessage = errors[error.code];
        this.show({ sortedContent: undefined, errorMessage });
    }
    if (content) {
        const sortedContent = getSortedContent(content);
        this.show({ sortedContent, errorMessage: undefined });
    }
};

const applyFileSorting = function(sortingDetails, reader, show) {
    const { file } = sortingDetails;
    reader(file, "utf-8", onCompletion.bind({ show }));
};

const parseSortProperties = function(userInputs) {
    return { file: userInputs[0] };
};

const sort = function(userInputs, fs, show) {
    const sortingDetails = parseSortProperties(userInputs);
    const reader = fs.readFile;

    applyFileSorting(sortingDetails, reader, show);
};

module.exports = { sort };
