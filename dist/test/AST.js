const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { transform } = require('../src/ASt');
describe('AST', function () {
    describe('convert wx module to my', function () {
        it('should return my()', function () {
            const code = `wx()`;
            assert.equal(`my()`);
        });
    });
});
//# sourceMappingURL=AST.js.map