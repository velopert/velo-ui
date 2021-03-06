import { ComponentStory, ComponentMeta } from '@storybook/react'
import Input from '../Input/Input'
import { LabelGroup } from './LabelGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/LabelGroup',
  component: LabelGroup,
} as ComponentMeta<typeof LabelGroup>

const Template: ComponentStory<typeof LabelGroup> = (args) => (
  <LabelGroup {...args} />
)

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  name: 'LabelGroup',
  children: ({ onFocus, onBlur }) => (
    <Input onFocus={onFocus} onBlur={onBlur} />
  ),
}

Basic.argTypes = {}
