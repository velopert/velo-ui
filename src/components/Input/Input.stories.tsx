import { css } from '@emotion/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { palette } from '../../lib/palette'
import Input from './Input'

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>

type InputStory = ComponentStory<typeof Input>

const Template: InputStory = (args) => <Input {...args} />

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  placeholder: 'Enter text...',
}

export const Size: InputStory = () => {
  return (
    <div css={wrapper}>
      <Input size="xs" placeholder="X-Small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="X-Large" />
    </div>
  )
}

export const FocusedColor: InputStory = () => {
  return (
    <div css={wrapper}>
      <Input focusedColor={palette.grey[900]} value="Black" />
      <Input focusedColor="#2B7CFE" value="Blue" />
    </div>
  )
}

export const FullWidth: InputStory = () => {
  return <Input isFullWidth placeholder="Full Width" />
}

export const Disabled: InputStory = () => {
  return <Input disabled placeholder="Disabled" />
}

export const Error: InputStory = () => {
  return (
    <Input
      placeholder="velo.ui@gmail.com"
      isError
      errorMessage="A valid email address is required"
      fixedWidth="20rem"
    />
  )
}

export const WithLabel: InputStory = () => {
  return (
    <div css={wrapper}>
      <Input label="Email" placeholder="velo.ui@gmail.com" fixedWidth="20rem" />
      <Input
        label="Email"
        placeholder="velo.ui@gmail.com"
        isError
        errorMessage="A valid email address is required"
        fixedWidth="20rem"
      />
    </div>
  )
}

const wrapper = css`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
`
