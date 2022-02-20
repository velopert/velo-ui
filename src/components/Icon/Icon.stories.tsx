import { css } from '@emotion/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Icon from './Icon'
import * as vectors from './vectors'

export default {
  title: 'Components/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  name: 'back',
}

export function AllIcons() {
  const keys = Object.keys(vectors) as (keyof typeof vectors)[]
  return (
    <div css={iconGrid}>
      {keys.map((key) => (
        <div css={iconViewer}>
          <Icon key={key} name={key} />
          <div>{key}</div>
        </div>
      ))}
    </div>
  )
}

const iconViewer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3.5rem;
  height: 3.5rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-bottom: 0.5rem;
  }
  div {
    font-size: 0.875rem;
  }
`

const iconGrid = css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`
