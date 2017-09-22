import { replace, IText } from './TextReplace'

const Rules: IText[] = [
  {from: 'wx:', to: 'a:'}
]

export function transform_html(data: string): string {
  return replace(data, Rules) 
}
