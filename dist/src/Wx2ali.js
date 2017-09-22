"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Handler_1 = require("./Handler");
const ReadFiles_1 = require("./ReadFiles");
const SaveFile_1 = require("./SaveFile");
const p = require("path");
class Wx2ali {
    constructor(options) {
        this.handler = new Handler_1.default();
        this.entry = options.entry;
        this.context = options.context;
        this.output = p.join(this.context, options.output);
        this.file_handle(ReadFiles_1.read(p.join(this.context, this.entry)));
    }
    file_handle(files) {
        files.forEach(file_path => {
            const data = this.handler.transform(p.join(this.context, this.entry, file_path));
            SaveFile_1.save_file(data, file_path, this.output);
        });
    }
}
exports.default = Wx2ali;
//# sourceMappingURL=Wx2ali.js.map