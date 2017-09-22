const walk = require('fs-walk');
const path = require('path');

export function read(dir: string): string[] {
  let files: string[] = []
  walk.walkSync(dir, function (basedir: string, filename: string, stat: any) {
    if (!stat.isDirectory()) {
      files.push(path.join(basedir, filename))
    }
  }, function (err) {
    if (err) console.log(err);
  });
  return files
}
