import { useDarkMode } from 'storybook-dark-mode'
import React, { ReactNode, useEffect } from 'react'
import ThemeProvider, { useTheme } from '../contexts/ThemeProvider'

interface Props {
  children: ReactNode
}

function DocsThemeWrapperImpl({ children }: Props) {
  const darkTheme = useDarkMode()
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme(darkTheme ? 'dark' : 'light')
  }, [darkTheme, setTheme])

  return <>{children}</>
}

function DocsThemeWrapper(props: Props) {
  return (
    <ThemeProvider>
      <DocsThemeWrapperImpl {...props} />
    </ThemeProvider>
  )
}

export default DocsThemeWrapper
