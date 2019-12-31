const assert = require('chai').assert;
const { sort } = require('../src/sortLib');
const sinon = require('sinon');

describe('#sort()', function () {
  const calledCount = 1;
  const startIndex = 0;
  const secondIndex = 1;

  const testMessage =
    'should give error message if given error code for file not available';
  it(testMessage, function () {
    let showCalledCount = 0;
    const on = sinon.fake();

    const show = function (sortOutput) {
      assert.strictEqual(sortOutput.sortedContent, undefined);
      assert.strictEqual(
        sortOutput.errorMessage,
        'sort: No such file or directory'
      );
      showCalledCount++;
    };

    const createReadStream = function (file) {
      assert.strictEqual(file, 'fileName');
      return { on };
    };

    const userInputs = ['fileName'];
    sort(userInputs, createReadStream, undefined, show);

    assert.equal(on.firstCall.args[startIndex], 'error');
    on.firstCall.args[secondIndex]({ code: 'ENOENT' });

    assert.strictEqual(showCalledCount, calledCount);
  });

  it('should give error message if random error code is given', function () {
    let showCalledCount = 0;
    const on = sinon.fake();

    const show = function (sortOutput) {
      assert.strictEqual(sortOutput.sortedContent, undefined);
      assert.strictEqual(sortOutput.errorMessage, 'sort: file access got fail');
      showCalledCount++;
    };

    const createReadStream = function (file) {
      assert.strictEqual(file, 'fileName');
      return { on };
    };

    const userInputs = ['fileName'];
    sort(userInputs, createReadStream, undefined, show);

    assert.equal(on.firstCall.args[startIndex], 'error');
    on.firstCall.args[secondIndex]({ code: 'random' });

    assert.strictEqual(showCalledCount, calledCount);
  });

  /*eslint-disable max-statements*/
  it('should give sorted content if content is given', function () {
    let showCalledCount = 0;
    const on = sinon.fake();

    const content = 'lion hellow h\naaquib\n12\nzahid khan\n zd';
    const expectedSortedContent =
      ' zd\n12\naaquib\nlion hellow h\nzahid khan';

    const show = function (sortOutput) {
      assert.strictEqual(sortOutput.sortedContent, expectedSortedContent);
      assert.strictEqual(sortOutput.errorMessage, undefined);
      showCalledCount++;
    };

    const createReadStream = function (file) {
      assert.strictEqual(file, 'fileName');
      return { on };
    };

    const userInputs = ['fileName'];
    sort(userInputs, createReadStream, undefined, show);

    assert.equal(on.firstCall.args[startIndex], 'error');

    assert.equal(on.secondCall.args[startIndex], 'data');
    on.secondCall.args[secondIndex](content);

    assert.equal(on.thirdCall.args[startIndex], 'end');
    on.thirdCall.args[secondIndex]();

    assert.strictEqual(showCalledCount, calledCount);
  });

  it('should give empty if content is empty', function () {
    let showCalledCount = 0;
    const on = sinon.fake();

    const content = '';
    const expectedSortedContent = '';

    const show = function (sortOutput) {
      assert.strictEqual(sortOutput.sortedContent, expectedSortedContent);
      assert.strictEqual(sortOutput.errorMessage, undefined);
      showCalledCount++;
    };

    const createReadStream = function (file) {
      assert.strictEqual(file, 'fileName');
      return { on };
    };

    const userInputs = ['fileName'];
    sort(userInputs, createReadStream, undefined, show);

    assert.equal(on.firstCall.args[startIndex], 'error');

    assert.equal(on.secondCall.args[startIndex], 'data');
    on.secondCall.args[secondIndex](content);

    assert.equal(on.thirdCall.args[startIndex], 'end');
    on.thirdCall.args[secondIndex]();

    assert.strictEqual(showCalledCount, calledCount);

  });

  it('should sort stdin content if file is not given', function () {
    let showCalledCount = 0;
    const setEncoding = sinon.fake();
    const on = sinon.fake();

    const content = 'lion hellow h\naaquib\n12\nzahid khan\n zd';
    const expectedSortedContent =
      ' zd\n12\naaquib\nlion hellow h\nzahid khan';

    const show = function (sortOutput) {
      assert.strictEqual(sortOutput.sortedContent, expectedSortedContent);
      assert.strictEqual(sortOutput.errorMessage, undefined);
      showCalledCount++;
    };

    const stdin = { setEncoding, on };

    const userInputs = [];
    sort(userInputs, undefined, stdin, show);

    assert.equal(on.firstCall.args[startIndex], 'error');

    assert.equal(on.secondCall.args[startIndex], 'data');
    on.secondCall.args[secondIndex](content);

    assert.equal(on.thirdCall.args[startIndex], 'end');
    on.thirdCall.args[secondIndex]();

    assert.strictEqual(showCalledCount, calledCount);
  });

});
