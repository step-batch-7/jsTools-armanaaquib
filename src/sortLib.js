const getSortedLines = function(lines) {
    return lines.sort();
};

const showSortedContent = function(error, content) {
    const lines = content.split("\n");
    const sortedLines = getSortedLines(lines);
    const sortedContent = sortedLines.join("\n");
    this.outputStream(sortedContent);
};

const applyFileSorting = function(file, requiredProperties) {
    const { reader, encodingType, outputStream, showSortedContent } = requiredProperties;

    reader(file, encodingType, showSortedContent.bind({ outputStream }));
};

module.exports = { applyFileSorting, getSortedLines, showSortedContent };
