import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import { palette } from '../../lib/palette'
import Icon from '../Icon'

type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  /**
   * List of options to show in the select
   * By default, the `value` is shown as the option's name.
   * If you set `name`, the `name` will be shown instead.
   */
  options: { value: string; name?: string }[]
  value: string
  onChange?(e: React.ChangeEvent<HTMLSelectElement>): void
  disabled?: boolean
  size?: SelectSize
  /**
   * Placeholder is shown when the value is empty (`''`)
   */
  placeholder?: string
}

function Select({
  options,
  size = 'md',
  value,
  placeholder,
  onChange,
  disabled,
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
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
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
  size: SelectSize,
  disabled: boolean | undefined,
  focused: boolean
) => css`
  position: relative;
  align-items: center;
  gap: 0.5em;

  border: 1px solid ${palette.grey[300]};
  transition: 0.125s all ease-in;

  display: inline-flex;
  border-radius: 0.25rem;
  background: white;
  align-items: center;
  font-size: ${sizes[size]};
  height: 2.5em;
  svg {
    position: absolute;
    right: 0;
    width: 1.5em;
    height: 1.5em;
    right: 0.25em;
    pointer-events: none;
    color: ${palette.grey[600]};
  }

  color: ${palette.grey[900]};

  ${!disabled &&
  css`
    cursor: pointer;
    &:hover {
      border: 1px solid ${palette.teal[500]};
    }
    ${focused &&
    css`
      color: ${palette.teal[500]};
      border: 1px solid ${palette.teal[500]};
      svg {
        color: inherit;
      }
    `}
  `}

  ${disabled &&
  css`
    cursor: not-allowed;
    background: ${palette.grey[50]};
    color: ${palette.grey[400]};
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
  padding-left: 0.75em;
  padding-right: 2.25em;

  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  color: inherit;
`

const placeholderStyle = css`
  color: ${palette.grey[400]};
`

export default Select
