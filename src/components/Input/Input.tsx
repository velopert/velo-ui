import { css } from '@emotion/react'
import { InputHTMLAttributes, useState } from 'react'
import { palette } from '../../lib/palette'

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
}

function Input({
  size = 'md',
  focusedColor = palette.teal[500],
  isFullWidth,
  disabled,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div css={wrapper(isFullWidth)}>
      <div
        css={[
          inputBox({ size, disabled, isFullWidth }),
          focused && focusedStyle(focusedColor),
        ]}
      >
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
          disabled={disabled}
          {...rest}
        />
      </div>
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

interface InputOption {
  size: InputSize
  isFullWidth?: boolean
  disabled?: boolean
}

const wrapper = (isFullWidth?: boolean) => css`
  display: inline-flex;
  ${isFullWidth &&
  css`
    width: 100%;
  `}
`

const inputBox = ({ size, disabled }: InputOption) => css`
  width: 100%;
  border: 1px solid ${palette.grey[300]};
  font-size: ${sizes[size]};
  transition: 0.125s all ease-in;
  ${palette.grey[800]};
  display: inline-flex;
  border-radius: 0.25rem;
  backgruond: white;

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
  padding-left: 0.875em;
  padding-right: 0.875em;
  background: transparent;

  color: inherit;
  border: none;

  font-family: inherit;

  &::placeholder {
    color: ${palette.grey[400]};
  }
`

export default Input
