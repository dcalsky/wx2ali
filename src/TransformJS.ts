import { transform } from './AST'

export function transform_js(data: string): string {
  return transform(data) 
}
