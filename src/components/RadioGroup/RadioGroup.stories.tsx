import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useEffect, useState } from 'react'
import Radio from '../Radio/Radio'
import RadioGroup from './RadioGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>

const Template: ComponentStory<typeof RadioGroup> = (args) => {
  const [value, setValue] = useState<string | number | null>(args.value)

  useEffect(() => {
    setValue(args.value)
  }, [args.value])

  return (
    <RadioGroup
      {...args}
      value={value}
      onChangeValue={(value) => setValue(Number(value))}
    >
      <Radio value={1}>Option 1</Radio>
      <Radio value={2}>Option 2</Radio>
      <Radio value={3}>Option 3</Radio>
    </RadioGroup>
  )
}

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  value: 1,
  gap: 16,
  direction: 'column',
}

Basic.argTypes = {
  gap: {
    type: 'number',
  },
}

// export function Basic() {
//   const [value, setValue] = useState<number | null>(null)

//   return (
//     <RadioGroup
//       value={value}
//       onChangeValue={(value) => setValue(Number(value))}
//     >
//       <Radio value={1}>Option 1</Radio>
//       <Radio value={2}>Option 2</Radio>
//       <Radio value={3}>Option 3</Radio>
//     </RadioGroup>
//   )
// }
