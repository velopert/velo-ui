import { css } from '@emotion/react'
import React, { JSXElementConstructor, ReactElement, useMemo } from 'react'
import { Size } from '../../lib/sizes'
import { safePx } from '../../lib/utils'
import { OptionButton } from '../OptionButton/OptionButton'

interface OptionButtonGroupContextValue<T> {}

interface Props<T> extends OptionButtonGroupContextValue<T> {
  onChangeValue?(value?: T): void
  value?: T
  disabled?: boolean
  borderOption?: boolean
  size?: Size

  children: React.ReactNode
  /**
   * If you want to show `OptionButton` components without margin, set this to `true`. This component will inject `borderOption` for you according to each component's index.
   */
  isSticked?: boolean
  /**
   * Gap between `OptionButton`
   */
  gap?: string | number
  fillOnChecked?: boolean
  tabIndex?: number
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
}

/**
 * If you wrap `OptionButton` with this component, you do not need to set `checked`, `onChangeValue` to every `OptionButton` component.
 *
 * Additionally, you can also set configurations like `fillOnChecked`, `size` or `disabled` globally.
 */
export function OptionButtonGroup<T>({
  children,
  gap = '0.5rem',
  isSticked,
  value,
  onChangeValue,
  disabled,
  size,
  fillOnChecked,
  tabIndex = 0,
  onFocus,
  onBlur,
}: Props<T>) {
  /**
   * Since we have to use React.Children.map in order to override borderOption
   * according to its index when `isSticked` is enabled,
   * we are also overriding other props by React.Children.map instead of using Context*/

  const enhancedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) => {
        if (
          !React.isValidElement<Parameters<typeof OptionButton>['0']>(child)
        ) {
          return child
        }

        if ((child.type as any).displayName !== 'OptionButton') return child

        const borderOption = (() => {
          if (!isSticked) return 'default'
          if (index === 0) {
            return 'left'
          } else if (index === React.Children.count(children) - 1) {
            return 'right'
          } else {
            return 'middle'
          }
        })()

        return React.cloneElement(child, {
          borderOption,
          checked: value === child.props.value,
          onChangeValue: onChangeValue,
          disabled,
          size,
          fillOnChecked,
        })
      }),
    [children, isSticked, value, onChangeValue, disabled, size, fillOnChecked]
  )
  return (
    <div
      css={wrapper(isSticked ? 0 : gap)}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {enhancedChildren}
    </div>
  )
}

const wrapper = (gap: string | number) => css`
  display: flex;
  gap: ${safePx(gap)};
`
