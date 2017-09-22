const assert = require('assert')
const { replace } = require('../dist/TextReplace.js')

describe('text replace', function() {
  describe('single replace', function() {
    it('should return 2 when input is 1', function() {
      assert.equal('2', replace('1', [{from: '1', to: '2'}]));
    });
  });

  describe('multiple replace', function() {
    it('should return `hello ali` when input is `bye wechat`', function() {
      assert.equal('hello ali', replace('bye wechat', [
        {from: 'wechat', to: 'ali'},
        {from: 'bye', to: 'hello'}
      ]));
    });
  });

});
