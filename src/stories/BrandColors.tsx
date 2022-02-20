import { css } from '@emotion/react'
import ColorItem from './ColorItem'
import { cssVar } from '../contexts/ThemeProvider'
import { rgba, cssVar as pcssVar } from 'polished'

interface Props {}

function BrandColors(props: Props) {
  return (
    <div css={wrapper}>
      <ColorItem
        name="Primary"
        variableName="primary"
        textColor={cssVar('element-text')}
      />
      <ColorItem
        name="Primary Hover"
        variableName="primary-hover"
        textColor={cssVar('element-text')}
      />
      <ColorItem
        name="Primary Active"
        variableName="primary-active"
        textColor={cssVar('element-text')}
      />
      <ColorItem
        name="Element Text"
        variableName="element-text"
        textColor={cssVar('foreground')}
      />
      <ColorItem
        name="Secondary"
        variableName="secondary"
        textColor={cssVar('secondary-element-text')}
      />
      <ColorItem
        name="Secondary Hover"
        variableName="secondary-hover"
        textColor={cssVar('secondary-element-text')}
      />
      <ColorItem
        name="Secondary Active"
        variableName="secondary-active"
        textColor={cssVar('secondary-element-text')}
      />
      <ColorItem
        name="Secondary Element Text"
        variableName="secondary-element-text"
        textColor={cssVar('element-text')}
      />
    </div>
  )
}

const wrapper = css`
  border: 1px solid var(--accent-4);
`

export default BrandColors
