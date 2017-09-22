"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextReplace_1 = require("./TextReplace");
const Rules = [
    { from: 'wx.', to: 'my.' }
];
function transform_js(data) {
    return TextReplace_1.replace(data, Rules);
}
exports.transform_js = transform_js;
//# sourceMappingURL=TransformJS.js.map