import React from 'react'
import ThemeProvider from './ThemeProvider'

interface Props {
  children: React.ReactNode
}

function VeloProvider({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default VeloProvider
