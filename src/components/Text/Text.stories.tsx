import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Text from './Text'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Text',
  component: Text,
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  children:
    'The quick brown fox jumps over the lazy dog. 다람쥐 헌 쳇바퀴에 타고파.',
  size: 32,
  weight: 500,
}

Basic.argTypes = {}

export function Size() {
  const text =
    'The quick brown fox jumps over the lazy dog. 다람쥐 헌 쳇바퀴에 타고파.'
  return (
    <div css={wrapper}>
      <Text size={72}>{text}</Text>
      <Text size={56}>{text}</Text>
      <Text size={48}>{text}</Text>
      <Text size={40}>{text}</Text>
      <Text size={32}>{text}</Text>
      <Text size={24}>{text}</Text>
      <Text size={20}>{text}</Text>
      <Text size={16}>{text}</Text>
      <Text size={14}>{text}</Text>
      <Text size={12}>{text}</Text>
      <Text size={10}>{text}</Text>
    </div>
  )
}

export function Weight() {
  const text =
    'The quick brown fox jumps over the lazy dog. 다람쥐 헌 쳇바퀴에 타고파.'
  return (
    <div css={wrapper}>
      <Text size={32} weight={900}>
        {text}
      </Text>
      <Text size={32} weight={800}>
        {text}
      </Text>
      <Text size={32} weight={700}>
        {text}
      </Text>
      <Text size={32} weight={600}>
        {text}
      </Text>
      <Text size={32} weight={500}>
        {text}
      </Text>
      <Text size={32} weight={400}>
        {text}
      </Text>
      <Text size={32} weight={300}>
        {text}
      </Text>
      <Text size={32} weight={200}>
        {text}
      </Text>
      <Text size={32} weight={100}>
        {text}
      </Text>
    </div>
  )
}

export function Align() {
  const text = 'Hello World'
  return (
    <div css={wrapper}>
      <Text align="left">{text}</Text>
      <Text align="center">{text}</Text>
      <Text align="right">{text}</Text>
    </div>
  )
}

export function Truncate() {
  const text =
    'The quick brown fox jumps over the lazy dog. 다람쥐 헌 쳇바퀴에 타고파.'
  return (
    <div css={[wrapper, { width: '150px' }]}>
      <Text truncate>{text}</Text>
    </div>
  )
}

export function Clamp() {
  const text =
    'The quick brown fox jumps over the lazy dog. 다람쥐 헌 쳇바퀴에 타고파.'
  return (
    <div css={[wrapper, { width: '150px' }]}>
      <Text clamp={2}>{text}</Text>
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
`
