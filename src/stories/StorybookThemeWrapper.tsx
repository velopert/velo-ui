import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { ReactNode, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeProvider'

interface Props {}

interface Props {
  children: ReactNode
}

function StorybookThemeWrapper({ children }: Props) {
  const darkTheme = useDarkMode()
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme(darkTheme ? 'dark' : 'light')
  }, [darkTheme, setTheme])

  return <>{children}</>
}

export default StorybookThemeWrapper
