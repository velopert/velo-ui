import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ToggleThemeButton } from './ToggleThemeButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ToggleThemeButton',
  component: ToggleThemeButton,
} as ComponentMeta<typeof ToggleThemeButton>

const Template: ComponentStory<typeof ToggleThemeButton> = () => (
  <ToggleThemeButton />
)

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {}

Basic.argTypes = {}

export function Sample() {
  return (
    <div css={wrapper}>
      <ToggleThemeButton></ToggleThemeButton>
    </div>
  )
}

const wrapper = css`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  & + & {
    margin-top: 0.5rem;
  }
`
