import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import Button from '../Button'
import Radio from './Radio'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  children: 'Option 1',
}

Basic.argTypes = {}

export function Sample() {
  const [value, setValue] = useState<number | null>(null)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }

  return (
    <div>
      <div css={wrapper}>
        <Radio value={1} checked={value === 1} onChange={onChange}>
          Option 1
        </Radio>
        <Radio value={2} checked={value === 2} onChange={onChange}>
          Option 2
        </Radio>
        <Radio value={3} checked={value === 3} onChange={onChange}>
          Option 3
        </Radio>
      </div>
      <Button>Clear</Button>
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
  margin-bottom: 1rem;
`
