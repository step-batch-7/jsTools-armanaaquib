const assert = require('chai').assert;
const sinon = require('sinon');
const Sort = require('../src/Sort');

describe('#Sort', function () {
  describe('#perform()', function () {

    let calledCount;
    let startIndex;
    let secondIndex;
    before(function () {
      calledCount = 1;
      startIndex = 0;
      secondIndex = 1;
    });

    let showCalledCount;
    let on;
    let pick;
    let streamPicker;
    beforeEach(function () {
      showCalledCount = 0;
      on = sinon.fake();
      pick = sinon.stub();
      streamPicker = {pick};
    });

    const testMessage =
      'should give error message if given error code for file not available';
    it(testMessage, function () {
      const show = function (error, output) {
        assert.strictEqual(error, 'sort: No such file or directory');
        assert.strictEqual(output, undefined);
        showCalledCount++;
      };

      const createReadStream = function (file) {
        assert.strictEqual(file, 'fileName');
        return {on};
      };

      pick.withArgs('fileName').returns(createReadStream('fileName'));

      const options = {fileName: 'fileName'};
      const sort = new Sort(options, streamPicker);
      sort.perform(show);

      assert.equal(on.firstCall.args[startIndex], 'error');
      on.firstCall.args[secondIndex]({code: 'ENOENT'});

      assert.strictEqual(showCalledCount, calledCount);
    });

    it('should give error message if random error code is given', function () {
      const show = function (error, output) {
        assert.strictEqual(error, 'sort: file access got fail');
        assert.strictEqual(output, undefined);
        showCalledCount++;
      };

      const createReadStream = function (file) {
        assert.strictEqual(file, 'fileName');
        return {on};
      };

      pick.withArgs('fileName').returns(createReadStream('fileName'));

      const options = {fileName: 'fileName'};
      const sort = new Sort(options, streamPicker);
      sort.perform(show);

      assert.equal(on.firstCall.args[startIndex], 'error');
      on.firstCall.args[secondIndex]({code: 'random'});

      assert.strictEqual(showCalledCount, calledCount);
    });

    it('should give sorted content if content is given', function () {
      const content = 'lion hellow h\naaquib\n12\nzahid khan\n zd';
      const expectedSortedContent =
        ' zd\n12\naaquib\nlion hellow h\nzahid khan';

      const show = function (error, output) {
        assert.strictEqual(error, undefined);
        assert.strictEqual(output, expectedSortedContent);
        showCalledCount++;
      };

      const createReadStream = function (file) {
        assert.strictEqual(file, 'fileName');
        return {on};
      };

      pick.withArgs('fileName').returns(createReadStream('fileName'));

      const options = {fileName: 'fileName'};
      const sort = new Sort(options, streamPicker);
      sort.perform(show);

      assert.equal(on.firstCall.args[startIndex], 'error');

      assert.equal(on.secondCall.args[startIndex], 'data');
      on.secondCall.args[secondIndex](content);

      assert.equal(on.thirdCall.args[startIndex], 'end');
      on.thirdCall.args[secondIndex]();

      assert.strictEqual(showCalledCount, calledCount);

    });

    it('should give empty if content is empty', function () {
      const content = '';
      const expectedSortedContent = '';

      const show = function (error, output) {
        assert.strictEqual(error, undefined);
        assert.strictEqual(output, expectedSortedContent);
        showCalledCount++;
      };

      const createReadStream = function (file) {
        assert.strictEqual(file, 'fileName');
        return {on};
      };

      pick.withArgs('fileName').returns(createReadStream('fileName'));

      const options = {fileName: 'fileName'};
      const sort = new Sort(options, streamPicker);
      sort.perform(show);

      assert.equal(on.firstCall.args[startIndex], 'error');

      assert.equal(on.secondCall.args[startIndex], 'data');
      on.secondCall.args[secondIndex](content);

      assert.equal(on.thirdCall.args[startIndex], 'end');
      on.thirdCall.args[secondIndex]();

      assert.strictEqual(showCalledCount, calledCount);
    });

    it('should sort stdin content if file is not given', function (done) {
      const setEncoding = sinon.fake();

      const content = 'lion hellow h\naaquib\n12\nzahid khan\n zd';
      const expectedSortedContent =
        ' zd\n12\naaquib\nlion hellow h\nzahid khan';

      const show = function (error, output) {
        assert.strictEqual(error, undefined);
        assert.strictEqual(output, expectedSortedContent);
        showCalledCount++;
        done();
      };

      const stdin = {setEncoding, on};
      pick.withArgs().returns(stdin);

      const options = {};
      const sort = new Sort(options, streamPicker);
      sort.perform(show);

      assert.equal(on.firstCall.args[startIndex], 'error');

      assert.equal(on.secondCall.args[startIndex], 'data');
      on.secondCall.args[secondIndex](content);

      assert.equal(on.thirdCall.args[startIndex], 'end');
      on.thirdCall.args[secondIndex]();
    });

  });

});
