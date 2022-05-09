import { css, Global } from '@emotion/react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { shade } from 'polished'

export type Theme = 'light' | 'dark' | 'default'

interface Props {
  children: React.ReactNode
  initialTheme?: Theme
}

const useIsomorphicEffect =
  typeof window !== 'undefined' ? useEffect : useLayoutEffect

const ThemeContext =
  createContext<{
    theme: Theme
    isDarkTheme: boolean
    setTheme(theme: Theme): void
    toggle(): void
  } | null>(null)

function checkIsDarkTheme() {
  if (typeof window === 'undefined') return false
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  return systemPrefersDark
}
export function ThemeProvider({ children, initialTheme = 'default' }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'default'>(initialTheme)
  const [systemIsDark, setSystemIsDark] = useState(() => checkIsDarkTheme())

  useIsomorphicEffect(() => {
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

  const toggle = useCallback(() => {
    if (isDarkTheme) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [isDarkTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkTheme, toggle }}>
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
  | 'destructive'
  | 'destructive-hover'
  | 'destructive-active'
  | 'slight-layer'
  | 'overlay'

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
  --primary-hover: #007e72;
  --primary-active: #007267;
  --secondary: #c6e8e6;
  --secondary-hover: #b6e1de;
  --secondary-active: #a6dbd7;
  --element-text: #ffffff;
  --secondary-element-text: #009688;

  --destructive: #f44336;
  --destructive-hover: #cd382d;
  --destructive-active: #a62e25;

  --slight-layer: rgba(0, 0, 0, 0.1);
  --overlay: rgba(0, 0, 0, 0.4);
`

const darkTheme = css`
  --background: #121212;
  --background-secondary: #121212;
  --accent-0: #1b1b1b;
  --accent-1: #252525;
  --accent-2: #2e2e2e;
  --accent-3: #3d3d3d;
  --accent-4: #5b5b5b;
  --accent-5: #848484;
  --accent-6: #979797;
  --accent-7: #b3b3b3;
  --accent-8: #bdbdbd;
  --accent-9: #e8eaed;
  --foreground: #ffffff;

  --primary: #73e6db;
  --primary-hover: #61d9ce;
  --primary-active: #4eccc0;
  --secondary: #214341;
  --secondary-hover: #1f4f4b;
  --secondary-active: #1e5b56;

  --element-text: #121212;
  --secondary-element-text: #d8ecec;

  --destructive: #ff7b93;
  --destructive-hover: #f7677c;
  --destructive-active: #ee5464;

  --slight-layer: rgba(255, 255, 255, 0.1);
  --overlay: rgba(0, 0, 0, 0.7);
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
