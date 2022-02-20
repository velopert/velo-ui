import { useDarkMode } from 'storybook-dark-mode'
import { ReactNode, useEffect } from 'react'
import ThemeProvider, { useTheme } from '../contexts/ThemeProvider'
import StorybookThemeWrapper from './StorybookThemeWrapper'

interface Props {
  children: ReactNode
}

function DocsThemeWrapper(props: Props) {
  return (
    <ThemeProvider>
      <StorybookThemeWrapper {...props} />
    </ThemeProvider>
  )
}

export default DocsThemeWrapper
