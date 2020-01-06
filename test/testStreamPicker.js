const assert = require('assert');
const {stub} = require('sinon');
const StreamPicker = require('../src/streamPicker.js');

describe('streamPicker', function () {
  const createReadStream = stub();
  const stdin = {};

  let streamPicker;
  beforeEach(() => {
    streamPicker = new StreamPicker(createReadStream, stdin);
  });

  it('should create read stream when file path is given', function () {
    const myFileStream = {};
    createReadStream.withArgs('myFile').returns(myFileStream);

    assert.strictEqual(streamPicker.pick('myFile'), myFileStream);
  });

  it('should give stdin when file path is not given', function () {
    assert.strictEqual(streamPicker.pick(), stdin);
  });
});

