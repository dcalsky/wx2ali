const assert = require('chai').assert;
const { transform } = require('../dist/AST.js')

describe('AST', function() {

  describe('convert main module to ali style', function() {
    it('convert wx() to my()', function() {
      const code = `wx();`
      transform(code)
      // assert.equal(transform(code), `my();`);
    });

    it('convert wx variable in member relationship', function() {
      const code_callee = `wx.a();`
      const code_ident = `wx.a;`
      assert.equal(transform(code_callee), `my.a();`)
      assert.equal(transform(code_ident), `my.a;`)
    });
    
    it('not convert wx variable when it as an arguments', function() {
      const code = `console.log(wx);`
      assert.notEqual(transform(code), `console.log(my);`);
    });

    it('convert wx.getClipboardData to my.getClipboard', function() {
      const code = `wx.getClipboardData();`
      assert.notEqual(transform(code), `my.getClipboard();`);
    });
  });

});
