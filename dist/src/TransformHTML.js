"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextReplace_1 = require("./TextReplace");
const Rules = [
    { from: 'wx:', to: 'a:' }
];
function transform_html(data) {
    return TextReplace_1.replace(data, Rules);
}
exports.transform_html = transform_html;
//# sourceMappingURL=TransformHTML.js.map