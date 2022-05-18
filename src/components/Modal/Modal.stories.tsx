import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '..'
import { Text } from '../Text'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (args.visible === undefined) return
    setVisible(args.visible)
  }, [args.visible])
  return (
    <>
      <Button onClick={() => setVisible(true)}>Show Modal</Button>
      <Modal {...args} visible={visible}>
        Hello Modal
        <Button onClick={() => setVisible(false)} marginTop="1rem">
          Close Me
        </Button>
        <Text
          size={14}
          color="accent-5"
          css={css`
            margin-top: 1rem;
          `}
        >
          Text and Button above are not part of Modal
        </Text>
      </Modal>
    </>
  )
}

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {}

Basic.argTypes = {}

const wrapper = css`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  & + & {
    margin-top: 0.5rem;
  }
`
