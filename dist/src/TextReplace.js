"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replace(source, data, caseSensitive) {
    // TODO: caseSensitive
    data.forEach(item => {
        const reg_exp = new RegExp(item.from, 'g');
        source = source.replace(reg_exp, item.to);
    });
    return source;
}
exports.replace = replace;
//# sourceMappingURL=TextReplace.js.map