const assert = require('assert')
const fs = require('fs')
const path = require('path')
const { save_file } = require('../dist/SaveFile.js')

describe('save file', function() {
  describe('file save', function() {
    it('should generate file1.axml', function() {
      const resource_path = path.join(__dirname, './example-files/file1.wxml')
      const output_path = path.join(__dirname, './example-files/')
      save_file(fs.readFileSync(resource_path), './file1.wxml', output_path)
      assert.equal(true, fs.existsSync(path.join(__dirname, './example-files/file1.axml')));
    });
  });
});
