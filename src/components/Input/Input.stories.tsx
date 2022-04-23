import { css } from '@emotion/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { palette } from '../../lib/palette'
import { Button, Icon } from '../'
import Input from './Input'

export default {
  title: 'Components/Input',
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
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
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

export const FixedWidth: InputStory = () => {
  return (
    <div css={wrapper}>
      <Input fixedWidth="10rem" placeholder="Fixed Width" />
      <Input fixedWidth="15rem" placeholder="Fixed Width" />
      <Input fixedWidth="20rem" placeholder="Fixed Width" />
    </div>
  )
}

export const Disabled: InputStory = () => {
  return <Input disabled placeholder="Disabled" />
}

export const Error: InputStory = () => {
  return (
    <Input
      placeholder="velo.ui@gmail.com"
      isError
      errorMessage="This email is not valid"
      fixedWidth="20rem"
    />
  )
}

export const WithLabel: InputStory = () => {
  return (
    <div css={wrapper}>
      <Input label="Email" placeholder="velo.ui@gmail.com" size="sm" />
      <Input label="Email" placeholder="velo.ui@gmail.com" />
      <Input label="Email" placeholder="velo.ui@gmail.com" size="lg" />
      <Input
        label="Email"
        placeholder="velo.ui@gmail.com"
        isError
        errorMessage="This email is not valid"
      />
    </div>
  )
}

export const WithIcon: InputStory = () => {
  return (
    <div css={wrapper}>
      <Input placeholder="Search something..." icon={<Icon name="search" />} />
      <Input
        placeholder="Search something..."
        icon={<Icon name="search" />}
        disabled
      />
      <Input
        placeholder="Search something..."
        icon={<Icon name="search" />}
        size="lg"
      />
    </div>
  )
}

export const Password: InputStory = () => {
  return (
    <div css={wrapper}>
      <Input type="password" size="sm" />
      <Input type="password" />
      <Input type="password" size="lg" />
      <Input type="password" disablePlainPassword />
    </div>
  )
}

export const Addons: InputStory = () => {
  return (
    <div css={wrapper}>
      <Input
        label="With Button Addon"
        rightAddon={
          <Button isSquare>
            <Icon name="plane" width="1.125rem" height="1.125rem" />
            {/* <svg></svg> */}
          </Button>
        }
      />
      <Input label="With Text Addon (right)" rightAddon=".com" />
      <Input label="With Text Addon (left)" leftAddon="/@username/" />
      <Input
        label="With Text Addon (both)"
        leftAddon="https://"
        rightAddon=".com"
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
