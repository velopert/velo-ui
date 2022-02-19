import { css } from '@emotion/react'
import React from 'react'
import { palette } from '../../lib/palette'
import Text, { TextProps } from '../Text/Text'

interface Props {
  focused?: boolean
  focusedColor?: string
  isError?: boolean
  className?: string
  size?: TextProps['size']
  children: React.ReactNode
}

/**
 * `Label` describes the elements like `Input`, `Radio`, `OptionButton`, etc.
 *
 *
 * Use `LabelGroup` if you want to implement focus effect without writing extra code.
 */
function Label({
  focused,
  focusedColor = palette.teal[500],
  isError,
  className,
  size = 14,
  children,
}: Props) {
  return (
    <Text
      as="label"
      css={[
        labelStyle,
        focused && css({ color: focusedColor }),
        isError && errorStyle,
      ]}
      size={size}
      className={className}
      weight={500}
    >
      {children}
    </Text>
  )
}

const labelStyle = css`
  color: ${palette.grey[600]};
  transition: 0.125s all ease-in;
  margin-bottom: 0.5em !important;
`

const errorStyle = css`
  color: ${palette.red[500]};
`

export default Label
