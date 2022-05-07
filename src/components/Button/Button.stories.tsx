import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './Button'
import { css } from '@emotion/react'
import { Icon } from '../Icon'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  children: 'Button',
  type: 'primary',
  variant: 'default',
  size: 'md',
  disabled: false,
  isFullWidth: false,
}

Basic.argTypes = {
  onClick: { action: 'clicked' },
}

export function Size() {
  return (
    <div css={wrapper}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function Type() {
  return (
    <div css={wrapper}>
      <Button>Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="destructive">Destructive</Button>
    </div>
  )
}

export function Outline() {
  return (
    <div css={wrapper}>
      <Button type="primary" variant="outline">
        Primary Outline
      </Button>
      <Button type="secondary" variant="outline">
        Secondary Outline
      </Button>
      <Button type="destructive" variant="outline">
        Destructive Outline
      </Button>
    </div>
  )
}

export function Ghost() {
  return (
    <div css={wrapper}>
      <Button type="primary" variant="ghost">
        Primary Ghost
      </Button>
      <Button type="secondary" variant="ghost">
        Secondary Ghost
      </Button>
      <Button type="destructive" variant="ghost">
        Destructive Ghost
      </Button>
    </div>
  )
}

export function Disabled() {
  return (
    <div>
      <div css={wrapper}>
        <Button type="primary" disabled>
          Primary
        </Button>
        <Button type="secondary" disabled>
          Secondary
        </Button>
        <Button type="destructive" disabled>
          Destructive
        </Button>
      </div>
      <div css={wrapper}>
        <Button type="primary" variant="outline" disabled>
          Primary Outline
        </Button>
        <Button type="secondary" variant="outline" disabled>
          Secondary Outline
        </Button>
        <Button type="destructive" variant="outline" disabled>
          Destructive Outline
        </Button>
      </div>
      <div css={wrapper}>
        <Button type="primary" variant="ghost" disabled>
          Primary Ghost
        </Button>
        <Button type="secondary" variant="ghost" disabled>
          Secondary Ghost
        </Button>
        <Button type="destructive" variant="ghost" disabled>
          Destructive Ghost
        </Button>
      </div>
    </div>
  )
}

export function FullWidth() {
  return <Button isFullWidth>Full Width</Button>
}

export function WithIcon() {
  return (
    <div>
      <div css={wrapper}>
        <Button icon={<Icon name="upload" />}>Upload</Button>
        <Button variant="ghost" icon={<Icon name="back" />}>
          Back
        </Button>
        <Button
          type="destructive"
          icon={<Icon name="exit" />}
          iconPosition="right"
        >
          Delete
        </Button>
      </div>
      <div css={wrapper}>
        <Button size="sm" icon={<Icon name="plane" />} variant="outline">
          Send
        </Button>
      </div>
      <div css={wrapper}>
        <Button size="lg" icon={<Icon name="check" />}>
          Save
        </Button>
      </div>
      <div css={wrapper}>
        <Button icon={<Icon name="check" />} isFullWidth>
          Save
        </Button>
      </div>
      <div css={wrapper}>
        <Button icon={<Icon name="check" />} isFullWidth isStickIconToEnd>
          Save
        </Button>
      </div>
      <div css={wrapper}>
        <Button
          icon={<Icon name="check" />}
          isFullWidth
          isStickIconToEnd
          iconPosition="right"
        >
          Save
        </Button>
      </div>
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
