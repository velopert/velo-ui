import { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeProvider'
import { getCSSVarValue } from '../lib/utils'

/**
 * Gets color HEX code from theme variable.
 * The value might not be valid on its first render.
 * It does NOT support SSR.
 * It should be only used for user interaction styles (e.g. hover, focus, active)
 */
export function useThemeVariableColor(variable: string) {
  const [color, setColor] = useState(() => getCSSVarValue(variable) || variable)
  const { theme } = useTheme()
  useEffect(() => {
    // runs after body dataset changes
    setTimeout(() => {
      const value = getCSSVarValue(variable)
      if (value !== '') {
        setColor(value)
      }
    }, 0)
  }, [color, theme, variable])

  return color
}
