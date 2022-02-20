import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import { cssVar } from '../../contexts/ThemeProvider'
import { palette } from '../../lib/palette'
import { Size, sizeSets } from '../../lib/sizes'
import Icon from '../Icon'

interface Props
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * List of options to show in the select
   * By default, the `value` is shown as the option's name.
   * If you set `name`, the `name` will be shown instead.
   */
  options: { value: string; name?: string }[]
  value: string
  onChange?(e: React.ChangeEvent<HTMLSelectElement>): void
  disabled?: boolean
  size?: Size
  /**
   * Placeholder is shown when the value is empty (`''`)
   */
  placeholder?: string
}

/**
 * `Select` is used to select a value from a list of options.
 *
 * If you have less than 4 options, it is better to use `OptionButton` or `Radio`.
 */
function Select({
  options,
  size = 'md',
  value,
  placeholder,
  onChange,
  disabled,
  onFocus,
  onBlur,
}: Props) {
  const selectRef = useRef<HTMLSelectElement>(null)
  const [isPlaceholder, setIsPlaceholder] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (placeholder && (value === '' || selectRef.current?.value === '')) {
      setIsPlaceholder(true)
    } else {
      setIsPlaceholder(false)
    }
  }, [value, placeholder])

  return (
    <div
      css={base(size, disabled, focused)}
      onClick={() => {
        selectRef.current?.click()
      }}
    >
      <select
        css={[selectStyle, isPlaceholder && placeholderStyle]}
        ref={selectRef}
        onChange={(e) => {
          onChange?.(e)
          setIsPlaceholder(false)
        }}
        value={value}
        disabled={disabled}
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name ?? option.value}
          </option>
        ))}
      </select>
      <Icon name="menu_down" />
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

const base = (
  size: Size,
  disabled: boolean | undefined,
  focused: boolean
) => css`
  position: relative;
  align-items: center;
  gap: 0.5em;

  border: 1px solid ${cssVar('accent-4')};
  transition: 0.125s all ease-in;

  display: inline-flex;
  border-radius: 0.25rem;
  background: ${cssVar('accent-0')};
  align-items: center;
  font-size: ${sizeSets[size].fontSize};
  height: ${sizeSets[size].height};
  svg {
    position: absolute;
    right: 0;
    width: 1.5em;
    height: 1.5em;
    right: 0.25em;
    pointer-events: none;
    color: ${cssVar('accent-6')};
  }

  color: ${cssVar('accent-9')};

  ${!disabled &&
  css`
    cursor: pointer;
    &:hover {
      border: 1px solid ${cssVar('accent-6')};
    }
    ${focused &&
    css`
      color: ${cssVar('primary')};
      border: 1px solid ${cssVar('primary')};
      svg {
        color: inherit;
      }
    `}
  `}

  ${disabled &&
  css`
    cursor: not-allowed;
    background: ${cssVar('accent-2')};
    color: ${cssVar('accent-5')};
    svg {
      color: inherit;
    }
  `}
`

const selectStyle = css`
  background: none;
  cursor: inherit;
  height: 100%;
  font-size: 1em;
  border: none;
  padding-left: 1em;
  padding-right: 2.5em;

  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  color: inherit;
`

const placeholderStyle = css`
  color: ${cssVar('accent-4')};
`

export default Select
