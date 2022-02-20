import { css } from '@emotion/react'
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { palette } from '../../lib/palette'
import { rgba, darken } from 'polished'
import { Size, sizeSets } from '../../lib/sizes'
import { cssVar, useTheme } from '../../contexts/ThemeProvider'
import { getCSSVarValue, safelyAlterColor } from '../../lib/utils'
import { useThemeVariableColor } from '../../hooks/useThemeVariableColor'

type ButtonType = 'primary' | 'secondary' | 'destructive'
type ButtonVariant = 'default' | 'outline' | 'ghost'

export interface ButtonColorScheme {
  background: string
  hover: string
  active: string
  text: string
}

interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'type'
  > {
  /**
   * Content of the button should set via `children` prop
   */
  children: React.ReactNode
  /**
   * Use different button type for different purposes
   * `primary` type is used as default type
   * To set the `type` html attribute, use `htmlType`
   */
  type?: ButtonType
  /**
   * Original html type attribute of `button` element
   */
  htmlType?: 'button' | 'reset' | 'submit'
  /**
   * Use different button variant for different purposes.
   * `default` variant is used as default variant
   */
  variant?: ButtonVariant
  /**
   * Default size of the button is `md`
   */
  size?: Size
  /**
   * Set this to `true` when you want to make your button full width of its parent
   */
  isFullWidth?: boolean
  /**
   * Set this to `true` when you want to stick the icon to the end of the button, instead of showing it on the middle.
   * `isFullWidth` should be set to `true` when using this prop
   */
  isStickIconToEnd?: boolean
  /**
   * Shows icon at left or right side of button.
   * Set the position by `iconPosition` prop.
   */
  icon?: React.ReactNode
  /**
   * Icon is shown at left by default.
   */
  iconPosition?: 'left' | 'right'
  /**
   * Set the icon of the button that is shown at the right
   * The icon should be a `svg` element. If not, you have to set the size of the icon manually
   */
  rightIcon?: React.ReactNode

  /**
   * Set this to `true` when you want to make your button disabled
   */
  disabled?: boolean
  /**
   * Set this to `true` when you would like to use the button as a link
   * `href` prop also should be set
   */
  asLink?: boolean
  /**
   * You have to set this value when you use `asLink` prop.
   * If you are using this with react-router, you have to use it with `useLinkClickHandler`.
   */
  href?: string
  /**
   * `target` attribute of `a` element if you enable `asLink`
   */
  target?: React.HTMLAttributeAnchorTarget
  /**
   * Sets width equal to height
   */
  isSquare?: boolean
}

/**
 * `Button` is used to initialize an action.
 *
 * It accepts all the native props of `button` element.
 *
 * Sometimes, you might want to use a link that is styled as button. In that case, you can use `asLink` prop.
 * e.g. `<Button asLink href="/about" />`
 * If you are using react-router, you have to use `useLinkClickHandler` to handle the click event.
 */
function Button({
  children,
  type = 'primary',
  variant = 'default',
  size = 'md',
  isFullWidth,
  isStickIconToEnd,
  iconPosition = 'left',
  icon,
  asLink,
  href,
  isSquare,
  ...rest
}: ButtonProps) {
  const { isDarkTheme } = useTheme()
  const scheme =
    variant !== 'default' && type === 'secondary'
      ? secondaryVariantScheme(isDarkTheme)
      : schemes[type]

  const themeColor = useThemeVariableColor(scheme.background)

  const styles = [
    buttonStyle(size, isSquare),
    variant === 'default' && defaultStyle(scheme),
    variant === 'outline' && outlineStyle(scheme),
    variant === 'ghost' && ghostStyle(themeColor, isDarkTheme),
    isFullWidth && fullWidthStyle,
  ]

  const contents = (
    <>
      {icon && iconPosition === 'left' && (
        <div css={iconWrapperStyle('left', isStickIconToEnd)}>{icon}</div>
      )}
      {isStickIconToEnd ? <div css={takeFullWidth}>{children}</div> : children}
      {icon && iconPosition === 'right' && (
        <div css={iconWrapperStyle('right', isStickIconToEnd)}>{icon}</div>
      )}
    </>
  )

  if (asLink) {
    return (
      <a href={href} css={styles.concat(resetLinkStyle)} {...(rest as any)}>
        {contents}
      </a>
    )
  }

  return (
    <button css={styles} {...rest}>
      {contents}
    </button>
  )
}

