import { useDarkMode } from 'storybook-dark-mode'
import { css, Global } from '@emotion/react'
import ThemeProvider, { cssVar, useTheme } from '../contexts/ThemeProvider'
import React, { useEffect, useLayoutEffect } from 'react'

interface Props {
  children?: React.ReactNode
}

function DocsDarkThemeCompatImpl(props: Props) {
  const darkTheme = useDarkMode()
  const { setTheme } = useTheme()

  useLayoutEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('sb-addon-themes-3') ?? '')
      document.body.dataset.theme = data.current
    } catch (e) {}
  }, [])
  useEffect(() => {
    setTheme(darkTheme ? 'dark' : 'light')
  }, [darkTheme, setTheme])

  return <Global styles={styles} />
}

function DocsDarkThemeCompat() {
  return (
    <ThemeProvider>
      <DocsDarkThemeCompatImpl />
    </ThemeProvider>
  )
}

const styles = css`
  .sbdocs {
    background: var(--background) !important;
    color: var(--accent-9) !important;
    p code {
      background: ${cssVar('accent-1')};
      color: ${cssVar('accent-9')};
      border-color: ${cssVar('accent-4')};
    }
  }
`

export default DocsDarkThemeCompat
