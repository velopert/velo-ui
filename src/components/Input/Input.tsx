import { css } from '@emotion/react'
import { useMemo } from 'react'
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { cssVar } from '../../contexts/ThemeProvider'
import { palette } from '../../lib/palette'
import { Size, sizeSets } from '../../lib/sizes'
import Icon from '../Icon'
import Label from '../Label/Label'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Default size of the input is `md`
   */
  size?: Size
  /**
   * Color of the border and text when input is foucused.
   * You can also override this color from VeloProvider.
   */
  focusedColor?: string

  /**
   * Set this to `true` when you want to match the size with its parent element.
   */
  isFullWidth?: boolean

  /**
   * This prop will make the border and text color to red. Color is remained the same when even it is focused.
   */
  isError?: boolean
  /**
   * This message will shown below the input.
   */
  errorMessage?: string
  /**
   * Use this prop when you want to fix your input width.
   */
  fixedWidth?: string | number
  /**
   * If a label is set, the label text will be shown on the top of the input.
   * Label color changes as the input is focused, or error occurs.
   * `for` attribute of the label is set to the input `id`.
   */
  label?: string
  /**
   * Sets the id to the input element.
   */
  id?: string
  icon?: React.ReactNode
  /**
   * Hides eye icon when input `type` is `password`
   */
  disablePlainPassword?: boolean
  /**
   * Shows an element left to the input
   * Currently, only text is supported.
   */
  leftAddon?: React.ReactNode
  /**
   * Shows an element left to the input
   * Text, Button are supported
   */
  rightAddon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const labelSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
} as const

function Input({
  size = 'md',
  focusedColor = cssVar('primary'),
  isFullWidth,
  disabled,
  isError,
  errorMessage,
  fixedWidth,
  label,
  icon,
  iconPosition = 'left',
  type,
  disablePlainPassword,
  className,
  rightAddon,
  leftAddon,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false)
  const [plainMode, setPlainMode] = useState(type !== 'password')
  const ref = useRef<HTMLInputElement>(null)
  const cursorPosRef = useRef(0)

  useEffect(() => {
    if (cursorPosRef.current === 0) return
    if (ref.current) {
      ref.current.focus()
      ref.current.selectionStart = cursorPosRef.current
    }
  }, [plainMode])

  const leftAddonEl = useMemo(() => {
    if (!leftAddon) return null
    if (typeof leftAddon === 'string') {
      return <div css={textAddon('left')}>{leftAddon}</div>
    }
    return null
  }, [leftAddon])

  const rightAddonEl = useMemo(() => {
    if (!rightAddon) return null
    if (typeof rightAddon === 'string') {
      return <div css={textAddon('right')}>{rightAddon}</div>
    }
    return (
      <div
        css={rightAddonStyle}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {rightAddon}
      </div>
    )
  }, [rightAddon])

  return (
    <div
      css={[
        wrapper(size, isFullWidth),
        fixedWidth !== undefined &&
          css({
            width: fixedWidth,
          }),
      ]}
      onClick={(e) => {
        const input = e.currentTarget.querySelector('input')
        if (!input) return
        input.focus()
      }}
      className={className}
    >
      {label && (
        <Label
          focused={focused}
          focusedColor={focusedColor}
          isError={isError}
          size={labelSizeMap[size]}
        >
          {label}
        </Label>
      )}
      <div css={wrapperForAddons}>
        {leftAddonEl}
        <div
          css={[
            inputBox(size, disabled),
            focused && focusedStyle(focusedColor),
            isError && errorStyle,
            rightAddon && noBorderRadius('right'),
            leftAddon && noBorderRadius('left'),
          ]}
        >
          {icon && iconPosition === 'left' && (
            <div css={iconStyle(iconPosition)}>{icon}</div>
          )}
          <input
            css={inputStyle}
            onFocus={(e) => {
              onFocus?.(e)
              setFocused(true)
            }}
            onBlur={(e) => {
              onBlur?.(e)
              setFocused(false)
            }}
            onMouseUp={(e) => {
              cursorPosRef.current = e.currentTarget.selectionStart ?? 0
              rest.onMouseUp?.(e)
            }}
            onChange={(e) => {
              cursorPosRef.current = e.target.selectionStart ?? 0
              rest.onChange?.(e)
            }}
            disabled={disabled}
            type={plainMode ? 'text' : type}
            ref={ref}
            {...rest}
          />
          {icon && iconPosition === 'right' && (
            <div css={iconStyle(iconPosition)}>{icon}</div>
          )}
          {type === 'password' && !disablePlainPassword && (
            <div
              css={[iconStyle('right'), eyeStyle(focusedColor)]}
              onClick={(e) => {
                if (ref.current?.value === '') {
                  ref.current.focus()
                }
                setPlainMode(!plainMode)
                e.stopPropagation()
              }}
            >
              <Icon name={plainMode ? 'eye_off' : 'eye'} />
            </div>
          )}
        </div>
        {rightAddonEl}
      </div>
      {errorMessage && <div css={errorMessageStyle}>{errorMessage}</div>}
    </div>
  )
}

