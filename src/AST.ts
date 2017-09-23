import { transform as trans, transformFromAst } from 'babel-core'
const walk = require('babylon-walk')
import * as t from 'babel-types';
import { get_property_mapping } from './Compare';

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
    if (t.isIdentifier(node.callee)) {
      const name = node.callee.name
      node.callee.name = name === 'wx' ? 'my' : name
    } else {
      c(node.callee)
    }
  },
  MemberExpression(node, state) {
    const mappings = get_property_mapping()
    // Defaultly, this node is an identifier
    if (node.object.name === 'wx') {
      node.object.name = 'my'
      mappings.forEach(mapping => {
        if (mapping && mapping.from === node.property.name) {
          node.property.name = mapping.to
        }
      })
    }
  }
}

export function transform(code: string): string {
  const ast = trans(code).ast
  const node = walk.recursive(ast, visitors, {})
  return transformFromAst(ast).code
}
