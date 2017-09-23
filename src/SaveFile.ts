import fs = require('fs')
import path = require('path')
const mkdirp = require('mkdirp')
const mapping: any = {
  '.wxml': '.axml',
  '.wxss': '.acss'
}

export function save_file(data: Buffer|string, file_relative_path: string, output: string) {
  let ext = path.extname(file_relative_path)
  const dirname = path.dirname(path.join(output, file_relative_path))
  mkdirp.sync(dirname)
  const filename = path.basename(file_relative_path, ext)
  ext = mapping[ext] || ext
  fs.writeFileSync(path.join(dirname, filename + ext), data)
}
