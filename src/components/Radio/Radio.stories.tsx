import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useEffect, useState } from 'react'
import { palette } from '../../lib/palette'
import Button from '../Button'
import Radio from './Radio'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>

const Template: ComponentStory<typeof Radio> = (args) => {
  const [selected, setSelected] = useState(false)
  useEffect(() => {
    setSelected(!!args.checked)
  }, [args.checked])
  return (
    <div>
      <Radio
        {...args}
        checked={selected}
        onChange={(e) => {
          setSelected(true)
        }}
      />
      <Button
        onClick={() => setSelected(false)}
        css={css`
          margin-top: 1rem;
        `}
      >
        Clear
      </Button>
    </div>
  )
}

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  children: 'Option 1',
  checked: false,
  color: palette.teal[500],
}

Basic.argTypes = {}

export function Size() {
  const [value, setValue] = useState<number | null>(null)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }

  return (
    <div>
      <div css={wrapper}>
        <Radio value={1} size="sm" checked={value === 1} onChange={onChange}>
          Option 1
        </Radio>
        <Radio value={2} size="md" checked={value === 2} onChange={onChange}>
          Option 2
        </Radio>
        <Radio value={3} size="lg" checked={value === 3} onChange={onChange}>
          Option 3
        </Radio>
      </div>
      <Button onClick={() => setValue(null)}>Clear</Button>
    </div>
  )
}

export function Color() {
  const [value, setValue] = useState<number | null>(null)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }

  return (
    <div>
      <div css={wrapper}>
        <Radio
          value={1}
          checked={value === 1}
          onChange={onChange}
          color="black"
        >
          Option 1
        </Radio>
        <Radio value={2} checked={value === 2} onChange={onChange} color="red">
          Option 2
        </Radio>
        <Radio
          value={3}
          checked={value === 3}
          onChange={onChange}
          color="orange"
        >
          Option 3
        </Radio>
      </div>
      <Button onClick={() => setValue(null)}>Clear</Button>
    </div>
  )
}

const wrapper = css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 1rem;
`
