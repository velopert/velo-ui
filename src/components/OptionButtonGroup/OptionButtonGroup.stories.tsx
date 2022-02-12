import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useEffect, useState } from 'react'
import OptionButton from '../OptionButton/OptionButton'
import OptionButtonGroup from './OptionButtonGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'OptionButtonGroup',
  component: OptionButtonGroup,
} as ComponentMeta<typeof OptionButtonGroup>

const Template: ComponentStory<typeof OptionButtonGroup> = (args) => {
  const [value, setValue] = useState(1)

  useEffect(() => {
    if (args.value) {
      setValue(args.value as any)
    }
  }, [args.value])

  return (
    <OptionButtonGroup {...args} value={value} onChangeValue={setValue}>
      <OptionButton value={1}>Option 1</OptionButton>
      <OptionButton value={2}>Option 2</OptionButton>
      <OptionButton value={3}>Option 3</OptionButton>
    </OptionButtonGroup>
  )
}

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  value: 1,
}

Basic.argTypes = {}

export function Sticked() {
  const [value, setValue] = useState(1)

  return (
    <OptionButtonGroup isSticked value={value} onChangeValue={setValue}>
      <OptionButton value={1}>Option 1</OptionButton>
      <OptionButton value={2}>Option 2</OptionButton>
      <OptionButton value={3}>Option 3</OptionButton>
    </OptionButtonGroup>
  )
}

export function Disabled() {
  const [value, setValue] = useState(1)

  return (
    <OptionButtonGroup disabled value={value} onChangeValue={setValue}>
      <OptionButton value={1}>Option 1</OptionButton>
      <OptionButton value={2}>Option 2</OptionButton>
      <OptionButton value={3}>Option 3</OptionButton>
    </OptionButtonGroup>
  )
}

export function FillOnChecked() {
  const [value, setValue] = useState(1)

  return (
    <OptionButtonGroup fillOnChecked value={value} onChangeValue={setValue}>
      <OptionButton value={1}>Option 1</OptionButton>
      <OptionButton value={2}>Option 2</OptionButton>
      <OptionButton value={3}>Option 3</OptionButton>
    </OptionButtonGroup>
  )
}

export function Size() {
  const [value, setValue] = useState(1)

  return (
    <div css={wrapper}>
      <OptionButtonGroup size="sm" onChangeValue={setValue} value={value}>
        <OptionButton value={1}>Option 1</OptionButton>
        <OptionButton value={2}>Option 2</OptionButton>
        <OptionButton value={3}>Option 3</OptionButton>
      </OptionButtonGroup>
      <OptionButtonGroup onChangeValue={setValue} value={value}>
        <OptionButton value={1}>Option 1</OptionButton>
        <OptionButton value={2}>Option 2</OptionButton>
        <OptionButton value={3}>Option 3</OptionButton>
      </OptionButtonGroup>
      <OptionButtonGroup size="lg" onChangeValue={setValue} value={value}>
        <OptionButton value={1}>Option 1</OptionButton>
        <OptionButton value={2}>Option 2</OptionButton>
        <OptionButton value={3}>Option 3</OptionButton>
      </OptionButtonGroup>
    </div>
  )
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
