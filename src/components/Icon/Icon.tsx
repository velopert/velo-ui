import React, { SVGProps } from 'react'
import * as vectors from './vectors'

type IconName = keyof typeof vectors

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
}

/**
 * Shows vector icon registered to the project.
 *
 * It accepts all the native props of `svg` element.
 *
 * You can set `width` and `height` to resize the icon.
 * You can set `color` to change the color of the icon.
 * Or, you can also use `className` or `style` to set the size or color.
 */
const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...rest }, ref) => {
    return React.createElement(vectors[name], {
      ...rest,
      ref,
    })
  }
)

Icon.displayName = 'Icon'

export default Icon
