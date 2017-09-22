"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextReplace_1 = require("./TextReplace");
const Rules = [];
function transform_css(data) {
    return TextReplace_1.replace(data, Rules);
}
exports.transform_css = transform_css;
//# sourceMappingURL=TransformCSS.js.map