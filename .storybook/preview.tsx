import React from 'react'
import { GlobalStyles } from '../src/components/GlobalStyles'
import { ThemeProvider } from '../src/contexts/ThemeProvider'
import StorybookThemeWrapper from '../src/stories/StorybookThemeWrapper'
import { themes } from '@storybook/theming'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: { order: ['Introduction', 'Colors', 'Components'] },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appContentBg: '#121212', appBg: '#121212' },
    // Override the default light theme
    light: { ...themes.normal },
  },
}

export const decorators = [
  (Story) => {
    try {
      const data = JSON.parse(localStorage.getItem('sb-addon-themes-3'))
      document.body.dataset.theme = data.current
    } catch (e) {}

    return (
      <ThemeProvider>
        <StorybookThemeWrapper>
          <GlobalStyles />
          <Story />
        </StorybookThemeWrapper>
      </ThemeProvider>
    )
  },
]
