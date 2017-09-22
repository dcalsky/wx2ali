import { transform as trans, transformFromAst } from 'babel-core'
const walk = require('babylon-walk')
import * as t from 'babel-types';

// {
//   type: 'function_name',
//   object: 'wx',
//   from: 'xx',
//   to: 'yy'
// }

// {
//   type: 'arguments_order',
//   to: [2, 1, 4, 3]
// }

// {
//   type: 'arguments_lack',
//   lack: [1, 2]
// }

// {
//   type: 'function_conflict',
//   message: 'this function is totally different between wechat and alipay'
// }

const visitors = {
  CallExpression(node, state, c) {
    // console.log(node)
    if (t.isIdentifier(node.callee)) {
      const name = node.callee.name
      node.callee.name = name === 'wx' ? 'my' : name
    } else {
      c(node.callee)
    }
  },
  MemberExpression(node, state) {
    // Defaultly, this node is an identifier
    if (node.object.name === 'wx') {
      node.object.name = 'my'
      if (node.property.name === 'fuck') {
        node.property.name = 'yifei'
      }
    }
  }
}

export function transform(code: string): string {
  const ast = trans(code).ast
  const node = walk.recursive(ast, visitors, {})
  return transformFromAst(ast).code
}
