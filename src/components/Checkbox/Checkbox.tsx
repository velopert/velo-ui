import { css } from '@emotion/react'
import { InputHTMLAttributes } from 'react'
import { cssVar } from '../../contexts/ThemeProvider'
import { Icon } from '../Icon'

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
  disabled?: boolean
}

/**
 * Checkbox is used to display a boolean value.
 */
export function Checkbox({
  className,
  checked,
  onToggle,
  size = 'sm',
  color = cssVar('primary'),
  disabled,
}: CheckboxProps) {
  return (
    <label css={wrapper(color, size, disabled)} className={className}>
      <input
        type="checkbox"
        css={invisibleCheckbox}
        checked={checked}
        onChange={onToggle}
        disabled={disabled}
      />
      <span css={box(checked, color)} className="box">
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

const wrapper = (color: string, size: CheckboxSize, disabled?: boolean) => css`
  position: relative;
  display: inline-flex;
  align-items: center;

  font-size: ${sizes[size]};
  ${disabled
    ? css`
        span:first-of-type {
          border-color: ${cssVar('accent-4')};
          background: ${cssVar('accent-3')};
        }
        span:nth-of-type(2) {
          color: ${cssVar('accent-6')};
        }
        cursor: not-allowed;
        svg {
          color: ${cssVar('accent-6')};
        }
      `
    : css`
        cursor: pointer;
        &:hover {
          span:first-of-type {
            border-color: ${color};
          }
        }
      `}
`
const invisibleCheckbox = css`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  left: 0;
  top: 0;
`

const box = (checked: boolean, color: string) => css`
  align-items: center;
  justify-content: center;
  display: block;
  width: 1.125em;
  height: 1.125em;
  border-radius: 0.25rem;
  border: 1px solid ${cssVar('accent-6')};
  margin-right: 0.5em;
  position: relative;
  svg {
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    display: block;
    width: 0.625em;
    height: 0.625em;
  }

  ${checked &&
  css`
    border-color: ${color};
    background: ${color};
    color: ${cssVar('element-text')};
  `}
`

const textStyle = () => css`
  font-size: 1em;
  line-height: 1;
  color: ${cssVar('accent-9')};
`
