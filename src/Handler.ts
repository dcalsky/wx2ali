import { transform_config } from './TransformConfig'
import { transform_html } from './TransformHTML'
import { transform_js } from './TransformJS';
import { transform_css } from './TransformCSS'
import fs = require('fs')
import p = require('path')

class Handler {
  constructor() { }
  transform(file_path: string): Buffer {
    const ext = p.extname(file_path)
    const prev_data = fs.readFileSync(file_path).toString()
    let data: string
    switch (ext) {
      case '.json':
        data = transform_config(JSON.parse(prev_data))
        break
      case '.wxml':
        data = transform_html(prev_data)
        break
      case '.wxss':
        data = transform_css(prev_data)
        break
      case '.js':
        data = transform_js(prev_data)
        break
      default:
        data = prev_data
        break
    }
    return new Buffer(data)
  }
}

export default Handler