export const schemes: Record<ButtonType, ButtonColorScheme> = {
  primary: {
    background: cssVar('primary'),
    hover: cssVar('primary-hover'),
    active: cssVar('primary-active'),
    text: cssVar('element-text'),
  },
  secondary: {
    background: cssVar('secondary'),
    hover: cssVar('secondary-hover'),
    active: cssVar('secondary-active'),
    text: cssVar('secondary-element-text'),
  },
  destructive: {
    background: cssVar('destructive'),
    hover: cssVar('destructive-hover'),
    active: cssVar('destructive-active'),
    text: cssVar('element-text'),
  },
}

const secondaryVariantScheme: (isDarkTheme: boolean) => ButtonColorScheme = (
  isDarkTheme
) =>
  isDarkTheme
    ? {
        background: cssVar('accent-9'),
        hover: cssVar('accent-8'),
        active: cssVar('accent-7'),
        text: cssVar('element-text'),
      }
    : {
        background: cssVar('accent-8'),
        hover: cssVar('accent-7'),
        active: cssVar('accent-6'),
        text: cssVar('element-text'),
      }

const defaultStyle = (scheme: ButtonColorScheme) => css`
  background: ${scheme.background};
  color: ${scheme.text};
  &:hover:enabled {
    background: ${scheme.hover};
  }
  &:active:enabled {
    background: ${scheme.active};
  }
`

const outlineStyle = (scheme: ButtonColorScheme) => css`
  background: transparent;
  border: 1px solid ${scheme.background};
  color: ${scheme.background};
  &:hover:enabled {
    background: ${scheme.background};
    color: ${scheme.text};
    border-color: ${scheme.background};
  }
  &:active:enabled {
    background: ${scheme.hover};
    border-color: ${scheme.hover};
  }
`

const ghostStyle = (color: string, isDarkTheme: boolean) => css`
  background: transparent;
  color: ${color};
  &:hover:enabled {
    background: ${safelyAlterColor(color, (color) =>
      rgba(color, isDarkTheme ? 0.3 : 0.1)
    )};
  }
  &:active:enabled {
    background: ${safelyAlterColor(color, (color) =>
      rgba(color, isDarkTheme ? 0.4 : 0.2)
    )};
  }
`

const fullWidthStyle = css`
  width: 100%;
`

const buttonStyle = (size: Size, isSquare?: boolean) => css`
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 600;
  font-family: inherit;
  font-size: ${sizeSets[size].fontSize};
  height: ${sizeSets[size].height};
  padding-left: 1em;
  padding-right: 1em;

  &:disabled {
    filter: grayscale(15%);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  }

  transition: 0.1s background ease-in, 0.1s color ease-in;

  ${isSquare &&
  css`
    padding: 0;
    width: 2.5em;
  `}
`

const iconWrapperStyle = (
  position: 'left' | 'right',
  noMargin?: boolean
) => css`
  display: flex;
  svg {
    width: 1.25em;
    height: 1.25em;
    color: inherit;
  }

  ${position === 'left' &&
  css`
    margin-right: 0.75em;
  `}
  ${position === 'right' &&
  css`
    margin-left: 0.75em;
  `}

  ${noMargin &&
  css`
    margin: 0;
  `}
`

const takeFullWidth = css`
  flex: 1;
`

const resetLinkStyle = css`
  text-decoration: none;
`

export default Button
