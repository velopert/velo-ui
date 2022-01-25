import { css } from '@emotion/react'
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { palette } from '../../lib/palette'
import { rgba } from 'polished'

type ButtonType = 'primary' | 'secondary' | 'destructive'
type ButtonVariant = 'default' | 'outline' | 'ghost'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

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
  size?: ButtonSize
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
  ...rest
}: ButtonProps) {
  const scheme =
    variant !== 'default' && type === 'secondary'
      ? secondaryVariantScheme
      : schemes[type]

  const styles = [
    buttonStyle(size),
    variant === 'default' && defaultStyle(scheme),
    variant === 'outline' && outlineStyle(scheme),
    variant === 'ghost' && ghostStyle(scheme),
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
    background: palette.teal[500],
    hover: palette.teal[600],
    active: palette.teal[700],
    text: 'white',
  },
  secondary: {
    background: palette.teal[50],
    hover: palette.teal[100],
    active: palette.teal[200],
    text: palette.teal[500],
  },
  destructive: {
    background: palette.red[500],
    hover: palette.red[600],
    active: palette.red[700],
    text: 'white',
  },
}

const secondaryVariantScheme: ButtonColorScheme = {
  background: palette.grey[700],
  hover: palette.grey[800],
  active: palette.grey[900],
  text: 'white',
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
  background: white;
  border: 1px solid ${scheme.background};
  color: ${scheme.background};
  &:hover:enabled {
    background: ${scheme.hover};
    color: white;
    border-color: ${scheme.hover};
  }
  &:active:enabled {
    background: ${scheme.active};
    border-color: ${scheme.active};
  }
`

const ghostStyle = (scheme: ButtonColorScheme) => css`
  background: transparent;
  color: ${scheme.background};
  &:hover:enabled {
    background: ${rgba(scheme.background, 0.1)};
  }
  &:active:enabled {
    background: ${rgba(scheme.background, 0.2)};
  }
`

const sizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.3125rem',
}

const fullWidthStyle = css`
  width: 100%;
`

const buttonStyle = (size: ButtonSize) => css`
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;
  font-size: ${sizes[size]};
  height: 2.5em;
  padding-left: 1em;
  padding-right: 1em;

  &:disabled {
    filter: grayscale(25%);
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:focus-visible {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  }

  transition: 0.1s background ease-in, 0.1s color ease-in;
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