const wrapper = (size: Size, isFullWidth?: boolean) => css`
  display: inline-flex;
  flex-direction: column;
  ${isFullWidth &&
  css`
    width: 100%;
  `}
  font-size: ${sizeSets[size].fontSize};
`

const inputBox = (size: Size, disabled?: boolean) => css`
  width: 100%;
  border: 1px solid ${cssVar('accent-4')};

  transition: 0.125s all ease-in;
  ${palette.grey[800]};
  display: inline-flex;
  border-radius: 0.25rem;
  background: ${cssVar('accent-0')};
  padding-left: 0.75em;
  padding-right: 0.75em;
  align-items: center;
  height: ${sizeSets[size].height};
  cursor: text;

  ${disabled &&
  css`
    background: ${cssVar('accent-2')};
    color: ${cssVar('accent-5')};
    cursor: not-allowed;
    input {
      cursor: not-allowed;
      &::placeholder {
        color: ${cssVar('accent-5')};
      }
    }
  `}
`

const noBorderRadius = (position: 'left' | 'right') => css`
  border-top-${position}-radius: 0;
  border-bottom-${position}-radius: 0;
`

const errorStyle = css`
  border: 1px solid ${cssVar('destructive')};
  color: ${cssVar('destructive')};
  input {
    &::placeholder {
      color: ${cssVar('destructive')};
      opacity: 0.5;
    }
  }
`

const focusedStyle = (color: string) => css`
  color: ${color};
  border-color: ${color};
`

const inputStyle = css`
  flex: 1;
  font-size: 1em;
  padding: 0;
  outline: none;
  height: 100%;
  background: transparent;

  color: inherit;
  border: none;

  font-family: inherit;

  &::placeholder {
    color: ${cssVar('accent-4')};
  }
`

const errorMessageStyle = css`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${cssVar('destructive')};
  display: flex;
  align-items: center;
`

const iconStyle = (position: 'left' | 'right' = 'left') => css`
  svg {
    color: inherit;
    width: 1.25em;
    ${position === 'left'
      ? css`
          margin-right: 0.5rem;
        `
      : css`
          margin-left: 0.5rem;
        `}
  }
`

const eyeStyle = (color: string) => css`
  cursor: pointer;
  color: ${palette.grey[400]};
  svg {
    &:hover {
      color: ${color};
    }
  }
`

const wrapperForAddons = css`
  width: 100%;
  display: flex;
`

const rightAddonStyle = css`
  & > * {
    border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;
  }
`

const textAddon = (position: 'left' | 'right') => css`
  padding-left: 0.75em;
  padding-right: 0.75em;
  display: flex;
  align-items: center;
  background: ${cssVar('accent-1')};
  border: 1px solid ${cssVar('accent-3')};
  border-${position === 'right' ? 'left' : 'right'}: none;
  font-size: 1em;
  border-top-${position}-radius: 0.25rem;
  border-bottom-${position}-radius: 0.25rem;
`

export default Input
