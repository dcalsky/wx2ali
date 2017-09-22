export interface IText {
  from: string,
  to: string
}

export function replace(source: string, data: IText[], caseSensitive?: true): string {
  // TODO: caseSensitive
  data.forEach(item => {
    const reg_exp = new RegExp(item.from, 'g')
    source = source.replace(reg_exp, item.to)
  })
  return source
}
