import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { OptionButton } from './OptionButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/OptionButton',
  component: OptionButton,
} as ComponentMeta<typeof OptionButton>

const Template: ComponentStory<typeof OptionButton> = (args) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(!!args.checked)
  }, [args.checked])

  return (
    <div>
      <OptionButton
        {...args}
        checked={checked}
        onChangeValue={() => setChecked(true)}
      />
      <div css={{ marginTop: '1rem' }}>
        <Button onClick={() => setChecked(false)}>Reset</Button>
      </div>
    </div>
  )
}

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  children: 'Option 1',
}

Basic.argTypes = {}

export function MultipleItems() {
  const [value, setValue] = useState(1)

  return (
    <div css={wrapper}>
      <OptionButton value={1} onChangeValue={setValue} checked={value === 1}>
        Option 1
      </OptionButton>
      <OptionButton value={2} checked={value === 2} onChangeValue={setValue}>
        Option 2
      </OptionButton>
      <OptionButton value={3} checked={value === 3} onChangeValue={setValue}>
        Option 3
      </OptionButton>
    </div>
  )
}

export function Disabled() {
  const [value, setValue] = useState(1)

  return (
    <div css={wrapper}>
      <OptionButton
        value={1}
        onChangeValue={setValue}
        checked={value === 1}
        disabled
      >
        Option 1
      </OptionButton>
      <OptionButton
        value={2}
        checked={value === 2}
        onChangeValue={setValue}
        disabled
      >
        Option 2
      </OptionButton>
      <OptionButton
        value={3}
        checked={value === 3}
        onChangeValue={setValue}
        disabled
      >
        Option 3
      </OptionButton>
    </div>
  )
}

export function FillOnChecked() {
  const [value, setValue] = useState(1)

  return (
    <div css={wrapper}>
      <OptionButton
        value={1}
        onChangeValue={setValue}
        checked={value === 1}
        fillOnChecked
      >
        Option 1
      </OptionButton>
      <OptionButton
        value={2}
        checked={value === 2}
        onChangeValue={setValue}
        fillOnChecked
      >
        Option 2
      </OptionButton>
      <OptionButton
        value={3}
        checked={value === 3}
        onChangeValue={setValue}
        fillOnChecked
      >
        Option 3
      </OptionButton>
    </div>
  )
}

export function BorderOption() {
  const [value, setValue] = useState(1)

  return (
    <div css={noMarginWrapper}>
      <OptionButton
        value={1}
        onChangeValue={setValue}
        checked={value === 1}
        borderOption="left"
      >
        Option 1
      </OptionButton>
      <OptionButton
        value={2}
        checked={value === 2}
        onChangeValue={setValue}
        borderOption="middle"
      >
        Option 2
      </OptionButton>
      <OptionButton
        value={3}
        checked={value === 3}
        onChangeValue={setValue}
        borderOption="middle"
      >
        Option 3
      </OptionButton>
      <OptionButton
        value={4}
        checked={value === 4}
        onChangeValue={setValue}
        borderOption="right"
      >
        Option 4
      </OptionButton>
    </div>
  )
}

export function BorderOptionFilled() {
  const [value, setValue] = useState(1)

  return (
    <div css={noMarginWrapper}>
      <OptionButton
        value={1}
        onChangeValue={setValue}
        checked={value === 1}
        borderOption="left"
        fillOnChecked
      >
        Option 1
      </OptionButton>
      <OptionButton
        value={2}
        checked={value === 2}
        onChangeValue={setValue}
        borderOption="middle"
        fillOnChecked
      >
        Option 2
      </OptionButton>
      <OptionButton
        value={3}
        checked={value === 3}
        onChangeValue={setValue}
        borderOption="middle"
        fillOnChecked
      >
        Option 3
      </OptionButton>
      <OptionButton
        value={4}
        checked={value === 4}
        onChangeValue={setValue}
        borderOption="right"
        fillOnChecked
      >
        Option 4
      </OptionButton>
    </div>
  )
}

export function Size() {
  const [value, setValue] = useState(1)

  return (
    <div css={wrapper}>
      <OptionButton
        value={1}
        onChangeValue={setValue}
        checked={value === 1}
        size="sm"
      >
        Option 1
      </OptionButton>
      <OptionButton
        value={2}
        checked={value === 2}
        onChangeValue={setValue}
        size="md"
      >
        Option 2
      </OptionButton>
      <OptionButton
        value={3}
        checked={value === 3}
        onChangeValue={setValue}
        size="lg"
      >
        Option 3
      </OptionButton>
    </div>
  )
}

export function WithIcon() {
  const [value, setValue] = useState(1)

  return (
    <div css={noMarginWrapper}>
      <OptionButton
        value={1}
        onChangeValue={setValue}
        checked={value === 1}
        icon={<Icon name="globe" />}
        borderOption="left"
        fillOnChecked
      >
        Public
      </OptionButton>
      <OptionButton
        value={2}
        checked={value === 2}
        onChangeValue={setValue}
        icon={<Icon name="lock" />}
        borderOption="right"
        fillOnChecked
      >
        Private
      </OptionButton>
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

const noMarginWrapper = css`
  display: flex;
`
