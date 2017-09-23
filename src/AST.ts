import { transform as trans, transformFromAst } from 'babel-core'
const walk = require('babylon-walk')
import * as t from 'babel-types';
import { get_property_mapping } from './Compare'
import { output_log } from './Logger'
const chalk = require('chalk')

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
  // CallExpression(node, state, c) {
  //   if (t.isIdentifier(node.callee)) {
  //     const name = node.callee.name
  //     node.callee.name = name === 'wx' ? 'my' : name
  //   }
  // },
  MemberExpression(node, code) {
    const mappings = get_property_mapping()
    // Defaultly, this node is an identifier
    if (node.object.name === 'wx') {
      mappings.forEach(mapping => {
        if (!mapping.level && mapping.from === node.property.name) {
          node.property.name = mapping.to
          node.object.name = 'my'
          console.log(chalk.green((`Transform Correctly: ${node.object.name}.${node.property.name} Start: ${node.start}, end: ${node.end}\n\n\n`)))
        } else if (mapping.level && mapping.key === node.property.name) {
          console.log(chalk.red(code.slice(node.start - 50, node.end + 50)))
          console.log(((`Transform Error: Start: ${node.start}, end: ${node.end}`)))
          console.log(chalk.red('===================================================\n\n\n'))
        }
      })
    }
  }
}

function to_line_break(text: string, start: number, end: number, type = 1) {
  if (type === 1) {

  }
}

export function transform(code: string): string {
  const ast = trans(code).ast
  const node = walk.recursive(ast, visitors, code)
  return transformFromAst(ast).code
}
