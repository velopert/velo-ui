import { Global, css } from '@emotion/react'

function GlobalStyles() {
  return <Global styles={styles} />
}

const styles = css`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
`

export default GlobalStyles
