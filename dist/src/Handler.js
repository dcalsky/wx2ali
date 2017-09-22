"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransformConfig_1 = require("./TransformConfig");
const TransformHTML_1 = require("./TransformHTML");
const TransformJS_1 = require("./TransformJS");
const TransformCSS_1 = require("./TransformCSS");
const fs = require("fs");
const p = require("path");
class Handler {
    constructor() { }
    transform(file_path) {
        const ext = p.extname(file_path);
        const prev_data = fs.readFileSync(file_path).toString();
        let data;
        switch (ext) {
            case '.json':
                data = TransformConfig_1.transform_config(JSON.parse(prev_data));
                break;
            case '.wxml':
                data = TransformHTML_1.transform_html(prev_data);
                break;
            case '.wxss':
                data = TransformCSS_1.transform_css(prev_data);
                break;
            case '.js':
                data = TransformJS_1.transform_js(prev_data);
                break;
            default:
                data = prev_data;
                break;
        }
        return new Buffer(data);
    }
}
exports.default = Handler;
//# sourceMappingURL=Handler.js.map