"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mkdirp = require('mkdirp');
const mapping = {
    '.wxml': '.axml',
    '.wxss': '.acss'
};
function save_file(data, file_relative_path, output) {
    let ext = path.extname(file_relative_path);
    const dirname = path.dirname(path.join(output, file_relative_path));
    mkdirp(dirname);
    const filename = path.basename(file_relative_path, ext);
    ext = mapping[ext] || ext;
    console.log(filename);
    fs.writeFileSync(path.join(dirname, filename + ext), data);
}
exports.save_file = save_file;
//# sourceMappingURL=SaveFile.js.map