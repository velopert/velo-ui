import { css, Global } from '@emotion/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
}

type Theme = 'light' | 'dark' | 'default'
const ThemeContext =
  createContext<{ theme: Theme; setTheme(theme: Theme): void } | null>(null)

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'default'>('default')

  useEffect(() => {
    if (theme === 'default') return
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
      <Global styles={styles} />
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return value
}

export type ColorKey =
  | 'background'
  | 'background-secondary'
  | 'accent-0'
  | 'accent-1'
  | 'accent-2'
  | 'accent-3'
  | 'accent-4'
  | 'accent-5'
  | 'accent-6'
  | 'accent-7'
  | 'accent-8'
  | 'accent-9'
  | 'foreground'

export const cssVar = (key: ColorKey) => `var(--${key})`

const lightTheme = css`
  --background: #ffffff;
  --background-secondary: #fafafa;
  --accent-0: #ffffff;
  --accent-1: #fafafa;
  --accent-2: #f5f5f5;
  --accent-3: #eeeeee;
  --accent-4: #e0e0e0;
  --accent-5: #9e9e9e;
  --accent-6: #757575;
  --accent-7: #616161;
  --accent-8: #424242;
  --accent-9: #212121;
  --foreground: #121212;
`

const darkTheme = css`
  --background: #121212;
  --background-secondary: #121212;
  --accent-0: #1b1b1b;
  --accent-1: #252525;
  --accent-2: #2e2e2e;
  --accent-3: #3d3d3d;
  --accent-4: #4d4d4d;
  --accent-5: #848484;
  --accent-6: #979797;
  --accent-7: #b3b3b3;
  --accent-8: #bdbdbd;
  --accent-9: #e8eaed;
  --foreground: #ffffff;
`

const styles = css`
  body {
    ${lightTheme}
  }

  @media (prefers-color-scheme: dark) {
    body {
      ${darkTheme}
    }
  }

  body[data-theme='light'] {
    ${lightTheme};
  }

  body[data-theme='dark'] {
    ${darkTheme};
  }

  body {
    color: ${cssVar('accent-9')};
  }
`

export default ThemeProvider
