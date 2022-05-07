import { css } from '@emotion/react'
import React, { useState } from 'react'
import { Label } from '../Label'
import { TextProps } from '../Text/Text'

interface LabelGroupRenderProps {
  focused: boolean
  onFocus: (e: React.FocusEvent<HTMLElement>) => void
  onBlur: (e: React.FocusEvent<HTMLElement>) => void
  setFocusd: (focused: boolean) => void
}
interface Props {
  /**
   * `children` can be either ReactNode or Render Props function
   *
   *
   * `LabelGroupRenderProps` consists `focused`, `onFocus`, `onBlur`, `setFocused`.
   *
   *
   * You only need `onFocus` and `onBlur` most of the time.
   */
  children:
    | React.ReactNode
    | ((props: LabelGroupRenderProps) => React.ReactNode)

  /** `className` applied to the root element` */
  className?: string
  /** `className` applied to the label element` */
  labelClassName?: string
  /** `size` applied to `Label` */
  size?: TextProps['size']
  /**
   * Label name
   */
  name: string
  /**
   * `focusedColor` applied to `Label`
   */
  focusedColor?: string
}

/**
 * `LabelGroup` is used to group `Label` with any other children element.
 *
 *
 * It provides `focused`, `onFocus`, `onBlur`, `setFocused` properties via render props pattern.
 */
export function LabelGroup({
  children,
  className,
  size,
  name,
  labelClassName,
}: Props) {
  const [focused, setFocused] = useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const content =
    typeof children === 'function'
      ? children({ focused, onFocus, onBlur, setFocusd: setFocused })
      : children

  return (
    <section css={sectionStyle} className={className}>
      <Label className={labelClassName} focused={focused}>
        {name}
      </Label>
      {content}
    </section>
  )
}

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
