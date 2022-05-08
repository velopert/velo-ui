import { Global, css } from '@emotion/react'
import { cssVar } from '..'

export function GlobalStyles() {
  return <Global styles={styles} />
}

const styles = css`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    box-sizing: border-box;
    background: ${cssVar('background')};
  }
  * {
    box-sizing: inherit;
  }
  a {
    color: ${cssVar('primary')};
    &:hover {
      color: ${cssVar('primary-hover')};
    }
    &:active {
      color: ${cssVar('primary-active')};
    }
  }
`
