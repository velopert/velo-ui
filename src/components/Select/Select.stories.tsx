import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useEffect, useState } from 'react'
import Select from './Select'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Select',
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

const wrapper = css`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  & + & {
    margin-top: 0.5rem;
  }
`
