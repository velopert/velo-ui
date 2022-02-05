import { css } from '@emotion/react'
import { InputHTMLAttributes, useState } from 'react'
import { palette } from '../../lib/palette'
import { rgba } from 'polished'

type RadioSize = 'sm' | 'md' | 'lg'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  children: string
  size?: RadioSize
}

function Radio({ children, size = 'sm', checked, ...rest }: Props) {
  const [focused, setFocused] = useState(false)
  return (
    <label css={wrapper(size)}>
      <input
        type="radio"
        {...rest}
        checked={checked}
        onFocus={(e) => {
          setFocused(true)
        }}
        onBlur={(e) => {
          setFocused(false)
        }}
      />
      <span css={circle(!!checked, focused)}>
        <span css={smallDot(checked)}></span>
      </span>
      <span>{children}</span>
    </label>
  )
}

const sizes = {
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
}

const wrapper = (size: RadioSize) => css`
  position: relative;
  font-size: ${sizes[size]};
  display: flex;
  align-items: center;
  cursor: pointer;
  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }

  &:hover {
    span:first-of-type {
      border-color: ${palette.teal[500]};
    }
  }
  &:focus {
    opacity: 0.4;
  }
`

const circle = (checked: boolean, focused: boolean) => css`
  width: 1.125em;
  height: 1.125em;
  border-radius: 50%;
  border: 1px solid ${palette.grey[500]};
  display: block;
  margin-right: 0.5em;
  transition: 0.125s all ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  ${checked &&
  css`
    border-color: ${palette.teal[500]};
    background: ${palette.teal[500]};
  `}

  ${focused &&
  css`
    box-shadow: 0 0 0 0.25em ${rgba(palette.teal[500], 0.4)};
  `}
`

const smallDot = (checked?: boolean) => css`
  background: white;
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  transform: scale(0);
  transition: 0.125s all ease-in;
  ${checked &&
  css`
    transform: scale(1);
  `}
`

export default Radio
