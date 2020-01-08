const assert = require('chai').assert;
const parseOptions = require('../src/parseOptions');

describe('#parseOptions()', function () {

  it('should return file in options if file is given', function () {
    assert.deepStrictEqual(parseOptions(['fileName']), {fileName: 'fileName'});
  });

  it('should return options without if file is not given', function () {
    assert.deepStrictEqual(parseOptions([]), {});
  });

});
