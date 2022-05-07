import { css } from '@emotion/react'
import { createContext, useContext } from 'react'
import { safePx } from '../../lib/utils'

interface RadioGroupContextValue {
  value: string | number | null
  onChangeValue?(value: string | number): void
}

const RadioGroupContext = createContext<RadioGroupContextValue>({
  value: null,
  onChangeValue: undefined,
})

interface Props extends RadioGroupContextValue {
  children: React.ReactNode
  direction?: 'row' | 'column'
  /**
   * Gap between each child
   */
  gap?: string | number
}

/**
 * With `RadioGroup`, you do not have to pass `checked` and `onChange` to every `Radio` components.
 * This component will do it internally with React Context. You just have to set the `value` of the `Radio` component.
 */
export function RadioGroup({
  onChangeValue,
  value,
  children,
  direction = 'column',
  gap = '1rem',
}: Props) {
  return (
    <RadioGroupContext.Provider
      value={{
        onChangeValue,
        value,
      }}
    >
      <div css={wrapper(direction, gap)}>{children}</div>
    </RadioGroupContext.Provider>
  )
}

export function useRadioGroup() {
  const context = useContext(RadioGroupContext)
  return context
}

const wrapper = (direction: 'row' | 'column', gap: string | number) => css`
  display: flex;
  flex-direction: ${direction};
  gap: ${safePx(gap)};
`
