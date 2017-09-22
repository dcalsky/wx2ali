"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mkdirp = require('mkdirp');
// interface IMapping {
//   wxml: string,
//   wxss: string
// }
const mapping = {
    '.wxml': '.axml',
    '.wxss': '.acss'
};
function save_file(data, source_path, output) {
    const source_ext = path.extname(source_path);
    const ext = mapping[source_ext] || source_ext;
    const filename = path.basename(source_path, source_ext);
    const o = path.resolve(output, path.dirname(source_path));
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output);
    }
    if (!fs.existsSync(o)) {
        mkdirp.sync(o);
    }
    fs.writeFileSync(path.join(o, filename + ext), data);
}
exports.save_file = save_file;
//# sourceMappingURL=SaveFile.js.map