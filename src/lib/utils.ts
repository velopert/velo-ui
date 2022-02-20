export function safePx(value: string | number) {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return value
}

export function getCSSVarValue(name: string) {
  if (typeof window === 'undefined') return ''
  // unwrap var()
  const style = getComputedStyle(document.body)
  const parsed = name.replace(/var\((--[^)]+)\)/, '$1')
  return style.getPropertyValue(parsed)
}
