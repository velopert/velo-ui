import { css, Global } from '@emotion/react'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface Props {
  children: React.ReactNode
}

type Theme = 'light' | 'dark' | 'default'
const ThemeContext =
  createContext<{
    theme: Theme
    isDarkTheme: boolean
    setTheme(theme: Theme): void
  } | null>(null)

function checkIsDarkTheme() {
  if (typeof window === 'undefined') return false
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  return systemPrefersDark
}
export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'default'>('default')
  const [systemIsDark, setSystemIsDark] = useState(() => checkIsDarkTheme())

  useEffect(() => {
    if (theme === 'default') return
    document.body.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const callback = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches)
    }

    const match = window.matchMedia('(prefers-color-scheme: dark)')

    match.addEventListener('change', callback)

    return () => {
      match.removeEventListener('change', callback)
    }
  }, [])

  const isDarkTheme = useMemo(() => {
    if (theme === 'dark') return true
    if (systemIsDark && theme === 'default') return true
    return false
  }, [theme, systemIsDark])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkTheme }}>
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
  | 'primary'
  | 'primary-hover'
  | 'primary-active'
  | 'secondary'
  | 'secondary-hover'
  | 'secondary-active'
  | 'element-text'
  | 'secondary-element-text'

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

  --primary: #009688;
  --primary-hover: #00897b;
  --primary-active: #00796b;
  --secondary: #e0f2f1;
  --secondary-hover: #b2dfdb;
  --secondary-active: #80cbc4;
  --element-text: #ffffff;
  --secondary-element-text: #009688;
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

  --primary: #73e6db;
  --primary-hover: #64d6cb;
  --primary-active: #59cabf;
  --secondary: #003c36;
  --secondary-hover: #00302b;
  --secondary-active: #002a26;

  --element-text: #121212;
  --secondary-element-text: #74d6cd;
`

const styles = css`
  body {
    ${lightTheme};
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
