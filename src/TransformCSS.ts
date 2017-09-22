import { replace, IText } from './TextReplace'

const Rules: IText[] = [

]

export function transform_css(data: string): string {
  return replace(data, Rules) 
}
