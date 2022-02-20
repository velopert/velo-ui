import { css } from '@emotion/react'
import ColorItem from './ColorItem'
import { cssVar } from '../contexts/ThemeProvider'

interface Props {}

function NeutralColors(props: Props) {
  return (
    <div css={wrapper}>
      <ColorItem
        name="Background"
        variableName="background"
        textColor={cssVar('foreground')}
      />
      <ColorItem
        name="Background Secondary"
        variableName="background-secondary"
        textColor={cssVar('foreground')}
      />
      <ColorItem
        name="Accent 0"
        variableName="accent-0"
        textColor={cssVar('foreground')}
      />
      <ColorItem
        name="Accent 1"
        variableName="accent-1"
        textColor={cssVar('foreground')}
      />
      <ColorItem
        name="Accent 2"
        variableName="accent-2"
        textColor={cssVar('foreground')}
      />
      <ColorItem
        name="Accent 3"
        variableName="accent-3"
        textColor={cssVar('foreground')}
      />
      <ColorItem
        name="Accent 4"
        variableName="accent-4"
        textColor={cssVar('foreground')}
      />
      <ColorItem
        name="Accent 5"
        variableName="accent-5"
        textColor={cssVar('accent-0')}
      />
      <ColorItem
        name="Accent 6"
        variableName="accent-6"
        textColor={cssVar('accent-0')}
      />
      <ColorItem
        name="Accent 7"
        variableName="accent-7"
        textColor={cssVar('accent-0')}
      />
      <ColorItem
        name="Accent 8"
        variableName="accent-8"
        textColor={cssVar('accent-0')}
      />
      <ColorItem
        name="Accent 9"
        variableName="accent-9"
        textColor={cssVar('accent-0')}
      />
      <ColorItem
        name="Foreground"
        variableName="foreground"
        textColor={cssVar('accent-0')}
      />
    </div>
  )
}

const wrapper = css`
  border: 1px solid var(--accent-4);
`

export default NeutralColors
