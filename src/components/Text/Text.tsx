import { jsx } from '@emotion/core'
import { css } from '@emotion/react'
import React, { useMemo } from 'react'
import { ColorKey } from '../../contexts/ThemeProvider'

export interface TextProps {
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'div'
    | 'label'
    | 'strong'
  whiteSpace?: 'pre' | 'nowrap' | 'pre-wrap' | 'pre-line' | 'normal'
  children: React.ReactNode
  size?: 10 | 12 | 14 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 72
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  align?: 'left' | 'center' | 'right'
  className?: string
  truncate?: boolean
  clamp?: number
  color?: ColorKey
}

/**
 * `Text` is used to display text. Use this component to unify the typorgaphic styles within your web app.
 */
export function Text({
  as = 'div',
  whiteSpace,
  children,
  size = 16,
  weight = 400,
  align,
  className,
  truncate,
  clamp,
}: TextProps) {
  const fontSize = useMemo(() => `${size / 16}rem`, [size])

  return jsx(
    as,
    {
      css: [
        css({
          whiteSpace,
          fontSize,
          fontWeight: weight,
          textAlign: align,
        }),
        textStyle,
        truncate && truncateStyle,
        clamp && clampStyle(clamp),
      ],
      className,
    },
    children
  )
}

const textStyle = css`
  margin: 0;
  line-height: 1.5;
`

const truncateStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`

const clampStyle = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`
