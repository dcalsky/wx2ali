"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const walk = require('fs-walk');
const path = require('path');
function read(dir) {
    let files = [];
    walk.walkSync(dir, function (basedir, filename, stat) {
        if (!stat.isDirectory()) {
            files.push(path.join(basedir, filename));
        }
    }, function (err) {
        if (err)
            console.log(err);
    });
    return files;
}
exports.read = read;
//# sourceMappingURL=ReadFiles.js.map