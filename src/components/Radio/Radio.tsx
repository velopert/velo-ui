import { css } from '@emotion/react'
import { InputHTMLAttributes, useState } from 'react'
import { palette } from '../../lib/palette'
import { rgba } from 'polished'
import { useRadioGroup } from '../RadioGroup/RadioGroup'

type RadioSize = 'sm' | 'md' | 'lg'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Set the description of the radio button with this prop
   */
  children: string
  size?: RadioSize
  /**
   * Setting this prop to true will make the radio button active
   */
  checked?: boolean
  /**
   * Function called when checked state of the input changes
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Customize actve, focus, hover color
   */
  color?: string
  // @todo: disabled
}

/**
 * `Radio` is used to select one of the item in a group.
 * When you have more than 5 options, you should use `Select` instead.
 *
 *
 * If you wrap multiple `Radio` with `Radio.Group` component, you do not have to set `checked` and `onChange` manually.
 */
function Radio({
  children,
  size = 'sm',
  checked,
  onChange,
  color = palette.teal[500],
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false)
  const { value, onChangeValue } = useRadioGroup()
  const isChecked = checked || value === rest.value

  return (
    <label css={wrapper(size, color)}>
      <input
        type="radio"
        {...rest}
        onChange={(e) => {
          onChange?.(e)
          onChangeValue?.(e.target.value)
        }}
        checked={isChecked}
        onFocus={(e) => {
          setFocused(true)
        }}
        onBlur={(e) => {
          setFocused(false)
        }}
      />
      <span css={circle(!!isChecked, focused, color)}>
        <span css={smallDot(isChecked)}></span>
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

const wrapper = (size: RadioSize, color: string) => css`
  position: relative;
  font-size: ${sizes[size]};
  display: flex;
  align-items: center;
  color: ${palette.grey[800]};
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
      border-color: ${color};
    }
  }
  &:focus {
    opacity: 0.4;
  }
`

const circle = (checked: boolean, focused: boolean, color: string) => css`
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
    border-color: ${color};
    background: ${color};
  `}

  ${focused &&
  css`
    box-shadow: 0 0 0 0.25em ${rgba(color, 0.4)};
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
