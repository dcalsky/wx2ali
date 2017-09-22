import Handler from './Handler'
import { read } from './ReadFiles'
import { save_file } from './SaveFile'

import fs = require('fs')
import p = require('path')

interface IOptions {
  entry: string,
  output: string,
  context: string
}

class Wx2ali {
  entry: string
  output: string
  context: string
  handler = new Handler()
  
  constructor(options: IOptions) {
    this.entry = options.entry
    this.context = options.context
    this.output = options.output
    this.file_handle(read(this.entry))
  }
  file_handle(files: string[]) {
    files.forEach(file_path => {
      const data =  this.handler.transform(file_path)
      save_file(data, p.relative(this.entry, file_path), this.output)
    })
  }
}
export default Wx2ali
