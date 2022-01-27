import { css } from '@emotion/react'
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { palette } from '../../lib/palette'
import Icon from '../Icon'

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Default size of the input is `md`
   */
  size?: InputSize
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
  iconPosition?: 'left' | 'right'
}

function Input({
  size = 'md',
  focusedColor = palette.teal[500],
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
    >
      {label !== undefined && (
        <label
          css={[
            labelStyle,
            focused &&
              css({
                color: focusedColor,
              }),
            isError &&
              css({
                color: palette.red[500],
              }),
          ]}
        >
          {label}
        </label>
      )}
      <div
        css={[
          inputBox(disabled),
          focused && focusedStyle(focusedColor),
          isError && errorStyle,
        ]}
      >
        {icon && iconPosition === 'left' && (
          <div css={iconStyle(iconPosition)}>{icon}</div>
        )}
        <input
          css={inputStyle}
          onFocus={(e) => {
            rest.onFocus?.(e)
            setFocused(true)
          }}
          onBlur={(e) => {
            rest.onBlur?.(e)
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
      {errorMessage && <div css={errorMessageStyle}>{errorMessage}</div>}
    </div>
  )
}

const sizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.3125rem',
}

const wrapper = (size: InputSize, isFullWidth?: boolean) => css`
  display: inline-flex;
  flex-direction: column;
  ${isFullWidth &&
  css`
    width: 100%;
  `}
  font-size: ${sizes[size]};
`

const labelStyle = css`
  font-size: 0.75em;
  font-weight: 500;
  color: ${palette.grey[600]};
  margin-bottom: 0.5em;
  transition: 0.125s all ease-in;
`

const inputBox = (disabled?: boolean) => css`
  width: 100%;
  border: 1px solid ${palette.grey[300]};

  transition: 0.125s all ease-in;
  ${palette.grey[800]};
  display: inline-flex;
  border-radius: 0.5rem;
  background: white;
  padding-left: 0.75em;
  padding-right: 0.75em;
  align-items: center;
  cursor: text;

  ${disabled &&
  css`
    background: ${palette.grey[100]};
    color: ${palette.grey[400]};
    cursor: not-allowed;
    input {
      cursor: not-allowed;
    }
  `}
`

const errorStyle = css`
  border: 1px solid ${palette.red[500]};
  color: ${palette.red[500]};
  input {
    &::placeholder {
      color: ${palette.red[100]};
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
  height: 2.5em;
  background: transparent;

  color: inherit;
  border: none;

  font-family: inherit;

  &::placeholder {
    color: ${palette.grey[400]};
  }
`

const errorMessageStyle = css`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${palette.red[500]};
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

export default Input
