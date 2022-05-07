import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useEffect, useState } from 'react'
import { LabelGroup } from '../LabelGroup/LabelGroup'
import { Select } from './Select'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState(args.value)

  useEffect(() => {
    setValue(args.value)
  }, [args.value])

  return (
    <Select
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  )
}

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  options: [
    {
      value: 'Option 1',
    },
    {
      value: 'Option 2',
    },
    {
      value: 'Option 3',
    },
  ],
  value: 'Option 1',
}

Basic.argTypes = {}

export function Placeholder() {
  const [value, setValue] = useState('')

  return (
    <div css={wrapper}>
      <Select
        placeholder="Select an option"
        options={[
          {
            value: 'Option 1',
          },
          {
            value: 'Option 2',
          },
          {
            value: 'Option 3',
          },
        ]}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export function Disabled() {
  const [value, setValue] = useState('')

  return (
    <div css={wrapper}>
      <Select
        options={[
          {
            value: 'Option 1',
          },
          {
            value: 'Option 2',
          },
          {
            value: 'Option 3',
          },
        ]}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled
      />
    </div>
  )
}

export function Size() {
  const [value, setValue] = useState('')
  const options = [
    {
      value: 'Option 1',
    },
    {
      value: 'Option 2',
    },
    {
      value: 'Option 3',
    },
  ]

  return (
    <div css={wrapper}>
      <Select
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="sm"
      />
      <Select
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="md"
      />
      <Select
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="lg"
      />
    </div>
  )
}

export function WithLabel() {
  const [value, setValue] = useState('')

  return (
    <LabelGroup name="Select option">
      {({ focused, onBlur, onFocus, setFocusd }) => (
        <Select
          placeholder="Select an option"
          options={[
            {
              value: 'Option 1',
            },
            {
              value: 'Option 2',
            },
            {
              value: 'Option 3',
            },
          ]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}
    </LabelGroup>
  )
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
  & + & {
    margin-top: 0.5rem;
  }
`
