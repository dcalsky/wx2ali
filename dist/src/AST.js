"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const babel_core_1 = require("babel-core");
const walk = require('babylon-walk');
const t = require("babel-types");
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
            const name = node.callee.name;
            node.callee.name = name === 'wx' ? 'my' : name;
        }
        else {
            c(node.callee);
        }
    },
    MemberExpression(node, state) {
        // Defaultly, this node is an identifier
        if (node.object.name === 'wx') {
            node.object.name = 'my';
            if (node.property.name === 'fuck') {
                node.property.name = 'yifei';
            }
        }
    }
};
function transform(code) {
    const ast = babel_core_1.transform(code);
    const node = walk.recursive(ast, visitors, {});
    return babel_core_1.transformFromAst(ast).code;
}
exports.transform = transform;
//# sourceMappingURL=AST.js.map