import React from 'react'
import GlobalStyles from '../src/components/GlobalStyles'
import { ThemeProvider } from '../src/contexts/ThemeProvider'
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
  (Story) => (
    <ThemeProvider>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
]
