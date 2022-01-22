import { css } from '@emotion/react'
import { InputHTMLAttributes } from 'react'
import { palette } from '../../lib/palette'
import Icon from '../Icon'

type CheckboxSize = 'sm' | 'md' | 'lg'
interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked: boolean
  onToggle(): void
  /**
   * If you want to customize the hover & active color, you can use this prop.
   * If you want to set it globally, you can override the color from VeloProvider.
   */
  color?: string
  size?: CheckboxSize
  /**
   * If you set className to this component it is applied to the `label` element which is the root element of this component.
   */
  className?: string
}

/**
 * Checkbox is used to display a boolean value.
 */
function Checkbox({
  className,
  checked,
  onToggle,
  size = 'sm',
  color = palette.teal[500],
}: CheckboxProps) {
  return (
    <label css={wrapper(color, size)} className={className}>
      <input
        type="checkbox"
        css={invisibleCheckbox}
        checked={checked}
        onChange={onToggle}
      />
      <span css={box(checked, color, size)} className="box">
        {checked && <Icon name="check" />}
      </span>

      <span css={textStyle}>Check me</span>
    </label>
  )
}

const sizes = {
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
}

const wrapper = (color: string, size: CheckboxSize) => css`
  position: relative;
  display: inline-flex;

  cursor: pointer;
  font-size: ${sizes[size]};
  &:hover {
    span:first-of-type {
      border-color: ${color};
    }
  }
`
const invisibleCheckbox = css`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  left: 0;
  top: 0;
`

const box = (checked: boolean, color: string, size: CheckboxSize) => css`
  align-items: center;
  justify-content: center;
  display: block;
  width: 1em;
  height: 1em;
  border-radius: 0.25em;
  border: 1px solid ${palette.grey[500]};
  margin-right: 0.5em;
  position: relative;
  svg {
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    display: block;
    width: 0.875em;
    height: 0.875em;
  }

  ${checked &&
  css`
    border-color: ${color};
    background: ${color};
    color: white;
  `}
`

const textStyle = () => css`
  font-size: 1em;
  line-height: 1;
  color: ${palette.grey[800]};
`

export default Checkbox
