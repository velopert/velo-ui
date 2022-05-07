import { css } from '@emotion/react'
import React, { ReactNode } from 'react'
import { palette } from '../../lib/palette'
import { Size, sizeSets } from '../../lib/sizes'
import { rgba } from 'polished'
import { cssVar } from '../../contexts/ThemeProvider'

interface Props<T> {
  checked?: boolean
  /**
   * Default size is `md`
   */
  size?: Size
  children?: ReactNode
  /**
   * When the component is pressed, it will call this function with the `value` of the component.
   */
  onChangeValue?(value?: T): void
  value?: T
  fillOnChecked?: boolean
  /**
   * Set this props if you do not want margin between each component. By setting this prop, you can remove border radius and right/left border so that the borders are not duplicated.
   *
   * Set the leftmost component to `left`, set the rightmost component to `right`, and set the middle components to `middle`.
   * If you do not want to set this manually, you can use `OptionButtonGroup`
   */
  borderOption?: 'default' | 'left' | 'middle' | 'right'
  disabled?: boolean
  /**
   * Icon is shown at the left side of the components. Use SVG icon.
   */
  icon?: React.ReactNode
}

/**
 * `OptionButton` is used to select one of the item in a group. It is similar to `Radio` but it appears as a button.
 *
 *
 * You can use this component more easily if you use it with `OptionButtonGroup`.
 * @returns
 */
export function OptionButton<T>({
  size = 'md',
  checked,
  children,
  onChangeValue,
  value,
  fillOnChecked,
  borderOption = 'default',
  icon,
  disabled,
}: Props<T>) {
  return (
    <button
      className={`option-button ${borderOption} ${checked ? 'checked' : ''}`}
      css={block(size, checked, fillOnChecked, borderOption)}
      onClick={() => {
        onChangeValue?.(value)
      }}
      disabled={disabled}
    >
      {icon && <div css={iconWrapper}>{icon}</div>}
      {children}
    </button>
  )
}

const block = (
  size: Size,
  checked: boolean | undefined,
  fillOnChecked: boolean | undefined,
  borderOption: 'default' | 'left' | 'middle' | 'right'
) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${cssVar('accent-0')};
  font-size: ${sizeSets[size].fontSize};
  height: ${sizeSets[size].height};

  border: none;
  outline: none;
  border: 1px solid ${cssVar('accent-6')};
  color: ${cssVar('accent-6')};
  border-radius: 0.25rem;
  padding-left: 1em;
  padding-right: 1em;
  transition: 0.125s color ease-in, 0.125s background ease-in;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  &:hover:enabled {
    color: ${cssVar('accent-9')};
    border-color: ${cssVar('accent-9')};
  }
  &:hover {
    z-index: 10;
  }
  ${checked &&
  css`
    z-index: 5;
    color: ${cssVar('primary')};
    border-color: ${cssVar('primary')};
    &:hover:enabled {
      color: ${cssVar('primary-hover')};
      border-color: ${cssVar('primary-hover')};
    }

    ${fillOnChecked &&
    css`
      background: ${cssVar('primary')};
      color: ${cssVar('element-text')};
      &:hover:enabled {
        color: ${cssVar('element-text')};
        background: ${cssVar('primary-hover')};
        border-color: ${cssVar('primary-hover')};
      }
    `}
  `}

  ${borderOption !== 'default' &&
  css`
    .option-button + & {
      margin-left: -1px;
    }
  `}

  ${borderOption === 'left' &&
  css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    /* ${checked &&
    css`
      box-shadow: 1px 0px 0px 0px ${cssVar('primary')};
    `} */
  `}

  ${borderOption === 'right' &&
  css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    /* box-shadow: -1px 0px 0px 0px ${cssVar('accent-6')};
    ${checked &&
    css`
      box-shadow: -1px 0px 0px 0px ${cssVar('primary')};
    `} */
  `}

  ${borderOption === 'middle' &&
  css`
    border-radius: 0;
    /* box-shadow: -1px 0px 0px 0px ${cssVar('accent-6')},
      1px 0px 0px 0px ${cssVar('accent-6')};
    ${checked &&
    css`
      box-shadow: -1px 0px 0px 0px ${cssVar('primary')},
        1px 0px 0px 0px ${cssVar('primary')};
    `} */
  `} /* ${checked &&
  css`
    z-index: 5;
  `} */

  &:disabled {
    filter: grayscale(25%);
    cursor: not-allowed;
    opacity: 0.4;
  }
`

const iconWrapper = css`
  margin-right: 1em;
  display: flex;
  svg {
    color: inherit;
    display: block;
    width: 1.25em;
    height: 1.25em;
  }
  margin-right: 0.75em;
`
