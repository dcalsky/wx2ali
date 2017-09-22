"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const walk = require('fs-walk');
const path = require('path');
function read(dir) {
    let files = [];
    walk.walkSync(dir, function (basedir, filename, stat, next) {
        if (!stat.isDirectory()) {
            const relative_path = path.relative(dir, basedir);
            files.push(path.join(relative_path, filename));
        }
    }, function (err) {
        if (err)
            console.log(err);
    });
    return files;
}
exports.read = read;
//# sourceMappingURL=ReadFiles.js.map