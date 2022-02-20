import { css } from '@emotion/react'
import ColorItem from './ColorItem'
import { useDarkMode } from 'storybook-dark-mode'
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
        name="Element Text"
        variableName="element-text"
        textColor={cssVar('foreground')}
      />
      <div css={random}></div>
    </div>
  )
}

const wrapper = css`
  border: 1px solid var(--accent-4);
`

const random = css`
  /* background: ${rgba(pcssVar('--accent-5'), 0.5)}; */
  width: 45px;
  height: 45px;
`

export default BrandColors
