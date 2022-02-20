import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import Text from '../components/Text'
import { useTheme } from '../contexts/ThemeProvider'

interface Props {
  name: string
  variableName: string
  textColor?: string
}

function ColorItem({ name, variableName, textColor = 'black' }: Props) {
  const [colorCode, setColorCode] = useState('')

  const { theme } = useTheme()

  useEffect(() => {
    setTimeout(() => {
      setColorCode(
        getComputedStyle(document.body).getPropertyValue(`--${variableName}`)
      )
    }, 30)
  }, [theme, variableName])

  return (
    <div
      css={[
        item,
        { color: textColor, backgroundColor: `var(--${variableName})` },
      ]}
    >
      <div className="left">
        <Text size={24} weight={500}>
          {name}
        </Text>
      </div>
      <div className="middle">
        <Text css={{ fontFamily: 'monospace' }}>var(--{variableName})</Text>
      </div>
      <div className="right">
        <Text size={16} css={{ fontFamily: 'monospace' }} align="right">
          {colorCode}
        </Text>
      </div>
    </div>
  )
}

const item = css`
  transition: 0.125s all ease-in;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    width: 24rem;
  }
  .middle {
    flex: 1;
  }
  .right {
    width: 6rem;
    text-transform: uppercase;
  }
`

export default ColorItem
