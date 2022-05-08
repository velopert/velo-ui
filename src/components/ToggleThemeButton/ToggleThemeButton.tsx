import { rgba } from 'polished'
import { css } from '@emotion/react'
import { Icon } from '..'
import {
  cssVar,
  safelyAlterColor,
  useTheme,
  useThemeVariableColor,
} from '../..'
import { useEffect, useState } from 'react'

export function ToggleThemeButton() {
  const { isDarkTheme, toggle } = useTheme()

  const color = useThemeVariableColor(
    cssVar(isDarkTheme ? 'accent-9' : 'accent-8')
  )
  const [transitionEnabled, setTransitionEnabled] = useState(false)

  // enables transition after first render
  useEffect(() => {
    setTransitionEnabled(true)
  }, [])

  return (
    <button css={styles.button(isDarkTheme, color)} onClick={toggle}>
      <span
        css={[
          styles.overflowedSquare,
          isDarkTheme ? undefined : styles.rotate,
          transitionEnabled && styles.transition,
        ]}
      >
        <span
          css={[
            styles.iconWrapper,
            styles.moon,
            !isDarkTheme && styles.fadeOut,
            transitionEnabled && styles.transition,
          ]}
        >
          <Icon name="moon" />
        </span>
        <span
          css={[
            styles.iconWrapper,
            styles.sun,
            isDarkTheme && styles.fadeOut,
            transitionEnabled && styles.transition,
          ]}
        >
          <Icon name="sun" />
        </span>
      </span>
    </button>
  )
}

const styles = {
  button: (isDarkTheme: boolean, color: string) => css`
    position: relative;
    background: transparent;
    color: ${color};
    border: none;
    display: flex;
    width: 2.5rem;
    height: 2.5rem;
    display: block;
    border-radius: 1.25rem;
    overflow: hidden;
    cursor: pointer;
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
    &:hover {
      background: ${safelyAlterColor(color, (color) =>
        rgba(color, isDarkTheme ? 0.3 : 0.1)
      )};
    }
    &:active {
      background: ${safelyAlterColor(color, (color) =>
        rgba(color, isDarkTheme ? 0.4 : 0.2)
      )};
    }
  `,
  overflowedSquare: css`
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 5rem;
    height: 5rem;
  `,
  iconWrapper: css`
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  moon: css`
    position: absolute;
    left: 0;
    top: 0;
  `,
  sun: css`
    position: absolute;
    bottom: 0;
    right: 0;
  `,
  rotate: css`
    transform: rotate(180deg);
  `,
  transition: css`
    transition: 0.3s transform ease-in, 0.125s opacity ease-in;
  `,
  fadeOut: css`
    opacity: 0;
  `,
}
