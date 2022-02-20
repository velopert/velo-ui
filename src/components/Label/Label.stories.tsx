import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Label from './Label'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Label',
  component: Label,
} as ComponentMeta<typeof Label>

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  children: 'Username',
}

Basic.argTypes = {}

export function Focused() {
  return <Label focused>Username</Label>
}

export function Error() {
  return <Label isError>Username</Label>
}

export function Size() {
  return (
    <div css={wrapper}>
      <Label size={12}>Username</Label>
      <Label size={14}>Username</Label>
      <Label size={16}>Username</Label>
    </div>
  )
}

const wrapper = css`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex-direction: column;
  & + & {
    margin-top: 0.5rem;
  }
`
