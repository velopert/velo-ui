import { css } from '@emotion/react'
import React, { useMemo } from 'react'
import { cssVar, isReactElement } from '../..'

interface HeaderProps {
  logo?: React.ReactNode
  /**
   * shows border bottom
   */
  hasBorderBottom?: boolean

  /**
   * shows elements at the left side of the header (next to the logo)
   */
  leftArea?: React.ReactNode
  /**
   * shows elements at the right side of the header
   */
  rightArea?: React.ReactNode
  /**
   * You can use namespaced components instead of using `logo`, `leftArea`, `rightArea` Props.
   * Choose either way that suits you the best.
   *
   * Namespaced Components:
   * - `Header.Logo`
   * - `Header.Left`
   * - `Header.Right`
   */
  children?: React.ReactNode
}

/**
 * Header displays the logo of the pages and provides links or buttons
 */
export function Header({
  logo,
  hasBorderBottom = true,
  leftArea,
  rightArea,
  children,
}: HeaderProps) {
  const picked = useMemo(() => {
    if (!children) return null
    const array = React.Children.toArray(children)
    const select = (component: string | React.JSXElementConstructor<any>) =>
      array.find((item) => isReactElement(item) && item.type === component)

    return {
      logo: select(Logo),
      leftArea: select(Left),
      rightArea: select(Right),
    }
  }, [children])

  const fallbacked = {
    logo: logo ?? picked?.logo,
    leftArea: leftArea ?? picked?.leftArea,
    rightArea: rightArea ?? picked?.rightArea,
  }

  return (
    <header css={[styles.header, hasBorderBottom && styles.borderBottom]}>
      {fallbacked.logo ? <div css={styles.logo}>{fallbacked.logo}</div> : null}
      <div css={styles.row}>
        <div css={styles.leftArea}>{fallbacked.leftArea}</div>
        <div css={styles.rightArea}>{fallbacked.rightArea}</div>
      </div>
    </header>
  )
}

interface WrapperProps {
  children: React.ReactNode
}
function Logo({ children }: WrapperProps) {
  return <>{children}</>
}

function Left({ children }: WrapperProps) {
  return <>{children}</>
}

function Right({ children }: WrapperProps) {
  return <>{children}</>
}

Header.Logo = Logo
Header.Left = Left
Header.Right = Right

const styles = {
  header: css`
    height: 4rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    display: flex;
    align-items: center;
    width: 100%;
  `,
  borderBottom: css`
    border-bottom: 1px solid ${cssVar('accent-3')};
  `,
  row: css`
    display: flex;
    justify-content: space-between;
    flex: 1;
  `,
  logo: css`
    display: flex;
    align-items: center;
    margin-right: 1.5rem;
  `,
  leftArea: css`
    display: flex;
    align-items: center;
  `,
  rightArea: css`
    display: flex;
    align-items: center;
  `,
}
